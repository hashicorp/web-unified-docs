---
name: full-styleguide-check
description: Comprehensive validation against the complete HashiCorp style guide. Deep analysis for publication-ready documentation.
argument-hint: <file-paths> [--fix]
disable-model-invocation: true
---

# Full HashiCorp Style Guide Check

**Comprehensive, deep validation** against the complete HashiCorp style guide (3,203 lines). This skill performs thorough analysis using the full `templates/styleguide.md` reference with all examples, explanations, and edge cases.

## When to Use This Skill

Use `/full-styleguide-check` for:
- ✅ **Publication-ready documentation** requiring comprehensive validation
- ✅ **Complex documents** with nuanced style questions
- ✅ **Final review** before submitting for approval
- ✅ **Training and learning** - detailed examples help understand rules
- ✅ **Edge cases** requiring full context and explanations

**For faster daily checks, use `/quick-styleguide` instead.**

## Usage

```bash
/full-styleguide-check <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to check (required)
  - Single file: `/full-styleguide-check docs/modules.mdx`
  - Multiple files: `/full-styleguide-check docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/full-styleguide-check docs/**/*.mdx`

- **--fix** or **-f**: Automatically fix style issues (default: false)
  - Without flag: Report issues only
  - With flag: Implement style fixes

- **--report-only** or **-r**: Generate report without any changes (explicit)

## What This Skill Checks

Validates against **all HashiCorp style guide rules** including:

### Top 12 Critical Guidelines
1. **Active Voice** - Subject performs action
2. **Present Tense** - Avoid "will" for immediate actions
3. **Current Features** - No future promises
4. **No Abbreviations** - TF, TFE, TFC, etc.
5. **"We" for HashiCorp** - Not for reader guidance
6. **"You" for Reader** - Second person for actions
7. **Linear Content Flow** - No "above"/"below"
8. **Avoid Unnecessary Words** - "in order to" → "to"
9. **Simplest Words** - "lets" not "enables/allows"
10. **No Latin Phrases/Foreign Words** - Avoid "ad-hoc", "via", "etc.", "e.g.", "i.e."
11. **No Adjacent Elements** - Space out similar elements
12. **Content Variety** - Mix prose and non-prose

### Comprehensive Coverage
- **Active Voice** - Detailed passive voice detection
- **Alerts** - Sparing usage, proper types, placement
- **Content Organization** - FAQs, flow, references, sentences, lists, diagrams
- **Fonts/Formats** - Capitalization, bold, italics, code formatting
- **Grammar** - Serial commas, punctuation, consistency
- **Language** - Inclusive, clear, professional, concrete, technical
- **Links** - Descriptive text, URL formatting, file indicators
- **Enterprise/Releases** - Beta callouts, requirements
- **Point of View** - Proper "you"/"we" usage
- **Screenshots** - When to use/avoid
- **Tense/Time** - Present for actions, current features
- **Titles/Headings** - Sentence case, hierarchy
- **Variants** - Audience variations, formatting
- **Markdown Standards** - Headings, bold, lists, spacing, links
- **UI Components** - Capitalization, interactions, language
- **Codeblocks** - Syntax, comments, indentation, placeholders
- **Numbers/Dates** - Formatting, words vs numerals, dates/times

### Latin Phrases Detection (CRITICAL)

The full style guide check includes comprehensive detection of Latin phrases that should be avoided:

**Common Latin phrases flagged:**
- `ad-hoc` → `improvised`, `unplanned`, `informal`, `spontaneous`
- `via` → `using`, `through`, `with`
- `etc.` → `and other {entities}`
- `e.g.` → `for example`, `such as`
- `i.e.` → `specifically`, `that is`
- `ergo` → `therefore`, `as a result`
- `vice versa` → `conversely`, `the reverse`
- `per se` → `by itself`, `inherently`
- `status quo` → `current state`, `existing situation`
- `de facto` → `in practice`, `actual`
- `quid pro quo` → `exchange`, `trade-off`
- `bona fide` → `genuine`, `authentic`
- `carte blanche` → `full permission`, `complete authority`
- `in lieu of` → `instead of`, `in place of`
- `pro forma` → `as a formality`, `routine`
- `a priori` → `beforehand`, `in advance`
- `post hoc` → `after the fact`, `retrospective`
- `sine qua non` → `essential`, `required`
- `verbatim` → `word for word`, `exactly`
- `modus operandi` → `method`, `approach`, `way of working`

These phrases are automatically flagged with context-appropriate alternatives.

## Performance

**Execution times:**
- Single file: ~60-90 seconds (slower due to full reference)
- 5 files: ~5-7 minutes
- 20 files: ~20-25 minutes

**Token usage:** ~3x higher than `/quick-styleguide`

This skill is **more thorough but slower** than quick-styleguide. Use it when comprehensive validation is worth the extra time and cost.

## Output Format

```
HashiCorp Full Style Guide Check
=================================

