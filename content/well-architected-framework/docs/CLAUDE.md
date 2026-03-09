# Claude Code Context

**New to this system?** See [SETUP.md](./SETUP.md) for a quick start guide.

**Main documentation guidelines:** [AGENTS.md](./AGENTS.md)

Read AGENTS.md for all documentation standards, patterns, supporting files, and reference materials.

## Available Skills

Custom documentation skills are located in `.claude/skills/` directory.

### Active Skills for WAF Documentation

**Review & Validation:**
- `/review-doc` - Multi-phase documentation review (uses REVIEW_PHASES.md)
- `/code-review` - Comprehensive code review for documentation
- `/quick-styleguide` - **⚡ Fast HashiCorp style validation** (Top 12 + Critical, QMD-powered, ~2K tokens, 10-15s)
- `/full-styleguide` - **📋 Comprehensive HashiCorp style validation** (All 18 sections, 200+ rules, QMD-powered, ~5-8K tokens, 30-60s)
- `/check-code-examples` - Code example completeness and summaries
- `/check-resources` - HashiCorp resources section formatting and links
- `/check-consistency` - Ensure terminology and naming consistency across documents
- `/gap-analysis` - Identify content and concept gaps in documentation

**Intelligence & Analysis:**
- `/doc-health-dashboard` - Generate comprehensive health dashboard with visual indicators
- `/skill-advisor` - Context-aware skill recommendations based on detected issues

**Content Management:**
- `/add-resources` - Enhance HashiCorp resources sections

**Document Creation:**
- `/create-doc` - Create new documents from templates

**Maintenance:**
- `/update-paths` - Update file paths across documents

**Utilities:**
- `/qmd` - Search local documentation database (indexed templates/styleguide.md)
- `/humanizer` - Remove AI-generated writing patterns, make text sound natural
- `/keybindings-help` - Customize keyboard shortcuts and keybindings

### Style Guide Workflows

**Daily Writing (Fast & Cost-Effective):**
```bash
# Quick check while writing (80% of issues, 70% token savings)
/quick-styleguide docs/file.mdx --fix
```

**Pre-Publication (Comprehensive):**
```bash
# Full validation before publishing (100% coverage, all 18 sections)
/full-styleguide docs/file.mdx --fix
```

**Complete Review Workflow:**
```bash
# 1. Daily quick checks
/quick-styleguide docs/file.mdx --fix

# 2. Pre-publication comprehensive
/full-styleguide docs/file.mdx --fix

# 3. Final review
/review-doc docs/file.mdx
```

### QMD Database

Both style guide skills use the indexed HashiCorp Style Guide:
- **Collection:** `hashicorp-styleguide`
- **Source:** `qmd://hashicorp-styleguide/styleguide.md` (103.5 KB, 37 chunks)
- **Coverage:** Complete official HashiCorp style guide (3,203+ lines, 18 sections, 200+ rules)

Query the database:
```bash
qmd query "your search term" -c hashicorp-styleguide
qmd ls hashicorp-styleguide
```

### Style Guide Skill Comparison

| Feature | /quick-styleguide | /full-styleguide |
|---------|------------------|------------------|
| **Scope** | Top 12 + Critical (~40 rules) | All 18 sections (200+ rules) |
| **Speed** | 10-15 seconds | 30-60 seconds |
| **Tokens** | ~2,000 | ~5,000-8,000 |
| **Cost** | Low | Moderate |
| **Best For** | Daily workflow | Pre-publication |
| **Auto-fix** | ✅ Yes | ✅ Yes |

Run skills with the Skill tool or by name (e.g., "/review-doc", "/quick-styleguide").