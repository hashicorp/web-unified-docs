---
name: update-redirects
description: Manages redirects.jsonc when moving or renaming documentation. Validates redirects and detects issues.
argument-hint: <old-path> <new-path>
disable-model-invocation: true
---

# Update Redirects Skill

## Arguments

- **--old**: Old file path (required with --new)
- **--new**: New file path (required with --old)
- **--scan**: Scan directory for moved files needing redirects
- **--validate**: Check for circular redirects, broken targets, orphaned redirects
- **--cleanup**: Suggest unnecessary/consolidatable redirects
- **--redirects-file**: Path to redirects file (default: `../redirects.jsonc`)

## Process

1. **Add redirect** (`--old` + `--new`): Validates no existing redirect for old path, new path exists, no circular redirect created, then updates redirects.jsonc.

2. **Scan** (`--scan`): Checks git history for renamed/moved files, reports which need redirects, which already have them.

3. **Validate** (`--validate`): Detects circular redirects (A→B→A), broken targets (file doesn't exist), redirect chains (A→B→C when A→C is better), orphaned redirects.

4. **Cleanup** (`--cleanup`): Finds unnecessary redirects (old age, low/no traffic), consolidation opportunities for chains.

5. **Format**: Maintains JSONC format, preserves comments, keeps consistent formatting.

## Redirect entry format

```jsonc
{
  "source": "/well-architected-framework/old-path",
  "destination": "/well-architected-framework/new-path",
  "permanent": true
}
```
