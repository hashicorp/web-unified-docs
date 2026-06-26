# Web Unified Docs agent guide

## Purpose

Use this file as the default operating guide for AI agents that contribute to the architectural/process code behind `hashicorp/web-unified-docs`.

This file should help an agent:

- understand the repository's role in the DevDot platform
- find the right code and content surfaces quickly
- work in a test-driven way by default
- verify assumptions against the repository instead of guessing
- understand where this repo ends and where `dev-portal` begins

This file is intentionally practical. It should describe how this codebase works and how to make safe changes inside it. It should not try to duplicate every specialized process document in the repo.

## Scope

This repository is the unified docs API and content source for migrated product documentation.

This file is for contributing to the overall codebase, architecture, workflows, and operational behavior of `web-unified-docs`.

Do not treat this file as the primary guide for product-specific documentation work inside an individual product folder. When a task is specific to one product or content set, first check that product area for its own `AGENTS.md`, style guidance, templates, or other local instructions and follow those repo-local documents before applying the general guidance here.

- `web-unified-docs` stores versioned product docs under `content/`
- this repo builds and serves documentation content through the unified docs API
- `dev-portal` is the frontend that consumes this API and renders the user-facing experience
- both repos participate in preview and production flows

When you need to explain or change behavior, verify the current implementation in this repo first. Do not infer architecture or workflow behavior from old notes.

## Core working rules

1. Verify before you claim. Read the relevant files before stating how the system works.
1. Start with the smallest change that can solve the problem.
1. Prefer targeted tests before broad refactors.
1. Keep changes local to the layer you are modifying.
1. Treat generated artifacts and build outputs as derived from source unless the repo clearly requires direct edits.
1. If behavior touches deployment or preview infrastructure, inspect the matching GitHub Actions workflow before changing code.

## Required workflow: TDD first

Default to a test-driven workflow for code changes.

1. Identify the exact behavior that needs to change.
1. Find the closest existing test file or create a focused new test near the changed logic.
1. Write or update the failing test first.
1. Make the smallest code change that makes the test pass.
1. Run the narrowest relevant test command first.
1. Run broader validation only after the targeted test passes.

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

### TDD expectations by change type

**Utility or transformation logic:**
- start in `app/utils/*.test.ts` when possible
- keep fixtures small and explicit
- prefer adding coverage around the exact edge case you are changing

**API behavior:**
- inspect `app/api/` first
- test the transformation or file-resolution logic underneath the route when possible
- avoid changing route handlers before you understand the generated content contract

**Content-processing behavior:**
- inspect `scripts/prebuild/`, `scripts/watch-content.mjs`, and supporting utilities
- verify whether the source of truth is `content/`, generated files in `public/`, or metadata files in `app/api/`

**Docs-content-only changes:**
- if the change is only under `content/`, code tests may not be the primary validation path
- still validate links, frontmatter, rendered output, and preview behavior when relevant

## Local development

Local development splits by audience.

- **Educators** primarily make `content/` changes and run the full local
  preview through Docker with `make`:

```sh
make
make clean
```

- **Developers** work on application or tooling code and run the project
  locally with `npm`:

```sh
npm run prebuild
npm run dev
```

## First places to look

Start with the following files before making architectural claims:

- `README.md` for local development and repo purpose
- `package.json` for supported runtime and executable commands
- `makefile` for container-based local preview flow
- `productConfig.mjs` for product-specific configuration patterns
- `.github/workflows/test-and-lint.yml` for required CI validation
- `.github/workflows/build-pr-preview.yml` for preview deployment behavior
- `.github/workflows/deploy-udr.yml` for production deployment behavior

Then narrow your search by change type.

### Feature-local documentation

Some features document themselves directly next to their implementation rather
than in `docs/` or the root `README.md`. A feature directory may include its own
`README.md` (or similar notes) explaining how that piece works, how to extend it,
and how to test it. This is most common under `scripts/` — for example, the
content-exclusion MDX transform documents itself in
`scripts/prebuild/mdx-transforms/exclude-content/README.md`, right alongside its
implementation, and several other `scripts/` subdirectories follow the same
pattern.

