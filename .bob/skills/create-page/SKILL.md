---
name: create-page
description: Manually invoked page creator for new documentation under content/. Do NOT load this skill automatically. Only load when the user explicitly runs /create-page. Accepts either a structured invocation or a free-form natural-language request. Drafts a new .mdx page from user-supplied sources (local files, local codebases, or URLs), using the matching content-guide template and style guide, writes it to the correct location, registers it in the nav sidebar, and runs /docs-review on the result.
argument-hint: "<content-type> <product>/<version>/<section> <title> --artifacts <path> [<path> ...]  — or a free-form natural-language request describing the page and its sources"
---

# Create Page Skill

## Purpose

Automate `docs/content-guide/create-new-page.md`'s manual page-creation
process: pick the right template, draft content from user-supplied sources
(local files, local codebases, or URLs — passed as flags or described in
natural language), write the file to the correct location, register it in
the nav sidebar, and hand off to `/docs-review` for a scored compliance
check. This is the first skill in this repo that creates content rather than
only reviewing it — treat every filesystem write with the care that implies.

## Invocation

This skill is manually invoked only via `/create-page`. Do not auto-load this
skill based on context.

Two equivalent invocation forms are supported — a structured form and a
free-form natural-language form. Both converge on the same internal values
(content type, product/version/section, title, sources) before Step 1.

**Structured form**:

```text
/create-page <content-type> <product>/<version>/<section> <title> --artifacts <path> [<path> ...]
```

```text
/create-page how-to vault/v1.21.x/docs "Rotate the root token" --artifacts notes/root-token-rotation.md
/create-page concept consul/v2.0.x/docs "Service mesh permissions" --artifacts prd.md transcript.txt
/create-page reference terraform/v1.10.x/cli "terraform state mv" --artifacts cli-spec.md
```

- `<content-type>`: one of `how-to`, `concept`, `overview`, `reference`,
  `troubleshooting`, `release-notes` — matches a filename under
  `docs/content-guide/templates/` exactly.
- `<product>/<version>/<section>`: a single slash-delimited token identifying
  where the page belongs, for example `vault/v1.21.x/docs`.
