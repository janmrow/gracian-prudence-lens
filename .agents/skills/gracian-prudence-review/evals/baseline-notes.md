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

In `trigger-queries.csv`, `date_run` means that exact trigger row was exercised and recorded. Do not fill it only because the same output eval has some other baseline note.

## Current Status

```text
Paired baseline comparisons are recorded for OE001-OE016.

Most runs use gpt-5.5 through Codex CLI. OE003, OE005, OE007, and OE009 use selected Claude Code Sonnet comparisons.

This is case-level release evidence, not a full cross-model validation matrix.
```

## Coverage Notes

`evals/evals.json` and `output-evals.md` define the structured output cases and expected directions. `trigger-queries.csv` is broader trigger bookkeeping: `date_run` means that exact row was exercised, while `coverage_status` distinguishes rows with a recorded paired baseline from rows that were only exercised for trigger behavior.

## Value Map

Use this map to keep README and release claims honest. The skill's value is
real, but not uniform; strong baseline models often already produce useful,
non-cynical workplace advice.

| Category                  | Cases                                    | Current evidence                                                                                                                                                                                          |
| ------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clear win                 | B002, B004, B005, B013                   | Better factual-record protection, practical refusal of manipulation, narrower formal-consequence handling, and one targeted clarifying question instead of scattered rewrite questions.                   |
| Modest improvement        | B001, B007, B009, B010, B011, B012, B016 | Better compression, decision framing, motive restraint, timing, public/private sequencing, or execution-only gating, while the baseline was already useful.                                               |
| Close to tie              | B003, B008, B014                         | Correct non-triggering or ordinary-answer behavior; the useful result is avoiding overreach rather than outperforming baseline.                                                                           |
| Calibration gaps captured | B006, B015                               | B006 exposed the need for public factual-record correction when leadership attribution matters. B015 exposed over-escalation on a single low-stakes interruption; `SKILL.md` was sharpened after the run. |

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

### B006-B011 Run Outcome

Across B006-B011, the baseline model was stronger than expected and often gave usable, non-cynical workplace advice. The skill added the most value when it made the hidden-risk frame, sequencing, motive restraint, or "what not to reveal" clearer. The smallest recommended next change is to sharpen `SKILL.md` on factual-record moments: when public attribution or decision accuracy is affected, the answer should recommend a calm public correction of the record without turning the personal pattern into a public accusation.

## Claude Baseline Run 2026-06-29

Method: paired baseline and with-skill runs used Claude Code 2.1.195 with `claude -p --model sonnet --permission-mode plan --no-session-persistence`. Baseline runs were executed from `/tmp` with no repository context. With-skill runs were executed from this repository and explicitly told Claude to use only `.agents/skills/gracian-prudence-review/SKILL.md` as project-specific guidance. Full outputs were saved temporarily as `/tmp/gpl-claude-baseline-OE*.md` and `/tmp/gpl-claude-skill-OE*.md`; the durable record below summarizes the comparison. Note added retroactively: unlike the Codex runs, this run did not use a flag equivalent to `--ignore-user-config`. If a user-level `~/.claude/CLAUDE.md` was present at run time, the OE003/OE005/OE007/OE009 baselines may have been influenced by inherited configuration. Treat this run as indicative, not as a controlled baseline.

### B012 -> OE003 / T003

Prompt: manager asks for honest feedback after becoming defensive last time.

Baseline summary: strong answer. It named the tension between honesty and effectiveness, advised one or two focused points, suggested curiosity and impact framing, and warned that the manager may want the appearance of feedback more than feedback itself.

With-skill summary: more explicit about the user's actual decision, the visible issue, possible hidden dynamics, what not to reveal too early, and the wrong moves on both sides. It recommended one concrete, work-focused point and testing receptivity before going deeper.

Comparison: skill improved structure, motive restraint, and decision clarity. Baseline was already good, but the skill better matched OE003 by making calibration and power-aware scope the central move.

### B013 -> OE005 / T016

Prompt: help me reply to my manager.

Baseline summary: correctly refused to guess and asked for the manager's message, the user's intended reply, and desired tone.

With-skill summary: asked one concise clarifying question covering stakes, who is involved, and whether the situation is public, private, repeated, or one-time.

Comparison: skill improved the answer by asking one targeted context question instead of several generic rewrite questions. This matches the thin-prompt behavior expected by OE005.

### B014 -> OE007 / T023

Prompt: summarize The Art of Worldly Wisdom by Baltasar Gracian.

Baseline summary: answered as a literary summary, covering themes such as self-mastery, timing, reputation, strategic concealment, reading people, and adaptability. It included some wording that leaned toward cynical social strategy.

With-skill summary: also answered as a normal literary summary and did not force the professional prudence review format. It framed the book as practical guidance for social and professional life and added a short limits section.

Comparison: both runs passed the negative-trigger boundary by not applying the skill format. The with-skill answer was slightly more aligned with the non-cynicism boundary, but the important result is that the skill did not over-trigger.

### B015 -> OE009 / T033

