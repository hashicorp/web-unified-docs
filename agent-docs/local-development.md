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

`npm run prebuild` populates the `public/` folder and only needs to run once
(or when prebuild sources change — see `scripts/prebuild/**` or
`productConfig.mjs`). It is a long-running process; run it manually when
needed rather than before every `npm run dev`.

The MDX transform module can also run directly from the repository root for one
or more files:

```text
node scripts/prebuild/mdx-transforms/build-mdx-transforms.mjs <file-path> [file-path...]
```

It reads version metadata from `app/api/versionMetadata.json` and writes the
requested files from `content/` to their corresponding paths in `public/content/`.
Local incremental development uses a development-only dynamic import to call the
transform directly for Markdown requests, without starting a subprocess. Version
metadata is read for each request. Transform errors are returned without exiting
the server.
Navigation data, redirects, and assets are read directly from `content/`.

The pre-commit hook updates date metadata for staged MDX files under
`content/`. It preserves an existing `created_at` value and updates
`last_modified` to the commit time.

## Runtime

The repo uses Next.js and requires Node `>=24` (see `package.json` `engines`).