- `<title>`: free text; quote it if it contains spaces.
- `--artifacts <path> [<path> ...]`: required. One or more sources — local
  files, local directories (codebases), or URLs. See
  [Step 0.5](#step-05) for how each is classified and resolved.

**Natural-language form**:

```text
/create-page Create a Nomad concept page that explains allocations. Look at
the existing Nomad online docs https://developer.hashicorp.com/nomad, the
nomad codebase at ~/Dev/github/hashicorp/nomad, and Jira ticket
https://hashicorp.atlassian.net/browse/CE-817 to determine what allocations
are and how they work.
```

Any input that isn't the structured form (no recognizable `<content-type>`
token from the six known values, or no `--artifacts` flag) is treated as a
free-form request and handled by [Step -1](#step--1). Version and section
don't need to be stated in the natural-language form — see Step -1 for how
missing ones are handled.

If neither form can be parsed at all (for example, the request names no
product and no content type), show the expected structured grammar above
and ask the user to resupply it rather than guessing at missing pieces.

---

## Step-by-Step Process

### Step -1 — Interpret a natural-language request {#step--1}

Only runs when the input isn't the structured form (see Invocation above).

From the free-form text, extract:

- **Content type** — one of the six known values. If it can't be determined
  with confidence, stop and ask. There's no existing content to infer a type
  from, so this can never be guessed, structured input or not.
- **Product** — must resolve to a real `content/<product>/` directory. If
  ambiguous or not found, list what exists under `content/` and ask.
- **Topic/title** — a working title derived from the request. Don't finalize
  it here — it gets shown for confirmation in Step 3 along with everything
  else.
- **Version/section** — if the request doesn't state them, propose defaults:
  the newest version directory for that product, and the `docs` section.
  Carry these forward as *proposed*, not final — Step 3 shows them
  explicitly marked as inferred so the user can confirm or correct them in
  the same checkpoint, rather than blocking here on a separate question.
- **Raw source references** — every file path, directory path, and URL
  mentioned in the request, collected as a flat list. Hand this list to
  Step 0.5 for classification, exactly as if it had been passed via
  `--artifacts`.

Once extracted, continue into Step 0 using these values in place of parsed
command-line tokens. Step 0 onward doesn't need to know whether its inputs
came from flags or free text.

---

### Step 0 — Parse and validate invocation

Parse `<content-type>`, `<product>/<version>/<section>`, `<title>`, and the
source list (from `--artifacts` or from Step -1's extraction).

- **Content type**: must be one of the six values above. If missing or not
  one of these six, stop and ask — there's no existing content to infer a
  type from, unlike `/docs-review` classifying a file that already exists.
- **Product**: `content/<product>/` must exist. If not, list `content/` and
  ask the user to pick the right product.
- **Version**: if stated explicitly (structured form), `content/<product>/<version>/`
  must exist — if not, list the version directories that actually exist for
  that product and ask. If unstated (natural-language form via Step -1), the
  proposed-newest-version default carries forward to Step 3 instead of a
  hard stop here.
- **Section**: if stated explicitly, `content/<product>/<version>/content/<section>/`
  must exist. **Section is not a fixed `docs`/`commands`/`api-docs` enum** —
  it varies per product (for example, Vault nests `commands/` inside `docs/`
  with no separate commands section, while Consul has three separate
  top-level sections). Glob `content/<product>/<version>/content/*/` to
  discover what actually exists for this product/version, and ask if the
  requested section isn't among them. If unstated, the proposed `docs`
  default carries forward to Step 3 the same way as an unstated version —
  but still verify it actually exists for this product before proposing it;
  fall back to asking if `docs` isn't a valid section here.
- **Sources absent entirely**: stop and ask for at least one — this skill
  drafts from supplied material, not from a blank prompt.

Once product/version/section are each either validated or carried forward as
a proposed default, proceed to Step 0.5.

---

### Step 0.5 — Classify and resolve sources {#step-05}

This skill runs in IBM Bob, not Claude Code — source resolution below uses
Bob's available MCP tools (`atlassian-rovo`, `tavily`), not Claude-Code-only
tools. **Tool selection here is automatic and mandatory, not something to
wait for the user to request.** Classifying a URL as Jira/Confluence and
then not using `atlassian-rovo` for it is a bug in following this skill, not
an acceptable fallback.

Classify each entry in the source list by inspection, then resolve it:

- **Local file** — exists and is a file. Read it directly. If unreadable,
  stop and report exactly which path.
- **Local directory (codebase)** — exists and is a directory. Investigate it
  in a scoped, targeted way: search/grep for the topic and read the files
  that actually matter (struct/type definitions, core logic, state
  transitions, doc comments). If Bob exposes an agentic code-search
  capability, use it, scoped to the topic; otherwise do the targeted search
  directly. Never bulk-read an entire codebase into context.
- **Atlassian URL — check for this first, before any generic URL handling.**
  Match the URL against these patterns: domain contains `atlassian.net` or
  `atlassian.com`; path contains `/browse/`, `/wiki/`, `/jira/`, or
  `/confluence/`; or the request describes it as a "Jira ticket," "Jira
  issue," or "Confluence page" even if the URL itself doesn't obviously say
  so. Any match means: **before doing anything else with this source, look
  through your available tools for one belonging to the `atlassian-rovo` MCP
  server and call it directly to fetch the content.** Do this automatically —
  do not ask the user for permission first, do not try a generic web-fetch
  tool on it first, and do not skip straight to the paste-fallback without
  having actually attempted the `atlassian-rovo` call. This is authenticated
  access, so it should succeed for anything the engineer has permission to
  see — don't pre-assume Jira/Confluence links are unreachable. If no tool
  from the `atlassian-rovo` MCP server appears to be available in this
  session at all, say so explicitly to the user rather than silently
  substituting a different tool or skipping the source.
- **Any other URL**: fetch it with the **`tavily` MCP tool**, prompted
  toward the topic.
- **Unreachable source** (the matched MCP tool errors, returns nothing
  usable, or returns something that reads like a permission/login denial
  rather than real content — or, for an Atlassian URL, no `atlassian-rovo`
  tool was available to even attempt the call): **stop and ask the user to
  paste the relevant content** instead of proceeding with that source
  silently absent. This applies to any source that turns out unreachable,
  regardless of type — never silently treat a failed fetch as "no
  information" and draft anyway. Once content is pasted, treat it as an
  inline text source and continue.
- **Anything else** (a path that doesn't exist, a malformed URL): stop and
  report exactly which source and why, rather than skipping it silently.

---

### Step 1 — Read reference material once

Read, once per invocation:

- `docs/content-guide/create-new-page.md`
- `docs/content-guide/content-types.md` (for the Universal checklist)
- The single matching template: `docs/content-guide/templates/<content-type>.md`
- `docs/style-guide/ai-checklist.md`

Do not read the rest of the style guide file list that `/docs-review` reads
(`index.md`, `top-12.md`, `general/*.md`, and so on) — full compliance scoring
is delegated to `/docs-review` in Step 9. Reading `ai-checklist.md` here just
gets the first draft closer to compliant, which reduces round-trips.

---

### Step 2 — Derive target path, URL, and frontmatter conventions

- If version and/or section came from Step -1's proposed defaults rather
  than being stated explicitly, keep them flagged as proposed — Step 3 must
  show this distinction, not present a guess as a stated fact.
- Slugify `<title>` into a filename: lowercase, hyphens, and don't repeat the
  parent folder's name in the file name (per `create-new-page.md`).
- Target file = `content/<product>/<version>/content/<section>/<slug>.mdx`.
- Derived URL = `/<product>/<section>/<relative-path-under-section-without-extension>`
  (an index file maps to its directory, not `.../index`).
- List sibling files already in the target directory (or the nearest existing
  ancestor if the directory doesn't exist yet) and read one to sniff local
  frontmatter conventions — in particular whether `layout: docs` is used.
  **This is product-dependent**, not universal: Vault/Consul/Nomad samples
  use it, `hcp-docs` samples don't. Match whatever the sibling files do; don't
  hardcode a shape.

---

### Step 3 — Confirm path, URL, and nav target with the user before writing anything

Show the user:

- The product/version/section — with a clear marker (for example
  "*(proposed — not stated)*") next to any part that came from Step -1's
  defaults rather than being stated explicitly.
- The working title.
- The target file path and derived URL from Step 2.
- The nav file and parent node the entry will be added under (from Step 4).

Wait for explicit confirmation before Step 6's write. A wrong path is
expensive to unwind once it's touched both the content file and the nav
JSON, so this is the one required checkpoint in the flow — natural-language
convenience never skips it.

If a file already exists at the target path, stop here and ask for a
different name or location — never overwrite silently.

---

### Step 4 — Locate the nav insertion point (read-only)

Read `content/<product>/<version>/data/<section>-nav-data.json`.

Nav group titles are arbitrary human strings unrelated to directory names —
for example, a `concepts/` directory can be titled "Key concepts" in the
sidebar. **Match by path, not by title**: find the node whose `routes` array
already contains an entry with `path` equal to, or prefixed by, the new
page's parent directory (relative to the section root).

Three possible outcomes:

- **Parent found** — note its exact location in the JSON; show it in Step 3.
- **Parent not found, but sibling files already exist on disk in that
  directory** — the nav is already out of sync with the filesystem. Stop and
  report the pre-existing inconsistency. Do not silently repair unrelated
  drift as a side effect of adding one page.
- **Parent not found because this is genuinely a new subdirectory** — stop
  and ask the user for the new group's nav title and where it should sit
  among its siblings. Do not invent nav hierarchy.

---

### Step 5 — Draft content from sources

Using the template loaded in Step 1 and the sources resolved in Step 0.5
(file contents, codebase-search findings, `atlassian-rovo`/`tavily` fetch
results, and any pasted text from an unreachable-source fallback):

- Map source content onto the template's sections (for example: extract
  ordered steps and commands for a how-to; extract definitions and rationale
  for a concept).
- Apply the `ai-checklist.md` rules loaded in Step 1 while drafting (active
  voice, `shell-session` fences with `$` prompts, angle-bracket code-block
  placeholders, sentence-case headings, and so on) so the first draft is
  already close to compliant.
- **Never fabricate technical facts.** Any command, flag, config key,
  default value, port, or API field not present in the resolved sources
  becomes an explicit placeholder — for example
  `<!-- TODO: confirm command syntax — not found in supplied sources -->` —
  never invented and presented as fact. Track every placeholder for the
  final report.
- **If two sources disagree on a fact** (for example, published docs
  describe older behavior than the codebase shows), don't silently pick
  one. Prefer a codebase source as ground truth for current behavior when
  one is present, and note the discrepancy as a flagged item for the final
  report rather than resolving it invisibly.
- **Never author the auto-generated metadata block**
  (`# START AUTO GENERATED METADATA` … `# END AUTO GENERATED METADATA`).
  This repo's `.husky/pre-commit` hook injects it automatically via
  `scripts/add-date-metadata.mjs` based on git history at commit time — a
  hand-authored version would be fake, or get duplicated.
- Frontmatter is exactly: `layout` (only if Step 2's sniff found it in use),
  `page_title`, `description`. Nothing else.
- Don't invent `@include` partial references to files that don't exist under
  the product's `content/partials/` directory — leave a TODO instead of
  writing custom inline text that only looks like a partial call.
- Internal links should follow this repo's convention of root-relative
  product paths (for example `/vault/docs/concepts/auth`), not relative file
  paths.

---

### Step 6 — Write the `.mdx` file

Write the drafted content to the path confirmed in Step 3. This is the first
filesystem mutation in the whole flow — everything before this point is
read-only and was shown to the user for confirmation.

---

### Step 7 — Lint

```shell-session
$ npx --yes markdownlint-cli2 --config .bob/skills/create-page/markdownlint.jsonc --fix "<target-file>"
```

Then re-run without `--fix` to confirm a clean pass. Record any residual
(non-auto-fixable) findings for the report. `markdownlint-cli2` isn't a repo
dependency; `npx --yes` fetches and caches it on first use.

---

### Step 8 — Update the nav-data file

Using the insertion point confirmed in Steps 3–4, add
`{ "title": "<derived-from-title>", "path": "<derived-URL-relative-path>" }`
to the matched parent's `routes` array.

- Preserve the exact existing JSON formatting and indentation style already
  used in that file.
- Default insertion position: append as the last entry in the matched
  `routes` array (ordering is documented as flexible in
  `create-new-page.md`).
- Never reorder, rewrite, or reformat unrelated entries — this should be a
  minimal, surgical insertion.

---

### Step 9 — Run `/docs-review` on the new file

Invoke `/docs-review <target-file>` (no `--fix` — this skill already applied
drafting-time care and lint fixes in Steps 5 and 7; leave `--fix` as a
separate decision for the user). Capture its full report output verbatim for
inclusion in this skill's own report. This is how the skill gets full style
and format compliance scoring without re-implementing it.

---

### Step 10 — Produce the final report

## Output format

```markdown
### 📄 Page Created

- **File**: `content/<product>/<version>/content/<section>/<slug>.mdx`
- **URL**: `/<product>/<section>/<relative-path>`
- **Content type / template used**: `<content-type>` (`docs/content-guide/templates/<content-type>.md`)

### 🔎 Sources Consulted

| Source | Type | Contribution |
|---|---|---|
| `<path or URL>` | file / codebase / URL / pasted | [one-line summary of what it contributed — for a codebase source, summarize what the targeted search found] |

Note explicitly if any source required the paste-fallback after being
unreachable, and why (auth wall, fetch failure, and so on).

### 📝 Draft Summary

Short paragraph on what was drafted and how it maps to the sources.

### ⚠️ TODO / Placeholders Left in Draft

| # | Location | Placeholder | Why |
|---|---|---|---|
| 1 | [heading or line ref] | [TODO text] | [fact not found in any resolved source, or a conflict between sources] |

If there are none, say so explicitly.

### 🧹 Lint Result

- `markdownlint-cli2 --fix`: [N fixes applied / no issues found]
- Clean re-check: [✅ passed / ⚠️ N residual issues — list them]

### 🧭 Navigation Entry

- **Nav file**: `content/<product>/<version>/data/<section>-nav-data.json`
- **Parent node**: [title / path of the matched parent]
- **Entry added**:

  ```diff
  + { "title": "...", "path": "..." }
  ```

### 📊 /docs-review Results

[Paste the full docs-review report block for the new file, unmodified.]

### 📋 Overall Assessment

One paragraph: is this page ready to publish once any TODOs are resolved, or
does it need more source material or manual writing first?
```

---

## Behavioral rules

- Never fabricate technical facts — commands, flags, config values,
  defaults, endpoints, ports. Anything not traceable to a resolved source
  becomes a TODO placeholder, never invented prose.
- Never silently overwrite an existing file at the derived target path —
  stop and ask for a different name or location.
- Never reorder or rewrite unrelated nav entries — insertions into
  `*-nav-data.json` are minimal, surgical diffs.
- Never invent intermediate nav parent nodes — if no existing parent covers
  the target directory, stop and ask for the group title and placement.
- Ask, don't guess, whenever content type or product is missing, invalid, or
  ambiguous (Step 0/Step -1). Version and section may be proposed as
  defaults, but only when explicitly flagged as proposed and confirmed in
  Step 3 — never presented as though they were stated.
- Never treat an unreachable source as silently absent — if the matched MCP
  tool (`atlassian-rovo`, `tavily`, or otherwise) can't retrieve a source,
  stop and ask the user to paste the content (Step 0.5).
- Never assume a Jira or Confluence link is unreachable — `atlassian-rovo`
  provides authenticated access in this environment; only fall back to the
  paste-prompt if it actually fails (Step 0.5).
- Never bulk-read an entire local codebase directly — investigate it with a
  topic-scoped, targeted search instead (Step 0.5).
- When sources disagree on a fact, flag the discrepancy rather than
  silently picking one (Step 5).
- Never author the auto-generated metadata block — that belongs to the
  pre-commit hook (`scripts/add-date-metadata.mjs`), not this skill.
- Never fabricate `@include` partial references to files that don't exist.
- If the style guide or template is silent on something, note the gap
  rather than inventing a rule.
- Confirm path, URL, nav target, and any proposed product/version/section
  defaults with the user before any write (Step 3) — this applies equally
  to structured and natural-language invocations.

**Explicit non-goals**:

- Does not create a new product or version directory — only writes into an
  existing `content/<product>/<version>/`.
- Does not fix pre-existing nav/filesystem drift unrelated to the new page —
  only reports it if encountered.
- Does not re-implement style or format scoring — delegates entirely to
  `/docs-review` in Step 9.
- Does not run `/docs-review --fix` automatically — that's a separate
  follow-up decision for the user.
- Does not design new nav hierarchy or group structure — asks a human when
  one doesn't already exist.
- Does not touch `redirects.jsonc`.
