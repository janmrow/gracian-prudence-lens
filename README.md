# gracian-prudence-review

An agent skill for non-cynical strategic judgment in socially complex professional situations.

When the best next move depends on timing, audience, discretion, reputation, status dynamics, or whether to respond publicly or privately, this skill helps an agent choose one concrete, ethical action rather than a list of options.

**It is not** a Gracian summary, quote collection, style imitation, manipulation guide, or generic HR advice generator.

The package is intentionally plain Markdown so it can be used or adapted across agent clients that support `SKILL.md`-based skills, including Codex-style repo skills and similar Claude Code, Gemini CLI, Cursor, or community workflows.

## When to reach for it

Reach for `gracian-prudence-review` when a user describes a situation like:

- a senior colleague keeps challenging ideas, but only when the manager is present;
- a client sends a tense message implying blame before the facts are clear;
- a manager asks for honest feedback, but became defensive the last time;
- a coworker receives credit for work that was not theirs;
- an angry reply is drafted and ready to send.

In each case the right move is not obvious, and the wrong move has a real cost. The skill's job is to make the decision clearer, not to moralize, list options, or assume bad intent.

| Situation            | What the skill helps with                                                       |
| -------------------- | ------------------------------------------------------------------------------- |
| Public challenge     | Protect the work point in the room, then handle any repeated pattern privately. |
| Client blame         | Acknowledge impact without accepting cause or fault before the facts are clear. |
| Upward feedback      | Share one concrete work-focused point without unloading the full backlog.       |
| Credit ambiguity     | Restore the factual record without starting with accusation or motive.          |
| Angry draft          | Slow the timing, remove the sharp edge, and keep the useful concern.            |
| Manipulation request | Refuse the tactic and redirect toward an ethical, reputation-safe move.         |

## Install

The skill root is:

```text
.agents/skills/gracian-prudence-review
```

Copy that directory into the skills location used by your agent client, or point the client at this repository if it supports loading skills in place. Exact installation paths vary by client.

For Codex-style repo loading, keep the skill at:

```text
.agents/skills/gracian-prudence-review/SKILL.md
```

The file `.agents/skills/gracian-prudence-review/agents/openai.yaml` is optional Codex app metadata. `SKILL.md` is the source of truth for behavior.

| Use path                       | Status                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| Codex-style repo skill loading | Supported by keeping the skill at `.agents/skills/gracian-prudence-review/SKILL.md`. |
| Manual `SKILL.md` copy         | Supported when your agent client accepts Markdown skill instructions.                |
| Other agent clients            | Adaptable manually; not claimed as fully tested cross-client validation.             |

## Invoke

**Explicit:** mention the skill by name.

```text
Review this through a Gracian-inspired prudence lens: [situation]
```

**Implicit:** describe the situation with concrete stakes. The skill activates when the prompt includes timing, audience, discretion, reputation, status dynamics, or public/private complexity.

If the situation is too thin, the skill asks one clarifying question instead of guessing.

## What a good answer looks like

A skill-guided answer should leave the user with:

```text
I see the situation more clearly.
I know what not to do.
I know what to do next.
I know what to say.
I understand the risk without becoming paranoid.
```

Concretely, a good answer identifies the user's actual decision, separates the visible issue from possible hidden dynamics, names timing and audience, says what not to reveal too early, warns against the wrong move, and chooses one recommended next move with one usable sentence when wording matters.

## Baseline evidence

The skill has recorded paired baseline and with-skill comparisons for structured output evals `OE001`-`OE016`, plus newer skill-side regression probes `OE017`-`OE022`. Most paired comparisons use unguided `gpt-5.5` responses as the baseline; `OE003`, `OE005`, `OE007`, and `OE009` use selected Claude Code Sonnet comparisons, and a 2026-09-06 refresh re-checked all sixteen against Muse Spark 1.3. This is evidence for the listed cases, not a full cross-model validation matrix. Results are recorded in `.agents/skills/gracian-prudence-review/evals/baseline-notes.md`.

Where the skill added the most value:

- **Factual-record protection**: client blame and formal-consequence cases stayed closer to what belongs in the record versus what belongs privately; leadership-facing attribution is corrected calmly while the record is forming, without accusation.
- **Motive restraint**: credit ambiguity and manipulation-refusal cases named hidden dynamics as possibilities, not facts.
- **Public/private sequencing**: meeting challenges and bypassed-channel cases separated what to handle in the room from what to follow up privately.
- **Emotional timing**: angry-reply cases named what not to reveal, not just whether to wait.

Where baseline was already strong, such as scope pushback and senior correction, the skill improved compression and decision clarity, but the gap was modest. Those results are recorded honestly.

## Ethical boundary

```text
Prudence is not manipulation.
Discretion is not dishonesty.
Status awareness is not paranoia.
Reputation protection is not vanity.
Strategic judgment is not domination.
```

The skill notices power, status, reputation, audience, and incentives. It does not recommend lying, coercion, deception, humiliation, retaliation, manipulation, fake vulnerability, traps, exploitation, or dominance tactics.

## Evals

Within the skill root:

```text
evals/evals.json          — 22 cases (OE001-OE022) with assertions
evals/trigger-queries.csv — 34 trigger rows with per-row coverage status
evals/output-evals.md     — expected directions and disqualifiers per case
evals/baseline-notes.md   — recorded baseline runs with honest comparison notes
```

Recorded paired baseline runs cover `OE001`-`OE016`; `OE017`-`OE022` are newer regression probes with skill-side records rather than paired baselines. Trigger coverage is still partial: in `trigger-queries.csv`, `date_run` means that exact trigger row was exercised, while `coverage_status` distinguishes rows with a recorded paired baseline from rows that were only exercised for trigger behavior.

19 trigger rows are intentionally left as `trigger_exercised_only`: they
exercise trigger, near-miss, and negative behavior without a paired
baseline comparison. The 16 structured OE cases (OE001-OE016) carry full
paired baselines. This is a deliberate coverage boundary for this release,
not a gap awaiting completion.

## Status

`0.2.0` (in development, unreleased) — behavior is sharpened with a public-record exception and a verification-as-move rule, `OE001`-`OE022` have recorded runs with a final regression pass, and trigger coverage is documented as a deliberate boundary
(see Evals). The package is not currently submitted to a skill registry.

## Repository map

```text
README.md
CHANGELOG.md
AGENTS.md
LICENSE
NOTICE.md

.agents/skills/gracian-prudence-review/
  SKILL.md
  agents/openai.yaml
  references/anti-patterns.md
  references/examples.md
  references/system-prompt-snippet.md
  evals/evals.json
  evals/trigger-queries.csv
  evals/output-evals.md
  evals/baseline-notes.md
```

## Project status

Active development resumed in September 2026 for the 0.2.0 quality uplift. The package remains available for use and adaptation as-is.
