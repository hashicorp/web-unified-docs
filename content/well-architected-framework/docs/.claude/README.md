# Claude Code Configuration

This directory contains Claude Code skills and configuration for the WAF documentation project.

## Skills

Skills are reusable commands that automate common tasks. They're invoked with slash commands like `/review`.

### Available Skills

#### `/review-doc` - Documentation Review

Performs comprehensive 7-phase documentation review following REVIEW_PHASES.md workflow and AGENTS.md standards.

**Quick start:**
```bash
# Review a single file
/review-doc docs/define-and-automate-processes/define/modules.mdx

# Review and fix automatically
/review-doc docs/define-and-automate-processes/define/modules.mdx --fix

# Review specific phases
/review-doc docs/define-and-automate-processes/define/*.mdx --phases 1-3

# Full review with report only
/review-doc docs/define-and-automate-processes/define/workflows.mdx --report-only
```

**See:** `skills/review-doc.md` for complete documentation.

---

#### `/update-paths` - Update Content Inventory

Scans all WAF pillar directories and updates CONTENT_PATHS.md with a complete list of documentation files.

**Quick start:**
```bash
# Update CONTENT_PATHS.md
/update-paths

# Preview changes without updating
/update-paths --dry-run

# Show what changed since last update
/update-paths --show-changes

# Verify file is current
/update-paths --verify
```

**See:** `skills/update-paths.md` for complete documentation.

## How Skills Work

1. Skills are defined in `templates/.claude/skills/*.md` files (this directory)
2. Each skill has a clear interface (arguments, options, behavior)
3. Skills reference WAF documentation standards (AGENTS.md, REVIEW_PHASES.md in templates/)
4. Skills are invoked with `/skill-name` syntax

## Reference Documentation

Skills use these WAF standards and reference files (all in templates/ directory):

- `AGENTS.md` - Writing standards, style guide, document patterns
- `REVIEW_PHASES.md` - 7-phase review workflow
- `CONTENT_PATHS.md` - Inventory of all .mdx files in pillar directories
- `../templates/doc-templates/DOCUMENT_TEMPLATE.md` - Template for creating new documents

## Customizing Standards

To update documentation standards:

1. Edit `AGENTS.md` for writing standards, style guide, patterns
2. Edit `REVIEW_PHASES.md` for review workflow and phases
3. Skills automatically use the updated standards

No skill code changes needed when standards evolve.

## Adding New Skills

To add a new skill:

1. Create `skills/your-skill-name.md`
2. Define usage, arguments, and behavior
3. Reference relevant documentation standards
4. Test the skill with various inputs
5. Update this README with the new skill

## Best Practices

**When using skills:**
- Read the skill documentation first (`skills/<name>.md`)
- Start with `--report-only` to preview changes
- Use `--fix` after reviewing recommendations
- Run skills on modified files before committing

**When updating standards:**
- Update AGENTS.md or REVIEW_PHASES.md directly
- Test skills with updated standards
- Document any breaking changes
- Communicate standard changes to team

## Support

For questions about skills or standards (all in templates/ directory):
- Skill documentation: `.claude/skills/<name>.md`
- Writing standards: `AGENTS.md`
- Review process: `REVIEW_PHASES.md`
- Document template: `../templates/doc-templates/DOCUMENT_TEMPLATE.md`
- Content inventory: `CONTENT_PATHS.md`