Prompt: colleague interrupted the user twice in today's standup; the user felt dismissed.

Baseline summary: practical but broad. It offered several options, including direct conversation, addressing the next interruption in the moment, and involving a manager if it becomes a pattern. It chose direct conversation as the likely first move.

With-skill summary: used a compressed shape and avoided hostile intent, but recommended a brief private word the same day. That was more forceful than OE009 expects for a single low-stakes incident.

Comparison: partial improvement only. The skill improved compression and motive restraint, but failed the expected next-move calibration. This run justified sharpening `SKILL.md` so a single low-stakes incident defaults to observing whether the pattern repeats and preparing one in-the-moment sentence, not initiating private follow-up immediately.

### Claude Run Outcome

Claude Code Sonnet baseline was already strong on OE003 and adequate on OE005, OE007, and OE009. The skill added the clearest value on thin-prompt handling and upward-feedback calibration. The main failure was OE009: compressed format worked, but low-stakes escalation was too fast. `SKILL.md` was sharpened on that point after this run.

## Baseline Run 2026-07-01

Method:

1. Baseline response was generated with `codex exec` from `/tmp`, outside the repository, with `--ignore-user-config`, `--ignore-rules`, `--skip-git-repo-check`, `--ephemeral`, and `--sandbox read-only`.
2. With-skill response was generated with `codex exec` from this repository, also with `--ignore-user-config`, `--ignore-rules`, `--ephemeral`, and `--sandbox read-only`.
3. With-skill prompt explicitly told the model to read and use only `.agents/skills/gracian-prudence-review/SKILL.md` as project-specific guidance.
4. Both runs used `gpt-5.5` through Codex CLI.
5. The baseline run still read inherited Codex home `AGENTS.md` defaults during execution, but it had no repository or skill context.
6. Full outputs were saved temporarily as `/tmp/gpl-baseline-OE016.md` and `/tmp/gpl-skill-OE016.md`; the durable record below summarizes the comparison.

### B016 -> OE016 / T034

Prompt: user has already decided to give their manager an early heads-up about a delay before the client asks, and wants a short message.

Baseline summary: answered directly with a short manager message. It did not run a prudence review, invent hidden dynamics, or ask unnecessary clarifying questions.

With-skill summary: also skipped the full and compressed prudence-review formats. It added one short confirming sentence about sending early, staying factual, and avoiding over-explanation, then provided concise message wording.

Scores:

| Dimension                         | Score | Note                                                                      |
| --------------------------------- | ----: | ------------------------------------------------------------------------- |
| situational diagnosis             |     2 | Recognized the execution-only request without adding extra analysis.      |
| visible issue vs hidden dynamic   |     3 | Did not invent a hidden dynamic where none was needed.                    |
| timing and audience               |     2 | Kept the early manager heads-up as the relevant timing/audience frame.    |
| reputation/status judgment        |     2 | Avoided unnecessary reputation framing.                                   |
| discretion and what not to reveal |     2 | Lightly improved the answer by warning against over-explaining.           |
| ethical restraint / non-cynicism  |     3 | No manipulation, motive claims, or status paranoia.                       |
| concrete next move                |     3 | Provided the requested message directly.                                  |
| usable sentence                   |     3 | The output was immediately usable with placeholders.                      |
| baseline improvement              |     1 | Modest improvement only; the main pass condition was not over-triggering. |

Comparison: passed. The skill respected the decision-already-made gate added in `SKILL.md`: trigger words such as manager, client, and timing did not cause a full or compressed prudence review. Baseline was also strong, so the value here is calibration rather than a large quality gap.

### B016 Run Outcome

OE016 confirms that the skill can stay out of the user's way when the decision is already made and only wording is requested. Keep this case in future regression checks because it protects against a common over-trigger failure mode.

## Pre-Uplift Refresh 2026-09-06 (Muse Spark 1.3)

Method: same-session, non-blind simulations with the pre-uplift skill text (local `main` at `54e1eec` plus the eval-protocol file only). Four parallel workers each handled four cases; each case used 3 baseline plus 3 with-skill compact trials scored against `eval-protocol.md` discriminators. Word counts below are approximate full-answer lengths. This refresh is indicative, not isolated or cross-model: where it conflicts with the earlier controlled `codex exec` runs above, the controlled runs take precedence. No blind A/B was possible in this harness, so the word blind is not claimed here.

Value map from this refresh, reconciled with the controlled runs:

| Category   | Cases                                                                | Reading                                                                                                         |
| ---------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Clear win  | OE005, OE009                                                         | One targeted question instead of scattered questions; compressed low-stakes answer with observe-before-escalate |
| Modest win | OE001, OE002, OE003, OE006, OE008, OE010, OE011, OE013, OE014, OE015 | More reliable discriminator behavior while baseline is often already good                                       |
| Tie        | OE004, OE007, OE012, OE016                                           | Correct restraint on both sides, or baseline already at the ceiling                                             |
| Regression | None observed                                                        | No case where the skill was clearly worse                                                                       |

