# Architecture and deployment

## High-value architecture facts

- The repo uses Next.js and requires Node `>=24`.
- The unified docs API processes `content/` and produces the served content and
  metadata that `dev-portal` consumes.
- Local development splits by audience; see
  [local-development.md](local-development.md).

## CI, previews, and deployment mental model

Work from this baseline mental model and then verify details in the workflow
files.

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
- the preview workflow also deploys a `dev-portal` preview configured to consume
  the preview API
- preview behavior is defined in `.github/workflows/build-pr-preview.yml`
- each preview deployment is aliased to a stable, per-PR URL (`vercel alias set`)
  so the "Visit Preview" link in the PR comment doesn't change between pushes to
  the same PR

### Production flow

- pushes to `main` for specific paths trigger production deployment
- production deploy uses Vercel to build and deploy this repo
- production deploy triggers a `dev-portal` rebuild through a deploy hook
- production behavior is defined in `.github/workflows/deploy-udr.yml`
- `next.config.js` excludes `scripts/prebuild/**` from deployed server file
  traces. Application imports of the incremental metadata watcher and MDX
  transforms are guarded by a direct `process.env.NODE_ENV === 'development'`
  check as well as the build type. Next.js removes those imports and local file
  reads from production bundles, including incremental PR previews. A runtime
  build-type check alone cannot prevent tracing the source content tree.
- Production metadata reads and existence checks use explicit paths to
  `app/api/versionMetadata.json` and `app/api/docsPathsAllVersions.json`.
  Avoid passing paths through filesystem callbacks: Turbopack can interpret
  these as dynamic paths and include the whole repository in function traces.
  Content and assets are served through the CDN, not packaged inside API
  functions. When changing these boundaries, inspect the API
  `route.js.nft.json` files under `.next/server/app/api/` after `next build`.

## Relationship to dev-portal

This repo is not the full frontend application.

- `web-unified-docs` owns unified content sourcing, content processing, and API
  delivery
- `dev-portal` owns the broader frontend experience that consumes this content
- some feature work spans both repositories
- preview and production flows may need coordinated changes in both repositories

When a task changes both the API contract and the frontend experience,
explicitly call out the split:

- what changes belong in `web-unified-docs`
- what changes belong in `dev-portal`
- what needs coordinated preview testing across both repos
