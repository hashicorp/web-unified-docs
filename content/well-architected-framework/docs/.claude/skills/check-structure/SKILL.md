---
name: check-structure
description: Validate WAF document structure including Why sections, list introductions, workflow connections, and document ending order.
argument-hint: <file-paths> [--fix]
disable-model-invocation: true
---

# Check Structure Skill

## Arguments

- **file-paths**: One or more `.mdx` files (required)
- **--fix** / **-f**: Auto-fix structural issues
- **--report-only** / **-r**: Report without changes

## Checks

### 1. "Why [Topic]" Section [PARTIAL AUTO-FIX]
**Required:** "Why [topic]" heading, 3-4 **Bold challenge:** statements, each describing business/operational impact, closing paragraph explaining how topic addresses them.

Bad: `## Why use modules` with plain prose paragraphs.
Good: `## Why use modules` followed by `**Reduce code duplication:** Teams copy infrastructure code across projects, creating maintenance burden.` (×3-4 items)

### 2. List Introductions with "the following" [AUTO-FIX]
All lists must be preceded by "the following". Exception: HashiCorp/External resources sections.

Bad: `Consider these approaches:` / `HCP Terraform includes key features:`
Good: `Consider the following approaches:` / `HCP Terraform includes the following key features:`

### 3. Workflow Connections in Body Text [MANUAL]
Body text must explicitly link related WAF documents.

Bad: Two adjacent sections with no connection.
Good: `After [packaging your application](/path), deploy these artifacts using Terraform...`

### 4. Document Ending Structure [AUTO-FIX]
Correct order: HashiCorp resources → External resources (optional) → Next steps.

### 5. Heading Capitalization — Sentence Case [AUTO-FIX]
Bad: `## Version Control Best Practices` / `## Getting Started With Terraform`
Good: `## Version control best practices` / `## Getting started with Terraform`
Exceptions: Proper nouns (Terraform, AWS), acronyms (SSO, OIDC)

### 6. No Vague Pronouns at Sentence Start [MANUAL]
Bad: `This improves security.` / `It enables rollbacks.` / `That reduces risk.`
Good: `Module versioning improves security.` / `Immutable containers enable rollbacks.`

### 7. Bold Title Format with Colon Inside [AUTO-FIX]
Bad: `**Eliminate drift** - Manual steps cause issues.`
Good: `**Eliminate drift:** Manual steps cause issues.`

### 8. Document Structure Pattern [MANUAL]
Expected order: intro paragraphs → Why section → implementation sections → HashiCorp resources → External resources → Next steps.
