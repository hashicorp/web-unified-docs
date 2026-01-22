# Update Content Paths Skill

Scans all WAF pillar directories and updates CONTENT_PATHS.md with a complete list of documentation files.

## Usage

```bash
/update-paths [options]
```

## Arguments

- **--dry-run**: Show what would be updated without modifying CONTENT_PATHS.md
- **--verify**: Verify CONTENT_PATHS.md is current (exit code 0 if current, 1 if outdated)
- **--show-changes**: Show added/removed files compared to current CONTENT_PATHS.md

## What This Skill Does

This skill maintains an up-to-date inventory of all WAF documentation files by:

1. **Scanning all pillar directories** for `.mdx` files in `docs/docs/`:
   - `define-and-automate-processes/`
   - `design-resilient-systems/`
   - `implementation-resources/`
   - `optimize-systems/`
   - `secure-systems/`
   - Any other top-level directories discovered

2. **Excluding template files**:
   - Skips `templates/` directory
   - Skips any `.mdx` files in template locations

3. **Organizing files** by:
   - Pillar (top-level directory)
   - Subsections (subdirectories)
   - Alphabetical order within each section

4. **Updating CONTENT_PATHS.md** with:
   - Full file paths relative to repo root
   - File counts per pillar and subsection
   - Total file count summary
   - Last updated timestamp

## Output Format

The generated CONTENT_PATHS.md follows this structure:

```markdown
# Well-Architected Framework Content Paths

Last updated: 2024-01-22

This file lists all `.mdx` content files organized by pillar.

## Define and Automate Processes (48 files)

### Automate (4 files)
- content/well-architected-framework/docs/docs/define-and-automate-processes/automate/cicd.mdx
- content/well-architected-framework/docs/docs/define-and-automate-processes/automate/deployments.mdx
...

### Define (18 files)
- content/well-architected-framework/docs/docs/define-and-automate-processes/define/modules.mdx
...

## Summary

- **Define and Automate Processes**: 48 files
- **Manage Infrastructure**: 23 files
- **Secure Environments**: 42 files
- **Optimize Operations**: 16 files

**Total**: 129 .mdx files
```

## Examples

### Standard update
```bash
/update-paths
```
Scans all pillar directories and updates CONTENT_PATHS.md.

### Preview changes without updating
```bash
/update-paths --dry-run
```
Shows what the updated file would look like without modifying CONTENT_PATHS.md.

### Check if update needed
```bash
/update-paths --verify
```
Exits with code 0 if CONTENT_PATHS.md is current, code 1 if outdated.

### See what changed since last update
```bash
/update-paths --show-changes
```
Shows added, removed, and moved files compared to current CONTENT_PATHS.md.

## When to Use This Skill

Run `/update-paths` when:

**After creating new documents:**
```bash
# Created new doc
/create-doc docs/define-and-automate-processes/define/new-topic.mdx

# Update paths
/update-paths
```

**After moving/renaming documents:**
```bash
# Moved doc to new location
git mv docs/old/path.mdx docs/new/path.mdx

# Update paths and show changes
/update-paths --show-changes
```

**After deleting documents:**
```bash
# Removed outdated doc
git rm docs/deprecated/old-doc.mdx

# Update paths
/update-paths
```

**In CI/CD validation:**
```bash
# Check if CONTENT_PATHS.md needs updating
/update-paths --verify || exit 1
```

**Before major documentation releases:**
```bash
# Ensure inventory is current
/update-paths
git diff templates/CONTENT_PATHS.md
```

## Output Example

When running with `--show-changes`, the skill shows:

```
Scanning pillar directories...

Found changes:

✅ Added (3 files):
  + docs/define-and-automate-processes/define/artifact-management.mdx
  + docs/define-and-automate-processes/define/index.mdx
  + docs/define-and-automate-processes/define/as-code/vcs-configuration.mdx

❌ Removed (1 file):
  - docs/define-and-automate-processes/define/as-code/version-control.mdx

📊 Statistics:
  Define and Automate Processes: 48 → 50 files (+2)
  Total: 119 → 121 files (+2)

Updated: templates/CONTENT_PATHS.md
```

## File Paths Handling

The skill uses **full paths from repo root** for consistency:

✅ **Correct format:**
```
content/well-architected-framework/docs/docs/define-and-automate-processes/define/modules.mdx
```

❌ **Not used:**
```
docs/define-and-automate-processes/define/modules.mdx
./define-and-automate-processes/define/modules.mdx
```

**Why full paths:**
- Unambiguous file location
- Works from any directory
- Consistent with other tools
- Easy to validate/verify

## Pillar Detection

The skill automatically detects pillar directories by:

1. Scanning `docs/docs/` for top-level directories
2. Excluding `templates/` directory
3. Using directory name as pillar name
4. Formatting pillar name for display (kebab-case → Title Case)

**Automatic mapping:**
- `define-and-automate-processes` → "Define and Automate Processes"
- `manage-infrastructure` → "Manage Infrastructure"
- `secure-systems` → "Secure Systems"
- `optimize-systems` → "Optimize Systems"

## Subsection Organization

Within each pillar, files are organized by subdirectory:

```
Define and Automate Processes
├── Automate/          (subsection)
│   ├── cicd.mdx
│   └── deployments.mdx
├── Define/            (subsection)
│   ├── modules.mdx
│   └── workflows.mdx
└── Root/              (files directly in pillar root)
    └── index.mdx
```

