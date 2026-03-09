---
skill: check-quality-metrics
description: Measure document completeness and quality metrics against WAF standards
dependencies:
  - AGENTS.md
  - templates/REVIEW_PHASES.md
---

# Check Quality Metrics Skill

Provides instant feedback on document completeness by measuring key quality indicators against WAF standards.

## Purpose

Helps writers quickly assess if a document meets minimum quality thresholds before running full reviews. Focuses on measurable metrics rather than subjective quality.

## What It Checks

### 1. Word Count
- **Target:** 700-1,200 words for comprehensive coverage
- **Minimum:** 500 words (below this indicates insufficient depth)
- **Maximum:** 1,500 words (above this may need splitting)

### 2. Code Examples
- **Implementation guides:** 1-2 complete, realistic examples required
- **Concept documents:** 0-1 examples (optional)
- **Overview documents:** 0-1 examples (optional)
- **Quality check:** Examples must show complete workflows (input → processing → output)

### 3. Resource Links
- **Minimum:** 5 HashiCorp resource links
- **Target:** 8-12 links for multi-tool documents
- **Quality check:** Links must be specific (not generic dashboards)

### 4. Persona Coverage
- **Decision-maker indicators:**
  - "Why [topic]" section present
  - Business value statements
  - Strategic guidance
  
- **Implementer indicators:**
  - Code examples (when appropriate)
  - Resource links to tutorials/docs
  - How-to guidance

### 5. Document Structure
- **Required sections:**
  - Frontmatter (title, description)
  - Introduction (2-3 paragraphs)
  - "Why [topic]" section
  - Implementation guidance
  - HashiCorp resources section
  
- **Optional sections:**
  - External resources
  - Next steps

## Usage

```bash
# Check single document
/check-quality-metrics docs/path/to/document.mdx

# Check multiple documents
/check-quality-metrics docs/section/*.mdx

# Get detailed breakdown
/check-quality-metrics docs/document.mdx --verbose
```

## Output Format

```
Quality Metrics Report: document-name.mdx
==========================================

📊 WORD COUNT: 847 words ✅
   Target: 700-1,200 | Status: Within range

📝 CODE EXAMPLES: 2 examples ✅
   Type: Implementation guide
   Required: 1-2 | Status: Meets requirement
   Quality: Complete workflows shown

🔗 RESOURCE LINKS: 9 links ✅
   HashiCorp resources: 9
   External resources: 2
   Target: 8-12 | Status: Good coverage

👥 PERSONA COVERAGE: Balanced ✅
   Decision-maker: 45% (Why section, business value)
   Implementer: 55% (examples, resources, how-to)
   Status: Both personas well-served

📋 DOCUMENT STRUCTURE: Complete ✅
   ✅ Frontmatter present
   ✅ Introduction (2 paragraphs)
   ✅ "Why [topic]" section
   ✅ Implementation guidance
   ✅ HashiCorp resources section

==========================================
OVERALL QUALITY SCORE: 9/10 ✅

✅ PASS - Document meets quality thresholds
   Ready for full review with /review-doc
```

## Quality Score Calculation

| Metric | Weight | Scoring |
|--------|--------|---------|
| Word count | 20% | Within 700-1,200: 100%, 500-700 or 1,200-1,500: 70%, <500 or >1,500: 40% |
| Code examples | 25% | Meets requirement: 100%, Partial: 50%, Missing: 0% |
| Resource links | 20% | 8-12 links: 100%, 5-7: 80%, 3-4: 50%, <3: 20% |
| Persona coverage | 20% | Both served: 100%, One served: 60%, Neither: 20% |
| Structure | 15% | All required: 100%, Missing 1: 80%, Missing 2+: 50% |

**Pass threshold:** 7/10 or higher

## Red Flags

The skill automatically flags these critical issues:

- 🚨 **Word count < 400:** Document likely too shallow
- 🚨 **No code examples in implementation guide:** Implementers can't visualize
- 🚨 **< 3 resource links:** Insufficient implementation guidance
- 🚨 **No "Why" section:** Decision-makers lack strategic context
- 🚨 **Missing frontmatter:** SEO and navigation broken

## Integration with Review Workflow

```bash
# Step 1: Quick quality check
/check-quality-metrics docs/new-document.mdx

# If score < 7/10, address gaps before full review
# If score >= 7/10, proceed to full review

# Step 2: Full review
/review-doc docs/new-document.mdx
```

## Examples

### Example 1: High-Quality Document
```
Quality Score: 9/10 ✅
- 1,050 words (target range)
- 2 complete code examples
- 10 resource links
- Both personas served
- All required sections present

Action: Ready for full review
```

### Example 2: Needs Improvement
```
Quality Score: 5/10 ⚠️
- 380 words (too short)
- 0 code examples (implementation guide)
- 3 resource links (insufficient)
- Only decision-maker served
- Missing "Why" section

Action: Address gaps before review
- Add 300-400 words of implementation guidance
- Add 1-2 code examples
- Add 5+ resource links
- Add "Why" section
```

### Example 3: Over-Detailed
```
Quality Score: 7/10 ⚠️
- 1,850 words (too long)
- 5 code examples (excessive)
- 15 resource links (good)
- Both personas served
- All sections present

Action: Consider splitting into 2 documents
- Current doc: High-level overview + 1-2 examples
- New doc: Advanced patterns + additional examples
```

## Comparison with /review-doc

| Feature | /check-quality-metrics | /review-doc |
|---------|----------------------|-------------|
| Speed | Fast (< 30 seconds) | Slower (2-5 minutes) |
| Focus | Measurable metrics | Comprehensive quality |
| When to use | Before writing/during drafting | After content complete |
| Output | Pass/fail + metrics | Detailed findings + fixes |
| Auto-fix | No | Yes (with --fix flag) |

## Best Practices

1. **Run early and often** - Check metrics while drafting, not just at the end
2. **Use as a checklist** - Ensure all metrics pass before requesting review
3. **Don't game the metrics** - Quality matters more than hitting exact numbers
4. **Context matters** - Overview docs naturally have fewer examples than implementation guides

## Related Skills

- `/review-doc` - Comprehensive 7-phase review
- `/check-structure` - Document structure patterns
- `/check-code-examples` - Code example quality
- `/check-resources` - Resource section formatting
- `/check-personas` - Detailed persona coverage analysis (coming soon)