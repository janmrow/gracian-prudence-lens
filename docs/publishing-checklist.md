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
- [ ] `SKILL.md` frontmatter contains `name` and `description`; if `metadata` is present, it includes `version`.
- [ ] `agents/openai.yaml` matches the current skill name, scope, and default prompt.
- [ ] README explains that `agents/openai.yaml` is optional OpenAI/Codex-facing metadata, not the source of truth.
- [ ] Reference files are linked directly from `SKILL.md` and do not require nested discovery.
- [ ] `evals/evals.json` defines structured manual-draft test cases for future with-skill and without-skill runs.
- [ ] Evals cover positive, near-miss, negative, and harmful-manipulation cases.
- [ ] No scripts are added unless a deterministic validation or repeatable operation clearly needs one.
- [ ] No long Gracian passages or modern copyrighted translations are included.
- [ ] Examples are original, fictional, generic, or sufficiently abstracted.
- [ ] `NOTICE.md` clearly states independence.

## Optional Local Checks

These checks are cheap and deterministic. They do not run model evals and do not replace a real `skills-ref` validation pass.

Validate the skill with `skills-ref` if the reference tool is installed:

```bash
skills-ref validate .agents/skills/gracian-prudence-review
```

Check that `evals/evals.json` parses and has the expected skill name:

```bash
node -e "const fs=require('fs'); const p='.agents/skills/gracian-prudence-review/evals/evals.json'; const data=JSON.parse(fs.readFileSync(p,'utf8')); if (data.skill_name !== 'gracian-prudence-review') throw new Error('wrong skill_name'); console.log(data.skill_name, data.evals.length);"
```

Check for obvious private paths, secrets, or unfinished notes:

```bash
rg -n -S -u -g '!/.git/**' -g '!docs/publishing-checklist.md' -e "TODO|FIXME|XXX|api[_-]?key|secret|token|password|/home/|/mnt/" -e 'C:\\Users' .
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
