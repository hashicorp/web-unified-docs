---
name: skill-advisor
description: Context-aware skill recommendation system that suggests the right skill for detected issues and provides usage guidance
argument-hint: <file-paths> [--auto-suggest] [--explain]
---

# Skill Advisor - Context-Aware Skill Recommendations

Intelligent recommendation system that analyzes documents, detects issues, and suggests the most appropriate skills to fix them with usage examples.

## Purpose

Helps users discover and use the right skills at the right time by providing context-aware recommendations based on detected issues, document state, and user goals.

## Usage

```bash
# Analyze document and suggest relevant skills
/skill-advisor docs/file.mdx

# Auto-suggest skills during review
/skill-advisor docs/file.mdx --auto-suggest

# Explain why each skill is recommended
/skill-advisor docs/file.mdx --explain

# Get skill recommendations for specific issue type
/skill-advisor docs/file.mdx --issue-type structure

# Suggest workflow for new document
/skill-advisor docs/new-file.mdx --workflow new-doc

# Suggest workflow for pre-commit
/skill-advisor docs/modified-file.mdx --workflow pre-commit
```

## Arguments

- **file-paths**: One or more `.mdx` files to analyze (required)
- **--auto-suggest** or **-a**: Automatically suggest skills during analysis
- **--explain** or **-e**: Provide detailed explanations for recommendations
- **--issue-type** or **-i**: Filter by issue type (structure, code, resources, style, links)
- **--workflow** or **-w**: Suggest skill workflow (new-doc, pre-commit, review, maintenance)
- **--priority**: Show only high-priority recommendations

## What This Skill Does

### 1. **Issue Detection & Skill Mapping**

Analyzes documents and maps detected issues to appropriate skills:

```
Skill Advisor Analysis: modules.mdx
═══════════════════════════════════

📋 DETECTED ISSUES (8 total)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 Critical Issues (3):

1. Vague Pronouns at Sentence Start (3 instances)
   Lines: 56, 98, 145
   
   Issue: "This improves security...", "It enables rollbacks...", "This approach eliminates..."
   Impact: Reduces clarity and readability
   
   💡 Recommended Skill: /check-structure
   
   Why this skill:
   - Detects vague pronouns automatically
   - Can fix with --fix flag
   - Part of AGENTS.md Phase 4 compliance
   
   Usage:
   /check-structure docs/modules.mdx --fix
   
   Expected Result:
   - Automatically replaces vague pronouns with explicit subjects
   - "This improves" → "Module versioning improves"
   - "It enables" → "Immutable modules enable"
   
   Time to Fix: 2 minutes (automated)
   Priority: HIGH

2. Missing Code Example Summaries (2 instances)
   Lines: 89, 156
   
   Issue: Code blocks lack 1-2 sentence explanations
   Impact: Users don't understand what code does or why
   
   💡 Recommended Skill: /check-code-examples
   
   Why this skill:
   - Validates code example completeness
   - Checks for summaries after code blocks
   - Ensures realistic examples (not empty templates)
   
   Usage:
   /check-code-examples docs/modules.mdx
   
   Expected Result:
   - Identifies missing summaries
   - Suggests summary content based on code
   - Validates example completeness
   
   Time to Fix: 10 minutes (manual content)
   Priority: HIGH

3. Link Description Issues (1 instance)
   Line: 189
   
   Issue: Verb inside link brackets: "[Learn about Terraform state]"
   Impact: Inconsistent formatting, harder to scan
   
   💡 Recommended Skill: /check-resources
   
   Why this skill:
   - Validates link description patterns
   - Can auto-fix with --fix flag
   - Ensures verbs outside brackets
   
   Usage:
   /check-resources docs/modules.mdx --fix
   
   Expected Result:
   - "[Learn about Terraform state]" → "Learn about [Terraform state]"
   - Consistent link formatting throughout
   
   Time to Fix: 1 minute (automated)
   Priority: MEDIUM

🟡 Medium Priority Issues (5):

4. Heading Capitalization (1 instance)
   Line: 89
   
   Issue: Title Case instead of sentence case
   Impact: Style guide non-compliance
   
   💡 Recommended Skill: /check-structure
   
   Usage: /check-structure docs/modules.mdx --fix
   Time to Fix: <1 minute (automated)

5. Conjunction Overuse (2 instances)
   Lines: 78, 123
   
   Issue: "Moreover" and "Furthermore" reduce directness
   Impact: Less clear, more verbose
   
   💡 Recommended Skill: /check-hashicorp-style
   
   Usage: /check-hashicorp-style docs/modules.mdx --fix
   Time to Fix: 1 minute (automated)

6. Persona Balance (1 issue)
   
   Issue: 70% decision-maker, 30% implementer
   Impact: Implementers underserved
   
   💡 Recommended Skill: /persona-coverage
   
   Usage: /persona-coverage docs/modules.mdx --verbose
   Time to Fix: 20 minutes (add implementation content)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 RECOMMENDED ACTION PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Quick Wins (5 minutes):
1. /check-structure docs/modules.mdx --fix
   Fixes: Vague pronouns (3), heading case (1)
   
2. /check-resources docs/modules.mdx --fix
   Fixes: Link descriptions (1)
   
3. /check-hashicorp-style docs/modules.mdx --fix
   Fixes: Conjunctions (2)

Manual Fixes (30 minutes):
4. /check-code-examples docs/modules.mdx
   Review and add summaries (2)
   
5. /persona-coverage docs/modules.mdx
   Add implementer content

Verification (2 minutes):
6. /review-doc docs/modules.mdx --phases 1,4
   Verify all fixes applied correctly

Total Time: ~37 minutes
Automated: 5 minutes (13%)
Manual: 30 minutes (81%)
Verification: 2 minutes (5%)

[Run Quick Wins] [Generate Script] [Start Manual Fixes]
```

