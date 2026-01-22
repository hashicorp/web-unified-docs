# Compare Docs Skill

Side-by-side quality comparison of documentation files. Highlights differences, identifies gaps, and provides actionable recommendations to match baseline quality.

## Usage

```bash
/compare-docs <doc1> <doc2> [options]
```

## Arguments

- **doc1**: First `.mdx` file to compare (required)
  - Example: `/compare-docs docs/modules.mdx docs/workflows.mdx`

- **doc2**: Second `.mdx` file to compare (required)

- **--baseline**: Specify which document is the quality baseline (optional)
  - Values: `1` (first doc), `2` (second doc), `auto` (default)
  - Auto selects higher-quality document as baseline
  - Example: `--baseline 2`

- **--focus**: Specific comparison aspects (optional)
  - Values: `structure`, `content`, `resources`, `style`, `examples`, `all` (default)
  - Example: `--focus resources`

- **--detailed** or **-d**: Include detailed comparison data (optional)
  - Shows line-by-line differences
  - Includes code example comparisons

## What This Skill Does

This skill performs comprehensive quality comparison between two documents, identifying strengths and gaps.

### Comparison Process

1. **Quality Scoring**
   - Runs review on both documents
   - Generates quality scores (1-10)
   - Identifies baseline (higher quality)
   - Calculates score gap

2. **Structural Comparison**
   - Document length
   - Section count
   - Heading hierarchy
   - Content organization

3. **Content Quality Analysis**
   - Code examples count and quality
   - Resource links count and balance
   - Cross-references
   - Why section format

4. **Style Consistency**
   - Meta description quality
   - Voice and tone
   - Formatting patterns
   - Link descriptions

5. **Gap Identification**
   - Missing sections
   - Insufficient examples
   - Under-developed content
   - SEO weaknesses

6. **Actionable Recommendations**
   - Specific improvements to match baseline
   - Prioritized by impact
   - Quantified gaps (e.g., "add 3 more links")

## Examples

### Basic comparison
```bash
/compare-docs docs/modules.mdx docs/workflows.mdx
```
Compares both documents, auto-selects baseline.

### Specify baseline
```bash
/compare-docs docs/new-doc.mdx docs/gold-standard.mdx --baseline 2
```
Compares new-doc against gold-standard baseline.

### Focus on resources
```bash
/compare-docs docs/file1.mdx docs/file2.mdx --focus resources
```
Compares only resource sections.

### Detailed comparison
```bash
/compare-docs docs/draft.mdx docs/published.mdx --detailed
```
Includes line-by-line differences.

### Compare structure only
```bash
/compare-docs docs/doc1.mdx docs/doc2.mdx --focus structure
```
Compares document organization and hierarchy.

## Output Format

