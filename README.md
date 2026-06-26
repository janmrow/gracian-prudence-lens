# Gracian Prudence Lens

A small agent skill for non-cynical strategic judgment in socially complex professional situations.

The skill is named `gracian-prudence-review`. It helps an agent choose one concrete, ethical next move when the best answer depends on timing, audience, discretion, reputation, status dynamics, emotional restraint, public vs private response, and what not to reveal too early.

It is not a Gracian summary, quote collection, style imitation, manipulation guide, or generic HR advice generator.

Status: `0.1.0-draft`

Skill version: `0.1.0-draft`

Source of truth: `.agents/skills/gracian-prudence-review/SKILL.md`. Other files should support, test, package, or summarize the skill rather than redefining its behavior.

## How to use it

The skill root is:

```text
.agents/skills/gracian-prudence-review
```

Copy that directory into the skills directory used by your agent client, or point the client at this repository if it supports loading skills in place. Exact installation paths vary by client.

Once installed, invoke it by asking for `gracian-prudence-review`, or by describing a concrete professional situation where timing, audience, discretion, reputation, status dynamics, or public vs private response changes the best next move.

The file `.agents/skills/gracian-prudence-review/agents/openai.yaml` is optional OpenAI/Codex-facing metadata. It is not part of the minimal Agent Skills specification. `SKILL.md` remains the source of truth for behavior.

## When to use it

Use the skill when a user describes a concrete professional situation with social or reputational complexity, such as:

- public disagreement in front of a manager or client;
- stakeholder pressure, blame, credit ambiguity, or ownership risk;
- upward feedback or power asymmetry;
- emotional escalation where timing and wording matter;
- uncertainty about whether to respond publicly, privately, now, or later.

Do not use it for general leadership tips, ordinary politeness rewrites, literary explanation, quote requests, style imitation, or manipulation tactics.

## Quality standard

A good answer should leave the user with this result:

```text
I see the situation more clearly.
I know what not to do.
I know what to do next.
I know what to say.
I understand the risk without becoming paranoid.
```

The skill should improve on baseline model advice by adding situational judgment: visible issue vs possible hidden dynamic, audience, timing, reputation risk, public vs private distinction, discretion, one recommended next move, and one usable sentence when helpful.

## Evals

The standard eval entry point is `.agents/skills/gracian-prudence-review/evals/evals.json`. It defines manual-draft test cases and assertions for future with-skill and without-skill runs.

The companion files `trigger-queries.csv`, `output-evals.md`, and `baseline-notes.md` are human-readable planning notes. They do not record completed eval runs unless a dated run is explicitly added.

## Ethical boundary

```text
Prudence is not manipulation.
Discretion is not dishonesty.
Status awareness is not paranoia.
Reputation protection is not vanity.
Strategic judgment is not domination.
```

The skill may notice power, incentives, reputation, status, and audience. It must not recommend lying, coercion, deception, humiliation, retaliation, manipulation, fake vulnerability, traps, exploitation, or dominance tactics.

## Repository map

```text
README.md
CHANGELOG.md
AGENTS.md
LICENSE
NOTICE.md

docs/
  publishing-checklist.md

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
