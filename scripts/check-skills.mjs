import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const skillsRoot = path.join(repoRoot, ".agents", "skills");
const problems = [];
const ignoredDirs = new Set([".git", "node_modules"]);
const textExtensions = new Set([
  ".json",
  ".md",
  ".mjs",
  ".sh",
  ".txt",
  ".yaml",
  ".yml",
]);

function relative(file) {
  return path.relative(repoRoot, file).split(path.sep).join("/");
}

function addProblem(file, message, line) {
  const location = line ? `${relative(file)}:${line}` : relative(file);
  problems.push(`${location}: ${message}`);
}

function readUtf8(file) {
  return fs.readFileSync(file, "utf8");
}

function readJson(file) {
  try {
    return JSON.parse(readUtf8(file));
  } catch {
    return null;
  }
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function listFiles(dir) {
  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function assertExists(file, message) {
  if (!fs.existsSync(file)) {
    addProblem(file, message);
    return false;
  }

  return true;
}

function parseFrontmatter(file) {
  const content = readUtf8(file);
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);

  if (!match) {
    addProblem(file, "missing YAML frontmatter");
    return null;
  }

  const frontmatter = {};
  const lines = match[1].split(/\r?\n/);
  let currentMap = null;

  lines.forEach((line, index) => {
    const nestedField = line.match(/^  ([A-Za-z0-9_-]+):\s*(.*)$/);
    if (nestedField && currentMap) {
      const [, key, rawValue] = nestedField;
      frontmatter[currentMap][key] = rawValue.replace(/^"(.*)"$/, "$1");
      return;
    }

    currentMap = null;

    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) {
      addProblem(
        file,
        "frontmatter must use simple key: value entries",
        index + 2,
      );
      return;
    }

    const [, key, rawValue] = field;
    if (rawValue === "") {
      frontmatter[key] = {};
      currentMap = key;
    } else {
      frontmatter[key] = rawValue.replace(/^"(.*)"$/, "$1");
    }
  });

  return frontmatter;
}

function checkTextHygiene(file) {
  if (!textExtensions.has(path.extname(file))) {
    return;
  }

  const content = readUtf8(file);
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (line.includes("\t")) {
      addProblem(file, "tab character", index + 1);
    }

    const markdownHardBreak =
      path.extname(file) === ".md" && /[^ ][ ]{2}$/.test(line);

    if (/[ \t]+$/.test(line) && !markdownHardBreak) {
      addProblem(file, "trailing whitespace", index + 1);
    }
  });

  if (content.length > 0 && !content.endsWith("\n")) {
    addProblem(file, "missing final newline");
  }
}

