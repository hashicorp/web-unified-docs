# Local development

Local development splits by audience.

## Educators

Educators primarily make `content/` changes and run the full local preview
through Docker with `make`:

```sh
make
make clean
```

## Developers

Developers work on application or tooling code and run the project locally with
`npm`:

```sh
npm run prebuild
npm run dev
```

`npm run dev` starts Next.js. When local incremental development is enabled,
loading the metadata module starts a recursive watcher for `content/` before
the first metadata request. The watcher logs changed paths and sends a refresh
POST to `${DEV_PORTAL_URL}/api/refresh`.

`npm run prebuild` populates the `public/` folder and only needs to run once
(or when prebuild sources change — see `scripts/prebuild/**` or
`productConfig.mjs`). It is a long-running process; run it manually when
needed rather than before every `npm run dev`.

The watcher does not transform Markdown or copy navigation data and assets;
local incremental builds handle content when it is requested.

The MDX transform module can also run directly from the repository root for one
or more files:

```text
node scripts/prebuild/mdx-transforms/build-mdx-transforms.mjs <file-path> [file-path...]
```

It reads version metadata from `app/api/versionMetadata.json` and writes the
requested files from `content/` to their corresponding paths in `public/content/`.
Local incremental development preloads the transform module and calls it directly
for Markdown requests, without starting a subprocess. Transform errors are
returned without exiting the server.
Navigation data, redirects, and assets are read directly from `content/`.

When `INCREMENTAL_BUILD=true`, `NODE_ENV=development`, and this is not a Vercel
preview, the metadata module loads `app/utils/incBuildsMetadata.ts`, which starts
the watcher immediately. Metadata consumers lazily generate version metadata
and all-version document paths in memory on the first request, sharing one cache
across API routes. Every content event logs its path and triggers a Dev Portal
refresh. File saves are ignored for metadata, including edits to existing files.
Structural changes schedule a background path check for the affected product.
Only path additions, removals, and renames within an existing product regenerate
that product's version metadata and all-version document paths; other products
remain cached. Events without a filename check all product folders but still
regenerate only products whose paths changed. Requests wait for the shared
rebuild queue to finish, including changes received during generation. Atomic
saves that replace an existing file without changing the final paths are
ignored for metadata, but still trigger a Dev Portal refresh. Background
metadata failures are logged, waiting requests reject, and later requests retry
failed products. No generated JSON files are rewritten. Preview and production
continue to use `app/api/versionMetadata.json` and
`app/api/docsPathsAllVersions.json`.

The pre-commit hook updates date metadata for staged MDX files under
`content/`. It preserves an existing `created_at` value and updates
`last_modified` to the commit time.

## Runtime

The repo uses Next.js and requires Node `>=24` (see `package.json` `engines`).