### 2. **Workflow-Based Recommendations**

Suggests skill sequences for common workflows:

```
Skill Workflow Recommendation: New Document
═══════════════════════════════════════════

You're creating: docs/secure-systems/new-topic.mdx

📝 RECOMMENDED WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Phase 1: Document Creation (5 minutes)
┌─────────────────────────────────────────────┐
│ /create-doc docs/secure-systems/new-topic.mdx --interactive │
└─────────────────────────────────────────────┘

What it does:
- Creates document from template
- Adds proper frontmatter
- Sets up basic structure
- Prompts for key information

Phase 2: Structure Validation (During Writing)
┌─────────────────────────────────────────────┐
│ /check-structure docs/secure-systems/new-topic.mdx │
└─────────────────────────────────────────────┘

Run this every 15-20 minutes while writing:
- Validates Why section format
- Checks list introductions
- Ensures proper heading case
- Detects vague pronouns

Phase 3: Content Enhancement (After Draft)
┌─────────────────────────────────────────────┐
│ /check-code-examples docs/secure-systems/new-topic.mdx │
│ /add-resources docs/secure-systems/new-topic.mdx │
│ /smart-cross-reference docs/secure-systems/new-topic.mdx │
└─────────────────────────────────────────────┘

What these do:
- Validate code examples are complete
- Add HashiCorp resource links
- Suggest cross-references to related docs

Phase 4: Style Compliance (Before Review)
┌─────────────────────────────────────────────┐
│ /check-hashicorp-style docs/secure-systems/new-topic.mdx --fix │
│ /check-structure docs/secure-systems/new-topic.mdx --fix │
└─────────────────────────────────────────────┘

Auto-fixes:
- Voice and tense issues
- Word choice problems
- Structural formatting

Phase 5: Comprehensive Review (Final Check)
┌─────────────────────────────────────────────┐
│ /review-doc docs/secure-systems/new-topic.mdx --phases 1-7 │
└─────────────────────────────────────────────┘

Complete validation:
- User success (both personas)
- Technical accuracy
- Cross-document relationships
- Style compliance
- SEO optimization
- Link quality

Phase 6: Health Check (Verification)
┌─────────────────────────────────────────────┐
│ /doc-intelligence --view tactical │
└─────────────────────────────────────────────┘

Confirms:
- Document meets quality standards
- No critical issues remain
- Ready for publication

Total Estimated Time: 60-90 minutes
- Creation: 5 min
- Writing: 30-45 min
- Validation: 15-20 min
- Review: 10-15 min

[Generate Script] [Start Workflow] [Customize]
```

### 3. **Smart Suggestions During Review**

Provides real-time skill recommendations:

