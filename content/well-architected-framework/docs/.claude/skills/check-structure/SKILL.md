---
name: check-structure
description: Validate WAF document structure including Why sections, list introductions, workflow connections, and document ending order.
argument-hint: <file-paths> [--fix]
disable-model-invocation: true
---

# Check Structure Skill

Validates WAF document structure patterns from AGENTS.md. Ensures proper Why sections, list introductions, workflow connections, and document ending organization.

## Usage

```bash
/check-structure <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to check (required)
  - Single file: `/check-structure docs/prevent.mdx`
  - Multiple files: `/check-structure docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/check-structure docs/**/*.mdx`

- **--fix** or **-f**: Automatically fix structural issues
- **--report-only** or **-r**: Generate report without changes

## What This Skill Checks

### 1. **"Why [Topic]" Section Format**

**Rule:** Include early in document with **Bold challenge:** format and 3-4 challenges

**Bad Example:**
```markdown
## Why use modules

Teams struggle with code duplication.

Inconsistent configurations cause problems.

Modules solve these issues by providing reusable components.
```

**Good Example:**
```markdown
## Why use modules

**Reduce code duplication:** Teams copy infrastructure code across projects, creating maintenance burden and inconsistencies.

**Eliminate configuration drift:** Manual configuration steps introduce differences between environments, causing deployment failures and security gaps.

**Accelerate deployment cycles:** Writing infrastructure from scratch for each project slows development and delays time to market.

**Improve security compliance:** Inconsistent security configurations across teams increase audit failures and expose vulnerabilities.

Modules address these challenges by providing tested, reusable infrastructure components that teams can share across projects.
```

**Requirements:**
- ✅ Section titled "Why [topic]"
- ✅ 3-4 **Bold challenge:** statements
- ✅ Each challenge describes business/operational impact
- ✅ Paragraph after challenges explaining how topic addresses them

**Auto-fixable:** Partial (can fix formatting, not content)

---

### 2. **List Introductions with "the following"**

**Rule:** Lists must be preceded by "the following" somewhere in the introduction

**Bad Examples:**
- ❌ "You can install these packages with Packer:"
- ❌ "Consider these approaches:"
- ❌ "HCP Terraform includes key features:"

**Good Examples:**
- ✅ "You can install the following packages with Packer:"
- ✅ "Consider the following approaches:"
- ✅ "HCP Terraform includes the following key features:"
- ✅ "The following is an example of early design decisions:"

**Exception:** HashiCorp resources and External resources sections (no "the following" needed)

**Auto-fixable:** Yes (add "the following" to list introductions)

---

### 3. **Workflow Connections in Body Text**

**Rule:** Explicitly link related WAF documents showing how topics connect

**Bad Example:**
```markdown
## Package your application

Create container images with Packer.

## Deploy applications

Use Terraform to deploy infrastructure.
```

**Good Example:**
```markdown
## Package your application

Create container images with Packer.

## Deploy applications

After [packaging your application](/path/to/package-doc) into images, deploy these artifacts using Terraform to provision infrastructure and orchestrators to run containers.
```

**Patterns:**
- "After [packaging your application](/link), deploy..."
- "Before you can [deploy](/link), you must [configure](/link)..."
- "Once you have [classified data](/link), implement [encryption](/link)..."

**Auto-fixable:** No (requires understanding workflow relationships)

---

### 4. **Document Ending Structure**

**Rule:** Standard order at document end

**Correct order:**
1. HashiCorp resources
2. External resources (optional)
3. Next steps

**Bad Example:**
```markdown
## Next steps

Read about [related topic](/link).

## HashiCorp resources

- [Tutorial link](/tutorial)
```

**Good Example:**
```markdown
## HashiCorp resources

- Learn [Terraform foundations](/terraform/get-started)
- Read the [Terraform documentation](/terraform/docs)

## External resources

- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected)

## Next steps

