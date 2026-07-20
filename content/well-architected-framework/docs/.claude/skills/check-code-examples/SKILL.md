---
name: check-code-examples
description: Validate code examples have summaries, are complete, use realistic values, and follow WAF patterns for Terraform, Packer, and other tools.
argument-hint: <file-paths> [--fix]
---

# Check Code Examples Skill

Validates code examples against AGENTS.md standards.

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--fix**: Add placeholder summaries where missing (partial auto-fix only)
- **--report-only**: Report without changes

## Rules

### 1. Code block summaries [AUTO-FIX: Partial]
Each code block needs 1-2 sentences after it explaining what it does, what it produces, and why it matters. Placeholder summaries added by `--fix` require manual review.

### 2. Complete examples, not empty templates [MANUAL]
Packer build blocks must have provisioners and post-processors. No empty builds showing only source blocks.

### 3. Realistic values [MANUAL]
Use data sources for dynamic values instead of hardcoded placeholders:
- Bad: `ami = "ami-12345678"`
- Good: `ami = data.aws_ami.packer_image.id` (with data source that queries by tag)

### 4. Packer requirements [MANUAL]
Must include: `provisioner "file"` or `provisioner "shell"` (copies/installs app), post-processor (docker-tag, manifest), realistic application content.

### 5. Terraform requirements [MANUAL]
Must include: backend config for state management, data sources for dynamic values, resource tags.

### 6. Language tags on all code blocks [AUTO-FIX: Partial]
Every ` ``` ` block must have a language identifier. Auto-detect: `resource`/`data`/`provider` → `hcl`; `vault write`/`terraform` commands → `bash`.

### 7. Code examples when valuable [MANUAL]
Required for implementation guides, how-tos, workflow demos. Not required for strategic overviews or high-level concepts.

## Output

For each code block: report type detected, issues found with line numbers, auto-fixable flag, and specific fix suggestion. Apply placeholder summaries with Edit tool when `--fix` used.
