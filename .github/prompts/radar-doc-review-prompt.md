---
mode: ask
model: gpt-5.3-codex
description: Reviews a documentation file for correct format, style guide compliance, and content quality. Attach the file you want reviewed using #file.
---

Review the attached documentation file using the process below. Do not skip any step.

**Supported file types**: `.mdx` and `.md` only. If the attached file is a different type, stop and notify the user.

---

## Step 1 — Read the Reference Files

Before doing anything else, read these files in full:

1. **Style guide**: `/docs/style-guide/`
2. **Example doc**: `/content/hcp-docs/content/docs/vault-radar/get-started/add-data-sources/slack.mdx`
   - This is a well-formatted doc. Note its frontmatter fields, heading hierarchy, tone, code block usage, admonition style, link formatting, and overall structure.

If either file cannot be found, stop and report the missing path to the user. Do not proceed until both files have been read.

---

## Step 2 — Identify the Doc Type

Determine which doc type the file belongs to:

| Doc Type | Primary Goal | Audience Assumption |
|---|---|---|
| **Tutorial** | Teaches users about product features through a hands-on end-to-end workflow | No prior knowledge assumed |
| **How-to** | Walks users through completing a specific task | Some prior knowledge assumed |
| **Concept** | Provides context and background to help readers understand a product, feature, or topic | Curious, not necessarily doing a task |
| **Reference** | Technical details like API endpoints, CLI commands, and configuration options | User knows what they're looking for |
| **Troubleshooting** | Helps users resolve common issues | User is encountering a problem |
| **Landing page** | Provides an overview of a section and links to child pages | Navigating or exploring |
| **Release notes** | Communicates new features, bug fixes, and changes | Tracking product changes |

If you cannot determine the doc type from the file content or frontmatter, ask the user before continuing.

---

## Step 3 — Check Format for the Doc Type

Use the checklist for the identified doc type. Use the slack.mdx example as a concrete model.

### Tutorial
- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata per the style guide
- [ ] Starts with a brief intro explaining what the user will accomplish and any prerequisites
- [ ] Numbered steps throughout — no bullet points for procedural content
- [ ] Step numbers render in the correct order. If steps under a single section reset to 1, identify the offending component that is not indented properly
- [ ] Each step has exactly one action; compound steps are split unless navigating a multi-level menu
- [ ] Ends with a "Next steps" or "What's next" section

### How-to
- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Title follows "How to [verb] [noun]" or equivalent action-oriented pattern
- [ ] Brief intro states the goal and any prerequisites
- [ ] Numbered steps for any procedural content
- [ ] Does not over-explain concepts — stays task-focused
- [ ] Optional but encouraged: troubleshooting section at the end

### Concept
- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Opens with a clear definition or "what is X" statement
- [ ] Uses prose paragraphs, not numbered steps
- [ ] Explains *why* something exists or works the way it does
- [ ] Links to related tutorials or how-to guides for hands-on follow-up
- [ ] Does not include step-by-step instructions

### Reference
- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Highly structured: uses consistent heading hierarchy and tables where applicable
- [ ] Each item/entry is complete and self-contained
- [ ] No prose narrative — scannable by design
- [ ] Parameters, flags, or fields include: name, type, required/optional, description, and default value (where applicable)
- [ ] No tutorial-style steps or conceptual explanations inline

### Troubleshooting
- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Title clearly indicates troubleshooting content (e.g., "Troubleshoot [feature]")
- [ ] Organized by symptom or error message
- [ ] Each issue follows: symptom/error → cause → resolution
- [ ] Resolution steps are numbered and actionable
- [ ] Does not mix conceptual explanations into resolution steps
- [ ] Links to related how-to or reference docs where relevant

### Landing page
- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Provides a brief overview of the section or topic area
- [ ] Links to all relevant child pages with short descriptions
- [ ] Does not contain detailed procedural or conceptual content
- [ ] Organized logically (by workflow order, complexity, or category)
- [ ] Uses consistent formatting for link lists or card layouts

### Release notes
- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Clearly states the version or date of the release
- [ ] Organizes changes by category (Features, Improvements, Bug fixes, Breaking changes, Deprecations)
- [ ] Each entry is concise — one to two sentences per item
- [ ] Breaking changes and deprecations are prominently highlighted (`<Warning>` or `<Note>`)
- [ ] Links to relevant docs for new features or changed behavior
- [ ] Does not include tutorial-style instructions

