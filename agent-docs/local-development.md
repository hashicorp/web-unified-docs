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
loading the metadata module preloads the incremental metadata module, which
starts a recursive watcher for `content/`. Metadata requests await this preload.
The watcher logs changed paths and sends a refresh
POST to `${DEV_PORTAL_URL}/api/refresh`.

`npm run prebuild` populates the `public/` folder and only needs to run once
(or when prebuild sources change — see `scripts/prebuild/**` or
`productConfig.mjs`). It is a long-running process; run it manually when
needed rather than before every `npm run dev`.

On supported platforms, `npm run prebuild` runs a committed prebuild binary.
After changing prebuild sources, regenerate all three binaries with
`npm run compile-prebuild` before rerunning the command.

Prebuild selects a single build type using
[`getBuildType()`](../scripts/utils/get-type-of-build.mjs) at the start of each
run. The detector reads the current environment on every call, including in the
compiled binaries; it does not bake the compiler's `NODE_ENV` into the result:

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
Local incremental development preloads the transform module with a typed literal
dynamic import and calls it directly
for Markdown requests, passing only the requested Markdown path in the explicit
file list, without starting a subprocess. The shared transform API rejects with
file-specific errors instead of terminating the process. The prebuild CLI logs
failures and sets exit status 1; local Markdown requests return the errors
without exiting the server.
Source existence is checked with `access()` before transformation; the file
loader reads only the transformed output.
Versioned navigation data is read directly from `content/` and version-rewritten
in memory using the same transformation as prebuild, without copying or writing
files. Unversioned navigation bypasses the transformation and metadata lookup.
Historical navigation paths and section links include the selected version;
latest and unversioned navigation remains unchanged.
Redirects and assets are also read directly from `content/`.

The metadata module, watcher, and file-serving utilities share the cached
[`buildType`](../app/utils/buildType.ts) value, computed once when the application
utility module loads. Incremental previews fetch added and modified files
from the current build and unchanged files from production. `prodBuild` and
`fullBuild` fetch all files from the current build.
Environment flag changes require reloading the application utility module to
select a new type; script callers can call `getBuildType()` again.
When the value is `incBuildLocalDev` (`INCREMENTAL_BUILD=true`, `NODE_ENV=development`,
and `VERCEL_ENV` is not `production`), `app/utils/incBuildsMetadata.ts` starts
the watcher immediately when its development-only dynamic import resolves.
Direct `process.env.NODE_ENV` checks in the application utilities keep the
watcher, MDX transforms, navigation rewriting module, and local filesystem reads
out of Next.js production bundles without changing the shared build-type detector
used by Bun binaries.
If both generated metadata JSON files exist, it loads them immediately,
regardless of age. Each cold development start checks this cached metadata
against the current content tree in a worker thread
(`app/utils/incBuildsMetadataWorker.mjs`), using the same metadata generators
as prebuild. The check performs a complete metadata scan without blocking
cached requests on that scan. Cached data may briefly be stale, including
versions or documents changed while the server was stopped.
If metadata differs, it replaces the in-memory cache, queues both JSON files
for background writing, and refreshes Dev Portal after the startup check and
any concurrent structural rebuilds finish. An unchanged result does not write
files or refresh Dev Portal. Missing metadata is generated on the first request,
which waits for that generation. Startup check failures are logged; cached
metadata remains available and later requests retry the check.
API routes share one in-memory cache, and development module reloads share the
same startup check rather than starting another worker. Every
content event logs its path and triggers a Dev Portal refresh. `change` events
return immediately, without filesystem checks or metadata regeneration.
New, deleted, renamed, and moved files are detected through `rename` events,
which schedule a background path check for the affected product. Structural
changes reported only as `change` are detected by a later `rename` check.
Only path additions, removals, and renames regenerate that product's version
metadata and all-version document paths; other products remain cached. After a
product is regenerated, both metadata JSON files are updated asynchronously,
without delaying requests. `rename` events without a filename check all product folders
but still regenerate only products whose paths changed. Requests wait for the
shared structural rebuild queue to finish, including changes received during
generation; cached requests do not wait for a startup check alone.
Atomic saves reported as `rename` still scan paths, but do not regenerate
metadata when the final paths are unchanged. Background
metadata failures are logged, waiting requests reject, and later requests retry
failed products. All other build types read
`app/api/versionMetadata.json` and `app/api/docsPathsAllVersions.json`.

Restart the development server after changing the watcher implementation;
the running watcher is retained across module reloads.

The pre-commit hook updates date metadata for staged MDX files under
`content/`. It preserves an existing `created_at` value and updates
`last_modified` to the commit time.

## Runtime

The repo uses Next.js and requires Node `>=24` (see `package.json` `engines`).
