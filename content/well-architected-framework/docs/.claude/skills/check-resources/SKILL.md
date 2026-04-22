---
name: check-resources
description: Validate HashiCorp and External resources sections for proper formatting, link descriptions, and organization.
argument-hint: <file-paths> [--fix]
---

# Check Resources Skill

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--fix** / **-f**: Auto-fix resource formatting issues
- **--report-only** / **-r**: Report without changes

## Checks

### 1. Link Description Patterns [PARTIAL AUTO-FIX]
Verbs OUTSIDE brackets, context in sentence, no dashes after links.

Bad: `[Learn about Terraform state]` / `"Read the [doc] - comprehensive guide"`
Good: `Learn about [Terraform state] for backend configuration` / `Read the [doc] for comprehensive features`

### 2. Split Combined Links [MANUAL]
Each link on its own bullet. Bad: `Learn X with the [docs] and [tutorials]`.

### 3. Context Placement [AUTO-FIX]
No dashes after links. `"Read the [doc] - for resource syntax"` → `"Read the [doc] for resource syntax"`

### 4. Specific vs Generic Link Text [MANUAL]
Bad: `Browse [tutorials] for additional examples` / `Check out the [guide]`
Good: `Explore [Kubernetes tutorials] for deployment patterns` / `Follow the [installation guide] to deploy Vault`

### 5. Resource Section Organization [MANUAL]
Flat structure: links are similar, single tool, under 8 links. Grouped with subheadings: multiple products, distinct categories, 8+ links. Subheading format: `Packer for containers:` (NOT `### Packer for containers`).

### 6. Standard Link Description Patterns [PARTIAL AUTO-FIX]
- Docs: `Read the [Tool documentation] for comprehensive features`
- Tutorials: `Get started with [Tool tutorials] for hands-on examples`
- Features: `Learn about [Feature] for [specific benefit]`
- Providers: `Read the [Provider documentation] for [resource type]`

### 7. Link Count [MANUAL]
Minimum 5+ specific HashiCorp links. More for multi-tool documents (8-12+).

### 8. WAF Cross-References First [PARTIAL AUTO-FIX]
Related WAF documents appear first in HashiCorp resources section.

### 9. Section Naming [MANUAL]
Beginner: `Get started with [Tool]`. Intermediate: `[Tool] core concepts`. Advanced: `[Tool] advanced features`.
