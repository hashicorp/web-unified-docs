---
name: update-redirects
description: Manages redirects.jsonc when moving or renaming documentation. Validates redirects and detects issues.
argument-hint: <old-path> <new-path>
disable-model-invocation: true
---

# Update Redirects Skill

Manages the redirects.jsonc file when moving or renaming documentation. Validates redirects, detects issues, and suggests cleanup opportunities.

## Usage

```bash
/update-redirects [options]
```

## Arguments

- **--old**: Old file path (required with --new)
  - Path that was moved/renamed
  - Example: `--old docs/old-path.mdx`

- **--new**: New file path (required with --old)
  - Current path of file
  - Example: `--new docs/new-path.mdx`

- **--scan**: Scan directory for moved files (optional)
  - Detects files that need redirects
  - Example: `--scan docs/`

- **--validate**: Validate existing redirects (optional)
  - Checks for circular redirects
  - Finds broken redirect targets
  - Identifies orphaned redirects

- **--cleanup**: Suggest cleanup opportunities (optional)
  - Finds unnecessary redirects
  - Identifies consolidation opportunities

- **--redirects-file**: Path to redirects file (optional)
  - Default: `../redirects.jsonc` (relative to docs/)
  - Example: `--redirects-file /path/to/redirects.jsonc`

## What This Skill Does

This skill manages URL redirects when documentation structure changes, ensuring old links continue to work.

### Redirect Management Process

1. **Add Redirects**
   - Adds new redirect entry
   - Validates old path doesn't already redirect
   - Checks new path exists
   - Updates redirects.jsonc

2. **Detect Moved Files**
   - Scans git history for renamed/moved files
   - Identifies files needing redirects
   - Suggests redirect entries
   - Batch creates redirects

3. **Validation**
   - Checks for circular redirects (A→B→A)
   - Validates redirect targets exist
   - Finds orphaned redirects (target missing)
   - Detects redirect chains

4. **Cleanup Suggestions**
   - Finds unnecessary redirects (>2 years old)
   - Identifies consolidation opportunities
   - Suggests redirect removal
   - Optimizes redirect chains

5. **Format Preservation**
   - Maintains JSONC format
   - Preserves comments
   - Keeps consistent formatting
   - Sorts entries logically

## Examples

### Add redirect for moved file
```bash
/update-redirects --old docs/old-location/file.mdx --new docs/new-location/file.mdx
```
Adds redirect from old to new location.

### Scan for moved files
```bash
/update-redirects --scan docs/
```
Detects files that were moved and need redirects.

### Validate all redirects
```bash
/update-redirects --validate
```
Checks for redirect issues across entire file.

### Cleanup suggestions
```bash
/update-redirects --validate --cleanup
```
Validates and suggests cleanup opportunities.

### Custom redirects file
```bash
/update-redirects --old docs/old.mdx --new docs/new.mdx --redirects-file /path/to/redirects.jsonc
```

### Bulk operations after reorganization
```bash
# 1. Move files (git)
git mv docs/old/* docs/new/

# 2. Scan and create redirects
/update-redirects --scan docs/

# 3. Validate
/update-redirects --validate
```

## Output Format

### Add Mode (--old --new)

```
Adding Redirect
===============

Old Path: docs/old-location/modules.mdx
New Path: docs/new-location/modules.mdx

Validation:
-----------
✅ Old path doesn't have existing redirect
✅ New path exists
✅ No circular redirect created

Redirect Entry:
---------------
{
  "source": "/well-architected-framework/old-location/modules",
  "destination": "/well-architected-framework/new-location/modules",
  "permanent": true
}

Updated: ../redirects.jsonc
✓ Redirect added successfully

Related URLs affected:
- https://developer.hashicorp.com/well-architected-framework/old-location/modules
  → Now redirects to /new-location/modules
```

### Scan Mode (--scan)