```
⚠️ Issue Detected: Missing Why Section
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Document: docs/optimize-systems/cost.mdx
Line: N/A (section missing)

Problem:
Document lacks "Why" section with 3-4 challenges in **Bold:** format.
This is required for decision-maker persona coverage.

💡 Recommended Action:

1. Use /check-structure to confirm issue:
   /check-structure docs/optimize-systems/cost.mdx
   
2. Review Why section examples:
   See templates/reference/DOCUMENT_PATTERNS.md
   
3. Add Why section manually:
   - 3-4 challenges in **Bold challenge:** format
   - Each describes business/operational impact
   - Paragraph explaining how topic addresses challenges

4. Verify fix:
   /check-structure docs/optimize-systems/cost.mdx
   
Alternative: Use /create-doc to see template structure

[Show Examples] [Open Template] [Skip]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ Issue Detected: Code Example Incomplete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Document: docs/define-and-automate-processes/packaging.mdx
Line: 67-89

Problem:
Packer template missing provisioners. Shows only source block.
Empty base examples don't help implementers.

💡 Recommended Action:

1. Use /check-code-examples for detailed analysis:
   /check-code-examples docs/define-and-automate-processes/packaging.mdx
   
2. Review Packer example requirements:
   See templates/reference/CODE_PATTERNS.md (Packer section)
   
3. Add provisioners to show:
   - File provisioner (copy application files)
   - Shell provisioner (install dependencies)
   - Post-processor (tag for registry)

4. Add 1-2 sentence summary after code block

5. Verify completeness:
   /check-code-examples docs/define-and-automate-processes/packaging.mdx

[Show Complete Example] [Open Patterns] [Skip]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Good Practice Detected: Excellent Resource Links
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Document: docs/secure-systems/vault-secrets.mdx
Lines: 234-289

What's working well:
- 9 HashiCorp resource links (target: 5-8+)
- Proper organization (beginner → advanced)
- Verbs outside brackets
- Context in sentences (no dashes)
- WAF cross-references first

This is a great example to learn from!

💡 Tip: Use this as reference for other documents

[View Document] [Copy Pattern] [Continue]
```

### 4. **Skill Discovery**

Helps users find skills they didn't know existed:

```
Skill Discovery: You might not know about these skills
═══════════════════════════════════════════════════════

Based on your recent work, you might find these skills useful:

1. 🆕 /doc-intelligence
   What it does: Real-time health dashboard + trend analysis
   When to use: Daily tactical view, weekly strategic review
   
   You haven't used this yet, but it would help you:
   - See all critical issues at a glance
   - Track documentation quality over time
   - Prioritize fixes by impact
   
   Try it: /doc-intelligence --view tactical

2. 🆕 /smart-cross-reference
   What it does: Auto-detect workflow sequences, suggest links
   When to use: Creating new docs, quarterly maintenance
   
   You haven't used this yet, but it would help you:
   - Find missing workflow connections
   - Detect orphaned documents
   - Suggest bidirectional links
   
   Try it: /smart-cross-reference docs/your-section/*.mdx

3. 💡 /persona-coverage
   What it does: Analyze balance between decision-maker/implementer
   When to use: After drafting, before final review
   
   You've used /review-doc but not this focused skill:
   - Faster than full review
   - Detailed persona breakdown
   - Specific recommendations
   
   Try it: /persona-coverage docs/file.mdx --verbose

4. 💡 /content-freshness
   What it does: Track content currency, detect outdated info
   When to use: Quarterly maintenance, after product releases
   
   Great for maintenance work:
   - Detect version-specific references
   - Find broken/redirected links
   - Identify temporal language
   
   Try it: /content-freshness docs/file.mdx --check-links

[Learn More] [Try Suggested Skills] [Dismiss]
```

## Skill Recommendation Logic

### Issue Type → Skill Mapping

| Issue Type | Primary Skill | Secondary Skills | Auto-Fixable |
|------------|---------------|------------------|--------------|
| Missing Why section | `/check-structure` | `/review-doc --phases 1` | Partial |
| Vague pronouns | `/check-structure` | `/check-hashicorp-style` | Yes |
| List introductions | `/check-structure` | - | Yes |
| Heading case | `/check-structure` | - | Yes |
| Code examples incomplete | `/check-code-examples` | `/review-doc --phases 2` | No |
| Code missing summaries | `/check-code-examples` | - | Partial |
| Resource links < 5 | `/check-resources`, `/add-resources` | - | Partial |
| Link formatting | `/check-resources` | - | Yes |
| Verbs in brackets | `/check-resources` | - | Yes |
| Active voice issues | `/check-hashicorp-style` | - | Yes |
| Present tense issues | `/check-hashicorp-style` | - | Yes |
| Word choice (allows/enables) | `/check-hashicorp-style` | - | Yes |
| Abbreviations (TF, TFC) | `/check-hashicorp-style` | - | Yes |
| Persona imbalance | `/persona-coverage` | `/review-doc --phases 1` | No |
| Broken links | `/validate-links`, `/fix-links` | - | Yes |
| Missing cross-references | `/smart-cross-reference` | `/cross-reference` | Partial |
| Orphaned documents | `/smart-cross-reference` | `/doc-intelligence` | No |
| Overall health check | `/doc-intelligence` | `/review-doc` | No |
| Content outdated | `/content-freshness` | - | No |

