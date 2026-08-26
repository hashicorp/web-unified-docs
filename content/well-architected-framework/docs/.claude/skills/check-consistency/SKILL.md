---
name: check-consistency
description: Ensure terminology, naming, and style consistency across WAF documents. Critical for maintaining unified voice and professional documentation.
argument-hint: <directory-path> [--fix]
---

# Check Consistency Skill

## Arguments

- **directory-path**: Directory to check (required)
- **--fix** / **-f**: Automatically fix consistency issues
- **--report-only** / **-r**: Report without changes
- **--category** / **-c**: `terminology`, `product-names`, `capitalization`, `formatting`, `all` (default)
- **--strict**: Flag more potential issues
- **--create-glossary**: Generate terminology glossary

## Checks

### 1. Product Name Consistency [AUTO-FIX]
- "TF" → "Terraform"
- "TFC" → "HCP Terraform"
- "TFE" → "Terraform Enterprise"
- "Hashicorp" → "HashiCorp"
- "Packer.io" → "Packer"
- "Vault OSS" → "Vault Community Edition"

### 2. Terminology Consistency [PARTIAL AUTO-FIX]
Preferred terms: "application" (not workload/service), "CI/CD pipeline" (not pipeline alone), "infrastructure as code" then "IaC", "environment" (not workspace), "module" (not component), "secret" (not credential), "policy" (not rule), "state" or "Terraform state"

### 3. Capitalization Consistency [AUTO-FIX]
API, CLI, JSON, YAML, SSH, TLS, OIDC, SSO, AWS, GCP always uppercase.

### 4. Formatting Consistency [AUTO-FIX]
Commands, file paths, variables in inline code: `terraform apply`, `main.tf`, `var.name`

### 5. Heading Style Consistency [PARTIAL AUTO-FIX]
Standard patterns: "Why [topic]" (not "Benefits of X" or "Why use X")

### 6. Voice and Tense Consistency [AUTO-FIX]
- "allows/enables" → "lets"
- "will create" → "creates"
- "users can" → "you can"

### 7. List Format Consistency [AUTO-FIX]
All lists preceded by "the following"; consistent period usage.

### 8. Link Description Consistency [AUTO-FIX]
Verbs outside brackets; consistent action verbs (Learn, Explore, Configure).