```
Scanning for Moved Files
=========================

Directory: docs/
Checking git history for moved/renamed files...

Moved Files Detected (5):
--------------------------

1. docs/define/old-name.mdx → docs/define/new-name.mdx
   Status: ⚠️ No redirect found
   Action: Add redirect

2. docs/section/moved.mdx → docs/other-section/moved.mdx
   Status: ⚠️ No redirect found
   Action: Add redirect

3. docs/renamed.mdx → docs/better-name.mdx
   Status: ✅ Redirect exists
   No action needed

4. docs/old/file.mdx → docs/new/file.mdx
   Status: ⚠️ No redirect found
   Action: Add redirect

5. docs/deprecated.mdx → (deleted)
   Status: ⚠️ Should redirect to replacement
   Action: Manual decision needed

---

Recommended Actions:
--------------------

Auto-create redirects (3):
```bash
/update-redirects --old docs/define/old-name.mdx --new docs/define/new-name.mdx
/update-redirects --old docs/section/moved.mdx --new docs/other-section/moved.mdx
/update-redirects --old docs/old/file.mdx --new docs/new/file.mdx
```

Manual review needed (1):
- docs/deprecated.mdx was deleted
  💡 Determine appropriate redirect target or removal notice

Already handled (1):
- docs/renamed.mdx redirect exists ✅
```

### Validate Mode (--validate)

```
Redirect Validation Report
===========================

Total Redirects: 47
Issues Found: 5

---

Circular Redirects (1)
======================

❌ Circular chain detected:
   /docs/a → /docs/b → /docs/c → /docs/a

   Files involved:
   - Line 23: docs/a.mdx → docs/b.mdx
   - Line 45: docs/b.mdx → docs/c.mdx
   - Line 67: docs/c.mdx → docs/a.mdx

   Fix: Remove circular dependency
   💡 Suggestion: All should redirect to final destination

---

Broken Redirect Targets (2)
============================

❌ Redirect target doesn't exist:
   Line 89: /docs/old → /docs/new-location
   Target file not found: docs/new-location.mdx

   Fix: Update redirect target or remove redirect

❌ Redirect target doesn't exist:
   Line 112: /docs/moved → /docs/final-location
   Target file not found: docs/final-location.mdx

   Fix: Update redirect target or remove redirect

---

Redirect Chains (1)
===================

⚠️ Redirect chain detected (inefficient):
   /docs/original → /docs/intermediate → /docs/final

   Chain:
   - Line 134: /docs/original → /docs/intermediate
   - Line 156: /docs/intermediate → /docs/final

   Fix: Consolidate to direct redirect
   💡 Change line 134 to: /docs/original → /docs/final

---

Orphaned Redirects (1)
======================

⚠️ Old redirect may be obsolete:
   Line 178: /docs/very-old → /docs/current
   Created: 3 years ago
   Traffic: < 10 hits/month

   Consider: Remove if traffic is negligible

---

Duplicate Redirects (0)
=======================

✅ No duplicate redirect sources found

---

Summary
=======

Critical Issues: 3 (must fix)
- 1 circular redirect
- 2 broken targets

Warnings: 2 (should review)
- 1 redirect chain
- 1 orphaned redirect

Run with --cleanup for optimization suggestions.
```

### Cleanup Mode (--cleanup)

```
Redirect Cleanup Suggestions
=============================

Current Redirects: 47
Optimization Opportunities: 8

---

Consolidate Redirect Chains (3)
================================

1. Chain: /docs/a → /docs/b → /docs/c
   Lines: 23, 45
   Optimize to: /docs/a → /docs/c
   Saves: 1 redirect hop

2. Chain: /docs/old → /docs/temp → /docs/new
   Lines: 67, 89
   Optimize to: /docs/old → /docs/new
   Saves: 1 redirect hop

3. Chain: /docs/v1 → /docs/v2 → /docs/v3
   Lines: 112, 134
   Optimize to: /docs/v1 → /docs/v3
   Saves: 1 redirect hop

---

Remove Obsolete Redirects (3)
==============================

1. Line 156: /docs/ancient → /docs/current
   Age: 4 years
   Traffic: 2 hits/year
   Recommendation: Remove (traffic negligible)

2. Line 178: /docs/deprecated → /docs/new
   Age: 3 years
   Traffic: 5 hits/year
   Recommendation: Remove (traffic negligible)

3. Line 201: /docs/old-structure → /docs/new-structure
   Age: 5 years
   Traffic: 0 hits in past year
   Recommendation: Remove (no traffic)

---

Potential Issues (2)
====================

1. Line 223: /docs/typo → /docs/correct
   Pattern: Likely a typo redirect
   Age: 6 months
   Recommendation: Keep for now, review after 1 year

2. Line 245: /docs/temp-redirect → /docs/permanent
   Pattern: "temp" in name but marked permanent
   Recommendation: Review redirect purpose

---

Impact Summary
==============

If all optimizations applied:
- Redirects removed: 3
- Chains consolidated: 3
- Total redirects: 44 (-3)
- Average redirect hops: 1.05 → 1.00

Performance improvement: ~5% faster redirects

Run these commands to optimize:
[List of specific commands to run]
```

