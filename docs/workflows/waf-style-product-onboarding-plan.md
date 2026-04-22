# WAF-style product onboarding plan

This document maps how Well-Architected Framework (WAF) is set up in this repository and turns that into a cleaner foundation for onboarding a new product with the same overall shape.

## Goal

Use the WAF pattern for a new non-versioned documentation set without copying WAF-specific internal tooling or accidental published files.

## What WAF uses today

The current WAF product wiring uses the following repository pieces:

- `productConfig.mjs` contains a non-versioned product entry for `well-architected-framework`.
- `__fixtures__/productConfig.mjs` contains the matching fixture entry for tests when product config changes.
- `content/well-architected-framework/data/docs-nav-data.json` defines the sidebar navigation.
- `content/well-architected-framework/docs/` is the configured content root.
- `content/well-architected-framework/img/` stores assets.
- `content/well-architected-framework/redirects.jsonc` stores migrated redirects.
- `app/api/versionMetadata.json` exposes WAF as a single synthetic version `v0.0.x` because it is non-versioned.

The verified WAF config shape in `productConfig.mjs` is:

```mjs
'well-architected-framework': {
  assetDir: 'img',
  contentDir: 'docs',
  dataDir: 'data',
  productSlug: 'well-architected-framework',
  semverCoerce: semver.coerce,
  versionedDocs: false,
  websiteDir: 'website',
},
```

## Recommended foundation for a new product

Start with a smaller, cleaner structure than WAF.

```text
content/<new-product>/
├── data/
│   └── docs-nav-data.json
├── docs/
│   └── docs/
│       ├── index.mdx
│       ├── what-is.mdx
│       ├── <pillar-or-section-a>/
│       │   ├── index.mdx
│       │   └── <topic>.mdx
│       └── <pillar-or-section-b>/
│           └── index.mdx
├── img/
└── redirects.jsonc
```

## Required pieces

These are the pieces to plan for if the new product should behave like WAF in this repo.

### 1. Product registration

Add a new product entry in the following files:

- `productConfig.mjs`
- `__fixtures__/productConfig.mjs`

Use the WAF pattern if the new product is non-versioned:

- `assetDir: 'img'` if assets live in `content/<new-product>/img`
- `contentDir: 'docs'`
- `dataDir: 'data'`
- `versionedDocs: false`
- `productSlug` set to the public URL slug you want to serve

## 2. Navigation data

Create `content/<new-product>/data/docs-nav-data.json`.

This file drives the docs sidebar. WAF uses nested `title`, `path`, `heading`, and `routes` objects. Your page files and nav paths must match.

## 3. Published docs root

Create `content/<new-product>/docs/docs/` for the published MDX files.

At minimum, plan for:

- `index.mdx` for the product root route
- one first-reader landing page such as `what-is.mdx`
- one `index.mdx` for each major section you want in navigation

WAF's root `index.mdx` is a placeholder file for the product route. That pattern is worth keeping.

## 4. Assets

Create `content/<new-product>/img/` only if the new product needs local images or diagrams.

If you do not have assets yet, you can still scaffold the directory so content authors have a stable location.

## 5. Redirects

Create `content/<new-product>/redirects.jsonc` if you are migrating from an existing site structure or changing URLs.

If there are no legacy URLs, this file can wait until the redirect mapping work starts.

## WAF files you should not copy by default

WAF contains extra operational files under its configured content directory:

- `content/well-architected-framework/docs/SETUP.md`
- `content/well-architected-framework/docs/AGENTS.md`
- `content/well-architected-framework/docs/CLAUDE.md`
- `content/well-architected-framework/docs/templates/`
- `content/well-architected-framework/docs/.claude/`

Do not use those as part of the initial skeleton for a new product.

Reason: the current content index shows files under `content/well-architected-framework/docs/` as routable items, including internal helper files. That means copying WAF's full `docs/` folder structure can accidentally publish internal-only material.

## Safer authoring rule

Keep publishable content under:

```text
content/<new-product>/docs/docs/
```

Keep internal working notes outside the configured content root whenever possible.

If you need internal process docs for the new product, prefer one of these locations instead:

- `docs/workflows/`
- a separate non-published internal directory outside `content/<new-product>/docs/`

## Minimum starter files

Use this as the first scaffold for the new product.

```text
content/<new-product>/
├── data/
│   └── docs-nav-data.json
├── docs/
│   └── docs/
│       ├── index.mdx
│       ├── what-is.mdx
│       └── <section>/
│           └── index.mdx
├── img/
└── redirects.jsonc
```

Suggested first MDX files:

- `index.mdx`: top-level placeholder and overview
- `what-is.mdx`: first reader-facing introduction
- `<section>/index.mdx`: landing page for the first section

## Example scaffold sequence

1. Create `content/<new-product>/data/docs-nav-data.json`.
1. Create `content/<new-product>/docs/docs/index.mdx`.
1. Create `content/<new-product>/docs/docs/what-is.mdx`.
1. Create the first section folder and its `index.mdx`.
1. Add `content/<new-product>/img/`.
1. Add `content/<new-product>/redirects.jsonc` if old URLs exist.
1. Add the new product entry to `productConfig.mjs`.
1. Mirror that entry in `__fixtures__/productConfig.mjs`.

## Working assumptions to confirm before implementation

Answer these before we scaffold the new product:

1. What public URL slug should the new product use?
1. Should the new product be non-versioned like WAF, or versioned?
1. Should the product live at a top-level route like `/well-architected-framework`, or under another product slug?
1. Do you need redirects from an existing docs site or repo?
1. Do you want section names that behave like WAF pillars, or a flatter structure?

## Implementation plan

### Phase 1: Define the contract

Decide the product slug, versioning model, top-level sections, and whether redirects are required.

### Phase 2: Scaffold the filesystem

Create the new `content/<new-product>/` directory with `data`, `docs/docs`, and optional `img` and `redirects.jsonc`.

### Phase 3: Add routing and nav wiring

Add the product entry in `productConfig.mjs` and `__fixtures__/productConfig.mjs`. Build the initial `docs-nav-data.json` so it matches the first MDX files.

### Phase 4: Add starter content

Create the root `index.mdx`, introduction page, and one section landing page. Keep the initial pass small so routing and navigation are easy to verify.

### Phase 5: Add redirects and assets

Add redirects only after you have a confirmed old-to-new URL map. Add images only when content needs them.

### Phase 6: Validate

Verify that:

- the product appears in the generated content API
- the nav paths resolve to existing files
- no internal-only files appear as published routes
- root and section landing pages render correctly

## Notes for our working session

When we move from planning to implementation, we should build the new product as a cleaned-up WAF clone:

- copy the WAF repo wiring pattern
- copy only the publishable content shape
- do not copy WAF's internal helper docs into the content root
- keep the first content set intentionally small

Once you confirm the new product slug and whether it is non-versioned, we can turn this plan into the actual scaffold.