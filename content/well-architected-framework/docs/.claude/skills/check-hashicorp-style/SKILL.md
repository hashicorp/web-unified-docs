---
name: check-hashicorp-style
description: Validate documentation against HashiCorp official style guide. Checks for active voice, word choice, tense, and formatting compliance.
argument-hint: <file-paths> [--fix]
disable-model-invocation: true
---

# Check HashiCorp Style Guide

Validates documentation against the official HashiCorp style guide at `templates/styleguide.md`.

## Usage

```bash
/check-hashicorp-style <file-paths> [--fix]
```

## Arguments

- **file-paths**: One or more `.mdx` files to check (required)
  - Single file: `/check-hashicorp-style docs/modules.mdx`
  - Multiple files: `/check-hashicorp-style docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/check-hashicorp-style docs/**/*.mdx`

- **--fix** or **-f**: Automatically fix style issues (default: false)
  - Without flag: Report issues only
  - With flag: Implement style fixes

- **--report-only** or **-r**: Generate report without any changes (explicit)

## What This Skill Checks

Validates against all rules in `templates/styleguide.md`, including:

### Top 12 Guidelines

1. **Active voice** - Subject performs action
2. **Present tense** - Avoid "will" for immediate actions
3. **Current features** - No future promises, avoid "new"/"currently"
4. **No abbreviations** - TF, TFE, TFC, TFC4B, TFCB, HCP TF, VSO, COM
5. **"We" for HashiCorp only** - Not for reader guidance
6. **"You" for reader** - Second person for actions
7. **Linear flow** - No "above"/"below", use "following"
8. **Avoid unnecessary words** - "in order to" → "to"
9. **Simplest words** - "lets" not "enables/allows"
10. **No foreign/jargon** - Avoid "via", "etc.", Latin words
11. **No adjacent elements** - Space out similar elements
12. **Mix prose and lists** - Content variety

### Additional Rules from styleguide.md

- Grammar and punctuation (serial commas, etc.)
- Markdown formatting standards
- Heading capitalization (sentence case)
- Link formatting and descriptions
- Code block syntax and formatting
- Alert usage and placement
- Word choice and clarity
- Inclusive language

**For detailed examples and explanations**, see `templates/styleguide.md` (3,203 lines).

## Output Format

```
HashiCorp Style Guide Check
============================

Files Checked: 2
Total Issues: 18
Auto-fixable: 12
Manual Review: 6

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 docs/example.mdx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ ACTIVE VOICE (2 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Line 33: Passive voice detected
  ❌ "Separation of duties may be required by government..."
  ✅ "Government or industry regulations may require separation of duties..."
  [MANUAL REVIEW]

❌ PRESENT TENSE (1 issue)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Line 125: Future tense with "will"
  ❌ "Vault will automatically revoke it..."
  ✅ "Vault automatically revokes it..."
  [AUTO-FIX AVAILABLE]

❌ WORD CHOICE - lets vs allows/enables (5 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Line 70: Use "lets" instead of "allows"
  ❌ "The secrets engine allows Terraform to provision..."
  ✅ "The secrets engine lets Terraform provision..."
  [AUTO-FIX AVAILABLE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Issues: 9
  ├─ Auto-fixable: 7
  └─ Manual Review: 2

Run with --fix to apply 7 automatic corrections.
Manual review required for 2 issues.
```

## Auto-fixable Issues

These can be fixed automatically with `--fix`:

- ✅ **Present tense** - "will show" → "shows"
- ✅ **Word choice** - "allows/enables" → "lets"
- ✅ **Foreign words** - "via" → "using" or "through"
- ✅ **Unnecessary phrases** - "in order to" → "to"
- ✅ **Abbreviations** - "TF" → "Terraform", "TFC" → "HCP Terraform"
- ✅ **Passive voice** - Simple cases like "is managed by" → "manages"

## Manual Review Required

⚠️ **Complex passive voice** - Requires sentence restructuring
⚠️ **"we" usage** - Need to determine context
⚠️ **Adjacent elements** - Need to add introductory text
⚠️ **Directional references** - "above"/"below" → specific section links

## Usage Examples

### Check single file
```bash
/check-hashicorp-style docs/prevent.mdx
```

### Check and auto-fix
```bash
/check-hashicorp-style docs/prevent.mdx --fix
```

### Check multiple files
```bash
/check-hashicorp-style docs/**/*.mdx
```

### Pre-commit check
```bash
/check-hashicorp-style $(git diff --name-only --cached | grep '\.mdx$')
```

## Integration with Other Skills

**Complete review workflow:**
```bash
# 1. HashiCorp style guide check
/check-hashicorp-style docs/file.mdx --fix

# 2. Structure check
/check-structure docs/file.mdx --fix

# 3. SEO optimization
/seo-optimize docs/file.mdx

# 4. Final comprehensive review
/review-doc docs/file.mdx
```

**Quick pre-commit:**
```bash
/check-hashicorp-style docs/modified.mdx --fix
```

## When to Use This Skill

Use `/check-hashicorp-style` when:
- ✅ Need official HashiCorp style guide compliance
- ✅ Before submitting for publication
- ✅ Validating word choice (lets vs allows/enables)
- ✅ Checking for passive voice
- ✅ Verifying tense consistency
- ✅ Final style validation

Use `/quick-styleguide` instead when:
- ⚡ Need faster daily checks (uses optimized reference)
- ⚡ Pre-commit validation in CI/CD
- ⚡ Quick spot-checks during writing

## Reference Files

This skill validates against:
- **`templates/styleguide.md`** - Complete HashiCorp style guide (3,203 lines)
  - Top 12 guidelines with examples
  - General writing guidelines
  - Markdown standards
  - Code block formatting
  - UI component guidelines

## Instructions for Validation

1. Read the target document(s)
2. Read `templates/styleguide.md` for all style rules
3. Check document against every applicable rule
4. Report findings with line numbers and clear explanations
5. Apply fixes with Edit tool if --fix flag provided
6. Be thorough but concise in reporting

## Notes

- Validates against official HashiCorp style guide
- Auto-fixes are safe and follow official patterns
- Manual review items require context and judgment
- Reports include line numbers and examples
- Essential for publication-ready documentation
- Complements `/quick-styleguide` for different use cases
