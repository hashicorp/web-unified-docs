---
name: full-styleguide
description: Comprehensive HashiCorp style validation using QMD database. Validates against all 18+ sections and 200+ rules. Use for pre-publication reviews.
argument-hint: <file-paths> [--fix]
---

# Full HashiCorp Style Guide Check

**Comprehensive, exhaustive validation** against the complete HashiCorp Official Style Guide. This skill validates documents against **all 18+ major sections** and **200+ specific rules** using QMD database queries for rule lookups.

## When to Use This Skill

Use `/full-styleguide` for:
- 📋 **Pre-publication final review**
- 🔍 **Comprehensive validation** before submission
- 📚 **Learning** the complete style guide
- ✍️ **Complex documents** requiring thorough checks
- 🎯 **Publication-ready** documentation
- 🏆 **High-stakes** content (landing pages, official docs)

**For daily quick checks, use `/quick-styleguide` instead.**

## Usage

```bash
/full-styleguide <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.md` or `.mdx` files to check (required)
  - Single file: `/full-styleguide docs/modules.mdx`
  - Multiple files: `/full-styleguide docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/full-styleguide docs/**/*.mdx`

- **--fix** or **-f**: Automatically fix style issues (default: false)
  - Without flag: Report issues only
  - With flag: Implement auto-fixes

- **--report-only** or **-r**: Generate report without any changes (explicit)

## What This Skill Checks

Validates against **ALL HashiCorp Style Guide rules** across 18+ major sections:

### Section 1: Top 12 Guidelines (Lines 1-272)
1. **Active Voice** - Subject performs action
2. **Present Tense** - Avoid "will" for immediate actions
3. **Current Features** - No "new"/"currently"
4. **No Abbreviations** - TF, TFE, TFC, etc.
5. **"We" for HashiCorp** - Not for reader guidance
6. **"You" for Reader** - Second person
7. **Linear Flow** - No "above"/"below"
8. **No Unnecessary Words** - "to" not "in order to"
9. **Simplest Words** - "lets" not "enables/allows"
10. **No Foreign/Jargon** - Avoid "via", "etc."
11. **No Adjacent Elements** - Space similar elements
12. **Content Variety** - Mix prose and lists

### Section 2: Active Voice (Lines 278-331)
- Subject performs action
- Imperative statements
- Agency and description

### Section 3: Alerts (Lines 334-509)
- Alert usage guidelines
- Beta/enterprise callouts
- Warning/tip/note placement

### Section 4: Content Organization (Lines 512-896)
- No FAQ sections
- Linear flow
- Simple sentences
- List formatting
- Diagram/table introductions
- Adjacent element spacing

### Section 5: Enterprise Releases (Lines 899-1080)
- Paid edition callouts
- Beta feature alerts
- Edition requirements

### Section 6: Fonts and Formats (Lines 1084-1210)
- Lowercase for features
- Boldface for terms
- Code font usage
- Compass directions
- Job title capitalization

### Section 7: Grammar and Punctuation (Lines 1213-1442)
- Serial commas (Oxford)
- Complete sentences
- No em/en dashes
- No semantic emphasis
- Colon usage
- No quotation marks for emphasis

### Section 8: Language and Word Choice (Lines 1465-1803)
- No ableist language
- Gender-neutral language
- Non-violent language
- No speculative language
- No figures of speech
- No editorializing
- Simplest words
- No foreign words
- American spelling
- No shortened forms
- No rhetorical questions
- Acronym usage
- Product terminology

### Section 9: Links (Lines 1806-1887)
- Descriptive link text
- No "click here"
- No raw URLs
- PDF extensions

### Section 10: Point of View (Lines 1889-1950)
- Address as "you"
- "We" for HashiCorp
- No possessives in examples

### Section 11: Screenshots (Lines 1953-1981)
- Screenshot usage
- Browser element removal

### Section 12: Tense and Time (Lines 1984-2106)
- Simple present tense
- Future tense for tutorials
- Current features only
- No version mentions in prose

### Section 13: Titles and Headings (Lines 2109-2189)
- Sentence case
- Present tense
- Sequential nesting
- Heading hierarchy

### Section 14: Variants (Lines 2192-2215)
- Variant usage
- Tab naming

