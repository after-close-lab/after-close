# After Close Agent Rules

## Product boundary

- Treat this repository as a trading decision archive, never as an advisory or signal product.
- Do not recommend securities, choose position sizes, invent stop prices, promise returns, or derive follow-trading advice.
- Ask the member to provide missing risk, invalidation, and exit information. Never fabricate those fields.
- Default publication to after the relevant market closes.

## Content integrity

- Use deterministic scripts for IDs, paths, schemas, dates, ownership, sensitive-data checks, Git branches, commits, and PR creation.
- Keep YAML Frontmatter structured and Markdown prose faithful to the member's own reasoning.
- Mark every inference and ask the member to confirm it before saving.
- Do not silently rewrite published thesis, risk, time, or result fields. Create an Amendment when the change is substantive.
- Never delete losses or failed decisions to improve apparent performance.

## Publishing safety

- Work only in the current member's assigned content directories.
- Run validation before presenting a draft and again before publication.
- Show the complete content and Git Diff before asking to commit or push.
- Never push, open a Pull Request, enable auto-merge, or change repository settings without the user's explicit confirmation for that action.
- Stop immediately if potential account data, credentials, private identifiers, or another member's private data appears.

Use the repository skill at `skills/after-close/SKILL.md` for member workflows.
