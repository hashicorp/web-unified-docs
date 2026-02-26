---
name: quick-styleguide
description: Fast HashiCorp style validation using QMD database queries. Perfect for daily checks and pre-commit workflows.
argument-hint: <file-paths> [--fix]
---

# Quick HashiCorp Style Guide Check

**Fast, cost-effective validation** using QMD database queries for targeted rule lookups. This skill performs efficient checks on the **Top 12 Guidelines + Critical Rules** while using ~70% fewer tokens than the full comprehensive check.

## When to Use This Skill

Use `/quick-styleguide` for:
- ✅ **Daily documentation checks** during writing
- ✅ **Pre-commit validation** in your workflow
- ✅ **Frequent checks** on multiple files
- ✅ **CI/CD pipelines** requiring fast validation
- ✅ **Cost-conscious** style checking
- ✅ **80% of issues in 20% of the time**

**For comprehensive final review, use `/full-styleguide`.**

## Usage

```bash
/quick-styleguide <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.md` or `.mdx` files to check (required)
  - Single file: `/quick-styleguide docs/modules.mdx`
  - Multiple files: `/quick-styleguide docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/quick-styleguide docs/**/*.mdx`

- **--fix** or **-f**: Automatically fix style issues (default: false)
  - Without flag: Report issues only
  - With flag: Implement style fixes

- **--report-only** or **-r**: Generate report without any changes (explicit)

## What This Skill Checks

Validates against **HashiCorp's Top 12 Guidelines + Critical Rules**:

### Top 12 Critical Guidelines [PRIORITY: HIGH]

1. **Active Voice** [AUTO-FIX: Partial] - Subject performs action
2. **Present Tense** [AUTO-FIX: Yes] - Avoid "will" for immediate actions
3. **Current Features** [MANUAL] - No "new"/"currently"
4. **No Abbreviations** [AUTO-FIX: Yes] - TF, TFE, TFC, etc.
5. **"We" for HashiCorp** [MANUAL] - Not for reader guidance
6. **"You" for Reader** [AUTO-FIX: Partial] - Second person
7. **Linear Flow** [AUTO-FIX: Partial] - No "above"/"below"
8. **No Unnecessary Words** [AUTO-FIX: Yes] - "to" not "in order to"
9. **Simplest Words** [AUTO-FIX: Yes] - "lets" not "enables"
10. **No Latin Phrases/Foreign Words** [AUTO-FIX: Yes] - Avoid "ad-hoc", "via", "etc.", "e.g.", "i.e."
11. **No Adjacent Elements** [MANUAL] - Space similar elements
12. **Content Variety** [MANUAL] - Mix prose and lists

### Additional Critical Checks

**Grammar & Punctuation:**
- ✅ Em dashes (should use commas/periods instead)
- ✅ Quotation marks around UI elements (should use bold)
- ✅ Serial commas (Oxford commas required)
- ✅ Complete sentences in prose

