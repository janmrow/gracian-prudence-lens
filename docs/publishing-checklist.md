# Publishing Checklist

Use this before publishing, sharing publicly, or tagging a first release.

## Required Files

- [ ] `README.md`
- [ ] `CHANGELOG.md`
- [ ] `LICENSE`
- [ ] `NOTICE.md`
- [ ] `AGENTS.md`
- [ ] `docs/publishing-checklist.md`
- [ ] `.agents/skills/gracian-prudence-review/SKILL.md`
- [ ] `.agents/skills/gracian-prudence-review/agents/openai.yaml`
- [ ] `.agents/skills/gracian-prudence-review/references/anti-patterns.md`
- [ ] `.agents/skills/gracian-prudence-review/references/examples.md`
- [ ] `.agents/skills/gracian-prudence-review/references/system-prompt-snippet.md`
- [ ] `.agents/skills/gracian-prudence-review/evals/evals.json`
- [ ] `.agents/skills/gracian-prudence-review/evals/trigger-queries.csv`
- [ ] `.agents/skills/gracian-prudence-review/evals/output-evals.md`
- [ ] `.agents/skills/gracian-prudence-review/evals/baseline-notes.md`

## Checks

- [ ] The repository preserves the non-cynicism boundary.
- [ ] No file teaches deception, coercion, humiliation, retaliation, or manipulation.
- [ ] Status dynamics are treated as possible, not certain.
- [ ] The skill avoids generic HR advice and status paranoia.
- [ ] Baseline notes are honest and do not claim tests were run unless recorded.
- [ ] README evidence claims match `baseline-notes.md` and do not imply a full cross-model validation matrix.
- [ ] `trigger-queries.csv` distinguishes exact trigger rows that were exercised from rows with recorded paired baseline comparisons.
- [ ] `SKILL.md` frontmatter contains `name` and `description`; if `metadata` is present, it includes `version`.
- [ ] `agents/openai.yaml` matches the current skill name, scope, and default prompt.
- [ ] README explains that `agents/openai.yaml` is optional OpenAI/Codex-facing metadata, not the source of truth.
- [ ] Reference files are linked directly from `SKILL.md` and do not require nested discovery.
- [ ] `evals/evals.json` defines structured manual-draft test cases for future with-skill and without-skill runs.
- [ ] Evals cover positive, near-miss, negative, and harmful-manipulation cases.
- [ ] Evaluation findings that change behavior are reflected in `SKILL.md`, not only in notes.
- [ ] No scripts are added unless a deterministic validation or repeatable operation clearly needs one.
- [ ] No long Gracian passages or modern copyrighted translations are included.
- [ ] Examples are original, fictional, generic, or sufficiently abstracted.
- [ ] `NOTICE.md` clearly states independence.

## Release Quality Bar

Before release, each meaningful change should be:

- [ ] Specific: it improves a concrete skill behavior or public-use path.
- [ ] Verifiable: it can be checked by reading the relevant file, running
      deterministic checks, or comparing against a recorded eval note.
- [ ] Source-aligned: behavior changes are reflected in `SKILL.md`, not only in
      README, examples, or eval notes.
- [ ] Ethically bounded: it strengthens prudence without teaching pressure,
      deception, humiliation, retaliation, or manipulation.
- [ ] Non-duplicative: supporting docs clarify the skill instead of redefining
      or expanding the source of truth.
- [ ] Evidence-honest: public claims match `baseline-notes.md` and do not imply
      tests, client support, or model coverage that has not been recorded.

## Optional Local Checks

These checks are cheap and deterministic. They do not run model evals.

Check that `evals/evals.json` parses and has the expected skill name:

```bash
node -e "const fs=require('fs'); const p='.agents/skills/gracian-prudence-review/evals/evals.json'; const data=JSON.parse(fs.readFileSync(p,'utf8')); if (data.skill_name !== 'gracian-prudence-review') throw new Error('wrong skill_name'); console.log(data.skill_name, data.evals.length);"
```

Check for obvious private paths, secrets, or unfinished notes:

```bash
rg -n -S -u -g '!/.git/**' -g '!node_modules/**' -g '!docs/publishing-checklist.md' -g '!scripts/check-skills.mjs' -e "\b(TODO|FIXME|XXX|secret|token|password)\b|api[_-]?key|/home/|/mnt/" -e 'C:\\Users' .
```

Check that the `SKILL.md` frontmatter stays minimal:

```bash
sed -n '1,6p' .agents/skills/gracian-prudence-review/SKILL.md
```

Check the untracked file list before the first public commit:

```bash
git status --short
```

Before publishing, ask:

```text
Is this repository small, honest, useful, ethical, and easier to understand than it was before?
```