function checkMarkdownFences(file) {
  if (path.extname(file) !== ".md") {
    return;
  }

  const lines = readUtf8(file).split(/\r?\n/);
  let fenceLine = null;

  lines.forEach((line, index) => {
    if (/^```/.test(line)) {
      fenceLine = fenceLine === null ? index + 1 : null;
    }
  });

  if (fenceLine !== null) {
    addProblem(file, `unclosed fenced code block opened on line ${fenceLine}`);
  }
}

function checkJson(file) {
  if (path.extname(file) !== ".json") {
    return;
  }

  try {
    JSON.parse(readUtf8(file));
  } catch (error) {
    addProblem(file, `invalid JSON: ${error.message}`);
  }
}

function parseCsv(file) {
  const content = readUtf8(file);
  const rows = [];
  let fields = [];
  let field = "";
  let inQuotes = false;
  let rowLine = 1;
  let line = 1;

  function finishRow() {
    fields.push(field);
    rows.push({ fields, line: rowLine });
    fields = [];
    field = "";
    rowLine = line + 1;
  }

  for (let index = 0; index < content.length; index += 1) {
    const character = content[index];

    if (character === '"') {
      if (inQuotes && content[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (inQuotes) {
        inQuotes = false;
      } else if (field.length === 0) {
        inQuotes = true;
      } else {
        addProblem(file, "unexpected quote in unquoted CSV field", line);
        field += character;
      }
      continue;
    }

    if (character === "," && !inQuotes) {
      fields.push(field);
      field = "";
      continue;
    }

    if ((character === "\n" || character === "\r") && !inQuotes) {
      if (character === "\r" && content[index + 1] === "\n") {
        index += 1;
      }
      finishRow();
      line += 1;
      continue;
    }

    if (character === "\n") {
      line += 1;
    }
    field += character;
  }

  if (inQuotes) {
    addProblem(file, "unclosed quoted CSV field", rowLine);
  }

  if (field.length > 0 || fields.length > 0) {
    finishRow();
  }

  return rows;
}

function isIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
  );
}

function checkDocumentedCount(file, pattern, expected, message) {
  const content = readUtf8(file);
  const match = content.match(pattern);

  if (!match) {
    addProblem(file, `missing documented ${message}`);
  } else if (Number(match[1]) !== expected) {
    addProblem(
      file,
      `documented ${message} is ${match[1]}, expected ${expected}`,
      lineNumberAt(content, match.index),
    );
  }
}

function checkDocumentedEvalRange(file, pattern, evalIds, message) {
  const content = readUtf8(file);
  const match = content.match(pattern);
  const sortedEvalIds = [...evalIds].sort();
  const expectedFirst = sortedEvalIds.at(0);
  const expectedLast = sortedEvalIds.at(-1);

  if (!match) {
    addProblem(file, `missing documented ${message}`);
  } else if (
    Number(match[1]) !== evalIds.size ||
    match[2] !== expectedFirst ||
    match[3] !== expectedLast
  ) {
    addProblem(
      file,
      `documented ${message} is ${match[1]} cases (${match[2]}-${match[3]}), expected ${evalIds.size} cases (${expectedFirst}-${expectedLast})`,
      lineNumberAt(content, match.index),
    );
  }
}

function checkEvalConsistency(skillDir) {
  const evalsFile = path.join(skillDir, "evals", "evals.json");
  const outputEvalsFile = path.join(skillDir, "evals", "output-evals.md");
  const triggerQueriesFile = path.join(
    skillDir,
    "evals",
    "trigger-queries.csv",
  );
  const baselineNotesFile = path.join(skillDir, "evals", "baseline-notes.md");

  if (
    ![evalsFile, outputEvalsFile, triggerQueriesFile, baselineNotesFile].every(
      fs.existsSync,
    )
  ) {
    return;
  }

  const evalData = readJson(evalsFile);
  if (!evalData || !Array.isArray(evalData.evals)) {
    return;
  }

  const evalIds = new Set();
  for (const [index, evalCase] of evalData.evals.entries()) {
    const label = `evals[${index}]`;
    if (!evalCase || typeof evalCase !== "object") {
      addProblem(evalsFile, `${label} must be an object`);
      continue;
    }

    if (!/^OE\d{3}$/.test(evalCase.id ?? "")) {
      addProblem(evalsFile, `${label} must have an OE### id`);
    } else if (evalIds.has(evalCase.id)) {
      addProblem(evalsFile, `duplicate eval id: ${evalCase.id}`);
    } else {
      evalIds.add(evalCase.id);
    }

    for (const fieldName of ["prompt", "expected_output"]) {
      if (
        typeof evalCase[fieldName] !== "string" ||
        evalCase[fieldName].trim() === ""
      ) {
        addProblem(evalsFile, `${evalCase.id ?? label} has empty ${fieldName}`);
      }
    }

    if (
      !Array.isArray(evalCase.assertions) ||
      evalCase.assertions.length === 0 ||
      evalCase.assertions.some(
        (assertion) => typeof assertion !== "string" || assertion.trim() === "",
      )
    ) {
      addProblem(
        evalsFile,
        `${evalCase.id ?? label} must have non-empty assertions`,
      );
    }
  }

  const outputContent = readUtf8(outputEvalsFile);
  const outputIdCounts = new Map();
  for (const match of outputContent.matchAll(/^## (OE\d{3}):/gm)) {
    outputIdCounts.set(match[1], (outputIdCounts.get(match[1]) ?? 0) + 1);
    if (!evalIds.has(match[1])) {
      addProblem(
        outputEvalsFile,
        `output heading references unknown eval: ${match[1]}`,
        lineNumberAt(outputContent, match.index),
      );
    }
  }
  for (const evalId of evalIds) {
    const count = outputIdCounts.get(evalId) ?? 0;
    if (count !== 1) {
      addProblem(
        outputEvalsFile,
        `${evalId} must have exactly one output heading, found ${count}`,
      );
    }
  }

  const csvRows = parseCsv(triggerQueriesFile);
  const expectedHeader = [
    "id",
    "type",
    "should_trigger",
    "output_eval_id",
    "date_run",
    "coverage_status",
    "prompt",
    "notes",
  ];
  const header = csvRows.shift();
  if (!header || header.fields.join("\0") !== expectedHeader.join("\0")) {
    addProblem(triggerQueriesFile, "unexpected trigger CSV header", 1);
    return;
  }

  const triggerIds = new Set();
  const triggerRecordsById = new Map();
  const triggerRows = [];
  const allowedTypes = new Set([
    "explicit",
    "implicit",
    "near_miss",
    "negative",
  ]);
  const expectedTriggerDecision = new Map([
    ["explicit", "yes"],
    ["implicit", "yes"],
    ["near_miss", "maybe"],
    ["negative", "no"],
  ]);
  const allowedCoverage = new Set([
    "paired_baseline_recorded",
    "trigger_exercised_only",
  ]);

  for (const row of csvRows) {
    if (row.fields.length !== expectedHeader.length) {
      addProblem(
        triggerQueriesFile,
        `trigger row has ${row.fields.length} fields, expected ${expectedHeader.length}`,
        row.line,
      );
      continue;
    }

    const trigger = Object.fromEntries(
      expectedHeader.map((name, index) => [name, row.fields[index]]),
    );
    const triggerRecord = { ...trigger, line: row.line };
    triggerRows.push(triggerRecord);

    if (!/^T\d{3}$/.test(trigger.id)) {
      addProblem(
        triggerQueriesFile,
        `invalid trigger id: ${trigger.id}`,
        row.line,
      );
    } else if (triggerIds.has(trigger.id)) {
      addProblem(
        triggerQueriesFile,
        `duplicate trigger id: ${trigger.id}`,
        row.line,
      );
    } else {
      triggerIds.add(trigger.id);
      triggerRecordsById.set(trigger.id, triggerRecord);
    }

    if (!allowedTypes.has(trigger.type)) {
      addProblem(
        triggerQueriesFile,
        `invalid trigger type: ${trigger.type}`,
        row.line,
      );
    } else if (
      trigger.should_trigger !== expectedTriggerDecision.get(trigger.type)
    ) {
      addProblem(
        triggerQueriesFile,
        `${trigger.id} type ${trigger.type} requires should_trigger=${expectedTriggerDecision.get(trigger.type)}`,
        row.line,
      );
    }

    if (!allowedCoverage.has(trigger.coverage_status)) {
      addProblem(
        triggerQueriesFile,
        `invalid coverage_status: ${trigger.coverage_status}`,
        row.line,
      );
    }
    if (!isIsoDate(trigger.date_run)) {
      addProblem(
        triggerQueriesFile,
        `${trigger.id} has invalid date_run`,
        row.line,
      );
    }
    if (trigger.output_eval_id && !evalIds.has(trigger.output_eval_id)) {
      addProblem(
        triggerQueriesFile,
        `${trigger.id} references unknown eval: ${trigger.output_eval_id}`,
        row.line,
      );
    }
    if (
      trigger.coverage_status === "paired_baseline_recorded" &&
      !trigger.output_eval_id
    ) {
      addProblem(
        triggerQueriesFile,
        `${trigger.id} has paired baseline status without output_eval_id`,
        row.line,
      );
    }
    if (
      trigger.coverage_status === "trigger_exercised_only" &&
      trigger.output_eval_id !== ""
    ) {
      addProblem(
        triggerQueriesFile,
        `${trigger.id} has trigger_exercised_only status with output_eval_id`,
        row.line,
      );
    }
    if (trigger.prompt.trim() === "") {
      addProblem(
        triggerQueriesFile,
        `${trigger.id} has empty prompt`,
        row.line,
      );
    }
  }

  const baselineContent = readUtf8(baselineNotesFile);
  const baselineRecordsByEval = new Map();
  const baselineIds = new Set();
  const baselinePattern = /^### (B\d{3}) -> (OE\d{3})(?: \/ (T\d{3}))?\s*$/gm;
  for (const match of baselineContent.matchAll(baselinePattern)) {
    const [, baselineId, evalId, triggerId] = match;
    const line = lineNumberAt(baselineContent, match.index);
    const baselineRecord = { baselineId, evalId, triggerId, line };
    if (baselineIds.has(baselineId)) {
      addProblem(
        baselineNotesFile,
        `duplicate baseline id: ${baselineId}`,
        line,
      );
    }
    baselineIds.add(baselineId);
    const records = baselineRecordsByEval.get(evalId) ?? [];
    records.push(baselineRecord);
    baselineRecordsByEval.set(evalId, records);

    if (!evalIds.has(evalId)) {
      addProblem(
        baselineNotesFile,
        `${baselineId} references unknown eval: ${evalId}`,
        line,
      );
    }
    if (triggerId && !triggerIds.has(triggerId)) {
      addProblem(
        baselineNotesFile,
        `${baselineId} references unknown trigger: ${triggerId}`,
        line,
      );
    }
    if (triggerId) {
      const trigger = triggerRecordsById.get(triggerId);
      if (
        trigger &&
        (trigger.coverage_status !== "paired_baseline_recorded" ||
          trigger.output_eval_id !== evalId)
      ) {
        addProblem(
          baselineNotesFile,
          `${baselineId} maps ${evalId} / ${triggerId} differently than trigger-queries.csv`,
          line,
        );
      }
    }
  }
  for (const evalId of evalIds) {
    const records = baselineRecordsByEval.get(evalId) ?? [];
    const count = records.length;
    if (count !== 1) {
      addProblem(
        baselineNotesFile,
        `${evalId} must have exactly one baseline heading, found ${count}`,
      );
    }
  }
  for (const trigger of triggerRows) {
    if (
      trigger.coverage_status !== "paired_baseline_recorded" ||
      !trigger.output_eval_id ||
      !evalIds.has(trigger.output_eval_id)
    ) {
      continue;
    }

    const records = baselineRecordsByEval.get(trigger.output_eval_id) ?? [];
    if (records.length !== 1 || records[0].triggerId !== trigger.id) {
      addProblem(
        triggerQueriesFile,
        `${trigger.id} paired baseline must be recorded as ${trigger.output_eval_id} / ${trigger.id}`,
        trigger.line,
      );
    }
  }

  const exercisedOnlyCount = triggerRows.filter(
    (row) => row.coverage_status === "trigger_exercised_only",
  ).length;
  const readme = path.join(repoRoot, "README.md");
  const claude = path.join(repoRoot, "CLAUDE.md");

  checkDocumentedEvalRange(
    readme,
    /evals\/evals\.json\s+—\s+(\d+) cases \((OE\d{3})-(OE\d{3})\) with assertions/,
    evalIds,
    "eval range",
  );
  checkDocumentedCount(
    readme,
    /evals\/trigger-queries\.csv — (\d+) trigger rows/,
    triggerRows.length,
    "trigger row count",
  );
  checkDocumentedCount(
    readme,
    /(\d+) trigger rows are intentionally left as `trigger_exercised_only`/,
    exercisedOnlyCount,
    "trigger_exercised_only count",
  );
  checkDocumentedEvalRange(
    claude,
    /evals\.json\s+— (\d+) structured cases \((OE\d{3})-(OE\d{3})\)/,
    evalIds,
    "structured eval range",
  );
  checkDocumentedCount(
    claude,
    /trigger-queries\.csv\s+— (\d+) trigger cases/,
    triggerRows.length,
    "trigger case count",
  );
}

function checkRepositoryContamination(files) {
  const forbidden = [
    /\bTODO\b|\bFIXME\b|\bXXX\b/i,
    /\bapi[_-]?key\b/i,
    /\bsecret\b/i,
    /\bpassword\b/i,
    /C:\\Users/i,
    /\/home\//,
    /\/mnt\//,
  ];

  for (const file of files) {
    if (!textExtensions.has(path.extname(file))) {
      continue;
    }

    if (relative(file) === "docs/publishing-checklist.md") {
      continue;
    }

    if (relative(file) === "scripts/check-skills.mjs") {
      continue;
    }

    const lines = readUtf8(file).split(/\r?\n/);
    lines.forEach((line, index) => {
      if (forbidden.some((pattern) => pattern.test(line))) {
        addProblem(
          file,
          "possible local path, secret, or unfinished note",
          index + 1,
        );
      }
    });
  }
}

function checkSkill(skillDir) {
  const skillMd = path.join(skillDir, "SKILL.md");
  if (!assertExists(skillMd, "missing required SKILL.md")) {
    return;
  }

  const frontmatter = parseFrontmatter(skillMd);
  if (!frontmatter) {
    return;
  }

  if (!frontmatter.name) {
    addProblem(skillMd, "frontmatter must include name");
  }

  if (!frontmatter.description) {
    addProblem(skillMd, "frontmatter must include description");
  } else if (frontmatter.description.length < 80) {
    addProblem(skillMd, "description is too short to guide skill selection");
  }

  if (frontmatter.metadata && !frontmatter.metadata.version) {
    addProblem(
      skillMd,
      "metadata must include version when metadata is present",
    );
  }

  const evalsFile = path.join(skillDir, "evals", "evals.json");
  if (fs.existsSync(evalsFile)) {
    const evals = readJson(evalsFile);

    if (evals && evals.skill_name !== frontmatter.name) {
      addProblem(evalsFile, "skill_name must match SKILL.md frontmatter name");
    }

    if (evals && (!Array.isArray(evals.evals) || evals.evals.length === 0)) {
      addProblem(evalsFile, "evals must contain at least one case");
    }
  }

  const openaiYaml = path.join(skillDir, "agents", "openai.yaml");
  if (fs.existsSync(openaiYaml)) {
    const content = readUtf8(openaiYaml);
    for (const required of [
      "interface:",
      "  display_name:",
      "  short_description:",
      "  default_prompt:",
      "policy:",
      "  allow_implicit_invocation:",
    ]) {
      if (!content.includes(required)) {
        addProblem(
          openaiYaml,
          `missing required metadata entry: ${required.trim()}`,
        );
      }
    }
  }
}

if (!fs.existsSync(skillsRoot)) {
  addProblem(skillsRoot, "missing .agents/skills directory");
} else {
  const skillDirs = fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(skillsRoot, entry.name));

  if (skillDirs.length === 0) {
    addProblem(skillsRoot, "no skills found");
  }

  skillDirs.forEach(checkSkill);
  skillDirs.forEach(checkEvalConsistency);
}

const files = listFiles(repoRoot);
files.forEach(checkTextHygiene);
files.forEach(checkMarkdownFences);
files.forEach(checkJson);
checkRepositoryContamination(files);

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log("Skill checks passed.");