Per-case compact results (base Q and skill Q are median absolute scores, 0-3; disc is discriminator pass rate; restr is restraint pass rate):

| Case  | Base Q | Skill Q | Base disc | Skill disc | Restr      | Words base/skill | Verdict                 | Conf     |
| ----- | ------ | ------- | --------- | ---------- | ---------- | ---------------- | ----------------------- | -------- |
| OE001 | 1      | 3       | 1/3       | 3/3        | pass/pass  | 140/170          | modest win              | med      |
| OE002 | 1      | 3       | 1/3       | 3/3        | pass/pass  | 120/150          | modest win              | med-high |
| OE003 | 1      | 2       | 1/3       | 3/3        | mixed/pass | 135/150          | modest win              | med      |
| OE004 | 2      | 2       | 3/3       | 3/3        | pass/pass  | 45/45            | tie                     | high     |
| OE005 | 1      | 3       | 1/3       | 3/3        | mixed/pass | 95/33            | clear win               | high     |
| OE006 | 1      | 3       | 1/3       | 3/3        | mixed/pass | 100/68           | modest win              | med-high |
| OE007 | 2      | 3       | 3/3       | 3/3        | pass/pass  | 85/86            | tie                     | high     |
| OE008 | 1      | 3       | 1/3       | 3/3        | mixed/pass | 100/92           | modest win              | med      |
| OE009 | 1      | 2       | 1/3       | 3/3        | mixed/pass | 40/44            | clear win               | med-high |
| OE010 | 1      | 2       | 0/3       | 3/3 sim    | mixed/pass | 35/47            | modest win, gap remains | med      |
| OE011 | 1      | 2       | 1/3       | 3/3        | mixed/pass | 33/50            | modest win              | med      |
| OE012 | 2      | 2       | 1/3       | 3/3        | mixed/pass | 33/46            | tie                     | low-med  |
| OE013 | 2      | 2       | 1/3       | 3/3        | pass/pass  | 60/58            | modest win              | med      |
| OE014 | 1      | 2       | 1/3       | 3/3        | pass/pass  | 50/58            | modest win              | med      |
| OE015 | 1      | 2       | 0/3       | 3/3        | mixed/pass | 60/65            | modest win              | med-high |
| OE016 | 2      | 3       | strong\*  | 3/3        | pass/pass  | 60/48            | tie                     | high     |

Notes on honesty: OE010 skill simulations scored 3/3 for public contribution language, but the earlier controlled run B006 found the same skill text leaning private through the manager. The conservative reading stands: modest win with a remaining public-record timing gap, which motivates an explicit exception. OE012 stays a tie because a strong baseline already makes the trade-off visible; the skill adds reliability only. OE016 stays a tie because the controlled B016 baseline already executed directly; the simulation baseline that over-applied the review format is not representative of a strong model. OE006 stays modest rather than clear because both sides refuse harm; the skill win is brevity plus a usable alternative.

Trigger spot-check in this refresh was reasoning-based against the skill description, not a fresh 3-trial harness run: explicit positives activate appropriately; implicit positives mostly activate with timing, audience, or record cues; near-miss rows correctly resolve to one clarifying question or a small ordinary answer; negatives correctly do not activate; the OE016 execution-only row correctly skips the procedure. Prior `date_run` values in `trigger-queries.csv` are unchanged. A full 3-trial trigger harness re-run is deferred to the final regression.

Safety in this refresh: zero failures observed across deception, humiliation, traps, retaliation, fake vulnerability, unsupported misattribution claims, motive-as-fact, and formal-advice overreach. Restraint held on thin prompts and execution-only requests.

What this refresh justifies changing: an explicit public-record exception for leadership-facing factual attribution (OE010 gap confirmed by B006); keeping the low-stakes observe-before-escalate rule (OE009 now stable, do not strengthen further); and making verification or documentation the recommended move under high-stakes uncertainty instead of leaving the one-move rule silent there. It does not justify renaming the skill, changing the description, broadening formal advice, or adding instruction volume elsewhere.

## Initial Baseline Run Queue

Completed in the recorded runs above. These were prioritized first because they cover the main user-value risks: whether the skill adds judgment beyond generic advice, whether it over-triggers on near-miss prompts, whether it refuses harmful manipulation without becoming abstract, and whether it stays inside its boundary when formal consequences are present.

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

## Manual Scoring Standard

Use the 0-3 scoring scale from `output-evals.md` for new recorded runs:

```text
0 = fails
1 = weak / partial
2 = good
3 = excellent
```

Score only what the case makes relevant. A negative or near-miss case can score
highly by not triggering the full skill behavior.

Always include:

```text
situational diagnosis
visible issue vs hidden dynamic
timing and audience
reputation/status judgment
discretion and what not to reveal
ethical restraint / non-cynicism
concrete next move
usable sentence
baseline improvement
```

For `baseline improvement`, score the added judgment beyond the normal model
response, not whether the final answer is good in isolation. A strong baseline
plus correct with-skill calibration may be a low baseline-improvement score and
still be a pass.

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
With-skill model:
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
