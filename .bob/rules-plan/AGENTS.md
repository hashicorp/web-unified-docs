# AGENTS.md — Plan mode

This file provides guidance to agents planning architectural changes in this repository.

## System boundaries

- **This repo** is the API backend. The frontend (`dev-portal`) is a separate repo. They communicate via HTTP. To test end-to-end, you need both running (via `make` / Docker Compose).
- **Prebuild is a mandatory step before any Next.js build.** Architectural changes that affect prebuild output schemas (e.g. `versionMetadata.json` or `docsPathsAllVersions.json`) must update both the prebuild script and every consumer.

## Key architectural constraints

- **Content is never read from disk at request time.** API routes fetch `public/content/` via HTTP to `SELF_URL` or fall through to `UNIFIED_DOCS_PROD_URL` in incremental build mode. Any plan to add file system access in route handlers violates this pattern.
- **`productConfig.mjs` is the single product registry.** New products, content dir changes, and versioning behavior all gate through it. There is no other config.
- **Non-versioned products use a synthetic `v0.0.x` version.** The version resolution logic in `contentVersions.ts` special-cases this. Any versioning change must account for it.
- **Incremental builds** depend on `changedContentFiles.json` (generated during CI). `fetchFile` in `app/utils/file.ts` reads it to decide whether to serve from current build or production. Don't bypass this mechanism.

## Prebuild pipeline stages (in order)

1. `gatherVersionMetadata` → `app/api/versionMetadata.json`
2. `gatherAllVersionsDocsPaths` → `app/api/docsPathsAllVersions.json`
3. `buildMdxTransforms` — processes MDX (partials, internal links, alerts)
4. `copyNavDataFiles`, `copyRedirectFiles`, `copyAssetFiles`
5. Optionally: `buildAlgoliaRecords` (only with `--build-algolia-index`)

Changes to stage order or schema affect all downstream stages.

## No barrel files constraint

`eslint-plugin-no-barrel-files` actively warns. Do not design module structures that require index re-export files. Direct imports only.

## Result type is pervasive
The Rust-style `Result<T,E>` pattern (`Ok`/`Err`) is used throughout `app/`. Any new utility or API handler must return `Result` for fallible operations, not throw exceptions. This is load-bearing for consistent API error handling.

## Vitest + path aliases
`vite-tsconfig-paths` plugin enables `#utils/*` etc. in tests. Any new path alias added to `tsconfig.json#paths` must also be added to `package.json#imports` to work in both vitest and Node.js contexts.
