---
name: seo-optimize
description: SEO optimization for meta descriptions, titles, headings, and links. Complete source of truth for SEO and AI/LLM optimization criteria.
argument-hint: <file-paths> [--fix]
disable-model-invocation: true
---

# SEO Optimize Skill

Complete SEO and AI/LLM optimization tool. Optimizes meta descriptions, titles, headings, link descriptions, image alt text, code blocks, and content structure for maximum discoverability by search engines and AI systems.

**This skill is the source of truth for all SEO optimization criteria** (used by Phase 5 of documentation reviews).

**Comprehensive checks include:**
- Traditional SEO (meta, titles, keywords, links)
- AI/LLM optimization (context, entities, definitions)
- Accessibility (alt text, code languages)
- Featured snippet opportunities
- Content quality (readability, completeness)

## Usage

```bash
/seo-optimize <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to optimize (required)
  - Single file: `/seo-optimize docs/modules.mdx`
  - Multiple files: `/seo-optimize docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/seo-optimize docs/**/*.mdx`

- **--fix** or **-f**: Automatically apply SEO improvements (default: false)
  - Without flag: Report issues only
  - With flag: Implement SEO fixes

- **--report-only** or **-r**: Generate report without changes (explicit)

- **--focus**: Specific SEO aspect to optimize (optional)
  - Values: `meta`, `headings`, `links`, `keywords`, `structure`, `all` (default)
  - Example: `--focus meta`

## What This Skill Does

This skill runs Phase 5 (SEO & AI/LLM Optimization) checks from REVIEW_PHASES.md, optimized for quick SEO improvements.

### SEO Optimization Areas

1. **Meta Description Optimization**
   - Target length: 150-160 characters
   - Include primary keywords
   - Clear value proposition
   - Action-oriented language
   - No duplicate descriptions across docs

2. **Title Optimization**
   - Include primary keyword
   - Clear and descriptive
   - Matches page_title in frontmatter
   - Unique across documentation set

3. **First Paragraph Keyword Placement**
   - Primary keyword in first 100 words
   - Natural keyword integration
   - Clear topic indication
   - Sets context for content

4. **Heading Structure**
   - Proper H1 → H2 → H3 hierarchy
   - Keywords in headings
   - Descriptive, not generic
   - Scannability optimized

5. **Link Description Enhancement**
   - No generic "Learn more", "Click here"
   - Descriptive link text with keywords
   - Outcome-focused descriptions
   - Action verbs outside brackets

6. **Content Structure for AI Retrieval**
   - Clear topic sentences
   - Explicit relationship statements
   - Logical section progression
   - Semantic HTML structure

7. **Keyword Density**
   - Primary keyword appears 3-5 times
   - Secondary keywords distributed naturally
   - Avoid keyword stuffing
   - Maintain readability

8. **Internal Linking**
   - Strategic cross-references
   - Keyword-rich anchor text
   - Related content connections
   - Topic clustering

9. **Image Alt Text Optimization**
   - All images have descriptive alt text
   - Alt text includes relevant keywords naturally
   - Describes what's shown, not just "screenshot"
   - Length: 10-125 characters (optimal for screen readers)
   - Avoids "image of" or "picture of" redundancy

10. **Code Block Language Specification**
    - Every code block has language specified (```hcl, ```bash, ```json)
    - Language matches actual code type
    - No generic ```code blocks
    - Helps AI distinguish between different languages
    - Enables proper syntax highlighting for users

11. **Contextual Completeness for AI Extraction**
    - Each section can be understood independently
    - Key context repeated when referencing earlier content
    - Product/tool names mentioned explicitly (not just "it")
    - Acronyms defined on first use per section
    - "This section covers..." introductions

12. **Entity Recognition Clarity**
    - Product names consistently capitalized (Vault, Terraform, Packer)
    - Feature names clearly attributed to products
    - Version numbers specified when relevant
    - Tool names not abbreviated mid-section

13. **Featured Snippet & Answer Box Optimization**
    - Direct answers to "what is", "how to", "when to use" questions
    - Concise 40-60 word answers early in content
    - Use lists/tables for step-by-step or comparison content
    - Question headings (H2: "When should you use X?")
    - Summary boxes or definition callouts

14. **Term Definition Clarity**
    - Technical terms defined on first mention
    - Clear "X is a Y that..." patterns
    - Avoid assuming prerequisite knowledge
    - Glossary-style clarity for key concepts

15. **Prerequisites & Requirements Clarity**
    - Clear "Before you begin" or "Prerequisites" sections
    - Version requirements explicitly stated
    - Dependencies listed upfront
    - Required knowledge level indicated

16. **Readability Optimization**
    - Average sentence length: 15-20 words
    - Paragraph length: 3-5 sentences
    - Avoid overly complex sentences (25+ words)
    - Use transition words for flow
    - Break up long technical explanations

17. **External Link Quality Check**
    - No broken external links (404s)
    - Links to authoritative sources (official docs, RFCs)
    - Links to current versions (not deprecated docs)
    - HTTPS preferred over HTTP
    - Link text indicates external destination

## Examples

### Quick SEO check
```bash
/seo-optimize docs/modules.mdx
```
Reports SEO issues in ~2-3 minutes.

### Auto-fix SEO issues
```bash
/seo-optimize docs/**/*.mdx --fix
```
Applies SEO improvements automatically.

### Focus on meta descriptions
```bash
/seo-optimize docs/*.mdx --focus meta --fix
```
Optimizes only meta descriptions.

### Comprehensive optimization
```bash
/seo-optimize docs/section/**/*.mdx --fix
```
Full SEO optimization for a section.

### Pre-release SEO validation
```bash
/seo-optimize docs/**/*.mdx --report-only
```
Validates SEO before publishing.

## Output Format

```
SEO Optimization Report
=======================

