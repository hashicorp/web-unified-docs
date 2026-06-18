# AGENTS.md — Ask mode

This file provides guidance to agents answering questions about this repository.

## Counterintuitive structure

- `app/` is a **Next.js App Router** app but it serves only as a **REST API** — there is no user-facing UI. `app/page.tsx` and `app/layout.tsx` are stubs.
- `app/api/` contains Route Handlers, not React components or pages.
- `content/` holds all documentation MDX. The app never directly reads `content/` at request time — it reads files from `public/content/` (the prebuild output).
- `app/api/versionMetadata.json` and `app/api/docsPathsAllVersions.json` are **generated JSON files**, not hand-authored config. They are produced by `npm run prebuild`.
- `productConfig.mjs` is the central product registry — not a Next.js config file despite the `.mjs` extension.

## Two separate runtime contexts

1. **Prebuild** (`scripts/prebuild/`) — runs with Node.js/Bun, processes `content/` → `public/content/` and generates JSON manifests. Compiled to platform-specific Bun binaries for speed.
2. **API runtime** (`app/`) — Next.js API routes that read the prebuild outputs via HTTP fetches to `SELF_URL` or `UNIFIED_DOCS_PROD_URL` (incremental build mode).

## `#productConfig.mjs` alias quirk

`productConfig.mjs` uses Node.js `package.json#imports` (`#productConfig.mjs`) **and** TypeScript `paths`. Both must match. This is why the file has a `.mjs` extension even though it's used in TypeScript files.

## Versioning

- Non-versioned products use placeholder version `v0.0.x` internally.
- `latest` is a virtual version resolved at runtime to whichever entry has `isLatest: true` in `versionMetadata.json`.
- TFE uses date-based versions (`v202401-1`), not semver.

## Documentation structure in `content/`

See `CONTRIBUTING.md` table for the full product → directory mapping. Key non-obvious facts:
- HCP, HCP Vault Dedicated, HCP Vault Secrets, HCP Packer, and Waypoint all share `content/hcp-docs/`.
- Well-Architected Framework lives at `content/well-architected-framework/` and has its own detailed `AGENTS.md` in `content/well-architected-framework/docs/AGENTS.md`.

## Style guide location
`docs/style-guide/` contains the project style guide. `.github/instructions/*.instructions.md` contains Copilot review instructions scoped to `content/**/*.md` and `content/**/*.mdx` only.
