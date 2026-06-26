---
name: gracian-prudence-review
description: "Use this skill for concrete work, leadership, team, client, stakeholder, or professional relationship situations where practical prudence matters: timing, discretion, reputation, status dynamics, emotional restraint, hidden incentives, public vs private response, what to reveal, what not to reveal, and one prudent next move. Do not use it for generic politeness rewrites, summaries of Baltasar Gracian, quote requests, manipulation tactics, or ordinary workplace tips without concrete social or reputational complexity."
metadata:
  version: 0.1.0-draft
---

# Gracian Prudence Review

## Purpose

Review concrete socially complex professional situations through practical prudence. Help the user choose one concrete, ethical, non-cynical next move when timing, audience, discretion, reputation, status dynamics, emotional restraint, or public vs private response changes the best action.

Do not summarize Gracian, quote Gracian, or imitate Gracian's style. Use clear modern language.

## Use When

Use this skill when the user describes a concrete professional situation with social, reputational, emotional, power, timing, or public/private complexity.

Good-fit cases include public challenges, manager or client pressure, credit ambiguity, upward feedback, stakeholder tension, emotional replies, credibility risk, repeated patterns, and uncertainty about whether to speak now, wait, respond publicly, or follow up privately.

If the situation is too thin, ask one clarifying question:

```text
Could you describe what is at stake, who is involved, and whether this is public, private, repeated, or one-time?
```

## Do Not Use For

Do not use this skill for generic politeness rewrites, general leadership tips, ordinary workplace communication advice, biography or summaries of Gracian, quote requests, literary explanation, translation of aphorisms, style imitation, manipulation tactics, or formal legal, HR, compliance, medical, psychological, safety, or crisis advice.

If a workplace situation touches formal consequences, limit the review to wording, timing, audience, discretion, factual clarity, documentation, and next steps. Do not present the skill as a substitute for formal advice or process.

If the user asks for manipulation, deception, humiliation, coercion, retaliation, or exploitation, refuse the tactic and redirect toward ethical prudence.

## Procedure

Use this as reasoning scaffolding, not mandatory headings.

Always cover the user's decision, the public/private handling, the wrong move to avoid, and one recommended next move. Include hidden dynamics, power, exposure, and what not to reveal only when the situation gives enough concrete context.

1. Restate the concrete situation briefly.
2. Identify the user's actual decision.
3. Name the visible issue.
4. Name possible hidden dynamics without assuming bad intent.
5. Identify audience, timing, power, exposure, and consequences.
6. Decide what belongs publicly and what belongs privately.
7. Identify what not to reveal too early.
8. Identify what to say plainly.
9. Warn against the wrong move.
10. Choose one recommended next move.
11. Provide one usable sentence when helpful.

Do not end with many equal options. The skill's job is judgment. Choose.

## Output Shape

For complex situations, use short headings only when they help:

```text
Situation
Visible issue
Possible hidden dynamics
What is at stake
Timing and audience
What not to reveal too early
What to say plainly
What to avoid
Recommended next move
Sentence to use
```

For simpler situations, compress:

```text
The visible issue is...
The deeper risk is...
Do not...
The prudent next move is...
You can say...
```

## Non-Cynicism Boundary

```text
Prudence is not manipulation.
Discretion is not dishonesty.
Status awareness is not paranoia.
Reputation protection is not vanity.
Strategic judgment is not domination.
```

The skill may notice power, status, reputation, audience, and incentives. It must not encourage lying, coercion, deception, humiliation, retaliation, manipulation, fake vulnerability, manufactured impressions, traps, exploitation, or dominance tactics.

## Public vs Private

Default distinction:

```text
Handle the public record publicly.
Handle the personal pattern privately.
```

## Discretion Rule

Default sequence:

```text
Reveal the concern before revealing the irritation.
Name the observable pattern before naming the motive.
```

## Baseline Improvement Check

Before finalizing, ask:

```text
Would a normal model already say this?
```

If yes, sharpen the answer with at least one of: visible issue vs hidden dynamic, timing, audience, reputation risk, public vs private distinction, what not to reveal too early, one recommended next move, or one usable sentence.

## Supporting Materials

Load supporting files only when the task needs that material:

- Read `references/system-prompt-snippet.md` only when creating a compact reusable prompt block.
- Read `references/anti-patterns.md` before changing behavior or when checking whether an answer is becoming generic, cynical, manipulative, or over-clever.
- Read `references/examples.md` when adding examples, reviewing output patterns, or needing model sentences for common situations.
- Read `evals/evals.json` when setting up structured eval runs or checking expected assertions.
- Read `evals/trigger-queries.csv`, `evals/output-evals.md`, and `evals/baseline-notes.md` for manual testing notes, trigger coverage, expected directions, and baseline status.
