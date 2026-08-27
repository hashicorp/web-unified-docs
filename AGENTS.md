# Web Unified Docs agent guide

`web-unified-docs` is the unified docs API and content source: it stores
versioned product docs under `content/`, builds and serves them through the
unified docs API, and feeds the `dev-portal` frontend that renders the
user-facing experience.

## Essentials

- **Runtime:** Node `>=24` (Next.js). Package manager is `npm`.
- **Educator preview (content work):** `make` (Docker), `make clean` to tear
  down.
- **Developer run:** `npm run prebuild` then `npm run dev`.
- **Tests:** `npm run test` (vitest — watch mode locally; use `npx vitest run`
  non-interactively), then `npm run coverage`, then `npm run lint`
  (`eslint --fix` writes fixes).
- **Prebuild binaries:** if you touch `scripts/prebuild/**`, `scripts/utils/**`,
  `scripts/algolia/**`, or `productConfig.mjs`, regenerate binaries with
  `npm run compile-prebuild` and commit them, or CI fails.

## Core working rules

1. Verify before you claim. Read the relevant files before stating how the
   system works — this repo's guidance can drift from the source of truth.
1. Default to a test-driven workflow (see
   [testing-and-tdd.md](agent-docs/testing-and-tdd.md)) and make the smallest
   change that solves the problem.
1. Keep changes local to the layer you are modifying.
1. Treat generated artifacts and build outputs as derived from source unless the
   repo clearly requires direct edits.
1. If behavior touches deployment or preview infrastructure, inspect the
   matching GitHub Actions workflow before changing code.
1. After completing a change, do a quick self-check: did you touch commands or
   scripts, runtime versions, repo structure, CI/deployment workflows, or the
   `dev-portal` API contract? If yes, update the relevant `agent-docs/` file in
   the same PR. Read
   [maintaining-this-guide.md](agent-docs/maintaining-this-guide.md) if you need
   help determining which file to update or what to change.

## Scope

This is the general operating guide for the codebase, architecture, workflows,
and operational behavior of `web-unified-docs`. When a task is specific to one
product or content set under `content/`, check that product area for its own
`AGENTS.md` and follow those local instructions first. Authoring conventions for
a product live in `docs/content-guide/products/`, not under `content/`.

Documentation-review guidance for changed Markdown/MDX under `content/` is
path-specific and lives in `.github/instructions/*.instructions.md`.

Authoring guidance for content under `content/` lives in `docs/`, and is the
source of truth for both humans and agents:

- [docs/content-guide/content-types.md](docs/content-guide/content-types.md) —
  which content type to use, the page structure for each, and the templates in
  `docs/content-guide/templates/`.
- [docs/content-guide/products/](docs/content-guide/products/index.md) — how each
  product implements those content types, and which template to use for it.
  **Check this before choosing a type or copying a template.** A product page
  takes precedence over the global guidance for the differences it records.
- [docs/style-guide/index.md](docs/style-guide/index.md) — voice, word choice,
  formatting, headings, links, and markdown rules. Start with
  [top-12.md](docs/style-guide/top-12.md).
- [docs/content-guide/indexing.md](docs/content-guide/indexing.md) — file,
  folder, and navigation label naming.

Read these rather than relying on recall. They change, and the guidance in this
file can drift from them.

## Detailed guides

- [Local development](agent-docs/local-development.md) — educator vs developer
  flows and runtime.
- [Testing and TDD](agent-docs/testing-and-tdd.md) — required workflow,
  validation ladder, and expectations by change type.
- [Codebase map and navigation](agent-docs/codebase-map.md) — repo map, first
  places to look, common-task navigation, source hierarchy, and rationale.
- [Architecture and deployment](agent-docs/architecture-and-deployment.md) — CI,
  preview, production flows, and the `dev-portal` relationship.
- [Maintaining the agent guide](agent-docs/maintaining-this-guide.md) —
  maintenance rules and drift detection.