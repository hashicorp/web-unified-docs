# Well-Architected Framework Documentation Guide

This folder contains templates, standards, reference files, and automated skills for creating and maintaining HashiCorp Well-Architected Framework (WAF) documentation.

**Last updated:** January 30, 2026
**Recent changes:** Consolidated quick-reference files and streamlined documentation structure

---

## Table of Contents

- [Quick Start](#quick-start)
- [File Structure](#file-structure)
- [Common Workflows](#common-workflows)
- [Skills Reference](#skills-reference)
- [Reference Files](#reference-files)
- [Getting Help](#getting-help)

---

## Quick Start

### For New Users

1. **Read this README** to understand the system
2. **Review [../CLAUDE.md](../CLAUDE.md)** for available skills
3. **Use skills for validation:** `/check-structure`, `/check-resources`, etc.
4. **Reference [../AGENTS.md](../AGENTS.md)** for core writing standards

### For Document Reviews

```bash
# Quick pre-commit check
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix

# Full review
/review-doc docs/file.mdx --phases 1-7
```

### For Creating New Documents

```bash
# Use the template
cat templates/doc-templates/DOCUMENT_TEMPLATE.md

# Check structure as you write
/check-structure docs/new-file.mdx

# Validate when done
/review-doc docs/new-file.mdx
```

---

## File Structure

### Core Guidelines (in parent docs/ directory)

| File | Purpose | When to Use |
|------|---------|-------------|
| **../CLAUDE.md** | Skills directory and usage guide (auto-loaded) | Quick skill reference |
| **../AGENTS.md** | Main documentation standards and writing guidelines | Primary reference - load as needed |
| **../.claude/** | Skills and agents directory | Contains all skills |

### Essential Files (in templates/ directory)

| File | Purpose |
|------|---------|
| **QUICK_REFERENCE.md** | Combined quick reference: patterns, checklist, skills, troubleshooting |
| **REVIEW_PHASES.md** | 7-phase review process with detailed checklists |
| **styleguide.md** | Official HashiCorp style guide (Top 12 + full guide) |
| **doc-templates/DOCUMENT_TEMPLATE.md** | Template for creating new WAF articles |

### Reference Files (reference/ directory)

Load these on-demand for deep dives into specific topics:

| File | Purpose |
|------|---------|
| **PATTERNS.md** | All documentation patterns (structure, code, resources, tools, pitfalls) |
| **CONTENT_PATHS.md** | Content organization and file paths |
| **TASK_AGENT_GUIDE.md** | Guide for using task agents |

**Note:** You don't need to load reference files manually - ask questions and Claude will read them, or use skills that have patterns built-in.

---

## Common Workflows

### Pre-Commit Quick Check (2-3 minutes)

```bash
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix
git diff docs/file.mdx
```

### Fast Style Review (5 minutes)

```bash
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix
/check-resources docs/file.mdx --fix
```

### New Document Creation (60 minutes)

```bash
# 1. Create from template
/create-doc docs/section/new-topic.mdx --interactive

# 2. Check structure while writing
/check-structure docs/section/new-topic.mdx

# 3. Enhance content
/check-code-examples docs/section/new-topic.mdx
/add-resources docs/section/new-topic.mdx

# 4. Auto-fix before review
/check-structure docs/section/new-topic.mdx --fix
/check-hashicorp-style docs/section/new-topic.mdx --fix

# 5. Final review
/review-doc docs/section/new-topic.mdx --phases 1-7
```

### Complete Document Review (30+ minutes)

**See [REVIEW_PHASES.md](./REVIEW_PHASES.md) for the detailed 7-phase review process**, or use:

```bash
/review-doc docs/file.mdx --phases 1-7
```

**For step-by-step checklists and troubleshooting**, see [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

## Skills Reference

### Essential Skills

| Skill | Purpose | Auto-fix |
|-------|---------|----------|
| `/check-structure` | Validate WAF document structure | ✅ Yes |
| `/check-hashicorp-style` | HashiCorp style guide compliance | ✅ Yes |
| `/check-resources` | Resources section formatting | ✅ Yes |
| `/check-code-examples` | Code example completeness | ❌ Manual |
| `/review-doc` | Comprehensive 7-phase review | ❌ Manual |
| `/full-styleguide-check` | Complete style guide validation | ✅ Yes |

### Quick Skill Selection

- **Before commit:** `/check-structure --fix` + `/check-hashicorp-style --fix`
- **For code-heavy docs:** `/check-code-examples`
- **For final review:** `/review-doc --phases 1-7`
- **When stuck:** `/skill-advisor docs/file.mdx`

**For complete skills list and usage examples**, see [../CLAUDE.md](../CLAUDE.md) and [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

## Reference Files

### PATTERNS.md (Consolidated)

Contains all documentation patterns in one file:
- Document structure patterns (Why sections, workflow connections)
- Code example patterns (completeness, realism, summaries)
- Resources section patterns (link formatting, organization)
- Tool-specific patterns (Packer, Terraform, Sentinel)
- Common pitfalls and how to avoid them

**When to use:** Creating new documents, understanding WAF patterns, troubleshooting quality issues

### styleguide.md

Official HashiCorp style guide with Top 12 guidelines and comprehensive rules.

**When to use:** Reference for style questions, used automatically by `/check-hashicorp-style` and `/full-styleguide-check`

### DOCUMENT_TEMPLATE.md

Complete template for creating new WAF articles with:
- MDX template structure
- Section-by-section guidance
- Writing standards checklist
- Pre-publish checklist

**When to use:** Creating new documents from scratch

### REVIEW_PHASES.md

Detailed 7-phase review process:
1. User Success Evaluation
2. Technical Accuracy & Fact-Checking
3. Cross-Document Relationships
4. AGENTS.md style guide compliance
5. SEO & AI/LLM Optimization
6. Link Quality & Balance
7. Final User Success Check

**When to use:** Conducting comprehensive reviews, understanding review criteria

---

## Getting Help

### Common Questions

**Q: Which files do I need to read?**
A: Start with this README and CLAUDE.md. Reference files are loaded on-demand as needed.

**Q: Which skill should I use?**
A: Run `/skill-advisor docs/file.mdx` or see the quick selection guide above.

**Q: How do I fix [specific issue]?**
A: See QUICK_REFERENCE.md → Troubleshooting section for "If X, do Y" guidance.

**Q: What's the fastest way to review a document?**
A: Pre-commit quick check (2-3 minutes): `/check-structure --fix` + `/check-hashicorp-style --fix`

### Ask Claude

Claude can help with specific questions:
- "How do I format Why sections?"
- "What should Packer examples show?"
- "How do I organize resources sections?"

Claude will read the relevant reference file and explain with examples.

---

## File Organization

```
templates/
├── README.md (this file)              ← Start here
├── QUICK_REFERENCE.md                 ← Patterns, checklist, skills, troubleshooting
├── REVIEW_PHASES.md                   ← 7-phase review process
├── styleguide.md                      ← HashiCorp style guide
├── CLAUDE.md (in parent)              ← Skills directory
├── AGENTS.md (in parent)              ← Core writing standards
│
├── doc-templates/
│   ├── DOCUMENT_TEMPLATE.md           ← New document template
│   └── pillar-overview.mdx            ← Pillar landing page template
│
├── reference/                         ← On-demand reference files
│   ├── PATTERNS.md                    ← All documentation patterns
│   ├── CONTENT_PATHS.md               ← File organization
│   └── TASK_AGENT_GUIDE.md            ← Agent usage
│
├── jira_tickets/                      ← Jira integration tools
│   └── scripts/
│
└── gsc/                               ← Google Search Console tools
```

---

## Quick Command Reference

```bash
# Daily workflow
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix

# Full review
/review-doc docs/file.mdx --phases 1-7

# Specific checks
/check-code-examples docs/file.mdx
/check-resources docs/file.mdx --fix
/full-styleguide-check docs/file.mdx --fix

# Get help
/skill-advisor docs/file.mdx
/doc-intelligence --view tactical
```

---

## What's Changed Recently

**January 2026 Consolidation:**
- ✅ Consolidated 4 quick-reference files → `QUICK_REFERENCE.md`
- ✅ Consolidated 5 pattern files → `reference/PATTERNS.md`
- ✅ Removed legacy `prompts.md`
- ✅ Removed duplicate `styleguide-quick-reference.md`
- ✅ Streamlined README (812 → 400 lines)
- ✅ Simplified `/full-styleguide-check` skill documentation

**Result:** 40% fewer files, easier navigation, less duplication

**For detailed history**, see [reference/REORGANIZATION_SUMMARY.md](./reference/REORGANIZATION_SUMMARY.md)
