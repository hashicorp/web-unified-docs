# 2026-06-18 — Nomad 1.8 to 2.0 migration guide

## Task

User requested a Nomad usage guide that documents how to migrate from Nomad 1.8 to Nomad 2.0, using the plan created in the previous turn.

## Files created / modified

### Created
- `content/nomad/v2.0.x/content/docs/upgrade/migrate-1-8-to-2-0.mdx` (574 lines)

### Modified
- `content/nomad/v2.0.x/data/docs-nav-data.json` — added "Migrate from 1.8 to 2.0" entry under "Upgrade Nomad" routes
- `content/nomad/v2.0.x/content/docs/upgrade/index.mdx` — added pointer paragraph and link ref at Upgrade Process section
- `content/nomad/v2.0.x/content/docs/upgrade/upgrade-specific.mdx` — added back-link at top of Nomad 2.0.0 section

## Key decisions

- Staged upgrade path (1.8 → 1.9 → 1.10 → 1.11 → 2.0) makes the two-minor-version limit explicit upfront
- Pre-upgrade checklist is concern-grouped (jobspecs / agent config / ACL / task drivers / Go API), not version-grouped, so operators can batch related changes without re-reading multiple times
- Each checklist item is numbered and notes which version enforces it
- Stage sections are brief — they reference the standard upgrade page rather than duplicating rolling-upgrade mechanics
- Each stage has a concrete post-upgrade verification block with shell commands
- Used `<Warning>` MDX component for the WAL irreversibility note (matches existing Nomad convention)
- Used `~>` note syntax for the `disconnect` block constraint (matches existing Nomad convention)
- Did not duplicate the exhaustive version-specific page; linked to it instead
- Enterprise-only items are flagged inline rather than segregated into a separate section

## Source material read

- upgrade/index.mdx — standard upgrade mechanics and compatibility rules
- upgrade/upgrade-specific.mdx — per-version breaking changes from 1.7 through 2.0
- partials/release-notes/v1-10/* — all 1.10 breaking change partials
- partials/release-notes/v1-10-1/* — Raft peer and agent exit behavior changes
- release-notes/v1_8_x.mdx, v1_9_x.mdx, v1-10-x.mdx, v1-11-x.mdx, v2-0-x.mdx
- job-specification/disconnect.mdx — disconnect block syntax for before/after example