```
Document Quality Comparison
============================

Doc 1: docs/modules.mdx
Doc 2: docs/workflows.mdx

Baseline: workflows.mdx (automatically selected - higher quality)
Comparison Focus: All aspects

---

Overall Quality Scores
======================

modules.mdx:    7/10 ⚠️ (needs improvement)
workflows.mdx:  9/10 ⭐ (baseline)

Gap: 2 points

---

Structural Comparison
=====================

                        modules.mdx    workflows.mdx    Difference
                        -----------    -------------    ----------
Document length         2,845 words    3,512 words      -667 words ⚠️
Sections                6              8                -2 sections ⚠️
Code examples           3              5                -2 examples ⚠️
Subsections (H3)        12             15               -3 ⚠️
Heading depth           3 levels       3 levels         ✅ Equal

Assessment:
⚠️ modules.mdx is 23% shorter than baseline
⚠️ Missing 2 major sections compared to baseline
⚠️ Fewer code examples (3 vs 5)

---

Content Quality Analysis
========================

Why Section
-----------
modules.mdx:  ✅ Proper **Bold challenge:** format (3 challenges)
workflows.mdx: ✅ Proper **Bold challenge:** format (4 challenges)

Difference: workflows.mdx has 1 additional challenge
💡 Recommendation: Add 1 more challenge to modules.mdx (team collaboration or scalability)

Code Examples
-------------
modules.mdx:  3 examples (all with summaries ✅)
workflows.mdx: 5 examples (all with summaries ✅)

Difference: modules.mdx missing 2 examples
💡 Missing in modules.mdx:
   - Module testing example (workflows has this)
   - CI/CD integration example (workflows has this)

Resource Links
--------------
modules.mdx:  5 links (minimum met ✅)
  - Beginner: 2 (40%)
  - Intermediate: 2 (40%)
  - Advanced: 1 (20%)

workflows.mdx: 8 links (strong ⭐)
  - Beginner: 3 (38%)
  - Intermediate: 4 (50%)
  - Advanced: 1 (12%)

Difference: workflows.mdx has 3 additional links
💡 Recommendation: Add 3 resource links to modules.mdx
   Suggested level: intermediate (to match balance)

Cross-References
----------------
modules.mdx:  3 internal links
workflows.mdx: 6 internal links

Difference: modules.mdx has fewer internal connections
💡 Missing cross-references in modules.mdx:
   - Should link to "standardize-workflows.mdx"
   - Should link to "development-environment.mdx"
   - Should link to "centralize-packages.mdx"

---

Style and Formatting
====================

Meta Description
----------------
modules.mdx (142 chars):  ⚠️ Too short
  "Learn about infrastructure modules and reusable code patterns."

workflows.mdx (158 chars): ✅ Optimal length
  "Explore workflow automation patterns to standardize infrastructure deployment, improve team collaboration, and accelerate delivery cycles."

Difference: modules.mdx needs 16+ more characters
💡 Add keywords: "terraform", "teams", "consistency"

Voice and Tone
--------------
modules.mdx:  ✅ Second-person, active voice
workflows.mdx: ✅ Second-person, active voice

Both documents: Consistent ✅

Link Descriptions
-----------------
modules.mdx:  4/5 links properly formatted (80%)
  - 1 generic "learn more" phrase ⚠️

workflows.mdx: 8/8 links properly formatted (100%) ⭐

Difference: modules.mdx has 1 generic link
💡 Fix line 67: Change "learn more" to specific action verb

---

SEO Comparison
==============

                        modules.mdx    workflows.mdx
                        -----------    -------------
Meta description        142 chars ⚠️   158 chars ✅
Primary keyword         In title ✅    In title ✅
Keyword in H1           Yes ✅         Yes ✅
Keyword in first 100w   No ⚠️          Yes ✅
Heading optimization    Generic ⚠️     Specific ✅
Internal links          3 ⚠️           6 ✅

Assessment: workflows.mdx has stronger SEO
💡 Priority fixes for modules.mdx:
   1. Add primary keyword to first paragraph
   2. Make headings more specific
   3. Add 3 more internal links

---

What workflows.mdx Has That modules.mdx Doesn't
================================================

1. ❌ Workflow templates section
   workflows.mdx includes concrete workflow templates
   💡 Add "Module Structure Template" section to modules.mdx

2. ❌ Team collaboration subsection
   workflows.mdx discusses team coordination
   💡 Add subsection on module sharing across teams

3. ❌ Testing strategies
   workflows.mdx includes testing examples
   💡 Add module testing code example

4. ❌ CI/CD integration
   workflows.mdx shows automation integration
   💡 Add example of modules in CI/CD pipelines

5. ❌ Troubleshooting section
   workflows.mdx has common issues/solutions
   💡 Add "Common Module Issues" section

---

What modules.mdx Has That workflows.mdx Doesn't
===============================================

1. ✅ Module versioning details
   modules.mdx provides detailed versioning guidance
   (This is topic-specific - appropriate difference)

2. ✅ Module registry information
   modules.mdx covers private registry setup
   (This is topic-specific - appropriate difference)

---

Prioritized Recommendations
============================

To bring modules.mdx to baseline quality (9/10):

High Impact (Must-Have)
-----------------------
1. Add 2 code examples:
   - Module testing example (~15 lines)
   - CI/CD integration example (~20 lines)

2. Add workflow templates section (~200 words)
   - Provide concrete module structure template
   - Include file organization example

3. Add 3 resource links (intermediate level):
   - Module testing strategies
   - Team collaboration patterns
   - Module registry best practices

4. Expand meta description (+16 chars):
   Add keywords: "terraform", "teams", "consistency"

Medium Impact (Recommended)
---------------------------
5. Add team collaboration subsection (~150 words):
   - Module sharing strategies
   - Version coordination
   - Documentation standards

6. Add 3 internal cross-references:
   - standardize-workflows.mdx
   - development-environment.mdx
   - centralize-packages.mdx

7. Optimize headings (2 generic headings):
   - "Best Practices" → "Module development best practices"
   - "Getting Started" → "Create your first module"

Low Impact (Polish)
-------------------
8. Fix generic link description (line 67):
   "learn more" → "explore module patterns"

9. Add troubleshooting section (~100 words):
   - Common module issues
   - Resolution strategies

---

Summary
=======

To match baseline quality:
- Estimated work: 2-3 hours
- Primary gaps: Examples (2), Content sections (2), Resources (3)
- Quick wins: Fix meta description, optimize headings, add cross-refs
- Biggest impact: Add code examples and workflow templates

Projected score after improvements: 9/10 (matches baseline)

Run these commands to start:
1. /add-resources docs/modules.mdx --min-links 8 --add
2. /seo-optimize docs/modules.mdx --fix
3. /check-style docs/modules.mdx --fix
4. [Manual] Add 2 code examples
5. [Manual] Add workflow templates section
6. /review docs/modules.mdx --phases 1,7
```