### All doc types (universal checks)
- [ ] Heading hierarchy is correct: H1 → H2 → H3, no skipped levels
- [ ] Code blocks have a language identifier (` ```bash `, ` ```hcl `, ` ```json `, etc.)
- [ ] Only one H1 per file (the page title)
- [ ] Images (if any) have descriptive alt text
- [ ] Links use the correct format per the style guide (relative vs. absolute)
- [ ] Admonitions/callouts use correct syntax and are used appropriately
- [ ] No broken links or references to non-existent sections
- [ ] Optimized for SEO: action-oriented headings, titles, and descriptions
- [ ] Line break after each section, paragraph, list, code block, heading, and at the end of the document

---

## Step 4 — Check Style Guide Compliance

Flag every violation found.

### Voice, tone, and point of view
- Use **second person** ("you") — never "we", "our", or "let's"
- Use **active voice** — avoid passive constructions (e.g., "the secret is stored" → "Vault stores the secret")
- Use **present tense** — avoid future tense ("will")
- Use **imperative mood** for instructions — "Run the command" not "You should run the command"
- Do not use "please" in instructions
- Do not use "simple", "easy", "just", or other minimizing language

### Terminology and product names
- Flag any terms the style guide marks as preferred, avoided, or with specific casing
- HashiCorp product names must be capitalized correctly (e.g., "Vault", "HCP Vault Radar", "Terraform")
- Use the full name on first reference, then the shortname:
  - "HCP Vault Radar" → "Vault Radar"
  - "HCP Vault Dedicated" → "HCP Vault"
- Spell out acronyms on first use (e.g., "Key-Value (KV) secrets engine" then "KV")
- Non-HashiCorp products: use vendor's correct capitalization (e.g., "Slack", not "slack")
- No Latin abbreviations: write "for example" not "e.g.", "that is" not "i.e.", avoid "etc."

### Formatting
- **UI elements**: Bold (e.g., **Save**, **Settings**)
- **Code elements**: Code formatting for commands, values, file paths, API endpoints, config keys
- **Placeholders**: ALL_CAPS for user-supplied values (e.g., `YOUR_TOKEN`)
- **Bold and italics**: Do not overuse

### Headings
- Use **sentence case** for all headings
- Do not start headings with gerunds (-ing words)
- Do not start headings with articles (a, an, the)
- Keep headings under 12 words
- Headings must be action-oriented for procedural content

### Capitalization and punctuation
- Use **Oxford commas**
- Spell out numbers under 10; use numerals for 10 and above

### Sentence and paragraph structure
- Flag sentences over ~30 words as candidates for splitting
- Use simpler words where possible ("use" not "utilize", "start" not "initiate")
- Avoid jargon without explanation

### Links
- Use descriptive link text — never "click here" or "this page"
- Use relative links for internal cross-references per style guide
- Link text must accurately describe the target

### Alerts and admonitions
- `<Note>`: Supplementary information, useful but not critical
- `<Tip>`: Helpful suggestion or best practice
- `<Warning>`: Could cause data loss, security issues, or breaking changes
- `<Highlight>`: Important callout for limitations or key details
- Do not overuse admonitions

### Lists
- **Numbered lists** for sequential/procedural steps
- **Bulleted lists** for non-sequential items
- Maintain **parallel structure** within a list
- Be consistent with end punctuation

### Inclusive language
- Flag any terms the style guide identifies as non-inclusive
- Avoid gendered pronouns; use "they/them" for singular third person

---

## Step 5 — Compare to the Example Doc

Note any structural or stylistic patterns in the slack.mdx example that are missing or handled differently in the file under review. Call these out explicitly.

---

## Scoring

Calculate a weighted score out of 100%:

| Category | Weight |
|---|---|
| Content Quality (accuracy, completeness, flow, appropriate detail, examples) | 50% |
| Format Compliance (doc type checklist, structure, code blocks, frontmatter, components) | 40% |
| SEO & Discoverability (action-oriented headings, optimized title/description, scannable structure) | 10% |

**Thresholds:**
- **90–100%**: Ready to publish
- **75–89%**: Ready for review, minor fixes needed
- **60–74%**: Needs revision before review
- **Below 60%**: Significant work required
- **Minimum to proceed to formal review: 75%**

---

## Output Format

### 📄 Doc Info
- **File**: `[filename]`
- **Doc type identified**: `[type]`
- **Style guide path read**: `[path]`

### 📊 Quality Score

**Overall Score: [XX]%** — [Ready to publish / Ready for review / Needs revision / Significant work required]

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| Content Quality | [XX/100] | 50% | [XX/50] |
| Format Compliance | [XX/100] | 40% | [XX/40] |
| SEO & Discoverability | [XX/100] | 10% | [XX/10] |
| **Total** | | | **[XX/100]** |

**Status**: [✅ Passes 75% threshold / ❌ Below 75% threshold — not ready for review]

### ✅ What Looks Good
List what the doc does correctly — be specific, not generic.

### ⚠️ Issues Found

| # | Location | Issue | Rule / Convention | Suggested Fix |
|---|---|---|---|---|
| 1 | [heading or line ref] | [what's wrong] | [style guide rule or checklist item] | [how to fix it] |

If there are no issues, say so explicitly.

### 📋 Overall Assessment
One short paragraph: is this doc **ready to publish**, **needs minor fixes**, or **needs significant revision**? Include the top 1–2 priorities if fixes are needed.

---

## Behavioral Rules
- Do not rewrite the entire document unless the user explicitly asks.
- If the style guide and the slack.mdx example contradict each other, flag the conflict — do not guess which takes precedence.
- If the style guide is silent on something, note the gap rather than inventing a rule.
- If the doc type is ambiguous, flag it and apply the checklist for the closest match.
- Ask before making large edits — default to reporting and suggesting, not rewriting.