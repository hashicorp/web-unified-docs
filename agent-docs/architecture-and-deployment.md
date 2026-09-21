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

### Production flow

- pushes to `main` for specific paths trigger production deployment
- production deploy uses Vercel to build and deploy this repo
- production deploy triggers a `dev-portal` rebuild through a deploy hook
- production behavior is defined in `.github/workflows/deploy-udr.yml`

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
