---
name: validate-links
description: Comprehensive link validation for internal WAF links, external URLs, and anchor references. Use for pre-commit checks and CI/CD pipelines.
argument-hint: <file-paths> [--fix]
disable-model-invocation: true
---

# Validate Links Skill

Comprehensive link validation for internal WAF document links, external URLs, and anchor references. Ensures all links are functional and properly formatted.

## Usage

```bash
/validate-links <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to check (required)
  - Single file: `/validate-links docs/modules.mdx`
  - Multiple files: `/validate-links docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/validate-links docs/**/*.mdx`

- **--fix** or **-f**: Automatically fix common link issues
- **--report-only** or **-r**: Generate report without changes
- **--external**: Check external URLs (slower, makes HTTP requests)
- **--skip-external**: Skip external URL validation (faster)
- **--check-anchors**: Validate anchor links within documents

## What This Skill Checks

### 1. **Internal WAF Links**

**Rule:** All internal links must point to existing files

**Bad Examples:**
- ❌ `[modules](/docs/modules.mdx)` - Absolute path
- ❌ `[guide](./missing-file.mdx)` - File doesn't exist
- ❌ `[doc](../wrong-path.mdx)` - Incorrect relative path

**Good Examples:**
- ✅ `[modules](./modules.mdx)` - Correct relative path
- ✅ `[guide](../define/modules.mdx)` - Valid parent directory reference
- ✅ `[overview](./index.mdx)` - Index file reference

**Auto-fixable:** Partial (can fix absolute paths, suggest corrections)

---

### 2. **External URLs**

**Rule:** External URLs should return 200 OK status

**Checks:**
- HTTP/HTTPS URLs are accessible
- No 404 Not Found errors
- No redirect chains (>3 redirects)
- HTTPS preferred over HTTP
- No broken external documentation links

**Auto-fixable:** Partial (can update HTTP to HTTPS)

---

### 3. **Anchor Links**

**Rule:** Anchor links must point to existing headings

**Bad Examples:**
- ❌ `[section](#missing-heading)` - Heading doesn't exist
- ❌ `[guide](./file.mdx#wrong-anchor)` - Anchor not in target file

**Good Examples:**
- ✅ `[section](#why-modules)` - Heading exists in current file
- ✅ `[guide](./file.mdx#getting-started)` - Anchor exists in target

**Auto-fixable:** No (requires manual verification)

---

### 4. **Link Format Issues**

**Rule:** Links should follow proper markdown format

**Bad Examples:**
- ❌ `[broken link](` - Incomplete link
- ❌ `[](./file.mdx)` - Empty link text
- ❌ `[link]()` - Empty URL

**Good Examples:**
- ✅ `[descriptive text](./file.mdx)`
- ✅ `[external resource](https://example.com)`

**Auto-fixable:** Partial (can fix formatting)

---

### 5. **Relative Path Validation**

**Rule:** Relative paths must be correct from file location

**Checks:**
- `./` references files in same directory
- `../` references parent directory correctly
- No broken relative paths
- Paths match actual file structure

**Auto-fixable:** Yes (can correct relative paths)

---

### 6. **Redirect Detection**

**Rule:** Links should point directly to final destination

**Checks:**
- Detects 301/302 redirects
- Identifies redirect chains
- Suggests updating to final URL

**Auto-fixable:** Yes (can update to final URL)

---

### 7. **Orphaned Pages**

**Rule:** All pages should be linked from at least one other page

**Checks:**
- Finds pages with no incoming links
- Identifies isolated documentation
- Suggests where to add links

**Auto-fixable:** No (requires content judgment)

---

## Output Format

```
Link Validation Report
======================

Files Checked: 5
Total Links: 47
Issues Found: 8
Auto-fixable: 5

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 docs/modules.mdx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ INTERNAL LINKS (3 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Line 45: Broken internal link
  ❌ [version control](./version-control.mdx)
  💡 File not found: docs/define/version-control.mdx
  ✓ Suggestion: ../define/version-control.mdx
  [AUTO-FIX AVAILABLE]

Line 78: Absolute path detected
  ❌ [workflows](/docs/workflows.mdx)
  ✓ Should be: ./workflows.mdx
  [AUTO-FIX AVAILABLE]

Line 102: Anchor link broken
  ❌ [best practices](#best-practices)
  💡 Heading not found in current file
  Available headings:
    - #why-modules
    - #module-structure
    - #getting-started
  [MANUAL REVIEW]

❌ EXTERNAL LINKS (2 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Line 134: HTTP instead of HTTPS
  ⚠️ http://developer.hashicorp.com/terraform
  ✓ Update to: https://developer.hashicorp.com/terraform
  [AUTO-FIX AVAILABLE]

Line 156: Redirect detected
  ⚠️ https://terraform.io/docs → https://developer.hashicorp.com/terraform/docs
  💡 Update to final URL to avoid redirect
  [AUTO-FIX AVAILABLE]

✅ PASSES (3 checks)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ No broken external URLs (200 OK)
✓ No empty link text
✓ No malformed markdown links

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY BY TYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Internal Links: 28
  ├─ Valid: 25
  ├─ Broken: 2
  └─ Incorrect paths: 1

External Links: 15
  ├─ Valid: 13
  ├─ HTTP (should be HTTPS): 1
  └─ Redirects: 1

Anchor Links: 4
  ├─ Valid: 3
  └─ Broken: 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ORPHANED PAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Found 2 pages with no incoming links:

📄 docs/define/old-guide.mdx
  💡 Consider linking from:
    - docs/define/index.mdx (section overview)
    - docs/define/modules.mdx (related content)

📄 docs/secure/legacy-auth.mdx
  💡 Consider linking from:
    - docs/secure/index.mdx (section overview)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERALL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Issues: 8
  ├─ Auto-fixable: 5
  └─ Manual Review: 3

Run with --fix to apply 5 automatic corrections.
```

## Common Fixes

### Fix Relative Paths

**Before:**
```markdown
[version control](./version-control.mdx)
```

**After:**
```markdown
[version control](../define/version-control.mdx)
```

### Fix Absolute Paths

**Before:**
```markdown
[workflows](/docs/workflows.mdx)
```

**After:**
```markdown
[workflows](./workflows.mdx)
```

### Update HTTP to HTTPS

**Before:**
```markdown
[Terraform docs](http://developer.hashicorp.com/terraform)
```

**After:**
```markdown
[Terraform docs](https://developer.hashicorp.com/terraform)
```

### Update Redirected URLs

**Before:**
```markdown
[guide](https://terraform.io/docs)
```

**After:**
```markdown
[guide](https://developer.hashicorp.com/terraform/docs)
```

## Examples

### Check single file
```bash
/validate-links docs/modules.mdx
```

### Check and auto-fix
```bash
/validate-links docs/modules.mdx --fix
```

### Check all files (skip external URLs for speed)
```bash
/validate-links docs/**/*.mdx --skip-external
```

### Full validation including external URLs
```bash
/validate-links docs/**/*.mdx --external
```

### Pre-commit check
```bash
/validate-links $(git diff --name-only --cached | grep '\.mdx$')
```

## Integration with Other Skills

**Complete validation workflow:**
```bash
# 1. Validate links
/validate-links docs/file.mdx --fix

# 2. Check resources formatting
/check-resources docs/file.mdx --fix

# 3. Full review
/review-doc docs/file.mdx --phases 6
```

**Pre-commit workflow:**
```bash
# Fast check (skip external URLs)
/validate-links docs/file.mdx --skip-external --fix
```

**CI/CD pipeline:**
```bash
# Fail on broken links
/validate-links docs/**/*.mdx --external || exit 1
```

## When to Use This Skill

Use `/validate-links` when:
- ✅ Before committing changes (pre-commit hook)
- ✅ In CI/CD pipelines (automated validation)
- ✅ After restructuring documentation
- ✅ When adding new cross-references
- ✅ Monthly link health checks
- ✅ Before major releases

Don't use when:
- ❌ Need full document review (use `/review-doc`)
- ❌ Need resource section validation (use `/check-resources`)
- ❌ Checking code examples (use `/check-code-examples`)

## Performance

Typical execution times:
- Single file (skip external): ~10 seconds
- Single file (with external): ~30 seconds
- 20 files (skip external): ~3 minutes
- 20 files (with external): ~10 minutes

**Tip:** Use `--skip-external` for fast pre-commit checks, run full validation periodically.

## Reference

This skill validates against:
- **AGENTS.md** - Link formatting standards
- **REVIEW_PHASES.md** - Phase 6: Link Quality & Balance

## Best Practices

**Daily workflow:**
```bash
# Fast check before commit
/validate-links docs/modified.mdx --skip-external --fix
```

**Weekly validation:**
```bash
# Full check including external URLs
/validate-links docs/**/*.mdx --external
```

**After restructuring:**
```bash
# Check all links and fix paths
/validate-links docs/**/*.mdx --fix
```

**Find orphaned pages:**
```bash
# Check for pages with no incoming links
/validate-links docs/**/*.mdx --report-only
```

## Notes

- Internal link validation is fast and reliable
- External URL validation requires network requests (slower)
- Anchor validation checks heading existence
- Auto-fixes are safe and follow WAF standards
- Orphaned page detection helps maintain navigation
- Redirect detection improves link quality
- Compatible with CI/CD pipelines