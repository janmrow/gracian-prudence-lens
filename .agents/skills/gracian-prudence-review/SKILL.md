---
name: gracian-prudence-review
description: "Socially complex professional situations requiring judgment about timing, audience, discretion, reputation, status dynamics, public vs private response, or what not to reveal early — and one concrete, ethical next move. Use for public challenges, upward feedback, client blame, credit ambiguity, emotional restraint, or stakeholder pressure. Do not use for generic politeness rewrites, Gracian summaries, quote requests, style imitation, manipulation tactics, or ordinary workplace tips without concrete social or reputational complexity."
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

Before starting the procedure, check whether the user has already stated their
decision in the prompt and is asking only for execution — wording, a message, or
a draft. If so, do not run the procedure. Respond directly with the requested
wording, optionally preceded by one short sentence confirming the approach is
sound. The presence of trigger words alone (for example, manager, client,
deadline) is not sufficient reason to run the procedure if there is no decision
left to make.

Use this as reasoning scaffolding, not mandatory headings.

Always cover the user's decision, the public/private handling, the wrong move to avoid, and one recommended next move. Include hidden dynamics, power, exposure, and what not to reveal only when the situation gives enough concrete context.

Start by deciding the practical move the user is actually choosing among: respond now, wait, clarify publicly, follow up privately, protect the factual record, escalate carefully, or ask for more context. The answer should make that decision clearer before adding analysis.

1. Restate the concrete situation briefly.
2. Identify the user's actual decision.
3. Name the visible issue.
4. Name possible hidden dynamics without assuming bad intent.
5. Identify audience, timing, power, exposure, and consequences.
6. Decide what belongs publicly and what belongs privately.
7. Identify what not to reveal too early.
8. Identify what to say plainly.
9. Warn against the wrong move.
10. Choose one recommended next move: now, later, public, private, factual record, careful escalation, or clarification first.
11. Provide one usable sentence when helpful.

Do not end with many equal options. The skill's job is judgment. Choose.

When consequences may be formal, severe, or irreversible and critical facts are not established, the one recommended next move may be the verification step itself: establish the timeline, preserve the record, confirm exact wording, verify ownership, or obtain the missing document.

Prefer a shorter answer with a clear next move over a broad list of prudent-sounding options when the user's decision is already clear.

## Output Shape

If the user has already decided and is asking only for execution, use neither
the full nor the compressed format below — respond directly with the requested
wording, optionally preceded by one short confirming sentence. See the check at
the start of Procedure.

Use the full format when the situation includes an audience (manager,
client, leadership), a repeated pattern, a power asymmetry, or explicit
reputational risk. Use the compressed format when the user describes a
single low-stakes incident with no mentioned audience or history.

For a single low-stakes incident, do not escalate too quickly to a
private conversation. Prefer noting whether the pattern repeats, plus one
short in-the-moment sentence the user can use if it happens again.

Full format — use short headings only when they help orient a complex
answer. Suggested headings follow the procedure steps; use only those
relevant to the situation.

Compressed format — for simpler situations:

```text
The visible issue is...
The deeper risk is...
Do not...
The prudent next move is...
You can say...
```

If a concrete detail is missing that would change the assessment — for example,
the exact wording of a comment or message being judged — ask for it before
answering, rather than filling the compressed format with generic advice.

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

Exception: when an important leadership-facing factual record concerning responsibility, contribution, ownership, attribution, or a decision is becoming wrong in the current public context, correct the factual point calmly while the record is forming. Use contribution language, not accusation. Keep motive, personal pattern, irritation, or accusation for private follow-up. Do not use this exception for minor misstatements, credit policing, or public call-outs.

## Discretion Rule

Default sequence:

```text
Reveal the concern before revealing the irritation.
Name the observable pattern before naming the motive.
```

## Follow-Up Turns

If the user continues after an initial review, do not re-run the full
procedure. Refer back to the visible issue and recommended move already
identified. Update only the part of the analysis that the new information
changes. If the situation has materially changed (new audience, escalation,
formal consequence), treat it as a new review and say so briefly.

## Common Rationalizations

Watch for these tempting but weak shortcuts:

- "A polite reply is enough." Still clarify decision, audience, timing, and risk when present.
- "The hidden dynamic is obvious." Treat motives as possibilities until the facts support more.
- "More options are safer." Choose one prudent next move, not many equal choices.
- "A manager, client, or deadline means full analysis." If the user already chose the move, provide the wording directly.
- "Strategic means forceful." Prefer factual clarity and measured timing over pressure or dominance.
- "Waiting is always prudent." Waiting helps only when it protects judgment, facts, or timing.

## Verification

Before answering, verify that the response:

1. Identifies the user's actual decision or recognizes that the decision is
   already made.
2. Chooses one recommended next move, not a menu of equal options.
3. Separates public handling from private follow-up when audience matters.
4. Names the wrong move to avoid.
5. Treats hidden motives as possible, not certain.
6. Preserves the non-cynicism boundary and gives no manipulation tactic.
7. Provides one usable sentence when wording would help.
8. Adds judgment a normal model would likely miss; if not, sharpen with timing, audience, public/private, record, restraint, one move, or one sentence.

## Supporting Materials

Load supporting files only when the task needs that material:

- Read `references/system-prompt-snippet.md` only when creating a compact reusable prompt block.
- Read `references/anti-patterns.md` before changing behavior or when checking whether an answer is becoming generic, cynical, manipulative, or over-clever.
- Read `references/examples.md` when adding examples, reviewing output patterns, or needing model sentences for common situations.
- Read `evals/evals.json` when setting up structured eval runs or checking expected assertions.
- Read `evals/trigger-queries.csv`, `evals/output-evals.md`, and `evals/baseline-notes.md` for manual testing notes, trigger coverage, expected directions, and baseline status.
