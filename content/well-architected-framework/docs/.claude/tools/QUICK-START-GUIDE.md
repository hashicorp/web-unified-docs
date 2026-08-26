# Document Health Dashboard - Quick Start Guide

## What is the Health Dashboard?

The Document Health Dashboard provides an at-a-glance assessment of WAF documentation quality across four dimensions:

- 🏗️ **Structure** - Frontmatter, sections, headings, lists
- 📝 **Content** - Word count, examples, resources, persona balance
- ✍️ **Style** - Voice, pronouns, language, word choice
- 🔗 **Links** - Internal, external, formatting, descriptions

## How to Use

### Analyze a Single Document

```bash
node /path/to/health-dashboard.js docs/your-document.mdx
```

**Output:** Detailed health report with:
- Category scores (Structure, Content, Style, Links)
- Specific issues found with line numbers
- Priority fixes ranked by importance
- Overall health score (0-10)
- Next steps recommendation

### Analyze Multiple Documents

```bash
node /path/to/batch-health-analysis.js docs/section-directory
```

**Output:** Summary statistics including:
- Distribution by health status
- Category averages
- Common issues across all documents
- Top performers and documents needing attention
- Content and link metrics
- Actionable recommendations

### JSON Output for Automation

```bash
node /path/to/health-dashboard.js docs/document.mdx --format json
```

Use JSON output to:
- Track trends over time
- Build custom reports
- Integrate with CI/CD pipelines
- Filter and analyze programmatically

## Understanding Health Scores

### Overall Status

- 🟢 **Excellent (9-10):** Ready for publication, minor polish only
- 🟢 **Good (7-8.9):** Minor improvements needed
- 🟡 **Needs Attention (5-6.9):** Several issues to address
- 🔴 **Critical (<5):** Major revision required

### Category Weighting

| Category | Weight | What It Measures |
|----------|--------|------------------|
| Structure | 25% | Document organization and completeness |
| Content | 30% | Depth, examples, resources, audience balance |
| Style | 25% | Writing quality and consistency |
| Links | 20% | Cross-referencing and navigation |

### What Gets Checked

**Structure (25%):**
- Frontmatter present and complete (title, description)
- Required sections (Introduction, Why, Resources, Next steps)
- Heading hierarchy (proper nesting, sentence case)
- List formatting (proper introductions)

**Content (30%):**
- Word count (target: 700-1,200 words)
- Code examples (presence and completeness)
- Resource links (target: 8-12 HashiCorp links)
- Persona balance (decision-maker + implementer content)

**Style (25%):**
- Voice consistency (second-person "you", present tense)
- Vague pronouns (sentences starting with This/That/It)
- Promotional language (marketing terms)
- Word choice (avoid "please", "simply", "just")

**Links (20%):**
- Internal links (relative paths, proper formatting)
- External links (functional, HTTPS)
- Link descriptions (verbs outside brackets)
- HashiCorp resources formatting

## Common Issues and Fixes

### 🔴 High Priority

**Missing Required Sections** (80 docs affected)
- Add "Why [topic]" section with 3-4 business challenges
- Add "HashiCorp resources" section with 8-12 links
- Add "Next steps" section with clear learning paths

**Insufficient Resources** (88 docs affected)
- Research relevant HashiCorp documentation
- Group by: Get started, Core concepts, Advanced features
- Use action verbs: Learn, Read, Get, Understand

### 🟡 Medium Priority

**Low Word Count** (50 docs affected)
- Add implementation details
- Expand on use cases and trade-offs
- Add code examples where appropriate
- Target: 700-900 words minimum

**Persona Imbalance** (94 docs affected)
- Ensure decision-maker content (Why sections, business value)
- Ensure implementer content (examples, resources, how-to)
- Balance: ~40% decision-maker, ~60% implementer

### 🟢 Low Priority

**Vague Pronouns** (34 docs affected)
- Replace "This improves..." with specific subject
- Replace "It enables..." with specific subject
- Replace "That provides..." with specific subject

