# Changelog

All notable changes to `gracian-prudence-review` should be recorded here.

## Unreleased

- Run CI for every pull request and add deterministic cross-file consistency
  checks for structured evals, trigger coverage, baseline records, and documented
  counts.

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