### Section 15: Markdown Standards (Lines 2280-2500)
- Hash-style headings
- Double asterisks for bold
- No mixed formatting
- Hyphens for lists
- Ordered list numbering
- Spacing rules
- Internal link format

### Section 16: UI Components (Lines 2521-2584)
- UI element formatting
- No quotation marks
- Action verbs (click/press/select)
- Correct prepositions

### Section 17: Codeblocks and Consoles (Lines 2587-3021)
- Format commands as code
- shell-session syntax
- Double pound comments
- Long-form commands
- Command output
- Indentation rules
- Syntax highlighting
- Placeholder values
- Code block introductions
- One command per block

### Section 18: Numbers, Dates, and Time (Lines 3024-3204)
- Spell out ordinals
- Numbers zero through nine
- Number ranges
- Date formatting
- Timestamp format
- 12-hour clock
- Comma usage
- Port number formatting
- IP address formatting

## Performance

**Execution times:**
- Single file: ~30-60 seconds (comprehensive)
- 5 files: ~3-5 minutes
- Thorough, exhaustive validation

**Token usage:** ~5,000-8,000 tokens
**Cost:** Moderate (worth it for publication-ready docs)

This skill is **optimized for thoroughness and completeness**.

## Instructions for Validation

When this skill is invoked:

### Phase 1: Setup (Query QMD Database)

1. **Query QMD for all major sections** (comprehensive lookups):
   ```bash
   # Top 12 Guidelines
   qmd query "Top 12 guidelines active voice present tense" -c hashicorp-styleguide -n 5

   # Grammar and Punctuation
   qmd query "grammar punctuation serial comma em dash" -c hashicorp-styleguide -n 5

   # Language and Word Choice
   qmd query "language word choice ableist gender-neutral" -c hashicorp-styleguide -n 5

   # Markdown Standards
   qmd query "markdown standards hash headings bold formatting" -c hashicorp-styleguide -n 5

   # UI Components
   qmd query "UI components elements formatting quotation marks" -c hashicorp-styleguide -n 5

   # Codeblocks
   qmd query "codeblocks consoles shell-session formatting" -c hashicorp-styleguide -n 5

   # Numbers and Dates
   qmd query "numbers dates time formatting port IP" -c hashicorp-styleguide -n 5

   # Links
   qmd query "links descriptive text click here" -c hashicorp-styleguide -n 3

   # Tense and Time
   qmd query "tense time present future tutorials" -c hashicorp-styleguide -n 3

   # Titles and Headings
   qmd query "titles headings sentence case present tense" -c hashicorp-styleguide -n 3
   ```

2. **Build comprehensive validation checklist** from QMD results

### Phase 2: Document Analysis

3. **Read the target document(s)**

4. **Systematically check against ALL sections:**

   **Top 12 Guidelines:**
   - ✓ Active voice
   - ✓ Present tense
   - ✓ Current features
   - ✓ No abbreviations
   - ✓ "We" usage
   - ✓ "You" for reader
   - ✓ Linear flow
   - ✓ No unnecessary words
   - ✓ Simplest words
   - ✓ No foreign/jargon
   - ✓ No adjacent elements
   - ✓ Content variety

   **Active Voice:**
   - ✓ Subject performs action
   - ✓ Imperative statements

   **Content Organization:**
   - ✓ No FAQ sections
   - ✓ Linear flow
   - ✓ Simple sentences
   - ✓ List formatting
   - ✓ No adjacent elements

   **Fonts and Formats:**
   - ✓ Lowercase features
   - ✓ Bold for terms
   - ✓ Code font usage
   - ✓ No special formatting for services

   **Grammar and Punctuation:**
   - ✓ Serial commas
   - ✓ Complete sentences
   - ✓ No em/en dashes
   - ✓ Colon usage
   - ✓ No quotation marks for emphasis

   **Language and Word Choice:**
   - ✓ No ableist language
   - ✓ Gender-neutral
   - ✓ Non-violent
   - ✓ No speculative language
   - ✓ No figures of speech
   - ✓ No editorializing
   - ✓ Simplest words
   - ✓ No foreign words
   - ✓ American spelling
   - ✓ No shortened forms
   - ✓ No rhetorical questions
   - ✓ Acronym usage

   **Links:**
   - ✓ Descriptive link text
   - ✓ No "click here"
   - ✓ No raw URLs

   **Point of View:**
   - ✓ Address as "you"
   - ✓ "We" for HashiCorp only

   **Tense and Time:**
   - ✓ Simple present tense
   - ✓ Current features only
   - ✓ No version mentions

   **Titles and Headings:**
   - ✓ Sentence case
   - ✓ Present tense
   - ✓ Sequential nesting

   **Markdown Standards:**
   - ✓ Hash-style headings
   - ✓ Double asterisks for bold
   - ✓ Hyphens for lists
   - ✓ Ordered list numbering
   - ✓ Spacing rules

   **UI Components:**
   - ✓ UI elements in bold
   - ✓ No quotation marks
   - ✓ Action verbs
   - ✓ Correct prepositions

   **Codeblocks:**
   - ✓ Commands as code
   - ✓ shell-session syntax
   - ✓ Double pound comments
   - ✓ Sample output
   - ✓ Indentation
   - ✓ Syntax highlighting
   - ✓ Code block introductions

   **Numbers, Dates, Time:**
   - ✓ Spell out ordinals
   - ✓ Numbers zero-nine
   - ✓ Port numbers as code
   - ✓ IP addresses as code

