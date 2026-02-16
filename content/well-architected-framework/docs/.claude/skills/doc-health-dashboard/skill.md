---
name: doc-health-dashboard
description: Generate comprehensive health dashboard showing structure, content, style, and link health with visual indicators
argument-hint: <file-paths> [--format text|json]
disable-model-invocation: true
---

# Document Health Dashboard Skill

Generates a comprehensive health dashboard for WAF documents showing structure, content, style, and link health with visual traffic light indicators.

## Purpose

Provides an at-a-glance view of document health across multiple quality dimensions. Helps writers quickly identify critical issues and prioritize fixes.

## Usage

```bash
# Single document dashboard
/doc-health-dashboard docs/path/to/document.mdx

# Multiple documents comparison
/doc-health-dashboard docs/section/*.mdx

# JSON output for automation
/doc-health-dashboard docs/document.mdx --format json
```

## What It Checks

### 1. Structure Health 🏗️

**Frontmatter:**
- ✅ Title present and descriptive
- ✅ Description present (150-160 characters for SEO)
- ✅ Valid YAML syntax

**Required Sections:**
- ✅ Introduction (2-3 paragraphs)
- ✅ "Why [topic]" section with 3-4 challenges
- ✅ Implementation guidance
- ✅ HashiCorp resources section
- ✅ Next steps section

**Heading Hierarchy:**
- ✅ Proper nesting (no skipped levels)
- ✅ Sentence case formatting
- ✅ Descriptive headings

**List Formatting:**
- ✅ "the following" before lists
- ✅ Ordered lists use "1." for all items
- ✅ Consistent bullet style

### 2. Content Health 📝

**Word Count:**
- 🟢 700-1,200 words (target range)
- 🟡 500-700 or 1,200-1,500 words (acceptable)
- 🔴 <500 or >1,500 words (needs attention)

**Code Examples:**
- ✅ Present when appropriate (implementation guides)
- ✅ Complete workflows shown (input → output)
- ✅ Realistic examples (not empty templates)
- ✅ Code summaries explain what/why

**Resource Links:**
- 🟢 8-12 HashiCorp resource links
- 🟡 5-7 links (minimum met)
- 🔴 <5 links (insufficient)

**Persona Coverage:**
- ✅ Decision-maker content (Why section, business value)
- ✅ Implementer content (examples, resources, how-to)
- ✅ Balanced coverage (both personas served)

### 3. Style Health ✍️

**Voice Consistency:**
- ✅ Second-person "you" throughout
- ✅ Present tense
- ✅ Active voice preferred

**Vague Pronouns:**
- 🔴 Sentences starting with "This", "That", "It"
- ✅ Explicit subjects at sentence start

**Promotional Language:**
- 🔴 "Breathtaking", "exceptional value", marketing terms
- ✅ Technical, objective language

**Conjunction Overuse:**
- 🔴 Excessive "moreover", "furthermore", "additionally"
- ✅ Direct, clear statements

**Word Choice:**
- 🔴 "Please", "simply", "just", "easy"
- ✅ Precise technical terms

### 4. Link Health 🔗

**Internal Links:**
- ✅ Use relative paths
- ✅ Point to existing documents
- ✅ Descriptive link text

**Link Descriptions:**
- ✅ Verbs outside brackets
- ✅ Context in sentence (no dashes after links)
- ✅ Specific, actionable descriptions

**External Links:**
- ✅ Functional (not 404)
- ✅ HTTPS where available
- ✅ Relevant and current

**HashiCorp Resources:**
- ✅ Proper section formatting
- ✅ Grouped by tool/purpose when appropriate
- ✅ Action verbs (Learn, Read, Get started)

## Output Format

### Text Format (Default)

