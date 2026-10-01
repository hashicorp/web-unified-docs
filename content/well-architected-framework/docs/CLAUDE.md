# Claude Code Context

**New to this system?** See [SETUP.md](./SETUP.md) for a quick start guide.

**Main documentation guidelines:** @AGENTS.md

## Available Skills

Custom documentation skills are located in `.claude/skills/` directory.

### Active Skills for WAF Documentation

**Review & Validation:**
- `/review-doc` - Multi-phase documentation review (uses REVIEW_PHASES.md)
- `/code-review` - Comprehensive code review for documentation
- `/quick-styleguide` - **Fast HashiCorp style validation** (Top 12 + Critical, QMD-powered, ~2K tokens, 10-15s)
- `/qmd-styleguide` - **Comprehensive HashiCorp style validation** (All 18 sections, 200+ rules, QMD-powered, ~5-8K tokens, 30-60s)
- `/check-code-examples` - Code example completeness and summaries
- `/check-resources` - HashiCorp resources section formatting and links
- `/check-consistency` - Ensure terminology and naming consistency across documents
- `/check-hashicorp-style` - Validate against HashiCorp style guide (active voice, word choice, tense, formatting)
- `/check-structure` - Validate WAF document structure (Why sections, list intros, workflow connections, ending order)
- `/gap-analysis` - Identify content and concept gaps in documentation
- `/publish-gate` - **Fast go/no-go pre-publish check** (6 critical gates, binary PASS/FAIL, <30s)

**Intelligence & Analysis:**
- `/doc-health-dashboard` - Generate comprehensive health dashboard with visual indicators
- `/skill-advisor` - Context-aware skill recommendations based on detected issues
- `/readability` - Reading level, jargon density, and sentence complexity scoring
- `/content-dedup` - Find duplicated content across documents that should be consolidated
- `/content-freshness` - Track content freshness (version references, technology currency, link validity)
- `/persona-coverage` - Analyze document coverage balance for decision-makers and implementers
- `/smart-cross-reference` - Auto-detect workflow sequences, suggest bidirectional links, find orphans, score link strength
- `/pillar-report` - Run checks across an entire pillar with aggregated rankings

**SEO & Content Quality:**
- `/seo-optimize` - SEO optimization for meta descriptions, titles, headings, and links
- `/link-check` - Validate internal/external links actually resolve (broken links, stale domains)
- `/add-resources` - Enhance HashiCorp resources sections

**Document Creation & Management:**
- `/create-doc` - Create new documents from templates
- `/create-jira` - Create WAF JIRA tickets for documentation work

**Maintenance:**
- `/update-paths` - Update file paths across documents
- `/update-redirects` - Manage redirects.jsonc when moving or renaming documentation

**Documentation Index (Grounded Docs MCP):**
- `/docs-search` - Search and query the documentation index for API references and code examples
- `/doc-manage` - Manage the documentation index (scrape, index, refresh, remove)
- `/docs-fetch-url` - Fetch a single URL and convert its content to Markdown

**Utilities:**
- `/qmd` - Search local documentation database (indexed templates/styleguide.md)
- `/scrub` - Identify and remove AI-generated writing patterns from documentation
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
/qmd-styleguide docs/file.mdx --fix
```

**Complete Review Workflow:**
```bash
# 1. Daily quick checks
/quick-styleguide docs/file.mdx --fix

# 2. Pre-publication comprehensive
/qmd-styleguide docs/file.mdx --fix

# 3. Final review
/review-doc docs/file.mdx

# 4. Pre-commit gate check
/publish-gate docs/file.mdx
```

### Pillar-Wide Quality Management

```bash
# Check an entire pillar — ranked report of all docs
/pillar-report docs/secure-systems/ --check all

# Focus on worst 10 docs for a specific check
/pillar-report docs/secure-systems/ --check resources --top 10

# Find duplicated content across a pillar
/content-dedup docs/secure-systems/

# Validate all links in a pillar
/link-check docs/secure-systems/ --internal-only
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

| Feature | /quick-styleguide | /qmd-styleguide |
|---------|------------------|------------------|
| **Scope** | Top 12 + Critical (~40 rules) | All 18 sections (200+ rules) |
| **Speed** | 10-15 seconds | 30-60 seconds |
| **Tokens** | ~2,000 | ~5,000-8,000 |
| **Cost** | Low | Moderate |
| **Best For** | Daily workflow | Pre-publication |
| **Auto-fix** | Yes | Yes |

Run skills with the Skill tool or by name (e.g., "/review-doc", "/quick-styleguide").