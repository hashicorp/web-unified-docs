# WAF Documentation Skills - Quick Reference

**Print this page for quick access to common commands**

---

## 🚀 Daily Quick Checks (2-3 minutes)

```bash
# Before committing changes
/check-structure docs/file.mdx --fix
/check-hashicorp-style docs/file.mdx --fix
git diff docs/file.mdx  # Visual review
```

---

## 📊 Intelligence & Analysis

| Skill | When to Use | Time |
|-------|-------------|------|
| `/doc-intelligence --view tactical` | Start of day - see what needs fixing | 1 min |
| `/doc-intelligence --view strategic --period 90d` | Weekly review - track trends | 2 min |
| `/skill-advisor docs/file.mdx` | Not sure which skill to use | 1 min |
| `/smart-cross-reference docs/file.mdx` | Check document connections | 2 min |

---

## ✅ Validation Skills (Auto-Fixable)

| Skill | Fixes | Command |
|-------|-------|---------|
| **Structure** | Vague pronouns, heading case, list intros | `/check-structure docs/file.mdx --fix` |
| **Style** | Voice, tense, word choice, abbreviations | `/check-hashicorp-style docs/file.mdx --fix` |
| **Resources** | Link formatting, verb placement | `/check-resources docs/file.mdx --fix` |
| **Links** | Broken links, redirects | `/fix-links docs/file.mdx` |

---

## 🔍 Validation Skills (Manual Review)

| Skill | Checks | Command |
|-------|--------|---------|
| **Code Examples** | Completeness, summaries, realistic values | `/check-code-examples docs/file.mdx` |
| **Persona Coverage** | Decision-maker vs implementer balance | `/persona-coverage docs/file.mdx` |
| **Content Freshness** | Outdated content, version references | `/content-freshness docs/file.mdx` |
| **Cross-References** | Workflow connections, orphans | `/smart-cross-reference docs/file.mdx --full-analysis` |

---

## 📝 Document Creation Workflow

```bash
# 1. Create from template (5 min)
/create-doc docs/section/new-topic.mdx --interactive

# 2. Check structure while writing (every 15 min)
/check-structure docs/section/new-topic.mdx

# 3. After draft - enhance content (15 min)
/check-code-examples docs/section/new-topic.mdx
/add-resources docs/section/new-topic.mdx
/smart-cross-reference docs/section/new-topic.mdx

# 4. Before review - auto-fix (2 min)
/check-structure docs/section/new-topic.mdx --fix
/check-hashicorp-style docs/section/new-topic.mdx --fix

# 5. Final review (15 min)
/review-doc docs/section/new-topic.mdx --phases 1-7

# 6. Verify (1 min)
/doc-intelligence --view tactical
```

**Total Time: ~60 minutes**

---

## 🔄 Review Workflows

### Pre-Commit (2-3 minutes)
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

### Full Review (30+ minutes)
```bash
/review-doc docs/file.mdx --phases 1-7
```

### Quarterly Maintenance
```bash
/doc-intelligence --view strategic --period 90d
/content-freshness docs/**/*.mdx
/smart-cross-reference docs/**/*.mdx --detect-orphans
/validate-links docs/**/*.mdx
```

---

## 🎯 Common Issues → Quick Fixes

| Issue | Quick Fix | Time |
|-------|-----------|------|
| Vague pronouns ("This", "It") | `/check-structure --fix` | <1 min |
| Wrong heading case | `/check-structure --fix` | <1 min |
| Missing "the following" | `/check-structure --fix` | <1 min |
| Passive voice | `/check-hashicorp-style --fix` | 1 min |
| "Will" (future tense) | `/check-hashicorp-style --fix` | 1 min |
| "Allows/enables" | `/check-hashicorp-style --fix` | 1 min |
| Abbreviations (TF, TFC) | `/check-hashicorp-style --fix` | 1 min |
| Link formatting | `/check-resources --fix` | 1 min |
| Broken links | `/fix-links docs/file.mdx` | 2 min |
| Missing Why section | Manual - see DOCUMENT_PATTERNS.md | 15 min |
| Code example incomplete | Manual - see CODE_PATTERNS.md | 20 min |
| < 5 resource links | `/add-resources docs/file.mdx` | 10 min |
| Persona imbalance | Manual - add missing content | 20 min |

---

## 💡 Pro Tips

**Combine skills for efficiency:**
```bash
# Fix all auto-fixable issues at once
/check-structure docs/file.mdx --fix && \
/check-hashicorp-style docs/file.mdx --fix && \
/check-resources docs/file.mdx --fix
```

**Use skill-advisor when stuck:**
```bash
/skill-advisor docs/file.mdx --auto-suggest
```

**Check health before starting work:**
```bash
/doc-intelligence --view tactical
```

**Preview changes before applying:**
```bash
/smart-cross-reference docs/file.mdx --auto-link --dry-run
```

---

## 📚 Quick Links

- **Full Guidelines:** [AGENTS.md](../AGENTS.md)
- **Review Process:** [REVIEW_PHASES.md](../REVIEW_PHASES.md)
- **Style Guide:** [styleguide.md](../styleguide.md)
- **Document Template:** [doc-templates/DOCUMENT_TEMPLATE.md](../doc-templates/DOCUMENT_TEMPLATE.md)
- **All Skills:** [CLAUDE.md](../../CLAUDE.md)

---

## 🆘 Getting Help

**Ask Claude:**
- "How do I format Why sections?"
- "What should Packer examples show?"
- "How do I organize resources sections?"

**Use skill-advisor:**
```bash
/skill-advisor docs/file.mdx --explain
```

**Check examples:**
- Good documents: Run `/doc-intelligence --view tactical` and look at "Excellent Documents"
- Pattern files: `templates/reference/*.md`

---

**Last Updated:** January 29, 2026
**Print this page:** File → Print → Save as PDF