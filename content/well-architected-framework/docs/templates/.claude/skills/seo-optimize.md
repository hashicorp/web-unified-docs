# SEO Optimize Skill

Fast SEO-focused review based on AGENTS.md Phase 5 criteria. Optimizes meta descriptions, titles, headings, and link descriptions for search engines and AI/LLM retrieval.

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

Summary
=======

Auto-fixable Issues: 6
Manual Review Needed: 3
SEO Score: 7/10 → Projected 9/10 after fixes

Priority Improvements:
1. ✓ Optimize meta description (adds 15 chars, keywords)
2. ✓ Enhance link descriptions (3 links)
3. ✓ Improve generic headings (2 headings)
4. ⚠️ Add strategic internal links (3 links)
5. ⚠️ Strengthen first paragraph keyword placement

Run with --fix to apply 6 automatic improvements.
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

**7-8/10 - Good**
- Meta description acceptable length
- Title mostly optimized
- Some keyword placement
- Most links descriptive
- Adequate internal linking (5-7 links)

**5-6/10 - Needs Improvement**
- Meta description too short/long
- Generic title
- Limited keyword placement
- Some generic links
- Sparse internal linking (3-4 links)

**3-4/10 - Poor**
- Missing or very short meta description
- No title optimization
- No keyword strategy
- Many generic links
- Minimal internal linking (0-2 links)

**1-2/10 - Critical**
- No meta description
- No clear title
- No keyword usage
- No internal links
- Poor structure

## When to Use This Skill

Use `/seo-optimize` when:
- ✅ Publishing new documentation (pre-release SEO check)
- ✅ Running SEO improvement sprints
- ✅ Meta descriptions need optimization
- ✅ Improving search rankings
- ✅ Enhancing AI/LLM discoverability
- ✅ After content rewrites
- ✅ Monthly SEO audits

Don't use `/seo-optimize` when:
- ❌ Need comprehensive review (use `/review` instead)
- ❌ Need style checking (use `/check-style`)
- ❌ Need technical accuracy validation (use `/review --phases 2`)

## Performance

Typical execution times:
- Single file: ~2-3 minutes
- 5 files: ~10-15 minutes
- 20 files: ~40-60 minutes

Faster than full `/review` but more comprehensive than `/check-style`.

## Reference Files

This skill uses:
- **`AGENTS.md`** - SEO & AI/LLM optimization section
- **`REVIEW_PHASES.md`** - Phase 5 criteria

## Notes

- Focuses exclusively on Phase 5 (SEO optimization)
- Auto-fixes are safe and follow SEO best practices
- Keyword analysis respects natural language
- Avoids keyword stuffing recommendations
- Prioritizes user value over pure SEO metrics
- Reports include projected score improvements
- Compatible with Google and AI/LLM search
