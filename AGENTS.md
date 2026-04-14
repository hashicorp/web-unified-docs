# Web Unified Docs agent guide

## Purpose

Use this file as the default operating guide for AI agents that contribute to `hashicorp/web-unified-docs`.

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

For local application behavior, the repo also uses:

```sh
make
make clean
npm run prebuild
npm run dev
```

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

## Repo map

### Primary source directories

- `content/`: source-of-truth docs content for migrated products and shared content
- `app/`: Next.js application and API routes
- `components/`: shared UI and rendering components
- `app/utils/`: core utility logic and existing Vitest coverage
- `scripts/`: prebuild, migration, link-check, and maintenance scripts
- `public/`: generated or served static output
- `docs/`: internal documentation, process docs, and research notes

### High-value architecture facts

- The repo uses Next.js.
- The repo requires Node `>=24`.
- Local preview commonly runs through Docker using `make`.
- The unified docs API processes `content/` and produces served content and metadata.
- `dev-portal` depends on this repo as one of its content APIs.

## How to navigate common tasks

### If you are changing content ingestion or metadata generation

Inspect the following areas first:

- `scripts/prebuild/`
- `scripts/watch-content.mjs`
- `app/api/`
- `app/utils/`
- `productConfig.mjs`

### If you are changing frontend rendering in this repo

Inspect the following areas first:

- `app/layout.tsx`
- `app/page.tsx`
- `components/`
- `next.config.js`

### If you are changing product-specific behavior

Inspect the following areas first:

- `productConfig.mjs`
- product folders under `content/`
- any matching workflow or migration script under `scripts/`

Do not assume every product has a custom workflow. The repo appears to centralize most product behavior in configuration, with specific exceptions that must be verified in the codebase.

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
1. Research docs under `docs/.research/` as supporting context only

Research docs may be helpful, but they can be specialized or become stale. Treat them as secondary references and verify important claims against the live code and workflow files.

For product-specific work, prefer the nearest local instructions in that product's directory over this root file when the guidance conflicts or is more detailed.

## Safe change checklist

Before opening or updating a PR, make sure you did the following:

1. Verified the behavior in the relevant source files.
1. Added or updated the narrowest useful test when changing code.
1. Ran the relevant test command locally.
1. Ran lint when touching JavaScript or TypeScript.
1. Checked whether the change also affects preview or deployment workflows.
1. Called out any required `dev-portal` follow-up explicitly.

## Known starting references

Use the following documents as starting points:

- `README.md`
- `docs/BROKEN_LINK_MONITORING.md`
- `docs/.research/BUILD_DEPLOY_WORKFLOWS.md`
- `docs/.research/PRODUCT_SPECIFIC_WORKFLOWS_RESEARCH.md`

Do not treat the research docs as authoritative without verifying them.

## Fill-in sections

The following sections are placeholders we should expand over time.

### Branching and PR conventions

Add the repo's preferred PR workflow, labeling expectations, and review norms.

### Required test matrix by change type

Add a sharper map of which commands to run for:

- content-only changes
- API changes
- prebuild changes
- config changes
- preview or deployment changes

### Dev-portal coordination guide

Add concrete guidance for:

- when to open a paired `dev-portal` PR
- how to set preview environment variables
- what to test in the frontend after an API change

### GitHub Actions and Vercel operational notes

Add verified guidance for:

- which workflows are informational versus blocking
- how preview URLs are reported back to PRs
- what secrets and deploy hooks matter for production
- common failure modes and where to inspect them

### Architecture deep dive

Add a more precise explanation of:

- how `content/` becomes served API output
- how metadata files are generated
- which files are source versus derived artifacts
- where product config overrides enter the pipeline

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