In this section, you learned about infrastructure modules. Learn how to [deploy applications](/path) using these modules.
```

**Auto-fixable:** Yes (can reorder sections)

---

### 5. **Heading Capitalization (Sentence Case)**

**Rule:** All headings use sentence case, not Title Case

**Bad Examples:**
- ❌ "## Version Control Best Practices"
- ❌ "## Getting Started With Terraform"
- ❌ "## Implement Infrastructure As Code"

**Good Examples:**
- ✅ "## Version control best practices"
- ✅ "## Getting started with Terraform"
- ✅ "## Implement infrastructure as code"

**Exceptions:**
- Proper nouns: "Terraform", "AWS", "Kubernetes"
- Acronyms: "SSO", "OIDC", "VPN"

**Auto-fixable:** Yes (convert to sentence case)

---

### 6. **No Vague Pronouns at Sentence Start**

**Rule:** Don't start sentences with "This", "That", "It" without clear antecedent

**Bad Examples:**
- ❌ "This improves security across environments."
- ❌ "This approach eliminates configuration drift."
- ❌ "It enables rollbacks to previous versions."
- ❌ "That reduces deployment risk."

**Good Examples:**
- ✅ "Module versioning improves security across environments."
- ✅ "Using data sources eliminates configuration drift."
- ✅ "Immutable containers enable rollbacks to previous versions."
- ✅ "Automated testing reduces deployment risk."

**Auto-fixable:** No (requires understanding context)

---

### 7. **Bold Title Format with Colon Inside**

**Rule:** Challenge titles use **Bold:** with colon inside the bold

**Bad Examples:**
- ❌ **Eliminate configuration drift** - Manual steps cause issues.
- ❌ **Eliminate configuration drift** Manual steps cause issues.
- ❌ Eliminate configuration drift: Manual steps cause issues.

**Good Example:**
- ✅ **Eliminate configuration drift:** Manual steps cause issues.

**Auto-fixable:** Yes (fix bold/colon formatting)

---

### 8. **Document Structure Pattern**

**Expected structure:**
1. Intro paragraph (2-3 paragraphs)
2. Why [topic] section (early, before implementation)
3. Implementation sections
4. HashiCorp resources
5. External resources (optional)
6. Next steps

**Auto-fixable:** No (requires content organization)

---

## Output Format

```
Document Structure Check
========================

