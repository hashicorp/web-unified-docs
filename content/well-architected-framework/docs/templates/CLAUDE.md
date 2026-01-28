# Claude Code Context

All documentation guidelines are maintained in [AGENTS.md](./AGENTS.md).

Read that file for:
- Goals and personas
- Writing standards
- Document structure patterns
- Code example patterns
- SEO and AI/LLM optimization
- Review checklists

Supporting files:
- [REVIEW_PHASES.md](./REVIEW_PHASES.md) - Phase-based review process
- [styleguide.md](./styleguide.md) - HashiCorp style guide

## Available Skills

Custom documentation skills are located in `templates/.claude/skills/` directory.

Common skills for WAF documentation:
- `/review-doc` - Multi-phase documentation review (uses REVIEW_PHASES.md)
- `/check-style` - Style guide compliance check
- `/seo-optimize` - SEO and AI/LLM optimization
- `/cross-reference` - Add cross-document workflow links
- `/add-resources` - Enhance HashiCorp resources sections
- `/create-doc` - Create new documents from templates
- `/fix-links` - Fix broken internal/external links
- `/create-jira` - Create Jira tickets for documentation work
- `/compare-docs` - Compare two documents for consistency
- `/update-paths` - Update file paths across documents
- `/update-redirects` - Update redirect configurations
- `/extract-examples` - Extract code examples from documents

Run skills with the Skill tool or by name (e.g., "/review-doc").