---
name: check-resources
description: Validate HashiCorp and External resources sections for proper formatting, link descriptions, and organization.
argument-hint: <file-paths> [--fix]
---

# Check Resources Skill

Validates HashiCorp resources and External resources sections according to AGENTS.md standards. Ensures proper link formatting, descriptive text, and logical organization.

## Usage

```bash
/check-resources <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to check (required)
  - Single file: `/check-resources docs/prevent.mdx`
  - Multiple files: `/check-resources docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/check-resources docs/**/*.mdx`

- **--fix** or **-f**: Automatically fix resource formatting issues
- **--report-only** or **-r**: Generate report without changes

## What This Skill Checks

### 1. **Link Description Patterns**

**Rule:** Verbs OUTSIDE link brackets, context in sentence (no dashes after links)

**Bad Examples:**
- ❌ "[Learn about Terraform state]"
- ❌ "Read the [Terraform documentation for comprehensive features]"
- ❌ "Read the [documentation] - comprehensive guide"
- ❌ "Learn about [Terraform state] - for backend configuration"

**Good Examples:**
- ✅ "Learn about [Terraform state] for backend configuration"
- ✅ "Read the [Terraform documentation] for comprehensive features"
- ✅ "Get started with [Terraform tutorials] for hands-on examples"
- ✅ "Configure [Vault OIDC authentication] for centralized identity"

**Auto-fixable:** Partial (can remove dashes, adjust some patterns)

---

### 2. **Split Combined Links**

**Rule:** Documentation and tutorial links should be separate bullets

**Bad Example:**
- ❌ "Learn X with the [documentation] and [tutorials]"

**Good Example:**
- ✅ Two bullets:
  - "Read the [documentation] for core concepts"
  - "Follow hands-on [tutorials] for examples"

**Auto-fixable:** No (requires content judgment)

---

### 3. **Context Placement**

**Rule:** Context directly in sentence, no dashes after links

**Bad Examples:**
- ❌ "Read the [Terraform Kubernetes provider documentation] - for resource syntax"
- ❌ "Learn about [Nomad job specifications] - for containers"

**Good Examples:**
- ✅ "Read the [Terraform Kubernetes provider documentation] for resource syntax and configuration options"
- ✅ "Learn about [Nomad job specifications] for container workloads"

**Auto-fixable:** Yes (remove dashes, merge context)

---

### 4. **Specific vs Generic Link Text**

**Rule:** Link text should explain what users will find

**Bad Examples:**
- ❌ "Browse [Kubernetes tutorials] for additional examples"
- ❌ "Read the [Sentinel documentation] and learn more"
- ❌ "Check out the [guide]"

**Good Examples:**
- ✅ "Explore [Kubernetes tutorials] for deployment patterns and workflows"
- ✅ "Read the [Sentinel documentation] for policy as code concepts"
- ✅ "Follow the [installation guide] to deploy Vault in production"

**Auto-fixable:** No (requires understanding content)

---

### 5. **Resource Section Organization**

**When to use flat structure:**
- Links are similar in nature (mostly WAF cross-references)
- Document focuses on single tool
- Total links under 8
- Grouping would not improve readability

**When to group with subheadings:**
- Document covers multiple HashiCorp products
- Links fall into distinct categories by tool/purpose
- Total links exceed 8-10
- Users benefit from finding tool-specific resources quickly

**Subheading format:**
- ✅ `Packer for containers:`
- ✅ `Get started with Terraform:`
- ✅ `Vault advanced features:`
- ❌ `### Packer for containers` (no ### headings)

**Auto-fixable:** No (requires content analysis)

---

### 6. **Standard Link Description Patterns**

**Documentation links:**
- "Read the [Tool documentation] for comprehensive features"
- "Read the [Tool documentation] for [specific feature area]"
- "Read the [Tool introduction] to understand [core concept]"

**Tutorial links:**
- "Get started with [Tool tutorials] for hands-on examples"
- "Follow hands-on [Tool tutorials] for [specific use case]"
- "Explore [Tool tutorials] for [deployment patterns/workflows]"

**Feature-specific links:**
- "Learn about [Feature] for [specific benefit]"
- "Use [Feature] to [accomplish specific task]"
- "Configure [Feature] for [specific outcome]"

**Provider/Integration links:**
- "Read the [Provider documentation] for [resource type] and configuration"
- "Use [Integration] for [specific purpose]"
- "Manage [resources] with the [Provider]"

**Auto-fixable:** Partial (can standardize some patterns)

---

### 7. **Link Count**

**Minimum:**
- 5+ specific HashiCorp links per document
- More for multi-tool documents (8-12+)

**Quality over quantity:**
- Links must be specific (not generic dashboards)
- Each link serves a purpose
- Beginner and advanced balance

**Auto-fixable:** No (requires adding content)

---

### 8. **WAF Cross-References First**

**Rule:** Related WAF documents should appear first in HashiCorp resources

**Bad Example:**
```markdown
HashiCorp resources:

- Get started with [Vault tutorials]
- Learn how to [grant least privilege] (← should be first)
```

**Good Example:**
```markdown
HashiCorp resources:

- Learn how to [grant least privilege] for identity and access management
- Get started with [Vault tutorials] for hands-on examples
```

**Auto-fixable:** Partial (can reorder known WAF links)

---

### 9. **Section Naming for Multi-Tool Docs**

