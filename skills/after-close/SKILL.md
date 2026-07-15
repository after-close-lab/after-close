---
name: after-close
description: Record, validate, review, amend, and publish After Close trading decision journals. Use when an invited member wants to initialize the repository workflow, document a trade or position change, continue an existing Trade Case, create a monthly review, correct a published record, run project checks, or publish member content through Git and GitHub.
---

# After Close

Turn a member's own facts into a structured, auditable decision record while preserving risk, privacy, historical integrity, and explicit control over publication.

## Start every workflow

1. Work from the `after-close` repository root.
2. Read `AGENTS.md` and obey its publishing constraints.
3. Run `pnpm after-close doctor` for initialization or environment problems.
4. Read only the reference required by the chosen workflow.
5. Treat missing risk fields as blocking. Never invent them.

## Choose the workflow

- **Initialize a member**: use `init`.
- **Record a decision or position change**: use `record`.
- **Publish reviewed content**: use `publish`.
- **Create a monthly review**: use `review`.
- **Correct published history**: use `amend`.
- **Diagnose content or environment failures**: use `doctor` or `validate`.

## Initialize

1. Confirm that a Maintainer has created the member entry under `src/content/members/`.
2. Run `pnpm after-close init` and collect `trader_id`, default market, IANA timezone, and disclosure mode.
3. Confirm that `.after-close.local.yaml` is gitignored and contains no credentials.
4. Run `pnpm after-close doctor`.
5. Stop if the member identity, GitHub authentication, or repository content check fails.

## Record

Read [record-schema.md](references/record-schema.md) and [compliance-boundaries.md](references/compliance-boundaries.md).

1. Identify one primary decision and its `position_effect`.
2. Search the member's records for the same Trade Case. Require an existing `case_id` for every action except a new `open`.
3. Collect the member's own facts. Ask concise follow-up questions for missing required fields.
4. Require the member to provide the thesis, risk budget or risk note, invalidation condition, and exit plan for `open` and `increase`.
5. Do not turn model analysis into the member's original reasoning. Label every inference and ask for confirmation.
6. Check for credentials, account identifiers, order identifiers, private addresses, and other sensitive data.
7. Prepare a temporary YAML draft using [record-draft.yaml](assets/record-draft.yaml). Do not place temporary drafts in the repository.
8. Run `pnpm after-close record --input <draft.yaml>`. Let the deterministic CLI create the ID, sequence, and path.
9. Run `pnpm after-close validate` and `pnpm scan:sensitive`.
10. Show the complete saved record and summarize the Case relationship. Do not push.

## Review

Read [review-guide.md](references/review-guide.md) and [compliance-boundaries.md](references/compliance-boundaries.md).

1. Read all records for the member and requested month.
2. Group them by `case_id` and distinguish judgment errors from execution errors.
3. Use only traceable statistics. Do not calculate account returns when cash flows or coverage are incomplete.
4. Cite concrete record IDs for every material conclusion.
5. Produce behavior, process, and risk-control improvements only. Do not suggest future securities or trades.
6. Prepare a temporary YAML draft using [review-draft.yaml](assets/review-draft.yaml).
7. Run `pnpm after-close review --input <draft.yaml>` and validate the saved review.
8. Show the complete review. Do not push.

## Amend

1. Compare the requested correction with the published record.
2. Fix the original file directly only for spelling, formatting, or an unambiguous transcription error. Explain the correction in the commit message.
3. For a substantive change to thesis, risk, occurrence time, or result, create a new record with `record_type: amendment` and `amends: <original-record-id>`.
4. Never delete a loss or failed decision to improve apparent performance.
5. Ask a Maintainer to handle deletions, privacy incidents, or Git history changes.

## Publish

1. Confirm that the relevant market has closed and the record uses an allowed publication policy.
2. Pull and rebase on the latest `main` before creating a content branch.
3. Run `pnpm validate`, `pnpm test`, and `pnpm build`.
4. Show the complete content and `git diff` to the member.
5. Ask for explicit confirmation to commit, push, and create the Pull Request. This confirmation cannot be inferred from an earlier recording request.
6. Only after confirmation, run:

   ```bash
   pnpm after-close publish --title "<title>" --confirm --market-closed
   ```

7. Report the Pull Request URL and CI state. Enable auto-merge only when the user explicitly requests it.

## Enforce boundaries

Read [charter.md](references/charter.md) when project intent or a borderline request is unclear.

- Refuse requests to recommend a security, choose a position size, set a stop price, promise a return, or create follow-trading advice.
- Explain that the Skill can record the user's own decision but cannot make the decision for them.
- Stop before saving when required risk facts are missing.
- Stop before publication when the market-close condition, user review, Diff review, or explicit confirmation is missing.
- Escalate suspected sensitive-data exposure or substantive history deletion to a Maintainer.