Before changing a feature, look for a co-located `README.md` or notes file in the
same directory (and parent directories) and read it first. When you change the
feature's behavior, update that co-located documentation in the same PR.

## Repo map

### Primary source directories

- `content/`: source-of-truth docs content for migrated products and shared content
- `app/`: Next.js application and API routes
- `app/utils/`: core utility logic and existing Vitest coverage
- `scripts/`: prebuild, migration, link-check, and maintenance scripts
- `public/`: generated or served static output
- `docs/`: internal documentation, process docs, and research notes

### High-value architecture facts

- The repo uses Next.js and requires Node `>=24`.
- The unified docs API processes `content/` and produces the served content and
  metadata that `dev-portal` consumes.
- Local development splits by audience; see the "Local development" section.

## How to navigate common tasks

### If you are changing content ingestion or metadata generation

Inspect the following areas first:

- `scripts/prebuild/`
- `scripts/watch-content.mjs`
- `app/api/`
- `app/utils/`
- `productConfig.mjs`

### If you are changing the Next.js app shell or API delivery

This repo does not render a user-facing frontend — `dev-portal` owns that. The
`app/` surface here is intentionally minimal: `app/layout.tsx` is a bare HTML
shell and `app/page.tsx` simply redirects to the GitHub repository. Content is
delivered through the API routes, not rendered into pages here.

Inspect the following areas first:

- `app/api/` for the content and metadata endpoints `dev-portal` consumes
- `app/utils/` for the resolution and transformation logic behind the routes

### If you are changing product-specific behavior

Inspect the following areas first:

- `productConfig.mjs`
- product folders under `content/`
- any matching workflow or migration script under `scripts/`

Product behavior is centralized in the `PRODUCT_CONFIG` map in `productConfig.mjs`.
Each product is a keyed entry with a fixed set of attributes (such as `contentDir`,
`dataDir`, `versionedDocs`, `productSlug`, and `semverCoerce`, plus optional fields
like `basePaths` and `internalProduct`). Per-product differences are expressed as
field values and optional overrides within that map rather than as separate
per-product workflows. Confirm a product's specific values there before assuming
how it behaves.

### If you are changing preview or deployment behavior

Inspect the following areas first:

- `.github/workflows/build-pr-preview.yml`
- `.github/workflows/deploy-udr.yml`
- `.github/workflows/test-and-lint.yml`
- any referenced scripts or secrets usage in those workflows

## CI, previews, and deployment mental model

Agents should work from this baseline mental model and then verify details in the workflow files.

### CI

- pull requests trigger test and lint validation
- PR preview workflows build and deploy preview environments
- a prebuild-binary check (`.github/workflows/check-prebuild-binaries.yml`)
  runs on PRs that touch `scripts/prebuild/**`, `scripts/utils/**`,
  `scripts/algolia/**`, or `productConfig.mjs`. If those change, the three
  committed gzipped binaries (`prebuild-arm-mac-binary.gz`,
  `prebuild-x64-linux-binary.gz`, `prebuild-arm-linux-binary.gz`) must be
  regenerated and committed too, or the check fails. Rebuild them with
  `npm run compile-prebuild` and commit the result.

### Preview flow

- the repo deploys a unified docs API preview through Vercel
- the preview workflow also deploys a `dev-portal` preview configured to consume the preview API
- preview behavior is defined in `.github/workflows/build-pr-preview.yml`

### Production flow

- pushes to `main` for specific paths trigger production deployment
- production deploy uses Vercel to build and deploy this repo
- production deploy triggers a `dev-portal` rebuild through a deploy hook
- production behavior is defined in `.github/workflows/deploy-udr.yml`

## Relationship to dev-portal

This repo is not the full frontend application.

- `web-unified-docs` owns unified content sourcing, content processing, and API delivery
- `dev-portal` owns the broader frontend experience that consumes this content
- some feature work spans both repositories
- preview and production flows may need coordinated changes in both repositories

When a task changes both the API contract and the frontend experience, explicitly call out the split:

- what changes belong in `web-unified-docs`
- what changes belong in `dev-portal`
- what needs coordinated preview testing across both repos

## Source hierarchy for agents

Use the following priority order when gathering context:

