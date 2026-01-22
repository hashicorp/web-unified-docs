# Fix Links Skill

Validates and fixes internal cross-references, broken links, and anchor references in documentation files.

## Usage

```bash
/fix-links <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to check (required)
  - Single file: `/fix-links docs/modules.mdx`
  - Multiple files: `/fix-links docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/fix-links docs/**/*.mdx`

- **--fix** or **-f**: Automatically fix broken links (default: false)
  - Without flag: Report issues only
  - With flag: Fix broken links automatically

- **--report-only** or **-r**: Generate report without any changes (explicit)

- **--check-external**: Also validate external URLs (optional, slower)
  - Sends HEAD requests to external URLs
  - Reports HTTP status codes
  - Example: `/fix-links docs/file.mdx --check-external`

## What This Skill Does

This skill scans documentation for link issues and provides fixes for broken cross-references.

### Validation Process

1. **Internal Link Detection**
   - Finds all relative links (e.g., `./other-doc.mdx`, `../workflows.mdx`)
   - Identifies absolute doc paths (e.g., `/docs/define/modules`)
   - Extracts markdown links `[text](path)` and bare links

2. **File Existence Validation**
   - Checks if target files exist
   - Validates paths relative to current file location
   - Handles both relative and absolute paths

3. **Anchor Validation**
   - Extracts anchor references (e.g., `#heading-name`)
   - Scans target files for matching headings
   - Validates anchor format (lowercase, hyphenated)

4. **Link Fixing**
   - Suggests correct paths for broken links
   - Searches for files with similar names
   - Calculates correct relative paths
   - Updates links automatically with `--fix` flag

5. **External Link Checking** (with `--check-external`)
   - Sends HEAD requests to URLs
   - Reports HTTP status codes
   - Identifies 404s and redirects
   - Checks for HTTPS availability

### Link Categories

**✅ Valid Links**
- File exists at specified path
- Anchor exists in target file
- External URL returns 200 OK

**⚠️ Suspicious Links**
- File exists but name doesn't match context
- Redirect detected (301/302)
- Link text doesn't match target title

**❌ Broken Links**
- File not found at path
- Anchor doesn't exist in target
- External URL returns 404

**🔗 Suggested Fixes**
- Correct relative paths
- Similar file names found
- Updated anchor format

## Examples

### Check all links in a file
```bash
/fix-links docs/modules.mdx
```
Reports all link issues without making changes.

### Auto-fix broken links
```bash
/fix-links docs/define/*.mdx --fix
```
Automatically corrects broken internal links.

### Check multiple files
```bash
/fix-links docs/file1.mdx docs/file2.mdx docs/file3.mdx --report-only
```
Validates links across multiple files.

### Comprehensive validation with external links
```bash
/fix-links docs/**/*.mdx --check-external
```
Checks both internal and external links across all docs.

### Section-wide link validation
```bash
/fix-links docs/define-and-automate-processes/**/*.mdx --fix
```
Validates and fixes links in entire section.

## Output Format

The skill generates a structured report:

```
Link Validation Report
======================

Files Checked: 5
Total Links Found: 47

✅ Valid Links: 39 (83%)
⚠️ Suspicious Links: 3 (6%)
❌ Broken Links: 5 (11%)

---

Broken Links
============

docs/modules.mdx:
  Line 45: [workflow documentation](../workflows.mdx)
  ❌ File not found: ../workflows.mdx
  🔗 Suggestion: ./workflows.mdx (file found here)

  Line 78: [version control](#version-control-setup)
  ❌ Anchor #version-control-setup not found
  🔗 Available anchors: #version-control, #git-configuration

docs/workflows.mdx:
  Line 23: [module structure](/define/modules.mdx)
  ❌ File not found at absolute path
  🔗 Suggestion: ../define/modules.mdx

---

Suspicious Links
===============

docs/centralize-packages.mdx:
  Line 56: [documentation](./workflows.mdx)
  ⚠️ Link text "documentation" is vague
  💡 Consider: "workflow documentation" or "standardize workflows"

---

Fixes Applied (with --fix flag)
================================

✓ docs/modules.mdx:45 - Updated to ./workflows.mdx
✓ docs/workflows.mdx:23 - Updated to ../define/modules.mdx
✓ docs/centralize-packages.mdx:78 - Fixed anchor to #git-setup

Summary: 3 links fixed, 2 require manual review
```

## Link Detection Patterns

The skill detects these link formats:

**Markdown links:**
```markdown
[Link text](path/to/file.mdx)
[Anchor link](#heading)
[Cross-reference](./other-doc.mdx#section)
```

**Relative paths:**
```markdown
./same-directory.mdx
../parent-directory/file.mdx
../../grandparent/file.mdx
```

**Absolute doc paths:**
```markdown
/docs/define/modules
/docs/define-and-automate-processes/define/workflows
```

**External URLs:**
```markdown
https://developer.hashicorp.com/terraform
http://example.com/page
```

## Best Practices

**Before committing:**
```bash
# Check links in modified files
/fix-links docs/modified-file.mdx

# Fix if issues found
/fix-links docs/modified-file.mdx --fix
```

**Section reorganization:**
```bash
# After moving files, validate all links
/fix-links docs/section/**/*.mdx --report-only

# Review suggestions, then fix
/fix-links docs/section/**/*.mdx --fix
```

**Periodic maintenance:**
```bash
# Monthly check of all documentation
/fix-links docs/**/*.mdx --check-external
```

**Pre-release validation:**
```bash
# Comprehensive check before release
/fix-links docs/**/*.mdx --check-external --report-only
```

## Integration with Workflows

**With /cross-reference:**
```bash
# First understand link structure
/cross-reference docs/section/*.mdx

# Then fix broken links
/fix-links docs/section/*.mdx --fix
```

**With /update-redirects:**
```bash
# After moving files
mv docs/old/file.mdx docs/new/file.mdx

# Update redirects
/update-redirects --old docs/old/file.mdx --new docs/new/file.mdx

# Fix links pointing to old location
/fix-links docs/**/*.mdx --fix
```

**In CI/CD:**
```bash
# Fail build on broken links
/fix-links docs/**/*.mdx || exit 1
```

## Common Link Issues

**Relative path errors:**
```markdown
❌ [link](workflows.mdx)          # Missing ./
✅ [link](./workflows.mdx)        # Correct

❌ [link](../define/modules)      # Missing .mdx
✅ [link](../define/modules.mdx)  # Correct
```

**Anchor format:**
```markdown
❌ #Version Control                # Spaces
✅ #version-control                # Lowercase, hyphenated

❌ #setup_guide                    # Underscores
✅ #setup-guide                    # Hyphens
```

**Absolute paths:**
```markdown
❌ [link](/docs/modules)           # Will break
✅ [link](../modules.mdx)          # Relative path
```

## When to Use This Skill

Use `/fix-links` when:
- Moving or renaming documentation files
- Reorganizing documentation structure
- Finding broken cross-references
- Preparing for release (validation)
- After bulk documentation changes
- Setting up pre-commit hooks

## Notes

- The skill preserves link text when fixing paths
- Suggested fixes are based on file name similarity
- External link checking respects rate limits
- Anchor validation is case-insensitive
- Reports are saved to `/tmp/link-report-<timestamp>.md`
- Works with both `.mdx` and `.md` files