**Heading Capitalization** (48 docs affected)
- Convert "Version Control Best Practices" to "Version control best practices"
- Keep first word and proper nouns capitalized only

## Workflow Integration

### Before Starting Work

```bash
# Check current health
node health-dashboard.js docs/document.mdx

# If score < 7, fix priority issues first
# If score >= 7, proceed to full review
```

### During Development

```bash
# Check specific category
# Structure issues: Add missing sections
# Content issues: Expand content, add examples
# Style issues: Run /check-hashicorp-style --fix
# Link issues: Verify paths, fix formatting
```

### Before Committing

```bash
# Final health check
node health-dashboard.js docs/document.mdx

# Verify score improved
# Commit if score >= 7.0
```

### Monthly Review

```bash
# Batch analysis to track trends
node batch-health-analysis.js docs/ --detailed > monthly-report.txt

# Compare to previous month
# Identify patterns in issues
# Prioritize systemic improvements
```

## Integration with Claude Skills

The health dashboard complements existing skills:

| Skill | When to Use | Health Dashboard Role |
|-------|-------------|----------------------|
| `/doc-health-dashboard` | Quick overview | Initial assessment |
| `/check-quality-metrics` | Quantitative only | Content metrics |
| `/review-doc` | Deep analysis | Use after score >= 7 |
| `/check-structure` | Structure only | Structure deep dive |
| `/check-hashicorp-style` | Style guide | Style validation |
| `/add-resources` | Enhance resources | Fix resource gaps |

**Best Practice:** Run health dashboard first to identify issues, then use specialized skills for deeper analysis or fixes.

## Interpreting Results

### Green Indicators (✅, 🟢)

Continue current approach. These areas meet or exceed standards.

### Yellow Indicators (⚠️, 🟡)

Minor issues that should be addressed but don't block publication.

### Red Indicators (✗, 🔴)

Critical issues requiring immediate attention before review or publication.

## Example Workflow

### Document Scoring 6.5/10

1. **Check dashboard output** for priority fixes
2. **Address high-priority issues first:**
   - Add missing "Why" section (15 minutes)
   - Add 5+ resource links (20 minutes)
   - Fix vague pronouns if present (10 minutes)
3. **Re-run dashboard** to verify improvements
4. **If score now 7.0+**, proceed to full review with `/review-doc`
5. **If score still < 7.0**, address remaining medium-priority issues

### Document Scoring 8.5/10

1. **Check dashboard output** for minor improvements
2. **Address low-priority style issues:**
   - Run `/check-hashicorp-style --fix` for automation
   - Manual fixes for remaining issues
3. **Proceed directly to full review** with `/review-doc`

## Tips for Best Results

1. **Run early and often** - Check health during drafting, not just at the end
2. **Focus on red indicators** - Address critical issues first
3. **Use JSON for tracking** - Monitor improvement trends over time
4. **Compare with top performers** - Learn from high-scoring documents
5. **Batch similar fixes** - More efficient than one-by-one

## Limitations

The health dashboard is a tool for **objective measurement**, not subjective quality:

- ✅ **Detects:** Missing sections, low word count, style violations
- ❌ **Doesn't detect:** Technical accuracy, clarity, workflow logic
- ✅ **Quantifies:** Resource count, link density, word count
- ❌ **Doesn't quantify:** Content usefulness, example relevance

**Always combine** dashboard results with manual review for complete assessment.

## Getting Help

- **Dashboard issues:** Check script output for error messages
- **Interpretation questions:** Review WAF-DOCUMENTATION-HEALTH-REPORT.md
- **False positives:** Some heuristics may flag non-issues; use judgment
- **Feature requests:** Document in skill feedback

## Next Steps

1. Run batch analysis on your documentation section
2. Review summary statistics and common issues
3. Prioritize high-impact, low-effort fixes
4. Track improvements with monthly dashboard runs
5. Share insights with documentation team