File: docs/modules.mdx
Overall SEO Score: 7/10
Execution Time: 2m 34s

---

Meta Description
================

Current (142 chars):
"Learn about infrastructure modules and reusable code patterns."

Issues:
❌ Too short (target: 150-160 characters)
⚠️ Missing keywords: "terraform", "workflow", "automation"
⚠️ Generic phrasing: "learn about"

Optimized (158 chars) [AUTO-FIX AVAILABLE]:
"Explore Terraform infrastructure modules to enable code reuse, improve consistency, and accelerate deployment workflows across teams and environments."

Improvements:
✓ Added keywords: terraform, workflow, deployment
✓ More specific value proposition
✓ Action-oriented ("explore" vs "learn about")
✓ Optimal length for SERP display

---

Title Optimization
==================

Current: "Modules"
Page Title: "Infrastructure Modules"

Issues:
⚠️ Main heading doesn't match page_title
⚠️ Missing primary keyword in H1

Recommendation [AUTO-FIX AVAILABLE]:
"Infrastructure modules for Terraform workflows"
- Includes primary keyword: terraform
- Specific and descriptive
- SEO-friendly length

---

First Paragraph
===============

Current:
"This document explains how to structure reusable components..."

Issues:
❌ Primary keyword "terraform" not in first 100 words
⚠️ Vague opening: "this document explains"

Optimized [MANUAL REVIEW]:
"Terraform modules enable teams to create reusable infrastructure components..."
- Primary keyword in first sentence
- Direct, active voice
- Immediately valuable

---

Heading Structure
=================

✅ Proper hierarchy: H1 → H2 → H3
✅ Descriptive headings

Improvements:

Line 45: "Best Practices" (generic)
💡 More specific: "Module development best practices"
   [AUTO-FIX AVAILABLE]

Line 78: "Getting Started" (generic)
💡 More specific: "Create your first Terraform module"
   [AUTO-FIX AVAILABLE]

---

Link Descriptions
=================

Found 12 links, 3 need improvement:

Line 67: "Learn more about workflows"
❌ Generic phrase "learn more"
✓ Better: "Explore [workflow automation patterns](./workflows.mdx) to integrate modules"
   [AUTO-FIX AVAILABLE]

Line 89: "[Click here](./version-control.mdx) for version control info"
❌ "Click here" is SEO-poor
✓ Better: "Configure [version control for modules](./version-control.mdx) to manage releases"
   [AUTO-FIX AVAILABLE]

