---
name: update-paths
description: Scans WAF pillar directories and updates CONTENT_PATHS.md with complete documentation file list.
disable-model-invocation: false
---

# Update Content Paths Skill

## Arguments

- **--dry-run**: Show what would be updated without modifying CONTENT_PATHS.md
- **--verify**: Exit code 0 if current, 1 if outdated
- **--show-changes**: Show added/removed files vs current CONTENT_PATHS.md

## What It Does

1. Scans all pillar directories for `.mdx` files in `docs/docs/`:
   - `define-and-automate-processes/`, `design-resilient-systems/`, `implementation-resources/`, `optimize-systems/`, `secure-systems/`
2. Excludes `templates/` directory
3. Organizes by pillar and subsection, alphabetically
4. Updates `CONTENT_PATHS.md` with full paths from repo root, file counts per section, total count, timestamp

## File path format

```
content/well-architected-framework/docs/docs/define-and-automate-processes/define/modules.mdx
```

## Run after

- Creating new documents
- Moving/renaming documents
- Deleting documents
- Repository restructuring
