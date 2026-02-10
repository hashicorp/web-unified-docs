---
name: check-consistency
description: Ensure terminology, naming, and style consistency across WAF documents. Critical for maintaining unified voice and professional documentation.
argument-hint: <directory-path> [--fix]
disable-model-invocation: true
---

# Check Consistency Skill

Ensures terminology, naming conventions, and style consistency across WAF documentation. Critical for maintaining unified voice and professional documentation standards.

## Usage

```bash
/check-consistency <directory-path> [options]
```

## Arguments

- **directory-path**: Directory to check for consistency (required)
  - Single directory: `/check-consistency docs/define/`
  - Entire docs: `/check-consistency docs/`
  - Specific section: `/check-consistency docs/secure-systems/`

- **--fix** or **-f**: Automatically fix consistency issues
- **--report-only** or **-r**: Generate report without changes
- **--category** or **-c**: Check specific category (optional)
  - Values: `terminology`, `product-names`, `capitalization`, `formatting`, `all` (default)
  - Example: `--category terminology`

- **--strict**: Enable strict mode (flags more potential issues)
- **--create-glossary**: Generate terminology glossary from findings

## What This Skill Checks

### 1. **Product Name Consistency**

**Rule:** HashiCorp product names must be consistent

**Common Issues:**
- ❌ "TF" → ✅ "Terraform"
- ❌ "TFC" → ✅ "HCP Terraform"
- ❌ "TFE" → ✅ "Terraform Enterprise"
- ❌ "Hashicorp" → ✅ "HashiCorp"
- ❌ "Packer.io" → ✅ "Packer"
- ❌ "Vault OSS" → ✅ "Vault" or "Vault Community Edition"

**Auto-fixable:** Yes

---

### 2. **Terminology Consistency**

**Rule:** Use consistent terms for same concepts across all documents

**Common Inconsistencies:**

| ❌ Inconsistent | ✅ Preferred Term | Context |
|----------------|------------------|---------|
| "workload" / "application" / "service" | "application" | When referring to deployed software |
| "infrastructure code" / "IaC" / "infrastructure as code" | "infrastructure as code" (first use), then "IaC" | Consistency in abbreviation |
| "pipeline" / "CI/CD pipeline" / "deployment pipeline" | "CI/CD pipeline" | Automation workflows |
| "environment" / "workspace" / "deployment target" | "environment" | Deployment contexts |
| "module" / "component" / "package" | "module" | Terraform reusable code |
| "secret" / "credential" / "sensitive data" | "secret" | Vault-managed data |
| "policy" / "rule" / "governance policy" | "policy" | Sentinel/OPA policies |
| "state" / "state file" / "Terraform state" | "state" or "Terraform state" | Terraform state management |

**Auto-fixable:** Partial (requires context)

---

### 3. **Capitalization Consistency**

**Rule:** Consistent capitalization for technical terms

**Common Issues:**
- ❌ "Api" / "api" → ✅ "API"
- ❌ "Cli" / "cli" → ✅ "CLI"
- ❌ "Json" / "json" → ✅ "JSON"
- ❌ "Yaml" / "yaml" → ✅ "YAML"
- ❌ "Ssh" / "ssh" → ✅ "SSH"
- ❌ "Tls" / "tls" → ✅ "TLS"
- ❌ "Oidc" / "oidc" → ✅ "OIDC"
- ❌ "Sso" / "sso" → ✅ "SSO"
- ❌ "Aws" / "aws" → ✅ "AWS"
- ❌ "Gcp" / "gcp" → ✅ "GCP"

**Auto-fixable:** Yes

---

### 4. **Formatting Consistency**

**Rule:** Consistent formatting for similar elements

**Common Issues:**

**Code references:**
- ❌ Mixed: `terraform`, "terraform", terraform
- ✅ Consistent: `terraform` (inline code)

**File paths:**
- ❌ Mixed: `main.tf`, "main.tf", main.tf
- ✅ Consistent: `main.tf` (inline code)

**Commands:**
- ❌ Mixed: `terraform apply`, "terraform apply"
- ✅ Consistent: `terraform apply` (inline code)

