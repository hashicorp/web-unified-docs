---
name: docs-review
description: Manually invoked documentation reviewer for any content under content/. Do NOT load this skill automatically. Only load when the user explicitly runs /docs-review. Reviews .md and .mdx documentation files for correct format, style guide compliance, and content quality. Supports single file, recursive directory, and git-changed modes. Accepts --fix to auto-apply mechanical corrections before reviewing.
---

# Documentation Review Skill

## Purpose

Review `.md` and `.mdx` documentation files under `content/` against the
project's style guide, doc-type format requirements, and a well-formed example
doc. Produce a structured, scored report for every file reviewed.

## Invocation

This skill is manually invoked only via `/docs-review`. Do not auto-load this
skill based on context.

**Supported file types**: `.md` and `.mdx` only. If the user provides a path
to a different file type, notify them and stop.

### Modes

| Mode | Syntax | Behavior |
|---|---|---|
| **File** | `/docs-review <path/to/file.mdx>` | Review a single file |
| **Directory** | `/docs-review <path/to/directory/>` | Review all `.md`/`.mdx` files in the directory, recursively |
| **Changed** | `/docs-review --changed` | Run `git diff --name-only origin/main...HEAD`, filter results to `.md`/`.mdx` files under `content/`, review each one |

### `--fix` flag

Append `--fix` to any mode to auto-apply mechanical corrections to each file
before producing the review report.

```text
/docs-review content/vault/docs/agent.mdx
/docs-review content/vault/docs/
/docs-review --changed
/docs-review content/vault/docs/agent.mdx --fix
/docs-review --changed --fix
```