**Formatting:**
- ✅ Port numbers formatted as code
- ✅ IP addresses formatted as code
- ✅ Sentence case headings
- ✅ Hash-style headings (#, ##, ###)
- ✅ Bold with ** not __
- ✅ Hyphens for unordered lists

**UI Components:**
- ✅ UI elements in bold
- ✅ No quotation marks around product names
- ✅ Correct action verbs (click, press, select)

## Performance

**Execution times:**
- Single file: ~10-15 seconds (**3x faster** than full)
- 5 files: ~1-2 minutes
- Quick, targeted validation

**Token usage:** ~70% lower than full-styleguide
**Cost:** ~60-70% lower per check

This skill is **optimized for speed and daily workflow** while catching most common issues.

## Instructions for Validation

When this skill is invoked:

### Phase 1: Setup (Use QMD)

1. **Query QMD for critical rules** (targeted, fast lookups):
   ```bash
   qmd query "present tense avoid will immediate actions" -c hashicorp-styleguide -n 3
   qmd query "word choice lets vs enables allows" -c hashicorp-styleguide -n 2
   qmd query "em dash punctuation rules" -c hashicorp-styleguide -n 2
   qmd query "port number formatting code" -c hashicorp-styleguide -n 2
   qmd query "quotation marks UI elements product names" -c hashicorp-styleguide -n 2
   qmd query "active voice passive voice" -c hashicorp-styleguide -n 2
   qmd query "foreign words via etc jargon" -c hashicorp-styleguide -n 2
   ```

2. **Build validation patterns** from QMD results

### Phase 2: Document Analysis

3. **Read the target document(s)**

❌ LATIN PHRASES [CRITICAL] [AUTO-FIX]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Line 56: Latin phrase "ad-hoc" detected
  ❌ "System administrators make ad-hoc modifications..."
  ✅ "System administrators make improvised modifications..."
  Alternative: "unplanned", "informal", "spontaneous"

Line 78: Latin abbreviation "e.g." detected
  ❌ "Configure resources, e.g., databases and networks"
  ✅ "Configure resources, such as databases and networks"

✅ PASSES (10 checks)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ No unofficial abbreviations
✓ Proper use of "we"
✓ Addresses reader as "you"
✓ No unnecessary words
✓ No Latin phrases or foreign words
✓ No adjacent elements
✓ Proper content flow
✓ Active voice
✓ Markdown standards
✓ Codeblock formatting

5. **Categorize findings:**
   - Auto-fixable
   - Manual review required

### Phase 3: Reporting

6. **Generate compact report** with:
   ```
   Quick Style Check - file.mdx
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ✅ 10/12 Top Guidelines passed
   ❌ 3 issues found

   Line 70: Present tense
     ❌ "will ask" → ✅ "asks" [AUTO-FIX]

   Line 143: Port formatting
     ❌ "port 3000" → ✅ "port `3000`" [AUTO-FIX]

   Line 184: Em dash
     ❌ "first—reading files" → ✅ "first, reading files" [AUTO-FIX]

   Run with --fix to apply 3 changes.
   ```

7. **If --fix flag:** Apply auto-fixes using Edit tool

### Phase 4: Summary

8. **Provide quick summary:**
   - Total issues found
   - Auto-fixed (if --fix used)
   - Manual review items
   - Compliance score

## Auto-fixable Issues

The quick-styleguide can automatically fix:

✅ **Present tense** - "will show" → "shows"
✅ **Word choice** - "enables/allows" → "lets"
✅ **Latin phrases** - "ad-hoc" → "improvised", "via" → "using", "etc." → "and other"
✅ **Common Latin terms** - "e.g." → "for example", "i.e." → "specifically"
✅ **Unnecessary phrases** - "in order to" → "to"
✅ **Abbreviations** - "TF" → "Terraform", "TFC" → "HCP Terraform"
✅ **Port numbers** - "port 3000" → "port `3000`"
✅ **IP addresses** - "127.0.0.1" → "`127.0.0.1`"
✅ **Quotation marks** - Remove from UI/product names
✅ **Em dashes** - Replace with commas (when appropriate)
✅ **Content flow** - "below" → "following" (in document context)

## Manual Review Required

⚠️ **Complex passive voice** - Sentence restructuring needed
⚠️ **"We" in examples** - Context-dependent
⚠️ **Adjacent elements** - Requires content judgment
⚠️ **Future features** - Editorial decision
⚠️ **Complex em dash** - May need sentence split

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Quick HashiCorp Style Check (QMD-Powered)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File: docs/example.mdx
Database: qmd://hashicorp-styleguide/styleguide.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOP 12 GUIDELINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Active voice - PASS
❌ Present tense - 2 violations
✅ Current features - PASS
✅ No abbreviations - PASS
✅ "We" usage - PASS
✅ "You" for reader - PASS
✅ Linear flow - PASS
✅ No unnecessary words - PASS
✅ Simplest words - PASS
✅ No foreign/jargon - PASS
✅ No adjacent elements - PASS
✅ Content variety - PASS

Score: 11/12 (92%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ISSUES FOUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Line 70: Present Tense [AUTO-FIX]
   "Bob will ask you" → "Bob asks you"

❌ Line 143: Port Formatting [AUTO-FIX]
   "port 3000" → "port `3000`"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Issues: 2
  ├─ Auto-fixable: 2
  └─ Manual Review: 0

⚡ Completed in 12 seconds
💰 ~2,000 tokens used

Run with --fix to apply 2 corrections.
```

## Integration with Other Skills

**Fast daily workflow:**
```bash
# 1. Quick check during writing
/quick-styleguide docs/file.mdx

# 2. Auto-fix common issues
/quick-styleguide docs/file.mdx --fix

# 3. Pre-publication comprehensive check
/full-styleguide docs/file.mdx
```

**Pre-commit workflow:**
```bash
# Quick validation + auto-fix
/quick-styleguide docs/modified.mdx --fix

# Verify changes
git diff docs/modified.mdx

# Commit
git add docs/modified.mdx
git commit -m "docs: update documentation"
```

## Reference Files

Uses the **optimized quick-reference:**
- **`templates/styleguide-quick-reference.md`** - Optimized (570 lines)
  - All Top 12 guidelines with priority/type tags
  - Essential rules only, minimal examples
  - Detection patterns and fix guidance
  - Quick validation checklist
  - Word replacement tables
  - Machine-readable format

## Comparison with Full Styleguide

| Feature | quick-styleguide | full-styleguide-check |
|---------|------------------|----------------------|
| **Reference Size** | 570 lines | 3,203 lines |
| **Speed** | Fast (15-30s) | Slower (60-90s) |
| **Token Usage** | Standard | ~3x higher |
| **Cost** | Standard | ~3x higher |
| **Detail Level** | Essential rules | Comprehensive |
| **Examples** | Minimal | Extensive |
| **Edge Cases** | Core cases | All cases |
| **Best For** | Daily checks | Final review |

## Detection Patterns

The quick-reference includes optimized patterns for:

**High-priority keywords:**
- `will` (future tense) → present tense
- `enables you`, `allows you` → `lets you`
- `via` → `using`/`through`
- `etc.` → `and other {entities}`
- `TF`, `TFC`, `TFE` → full names
- `in order to` → `to`
- `above`, `below` → specific references

**Latin phrases to avoid (CRITICAL):**
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
- `sine qua non` → `essential`, "required"
- `verbatim` → `word for word`, `exactly`
- `modus operandi` → `method`, `approach`, `way of working`

**Regex patterns available for:**
- Passive voice constructions
- Unofficial abbreviations
- Latin phrases and foreign loan words
- Unnecessary phrases
- Directional references

Uses the indexed HashiCorp Style Guide:
- **Collection:** `hashicorp-styleguide`
- **Source:** `qmd://hashicorp-styleguide/styleguide.md`
- **Size:** 103.5 KB (3,203+ lines, 37 chunks)
- **Coverage:** All official HashiCorp style rules

## Comparison: Quick vs Full

| Feature | quick-styleguide | full-styleguide |
|---------|------------------|-----------------|
| **Scope** | Top 12 + Critical | All 18+ sections |
| **Speed** | 10-15 seconds | 30-60 seconds |
| **Token Usage** | ~2,000 tokens | ~5,000+ tokens |
| **Cost** | Low | Medium |
| **Rules Checked** | ~40 critical | 200+ comprehensive |
| **Best For** | Daily checks | Pre-publication |
| **Use Case** | Speed + cost | Thoroughness |

## When to Escalate to Full Check

Use `/full-styleguide` instead when:
- 📋 **Final publication review**
- 🔍 **Comprehensive validation** needed
- 📚 **All 18 sections** must be checked
- 🎓 **Learning** style guide thoroughly
- ✍️ **Complex documents** with edge cases

## Examples

**Quick daily check:**
```bash
/quick-styleguide docs/new-feature.mdx
```

**Auto-fix before commit:**
```bash
/quick-styleguide docs/updated.mdx --fix
```

**Check multiple files:**
```bash
/quick-styleguide docs/file1.mdx docs/file2.mdx docs/file3.mdx
```

**CI/CD pipeline:**
```bash
/quick-styleguide $(git diff --name-only main | grep '\.mdx$')
```

## Best Practices

1. **Run quick checks frequently** - Low cost, high value
2. **Use --fix for safe changes** - Review complex items manually
3. **Escalate to full-styleguide** - Before publication
4. **Batch multiple files** - More efficient
5. **Integrate into workflow** - Pre-commit hooks, CI/CD

## Notes

- **QMD-powered** for fast rule lookups
- **70% token savings** vs full-styleguide
- **3x faster** execution
- Catches **80% of common issues**
- Perfect for **daily workflow**
- Complements full-styleguide
- Uses same indexed database
- Targeted validation strategy