Line 102: "Documentation is available"
❌ Vague reference
✓ Better: "Review [module testing strategies](./testing.mdx) to ensure reliability"
   [MANUAL REVIEW]

---

Keyword Analysis
================

Primary keyword: "terraform modules"
- Appears 4 times ✅ (target: 3-5)
- First mention: Paragraph 1 ✅
- In headings: 1 time ⚠️ (add to more headings)
- In links: 2 times ✅

Secondary keywords:
- "infrastructure": 6 times ✅
- "reusable": 3 times ✅
- "workflows": 2 times ⚠️ (could increase to 3-4)
- "version control": 1 time ⚠️ (could increase to 2-3)

---

Internal Linking
================

Current: 5 internal links
Target: 8-10 links for topic clustering

Missing strategic links:
💡 Link to "centralize-packages.mdx" (module distribution)
💡 Link to "standardize-workflows.mdx" (workflow integration)
💡 Link to "development-environment.mdx" (module development)

[Suggestions available with --suggest flag]

---

AI/LLM Retrieval Optimization
==============================

✅ Clear topic sentences in each section
✅ Explicit relationship statements
⚠️ Could improve with more "This section explains..." style introductions

Example improvement [MANUAL REVIEW]:
Before: "Modules have several benefits."
After: "Terraform modules provide three primary benefits for infrastructure teams:"

---

Image Alt Text
==============

Found 3 images, 2 need optimization:

Line 45: `<img src="architecture.png" alt="diagram">`
❌ Non-descriptive alt text
✓ Better: `alt="Vault architecture showing client requests flowing through load balancer to active and standby nodes"`
   [AUTO-FIX AVAILABLE]

Line 89: `![](./workflow.png)`
❌ Missing alt text
✓ Better: `![Terraform workflow diagram showing write, plan, and apply stages](./workflow.png)`
   [AUTO-FIX AVAILABLE]

---

Code Block Language Specification
==================================

Found 8 code blocks, 2 missing language:

Line 67: ``` (no language specified)
❌ Generic code block
✓ Should be: ```hcl (Terraform configuration)
   [AUTO-FIX AVAILABLE]

Line 123: ```code
❌ Invalid language identifier
✓ Should be: ```bash (shell commands)
   [AUTO-FIX AVAILABLE]

---

Contextual Completeness
========================

⚠️ 3 sections could improve standalone comprehension:

Line 78: "Configure it using the following steps:"
❌ Unclear what "it" refers to
✓ Better: "Configure Vault's AppRole authentication using the following steps:"
   [MANUAL REVIEW]

Line 145: "The command returns the token."
❌ Which command?
✓ Better: "The `vault token create` command returns the authentication token."
   [MANUAL REVIEW]

---

Entity Recognition & Definitions
=================================

✅ Product names consistently capitalized
⚠️ 2 terms need definition on first use:

Line 34: "Configure the TTL for your tokens"
❌ Acronym not defined
✓ Better: "Configure the TTL (time-to-live, how long the token remains valid) for your tokens"
   [MANUAL REVIEW]

Line 92: "Use a backend to store state"
❌ Assumes knowledge
✓ Better: "Use a remote backend (a service that stores Terraform state files) to store state"
   [MANUAL REVIEW]

---

Featured Snippet Opportunities
===============================

💡 2 sections could be optimized for featured snippets:

Line 23: Consider adding question heading
💡 Suggestion: "## What is Terraform state?" followed by 40-60 word answer
   [MANUAL REVIEW]

Line 67: How-to content could use numbered list
💡 Current: Paragraph format
💡 Better: Numbered steps for "How to configure AppRole authentication"
   [MANUAL REVIEW]

---

Prerequisites & Requirements
=============================

⚠️ Prerequisites section could be clearer:

Current: "You need Vault installed"
💡 Better format:
   ```
   Prerequisites:
   - Vault 1.12.0 or later
   - AppRole auth method enabled
   - Valid ACL policy created
   ```
   [MANUAL REVIEW]

---

Readability Analysis
====================

Average sentence length: 18 words ✅ (target: 15-20)
Longest sentence: 34 words ⚠️ (Line 89 - consider breaking up)
Average paragraph length: 4 sentences ✅