`--fix` is not a separate mode — it modifies the behavior of whichever mode
is active. Refer to [Step 0b — Apply auto-fixes](#step-0b) and the
[Auto-fix rules](#auto-fix-rules) section for what is and is not auto-fixable.

---

## Step-by-Step Review Process

### Step 0 — Determine invocation mode and collect file list

Parse the user's input to determine the active mode, then build the list of
files to review.

- **File mode**: the argument is a path ending in `.md` or `.mdx`. Verify the
  file exists. If it does not, stop and report the missing path.
- **Directory mode**: the argument is a path to a directory (ends with `/` or
  resolves as a directory). Use the `glob` tool with pattern
  `**/*.{md,mdx}` rooted at the given path to collect all matching files
  recursively. If no files are found, report that and stop.
- **Changed mode**: run `git diff --name-only origin/main...HEAD` using
  `execute_command`. If that fails (for example, `origin/main` does not exist),
  fall back to `git diff --name-only HEAD`. Filter the output to lines ending
  in `.md` or `.mdx` that begin with `content/`. If the result is empty, report
  "No documentation files changed." and stop.

If `--fix` is present in the input, note it for Step 0b. Remove it from the
path/directory argument before resolving the file list.

If more than 20 files are collected, confirm with the user before proceeding.

---

### Step 0b — Apply auto-fixes (only when `--fix` is present) {#step-0b}

Before running the review, apply all auto-fixable corrections to each file in
the list. Use `apply_diff` or `search_and_replace` to write the changes.
Record every change made in a fixes log (file path, approximate line
reference, what was changed) for inclusion in the output.

#### Auto-fix rules {#auto-fix-rules}

Apply these mechanical corrections. They require no content judgment.

**Latin abbreviations**
- `e.g.` or `e.g` → `for example`
- `i.e.` or `i.e` → `that is`
- Trailing `, etc.` or ` etc.` → if the sentence already uses "such as",
  "including", or "for example", remove `etc.` (the list is implicitly
  open-ended and `etc.` is redundant). Otherwise, flag for manual fix and
  do not edit.

**Minimizing language in instructional sentences**
- Remove `simply` where it modifies a verb (for example, "simply run" → "run")
- Remove `just` where it modifies a verb (for example, "just click" → "click")
- Remove `easily` where it modifies a verb (for example, "you can easily configure"
  → "you can configure")
- Remove `easy` only when it describes a task in a way that trivializes it
  (for example, "it is easy to set up" → remove the sentence or rewrite); do not
  remove `easy` from proper names or unambiguous non-trivializing uses
- Remove `please` from any instructional sentence (for example, "Please run the
  following" → "Run the following"; "Please note that" → "Note that" or rewrite
  as prose; "Please ensure" → "Ensure")

**Heading case**
- Convert title-case headings to sentence case. Rules:
  - Lowercase every word except the first word of the heading and proper
    nouns (product names, acronyms, trademarked terms)
  - Do not alter code or command text inside headings

**Missing blank lines between block elements**
- Insert a blank line between any two adjacent block elements that lack one:
  headings, paragraphs, lists, code fences, admonition components, and
  horizontal rules

#### Not auto-fixable (reported only, not changed)

- Passive voice constructions
- Inline prose placeholder casing (for example, `` `your_token` `` → `YOUR_TOKEN`) — too risky to auto-apply; flag and suggest instead
- `"via"` used as a preposition — replacement word depends on context ("through", "using", "with", "by"); flag and suggest
- `"allows you to"` / `"enables you to"` constructions — replace with a direct active verb; flag and suggest
- Link text that is non-descriptive ("click here", "this page") — requires
  knowing the link target
- Missing doc sections (prerequisites, "Next steps", and so on)
- Wrong doc-type structure
- SEO heading rewrites
- Broken or incorrect links
- Incorrect admonition choice
- Missing code fence language identifiers (cannot safely infer language)

---

### Step 1 — Read the reference files

Read these reference documents **once per invocation**, before reviewing the
first file. Do not re-read them for each subsequent file in directory or
`--changed` mode — load them once and apply the same knowledge to every file
in the batch.

1. **Style guide** — read each of the following files:
   - `docs/style-guide/index.md`
   - `docs/style-guide/top-12.md`
   - `docs/style-guide/appendix.md`
   - `docs/style-guide/ui-components.md`
   - `docs/style-guide/general/active-voice.md`
   - `docs/style-guide/general/alerts.md`
   - `docs/style-guide/general/content-organization.md`
   - `docs/style-guide/general/enterprise-releases.md`
   - `docs/style-guide/general/fonts-and-formats.md`
   - `docs/style-guide/general/grammar.md`
   - `docs/style-guide/general/language.md`
   - `docs/style-guide/general/links.md`
   - `docs/style-guide/general/point-of-view.md`
   - `docs/style-guide/general/screenshots.md`
   - `docs/style-guide/general/titles-and-headings.md`
   - `docs/style-guide/general/tense-and-time.md`
   - `docs/style-guide/general/variants.md`
   - `docs/style-guide/codeblocks-and-consoles/index.md`
   - `docs/style-guide/codeblocks-and-consoles/fonts-and-formats.md`
   - `docs/style-guide/codeblocks-and-consoles/language.md`
   - `docs/style-guide/codeblocks-and-consoles/organization.md`
   - `docs/style-guide/markdown/index.md`
   - `docs/style-guide/markdown/fonts-and-formats.md`
   - `docs/style-guide/markdown/headings.md`
   - `docs/style-guide/markdown/links.md`
   - `docs/style-guide/numbers-dates-time/index.md`
   - `docs/style-guide/numbers-dates-time/dates-and-time.md`
   - `docs/style-guide/numbers-dates-time/format-numbers.md`
   - `docs/style-guide/numbers-dates-time/words-as-numbers.md`
   - `docs/content-guide/content-types.md`

2. **Example docs**:

   - How-to: `content/hcp-docs/content/docs/vault-radar/get-started/add-data-sources/slack.mdx`. This is a well-formatted how-to doc used as a concrete model. Note its frontmatter fields, heading hierarchy, tone, code block usage, admonition style, link formatting, and overall structure. **Note**: this is a Vault Radar document used as a format reference only. Do not apply Vault Radar product conventions (terminology, URL structure, component choices) to non-Vault-Radar docs.

   - Concept: `content/consul/v2.0.x/content/docs/concept/catalog.mdx`. This is a well-formatted concept doc used as a concrete model. Note its frontmatter fields, heading hierarchy, tone, code block usage, admonition style, link formatting, and overall structure. **Note**: this is a Consul document used as a format reference only. Do not apply Consul product conventions (terminology, URL structure, component choices) to non-Consul docs.

   - Overview: `content/consul/v2.0.x/content/docs/connect/index.mdx`. This is a well-formatted overview doc used as a concrete model. Note its frontmatter fields, heading hierarchy, tone, code block usage, admonition style, link formatting, and overall structure. **Note**: this is a Consul document used as a format reference only. Do not apply Consul product conventions (terminology, URL structure, component choices) to non-Consul docs.

   - Troubleshooting: `content/consul/v2.0.x/content/docs/troubleshoot/service-communication.mdx`. This is a well-formatted troubleshooting doc used as a concrete model. Note its frontmatter fields, heading hierarchy, tone, code block usage, admonition style, link formatting, and overall structure. **Note**: this is a Consul document used as a format reference only. Do not apply Consul product conventions (terminology, URL structure, component choices) to non-Consul docs.

   - Release notes: `content/nomad/v2.0.x/content/docs/release-notes/v1-11-x.mdx`. This is a well-formatted release notes doc used as a concrete model. Note its frontmatter fields, heading hierarchy, tone, code block usage, admonition style, link formatting, and overall structure. **Note**: this is a Nomad document used as a format reference only. Do not apply Nomad product conventions (terminology, URL structure, component choices) to non-Nomad docs.

If the core style guide files (`docs/style-guide/index.md` and
`docs/style-guide/top-12.md`) cannot be found, stop and report the missing
path to the user. Do not proceed without them.

If any other individual style guide file is missing, note it in the report and
continue — do not treat a missing sub-file as a blocking error.

If you cannot find any of the example docs, note the absence in the report and
continue without them. Do not treat a missing example doc as a blocking error.

---

### Step 2 — Identify the doc type

Determine which of the following doc types the file belongs to. These align
with the content types defined in the project's content guide.

| Doc Type | Primary Goal | Audience Assumption |
|---|---|---|
| **How-to** | Walks users through completing a specific task | Some prior knowledge assumed |
| **Concept** | Provides context and background to help readers understand a product, feature, or topic | Curious, not necessarily doing a task |
| **Overview** | Orients readers to a topic area, summarizes key workflows and use cases, and links to child pages | Navigating or exploring |
| **Reference** | Technical details like API endpoints, CLI commands, and configuration options | User knows what they're looking for |
| **Troubleshooting** | Helps users resolve common issues | User is encountering a problem |
| **Release notes** | Communicates new features, bug fixes, and changes | Tracking product changes |

> **Note on template conventions**: The project's how-to template (`docs/content-guide/content-types.md`) uses `## Steps` as the heading for the procedural section. If you encounter a file that uses `## Steps` as its procedure heading, treat that as the expected how-to pattern — not a violation.

If you cannot determine the doc type from the file content or frontmatter, ask
the user before continuing.

---

### Step 3 — Check format for the doc type

Use the checklist for the identified doc type. Use the example doc for the
identified doc type (loaded in Step 1) as a concrete model for what correct
formatting looks like.

#### How-to

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata
- [ ] Title is action-oriented (describes the task the reader will complete)
- [ ] Brief intro paragraph states the goal
- [ ] `## Requirements` section lists system, environment, and software prerequisites (may be absent if the doc has no meaningful prerequisites)
- [ ] Procedural content uses numbered steps, grouped under a `## Steps` heading or concrete action-oriented subheadings (for example, `## Configure the agent`, `## Deploy the service`)
- [ ] Does not over-explain concepts — stays task-focused
- [ ] `## Next steps` section links to related how-to pages (optional but encouraged)
- [ ] Optional but encouraged: troubleshooting section at the end

#### Concept

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata
- [ ] Opens with a clear definition or "what is X" statement
- [ ] Uses prose paragraphs, not numbered steps
- [ ] Explains *why* something exists or works the way it does
- [ ] Links to related tutorials or how-to guides for hands-on follow-up
- [ ] Does not include step-by-step instructions

#### Reference

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata
- [ ] Highly structured: uses consistent heading hierarchy and tables where applicable
- [ ] Each item/entry is complete and self-contained
- [ ] No prose narrative — scannable by design
- [ ] Parameters, flags, or fields include: name, type, required/optional, description, and default value where applicable
- [ ] No how-to steps or conceptual explanations inline

#### Troubleshooting

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata
- [ ] Title clearly indicates troubleshooting content (for example, "Troubleshoot [feature]")
- [ ] Organized by symptom or error message
- [ ] Each issue follows: symptom/error → cause → resolution
- [ ] Resolution steps are numbered and actionable
- [ ] Does not mix conceptual explanations into resolution steps
- [ ] Links to related how-to or reference docs where relevant

#### Overview

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata
- [ ] Opens with a brief intro paragraph describing the topic area and its purpose
- [ ] Summarizes key workflows or use cases to orient the reader
- [ ] Links to all relevant child pages (how-to, concept, and reference) with short descriptions
- [ ] May include contextual prose to explain what to expect as readers progress through the topic
- [ ] Does not contain full procedural steps or deep conceptual explanations — those belong in dedicated how-to or concept docs
- [ ] Organized logically (by workflow order, complexity, or category)

#### Release notes

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata; `description` accurately reflects the actual content of this version, not a prior version
- [ ] Clearly states the version or date of each release
- [ ] Organizes changes by version, then by feature or change area within each version (the Nomad/Consul pattern); or by category (Features, Bug fixes, Breaking changes, Deprecations) if the product uses that pattern — check the reference example for the product's convention
- [ ] Each entry is concise — one to three sentences per item with a link to the relevant docs
- [ ] Breaking changes and deprecations are prominently highlighted with `<Warning>` admonitions
- [ ] Does not include how-to instructions
- [ ] Uses `@include` partials for standardized messages (EOL chart, enterprise alerts) rather than custom inline text

#### All doc types — universal checks

- [ ] Heading hierarchy is correct: H1 → H2 → H3, no skipped levels
- [ ] Exactly one H1 per file (the page title)
- [ ] Shell/CLI commands use `` ```shell-session `` (not `` ```bash ``), with a `$` prompt prefix for each command
- [ ] Other code blocks have an appropriate language identifier (`` ```hcl ``, `` ```json ``, `` ```yaml ``, and so on)
- [ ] Stand-in placeholder values inside code blocks use angle brackets: `<path/to/file>`, not ALL_CAPS
- [ ] Images (if any) have descriptive alt text that describes content, not just "screenshot"
- [ ] Links use the correct format per the style guide (relative vs. absolute)
- [ ] Admonitions/callouts use correct syntax and are used appropriately
- [ ] Standardized messages (beta, enterprise, deprecation, EOL) use `@include` partials, not custom inline alerts
- [ ] No broken links or references to non-existent sections
- [ ] Optimized for SEO: action-oriented headings, titles, and descriptions
- [ ] Blank line before and after every heading, paragraph, list, code block, and admonition component

---

### Step 4 — Check style guide compliance

Flag every violation found.

#### Voice, tone, and point of view

- Address readers as **"you"** when describing actions the reader performs
- Use **"we"** only when referring to HashiCorp actions or recommendations — for
  example, "We recommend…", "We added…", "We deprecated…". Do **not** use "we"
  to guide readers through examples ("In this example, we configure…")
- Do not use "let's", "our" (when referring to the reader's environment), or
  first-person plural to describe reader actions
- Use **active voice** — avoid passive constructions (for example, "the secret is stored" → "Vault stores the secret")
- Use **present tense** — avoid future tense ("will"). Write "the command returns" not "the command will return"
- Use **imperative mood** for instructions — "Run the command" not "You should run the command"
- Do not use "please" in instructions
- Do not use "simple", "easy", "just", or other minimizing language

#### Terminology and product names

- Flag any terms the style guide marks as preferred, avoided, or with specific casing
- HashiCorp product names must be capitalized correctly (for example, "Vault", "Terraform", "HCP Vault Radar")
- Use the full HCP product name on first reference, then the short name:
  - "HCP Vault Radar" then "Vault Radar"
  - "HCP Vault Dedicated" then "HCP Vault"
- Spell out acronyms on first use (for example, "Key-Value (KV) secrets engine" then "KV" thereafter)
- For non-HashiCorp products, use the vendor's correct capitalization and spelling (for example, "Slack", not "slack")
- Do not use Latin abbreviations: write "for example" not "e.g.", "that is" not "i.e.", avoid "etc."
- Do not use unofficial product abbreviations: TF, TFE, TFC, TFC4B, TFCB, HCP TF, VSO, COM

#### Word choice

- Do not use words that reference points in time to describe product state: "new", "old", "now", "currently" (exception: release notes and beta callouts)
- Do not use shortened or abbreviated forms: "repository" not "repo", "directory" not "dir", "configuration" not "config"
- Do not use jargon or non-English words without explanation: avoid "via", "sanity check", "smoke test", "blast radius", "carte blanche", "ergo", "vice versa"
- Do not use speculative or hypothetical framing: avoid "imagine", "suppose", "pretend"
- Do not use rhetorical questions in headings or prose
- Do not use weak enabling constructions: "allows you to" and "enables you to" should be replaced with a direct active verb (for example, "Vault allows you to store secrets" → "Vault stores secrets")
- Use shorter, more common words where possible (for example, "use" not "utilize", "start" not "initiate")
- Flag sentences over approximately 30 words as candidates for splitting

#### Formatting

- **UI elements**: use bold for UI labels (for example, **Save**, **Settings**)
- **Code elements**: use code formatting for commands, values, file paths, API endpoints, and configuration keys
- **Inline placeholders** (in prose): use ALL_CAPS for user-supplied values (for example, `YOUR_TOKEN`)
- **Code block placeholders**: use angle brackets (for example, `<path/to/file>`, `<cluster-name>`) — not ALL_CAPS
- **Bold and italics**: do not overuse — bold for emphasis or UI labels; italics sparingly
- Do not place the same type of element immediately adjacent to another of the same type: no consecutive alerts, consecutive headings without intervening prose, consecutive tables, or consecutive lists

#### Code blocks

- CLI/shell commands must use `` ```shell-session `` with a `$` prompt, not `` ```bash ``
- Commands longer than 100 characters must be split with the shell line continuation character (`\`)
- JSON that contains comments must use the `javascript` syntax label, not `json`
- Long commands in a numbered list must be indented four spaces to preserve list numbering
- Do not use code comments to explain what the code does — introduce the block with a sentence instead

#### Headings

- Use **sentence case** for all headings
- Do not start headings with gerunds (-ing words)
- Do not start headings with articles (a, an, the)
- Keep headings under 12 words
- Headings must be action-oriented for procedural content

#### Numbers, punctuation, and spelling

- Use **Oxford commas** (serial commas)
- Spell out numbers under 10; use numerals for 10 and above
- Use American English spelling throughout (for example, "initialize" not "initialise", "center" not "centre")

#### Links

- Use descriptive link text — never "click here" or "this page"
- Use relative links for internal cross-references where the style guide specifies
- Verify link text accurately describes the target

#### Alerts and admonitions

Alert types and their correct use:

- `<Tip>`: best practices or optional settings and workflow (information not required to complete the task)
- `<Note>`: information the user may need to act on
- `<Warning>`: information the user **must** act on — only for breaking changes, security vulnerabilities, critical compatibility issues, or catastrophic consequences
- `<EnterpriseAlert>` / `<EnterpriseAlert inline/>`: paid-edition feature callouts; use the appropriate partial, not a custom `<Note>`

Documentation-specific rules (stricter than tutorials):

- **Avoid `<Note>` and `<Tip>` in docs** — integrate supplemental information into prose instead; alerts lose effectiveness when overused
- Use **Markdown blockquotes** to link to tutorials from docs: `` > **Hands-on:** Try the [Tutorial title](URL) tutorial. `` — not a `<Note>` component
- Use `<Warning>` for upgrade, compatibility, and security situations in docs
- Place `<Warning>` **immediately before** the step or config it applies to
- **Never begin a page with an alert**
- **Never place consecutive alert boxes** — always separate with prose
- For beta, deprecated, enterprise, or paid-tier features, use the product's standardized `@include` partial — do not write a custom inline alert

#### Lists

- Use **numbered lists** for sequential or procedural steps
- Use **bulleted lists** for non-sequential items
- Maintain **parallel structure** within a list (all items start with the same part of speech)
- Be consistent with punctuation at the end of list items

#### Inclusive language

**Gendered language**
- Avoid gendered pronouns; use "they/them" for the singular third person
- Refer to roles ("developer", "administrator") rather than gendered nouns

**Ableist language**
- Do not use "see <link>" — use "refer to <link>"
- Do not use "sanity check" — use "preliminary check" or "verification"
- Do not use "dummy" to describe placeholder values — use "example" or "placeholder"

**Violent language**
- Do not use "hit" for button or key presses — use "press" or "click"
- Do not use "kill" for processes when an alternative exists — use "stop" or "end"; note that `kill` as a literal command name is acceptable
- Do not use "abort" for user-initiated cancellation — use "cancel" or "stop"

**Speculative or exclusionary framing**
- Do not describe tasks as "trivial", "obvious", or "self-explanatory"
- Do not assume the reader's environment or prior knowledge beyond what is stated in the prerequisites

---

### Step 5 — Compare to the example doc

Using the example doc that matches the identified doc type, note any structural
or stylistic patterns present in the example that are missing or handled
differently in the file under review. Call these out explicitly.

| Doc type | Reference example |
|---|---|
| How-to | `content/hcp-docs/content/docs/vault-radar/get-started/add-data-sources/slack.mdx` |
| Concept | `content/consul/v2.0.x/content/docs/concept/catalog.mdx` |
| Overview | `content/consul/v2.0.x/content/docs/connect/index.mdx` |
| Troubleshooting | `content/consul/v2.0.x/content/docs/troubleshoot/service-communication.mdx` |
| Release notes | `content/nomad/v2.0.x/content/docs/release-notes/v1-11-x.mdx` |
| Reference | `content/consul/v2.0.x/content/commands/` — pick the command file most similar to the file under review; apply universal checks plus the Reference format checklist |

Remember: the example doc is a format model, not a product template. Apply
structural and stylistic observations only. Do not flag the absence of
product-specific content from the reference doc.

---

## Scoring system

Calculate a weighted score out of 100% based on three categories.

### Content quality (50% of total score)

Score by deducting from 100 using the following point table.

| Issue | Deduct | Per |
|---|---|---|
| Required section for the doc type is missing (prerequisites, "Next steps", and so on) | 10 pts | per missing section |
| Incorrect or out-of-sequence procedural steps | 15 pts | once per file |
| Steps that can't be followed as written (missing commands, broken examples) | 20 pts | once per file |
| Conceptual explanations mixed into a how-to or reference doc | 10 pts | once per file |
| How-to steps mixed into a concept or reference doc | 10 pts | once per file |
| Paragraph or section with unclear flow (reader must reread to understand) | 5 pts | per instance |
| Level of detail is inappropriate for the doc type (too shallow or too deep) | 10 pts | once per file |
| Key context missing that the audience realistically needs | 10 pts | once per file |
| Code examples absent where they would materially help comprehension | 5 pts | once per file |

If no penalties apply, score 100. The final content quality score is `100 − total deductions` (minimum 0).

### Format compliance (40% of total score)

Score by deducting from 100 using the following point table.

| Issue | Deduct | Per |
|---|---|---|
| Missing required frontmatter field (`page_title`, `description`) | 10 pts | per missing field |
| Skipped heading level or more than one H1 | 10 pts | per instance |
| Shell/CLI command uses `` ```bash `` instead of `` ```shell-session `` | 5 pts | per instance |
| Code block missing language identifier | 5 pts | per instance |
| Stand-in value in a code block uses ALL_CAPS instead of angle brackets | 5 pts | per instance |
| Image missing descriptive alt text | 5 pts | per instance |
| Admonition used incorrectly (wrong type, consecutive alerts, page begins with alert) | 10 pts | per instance |
| Standardized message (beta, enterprise, deprecation) written inline instead of using `@include` partial | 10 pts | per instance |
| Missing blank line before or after a block element | 3 pts | per instance (max 10 pts total) |
| Doc type format checklist item failed | 5 pts | per distinct failed item |

If no penalties apply, score 100. The final format compliance score is `100 − total deductions` (minimum 0).

### SEO and discoverability (10% of total score)

Score by deducting from 100 using the following point table.

| Issue | Deduct | Per |
|---|---|---|
| `page_title` is missing or does not describe the page content | 15 pts | once per file |
| `description` frontmatter is missing or generic (no target keywords) | 15 pts | once per file |
| H1 heading does not match or closely reflect the `page_title` | 10 pts | once per file |
| H2 headings are not descriptive (for example, bare "Overview" or "Step 1" with no context) | 5 pts | per instance (max 15 pts) |
| Page has no scannable structure: walls of prose with no headings, lists, or tables | 10 pts | once per file |
| Key terms or product names are inconsistently cased across the page | 5 pts | once per file |

If no penalties apply, score 100. The final SEO score is `100 − total deductions` (minimum 0).

### Scoring thresholds

- **90–100%**: Ready to publish with no changes
- **75–89%**: Ready for review, minor fixes needed
- **60–74%**: Needs revision before review
- **Below 60%**: Significant work required before review

**Minimum threshold**: documents must score **75% or higher** to proceed to
formal review.

---

## Output format

### When `--fix` was used

Prepend a `### 🔧 Auto-fixes Applied` section before the first per-file
report block. If no auto-fixable violations were found, write "No auto-fixable
issues found."

#### 🔧 Auto-fixes Applied

| File | Location | Fix applied |
|---|---|---|
| `[filename]` | [heading or line ref] | [description of what was changed] |

---

### Per-file report block

Produce one report block per file reviewed. Separate multiple blocks with
`---`. Each block must begin with `### 📄 Doc Info` as the first non-empty
line.

### 📄 Doc Info

- **File**: `[filename]`
- **Doc type identified**: `[type]`
- **Reference example used**: `[full path to example doc, or the commands directory path for Reference type]`

### 📊 Quality Score

**Overall Score: [XX]%** — [Ready to publish / Ready for review / Needs revision / Significant work required]

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| Content Quality | [XX/100] | 50% | [XX/50] |
| Format Compliance | [XX/100] | 40% | [XX/40] |
| SEO & Discoverability | [XX/100] | 10% | [XX/10] |
| **Total** | | | **[XX/100]** |

**Status**: [✅ Passes 75% threshold / ❌ Below 75% threshold — not ready for review]

Remind users that they can run a full SEO Review with the `/seo-review` skill.

### ✅ What Looks Good

List what the doc does correctly — be specific, not generic.

### ⚠️ Issues Found

| # | Location | Issue | Rule / Convention | Suggested Fix |
|---|---|---|---|---|
| 1 | [heading or line ref] | [what's wrong] | [style guide rule or format checklist item] | [how to fix it] |

If there are no issues, say so explicitly.

### 📋 Overall Assessment

One short paragraph: is this doc **ready to publish**, **needs minor fixes**,
or **needs significant revision**? Include the top one or two priorities if
fixes are needed.

---

## Behavioral rules

- Do not rewrite the entire document unless the user explicitly asks.
- Without `--fix`, default to reporting and suggesting, not editing files.
- With `--fix`, apply only the mechanical corrections listed in the
  auto-fix rules above. Do not make judgment-based edits. Do not modify
  `@include` partial lines or auto-generated blocks even when `--fix` is active.
- If the style guide and the example doc appear to contradict each other,
  flag the conflict and do not guess which takes precedence.
- If the style guide is silent on something, note the gap rather than
  inventing a rule.
- If the doc type is ambiguous (for example, a hybrid tutorial/reference),
  flag this and apply the checklist for the closest match.
- Ask before making large edits beyond what `--fix` covers.
- When reviewing multiple files, apply the same rigor to every file in the
  list — do not reduce thoroughness for large batches.
- When a file contains auto-generated blocks (for example, `# START AUTO GENERATED METADATA` … `# END AUTO GENERATED METADATA`) or `@include` partial directives, skip those blocks during review. Do not flag auto-generated content as a style violation. Evaluate only the human-authored content in the file.
