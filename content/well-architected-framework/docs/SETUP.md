# WAF Documentation Quick Start Guide

Welcome! This guide helps you get started with the Well-Architected Framework documentation system and Claude Code.

## File Structure

```
docs/
├── CLAUDE.md              # Auto-loaded by Claude Code (skills reference)
├── AGENTS.md              # Main documentation standards and guidelines
├── .claude/               # Skills and automation
│   ├── skills/           # Documentation skills
│   └── agents/           # Specialized agents
├── templates/             # Reference materials
│   ├── QUICK_REFERENCE.md    # Patterns, checklist, skills, troubleshooting
│   ├── REVIEW_PHASES.md      # 7-phase review process
│   ├── styleguide.md         # HashiCorp style guide
│   ├── reference/
│   │   ├── PATTERNS.md       # All documentation patterns (consolidated)
│   │   ├── CONTENT_PATHS.md  # File organization
│   │   └── TASK_AGENT_GUIDE.md # Agent usage guide
│   └── doc-templates/        # Document templates
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
| **AGENTS.md** | Documentation standards, writing guidelines | Before writing or reviewing |
| **templates/QUICK_REFERENCE.md** | Quick patterns, checklist, skills, troubleshooting | Daily reference |
| **templates/REVIEW_PHASES.md** | Step-by-step review workflow | When conducting reviews |
| **templates/reference/PATTERNS.md** | All documentation patterns | For detailed pattern guidance |

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

# 5. Update navigation (if in a section with nav)
# Edit: /Users/cjobermaier/workspace/web-unified-docs/content/well-architected-framework/data/docs-nav-data.json
# Add your document to the appropriate section in the JSON structure

# 6. Update index page (if adding to a multi-page section)
# Edit the section's index.mdx to add links/tables referencing the new doc

# 7. Full review before committing
/review-doc docs/security/new-topic.mdx
```

### Before Committing

```bash
# Pre-commit validation
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix
/seo-optimize docs/file.mdx
```

## Key Skills (Most Common)

### Essential Daily Skills
- `/check-structure` - Validate document structure (auto-fix available)
- `/check-hashicorp-style` - HashiCorp style validation (auto-fix available)
- `/check-resources` - Resources section formatting (auto-fix available)
- `/review-doc` - Comprehensive 7-phase review
- `/full-styleguide-check` - Complete style guide validation

### Document Creation
- `/create-doc` - Create new documents with template
- `/add-resources` - Enhance resources sections

### Analysis & Optimization
- `/doc-intelligence` - Documentation health dashboard
- `/skill-advisor` - Context-aware skill recommendations
- `/seo-optimize` - SEO and AI/LLM optimization

**See CLAUDE.md for the complete list of all available skills**

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

## Navigation and Document Organization

### Adding Documents to Navigation

When creating new documents, update the navigation in two places:

**1. Main Navigation File**
- **Path:** `/Users/cjobermaier/workspace/web-unified-docs/content/well-architected-framework/data/docs-nav-data.json`
- **Format:** JSON structure with nested routes
- **Example:**
  ```json
  {
    "title": "Your Document Title",
    "path": "secure-systems/secure-applications/ci-cd-secrets/your-doc"
  }
  ```

**2. Section Index Page (if applicable)**
- **Path:** The `index.mdx` file in the document's section
- **Example:** For CI/CD docs, update `docs/secure-systems/secure-applications/ci-cd-secrets/index.mdx`
- **Update:** Add to comparison tables and integration links

**Common sections with navigation:**
- CI/CD secrets: Has both `docs-nav-data.json` entry and `index.mdx` links
- Secrets management: Has `docs-nav-data.json` entries
- Process automation: Has nested routes in `docs-nav-data.json`

## Common Questions

**Q: Where are the documentation standards?**
A: **AGENTS.md** contains all writing standards, patterns, and guidelines.

**Q: How do I create a new document?**
A: Use `/create-doc docs/path/file.mdx --interactive`

**Q: What's the review workflow?**
A: See **templates/REVIEW_PHASES.md** for the 7-phase process.

**Q: Where are code example patterns?**
A: **templates/reference/PATTERNS.md** has all patterns including tool-specific requirements.

**Q: How do I validate HashiCorp resources sections?**
A: Use `/check-resources docs/file.mdx` or see **templates/reference/PATTERNS.md**

**Q: Where's the quick reference for common issues?**
A: See **templates/QUICK_REFERENCE.md** for patterns, checklist, and troubleshooting

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
- Main guidelines: `AGENTS.md`
- Quick reference: `templates/QUICK_REFERENCE.md` (patterns, checklist, troubleshooting)
- Review process: `templates/REVIEW_PHASES.md`
- Style guide: `templates/styleguide.md`
- All patterns: `templates/reference/PATTERNS.md`
- Document templates: `templates/doc-templates/*.md`

---

**Need more detail?** See `templates/README.md` for comprehensive documentation.
