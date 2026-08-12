# Documentation skills

This directory holds the manually-invoked skills used to create and review
content under `content/`. None of them auto-load. Each one only runs when
you explicitly call it.

| Skill | Command | Purpose | Writes files? |
|---|---|---|---|
| [`create-page`](#create-page) | `/create-page` | Draft a new `.mdx` page from source material | Yes |
| [`docs-review`](#docs-review) | `/docs-review` | Score a doc against the style guide and doc-type format rules | Only with `--fix`, and only mechanical fixes |
| [`seo-review`](#seo-review) | `/seo-review` | Check content against Google's SEO guidelines | Only with `--fix`, and only `[AUTO-FIX]` items |

All three share the same source of truth for content rules, so fixing a rule
in one place fixes it for every skill that uses it:

- `docs/content-guide/content-types.md` and `docs/content-guide/templates/*.md`
  — page templates and per-type checklists
- `docs/style-guide/ai-checklist.md` — tagged style-guide rules (priority,
  auto-fixable, detect/fix)
- `.bob/skills/seo-review/references/GoogleSEOGuidelines.md` — the SEO rule set

## Typical workflow

```text
1. /create-page ...              draft a new page (runs /docs-review at the end automatically)
2. Resolve any TODO placeholders left in the draft
3. /seo-review content/<...>/<new-page>.mdx   check the finished page for SEO issues
4. Commit
```

For an existing page you're editing by hand instead of drafting from
scratch, just run `/docs-review` and `/seo-review` directly. You don't need
`create-page` for edits to files that already exist.

---

## `create-page`

Drafts a brand-new page: picks the right content-guide template, writes
content from sources you supply, places it in the correct product/version/
section directory, registers it in the nav sidebar, and finishes by running
`/docs-review` on its own output. Accepts a structured invocation or a
free-form natural-language request. Both go through the same confirmation
and safety checks.

**Structured form**

```text
/create-page <content-type> <product>/<version>/<section> <title> --artifacts <path> [<path> ...]
```

- `<content-type>` — one of `how-to`, `concept`, `overview`, `reference`,
  `troubleshooting`, `what-is`.
- `<product>/<version>/<section>` — where the page belongs, for example
  `vault/v1.21.x/docs`. Section isn't a fixed set — it's whatever
  subdirectories actually exist under that product/version.
- `<title>` — quote it if it has spaces.
- `--artifacts <path> [<path> ...]` — required. One or more **sources**:
  local files, local directories (codebases), or URLs.

Example:

```text
/create-page how-to vault/v1.21.x/docs "Rotate the root token" --artifacts notes/root-token-rotation.md
```

**Natural-language form**

Describe the page and point at sources in
plain English. You can omit version and section.

```text
/create-page Create a Nomad concept page that explains allocations. Look at
the existing Nomad online docs https://developer.hashicorp.com/nomad, the
nomad codebase at ~/Dev/github/hashicorp/nomad, and Jira ticket
https://hashicorp.atlassian.net/browse/CE-817 to determine what allocations
are and how they work.
```

Content type and product are always required and never guessed. If version
or section is left unstated, the skill proposes a default (newest version,
`docs` section) and shows it clearly marked as *proposed* in the
confirmation step. It's never silently assumed.

This skill runs in IBM Bob and uses Bob's MCP tools for
sources it can't read from the local filesystem.

**Source types**

Each entry (file/flag or URL mentioned in natural
language) is classified and handled differently.

| Type | How it's resolved |
| --- | --- |
| Local file | Read directly |
| Local directory (codebase) | Investigated with a scoped, topic-focused search — never bulk-read |
| Jira / Confluence URL | Fetched using the `atlassian-rovo` MCP tool (authenticated — expected to succeed, not pre-assumed to fail) |
| Any other URL | Fetched using the `tavily` MCP tool |
| A source that can't be retrieved, regardless of type | The skill stops and asks you to paste the relevant content instead of drafting without it |

**What it does, in order**

1. Validates your inputs against the real filesystem; asks rather than guessing
if a product/version/section doesn't exist
1. Reads the matching template and the style-guide checklist
1. Classifies and resolves every source
1. Derives the target file path and URL and asks you to confirm, including any
proposed version/section defaults, before writing anything
1. Drafts the page from the resolved sources
1. Writes the file
1. Lints it with a bundled `markdownlint-cli2` config
1. Adds an entry to the matching `*-nav-data.json`
1. Runs `/docs-review` on the result
1. Reports everything it did, including which sources contributed what, any
source that needed the paste-fallback, and any facts it couldn't verify (left as
`TODO` placeholders rather than invented).

**What it won't do**

- Fabricate a command, flag, or config value that isn't in a resolved source
- Silently proceed when a source can't be fetched
- Overwrite an existing file at the target path
- Invent new navigation structure. It asks if no matching nav group exists yet
- Write the auto-generated metadata block. The pre-commit hook already does
that.
- Create a new product or version directory
- Run `/docs-review --fix` automatically.

Full details: [`create-page/SKILL.md`](create-page/SKILL.md).

---

## `docs-review`

Reviews one or more existing `.md`/`.mdx` files against the style guide, the
doc-type's template/checklist, and a well-formed example doc of the same
type. Produces a weighted score (Content Quality 50% / Format Compliance
40% / SEO 10%) with a pass/fail line at the 75% threshold.

```text
/docs-review <path/to/file.mdx>              review a single file
/docs-review <path/to/directory/>            review every .md/.mdx file under it, recursively
/docs-review --changed                       review files changed vs. origin/main
/docs-review <path> --fix                    also auto-apply mechanical corrections first
```

`--fix` only applies corrections explicitly tagged `auto-fixable: yes` (or
the mechanical half of `partial`) in `docs/style-guide/ai-checklist.md` —
things like removing "please" from instructions, converting Latin
abbreviations, fixing heading case, and inserting missing blank lines.
Judgment calls (passive voice, weak link text, missing sections, wrong
doc-type structure, and so on) are always reported, never auto-edited.

Each file gets a report with what looks good, an issues table (location,
rule violated, suggested fix), and an overall score and readiness
assessment. Reviewing more than 20 files at once asks for confirmation
first.

Full details: [`docs-review/SKILL.md`](docs-review/SKILL.md).

---

## `seo-review`

Checks docs, blog posts, or general web content against Google Search
Central's official guidelines. Reviews titles, meta descriptions, headings, URL
structure, images, internal linking, structured data, E-E-A-T, and spam
policies. Not limited to files in this repo; it also accepts pasted content.

```text
/seo-review                                  review content pasted into the conversation
/seo-review <path/to/file>                   review a single file
/seo-review <path/to/directory/>             review doc-like files under it, recursively (confirms first if >~15 files)
/seo-review <path> --fix                     also auto-apply low-risk [AUTO-FIX] items
```

Findings are grouped by priority (🔴 High / 🟡 Medium / 🟢 Low) and each one
is tagged `[AUTO-FIX]` or `[MANUAL]`. Spam-policy violations are always
High priority regardless of how minor they look. `--fix` only ever applies
`[AUTO-FIX]` items automatically; `[MANUAL]` items (title/meta rewrites,
content rewrites, structured-data additions) always need your explicit
go-ahead. Reviewing a directory adds a cross-file pass for duplicate titles,
duplicate meta descriptions, and overlapping content, plus a summary table
sorted worst-first.

Full details: [`seo-review/SKILL.md`](seo-review/SKILL.md).

---

## Notes

- None of these skills auto-loads. If a description says "manually invoked
  only," that's a hard rule, not a suggestion. Don't infer intent to run
  one from context alone.
- There's no repo-wide markdownlint config; `create-page` bundles its own
  (`create-page/markdownlint.jsonc`), invoked using `npx markdownlint-cli2` on
  the one file it just wrote. `docs-review` and `seo-review` don't lint. They
  review and score instead.
- If you change a rule in `docs/style-guide/ai-checklist.md` or a template
  under `docs/content-guide/templates/`, all three skills pick it up
  automatically next run. None of them hardcodes style or format rules
  locally.