```
Document Health Dashboard: modules.mdx
======================================

🏗️  STRUCTURE HEALTH: 🟢 GOOD (9/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Frontmatter
   ✓ Title: "Terraform modules"
   ✓ Description: 158 characters (optimal for SEO)

✅ Required Sections
   ✓ Introduction (3 paragraphs)
   ✓ "Why use modules" section (4 challenges)
   ✓ Implementation guidance
   ✓ HashiCorp resources (9 links)
   ✓ Next steps

🟡 Heading Hierarchy
   ⚠️ Line 89: Title Case detected
      "## Version Control Best Practices"
      → "## Version control best practices"

✅ List Formatting
   ✓ All lists have "the following" introductions
   ✓ Ordered lists use "1." format

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 CONTENT HEALTH: 🟢 EXCELLENT (10/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🟢 Word Count: 1,047 words
   Target: 700-1,200 | Status: Within range

🟢 Code Examples: 2 examples
   ✓ Complete Terraform module example (lines 67-89)
   ✓ Module usage example (lines 134-156)
   ✓ Both include summaries explaining output

🟢 Resource Links: 9 HashiCorp resources
   ✓ Get started section (2 links)
   ✓ Core concepts (3 links)
   ✓ Advanced features (4 links)

🟢 Persona Coverage: Balanced
   ✓ Decision-maker: 40% (Why section, strategic value)
   ✓ Implementer: 60% (examples, resources, how-to)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✍️  STYLE HEALTH: 🟡 NEEDS ATTENTION (7/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Voice Consistency
   ✓ Second-person "you" throughout
   ✓ Present tense maintained

🔴 Vague Pronouns (3 issues)
   Line 56: "This improves security across environments."
   → "Module versioning improves security..."
   
   Line 98: "It enables rollbacks to previous versions."
   → "Immutable modules enable rollbacks..."
   
   Line 145: "This approach eliminates drift."
   → "Using data sources eliminates drift..."

✅ Promotional Language
   ✓ No marketing terms detected

🟡 Conjunction Overuse (2 instances)
   Line 78: "Moreover, modules reduce..."
   → "Modules reduce..."
   
   Line 123: "Furthermore, versioning enables..."
   → "Versioning enables..."

✅ Word Choice
   ✓ No problematic words ("please", "simply", "just")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 LINK HEALTH: 🟢 GOOD (9/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Internal Links (12 links)
   ✓ All use relative paths
   ✓ All point to existing documents
   ✓ Descriptive link text

🟡 Link Descriptions (1 issue)
   Line 189: Verb inside brackets
   ❌ "[Learn about Terraform state]"
   ✅ "Learn about [Terraform state]"

✅ External Links (3 links)
   ✓ All functional (200 OK)
   ✓ All use HTTPS

✅ HashiCorp Resources Section
   ✓ Proper formatting with action verbs
   ✓ Grouped by learning level
   ✓ Specific, actionable descriptions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 OVERALL HEALTH SCORE: 🟢 8.75/10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: GOOD - Minor improvements needed

Priority Fixes:
1. 🔴 Fix 3 vague pronoun issues (lines 56, 98, 145)
2. 🟡 Fix 1 heading capitalization (line 89)
3. 🟡 Remove 2 conjunction instances (lines 78, 123)
4. 🟡 Fix 1 link description (line 189)

Quick Wins (5 minutes):
- Run /check-hashicorp-style --fix for automated fixes
- Manually update vague pronouns

Ready for: Full review with /review-doc
```

### JSON Format

```json
{
  "document": "docs/modules.mdx",
  "timestamp": "2026-01-29T04:30:00Z",
  "overall_score": 8.75,
  "status": "good",
  "health_categories": {
    "structure": {
      "score": 9.0,
      "status": "good",
      "checks": {
        "frontmatter": {"status": "pass", "issues": []},
        "required_sections": {"status": "pass", "issues": []},
        "heading_hierarchy": {
          "status": "warning",
          "issues": [
            {
              "line": 89,
              "severity": "minor",
              "message": "Title Case detected",
              "current": "## Version Control Best Practices",
              "suggested": "## Version control best practices"
            }
          ]
        },
        "list_formatting": {"status": "pass", "issues": []}
      }
    },
    "content": {
      "score": 10.0,
      "status": "excellent",
      "metrics": {
        "word_count": 1047,
        "code_examples": 2,
        "resource_links": 9,
        "persona_balance": "balanced"
      }
    },
    "style": {
      "score": 7.0,
      "status": "needs_attention",
      "issues": [
        {
          "type": "vague_pronouns",
          "count": 3,
          "severity": "critical",
          "lines": [56, 98, 145]
        },
        {
          "type": "conjunction_overuse",
          "count": 2,
          "severity": "minor",
          "lines": [78, 123]
        }
      ]
    },
    "links": {
      "score": 9.0,
      "status": "good",
      "metrics": {
        "internal_links": 12,
        "external_links": 3,
        "broken_links": 0
      },
      "issues": [
        {
          "line": 189,
          "severity": "minor",
          "message": "Verb inside brackets"
        }
      ]
    }
  },
  "priority_fixes": [
    {
      "priority": "high",
      "category": "style",
      "issue": "vague_pronouns",
      "count": 3,
      "auto_fixable": false
    },
    {
      "priority": "medium",
      "category": "structure",
      "issue": "heading_capitalization",
      "count": 1,
      "auto_fixable": true
    }
  ],
  "quick_wins": [
    "Run /check-hashicorp-style --fix",
    "Manually update vague pronouns"
  ],
  "next_steps": "Ready for full review with /review-doc"
}
```

