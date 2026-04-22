---
name: radar-doc-review
description: Manually invoked documentation reviewer. Do NOT load this skill automatically. Only load when the user explicitly runs /radar-doc-review. Reviews documentation files for correct format, style guide compliance, and content quality.
---

# Documentation Review Skill

## Purpose

Review documentation files against the project's style guide, doc-type format requirements, and the established example doc.

## Invocation

This skill is manually invoked only via `/radar-doc-review`. Do not auto-load this skill based on context.

**Supported file types**: This skill reviews `.mdx` and `.md` files only. If the user provides a different file type, notify them that the skill only supports Markdown-based documentation files.

---

## Step-by-Step Review Process

### Step 1 — Read the Reference Files

Before doing anything else, read these files in full:

1. **Style guide**: `/docs/style-guide` for `.md` files in all directories.
2. **Example doc**: `/content/hcp-docs/content/docs/vault-radar/get-started/add-data-sources/slack.mdx`
   - This is a generally well-formatted doc. Note its frontmatter fields, heading hierarchy, tone, code block usage, admonition style, link formatting, and overall structure.

**Error handling**: If either file cannot be found, stop the review and report the missing file path to the user.

Do not proceed until you have read both files.

### Step 2 — Identify the Doc Type

Determine which of the following doc types the file belongs to. These align with the content types defined in `/docs/content-guide/content-types.md`.

| Doc Type | Primary Goal | Audience Assumption |
|---|---|---|
| **Tutorial** | Teaches users about product features through a hands-on experience with an end-to-end workflow | No prior knowledge assumed |
| **How-to** | Walks users through completing a specific task | Some prior knowledge assumed |
| **Concept** | Provides context and background to help readers understand a product, feature, or topic | Curious, not necessarily doing a task |
| **Reference** | Technical details like API endpoints, CLI commands, and configuration options | User knows what they're looking for |
| **Troubleshooting** | Helps users resolve common issues | User is encountering a problem |
| **Landing page** | Provides an overview of a section and links to child pages | Navigating or exploring |
| **Release notes** | Communicates new features, bug fixes, and changes | Tracking product changes |

If you cannot determine the doc type from the file content or frontmatter, ask the user before continuing.

### Step 3 — Check Format for the Doc Type

Use the checklist for the identified doc type below. Use the slack.mdx example as a concrete model for what correct formatting looks like.

#### Tutorial

- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata per the style guide
- [ ] Starts with a brief intro explaining what the user will accomplish and any prerequisites
- [ ] Numbered steps throughout — no bullet points for procedural content
- [ ] Step numbers render in the correct order. If steps under a single section reset to 1, identify the offending component that is not indented properly.
- [ ] Each step has exactly one action; compound steps are split unless it is navigating a menu with multiple levels.
- [ ] Ends with a "Next steps" or "What's next" section

#### How-to

- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Title follows "How to [verb] [noun]" pattern or equivalent action-oriented pattern
- [ ] Brief intro states the goal and any prerequisites
- [ ] Numbered steps for any procedural content
- [ ] Does not over-explain concepts — stays task-focused
- [ ] Optional but encouraged: troubleshooting section at the end

#### Concept

- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Opens with a clear definition or "what is X" statement
- [ ] Uses prose paragraphs, not numbered steps
- [ ] Explains *why* something exists or works the way it does
- [ ] Links to related tutorials or how-to guides for hands-on follow-up
- [ ] Does not include step-by-step instructions (those belong in tutorials/how-tos)

#### Reference

- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Highly structured: uses consistent heading hierarchy and tables where applicable
- [ ] Each item/entry is complete and self-contained
- [ ] No prose narrative — scannable by design
- [ ] Parameters, flags, or fields include: name, type, required/optional, description, and default value (where applicable)
- [ ] No tutorial-style steps or conceptual explanations inline

#### Troubleshooting

- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Title clearly indicates this is troubleshooting content (e.g., "Troubleshoot [feature]")
- [ ] Organized by symptom or error message — users should find their problem quickly
- [ ] Each issue follows a consistent pattern: symptom/error → cause → resolution
- [ ] Resolution steps are numbered and actionable
- [ ] Does not mix conceptual explanations into resolution steps
- [ ] Links to related how-to or reference docs where relevant

#### Landing page

- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Provides a brief overview of the section or topic area
- [ ] Links to all relevant child pages with short descriptions
- [ ] Does not contain detailed procedural or conceptual content
- [ ] Organized logically (e.g., by workflow order, complexity, or category)
- [ ] Uses consistent formatting for link lists or card layouts

#### Release notes

- [ ] Frontmatter includes: `page_title`, `description`, and any required metadata
- [ ] Clearly states the version or date of the release
- [ ] Organizes changes by category (e.g., Features, Improvements, Bug fixes, Breaking changes, Deprecations)
- [ ] Each entry is concise — one to two sentences per item
- [ ] Breaking changes and deprecations are prominently highlighted (e.g., using `<Warning>` or `<Note>`)
- [ ] Links to relevant docs for new features or changed behavior
- [ ] Does not include tutorial-style instructions

#### All doc types (universal checks)

