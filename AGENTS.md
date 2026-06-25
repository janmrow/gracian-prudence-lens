# AGENTS.md

Repository: `gracian-prudence-lens`  
Skill: `gracian-prudence-review`

## Purpose

This repository contains a small Markdown-based agent skill for reviewing socially complex professional situations through a non-cynical prudence lens inspired by Baltasar Gracian.

Every meaningful change should help the user choose a concrete, ethical, non-cynical next move more clearly than a baseline model would.

## Boundaries

```text
Prudence is not manipulation.
Discretion is not dishonesty.
Status awareness is not paranoia.
Reputation protection is not vanity.
Strategic judgment is not domination.
```

Do not add content that teaches lying, coercion, deception, humiliation, retaliation, manipulation, fake vulnerability, setting traps, exploiting personal weakness, or escalating for dominance.

Write repository files in clear, practical English. Avoid ornate prose, aphorisms, corporate filler, generic HR phrasing, AI marketing language, and broad theory.

## Working Rules

1. Keep changes small, focused, and reviewable.
2. Prefer one file or one purpose at a time.
3. Do not rewrite unrelated files.
4. Preserve the non-cynicism boundary.
5. Keep examples original and concise.
6. Check whether a change improves baseline behavior.
7. Do not claim tests or evals were run unless the run is recorded.
8. Do not overbuild.

## Output Quality

A good skill-guided answer should usually:

- identify the user's actual decision;
- separate the visible issue from possible hidden dynamics;
- avoid assuming bad intent too quickly;
- identify timing, audience, and reputational risk;
- distinguish public response from private follow-up;
- say what not to reveal too early;
- warn against the wrong move;
- choose one recommended next move;
- provide one usable sentence when helpful.

The answer should not leave the user with many equal options. The skill's job is judgment. Choose.

## Manual Testing

Use these files when a change affects skill behavior:

```text
.agents/skills/gracian-prudence-review/evals/trigger-queries.csv
.agents/skills/gracian-prudence-review/evals/output-evals.md
.agents/skills/gracian-prudence-review/evals/baseline-notes.md
```

Keep `SKILL.md` as the source of truth for skill behavior. Keep README, prompt snippets, and publishing notes shorter than the skill itself so duplicated guidance does not drift.
