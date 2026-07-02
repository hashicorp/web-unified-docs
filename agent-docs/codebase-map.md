# Codebase map and navigation

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

- `content/`: source-of-truth docs content for migrated products and shared
  content
- `app/`: Next.js application and API routes
- `app/utils/`: core utility logic and existing Vitest coverage
- `scripts/`: prebuild, migration, link-check, and maintenance scripts
- `public/`: generated or served static output
- `docs/`: internal documentation, process docs, and research notes

## Feature-local documentation

Some features document themselves directly next to their implementation rather
than in `docs/` or the root `README.md`. A feature directory may include its own
`README.md` (or similar notes) explaining how that piece works, how to extend
it, and how to test it. This is most common under `scripts/` — for example, the
content-exclusion MDX transform documents itself in
`scripts/prebuild/mdx-transforms/exclude-content/README.md`, right alongside its
implementation, and several other `scripts/` subdirectories follow the same
pattern.

Before changing a feature, look for a co-located `README.md` or notes file in
the same directory (and parent directories) and read it first. When you change
the feature's behavior, update that co-located documentation in the same PR.

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

Product behavior is centralized in the `PRODUCT_CONFIG` map in
`productConfig.mjs`. Each product is a keyed entry with a fixed set of attributes
(such as `contentDir`, `dataDir`, `versionedDocs`, `productSlug`, and
`semverCoerce`, plus optional fields like `basePaths` and `internalProduct`).
Per-product differences are expressed as field values and optional overrides
within that map rather than as separate per-product workflows. Confirm a
product's specific values there before assuming how it behaves.

### If you are changing preview or deployment behavior

Inspect the following areas first:

- `.github/workflows/build-pr-preview.yml`
- `.github/workflows/deploy-udr.yml`
- `.github/workflows/test-and-lint.yml`
- any referenced scripts or secrets usage in those workflows

## Source hierarchy for agents

Use the following priority order when gathering context:

1. Implementation files and tests in this repository
1. Product-local agent or instruction files inside the specific product
   directory when the task is product-specific
1. Root operational files such as `README.md`, `package.json`, `makefile`, and
   `.github/workflows/*.yml`
1. Focused internal docs under `docs/`
1. Local research notes under `docs/.research/` as supporting context only, when
   present

Research notes may be helpful, but `docs/.research/` is git-ignored and local to
an individual contributor — do not assume those files exist for everyone or in
CI. They can also be specialized or stale. Treat them as secondary references
and verify important claims against the live code and workflow files.

When the task is content authoring inside a product folder under `content/`,
prefer that product's own local instructions over the root guide where they
conflict or are more detailed. For process, architecture, and tooling work
outside `content/`, the root guide and these files are the governing guidance.

## Background and rationale

The entry points above cover how the repo runs today. For why it is built the
way it is, read deeper context only when a task needs it:

- `docs/decisions/` — architecture decision records covering API parity,
  applying some MDX transforms at build time, and authoring MDX content outside
  the `public/` directory. Read the relevant ADR before changing behavior it
  describes.
- `docs/images/UDR_Architecture_diagram.png` and
  `docs/images/UDR_Build_Architecture_diagram.png` — system and build
  architecture diagrams. Use the image-viewing tool to load and interpret them
  when you need the end-to-end picture.
