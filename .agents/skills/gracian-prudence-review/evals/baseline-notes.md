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

## Current Status

```text
No baseline tests have been run yet.
```

## Baseline Run Queue

Run these first because they cover the main risks: generic advice, over-triggering, harmful manipulation, and formal-consequence overreach.

```text
B001 -> OE001 / T001
B002 -> OE002 / T002
B003 -> OE004 / T015
B004 -> OE006 / T030
B005 -> OE008
```

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