Recommendations:
- Line 89: Sentence too complex (34 words) - break into 2 sentences
- Line 145: Paragraph too long (7 sentences) - consider splitting

---

External Link Quality
======================

Found 5 external links, 1 issue:

Line 56: http://terraform.io/docs/modules (HTTP)
⚠️ Use HTTPS: https://terraform.io/docs/modules
   [AUTO-FIX AVAILABLE]

✅ All external links are to current documentation versions
✅ No broken links detected

---

Summary
=======

Auto-fixable Issues: 11
Manual Review Needed: 8
SEO Score: 7/10 → Projected 9/10 after fixes

Traditional SEO:
✓ Meta description (optimize)
✓ Link descriptions (3 fixes)
✓ Generic headings (2 fixes)
⚠️ Internal links (3 additions needed)

AI/LLM Optimization:
✓ Code block languages (2 fixes)
✓ Image alt text (2 fixes)
⚠️ Contextual completeness (3 improvements)
⚠️ Term definitions (2 additions)
⚠️ Featured snippet opportunities (2 sections)

Content Quality:
✓ External link HTTPS (1 fix)
⚠️ Readability (1 sentence to split)
⚠️ Prerequisites (formatting improvement)

Run with --fix to apply 11 automatic improvements.
Manual review recommended for 8 contextual improvements.
```

## SEO Best Practices

### Meta Descriptions

**Poor:**
```yaml
description: "Learn about modules."
# Issues: Too short, generic, no keywords
```

**Good:**
```yaml
description: "Explore Terraform infrastructure modules to enable code reuse, improve consistency, and accelerate deployment workflows across teams and environments."
# 158 characters, includes keywords, action-oriented, specific
```

### Titles and Headings

**Poor:**
```markdown
# Modules
## Introduction
## Best Practices
```

**Good:**
```markdown
# Infrastructure modules for Terraform workflows
## Module structure and organization
## Module development best practices
```

### Link Descriptions

**Poor:**
```markdown
[Learn more](./workflows.mdx)
[Click here](./version-control.mdx)
Read the documentation for details
```

**Good:**
```markdown
Explore [workflow automation patterns](./workflows.mdx) to integrate modules
Configure [version control for modules](./version-control.mdx) to manage releases
Review [module testing strategies](./testing.mdx) to ensure reliability
```

### First Paragraph

**Poor:**
```markdown
This document explains modules. They are useful for teams.
```

**Good:**
```markdown
Terraform modules enable teams to create reusable infrastructure components that improve consistency and accelerate deployment across environments.
```

### Image Alt Text

**Poor:**
```markdown
![](architecture.png)
![diagram](./workflow.png)
<img src="screenshot.png" alt="screenshot">
```

**Good:**
```markdown
![Vault architecture showing client requests flowing through load balancer to active and standby nodes](architecture.png)
![Terraform workflow diagram showing write, plan, and apply stages](./workflow.png)
<img src="screenshot.png" alt="Vault UI dashboard displaying active namespace and token statistics">
```

### Code Block Languages

**Poor:**
````markdown
```
terraform {
  backend "remote" {}
}
```

```code
vault write auth/approle/role/my-role
```
````

**Good:**
````markdown
```hcl
terraform {
  backend "remote" {}
}
```

```bash
vault write auth/approle/role/my-role \
  token_ttl=1h \
  token_max_ttl=4h
```
````

### Contextual Completeness

**Poor:**
```markdown
## Configuration steps

Configure it using the following steps:
1. Enable the auth method
2. Create a role
3. Generate credentials
```

**Good:**
```markdown
## AppRole authentication configuration

Configure Vault's AppRole authentication using the following steps:
1. Enable the AppRole auth method in Vault
2. Create an AppRole role with appropriate policies
3. Generate role ID and secret ID credentials for your application
```

### Term Definitions

**Poor:**
```markdown
Configure the TTL for your tokens to ensure security.
Use a backend to store state remotely.
```

**Good:**
```markdown
Configure the TTL (time-to-live, how long the token remains valid) for your tokens to ensure security.
Use a remote backend (a service that stores Terraform state files) to store state remotely.
```

### Prerequisites Clarity

**Poor:**
```markdown
You need Vault installed and some basic knowledge of authentication.
```

**Good:**
```markdown
## Prerequisites

