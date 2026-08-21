# Build a `/create-page` skill for drafting new HashiCorp docs pages

## Context

`docs/content-guide/create-new-page.md` documents a manual, four-step process for
creating a new content page in this repo (decide content type → create the file →
draft content from the matching template → register it in the nav sidebar). It's
entirely manual today. Recent work already built the machine-consumable pieces this
process needs: `docs/content-guide/templates/*.md` (one template + checklist per
content type) and `docs/style-guide/ai-checklist.md` (tagged style rules), both
already consumed by the existing `.bob/skills/docs-review` skill.

The user wants a new skill, `/create-page`, that walks through the same process
but does the drafting: given a content type and one or more artifact files (notes,
transcripts, PRDs, existing docs), it picks the right template, drafts a page from
the artifacts, writes it to the correct location, registers it in the nav sidebar,
and hands off to the existing `/docs-review` skill for a final compliance score —
reusing that skill's scoring logic rather than re-implementing style/format checks.
The user previously relied on separate `hashicorp-style-guide` /
`hashicorp-quick-style-guide` skills and an MCP-indexed search for this kind of
work; those are no longer installed, so this skill must be fully self-contained to
this repo (its own bundled markdownlint config, this repo's own `ai-checklist.md`
and templates — no external skill or MCP dependency).

Two rounds of research (one on the global `markdown-authoring` skill used as a
design reference, one on this repo's own conventions, plus a Plan-agent pass that
verified real `content/` and nav-data.json samples) surfaced several load-bearing
facts that shape the design below — notably that "section" (docs/commands/api-docs)
is not a fixed enum, a pre-commit hook injects auto-generated metadata that the
skill must never fabricate itself, and nav lookup must match by existing `path`
prefixes rather than by directory-name-to-title guessing. These are called out
inline below because they're easy to get wrong.

User-confirmed decisions: artifacts are supplied as existing file paths (not
pasted text); nav-sidebar registration is in scope for v1; the skill auto-invokes
`/docs-review` on its own draft as the last step; the skill is named `create-page`.

## Approach

### 0. Save this plan into the repo

Write this plan to `docs/ai-plans/create-page-skill-plan.md` (mirroring the
earlier `ai-checklist-migration-plan.md` precedent in that directory).

### 1. Fix two path-example typos in `docs/content-guide/create-new-page.md`

Lines 30 and 53 write `web-unified-docs/content/vault/v1.20.x/docs/concepts/...`,
missing a `content/` path segment. Real structure (confirmed against
`content/vault/v1.21.x/`, `content/consul/v2.0.x/`) is
`content/<product>/<version>/content/<section>/...`, with `data/` a sibling of
`content/` at the version level. Fix both lines to insert the missing `content/`
segment. Line 111's nav-data path is already correct — leave it. Fix this first
so the new skill's own documentation-reading step doesn't propagate the error,
though the skill should verify real paths via glob regardless, not trust doc
prose literally.

### 2. Create `.bob/skills/create-page/markdownlint.jsonc`

Adapt the global `~/.bob/skills/markdown-authoring/markdownlint.jsonc` into a
repo-local copy (confirmed appropriate — no `.markdownlint*` config or dependency
exists anywhere in this repo today, and spot-checking real `.mdx` files confirms
the global config's rule choices already match this repo's actual conventions:
dash bullets, repeated `1.` ordered lists, underscore/asterisk emphasis, `MD033`
off for custom components like `<Warning>`/`<EnterpriseAlert inline/>`, `MD041`
off since files open with frontmatter not an H1, `MD040` requiring a fence
language, `MD014` off for the `$`-prefixed `shell-session` convention). Reword the
config's header comment: the global version's comment points at
`hashicorp-quick-style-guide`/MCP search as the source of non-mechanical rules;
this repo-local copy should instead note that `docs/style-guide/ai-checklist.md`
(via `/docs-review`) covers that role here, so a future reader doesn't go looking
for a skill/MCP index this repo doesn't use.

### 3. Create `.bob/skills/create-page/SKILL.md`

**Frontmatter** — match `docs-review`/`seo-review` convention (`name`,
`description` with an explicit "manually invoked only, do NOT auto-load"
disclaimer, `argument-hint`).

**Invocation**:

```
/create-page <content-type> <product>/<version>/<section> <title> --artifacts <path> [<path>...]
```

