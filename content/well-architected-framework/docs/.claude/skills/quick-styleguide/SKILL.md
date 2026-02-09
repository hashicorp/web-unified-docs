---
name: quick-styleguide
description: Fast HashiCorp style validation using optimized quick-reference. Perfect for daily checks and pre-commit workflows.
argument-hint: <file-paths> [--fix]
---

# Quick HashiCorp Style Guide Check

**Fast, cost-effective validation** using the optimized HashiCorp style guide quick-reference (570 lines). This skill performs efficient checks with all essential rules while using 82% fewer tokens than the full guide.

## When to Use This Skill

Use `/quick-styleguide` for:
- ✅ **Daily documentation checks** during writing
- ✅ **Pre-commit validation** in your workflow
- ✅ **Frequent checks** on multiple files
- ✅ **CI/CD pipelines** requiring fast validation
- ✅ **Cost-conscious** style checking
- ✅ **Essential rules** without deep examples

**For comprehensive final review, use `/full-styleguide-check`.**

## Usage

```bash
/quick-styleguide <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to check (required)
  - Single file: `/quick-styleguide docs/modules.mdx`
  - Multiple files: `/quick-styleguide docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/quick-styleguide docs/**/*.mdx`

- **--fix** or **-f**: Automatically fix style issues (default: false)
  - Without flag: Report issues only
  - With flag: Implement style fixes

- **--report-only** or **-r**: Generate report without any changes (explicit)

## What This Skill Checks

Validates against **all critical HashiCorp style guide rules** using an optimized reference:

### Top 12 Critical Guidelines [PRIORITY: CRITICAL]
1. **Active Voice** [AUTO-FIX: Partial] - Subject performs action
2. **Present Tense** [AUTO-FIX: Yes] - Avoid "will"
3. **Current Features** [MANUAL] - No future promises
4. **No Abbreviations** [AUTO-FIX: Yes] - TF, TFE, TFC
5. **"We" for HashiCorp** [MANUAL] - Not for guidance
6. **"You" for Reader** [AUTO-FIX: Partial] - Second person
7. **Linear Flow** [AUTO-FIX: Partial] - No "above"/"below"
8. **No Unnecessary Words** [AUTO-FIX: Yes] - "to" not "in order to"
9. **Simplest Words** [AUTO-FIX: Yes] - "lets" not "enables"
10. **No Foreign/Jargon** [AUTO-FIX: Yes] - Avoid "via", "etc."
11. **No Adjacent Elements** [MANUAL] - Space similar elements
12. **Content Variety** [MANUAL] - Mix elements

### All Essential Rules Covered
- Active voice patterns
- Alert usage guidelines
- Content organization rules
- Font and format standards
- Grammar rules (serial comma, etc.)
- Language and word choice
- Link formatting
- Enterprise/beta callouts
- Point of view (you/we)
- Screenshot guidelines
- Tense and time
- Title formatting
- Markdown standards
- UI components
- Codeblock formatting
- Numbers, dates, time

## Performance

**Execution times:**
- Single file: ~15-30 seconds (**2-3x faster**)
- 5 files: ~2-3 minutes (**2x faster**)
- 20 files: ~8-12 minutes (**2x faster**)

**Token usage:** ~82% lower than full styleguide
**Cost:** ~70-80% lower per check

This skill is **optimized for speed and cost** while maintaining comprehensive rule coverage.

## Output Format

```
Quick HashiCorp Style Guide Check
==================================

Reference: templates/styleguide-quick-reference.md (optimized)
Files Checked: 1
Total Issues: 8
Auto-fixable: 6
Manual Review: 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 docs/example.mdx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ WORD CHOICE [CRITICAL] [AUTO-FIX]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Line 25: Use "lets" instead of "enables"
  ❌ "Terraform enables you to..."
  ✅ "Terraform lets you..."

❌ PRESENT TENSE [CRITICAL] [AUTO-FIX]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Line 42: Avoid "will"
  ❌ "The output will show..."
  ✅ "The output shows..."

✅ PASSES (10 checks)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ No unofficial abbreviations
✓ Proper use of "we"
✓ Addresses reader as "you"
✓ No unnecessary words
✓ No foreign/jargon words
✓ No adjacent elements
✓ Proper content flow
✓ Active voice
✓ Markdown standards
✓ Codeblock formatting

SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Issues: 8
  ├─ Auto-fixable: 6
  └─ Manual Review: 2

⚡ Quick check completed in 18 seconds
💰 Token usage: ~3,200 tokens (82% savings vs full)

Run with --fix to apply 6 automatic corrections.
```

## Auto-fixable Issues

The quick-styleguide can automatically fix:

✅ **Present tense** - "will show" → "shows"
✅ **Word choice** - "enables/allows" → "lets"
✅ **Foreign words** - "via" → "using", "etc." → "and other"
✅ **Unnecessary phrases** - "in order to" → "to"
✅ **Abbreviations** - "TF" → "Terraform"
✅ **Simple passive** - "is managed by" → "manages"
✅ **Content flow** - "below" → "following"

## Manual Review Required

⚠️ **Complex passive voice** - Sentence restructuring
⚠️ **"We" in examples** - Context-dependent
⚠️ **Adjacent elements** - Content judgment
⚠️ **Future features** - Editorial decision

## Integration with Other Skills

**Fast daily workflow:**
```bash
# 1. Quick check during writing
/quick-styleguide docs/file.mdx

# 2. Auto-fix common issues
/quick-styleguide docs/file.mdx --fix

# 3. AGENTS.md check
/check-style docs/file.mdx --fix
```

**Pre-commit workflow:**
```bash
# Quick validation
/quick-styleguide docs/modified.mdx --fix

# Verify
git diff docs/modified.mdx

# Commit
git add docs/modified.mdx
git commit -m "Update documentation"
```

**Complete workflow:**
```bash
# 1. Daily: Quick checks (fast, cheap)
/quick-styleguide docs/file.mdx --fix

# 2. Pre-publication: Full check (thorough)
/full-styleguide-check docs/file.mdx --fix

# 3. Final: Comprehensive review
/review-doc docs/file.mdx
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

**Regex patterns available for:**
- Passive voice constructions
- Unofficial abbreviations
- Foreign loan words
- Unnecessary phrases
- Directional references

## Best Practices

**Daily usage:**
- Run on every file before committing
- Use `--fix` to apply automatic corrections
- Review manual items before finalizing

**Cost optimization:**
- Use quick-styleguide for frequent checks
- Reserve full-styleguide-check for final reviews
- Batch multiple files in single check

**Workflow integration:**
- Add to pre-commit hooks
- Include in CI/CD pipeline
- Combine with other skills efficiently

**When to escalate to full check:**
- Publication-ready documents
- Complex style questions
- Edge cases not covered
- Learning/training purposes

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
/quick-styleguide docs/*.mdx
```

**CI/CD pipeline:**
```bash
/quick-styleguide $(git diff --name-only main | grep '\.mdx$')
```

## Notes

- **82% token savings** vs full styleguide
- **2-3x faster** execution
- **70-80% cost reduction** per check
- All critical rules covered
- Optimized for frequent use
- Perfect for daily workflows
- Escalate to full check when needed
- Machine-readable detection patterns
- Designed for automation
- Complements full-styleguide-check