5. **Categorize all findings** by:
   - Section
   - Severity (Critical/Moderate/Minor)
   - Auto-fixable vs Manual Review

### Phase 3: Detailed Reporting

6. **Generate comprehensive report** with:
   - Section-by-section breakdown
   - All violations with line numbers
   - Before/after examples
   - Auto-fix indicators
   - Severity levels
   - Overall compliance score

7. **If --fix flag:** Apply all auto-fixes using Edit tool

### Phase 4: Summary

8. **Provide detailed summary:**
   - Total rules checked
   - Rules passed
   - Rules failed
   - Compliance percentage
   - Breakdown by severity
   - Auto-fixed items
   - Manual review required

## Auto-fixable Issues

All auto-fixes from quick-styleguide plus additional ones:

✅ **Present tense** - "will show" → "shows"
✅ **Word choice** - "enables/allows" → "lets"
✅ **Foreign words** - "via" → "using/through", "etc." → remove
✅ **Unnecessary phrases** - "in order to" → "to"
✅ **Abbreviations** - "TF" → "Terraform", "TFC" → "HCP Terraform"
✅ **Port numbers** - "port 3000" → "port `3000`"
✅ **IP addresses** - "127.0.0.1" → "`127.0.0.1`"
✅ **Quotation marks** - Remove from UI/product names
✅ **Em dashes** - Replace with commas/periods
✅ **Content flow** - "below" → "following"
✅ **Simple passive** - Basic passive voice patterns
✅ **Typos** - Obvious spelling errors
✅ **Article usage** - Missing "the", "a", "an"

## Manual Review Required

⚠️ **Complex passive voice** - Sentence restructuring
⚠️ **"We" in examples** - Context-dependent
⚠️ **Adjacent elements** - Content judgment
⚠️ **Future features** - Editorial decision
⚠️ **Complex em dash** - Sentence restructuring
⚠️ **Rhetorical questions** - Rewording needed
⚠️ **Figure of speech** - Context-dependent
⚠️ **Complex abbreviations** - Domain-specific

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPREHENSIVE HashiCorp Style Guide Validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File: modernize-node-api.md
Validation Date: 2026-02-16
Style Guide: qmd://hashicorp-styleguide/styleguide.md (3,203+ lines, 18 sections)

Total Issues Found: 11
  ├─ Critical: 4
  ├─ Moderate: 4
  └─ Minor: 3

Auto-fixable: 7
Manual Review Required: 4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1: TOP 12 GUIDELINES (Lines 1-272)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 1. Active voice - PASS
⚠️ 2. Present tense - 2 violations
✅ 3. Current features - PASS
✅ 4. No abbreviations - PASS
✅ 5. "We" for HashiCorp only - N/A
✅ 6. "You" for reader - PASS
✅ 7. Linear flow - PASS
✅ 8. Avoid unnecessary words - PASS
✅ 9. Simplest words - PASS
✅ 10. No foreign/jargon - PASS
✅ 11. No adjacent elements - PASS
✅ 12. Mix prose and lists - PASS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ CRITICAL ISSUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Detailed issue listings with line numbers, before/after, severity, auto-fix status]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ SECTION-BY-SECTION COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2: ACTIVE VOICE (Lines 278-331)
✅ All sentences have subjects performing actions

