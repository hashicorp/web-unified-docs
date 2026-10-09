# Testing and TDD

Default to a test-driven workflow for code changes.

## Required workflow: TDD first

1. Identify the exact behavior that needs to change.
1. Find the closest existing test file or create a focused new test near the
   changed logic.
1. Write or update the failing test first.
1. Make the smallest code change that makes the test pass.
1. Run the narrowest relevant test command first.
1. Run broader validation only after the targeted test passes.

## Validation ladder

Use these commands as the default validation ladder:

```sh
npm run test
npm run coverage
npm run lint
```

`npm run test` runs `vitest`, which enters watch mode in a local terminal (it
only auto-runs once when it detects CI). When running tests non-interactively,
use run mode to avoid hanging — for example `npx vitest run` or
`npx vitest run path/to/file`. Note that `npm run lint` runs `eslint --fix`,
which writes fixes to files rather than only reporting them.

## TDD expectations by change type

**Utility or transformation logic:**

- start in `app/utils/*.test.ts` when possible
- keep fixtures small and explicit
- prefer adding coverage around the exact edge case you are changing

**API behavior:**

- inspect `app/api/` first
- test the transformation or file-resolution logic underneath the route when
  possible
- avoid changing route handlers before you understand the generated content
  contract

**Content-processing behavior:**

- inspect `scripts/prebuild/`, `scripts/watch-content.mjs`, and supporting
  utilities
- verify whether the source of truth is `content/`, generated files in
  `public/`, or metadata files in `app/api/`

**Docs-content-only changes:**

- if the change is only under `content/`, code tests may not be the primary
  validation path
- still validate links, frontmatter, rendered output, and preview behavior when
  relevant
