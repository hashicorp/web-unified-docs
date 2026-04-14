---
name: skill-advisor
description: Context-aware skill recommendation system that suggests the right skill for detected issues and provides usage guidance
argument-hint: <file-paths> [--auto-suggest] [--explain]
---

# Skill Advisor

Analyzes documents, detects issues, and recommends the right skills to fix them.

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--auto-suggest** / **-a**: Auto-suggest skills during analysis
- **--explain** / **-e**: Detailed explanations for recommendations
- **--issue-type** / **-i**: Filter by `structure`, `code`, `resources`, `style`, `links`
- **--workflow** / **-w**: `new-doc`, `pre-commit`, `review`, `maintenance`
- **--priority**: High-priority recommendations only

## Issue → Skill Mapping

| Issue | Primary Skill | Auto-Fixable |
|-------|---------------|--------------|
| Missing Why section | `/check-structure` | Partial |
| Vague pronouns | `/check-structure` | Yes |
| List introductions | `/check-structure` | Yes |
| Heading case | `/check-structure` | Yes |
| Code examples incomplete | `/check-code-examples` | No |
| Code missing summaries | `/check-code-examples` | Partial |
| Resource links < 5 | `/check-resources`, `/add-resources` | Partial |
| Link formatting | `/check-resources` | Yes |
| Active/present tense | `/quick-styleguide` | Yes |
| Word choice (allows/enables) | `/quick-styleguide` | Yes |
| Abbreviations (TF, TFC) | `/quick-styleguide` | Yes |
| Persona imbalance | `/persona-coverage` | No |
| Missing cross-references | `/smart-cross-reference` | Partial |
| Overall health | `/doc-health-dashboard` | No |
| Content outdated | `/content-freshness` | No |

## Workflow → Skill Sequences

**New document:**
1. `/create-doc` → 2. `/check-structure` (during writing) → 3. `/check-code-examples` → 4. `/add-resources` → 5. `/smart-cross-reference` → 6. `/quick-styleguide --fix` → 7. `/review-doc`

**Pre-commit:**
1. `/check-structure --fix` → 2. `/quick-styleguide --fix` → 3. `/check-resources`

**Full review:**
1. `/doc-health-dashboard` → 2. `/review-doc` → 3. `/doc-health-dashboard` (verify)

**Quarterly maintenance:**
1. `/doc-health-dashboard` → 2. `/content-freshness` → 3. `/smart-cross-reference --detect-orphans`
