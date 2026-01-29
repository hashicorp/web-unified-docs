# Claude Code Context

**New to this system?** See [SETUP.md](./SETUP.md) for a quick start guide.

**Main documentation guidelines:** [AGENTS.md](./AGENTS.md)

Read AGENTS.md for all documentation standards, patterns, supporting files, and reference materials.

## Available Skills

Custom documentation skills are located in `.claude/skills/` directory.

Common skills for WAF documentation:

**Review & Validation:**
- `/review-doc` - Multi-phase documentation review (uses REVIEW_PHASES.md)
- `/code-review` - Comprehensive code review for documentation
- `/check-style` - Style guide compliance check (AGENTS.md Phase 4)
- `/check-hashicorp-style` - HashiCorp official style guide validation (styleguide.md)
- `/full-styleguide-check` - Complete HashiCorp style guide validation
- `/quick-styleguide` - Quick style guide check for common issues
- `/check-structure` - Document structure patterns (Why sections, lists, workflow connections)
- `/check-code-examples` - Code example completeness and summaries
- `/check-resources` - HashiCorp resources section formatting and links
- `/seo-optimize` - SEO and AI/LLM optimization

**Content Management:**
- `/cross-reference` - Add cross-document workflow links
- `/add-resources` - Enhance HashiCorp resources sections
- `/fix-links` - Fix broken internal/external links
- `/extract-examples` - Extract code examples from documents

**Document Creation:**
- `/create-doc` - Create new documents from templates
- `/new-section` - Create new sections in existing documents
- `/create-jira` - Create Jira tickets for documentation work
- `/compare-docs` - Compare two documents for consistency

**Maintenance:**
- `/update-paths` - Update file paths across documents
- `/update-redirects` - Update redirect configurations

Run skills with the Skill tool or by name (e.g., "/review-doc").