Reference: templates/styleguide.md (3,203 lines - comprehensive)
Files Checked: 1
Total Issues: 12
Auto-fixable: 8
Manual Review: 4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 docs/example.mdx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ LATIN PHRASES [CRITICAL] [AUTO-FIX]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Line 22: Latin phrase "ad-hoc" detected
  Context: "System administrators make ad-hoc modifications..."

  ❌ Current: "ad-hoc modifications"
  ✅ Recommended: "improvised modifications"

  Alternatives:
  • "unplanned modifications"
  • "informal modifications"
  • "spontaneous modifications"

  Rationale: Latin phrases reduce clarity for global audiences.
             Use simple, concrete English words instead.

Line 84: Latin abbreviation "e.g." detected
  Context: "Configure resources, e.g., databases and networks"

  ❌ Current: "e.g., databases"
  ✅ Recommended: "such as databases"

  Alternative: "for example, databases"

  [AUTO-FIX AVAILABLE]

❌ WORD CHOICE [CRITICAL] [AUTO-FIX]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Line 45: Use "lets" instead of "enables"
  ❌ "Terraform enables you to manage infrastructure"
  ✅ "Terraform lets you manage infrastructure"

[Additional detailed issue reports with examples and explanations...]

SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Issues: 12
  ├─ Auto-fixable: 8
  └─ Manual Review: 4

Run with --fix to apply automatic corrections.
```

## Integration with Other Skills

**Comprehensive workflow:**
```bash
# 1. Quick daily check
/quick-styleguide docs/file.mdx --fix

# 2. AGENTS.md style check
/check-style docs/file.mdx --fix

# 3. Full validation before publication
/full-styleguide-check docs/file.mdx --fix

# 4. SEO optimization
/seo-optimize docs/file.mdx

# 5. Final comprehensive review
/review-doc docs/file.mdx
```

**Pre-publication checklist:**
```bash
# Final validation
/full-styleguide-check docs/final.mdx

# Review all issues
# Apply fixes
/full-styleguide-check docs/final.mdx --fix

# Verify changes
git diff docs/final.mdx
```

## Reference Files

Uses the **complete HashiCorp style guide:**
- **`templates/styleguide.md`** - Full guide (3,203 lines)
  - All Top 12 guidelines with detailed examples
  - Complete general writing guidelines
  - Markdown standards with edge cases
  - Codeblock formatting details
  - UI component guidelines
  - Numbers, dates, time formatting
  - Appendix with extended guidance

## Comparison with Quick Styleguide

| Feature | full-styleguide-check | quick-styleguide |
|---------|----------------------|------------------|
| **Reference Size** | 3,203 lines | 570 lines |
| **Speed** | Slower (60-90s) | Faster (15-30s) |
| **Token Usage** | ~3x higher | Standard |
| **Cost** | ~3x higher | Standard |
| **Detail Level** | Comprehensive | Essential rules |
| **Examples** | Extensive | Minimal |
| **Edge Cases** | Covered | Core cases only |
| **Best For** | Publication, final review | Daily checks |

## Best Practices

**When to use full vs quick:**
- **Daily/frequent checks:** Use `/quick-styleguide`
- **Pre-commit:** Use `/quick-styleguide --fix`
- **Complex documents:** Use `/full-styleguide-check`
- **Final review:** Use `/full-styleguide-check`
- **Learning:** Use `/full-styleguide-check` for detailed examples
- **CI/CD pipeline:** Use `/quick-styleguide` (faster)
- **Publication prep:** Use `/full-styleguide-check`

**Workflow:**
1. Write content
2. Quick check: `/quick-styleguide --fix`
3. Review and revise
4. Full check: `/full-styleguide-check`
5. Address all issues
6. Final verification

## Notes

- Most comprehensive HashiCorp style validation available
- Higher token usage = higher cost per check
- Slower execution due to complete reference processing
- Best for publication-ready documentation
- Complements `/quick-styleguide` for different use cases
- Use strategically for important documents
- Consider cost/time tradeoff vs quick-styleguide
