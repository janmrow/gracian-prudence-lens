# Changelog

All notable changes to `gracian-prudence-review` should be recorded here.

## 0.1.0-draft

- Drafted the initial non-cynical prudence review skill.
- Added trigger coverage, manual output evals, baseline notes, and a compact system prompt snippet.
- Added local deterministic checks for Markdown, metadata, JSON, and repository hygiene.
- Added a gating check to `SKILL.md` so requests where the user has already
  decided and is asking only for execution (wording, a message, a draft) skip
  the decision procedure entirely. Added a matching eval case (OE016) and
  trigger-query row (T034) to cover this behavior going forward.