**Variables:**
- ❌ Mixed: `var.name`, "var.name", var.name
- ✅ Consistent: `var.name` (inline code)

**Auto-fixable:** Yes

---

### 5. **Heading Style Consistency**

**Rule:** Consistent heading patterns across documents

**Common Issues:**
- ❌ Mixed: "Why use X" / "Why X" / "Benefits of X"
- ✅ Consistent: "Why [topic]"

- ❌ Mixed: "Getting Started" / "Get started" / "Start here"
- ✅ Consistent: "Getting started"

- ❌ Mixed: "Best Practices" / "Best practices" / "Recommendations"
- ✅ Consistent: "Best practices"

**Auto-fixable:** Partial

---

### 6. **Voice and Tense Consistency**

**Rule:** Consistent voice and tense across documents

**Common Issues:**
- ❌ Mixed: "you can" / "users can" / "one can"
- ✅ Consistent: "you can" (second person)

- ❌ Mixed: "will create" / "creates" / "is creating"
- ✅ Consistent: "creates" (present tense)

- ❌ Mixed: "allows" / "enables" / "lets"
- ✅ Consistent: "lets" (per HashiCorp style guide)

**Auto-fixable:** Yes (per HashiCorp style guide)

---

### 7. **List Format Consistency**

**Rule:** Consistent list formatting

**Common Issues:**
- ❌ Mixed: Some lists with periods, some without
- ✅ Consistent: No periods for single-line items, periods for multi-line

- ❌ Mixed: Some lists with "the following", some without
- ✅ Consistent: All lists preceded by "the following"

**Auto-fixable:** Yes

---

### 8. **Link Description Consistency**

**Rule:** Consistent link description patterns

**Common Issues:**
- ❌ Mixed: "Learn more" / "Read more" / "See documentation"
- ✅ Consistent: Specific action verbs (Learn, Explore, Configure, etc.)

- ❌ Mixed: Verbs inside/outside brackets
- ✅ Consistent: Verbs outside brackets

**Auto-fixable:** Yes

---

## Output Format

