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

## Run Outcome 2026-06-26

The skill showed the most value on B002, B004, and B005. It showed modest value on B001 because the baseline was already strong. It correctly avoided over-triggering on B003.

Smallest recommended next change: add one explicit reminder in `SKILL.md` that the best answer should be shorter than a broad advice list when one next move is enough.

## Baseline Run 2026-06-27

Method: paired baseline and with-skill runs used the same `codex exec` method as B001-B005. Baseline runs were executed from `/tmp` with `--ignore-user-config`, `--ignore-rules`, `--skip-git-repo-check`, `--ephemeral`, and `--sandbox read-only`; with-skill runs were executed from this repository with `--ignore-user-config`, `--ignore-rules`, `--ephemeral`, and `--sandbox read-only`. Both used `gpt-5.5`. Full outputs were saved temporarily as `/tmp/gpl-baseline-OE010.md` through `/tmp/gpl-baseline-OE015.md` and `/tmp/gpl-skill-OE010.md` through `/tmp/gpl-skill-OE015.md`.

### B006 -> OE010 / T006

Prompt: credit misattribution during a leadership update.

Baseline summary: strong answer. It recommended factual, calm correction anchored in project accuracy, avoided "you stole credit" language, and gave useful wording for either the manager/update owner or the coworker. It was practical, but leaned toward private clarification and did not explicitly weigh the leadership audience as a public-record moment.

With-skill summary: more explicit about visible issue, deeper risk, motive restraint, and credibility cost. It warned against public confrontation and gave a crisp contribution-language sentence. It also leaned private through the manager or meeting lead, so it did not fully satisfy the expected public-record correction.

Comparison: skill improved the prudence framing and motive restraint, but did not clearly outperform baseline on the public-record requirement. This case exposes a useful sharpening target: one-time leadership misattribution may need public factual correction without public accusation.

### B007 -> OE011 / T014

Prompt: public correction of a senior person's inaccurate statement.

Baseline summary: strong answer. It separated the person from the claim, used additive language, gave in-meeting and follow-up wording, and preserved the senior person's broader intent. It did not explicitly name power asymmetry, but it handled the delivery constraint well.

With-skill summary: slightly sharper on the decision rule. It said not to let an inaccurate point stand when it affects decisions, commitments, or the record, and offered wording tied to the decision baseline. It also gave a private follow-up path when the meeting has passed or the fact does not affect next steps.

Comparison: skill modestly improved timing and decision relevance. Baseline was already high quality, so the added value was mainly in making the "correct now if decision-relevant" rule more explicit.

### B008 -> OE012 / T011

Prompt: client keeps adding small out-of-scope tasks.

Baseline summary: very strong answer. It made the trade-off explicit, offered scope/budget/timeline options, recommended finishing agreed items first, and gave usable client-facing wording. It avoided making the pushback personal.

With-skill summary: similarly strong but more concise. It named the visible issue as scope creep, identified the precedent risk of quiet compliance, advised a calm reset before the next extra task is completed, and warned against over-explaining or apologizing heavily.

Comparison: skill improved compression and timing slightly, but the baseline already covered the central trade-off well. This is closer to a tie than a clear skill win.

### B009 -> OE013 / T012

Prompt: stakeholder bypasses the user and goes directly to a junior teammate.

Baseline summary: strong and practical. It framed the issue as workflow and risk rather than ownership, protected the junior teammate, gave wording for both the stakeholder and teammate, and avoided territorial language.

With-skill summary: more compact and slightly sharper on hidden dynamics. It explicitly warned against treating the bypass as disrespect, named split accountability and context as the real risk, and chose a sequence: align with the junior teammate first, then reset the channel with the stakeholder.

Comparison: skill modestly improved decision clarity and sequencing. Baseline was already strong, but the skill's shorter answer made the recommended move easier to act on.

### B010 -> OE014 / T009

Prompt: angry and tempted to send a sharp reply now.

Baseline summary: strong answer. It advised waiting, drafting without sending, rereading after a delay, separating useful outcome from venting, and treating anger as useful data. It also provided a firm but controlled sample reply.

With-skill summary: similar core advice with more explicit reputational framing. It warned that sending now may make irritation the main event, told the user not to reveal how much it got to them, and recommended separating factual correction or boundary from emotional charge.

Comparison: skill improved the "what not to reveal too early" and reputational-risk language, while baseline gave a stronger practical review checklist. Net value was modest but real.

### B011 -> OE015 / T013

Prompt: manager repeatedly credits another team for the user's team's work.

Baseline summary: very strong answer. It recommended documenting examples, raising the pattern 1:1, asking for specific future attribution, giving the manager easy update material, and creating visibility through normal channels. It also warned against making the point about ego.

With-skill summary: shorter and more focused. It named the risk to the manager's mental model and leadership record, warned against motive claims, advised private factual correction, and recommended proactive written updates with owner and partner-team labels.

Comparison: skill improved focus and motive restraint, but baseline was more complete on proactive visibility tactics. This case suggests the skill should preserve its concise judgment while still naming one concrete pre-meeting visibility habit.

### Run Outcome

Across B006-B011, the baseline model was stronger than expected and often gave usable, non-cynical workplace advice. The skill added the most value when it made the hidden-risk frame, sequencing, motive restraint, or "what not to reveal" clearer. The smallest recommended next change is to sharpen `SKILL.md` on factual-record moments: when public attribution or decision accuracy is affected, the answer should recommend a calm public correction of the record without turning the personal pattern into a public accusation.

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