**Beginner sections:**
- "Get started with [Tool]"
- "Get started with automation tools"
- "[Tool] foundations for [use case]"

**Intermediate sections:**
- "[Tool] core concepts"
- "[Tool] for [specific use case]"

**Advanced sections:**
- "[Tool] advanced features"
- "[Tool] integrations"
- "[Tool] CI/CD automation"

**Auto-fixable:** No (requires content judgment)

---

## Output Format

```
Resources Section Check
=======================

Files Checked: 2
Issues Found: 14
Auto-fixable: 6

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 docs/prevent.mdx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ LINK DESCRIPTIONS (5 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Line 45: Verb inside brackets
  ❌ "[Learn about Terraform state]"
  ✅ "Learn about [Terraform state] for backend configuration"
  [MANUAL REVIEW]

Line 72: Dash after link
  ❌ "Read the [documentation] - for comprehensive features"
  ✅ "Read the [documentation] for comprehensive features"
  [AUTO-FIX AVAILABLE]

Line 88: Generic link text
  ❌ "Browse [tutorials] for additional examples"
  ✅ "Explore [Vault tutorials] for secrets management workflows"
  [MANUAL REVIEW]

❌ ORGANIZATION (2 issues)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Line 98: WAF cross-reference not first
  💡 Move "grant least privilege" link to top of HashiCorp resources
  [AUTO-FIX AVAILABLE]

Line 110: Document has 12 links but no grouping
  💡 Consider grouping: "Get started", "Vault for secrets", "Advanced features"
  [MANUAL REVIEW]

❌ LINK COUNT (1 issue)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Only 3 HashiCorp resource links (target: 5+)
  💡 Add links for: tutorials, documentation, related workflows
  [MANUAL REVIEW]

✅ PASSES (4 checks)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ No combined documentation/tutorial links
✓ Context in sentences (no "Read more" or "Click here")
✓ Proper subheading format (no ### markdown headings)
✓ Beginner resources included

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Issues: 8
  ├─ Auto-fixable: 2
  └─ Manual Review: 6

Run with --fix to apply 2 automatic corrections.
```

## Common Fixes

### Remove Dashes After Links

**Before:**
```markdown
- Read the [Terraform documentation] - for comprehensive features
- Learn about [Vault secrets] - dynamic credentials
```

**After:**
```markdown
- Read the [Terraform documentation] for comprehensive features
- Learn about [Vault secrets] for dynamic credentials
```

### Move Verbs Outside Brackets

**Before:**
```markdown
- [Learn about Terraform state]
- [Get started with Vault tutorials]
```

**After:**
```markdown
- Learn about [Terraform state] for backend configuration
- Get started with [Vault tutorials] for hands-on examples
```

### Add Specific Context

**Before:**
```markdown
- Read the [Kubernetes provider documentation]
- Check out [Vault tutorials]
```

**After:**
```markdown
- Read the [Kubernetes provider documentation] for resource syntax and configuration
- Explore [Vault tutorials] for secrets management workflows
```

### Reorder WAF Cross-References

**Before:**
```markdown
HashiCorp resources:

- Get started with [Vault tutorials]
- Read the [Vault documentation]
- Learn how to [grant least privilege] (← WAF link, should be first)
```

**After:**
```markdown
HashiCorp resources:

- Learn how to [grant least privilege] for identity and access management
- Get started with [Vault tutorials] for hands-on examples
- Read the [Vault documentation] for comprehensive features
```

## Examples

### Check single file
```bash
/check-resources docs/prevent.mdx
```

### Check and auto-fix
```bash
/check-resources docs/prevent.mdx --fix
```

### Check entire section
```bash
/check-resources docs/secure-systems/**/*.mdx
```

## Integration with Other Skills

**Complete review workflow:**
```bash
# 1. Document structure
/check-structure docs/file.mdx --fix

# 2. Code examples
/check-code-examples docs/file.mdx

# 3. Resources sections
/check-resources docs/file.mdx --fix

# 4. HashiCorp style guide
/check-hashicorp-style docs/file.mdx --fix

# 5. Comprehensive review
/review-doc docs/file.mdx --phases 5-7
```

**Quick resources check:**
```bash
/check-resources docs/file.mdx
```

## When to Use This Skill

Use `/check-resources` when:
- ✅ Adding or updating HashiCorp resources sections
- ✅ Need to validate link descriptions
- ✅ Checking resource organization (flat vs grouped)
- ✅ Ensuring proper link formatting
- ✅ Part of Phase 6 review (Link Quality & Balance)

Don't use when:
- ❌ Need full document review (use `/review-doc`)
- ❌ Checking for broken links (use `/fix-links`)
- ❌ Need code example validation (use `/check-code-examples`)

## Reference

This skill validates against:
- **AGENTS.md** - HashiCorp Resources Section Patterns (lines 354-635)
- **REVIEW_PHASES.md** - Phase 6: Link Quality & Balance

## Performance

Typical execution times:
- Single file: ~20 seconds
- 5 files: ~90 seconds
- 20 files: ~6 minutes

Fast focused check on resources sections only.

## Best Practices

**After adding new resources:**
```bash
/check-resources docs/file.mdx --fix
```

**Before committing resource updates:**
```bash
/check-resources docs/file.mdx
git diff docs/file.mdx  # Review changes
```

**Bulk resources check:**
```bash
/check-resources docs/**/*.mdx --report-only > resources-report.txt
```
