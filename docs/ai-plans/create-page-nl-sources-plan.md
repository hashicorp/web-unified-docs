# Add natural-language invocation and broader source types to `/create-page`

## Context

`/create-page` currently requires a strict invocation grammar
(`<content-type> <product>/<version>/<section> <title> --artifacts <path> [<path> ...]`)
and only accepts local files as source material. The user wants to invoke it
conversationally instead, for example:

> "Create a Nomad concept page that explains allocations. Look at the existing
> Nomad online docs https://developer.hashicorp.com/nomad, the nomad codebase
> at ~/Dev/github/hashicorp/nomad, and Jira ticket
> https://hashicorp.atlassian.net/browse/CE-817 to determine what allocations
> are and how they work."

This request has no version/section, and its three sources are a public
website, a local codebase directory, and an external ticket link — none of
which the skill currently knows how to handle (today's "artifact" means
exactly one thing: an existing local file, read verbatim). Confirmed via the
`WebFetch` tool's own description: it explicitly fails on authenticated
URLs like Jira/Confluence, so that failure mode has to be designed for
up front, not discovered at runtime.

The goal: let `/create-page` accept either the existing structured form or a
free-form natural-language request, and broaden "artifacts" into typed
**sources** — file, local codebase directory, public URL, and (with an
explicit fallback) auth-gated URL — while keeping every existing safety
behavior (confirm before writing, never fabricate facts, ask rather than
guess) intact for the new entry point too.

User-confirmed decisions: missing version/section gets a proposed default
(latest version + `docs` section) folded into the existing Step 3
confirmation, not a separate blocking question; local codebase sources are
investigated by spawning an Explore subagent scoped to the topic, not a bare
grep; and an unreachable source (auth-gated or otherwise) stops the flow and
asks the user to paste the content, rather than silently drafting without it.

## Approach

### 1. Save this plan into the repo

Write it to `docs/ai-plans/create-page-nl-sources-plan.md`, matching the
existing `ai-checklist-migration-plan.md` / `create-page-skill-plan.md`
precedent in that directory.

### 2. Add a natural-language entry point (new Step, before today's Step 0)

Insert **Step -1 — Interpret the request**, run only when the input doesn't
match the structured grammar (no recognizable `<content-type>` token from
the six known values, or no `--artifacts` flag present — anything else is
treated as free-form text).

