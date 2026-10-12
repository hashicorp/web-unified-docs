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

On supported platforms, `npm run prebuild` runs a committed prebuild binary.
After changing prebuild sources, regenerate all three binaries with
`npm run compile-prebuild` before rerunning the command.

Prebuild selects a single build type using
[`buildType`](../scripts/utils/get-type-of-build.mjs), computed once when the
utility module loads:

- `prodBuild`: `VERCEL_ENV=production`, regardless of the other flags.
- `incBuildLocalDev`: `INCREMENTAL_BUILD=true` and `NODE_ENV=development`,
  outside Vercel production. Generates metadata without the full content-transform
  and copy pass, because files are served dynamically in local development.
- `incBuildPRPreview`: `INCREMENTAL_BUILD=true` and `NODE_ENV=production`,
  outside Vercel production. Transforms and copies only added and modified files.
- `fullBuild`: all other environments.

Both `prodBuild` and `fullBuild` transform and copy all configured product content.

The watcher does not transform Markdown or copy navigation data and assets;
local incremental builds handle content when it is requested.

MDX transforms are called through the module API, which requires an explicit array
of file paths rather than discovering files from the target directory.
Local incremental development preloads the transform module and calls it directly
for Markdown requests, passing only the requested Markdown path in the explicit
file list, without starting a subprocess. Transform errors are
returned without exiting the server.
Navigation data, redirects, and assets are read directly from `content/`.

The metadata module, watcher, and file-serving utilities use the same cached
`buildType` value as prebuild. Incremental previews fetch added and modified files
from the current build and unchanged files from production. `prodBuild` and
`fullBuild` fetch all files from the current build.
Environment flag changes require reloading the utility module to select a new type.
When the value is `incBuildLocalDev` (`INCREMENTAL_BUILD=true`, `NODE_ENV=development`,
and `VERCEL_ENV` is not `production`), `app/utils/incBuildsMetadata.ts` starts
the watcher immediately on module load. On the first metadata request, it loads the generated
JSON files if both exist; otherwise it generates metadata on demand and queues
the files for background writing. API routes share one in-memory cache. Every
content event logs its path and triggers a Dev Portal refresh. File saves are
ignored for metadata, including edits to existing files. Structural changes
schedule a background path check for the affected product. Only path additions, removals,
and renames within an existing product regenerate that product's version
metadata and all-version document paths; other products remain cached. After a
product is regenerated, both metadata JSON files are updated asynchronously,
without delaying requests. Events without a filename check all product folders
but still regenerate only products whose paths changed. Requests wait for the
shared rebuild queue to finish, including changes received during generation.
Atomic saves that replace an existing file without changing the final paths are
ignored for metadata, but still trigger a Dev Portal refresh. Background
metadata failures are logged, waiting requests reject, and later requests retry
failed products. All other build types read
`app/api/versionMetadata.json` and `app/api/docsPathsAllVersions.json`.

The pre-commit hook updates date metadata for staged MDX files under
`content/`. It preserves an existing `created_at` value and updates
`last_modified` to the commit time.

## Runtime

The repo uses Next.js and requires Node `>=24` (see `package.json` `engines`).
