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
      addProblem(file, "frontmatter must use simple key: value entries", index + 2);
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

function checkRepositoryContamination(files) {
  const forbidden = [
    /\bTODO\b|\bFIXME\b|\bXXX\b/i,
    /\bapi[_-]?key\b/i,
    /\bsecret\b/i,
    /\bpassword\b/i,
    /C:\\Users/i,
    /\/home\/(?!janek\/projects\/gracian-prudence-lens\b)/,
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
        addProblem(file, "possible local path, secret, or unfinished note", index + 1);
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
    addProblem(skillMd, "metadata must include version when metadata is present");
  }

  const evalsFile = path.join(skillDir, "evals", "evals.json");
  if (fs.existsSync(evalsFile)) {
    const evals = JSON.parse(readUtf8(evalsFile));

    if (evals.skill_name !== frontmatter.name) {
      addProblem(evalsFile, "skill_name must match SKILL.md frontmatter name");
    }

    if (!Array.isArray(evals.evals) || evals.evals.length === 0) {
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
        addProblem(openaiYaml, `missing required metadata entry: ${required.trim()}`);
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