Files Checked: 2
Issues Found: 11
Auto-fixable: 5

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 docs/modules.mdx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ WHY SECTION (2 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Line 23: Only 2 challenges found (need 3-4)
  Current challenges:
    - Reduce code duplication
    - Eliminate configuration drift
  💡 Add 1-2 more challenges (e.g., deployment speed, security compliance)
  [MANUAL REVIEW]

Line 28: Challenge format incorrect
  ❌ **Eliminate drift** - Manual steps cause issues
  ✅ **Eliminate drift:** Manual steps cause issues
  [AUTO-FIX AVAILABLE]

❌ LIST INTRODUCTIONS (3 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Line 45: Missing "the following" before list
  ❌ "Consider these approaches:"
  ✅ "Consider the following approaches:"
  [AUTO-FIX AVAILABLE]

Line 78: Missing "the following" before list
  ❌ "HCP Terraform includes key features:"
  ✅ "HCP Terraform includes the following key features:"
  [AUTO-FIX AVAILABLE]

Line 102: Missing list introduction entirely
  💡 Add intro like "Use the following best practices:"
  [AUTO-FIX AVAILABLE]

❌ WORKFLOW CONNECTIONS (1 issue)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No workflow connections found in body text
  💡 Add connections to related WAF docs
  Examples:
    - "After [packaging applications](/link), deploy..."
    - "Before deploying, [configure backends](/link)..."
  [MANUAL REVIEW]

❌ HEADING CAPITALIZATION (2 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Line 89: Title Case detected
  ❌ "## Version Control Best Practices"
  ✅ "## Version control best practices"
  [AUTO-FIX AVAILABLE]

Line 134: Title Case detected
  ❌ "## Getting Started With Modules"
  ✅ "## Getting started with modules"
  [AUTO-FIX AVAILABLE]

❌ VAGUE PRONOUNS (2 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Line 56: Sentence starts with "This"
  ❌ "This improves security across environments."
  💡 "Module versioning improves security across environments."
  [MANUAL REVIEW]

Line 98: Sentence starts with "It"
  ❌ "It enables rollbacks to previous versions."
  💡 "Immutable infrastructure enables rollbacks..."
  [MANUAL REVIEW]

❌ DOCUMENT ENDING ORDER (1 issue)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Line 210: "Next steps" appears before "HashiCorp resources"
  Current order: Next steps → HashiCorp resources
  ✅ Correct order: HashiCorp resources → External resources → Next steps
  [AUTO-FIX AVAILABLE]

✅ PASSES (2 checks)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Has Why section (proper location)
✓ Bold title formatting correct

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Issues: 11
  ├─ Auto-fixable: 6
  └─ Manual Review: 5

Run with --fix to apply 6 automatic corrections.
```

## Common Fixes

### Add "the following" to Lists

**Before:**
```markdown
Consider these approaches:

- Approach 1
- Approach 2
```

**After:**
```markdown
Consider the following approaches:

- Approach 1
- Approach 2
```

### Fix Heading Capitalization

**Before:**
```markdown
## Version Control Best Practices
## Getting Started With Terraform
```

**After:**
```markdown
## Version control best practices
## Getting started with Terraform
```

### Fix Bold Challenge Format

**Before:**
```markdown
**Eliminate drift** - Manual steps cause issues.
```

**After:**
```markdown
**Eliminate drift:** Manual steps cause issues.
```

### Reorder Document Ending

**Before:**
```markdown
## Next steps

Read more about...

## HashiCorp resources

- [Tutorial](/link)
```

**After:**
```markdown
## HashiCorp resources

- [Tutorial](/link)

## Next steps

Read more about...
```

### Add Why Section (Manual)

**Template:**
```markdown
## Why [topic]

**Challenge 1:** Description of business/operational problem.

**Challenge 2:** Description of another problem.

**Challenge 3:** Description of third problem.

**Challenge 4:** Description of fourth problem (optional).

[Topic] addresses these challenges by [explanation of solution].
```

## Examples

### Check single file
```bash
/check-structure docs/modules.mdx
```

### Check and auto-fix
```bash
/check-structure docs/modules.mdx --fix
```

### Check entire section
```bash
/check-structure docs/define-and-automate-processes/**/*.mdx
```

## Integration with Other Skills

**Complete review workflow:**
```bash
# 1. Document structure (this skill)
/check-structure docs/file.mdx --fix

# 2. Code examples
/check-code-examples docs/file.mdx

# 3. Resources sections
/check-resources docs/file.mdx --fix

# 4. HashiCorp style
/check-hashicorp-style docs/file.mdx --fix

# 5. Full review
/review-doc docs/file.mdx
```

**Quick structure check:**
```bash
/check-structure docs/file.mdx
```

## When to Use This Skill

Use `/check-structure` when:
- ✅ Creating new WAF documents
- ✅ Checking Why section format
- ✅ Validating list introductions
- ✅ Ensuring proper document ending order
- ✅ Running Phase 4 review (structure focus)

Don't use when:
- ❌ Need code example validation (use `/check-code-examples`)
- ❌ Need resources validation (use `/check-resources`)
- ❌ Need full review (use `/review-doc`)
- ❌ Checking technical accuracy (use `/review-doc --phases 2`)

## Reference

This skill validates against:
- **AGENTS.md** - Document structure patterns (lines 185-216)
- **AGENTS.md** - Why section format
- **AGENTS.md** - Workflow connections
- **AGENTS.md** - Document ending structure
- **REVIEW_PHASES.md** - Phase 4 checklist

## Performance

Typical execution times:
- Single file: ~25 seconds
- 5 files: ~2 minutes
- 20 files: ~8 minutes

Faster than full Phase 4 review due to focused scope.

## Best Practices

**When creating new documents:**
```bash
# Check structure early
/check-structure docs/new.mdx

# Fix auto-fixable issues
/check-structure docs/new.mdx --fix

# Manual review
# Add Why section challenges, workflow connections
```

**Before committing:**
```bash
/check-structure docs/file.mdx --report-only
```

**Bulk structure validation:**
```bash
/check-structure docs/**/*.mdx > structure-report.txt
```

## Notes

- Focuses on WAF-specific document patterns
- Auto-fixes formatting (headings, list intros, section order)
- Manual review needed for content (Why challenges, workflow connections, pronouns)
- Complements other skills (resources, code examples, style guide)
- Essential part of Phase 4 review