## Comparison Aspects

### Structure
- Document organization
- Section hierarchy
- Content flow
- Navigation patterns

### Content
- Code examples count and quality
- Depth of explanation
- Topic coverage
- Completeness

### Resources
- Link count
- Skill level balance
- Internal vs external
- Link quality

### Style
- Voice consistency
- Formatting patterns
- Link descriptions
- Meta descriptions

### Examples
- Code example count
- Example quality
- Language variety
- Context and summaries

## Best Practices

**Baseline selection:**
```bash
# Auto-select higher quality doc as baseline
/compare-docs docs/draft.mdx docs/published.mdx

# Explicitly set gold standard as baseline
/compare-docs docs/new.mdx docs/gold-standard.mdx --baseline 2
```

**Quality improvement workflow:**
```bash
# 1. Compare against best example
/compare-docs docs/improving.mdx docs/excellent.mdx --baseline 2

# 2. Review recommendations
#    (Output saved to /tmp/comparison-report.md)

# 3. Apply quick fixes
/add-resources docs/improving.mdx --add
/seo-optimize docs/improving.mdx --fix
/check-style docs/improving.mdx --fix

# 4. Make manual improvements
#    (Add missing sections, examples)

# 5. Re-compare to verify improvements
/compare-docs docs/improving.mdx docs/excellent.mdx --baseline 2
```

**Section standardization:**
```bash
# Compare all docs to section standard
for doc in docs/section/*.mdx; do
  /compare-docs "$doc" docs/section/gold-standard.mdx --baseline 2
done
```

## Integration with Other Skills

**Complete improvement workflow:**
```bash
# 1. Compare to identify gaps
/compare-docs docs/target.mdx docs/baseline.mdx --baseline 2

# 2. Apply auto-fixes
/add-resources docs/target.mdx --add
/seo-optimize docs/target.mdx --fix
/check-style docs/target.mdx --fix

# 3. Manual improvements
#    (Add content, examples based on comparison)

# 4. Validate improvements
/review docs/target.mdx

# 5. Re-compare to confirm
/compare-docs docs/target.mdx docs/baseline.mdx
```

**Quality benchmarking:**
```bash
# Establish quality baseline
/review docs/best-example.mdx  # Should score 9-10/10

# Compare others to baseline
/compare-docs docs/doc1.mdx docs/best-example.mdx --baseline 2
/compare-docs docs/doc2.mdx docs/best-example.mdx --baseline 2
```

## Quality Metrics Compared

The skill compares these quantitative metrics:

**Document Metrics:**
- Word count
- Section count
- Heading count
- Paragraph count

**Content Metrics:**
- Code examples count
- Resource links count
- Internal cross-references
- External references

**Quality Metrics:**
- Meta description length
- Why section format
- Link description quality
- SEO optimization score

**Structure Metrics:**
- Heading hierarchy depth
- Section balance
- Content organization
- Navigation clarity

## When to Use This Skill

Use `/compare-docs` when:
- ✅ Improving document quality to match standard
- ✅ Establishing quality baselines for section
- ✅ Training on what excellent docs look like
- ✅ Validating improvements made to document
- ✅ Understanding gaps in new documentation
- ✅ Benchmarking documentation quality

Don't use `/compare-docs` when:
- ❌ Comparing completely different topics (apples to oranges)
- ❌ Documents intentionally have different purposes
- ❌ Need comprehensive review (use `/review` instead)
- ❌ Need to compare >2 documents (run multiple comparisons)

## Reference Files

This skill uses:
- **`AGENTS.md`** - Quality criteria and patterns
- **`REVIEW_PHASES.md`** - Review methodology

## Notes

- Comparison is relative, not absolute
- Some differences are topic-appropriate
- Baseline selection affects recommendations
- Reports include quantified gaps (e.g., "add 3 links")
- Focus on actionable improvements
- Scores are based on AGENTS.md standards
- Works best with similar document types
- Detailed mode shows line-by-line diffs