From the free-form text, extract:
- **Content type** — one of the six known values. If it can't be determined
  with confidence, ask (same as today: no content exists yet to infer type
  from, so this can't be guessed).
- **Product** — must resolve to a real `content/<product>/` directory. If
  ambiguous or not found, list what exists and ask.
- **Topic/title** — a working title derived from the request; shown for
  confirmation in Step 3, not silently finalized here.
- **Version/section** — if unstated, propose the newest version directory
  for that product and the `docs` section as defaults. These defaults get
  folded into Step 3's existing confirmation prompt, clearly marked as
  proposed rather than stated, so the user can correct them in the same
  step instead of a separate round-trip.
- **Raw source references** — every file path, directory path, and URL
  mentioned in the request, collected as a flat list for Step 0 to classify
  and resolve.

Once extracted, continue into the existing Step 0 onward using these values
in place of parsed command-line tokens — the rest of the flow doesn't need
to know whether it originated from structured flags or free text.

### 3. Broaden source classification and resolution (extends today's Step 0 artifact-reading)

Keep the `--artifacts`/source list concept, but classify each entry by
inspection rather than assuming it's always a file:

- **Local file** — existing behavior: read directly, verify readable.
- **Local directory (codebase)** — verify it exists, then launch an Explore
  agent (`Agent` tool, `subagent_type: Explore`, run in the foreground since
  drafting in Step 5 depends on its result) scoped to that directory, with a
  prompt built from the extracted topic — e.g. "In `<path>`, find where
  `<topic>` is defined and how it works: struct/type definitions, core
  logic, state transitions, and any doc comments." Treat the agent's summary
  as the resolved source, not the raw codebase — never bulk-read an entire
  external repo into context.
- **Public URL** — fetch with `WebFetch`, prompted toward the extracted
  topic. Follow a single redirect if `WebFetch` reports one, per its
  documented behavior.
- **Auth-gated / unreachable URL** — detected either up front (known
  auth-gated domains like `atlassian.net`, `confluence`, `docs.google.com`)
  or after the fact (fetch fails, or returned content looks like a login
  page). **Stop and ask the user to paste the relevant content** rather than
  proceeding with that source silently absent — this applies to *any*
  source that turns out to be unreachable, not just pre-flagged domains.
  Once pasted, treat it as an inline text source and continue.

### 4. Extend Step 2/3 (path derivation + confirmation)

Show, in one combined confirmation: the target file path and URL (as today),
plus the product/version/section — explicitly marked "proposed default" for
any part that was inferred rather than stated — and the working title. This
keeps natural-language invocations going through the exact same
point-of-no-easy-return checkpoint as structured ones; convenience never
skips confirmation.

### 5. Extend Step 5 (draft) for heterogeneous, possibly-conflicting sources

Draft from whatever mix of resolved sources exists (files, Explore-agent
summaries, WebFetch summaries, pasted text). Keep the existing "never
fabricate technical facts" rule, and add: **if two sources disagree on a
fact** (for example, published docs describe older behavior than the
codebase shows), don't silently pick one — prefer the codebase as ground
truth for current behavior when a codebase source is present, and note the
discrepancy as a flagged item in the report rather than resolving it
invisibly.

### 6. Extend the output report (Step 10)

Rename "Artifacts consumed" to "Sources consulted," tagged by type (file /
codebase / URL / pasted), with a one-line summary of what each contributed —
in particular what the Explore agent found for a codebase source, and
whether any source required a paste-fallback after being unreachable.

### 7. Update `.bob/skills/create-page/SKILL.md`

Apply items 2–6 above. Update the `## Invocation` section to show both forms
side by side (structured and natural-language), and update `argument-hint`
in the frontmatter to reflect that free text is now accepted.

### 8. Update `.bob/skills/README.md`

Update the `create-page` section: mention natural-language invocation, the
broadened source types, and the auth-gated-source paste-fallback behavior,
so the README stays an accurate quick reference.

## Critical files

- `.bob/skills/create-page/SKILL.md` — primary edit (new Step -1, broadened
  source classification/resolution, extended confirmation/draft/report steps)
- `.bob/skills/README.md` — update the `create-page` section
- `docs/ai-plans/create-page-nl-sources-plan.md` — this plan, saved to the repo

Existing pieces this reuses, not duplicates:
- `Agent` tool with `subagent_type: Explore` — already used elsewhere in this
  session for scoped codebase investigation; same pattern here for local
  codebase sources
- `WebFetch` — already confirmed (via its own tool description) to fail
  cleanly and identifiably on authenticated URLs, which is exactly the
  signal the paste-fallback branch depends on
- Everything from the original `create-page` design (Steps 1, 4, 6–9: reading
  the template/checklist, writing the file, linting, nav registration,
  `/docs-review` handoff) stays unchanged

## Verification

- Run `/create-page` with the exact example from this conversation (Nomad
  concept page on allocations, three heterogeneous sources) and confirm:
  content type/product are extracted correctly, version/section defaults are
  proposed and shown for confirmation rather than silently assumed, the
  codebase source triggers an Explore agent rather than a raw file read, the
  public URL is fetched, and the Jira URL triggers the paste-fallback prompt
  rather than silently proceeding without it.
- Run the existing structured-grammar form
  (`/create-page how-to vault/v1.21.x/docs "..." --artifacts notes.md`) and
  confirm it still works unchanged — the new Step -1 must not interfere with
  the form that already worked.
- Deliberately supply a source directory that doesn't exist and a malformed
  URL, and confirm the skill asks rather than guessing or silently skipping
  them.
- Confirm the final report's "Sources consulted" section correctly
  distinguishes file/codebase/URL/pasted provenance for a mixed-source run.