SECTION 3: ALERTS (Lines 334-509)
N/A - No alert boxes in document

[... complete section-by-section breakdown ...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERALL COMPLIANCE SCORE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Rules Checked: 200+
Rules Passed: 189+
Rules Failed: 11
Compliance Rate: 94.5%

Grade: A-

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDED ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Priority 1 (Critical): [List of critical fixes]
Priority 2 (Moderate): [List of moderate fixes]
Priority 3 (Minor): [List of minor fixes]

Would you like me to apply the auto-fixes?
```

## Integration with Other Skills

**Complete workflow:**
```bash
# 1. Daily: Quick checks while writing
/quick-styleguide docs/file.mdx --fix

# 2. Pre-publication: Full comprehensive check
/full-styleguide docs/file.mdx --fix

# 3. Final: Complete review
/review-doc docs/file.mdx
```

**Publication workflow:**
```bash
# Comprehensive style validation
/full-styleguide docs/final.mdx --fix

# Structure and SEO
/check-structure docs/final.mdx
/seo-optimize docs/final.mdx

# Final review
/review-doc docs/final.mdx
```

## QMD Database Reference

Uses the complete indexed HashiCorp Style Guide:
- **Collection:** `hashicorp-styleguide`
- **Source:** `qmd://hashicorp-styleguide/styleguide.md`
- **Size:** 103.5 KB (3,203+ lines, 37 chunks)
- **Coverage:** Complete - all 18 sections, 200+ rules

## Comparison: Quick vs Full

| Feature | quick-styleguide | full-styleguide |
|---------|------------------|-----------------|
| **Scope** | Top 12 + Critical (~40 rules) | All 18+ sections (200+ rules) |
| **Speed** | 10-15 seconds | 30-60 seconds |
| **Token Usage** | ~2,000 tokens | ~5,000-8,000 tokens |
| **Cost** | Low | Moderate |
| **Detail Level** | Compact report | Comprehensive report |
| **Section Breakdown** | Summary only | Section-by-section |
| **Best For** | Daily workflow | Pre-publication |
| **Use Case** | Speed + frequent checks | Thoroughness + quality |
| **Compliance Grade** | Top issues only | Complete A-F grade |

## When to Use Full vs Quick

**Use `/full-styleguide` when:**
- 📋 Publishing official documentation
- 🎯 Need comprehensive validation
- 🏆 High-stakes content
- 📚 Learning the complete style guide
- ✍️ Complex technical documents
- 🔍 Thorough pre-publication review
- 📊 Need detailed compliance report
- 🎓 Training/education purposes

**Use `/quick-styleguide` when:**
- ⚡ Daily writing and editing
- 💰 Cost-conscious frequent checks
- 🚀 Pre-commit validation
- ⏱️ Time-sensitive reviews
- 📝 Draft documents
- 🔄 Iterative editing

## Examples

**Comprehensive final check:**
```bash
/full-styleguide docs/launch-announcement.mdx
```

**Auto-fix before publication:**
```bash
/full-styleguide docs/getting-started.mdx --fix
```

**Check multiple critical files:**
```bash
/full-styleguide docs/index.mdx docs/overview.mdx docs/quickstart.mdx
```

**Publication validation:**
```bash
# Full style check
/full-styleguide docs/v2-release.mdx --fix

# Review final state
/review-doc docs/v2-release.mdx
```

## Best Practices

1. **Use for final reviews** - Not daily checks
2. **Review manual items** - Don't auto-fix everything blindly
3. **Learn from findings** - Improve writing over time
4. **Combine with other skills** - Structure, SEO, review
5. **Save for publication** - Use quick-styleguide for drafts

## Notes

- **QMD-powered** for comprehensive rule lookups
- **200+ rules** validated systematically
- **18+ major sections** checked
- **Section-by-section** breakdown
- **Compliance grading** (A-F scale)
- **Publication-ready** validation
- **Thorough and exhaustive**
- Complements quick-styleguide
- Uses same indexed database
- Comprehensive validation strategy
