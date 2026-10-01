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

`npm run dev` uses `concurrently` to start the content watcher and Next.js
together. Both output streams are shown with `[watch]` and `[next]` prefixes.
Press Ctrl+C to stop both; if either command exits, the other is also stopped.

`npm run prebuild` populates the `public/` folder and only needs to run once
(or when prebuild sources change — see `scripts/prebuild/**` or
`productConfig.mjs`). It is a long-running process; run it manually when
needed rather than before every `npm run dev`.

The content watcher recursively watches `content/` and only sends a refresh POST
to `${DEV_PORTAL_URL}/api/refresh` when content changes. It does not transform
Markdown or copy navigation data and assets; local incremental builds handle
content when it is requested.

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
preview, metadata consumers lazily generate version metadata and all-version
document paths in memory on the first request. They share one cache across API
routes. File saves are ignored, including edits to existing files. Recursive
`content/` watcher `rename` events schedule a directory path check on the next
metadata request. Only file or directory additions, removals, and renames
invalidate the cache and regenerate both datasets. Atomic saves that replace an
existing file without changing the final paths are also ignored. No generated
JSON files are rewritten. Preview and production continue
to use `app/api/versionMetadata.json` and `app/api/docsPathsAllVersions.json`.

The pre-commit hook updates date metadata for staged MDX files under
`content/`. It preserves an existing `created_at` value and updates
`last_modified` to the commit time.

## Runtime

The repo uses Next.js and requires Node `>=24` (see `package.json` `engines`).