```
Consistency Check Report
========================

Directory: docs/
Files Scanned: 47
Issues Found: 156
Auto-fixable: 98
Manual Review: 58

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRODUCT NAME CONSISTENCY (12 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Inconsistent: "TF" (found 8 times)
  📄 docs/define/modules.mdx (line 45)
  📄 docs/define/workflows.mdx (line 67, 89)
  📄 docs/automate/cicd.mdx (line 23, 45, 78, 102, 134)
  ✅ Should be: "Terraform"
  [AUTO-FIX AVAILABLE]

❌ Inconsistent: "TFC" (found 4 times)
  📄 docs/define/as-code/infrastructure.mdx (line 156)
  📄 docs/automate/cicd.mdx (line 234)
  📄 docs/process-automation/gitops.mdx (line 89, 123)
  ✅ Should be: "HCP Terraform"
  [AUTO-FIX AVAILABLE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TERMINOLOGY CONSISTENCY (34 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ Inconsistent: "workload" vs "application"
  Used "workload": 12 times across 5 files
  Used "application": 45 times across 23 files
  
  💡 RECOMMENDATION: Standardize on "application"
  
  Files using "workload":
  📄 docs/deploy/atomic-deployments.mdx (3 occurrences)
  📄 docs/monitor/setup-monitoring-agents/containers.mdx (4 occurrences)
  📄 docs/secure-systems/infrastructure/prevent-lateral-movement.mdx (5 occurrences)
  
  [MANUAL REVIEW - Context dependent]

⚠️ Inconsistent: "pipeline" vs "CI/CD pipeline"
  Used "pipeline": 28 times across 12 files
  Used "CI/CD pipeline": 15 times across 8 files
  
  💡 RECOMMENDATION: Use "CI/CD pipeline" for clarity
  
  [MANUAL REVIEW - Context dependent]

❌ Inconsistent: "infrastructure code" vs "IaC" vs "infrastructure as code"
  Used "infrastructure code": 18 times
  Used "IaC": 12 times (without first defining)
  Used "infrastructure as code": 8 times
  
  ✅ STANDARD: Use "infrastructure as code" on first mention, then "IaC"
  
  Files missing first definition:
  📄 docs/define/workflows.mdx (uses "IaC" without defining)
  📄 docs/automate/testing.mdx (uses "IaC" without defining)
  
  [AUTO-FIX AVAILABLE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CAPITALIZATION CONSISTENCY (23 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Inconsistent: "api" / "Api" / "API"
  Found "api": 15 times
  Found "Api": 3 times
  Found "API": 45 times
  
  ✅ Should be: "API" (always uppercase)
  
  Files with incorrect capitalization:
  📄 docs/secure-systems/identity-access-management/centralize-identity-management.mdx
     Line 67: "api endpoints" → "API endpoints"
     Line 89: "rest api" → "REST API"
  
  [AUTO-FIX AVAILABLE]

❌ Inconsistent: "json" / "Json" / "JSON"
  Found "json": 8 times
  Found "JSON": 34 times
  
  ✅ Should be: "JSON" (always uppercase)
  
  [AUTO-FIX AVAILABLE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORMATTING CONSISTENCY (45 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Inconsistent code formatting: "terraform" vs `terraform`
  Found plain text: 23 times
  Found inline code: 67 times
  
  ✅ Should be: `terraform` (inline code for commands/tools)
  
  Files with plain text:
  📄 docs/define/modules.mdx (line 45, 78, 102)
  📄 docs/automate/cicd.mdx (line 23, 56, 89, 123)
  
  [AUTO-FIX AVAILABLE]

❌ Inconsistent file path formatting
  Found plain text: 12 times
  Found inline code: 45 times
  
  ✅ Should be: `main.tf` (inline code for file paths)
  
  [AUTO-FIX AVAILABLE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HEADING STYLE CONSISTENCY (18 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ Inconsistent "Why" section titles:
  "Why use X": 12 documents
  "Why X": 8 documents
  "Benefits of X": 3 documents
  
  ✅ STANDARD: "Why [topic]" (per AGENTS.md)
  
  Files needing update:
  📄 docs/define/workflows.mdx: "Benefits of workflows" → "Why workflows"
  📄 docs/secure-systems/data/classify-data.mdx: "Why classify data" → "Why data classification"
  
  [MANUAL REVIEW - Ensure topic name consistency]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VOICE AND TENSE CONSISTENCY (24 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Inconsistent: "allows" / "enables" vs "lets"
  Found "allows": 18 times
  Found "enables": 12 times
  Found "lets": 45 times
  
  ✅ Should be: "lets" (per HashiCorp style guide)
  
  Files needing update:
  📄 docs/secure-systems/secrets/rotate-secrets.mdx (line 67): "allows you" → "lets you"
  📄 docs/define/modules.mdx (line 89): "enables teams" → "lets teams"
  
  [AUTO-FIX AVAILABLE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TERMINOLOGY GLOSSARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recommended standard terms for WAF documentation:

| Concept | Preferred Term | Usage Count | Alternatives Found |
|---------|---------------|-------------|-------------------|
| Deployed software | "application" | 45 | "workload" (12), "service" (8) |
| Automation workflow | "CI/CD pipeline" | 15 | "pipeline" (28) |
| Terraform code | "infrastructure as code" → "IaC" | 26 | "infrastructure code" (18) |
| Deployment context | "environment" | 67 | "workspace" (12) |
| Reusable code | "module" | 89 | "component" (5) |
| Vault data | "secret" | 78 | "credential" (15) |
| Governance | "policy" | 56 | "rule" (8) |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Issues: 156
  ├─ Auto-fixable: 98 (63%)
  └─ Manual Review: 58 (37%)

By Category:
  ├─ Product names: 12 issues (all auto-fixable)
  ├─ Terminology: 34 issues (8 auto-fixable, 26 manual)
  ├─ Capitalization: 23 issues (all auto-fixable)
  ├─ Formatting: 45 issues (all auto-fixable)
  ├─ Heading style: 18 issues (manual review)
  └─ Voice/tense: 24 issues (all auto-fixable)

Priority Actions:
1. 🔴 High: Fix product name inconsistencies (12 issues)
2. 🔴 High: Standardize capitalization (23 issues)
3. 🟡 Medium: Fix formatting inconsistencies (45 issues)
4. 🟡 Medium: Standardize voice/tense (24 issues)
5. 🟢 Low: Review terminology choices (34 issues)

Run with --fix to apply 98 automatic corrections.
Run with --create-glossary to generate terminology guide.
```