## Health Score Calculation

| Category | Weight | Scoring |
|----------|--------|---------|
| Structure | 25% | Frontmatter + sections + headings + lists |
| Content | 30% | Word count + examples + resources + personas |
| Style | 25% | Voice + pronouns + language + word choice |
| Links | 20% | Internal + external + descriptions + formatting |

**Status Levels:**
- 🟢 **Excellent** (9-10): Ready for publication
- 🟢 **Good** (7-8.9): Minor improvements needed
- 🟡 **Needs Attention** (5-6.9): Several issues to address
- 🔴 **Critical** (<5): Major revision required

## Visual Indicators

- 🟢 **Green**: Passes all checks
- 🟡 **Yellow**: Minor issues, still acceptable
- 🔴 **Red**: Critical issues requiring immediate attention
- ✅ **Check**: Individual check passed
- ⚠️ **Warning**: Issue detected
- 🔴 **X**: Critical failure

## Integration with Other Skills

**Quick health check before review:**
```bash
# 1. Health dashboard
/doc-health-dashboard docs/document.mdx

# 2. If score >= 7, proceed to full review
/review-doc docs/document.mdx

# 3. If score < 7, fix priority issues first
/check-hashicorp-style docs/document.mdx --fix
```

**Batch health monitoring:**
```bash
# Check all documents in section
/doc-health-dashboard docs/section/*.mdx --format json > health-report.json

# Identify documents needing attention
# (filter JSON for status: "needs_attention" or "critical")
```

**Before committing:**
```bash
/doc-health-dashboard docs/modified-file.mdx
```

## Comparison with Other Skills

| Skill | Focus | Speed | Detail Level |
|-------|-------|-------|--------------|
| /doc-health-dashboard | Overall health | Fast | High-level overview |
| /check-quality-metrics | Measurable metrics | Fast | Quantitative only |
| /review-doc | Comprehensive review | Slow | Deep analysis |
| /check-structure | Structure patterns | Fast | Structure only |
| /check-hashicorp-style | Style guide | Medium | Style only |

## When to Use This Skill

Use `/doc-health-dashboard` when:
- ✅ Need quick overview of document quality
- ✅ Prioritizing which documents to review
- ✅ Monitoring documentation health over time
- ✅ Identifying critical issues before detailed review
- ✅ Comparing health across multiple documents
- ✅ Reporting documentation status to stakeholders

Don't use when:
- ❌ Need detailed fix recommendations (use `/review-doc`)
- ❌ Need only structure checks (use `/check-structure`)
- ❌ Need only style checks (use `/check-hashicorp-style`)
- ❌ Need technical accuracy review (use `/review-doc --phases 2`)

## Best Practices

1. **Run early and often** - Check health during drafting, not just at the end
2. **Focus on red indicators** - Address critical issues first
3. **Use JSON for automation** - Track health metrics over time
4. **Compare similar documents** - Identify patterns in issues
5. **Set health thresholds** - Require minimum score before review

## Reference

This skill validates against:
- **AGENTS.md** - Writing standards, document patterns, persona definitions
- **templates/styleguide.md** - HashiCorp style guide (voice, tense, word choice)
- **templates/REVIEW_PHASES.md** - Phase-based review criteria

## Notes

- Dashboard provides overview, not detailed fixes
- Some issues require manual review (vague pronouns, workflow connections)
- Health score is indicative, not absolute
- Use in combination with other skills for complete validation
- JSON output enables tracking health trends over time