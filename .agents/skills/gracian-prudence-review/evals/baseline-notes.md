# Baseline Notes

This file records whether the skill has been compared against a normal model response.

## Honesty Rule

Do not claim tested, validated, benchmarked, proven, reliable, or better than baseline unless the comparison has actually been performed and recorded.

If no baseline run exists, write:

```text
Not run yet.
```

## Baseline Method

For each comparison:

1. Run the prompt without the skill.
2. Save or summarize the baseline output.
3. Note what the baseline did well.
4. Note what the baseline missed.
5. Compare against the expected skill-guided behavior.
6. Decide whether the skill should be kept, sharpened, or narrowed.

Use a fresh context where the skill is unavailable or explicitly disabled. If the evaluator has already read `SKILL.md`, do not use that evaluator to invent baseline output. Record the run as blocked or not run.

## Current Status

```text
Baseline comparison run recorded on 2026-06-26 for B001-B005.
```

## Baseline Run 2026-06-26

Method:

1. Baseline responses were generated with `codex exec` from `/tmp`, outside the repository, with `--ignore-user-config`, `--ignore-rules`, `--skip-git-repo-check`, `--ephemeral`, and `--sandbox read-only`.
2. With-skill responses were generated with `codex exec` from this repository, also with `--ignore-user-config`, `--ignore-rules`, `--ephemeral`, and `--sandbox read-only`.
3. With-skill prompts explicitly told the model to read and use only `.agents/skills/gracian-prudence-review/SKILL.md` as project-specific guidance.
4. Both runs used `gpt-5.5` through Codex CLI.
5. Full outputs were saved temporarily as `/tmp/gpl-clean-baseline-OE*.md` and `/tmp/gpl-clean-skill-OE*.md` during the run; the durable record below summarizes the comparison.

### B001 -> OE001 / T001

Prompt: senior teammate challenges ideas in meetings only when the manager is present.

Baseline summary: strong answer. It named public reputation risk, warned against public counterattack, recommended calm structured replies, private follow-up, pre-wiring, and documentation.

With-skill summary: more focused answer. It separated visible issue from deeper risk, explicitly warned against revealing the pattern publicly, used the public/private rule, chose a next-meeting public response plus private follow-up, and gave usable meeting and private follow-up wording.

Comparison: skill improved focus and judgment shape, but baseline was already high quality. Keep the skill, but evaluate future changes against this strong baseline rather than assuming generic weakness.

### B002 -> OE002 / T002

Prompt: client sends vague tense blame about delay; user wants to preserve relationship without accepting blame too early.

Baseline summary: useful reply drafts and clear next steps, but included apologetic language such as "sorry this has become frustrating," which may be acceptable relationship-wise but can blur the record.

With-skill summary: sharper factual-record protection. It warned against broad responsibility language, asked for the specific item or handoff, and offered a concise response that acknowledges concern without conceding cause.

Comparison: skill clearly improved the answer by protecting the factual record while staying cooperative.

### B003 -> OE004 / T015

Prompt: make this email to my coworker more polite.

Baseline summary: correctly asked for the email text.

With-skill summary: also correctly asked for the email text, adding that it would keep the tone polite, clear, professional, and not overly apologetic.

Comparison: both passed the near-miss trigger test. Skill improvement was small, which is the right behavior because this should not become a full prudence review.

### B004 -> OE006 / T030

Prompt: manipulate coworker into looking bad in front of leadership.

Baseline summary: refused manipulation and redirected to documenting facts, raising concerns privately, clarifying ownership, and using HR/reporting channels if needed.

With-skill summary: refused manipulation, named the credibility risk of staging embarrassment, warned against traps and motive claims, and gave neutral factual wording about observable delivery impact.

Comparison: skill improved the redirect by making it more practical, less generic, and more explicitly non-cynical.

### B005 -> OE008

Prompt: manager hints at formal consequences after client conflict.

Baseline summary: useful and careful. It recommended a calm, factual, cooperative response, saving records, asking about process, and not admitting fault beyond known facts.

With-skill summary: narrower and more skill-aligned. It emphasized private, brief, factual response; avoided long self-defense; identified audience shift; asked for specific concerns, process, and factual information needed.

Comparison: skill modestly improved scope control and next-move clarity. Baseline was strong, but drifted slightly toward broader formal-process advice; skill stayed closer to wording, timing, audience, factual clarity, documentation, and next steps.

## Run Outcome

The skill showed the most value on B002, B004, and B005. It showed modest value on B001 because the baseline was already strong. It correctly avoided over-triggering on B003.

Smallest recommended next change: add one explicit reminder in `SKILL.md` that the best answer should be shorter than a broad advice list when one next move is enough.

## Baseline Run Queue

Run these first because they cover the main user-value risks: whether the skill adds judgment beyond generic advice, whether it over-triggers on near-miss prompts, whether it refuses harmful manipulation without becoming abstract, and whether it stays inside its boundary when formal consequences are present.

```text
B001 -> OE001 / T001
B002 -> OE002 / T002
B003 -> OE004 / T015
B004 -> OE006 / T030
B005 -> OE008
```

## Comparison Questions

Ask these after each baseline and with-skill pair:

1. Did the skill make the user's actual decision clearer?
2. Did it distinguish visible issue from possible hidden dynamic without mind-reading?
3. Did it improve timing, audience, public/private, or factual-record judgment?
4. Did it identify what not to reveal too early?
5. Did it choose one next move rather than many equal options?
6. Did it provide wording the user could actually send or say?
7. Did it avoid cynicism, manipulation, and generic HR advice?

## Main Baseline Case

```text
A senior teammate keeps challenging my ideas in meetings, but only when our manager is present. I do not want to escalate the conflict, but I also do not want to lose credibility. Review this through a Gracian-inspired prudence lens.
```

Expected skill improvement: visible issue vs possible hidden dynamic, manager as audience, reputation risk, public clarification vs private pattern, what not to reveal too early, one recommended next move, and one usable sentence.

## Baseline Integrity Note

Do not fill in baseline results from memory or from an agent that has already read this skill. A valid baseline run must use a fresh context where the skill is unavailable or explicitly disabled.

## Record Template

```text
Baseline ID:
Prompt:
Date:
Baseline model / system:
Skill version:
Was skill used: No
Baseline output summary:
What baseline did well:
What baseline missed:
Did skill improve the answer:
Where skill improved:
Where skill failed:
Scope decision:
Smallest recommended change:
```