## Common Fixes

### Fix Product Names

**Before:**
```markdown
Configure TF to use TFC for remote state management.
```

**After:**
```markdown
Configure Terraform to use HCP Terraform for remote state management.
```

### Fix Capitalization

**Before:**
```markdown
The api uses json for data exchange over https.
```

**After:**
```markdown
The API uses JSON for data exchange over HTTPS.
```

### Fix Terminology

**Before (Inconsistent):**
```markdown
File A: "Deploy your workload to production"
File B: "Deploy your application to production"
File C: "Deploy your service to production"
```

**After (Consistent):**
```markdown
All files: "Deploy your application to production"
```

### Fix Formatting

**Before:**
```markdown
Run terraform apply to create resources in main.tf.
```

**After:**
```markdown
Run `terraform apply` to create resources in `main.tf`.
```

### Fix Voice/Tense

**Before:**
```markdown
Vault enables you to manage secrets. The API allows users to authenticate.
```

**After:**
```markdown
Vault lets you manage secrets. The API lets users authenticate.
```

## Examples

### Check entire documentation
```bash
/check-consistency docs/
```

### Check and auto-fix
```bash
/check-consistency docs/ --fix
```

### Check specific category
```bash
/check-consistency docs/ --category terminology
```

### Generate terminology glossary
```bash
/check-consistency docs/ --create-glossary
```

### Strict mode (more issues flagged)
```bash
/check-consistency docs/ --strict
```

## Integration with Other Skills

**Complete consistency workflow:**
```bash
# 1. Check consistency
/check-consistency docs/

# 2. Auto-fix what's possible
/check-consistency docs/ --fix

# 3. Review manual items
# (Manual review and fixes)

# 4. Validate changes
/check-hashicorp-style docs/**/*.mdx

# 5. Check for duplicates
/find-duplicates docs/
```

**Pre-release checklist:**
```bash
# Ensure consistency before release
/check-consistency docs/ --fix
/check-hashicorp-style docs/**/*.mdx --fix
/validate-links docs/**/*.mdx
```

## When to Use This Skill

Use `/check-consistency` when:
- ✅ **Monthly documentation audits** (critical for WAF)
- ✅ After multiple contributors add content
- ✅ Before major documentation releases
- ✅ When onboarding new documentation writers
- ✅ After terminology changes or rebranding
- ✅ When consolidating documentation sections

Don't use when:
- ❌ Need full document review (use `/review-doc`)
- ❌ Checking technical accuracy (use `/review-doc --phases 2`)

## Performance

Typical execution times:
- Small section (10 files): ~45 seconds
- Medium section (30 files): ~2 minutes
- Entire docs (50+ files): ~4 minutes

## Reference

This skill validates against:
- **AGENTS.md** - Writing standards and terminology
- **styleguide.md** - HashiCorp style guide
- **REVIEW_PHASES.md** - Phase 4: Style Guide Compliance

## Best Practices

**Monthly audit:**
```bash
# Full consistency check
/check-consistency docs/ --create-glossary
```

**After team contributions:**
```bash
# Check and fix common issues
/check-consistency docs/ --fix
```

**Before release:**
```bash
# Strict mode for final check
/check-consistency docs/ --strict --fix
```

**Create terminology guide:**
```bash
# Generate glossary for team
/check-consistency docs/ --create-glossary > TERMINOLOGY.md
```

## Notes

- **Critical for WAF:** Ensures all documents use similar terms
- Product name consistency is auto-fixable
- Terminology choices may require team discussion
- Glossary generation helps establish standards
- Compatible with HashiCorp style guide
- Supports team collaboration and onboarding
- Reduces confusion for readers
- Improves professional appearance
- Essential for multi-author documentation