### Workflow → Skill Sequence Mapping

**New Document:**
1. `/create-doc` (template)
2. `/check-structure` (during writing)
3. `/check-code-examples` (after draft)
4. `/add-resources` (enhancement)
5. `/smart-cross-reference` (connections)
6. `/check-hashicorp-style --fix` (style)
7. `/review-doc --phases 1-7` (final)

**Pre-Commit:**
1. `/check-structure --fix`
2. `/check-hashicorp-style --fix`
3. `/validate-links`

**Full Review:**
1. `/doc-intelligence --view tactical` (overview)
2. `/review-doc --phases 1-7` (comprehensive)
3. `/doc-intelligence --view tactical` (verify)

**Quarterly Maintenance:**
1. `/doc-intelligence --view strategic --period 90d`
2. `/content-freshness docs/**/*.mdx`
3. `/smart-cross-reference docs/**/*.mdx --detect-orphans`
4. `/validate-links docs/**/*.mdx`

## Integration with Other Skills

**Enhances all skills by:**
- Suggesting when to use them
- Explaining why they're relevant
- Providing usage examples
- Showing expected results
- Estimating time to fix

**Works alongside:**
- All validation skills (structure, code, resources, style)
- All review skills (review-doc, persona-coverage, etc.)
- All maintenance skills (fix-links, cross-reference, etc.)

## Output Formats

### Text Format (Default)
Human-readable with visual indicators, action buttons, and explanations

### JSON Format
```bash
/skill-advisor docs/file.mdx --format json
```

```json
{
  "document": "docs/modules.mdx",
  "analysis_date": "2026-01-29T04:47:00Z",
  "issues_detected": 8,
  "recommendations": [
    {
      "issue_type": "vague_pronouns",
      "severity": "critical",
      "count": 3,
      "lines": [56, 98, 145],
      "recommended_skill": "/check-structure",
      "usage": "/check-structure docs/modules.mdx --fix",
      "auto_fixable": true,
      "estimated_time_minutes": 2,
      "priority": "high",
      "explanation": "Detects vague pronouns automatically and can fix with --fix flag",
      "expected_result": "Replaces vague pronouns with explicit subjects"
    }
  ],
  "workflow_suggestion": {
    "type": "quick_wins",
    "total_time_minutes": 5,
    "steps": [
      {
        "order": 1,
        "skill": "/check-structure",
        "args": "--fix",
        "fixes": ["vague_pronouns", "heading_case"]
      }
    ]
  }
}
```

## When to Use This Skill

Use `/skill-advisor` when:
- ✅ Not sure which skill to use for an issue
- ✅ Want to discover available skills
- ✅ Need workflow guidance for common tasks
- ✅ Want to optimize your skill usage
- ✅ Learning the documentation system
- ✅ Planning review or maintenance work

Don't use when:
- ❌ You already know which skill you need
- ❌ Need to actually fix issues (use the recommended skill)
- ❌ Need detailed validation (use specific skills)

## Best Practices

1. **Run early** - Get recommendations before starting work
2. **Follow workflows** - Use suggested skill sequences
3. **Try new skills** - Explore skills you haven't used
4. **Automate quick wins** - Use --fix flags for auto-fixable issues
5. **Learn from examples** - Review good practice callouts
6. **Track time** - Use time estimates for planning

## Reference

This skill references:
- **CLAUDE.md** - All available skills
- **AGENTS.md** - Documentation standards
- **templates/REVIEW_PHASES.md** - Review workflows
- All skill documentation for recommendations

## Notes

- Recommendations are context-aware based on document state
- Prioritizes auto-fixable issues for quick wins
- Suggests workflows based on common patterns
- Helps users discover underutilized skills
- Provides learning opportunities through explanations
- Estimates time to help with planning
- Can generate executable scripts for workflows