Before you begin, ensure you have:
- Vault 1.12.0 or later installed
- AppRole auth method enabled (`vault auth enable approle`)
- Basic understanding of Vault policies
- Valid ACL policy created for your application
```

## Integration with Other Skills

**Complete SEO workflow:**
```bash
# 1. Style check
/check-style docs/file.mdx --fix

# 2. SEO optimization
/seo-optimize docs/file.mdx --fix

# 3. Add resources (improves internal linking)
/add-resources docs/file.mdx --add

# 4. Validate results
/review docs/file.mdx --phases 5
```

**SEO sprint:**
```bash
# Optimize all docs in section
/seo-optimize docs/section/**/*.mdx --fix
```

**Focused optimization:**
```bash
# Fix meta descriptions only
/seo-optimize docs/**/*.mdx --focus meta --fix

# Then fix links
/seo-optimize docs/**/*.mdx --focus links --fix
```

## SEO Scoring Criteria

**9-10/10 - Excellent**
- Meta description 150-160 chars with keywords
- Title optimized with primary keyword
- Keywords in first paragraph and headings
- Descriptive links throughout
- Strong internal linking (8+ links)
- Perfect heading hierarchy
- All images have descriptive alt text
- All code blocks have language specified
- Contextually complete sections (AI-optimized)
- Terms defined on first use
- Clear prerequisites section
- Featured snippet opportunities optimized

**7-8/10 - Good**
- Meta description acceptable length
- Title mostly optimized
- Some keyword placement
- Most links descriptive
- Adequate internal linking (5-7 links)
- Most images have alt text
- Most code blocks have language
- Sections mostly self-contained
- Key terms defined

**5-6/10 - Needs Improvement**
- Meta description too short/long
- Generic title
- Limited keyword placement
- Some generic links
- Sparse internal linking (3-4 links)
- Some missing alt text
- Some code blocks missing language
- Sections assume context
- Acronyms not defined

**3-4/10 - Poor**
- Missing or very short meta description
- No title optimization
- No keyword strategy
- Many generic links
- Minimal internal linking (0-2 links)
- Most images missing alt text
- Many code blocks without language
- Poor contextual completeness
- No term definitions

**1-2/10 - Critical**
- No meta description
- No clear title
- No keyword usage
- No internal links
- Poor structure
- No image alt text
- No code block languages
- Sections not standalone
- No prerequisites stated

## When to Use This Skill

Use `/seo-optimize` when:
- ✅ Publishing new documentation (pre-release SEO check)
- ✅ Running SEO improvement sprints
- ✅ Meta descriptions need optimization
- ✅ Improving search rankings
- ✅ Enhancing AI/LLM discoverability
- ✅ After content rewrites
- ✅ Monthly SEO audits
- ✅ Optimizing for featured snippets
- ✅ Improving accessibility (alt text, code languages)
- ✅ Preparing docs for AI training/extraction

Don't use `/seo-optimize` when:
- ❌ Need comprehensive review (use `/review-doc` instead)
- ❌ Need style checking (use `/check-hashicorp-style`)
- ❌ Need technical accuracy validation (use `/review-doc --phases 2`)

## Performance

Typical execution times (with 17 optimization areas):
- Single file: ~3-4 minutes
- 5 files: ~12-20 minutes
- 20 files: ~50-80 minutes

**Note:** Comprehensive checks (17 areas) take slightly longer than basic SEO, but provide significantly more value for AI/LLM optimization and accessibility.

Faster than full `/review-doc` but more comprehensive than `/check-hashicorp-style`.

## Reference Files

This skill is referenced by:
- **`REVIEW_PHASES.md Phase 5`** - SEO & AI/LLM Optimization phase
- **`AGENTS.md`** - SEO & AI/LLM Optimization section

**This skill contains the complete SEO criteria** - other documents reference it.

## Notes

- Focuses exclusively on Phase 5 (SEO optimization)
- Auto-fixes are safe and follow SEO best practices
- Keyword analysis respects natural language
- Avoids keyword stuffing recommendations
- Prioritizes user value over pure SEO metrics
- Reports include projected score improvements
- Compatible with Google and AI/LLM search