Files in the pillar root (like `index.mdx`) are grouped under "Root" section.

## Integration Examples

### Pre-Commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Check if any .mdx files changed
MDX_CHANGED=$(git diff --cached --name-only --diff-filter=ACM | grep '\.mdx$' | grep -v templates/)

if [ -n "$MDX_CHANGED" ]; then
  echo "Documentation files changed, updating CONTENT_PATHS.md..."

  /update-paths

  # Stage updated CONTENT_PATHS.md
  git add content/well-architected-framework/docs/templates/CONTENT_PATHS.md
fi
```

### CI/CD Validation

```yaml
# .github/workflows/docs-validation.yml
name: Validate Documentation

on:
  pull_request:
    paths:
      - 'content/well-architected-framework/docs/docs/**/*.mdx'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Verify CONTENT_PATHS.md is current
        run: |
          /update-paths --verify

          if [ $? -ne 0 ]; then
            echo "❌ CONTENT_PATHS.md is outdated"
            echo "Run: /update-paths"
            exit 1
          fi

          echo "✅ CONTENT_PATHS.md is current"
```

### Periodic Audit Script

```bash
#!/bin/bash
# scripts/audit-docs.sh

echo "Auditing documentation..."

# Update paths
/update-paths --show-changes

# Check for orphaned files (not in CONTENT_PATHS.md)
echo "Checking for orphaned files..."

# Get all .mdx files
ALL_MDX=$(find docs/docs -name "*.mdx" -not -path "*/templates/*")

# Compare with CONTENT_PATHS.md
# (Implementation would check if all files are listed)
```

## Error Handling

The skill handles common issues:

**No .mdx files found:**
```
⚠️  Warning: No .mdx files found in docs/define-and-automate-processes/
```

**Permission issues:**
```
❌ Error: Cannot write to templates/CONTENT_PATHS.md
   Check file permissions
```

**Invalid directory structure:**
```
⚠️  Warning: Expected pillar directory not found: docs/manage-infrastructure/
   Scanning all available directories instead
```

**Conflicting files:**
```
⚠️  Warning: Found duplicate file names:
   - docs/pillar-a/index.mdx
   - docs/pillar-b/index.mdx
   Both will be included with full paths
```

## Performance

**Scan speed:**
- ~100 files: < 1 second
- ~500 files: < 3 seconds
- ~1000 files: < 5 seconds

**Optimization:**
- Uses `find` command for fast file discovery
- Excludes templates/ directory early in scan
- Minimal file I/O (no content reading, just paths)

## Maintenance

**When to run manually:**
- After bulk document operations
- Before major releases
- When CONTENT_PATHS.md seems outdated
- After repository restructuring

**Automated execution:**
- Pre-commit hook (recommended)
- CI/CD validation (recommended)
- Periodic cron job (optional)

## Troubleshooting

### "Files missing from CONTENT_PATHS.md"

**Cause:** New files created but `/update-paths` not run.

**Fix:**
```bash
/update-paths
git add templates/CONTENT_PATHS.md
git commit -m "Update content paths inventory"
```

### "CONTENT_PATHS.md shows deleted files"

**Cause:** Files deleted but `/update-paths` not run.

**Fix:**
```bash
/update-paths --show-changes  # See what changed
/update-paths                 # Update the file
```

### "Verify fails in CI/CD"

**Cause:** Forgot to run `/update-paths` before committing.

**Fix:**
```bash
/update-paths
git add templates/CONTENT_PATHS.md
git commit --amend --no-edit
git push --force-with-lease
```

### "Counts don't match actual files"

**Cause:** Possible caching or incomplete scan.

**Fix:**
```bash
# Force complete rescan
/update-paths --dry-run  # Verify counts
/update-paths            # Update file

# Manually verify
find docs/docs -name "*.mdx" -not -path "*/templates/*" | wc -l
```

## Related Skills

This skill works well with:

- **`/create-doc`** - Automatically updates paths after creating docs
- **`/fix-links`** - Uses CONTENT_PATHS.md to validate internal links
- **`/cross-reference`** - Uses file inventory for relationship mapping
- **`/new-section`** - Updates paths after creating new sections

## Implementation Notes

**File discovery:**
```bash
# Scan for .mdx files, excluding templates
find content/well-architected-framework/docs/docs \
  -name "*.mdx" \
  -not -path "*/templates/*" \
  -type f \
  | sort
```

**Path normalization:**
- Always use forward slashes
- Use full path from repo root
- Maintain consistent formatting

**Subsection detection:**
- Extract directory structure
- Group files by parent directory
- Create hierarchical organization

**Count calculation:**
- Count files per subsection
- Sum subsections for pillar total
- Sum all pillars for grand total

## Future Enhancements

Potential improvements:

1. **Diff format:** Show git-style diff for `--show-changes`
2. **JSON export:** Export paths as JSON for tooling
3. **Broken path detection:** Flag paths that don't exist
4. **Template detection:** Identify and warn about templates in pillar dirs
5. **Section validation:** Ensure each pillar has expected sections

## Support

- **Skill documentation:** This file
- **File format:** `templates/CONTENT_PATHS.md`
- **Scan directories:** `docs/docs/*/` (pillar directories)
