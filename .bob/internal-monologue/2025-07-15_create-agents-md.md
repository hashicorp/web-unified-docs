# 2025-07-15 — Create AGENTS.md for web-unified-docs

## Task
Analyzed the `hashicorp/web-unified-docs` codebase and created AGENTS.md files for agent productivity.

## Key discoveries

### Stack
- Next.js 16 (App Router, API-only — no UI), TypeScript, React 19
- Vitest for tests, ESLint (flat config) + Prettier for code style
- Bun used only to compile prebuild binaries; runtime is Node.js ≥24

### Non-obvious architecture
- The app is purely an API backend (no UI). `app/page.tsx` and `app/layout.tsx` are stubs.
- Content is never read from disk at request time — routes fetch from `public/content/` via HTTP to SELF_URL or fall through to UNIFIED_DOCS_PROD_URL in incremental build mode.
- Two mandatory generated JSON files (`versionMetadata.json`, `docsPathsAllVersions.json`) are imported at compile time — prebuild MUST run before build.
- Prebuild is compiled to platform-specific Bun binaries and decompressed at runtime by `run-prebuild.mjs`.

### Critical code patterns
- Rust-style `Result<T,E>` (`Ok`/`Err`) pattern used pervasively — no exceptions for expected errors.
- Named exports only (no default exports, enforced by eslint).
- No barrel files (enforced by eslint-plugin-no-barrel-files).
- Arrow functions must use body form `() => { return x }` (arrow-body-style: always).
- All control flow requires braces.

### Testing patterns
- Tests colocated with source, not in `__tests__/` folder.
- `__mocks__/fs.mjs` uses memfs — activated with `vi.mock('fs')`.
- `mockRequest()` utility in `app/utils/mockRequest.ts` for route handler tests.
- `vi.hoisted()` for env vars read at module load time.
- JSON manifests (`versionMetadata.json`, `docsPathsAllVersions.json`) must be vi.mock'd in most tests.

### Existing AGENTS.md
- `content/well-architected-framework/docs/AGENTS.md` exists but is WAF documentation writing standards, not developer tooling guidance.

## Files created
- `AGENTS.md` — root-level developer guide
- `.bob/rules-agent/AGENTS.md` — coding-specific rules
- `.bob/rules-ask/AGENTS.md` — explanation/question context
- `.bob/rules-plan/AGENTS.md` — architectural planning constraints