1. Implementation files and tests in this repository
1. Product-local agent or instruction files inside the specific product directory when the task is product-specific
1. Root operational files such as `README.md`, `package.json`, `makefile`, and `.github/workflows/*.yml`
1. Focused internal docs under `docs/`
1. Local research notes under `docs/.research/` as supporting context only, when present

Research notes may be helpful, but `docs/.research/` is git-ignored and local to
an individual contributor — do not assume those files exist for everyone or in
CI. They can also be specialized or stale. Treat them as secondary references
and verify important claims against the live code and workflow files.

When the task is content authoring inside a product folder under `content/`,
prefer that product's own local instructions over this root file where they
conflict or are more detailed. For process, architecture, and tooling work
outside `content/`, this file is the governing guide.

## Safe change checklist

Before opening or updating a PR, make sure you did the following:

1. Verified the behavior in the relevant source files.
1. Added or updated the narrowest useful test when changing code.
1. Ran the relevant test command locally.
1. Ran lint when touching JavaScript or TypeScript.
1. Checked whether the change also affects preview or deployment workflows.
1. Called out any required `dev-portal` follow-up explicitly.

## Background and rationale

The entry points in "First places to look" cover how the repo runs today. For
why it is built the way it is, read deeper context only when a task needs it:

- `docs/decisions/` — architecture decision records covering API parity,
  applying some MDX transforms at build time, and authoring MDX content outside
  the `public/` directory. Read the relevant ADR before changing behavior it
  describes.
- `docs/images/UDR_Architecture_diagram.png` and
  `docs/images/UDR_Build_Architecture_diagram.png` — system and build
  architecture diagrams. Use the image-viewing tool to load and interpret them
  when you need the end-to-end picture.

## Maintenance rule for this file

Treat this file as operational documentation derived from the repository's current source of truth.

When updating this file:

1. prefer improving an existing section over creating overlapping guidance
1. remove stale claims instead of layering exceptions on top of them
1. keep the file specific to `web-unified-docs`
1. verify every operational statement against the repo before adding it

Update this file in the same PR when your change modifies any of the following:

- local development commands in `README.md`, `package.json`, or `makefile`
- required runtime versions, build steps, or validation commands
- repository structure, source-of-truth directories, or generated artifact locations
- behavior in `.github/workflows/*.yml`
- Vercel preview or production deployment flow
- the contract or working relationship between `web-unified-docs` and `dev-portal`
- the recommended place to start for a common task

Before updating this file:

1. read the implementation or workflow file that actually changed
1. update only the sections affected by that change
1. remove outdated guidance in the same edit
1. keep summaries short and point readers to source files for details

If you changed any of the trigger areas above and did not update this file, explain why in your final summary. Do not add speculative guidance just to keep this file synchronized. If the new behavior is not yet verified, leave the existing text unchanged and call out the gap explicitly.

### Drift detection for changes made without AI

Not every change to this repo is made with an AI agent in the loop. A developer
may edit a workflow, bump the Node version, rename a directory, or change a
command directly. When that happens, the corresponding guidance in this file can
silently go stale. The next agent to work in the repo is responsible for
catching that drift.

At the start of any task that relies on facts in this file, spot-check the
specific facts you are about to depend on against their source of truth before
acting on them. You do not need to re-verify the entire file — only the claims
relevant to your current task. Use this mapping:

- runtime version, scripts, or commands — verify against `package.json`,
  `makefile`, and `README.md`
- repository structure or source-of-truth directories — verify against the
  actual directory tree
- CI, preview, or deployment behavior — verify against `.github/workflows/*.yml`
- product-specific behavior — verify against `productConfig.mjs` and the
  relevant product folder under `content/`
- the `web-unified-docs` ↔ `dev-portal` contract — verify against the API routes
  under `app/api/` and the consuming behavior described for dev-portal

When you find that this file disagrees with the source of truth:

1. trust the source of truth, not this file, for the task at hand
1. correct the stale statement in this file as part of your change
1. if the correction is outside the scope of your current task, call out the
   drift explicitly in your final summary so a human can follow up
1. never "fix" this file to match an assumption — only update it to match a fact
   you verified in the repository