- [ ] Heading hierarchy is correct: H1 → H2 → H3, no skipped levels
- [ ] Code blocks have a language identifier (` ```bash `, ` ```hcl `, ` ```json `, etc.)
- [ ] No orphaned H1s — only one H1 per file (the page title)
- [ ] Images (if any) have descriptive alt text
- [ ] Links use the correct format per the style guide (relative vs. absolute)
- [ ] Admonitions/callouts use the correct syntax and are used appropriately (note, warning, tip)
- [ ] No broken links or references to non-existent sections
- [ ] Optimized for SEO including action oriented headings, titles, and descriptions
- [ ] Line break after each section, paragraph, unordered list, ordered list, code blocks, headings, at the end of the document, and other elements for readability

### Step 4 — Check Style Guide Compliance

Using the style guide in `/docs/style-guide/`, check for compliance with the following rules. Flag every violation found.

#### Voice, tone, and point of view

- Use **second person** ("you") — never "we", "our", or "let's"
- Use **active voice** — avoid passive constructions (e.g., "the secret is stored" → "Vault stores the secret")
- Use **present tense** — avoid future tense ("will"). Write "the command returns" not "the command will return"
- Use **imperative mood** for instructions — "Run the command" not "You should run the command"
- Do not use "please" in instructions
- Do not use "simple", "easy", "just", or other minimizing language

#### Terminology and product names

- Flag any terms the style guide marks as preferred, avoided, or with specific casing
- HashiCorp product names must be capitalized correctly (e.g., "Vault", "HCP Vault Radar", "Terraform")
- For HCP product names, use the full name on first reference, then the shortname after 
   - "HCP Vault Radar" then "Vault Radar"
   - "HCP Vault Dedicated" then "HCP Vault"
- Spell out acronyms on first use, then abbreviate (e.g., "Key-Value (KV) secrets engine" then "KV" thereafter)
- For non-HashiCorp products, use the correct capitalization and spelling per the vendor's guidelines (e.g., "Slack", not "slack" or "SLACK")
- Do not use Latin abbreviations: write "for example" not "e.g.", "that is" not "i.e.", avoid "etc."

#### Formatting

- **UI elements**: Bold for UI labels (e.g., **Save**, **Settings**)
- **Code elements**: Use code formatting for commands, values, file paths, API endpoints, and configuration keys
- **Placeholders**: Use ALL_CAPS for user-supplied values (e.g. `YOUR_TOKEN`)
- **Bold and italics**: Do not overuse — bold for emphasis or UI, italics sparingly

#### Headings

- Use **sentence case** for all headings
- Do not start headings with gerunds (-ing words)
- Do not start headings with articles (a, an, the)
- Keep headings under 12 words
- Headings must be action-oriented for procedural content

#### Capitalization and punctuation

- Use **Oxford commas** (serial commas)
- Use **sentence case** for headings, titles, and descriptions
- Spell out numbers under 10; use numerals for 10 and above

#### Sentence and paragraph structure

- Flag sentences over **~30 words** as candidates for splitting
- Use shorter, more common words where possible (e.g., "use" not "utilize", "start" not "initiate")
- Avoid jargon without explanation

#### Links

- Use descriptive link text — never "click here" or "this page"
- Use relative links for internal cross-references where the style guide specifies
- Verify link text accurately describes the target

#### Alerts and admonitions

- Use the correct component for the context:
  - `<Note>`: Supplementary information that is useful but not critical
  - `<Tip>`: Helpful suggestion or best practice
  - `<Warning>`: Information that could cause data loss, security issues, or breaking changes
  - `<Highlight>`: Important callout for limitations or key details
- Do not overuse admonitions — if everything is highlighted, nothing stands out

#### Lists

- Use **numbered lists** for sequential/procedural steps
- Use **bulleted lists** for non-sequential items
- Maintain **parallel structure** within a list (all items start with same part of speech)
- Be consistent with punctuation at the end of list items

#### Images

- All images must have **descriptive alt text**
- Alt text should describe the content, not just say "screenshot"

#### Inclusive language

- Flag any terms the style guide identifies as non-inclusive
- Avoid gendered pronouns; use "they/them" for singular third person

### Step 5 — Compare to the Example Doc

With the slack.mdx example in mind, note any structural or stylistic patterns present in the example that are missing or handled differently in the file under review. Call these out explicitly.

---

## Scoring System

Calculate a weighted score out of 100% based on three categories:

### Content Quality (50% of total score)

- Accuracy and completeness of information
- Clear, logical flow and structure
- Appropriate level of detail for the doc type
- Correct procedural steps (if applicable)
- Useful examples and context

### Format Compliance (40% of total score)

- Doc type format checklist adherence
- Heading hierarchy and structure
- Code block formatting and language identifiers
- Image alt text and formatting
- Link formatting and validity
- Component usage (admonitions, tabs, etc.)
- Frontmatter completeness

### SEO & Discoverability (10% of total score)

- Action-oriented, descriptive headings
- Optimized page title and description
- Appropriate keyword usage
- Scannable structure

**Scoring guidance:**

- **90-100%**: Ready to publish with no changes
- **75-89%**: Ready for review, minor fixes needed
- **60-74%**: Needs revision before review
- **Below 60%**: Work required before review

**Minimum threshold**: Documents must score **75% or higher** to proceed to formal review.

---

## Output Format

Return your review as a structured report with the following sections:

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
For each issue, provide:

| # | Location | Issue | Rule / Convention | Suggested Fix |
|---|---|---|---|---|
| 1 | [heading or line ref] | [what's wrong] | [style guide rule or format checklist item] | [how to fix it] |

If there are no issues, say so explicitly.

### 📋 Overall Assessment

One short paragraph: is this doc **ready to publish**, **needs minor fixes**, or **needs significant revision**? Include the top 1–2 priorities if fixes are needed.

---

## Behavioral Rules

- Do not rewrite the entire document unless the user explicitly asks.
- If the style guide and the slack.mdx example appear to contradict each other, flag the conflict and do not guess which takes precedence.
- If the style guide is silent on something, note the gap rather than inventing a rule.
- If the doc type is ambiguous (e.g., a hybrid tutorial/reference), flag this and apply the checklist for the closest match.
- Ask before making large edits — default to reporting and suggesting, not rewriting.
