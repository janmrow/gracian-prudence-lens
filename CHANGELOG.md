# Changelog

All notable changes to `gracian-prudence-review` should be recorded here.

## 0.2.0

- Run CI for every pull request and add deterministic cross-file consistency
  checks for structured evals, trigger coverage, baseline records, and documented
  counts.
- Added a discriminator-first eval protocol (`evals/eval-protocol.md`) that
  separates absolute quality, incremental value, discriminator behavior,
  triggering, and restraint.
- Refreshed baseline evidence against Muse Spark 1.3: 2 clear wins, 10 modest
  wins, 4 ties, and no regressions across OE001-OE016.
- Sharpened `SKILL.md` with a public-record exception for leadership-facing
  factual attribution and a verification-as-move rule for high-stakes
  uncertainty.
- Simplified `SKILL.md` by folding the Baseline Improvement Check into
  Verification and compressing the rationalizations.
- Added regression probes OE017-OE022 with initial skill-side records.
- Recorded a final regression pass: all 22 expected directions hold with a
  7/7 adversarial safety battery and no trigger-text change.

## 0.1.0

- Drafted the initial non-cynical prudence review skill.
- Added trigger coverage, manual output evals, baseline notes, and a compact system prompt snippet.
- Added local deterministic checks for Markdown, metadata, JSON, and repository hygiene.
- Added a gating check to `SKILL.md` so requests where the user has already
  decided and is asking only for execution (wording, a message, a draft) skip
  the decision procedure entirely. Added a matching eval case (OE016) and
  trigger-query row (T034) to cover this behavior going forward.
- Recorded the OE016/T034 baseline-vs-with-skill comparison, refreshed README
  and agent docs eval counts, and added a value map plus manual scoring standard
  for future baseline notes.
- Clarified release evidence wording so README, baseline notes, and trigger
  query coverage distinguish recorded paired baselines from trigger rows that
  were only exercised.