## Redirect Entry Format

```jsonc
{
  // Human-readable comment
  "source": "/well-architected-framework/old-path",
  "destination": "/well-architected-framework/new-path",
  "permanent": true // 301 redirect
}
```

## Best Practices

**When moving a single file:**
```bash
# 1. Move file with git
git mv docs/old/file.mdx docs/new/file.mdx

# 2. Add redirect
/update-redirects --old docs/old/file.mdx --new docs/new/file.mdx

# 3. Update internal links
/fix-links docs/**/*.mdx --fix

# 4. Commit together
git add ../redirects.jsonc docs/
git commit -m "Move file.mdx to new location"
```

**When reorganizing section:**
```bash
# 1. Move files with git
git mv docs/old-section/* docs/new-section/

# 2. Scan and create redirects
/update-redirects --scan docs/

# 3. Validate redirects
/update-redirects --validate

# 4. Fix internal links
/fix-links docs/**/*.mdx --fix

# 5. Commit all changes
git add ../redirects.jsonc docs/
git commit -m "Reorganize documentation structure"
```

**Periodic maintenance:**
```bash
# Monthly redirect audit
/update-redirects --validate --cleanup

# Review suggestions and apply as appropriate
```

## Integration with Other Skills

**With /fix-links:**
```bash
# After moving files
git mv docs/old/*.mdx docs/new/

# 1. Add redirects for external links
/update-redirects --scan docs/

# 2. Fix internal links (no need for redirects)
/fix-links docs/**/*.mdx --fix

# 3. Validate everything
/update-redirects --validate
```

**Complete file move workflow:**
```bash
# 1. Move file
git mv docs/old-path/file.mdx docs/new-path/file.mdx

# 2. Add redirect
/update-redirects --old docs/old-path/file.mdx --new docs/new-path/file.mdx

# 3. Update cross-references
/cross-reference docs/**/*.mdx

# 4. Fix broken links
/fix-links docs/**/*.mdx --fix

# 5. Validate
/update-redirects --validate
```

## Common Redirect Patterns

**File rename:**
```jsonc
{
  "source": "/waf/old-name",
  "destination": "/waf/new-name",
  "permanent": true
}
```

**File move:**
```jsonc
{
  "source": "/waf/old-section/file",
  "destination": "/waf/new-section/file",
  "permanent": true
}
```

**Section reorganization:**
```jsonc
{
  "source": "/waf/old-structure/subsection/file",
  "destination": "/waf/new-structure/file",
  "permanent": true
}
```

**File consolidation:**
```jsonc
// Old file merged into new comprehensive doc
{
  "source": "/waf/old-small-file",
  "destination": "/waf/comprehensive-doc#old-topic",
  "permanent": true
}
```

## Redirect Validation Rules

**Valid redirects:**
- ✅ Source path is old location
- ✅ Destination path exists
- ✅ No circular redirects
- ✅ No duplicate sources
- ✅ Permanent flag set correctly

**Invalid redirects:**
- ❌ Source redirects to another source
- ❌ Destination file doesn't exist
- ❌ Circular chain (A→B→C→A)
- ❌ Multiple sources to same destination
- ❌ Temporary redirect for permanent move

## When to Use This Skill

Use `/update-redirects` when:
- ✅ Moving documentation files
- ✅ Renaming documentation files
- ✅ Reorganizing documentation structure
- ✅ Consolidating multiple docs into one
- ✅ Deleting documentation (redirect to replacement)
- ✅ Auditing redirect health (periodic)
- ✅ Cleaning up old redirects

## Performance Considerations

**Redirect chains are slow:**
```
❌ Slow (2 hops):
/old → /intermediate → /final

✅ Fast (1 hop):
/old → /final
```

**Keep redirects minimal:**
- Remove redirects after sufficient time (2-3 years)
- Consolidate redirect chains
- Direct redirects are faster than chains

## Reference Files

This skill works with:
- **`../redirects.jsonc`** - Redirect configuration file

## Notes

- Validates JSONC syntax after changes
- Preserves file comments and formatting
- Git operations should be done separately
- Redirects are permanent (301) by default
- Supports anchor links in destinations (#section)
- Detects moves via git history
- Traffic data requires external analytics
- Can handle nested documentation structures
