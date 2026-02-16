# WAF Documentation Quick Start Guide

Welcome! This guide helps you get started with the Well-Architected Framework documentation system and Claude Code.

## File Structure

```
docs/
├── CLAUDE.md              # Auto-loaded by Claude Code (skills reference)
├── AGENTS.md              # Main documentation standards and guidelines
├── .claude/               # Skills and automation
│   ├── skills/           # 20 documentation skills
│   └── agents/           # Specialized agents
├── templates/             # Reference materials
│   ├── reference/        # Pattern files (CODE_PATTERNS, DOCUMENT_PATTERNS, etc.)
│   ├── doc-templates/    # Document templates
│   ├── REVIEW_PHASES.md  # 7-phase review process
│   └── styleguide.md     # HashiCorp style guide
└── docs/                  # Pillar documentation (optimize, secure, define, design)
```

## How It Works

### Claude Code Auto-Loading

When you start Claude Code in the `docs/` directory:
1. **CLAUDE.md** is automatically loaded as context
2. This gives Claude immediate access to all 20 available skills
3. CLAUDE.md references **AGENTS.md** for complete documentation standards

### Main Files You'll Use

| File | Purpose | When to Read |
|------|---------|--------------|
| **CLAUDE.md** | Skills directory | Quick skill reference |
| **AGENTS.md** | Documentation standards, writing guidelines, patterns | Before writing or reviewing |
| **templates/REVIEW_PHASES.md** | Step-by-step review workflow | When conducting reviews |

## Quick Start Workflows

### Reviewing an Existing Document

```bash
# Quick checks
/check-structure docs/file.mdx
/check-hashicorp-style docs/file.mdx
/check-resources docs/file.mdx

# Full 7-phase review
/review-doc docs/file.mdx --phases 1-7

# Auto-fix issues
/review-doc docs/file.mdx --fix
```

### Writing a New Document

```bash
# 1. Create document with template
/create-doc docs/security/new-topic.mdx --interactive

# 2. Write your content following AGENTS.md guidelines

# 3. Check structure as you write
/check-structure docs/security/new-topic.mdx

# 4. Add resources
/add-resources docs/security/new-topic.mdx

# 5. Full review before committing
/review-doc docs/security/new-topic.mdx
```

### Before Committing

```bash
# Pre-commit validation
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix
/seo-optimize docs/file.mdx
```

## Available Skills (20 Total)

### Review & Validation (10 skills)
- `/review-doc` - Multi-phase documentation review
- `/code-review` - Comprehensive code review
- `/check-style` - Style guide compliance
- `/check-hashicorp-style` - HashiCorp style validation
- `/full-styleguide-check` - Complete style validation
- `/quick-styleguide` - Quick style check
- `/check-structure` - Document structure patterns
- `/check-code-examples` - Code completeness
- `/check-resources` - Resources section formatting
- `/seo-optimize` - SEO and AI/LLM optimization

### Content Management (4 skills)
- `/cross-reference` - Add cross-document links
- `/add-resources` - Enhance resources sections
- `/fix-links` - Fix broken links
- `/extract-examples` - Extract code examples

### Document Creation (4 skills)
- `/create-doc` - Create new documents
- `/new-section` - Add sections to documents
- `/create-jira` - Create Jira tickets
- `/compare-docs` - Compare documents

### Maintenance (2 skills)
- `/update-paths` - Update file paths
- `/update-redirects` - Update redirects

## Getting Help

**For writing standards:**
```bash
# Ask Claude to read AGENTS.md
"What are the requirements for Why sections?"
"Show me the code example standards for Terraform"
```

**For review process:**
```bash
# Ask about review phases
"Explain the 7 review phases"
"What does Phase 4 check for?"
```

**For skills usage:**
```bash
# Get skill help
"/review-doc --help"
"/create-doc --help"
```

## Common Questions

**Q: Where are the documentation standards?**
A: **AGENTS.md** contains all writing standards, patterns, and guidelines.

**Q: How do I create a new document?**
A: Use `/create-doc docs/path/file.mdx --interactive`

**Q: What's the review workflow?**
A: See **templates/REVIEW_PHASES.md** for the 7-phase process.

**Q: Where are code example patterns?**
A: **templates/reference/CODE_PATTERNS.md** has tool-specific requirements.

**Q: How do I validate HashiCorp resources sections?**
A: Use `/check-resources docs/file.mdx` or see **templates/reference/RESOURCES_PATTERNS.md**

**Q: Can I use skills without Claude Code?**
A: No, skills require Claude Code. But you can manually reference the pattern files in templates/reference/

## Tips for Success

1. **Start with AGENTS.md** - Read it before writing to understand standards
2. **Use skills early** - Run `/check-structure` as you write, not just at the end
3. **Fix incrementally** - Use `--fix` flags to auto-correct common issues
4. **Review in phases** - Use `/review-doc --phases 1-3` for iterative reviews
5. **Check before committing** - Always run style checks before pushing

## File References Quick Guide

When working from the docs/ directory:
- Main guidelines: `AGENTS.md` (same directory)
- Review process: `templates/REVIEW_PHASES.md`
- Style guide: `templates/styleguide.md`
- Pattern files: `templates/reference/*.md`
- Document templates: `templates/doc-templates/*.md`

---

**Need more detail?** See `templates/README.md` for comprehensive documentation.