- `<content-type>`: one of `how-to`, `concept`, `overview`, `reference`,
  `troubleshooting`, `release-notes` — matches the six template filenames exactly.
  Missing or invalid → ask; don't guess (there's no existing content to infer
  type from, unlike `docs-review` reviewing an existing file).
- `<product>/<version>/<section>`: validate in three glob steps — `content/<product>/`,
  then `content/<product>/<version>/`, then `content/<product>/<version>/content/<section>/`.
  **Section is not a fixed 3-value enum** — confirmed 25 distinct
  `*-nav-data.json` basenames exist across the repo, and Vault nests `commands/`
  inside `docs/` with no separate commands section. Discover valid sections per
  product/version by globbing `content/<product>/<version>/content/*/` and list
  them if the user's input doesn't match. Any failed glob step → list what
  actually exists and ask; never assume "latest version" or a default section.
- `<title>`: free text (quote if it has spaces); drives both `page_title`/H1 and,
  slugified, the filename.
- `--artifacts <path> [<path>...]`: required, one or more existing files. Verify
  each is readable before doing anything else; missing `--artifacts` entirely →
  stop and ask (this skill's premise is drafting from supplied material, not
  blank-page generation).

**Step-by-step workflow** (mirror `docs-review`'s `### Step N — Title` style):

- **Step 0 — Parse and validate invocation.** Apply the validation above in
  order, stopping at first failure. Read every artifact now, fail fast if any
  path is unreadable.
- **Step 1 — Read reference material once.** `docs/content-guide/create-new-page.md`,
  `docs/content-guide/content-types.md` (for the Universal checklist), the single
  matching `docs/content-guide/templates/<content-type>.md`, and
  `docs/style-guide/ai-checklist.md`. Deliberately *don't* read the full style-guide
  file list `docs-review` reads — full compliance scoring is delegated to
  `/docs-review` in Step 9; reading `ai-checklist.md` here just gets the first
  draft closer to compliant, reducing round-trips.
- **Step 2 — Derive target path, URL, and frontmatter conventions.** Slugify the
  title (no repeating the parent folder name, per `create-new-page.md`). Target =
  `content/<product>/<version>/content/<section>/<slug>.mdx`. Derived URL =
  `/<product>/<section>/<relative-path-without-extension>`. List sibling files in
  the target directory (or nearest existing ancestor) and read one to sniff
  whether `layout: docs` frontmatter is used — **confirmed product-dependent**
  (Vault/Consul/Nomad use it, `hcp-docs` doesn't) — don't hardcode it.
- **Step 3 — Confirm path/URL/nav-target with the user before writing anything.**
  Show the target file path, derived URL, and (from Step 4's lookup) the nav
  parent it'll be inserted under. Wait for confirmation — this is the
  point-of-no-easy-return the user specifically cares about, since a wrong
  path is annoying to unwind across two files. If a file already exists at the
  target path, stop and ask for a different name/location — never overwrite
  silently.
- **Step 4 — Locate the nav insertion point (read-only).** Read
  `content/<product>/<version>/data/<section>-nav-data.json`. Nav group titles
  are arbitrary strings unrelated to directory names (confirmed: a `concepts/`
  directory can be titled "Key concepts") — **match by finding the node whose
  `routes` array already contains an entry with `path` equal to or prefixed by
  the new page's parent directory**, not by title-to-dirname guessing. Three
  outcomes: parent found (proceed, shown in Step 3); parent not found but
  sibling files exist on disk (pre-existing nav/filesystem drift — report it,
  don't silently fix unrelated drift); parent not found because this is a new
  subdirectory (ask the user for the new group's title/placement — don't invent
  nav hierarchy).
- **Step 5 — Draft content from artifacts.** Map artifact content onto the
  template's sections (steps/commands for how-to, definitions for concept, etc.).
  Apply `ai-checklist.md` rules while drafting. **Never fabricate technical
  facts** — any command, flag, config key, default, or endpoint not present in
  the artifacts becomes an explicit TODO placeholder, tracked for the report,
  never invented and presented as fact. **Never author the auto-generated
  metadata block** (`# START AUTO GENERATED METADATA...`) — confirmed this is
  injected automatically by `.husky/pre-commit` → `scripts/add-date-metadata.mjs`
  at commit time; a hand-authored version would be fake or get duplicated.
  Frontmatter is only `layout` (per Step 2's sniff), `page_title`, `description`.
  Don't invent `@include` partial references to files that don't exist under the
  product's `partials/` directory — TODO instead.
- **Step 6 — Write the `.mdx` file.** First filesystem mutation in the flow;
  everything before this point is read-only and confirmable.
- **Step 7 — Lint.** `npx --yes markdownlint-cli2 --config .bob/skills/create-page/markdownlint.jsonc --fix "<file>"`,
  then re-run without `--fix` to confirm clean; record any residual findings.
- **Step 8 — Update the nav-data file.** Insert `{ "title": ..., "path": ... }`
  into the parent `routes` array confirmed in Steps 3/4. Preserve exact existing
  JSON formatting; append as the last entry in that array by default (order is
  documented as flexible); never reorder or rewrite unrelated entries.
- **Step 9 — Invoke `/docs-review <target-file>`** (no `--fix` — this skill
  already applied drafting-time care and lint fixes; leave `--fix` as a separate
  user decision). Capture its report verbatim for inclusion in this skill's own
  report.
- **Step 10 — Produce the final report** (format below).

**Output format** — emoji-headed sections matching `docs-review`/`seo-review`
conventions: `### 📄 Page Created` (file, URL, template, artifacts consumed),
`### 📝 Draft Summary`, `### ⚠️ TODO / Placeholders Left in Draft` (table, or
"none" explicitly), `### 🧹 Lint Result`, `### 🧭 Navigation Entry` (nav file,
parent, a small diff of what was added), `### 📊 /docs-review Results` (the
pasted report from Step 9), `### 📋 Overall Assessment`.

**Behavioral rules**: never fabricate technical facts (TODO instead); never
silently overwrite an existing file at the target path; never reorder/rewrite
unrelated nav entries — insertions are minimal surgical diffs; never invent
intermediate nav parent nodes — ask a human when no existing parent covers the
target directory; ask rather than guess on missing/invalid/ambiguous content
type, product, version, or section; never author the auto-generated metadata
block; never fabricate `@include` partial references; note style-guide/template
gaps rather than inventing rules (same posture as `docs-review`). Explicit
non-goals: does not create a new product or version directory (only writes into
an existing `content/<product>/<version>/`); does not fix pre-existing nav/
filesystem drift unrelated to the new page; does not re-implement style/format
scoring (delegates to `/docs-review`); does not auto-run `/docs-review --fix`;
does not design new nav hierarchy; does not touch `redirects.jsonc`.

## Critical files

- `.bob/skills/create-page/SKILL.md` — new
- `.bob/skills/create-page/markdownlint.jsonc` — new, adapted from
  `~/.bob/skills/markdown-authoring/markdownlint.jsonc`
- `docs/content-guide/create-new-page.md` — fix two path-example typos (lines 30, 53)
- `docs/ai-plans/create-page-skill-plan.md` — this plan, saved to the repo

Existing infrastructure this skill reuses, not duplicates:
- `docs/content-guide/templates/*.md` and `docs/style-guide/ai-checklist.md` —
  read for drafting guidance, not re-authored
- `.bob/skills/docs-review/SKILL.md` — invoked in Step 9 for final scoring, not
  reimplemented
- `scripts/add-date-metadata.mjs` / `.husky/pre-commit` — the existing mechanism
  that owns auto-generated metadata; the new skill must not duplicate its job

## Verification

- Run `/create-page` end-to-end against a small real example (a short how-to,
  using an existing notes/spec file as the artifact) and confirm: correct file
  path and URL derivation, no fabricated technical facts, no auto-generated
  metadata block written, lint passes, the nav-data JSON is still valid JSON
  after insertion (parse it) and the diff is minimal/surgical, and the
  `/docs-review` report is captured correctly in the final output.
- Test the "ask, don't guess" paths deliberately: an invalid content type, a
  nonexistent product/version, and a section that doesn't exist for that
  product — confirm the skill stops and asks in each case rather than assuming.
- Test the "existing file at target path" and "no matching nav parent" branches
  to confirm they stop and ask rather than overwriting or inventing structure.
- Confirm `docs/content-guide/create-new-page.md`'s corrected paths actually
  resolve (`ls` the corrected path) and line 111 was left untouched.
