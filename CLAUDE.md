# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A Markdown-based agent skill (`gracian-prudence-review`) for reviewing socially complex professional situations through a non-cynical prudence lens. The skill helps an agent choose one concrete, ethical next move when timing, audience, discretion, reputation, or public/private dynamics matter.

`SKILL.md` is the source of truth for skill behavior. All other files (README, references, evals) support or describe it — they must not drift from what `SKILL.md` actually says.

## Commands

```bash
npm run check          # format check + markdownlint + skill validation
npm run check:ci       # same as check — the CI gate
npm run format:check   # Prettier check on .md, .yml, .yaml, .json
npm run lint:md        # markdownlint
npm run lint:skills    # scripts/check-skills.mjs (deterministic structural checks)
```

Run `npm run check` before committing any change that touches `.md`, `.json`, `.yaml`, `.yml`, `.mjs`, `.sh`, or `.txt` files.

## Architecture

```text
.agents/skills/gracian-prudence-review/
  SKILL.md                        — source of truth for behavior
  agents/openai.yaml              — optional Codex/OpenAI metadata
  references/
    anti-patterns.md              — failure modes to check before finalizing an answer
    examples.md                   — model sentences and full/compressed format examples
    system-prompt-snippet.md      — compact block for injecting the skill into a system prompt
  evals/
    evals.json                    — 16 structured cases (OE001-OE016) with assertions
    trigger-queries.csv           — 34 trigger cases (explicit, implicit, near-miss, negative)
    output-evals.md               — expected directions and disqualifiers per case
    baseline-notes.md             — recorded baseline-vs-skill comparison runs
```

`references/` files are loaded on demand from within the skill, not at startup. `SKILL.md` says explicitly when to load each one.

## Skill validation checks (`scripts/check-skills.mjs`)

The script checks:

- `SKILL.md` frontmatter has `name`, `description` (≥80 chars), and `version` when `metadata` is present.
- `evals/evals.json` parses, has the correct `skill_name`, and contains at least one case.
- Structured eval IDs and required fields are valid, unique, and represented once
  in both `output-evals.md` and the baseline headings in `baseline-notes.md`.
- `trigger-queries.csv` has the expected columns, valid IDs, dates, categories,
  coverage states, and references only existing output evals and trigger cases.
- Eval and trigger counts recorded in README and this file match the source data.
- `agents/openai.yaml` includes all required interface and policy fields.
- Files with `.json`, `.md`, `.mjs`, `.sh`, `.txt`, `.yaml`, `.yml` extensions pass hygiene: no tabs, no trailing whitespace, final newline.
- No unclosed Markdown fences.
- No sensitive keywords or local paths — exact patterns are in `scripts/check-skills.mjs` (`forbidden` array). Categories: unfinished-work markers, credential-style identifiers, and system paths (home directories outside this repo, mount paths, Windows user paths).

## Eval workflow

Evals are **manual**. There is no automated model eval runner. The workflow is:

1. Pick a case from `evals/trigger-queries.csv` or `evals/evals.json`.
2. Run the prompt without the skill (fresh context, outside this repo) to get the baseline.
3. Run the prompt with the skill from this repo.
4. Record the comparison in `evals/baseline-notes.md` using the template at the bottom of that file.
5. Mark `date_run` in `trigger-queries.csv` for cases that have been run.

## Working rules (from AGENTS.md)

- Keep changes small, focused, and reviewable — one file or one purpose at a time.
- Do not rewrite unrelated files.
- Do not overbuild.
- Preserve the non-cynicism boundary: the skill notices power and status, but never recommends manipulation, coercion, deception, humiliation, retaliation, fake vulnerability, setting traps, exploiting personal weakness, or dominance tactics.
- Keep examples original and concise.
- Check whether a change improves baseline behavior before adding it.
- Write repository files in clear, practical English. Avoid ornate prose, aphorisms, corporate filler, generic HR phrasing, AI marketing language, and broad theory.

## Non-cynicism boundary

See `AGENTS.md` for the full boundary statement. Every change must preserve it.
