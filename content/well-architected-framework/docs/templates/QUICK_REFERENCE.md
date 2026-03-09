# WAF Documentation Quick Reference

**Quick reference guide for common documentation patterns, review workflows, skills, and troubleshooting**

Print this page: File → Print → Save as PDF
Last Updated: January 29, 2026

---

## Table of Contents

- [Common Patterns](#common-patterns)
- [Review Checklist](#review-checklist)
- [Skills Cheat Sheet](#skills-cheat-sheet)
- [Troubleshooting Guide](#troubleshooting-guide)

---

# Common Patterns

**Visual guide for common documentation patterns**

## 📋 Why Section Pattern

### ❌ Bad Example
```markdown
## Why use modules

Teams struggle with code duplication.

Inconsistent configurations cause problems.

Modules solve these issues by providing reusable components.
```

**Problems:**
- No bold formatting
- No business impact described
- Too vague and generic

---

### ✅ Good Example
```markdown
## Why use modules

**Reduce code duplication:** Teams copy infrastructure code across projects, creating maintenance burden and inconsistencies across environments.

**Eliminate configuration drift:** Manual configuration steps introduce differences between environments, causing deployment failures and security gaps.

**Accelerate deployment cycles:** Writing infrastructure from scratch for each project slows development and delays time to market.

**Improve security compliance:** Inconsistent security configurations across teams increase audit failures and expose vulnerabilities.

Modules address these challenges by providing tested, reusable infrastructure components that teams can share across projects.
```

**Why it works:**
- ✅ **Bold challenge:** format
- ✅ 4 challenges (3-4 is ideal)
- ✅ Each describes business/operational impact
- ✅ Concluding paragraph explains solution

---

## 🔗 Link Description Patterns

### ❌ Bad Examples
```markdown
<!-- Verb inside brackets -->
- [Learn about Terraform state]
- [Get started with Packer tutorials]

<!-- Dash after link -->
- Read the [Terraform documentation] - for comprehensive features

<!-- Generic link text -->
- Learn more about [modules]
- Check out the [tutorials]
```

---

### ✅ Good Examples
```markdown
<!-- Verbs OUTSIDE brackets -->
- Learn about [Terraform state]
- Get started with [Packer tutorials]

<!-- Context in sentence (no dash) -->
- Read the [Terraform documentation] for comprehensive features

<!-- Specific, actionable link text -->
- Learn about [Terraform module structure] for organizing reusable code
- Explore [Packer provisioner tutorials] for application packaging workflows
```

**Pattern:**
```
[Action verb] [specific topic] for [what user will learn/do]
```

---

## 📝 List Introduction Patterns

### ❌ Bad Examples
```markdown
<!-- Missing "the following" -->
You can install these packages with Packer:

Consider these approaches:

HCP Terraform includes key features:
```

---

### ✅ Good Examples
```markdown
<!-- "the following" present -->
You can install the following packages with Packer:

Consider the following approaches:

HCP Terraform includes the following key features:

The following is an example of early design decisions:
```

**Rule:** Every list must have "the following" somewhere in the introduction

**Exception:** HashiCorp resources and External resources sections

---

## 💻 Code Example Pattern

### ❌ Bad Example
```hcl
# Empty base template
source "docker" "ubuntu" {
  image  = "ubuntu:22.04"
  commit = true
}

build {
  sources = ["source.docker.ubuntu"]
}
```

**Problems:**
- No provisioners (empty template)
- No summary explaining what it does
- Not realistic or actionable

---

### ✅ Good Example
```hcl
# Complete application packaging
source "docker" "ubuntu" {
  image  = "ubuntu:22.04"
  commit = true
}

build {
  sources = ["source.docker.ubuntu"]

  # Copy application files
  provisioner "file" {
    source      = "dist/"
    destination = "/app"
  }

  # Install dependencies
  provisioner "shell" {
    inline = [
      "apt-get update",
      "apt-get install -y nodejs npm",
      "cd /app && npm install --production"
    ]
  }

  # Tag for registry
  post-processor "docker-tag" {
    repository = "myregistry/myapp"
    tags       = ["1.0.0", "latest"]
  }
}
```

This Packer template packages a Node.js application into a Docker image. The file provisioner copies application code, the shell provisioner installs dependencies, and the post-processor tags the image for your container registry. Running `packer build` produces a ready-to-deploy container image.

**Why it works:**
- ✅ Complete example (provisioners + post-processors)
- ✅ Realistic application packaging
- ✅ 2-sentence summary after code
- ✅ Explains what, why, and outcome

---

## 🎯 Heading Capitalization

### ❌ Bad Examples (Title Case)
```markdown
## Version Control Best Practices
## Getting Started With Terraform
## How To Deploy Applications
```

---

### ✅ Good Examples (Sentence case)
```markdown
## Version control best practices
## Getting started with Terraform
## How to deploy applications
```

**Rule:** Use sentence case for all headings (capitalize only first word and proper nouns)

---

## 🔄 Workflow Connection Pattern

### ❌ Bad Example
```markdown
## Package your application

Create container images with Packer.

## Deploy your application

Use Nomad to deploy containers.
```

**Problem:** No explicit connection between sections

---

### ✅ Good Example
```markdown
## Package your application

Create container images with Packer that include your application code and dependencies.

## Deploy your application

After [packaging your application](/define-and-automate-processes/automate/packaging) into container images, deploy these artifacts using Nomad to your orchestration platform.
```

**Why it works:**
- ✅ Explicit workflow connection ("After packaging...")
- ✅ Links to related document
- ✅ Shows progression (package → deploy)

---

## 📚 HashiCorp Resources Section Pattern

### ❌ Bad Example
```markdown
## HashiCorp resources

- [Terraform tutorials]
- [Terraform documentation]
- [Learn more about modules]
```

**Problems:**
- No organization
- Generic link text
- No context or descriptions
- Missing WAF cross-references

---

### ✅ Good Example
```markdown
## HashiCorp resources

- [Best practices for infrastructure as code](/define-and-automate-processes/define/as-code/infrastructure)
- [Standardize workflows with modules](/define-and-automate-processes/define/modules)

Get started with Terraform:

- Get started with [Terraform tutorials] for hands-on examples
- Read the [Terraform documentation] for comprehensive features

Terraform for modules:

- Learn about [Terraform module structure] for organizing reusable code
- Read the [Terraform Registry documentation] for publishing modules
- Use [private registries] for internal module distribution

Advanced module features:

- Implement [module testing] with Terratest for validation
- Configure [module versioning] for stable releases
- Integrate [modules with CI/CD] for automated workflows
```

**Why it works:**
- ✅ WAF cross-references first
- ✅ Organized by learning level
- ✅ Verbs outside brackets
- ✅ Context in sentences
- ✅ 8 links (target: 5-8+)
- ✅ Specific, actionable descriptions

---

## 🚫 Vague Pronoun Pattern

### ❌ Bad Examples
```markdown
This improves security across environments.

It enables rollbacks to previous versions.

This approach eliminates configuration drift.
```

**Problem:** Reader doesn't know what "This", "It", or "This approach" refers to

---

### ✅ Good Examples
```markdown
Module versioning improves security across environments.

Immutable infrastructure enables rollbacks to previous versions.

Using data sources eliminates configuration drift.
```

**Rule:** Never start sentences with "This", "That", or "It" - use explicit subjects

---

## 🔍 Quick Self-Check

Before submitting your document, verify:

- [ ] Why section has 3-4 **Bold:** challenges
- [ ] All lists have "the following" introduction
- [ ] All headings use sentence case
- [ ] No sentences start with "This", "That", "It"
- [ ] Code examples are complete (not empty templates)
- [ ] Code examples have 1-2 sentence summaries
- [ ] 5-8+ HashiCorp resource links
- [ ] Verbs outside link brackets
- [ ] WAF cross-references appear first in resources
- [ ] Document ends with: Resources → Next steps

---

# Review Checklist

**Print and use this checklist when reviewing documents**

## Document Information

- **File:** _______________________________________________
- **Reviewer:** ___________________________________________
- **Date:** _______________________________________________
- **Review Type:** ☐ New Document  ☐ Update  ☐ Quarterly Review

---

## ✅ Phase 1: Structure (5 minutes)

### Frontmatter
- [ ] Title present and descriptive
- [ ] Description 150-160 characters (SEO optimized)
- [ ] Valid YAML syntax

### Required Sections
- [ ] Introduction (2-3 paragraphs)
- [ ] "Why [topic]" section present
- [ ] Implementation guidance sections
- [ ] HashiCorp resources section
- [ ] Next steps section

### Why Section Format
- [ ] Section titled "Why [topic]"
- [ ] 3-4 challenges in **Bold challenge:** format
- [ ] Each challenge describes business/operational impact
- [ ] Paragraph after challenges explaining solution

### Headings
- [ ] All headings use sentence case (not Title Case)
- [ ] Proper nesting (no skipped levels: H1 → H2 → H3)
- [ ] Descriptive headings (not generic)

### Lists
- [ ] All lists preceded by "the following" in introduction
- [ ] Ordered lists use `1.` for every item
- [ ] Consistent bullet style throughout

### Document Ending Order
- [ ] HashiCorp resources section
- [ ] External resources section (if present)
- [ ] Next steps section (last)

### Vague Pronouns
- [ ] No sentences start with "This", "That", "It"
- [ ] Explicit subjects used throughout

**Auto-fix command:** `/check-structure docs/file.mdx --fix`

---

## ✅ Phase 2: Code Examples (10 minutes)

### Presence
- [ ] Code examples included (if implementation guide)
- [ ] Examples appropriate for document type

### Completeness
- [ ] Examples are complete (not empty templates)
- [ ] Packer: Includes provisioners and post-processors
- [ ] Terraform: Includes backend configuration
- [ ] Terraform: Uses data sources (not hardcoded IDs)
- [ ] All code blocks have language tags

### Summaries
- [ ] 1-2 sentence summary after each code block
- [ ] Summary explains what code does
- [ ] Summary explains why it matters
- [ ] Summary connects to workflow (input → output)

### Realism
- [ ] Examples use realistic values
- [ ] Examples show complete workflows
- [ ] Examples match document context

**Check command:** `/check-code-examples docs/file.mdx`

---

## ✅ Phase 3: Resources Section (5 minutes)

### Link Count
- [ ] 5-8+ HashiCorp resource links
- [ ] Appropriate number for document type

### Organization
- [ ] WAF cross-references appear first
- [ ] Grouped by tool/purpose (if multi-tool doc)
- [ ] Progressive organization (beginner → advanced)

### Link Formatting
- [ ] Verbs OUTSIDE link brackets
- [ ] Context in sentence (no dashes after links)
- [ ] Specific link text (not "Learn more")
- [ ] Action verbs used (Learn, Read, Get started, etc.)

### Link Descriptions
- [ ] Each link explains what user will find
- [ ] Documentation and tutorial links separated
- [ ] Multiple related links in one bullet (if appropriate)

**Auto-fix command:** `/check-resources docs/file.mdx --fix`

---

## ✅ Phase 4: HashiCorp Style Guide (5 minutes)

### Voice & Tense
- [ ] Second-person "you" throughout
- [ ] Present tense (no "will" for future events)
- [ ] Active voice preferred

### Word Choice
- [ ] "lets" instead of "allows" or "enables"
- [ ] No unofficial abbreviations (TF, TFC, TFE, etc.)
- [ ] No foreign words ("via", "etc.", "e.g.")
- [ ] No "please", "simply", "just", "easy"

### Clarity
- [ ] No promotional language ("breathtaking", "exceptional")
- [ ] No excessive conjunctions ("moreover", "furthermore")
- [ ] Direct, clear statements
- [ ] Precise technical terms

**Auto-fix command:** `/check-hashicorp-style docs/file.mdx --fix`

---

## ✅ Phase 5: Persona Coverage (10 minutes)

### Decision-Maker Content (40-50%)
- [ ] Why section with business impact
- [ ] Strategic guidance (tool selection, trade-offs)
- [ ] Business value statements (ROI, risk reduction)
- [ ] Comparison of approaches (when appropriate)

### Implementer Content (50-60%)
- [ ] Code examples with explanations
- [ ] 5-8+ resource links (tutorials, docs)
- [ ] How-to guidance or clear next steps
- [ ] Integration patterns and tool usage

### Balance
- [ ] Both personas well-served
- [ ] Smooth transitions between strategic and tactical
- [ ] No heavy skew to one persona (>70%)

**Check command:** `/persona-coverage docs/file.mdx --verbose`

---

## ✅ Phase 6: Cross-References (5 minutes)

### Workflow Connections
- [ ] Links to related WAF documents in body text
- [ ] Workflow progression clear (A → B → C)
- [ ] Explicit connections ("After X, do Y")

### Link Health
- [ ] All internal links work
- [ ] All external links work
- [ ] No broken or 404 links
- [ ] Redirected links updated to final URLs

### Discoverability
- [ ] Document not orphaned (has incoming links)
- [ ] Bidirectional links where appropriate
- [ ] Cross-references in resources section

**Check command:** `/smart-cross-reference docs/file.mdx --full-analysis`

---

## ✅ Phase 7: Content Quality (10 minutes)

### Word Count
- [ ] 700-1,200 words (target range)
- [ ] Appropriate depth for topic
- [ ] Not too shallow (<500) or too verbose (>1,500)

### Technical Accuracy
- [ ] Code examples syntactically correct
- [ ] Version numbers accurate (if mentioned)
- [ ] No deprecated patterns or APIs
- [ ] Security recommendations valid

### Freshness
- [ ] No version-specific references (unless necessary)
- [ ] No temporal language ("currently", "recently")
- [ ] No "coming soon" or "beta" references
- [ ] Links current and not redirected

### SEO & Discoverability
- [ ] Meta description optimized (150-160 chars)
- [ ] Title clear and searchable
- [ ] First paragraph hooks reader
- [ ] H2 headings descriptive and keyword-rich

**Check command:** `/content-freshness docs/file.mdx`

---

## 📊 Overall Assessment

### Quality Score
- [ ] Structure: ___/10
- [ ] Code Examples: ___/10
- [ ] Resources: ___/10
- [ ] Style: ___/10
- [ ] Persona Balance: ___/10
- [ ] Cross-References: ___/10
- [ ] Content Quality: ___/10

**Overall: ___/10**

### Status
- [ ] 🟢 Excellent (9-10) - Ready for publication
- [ ] 🟢 Good (7-8.9) - Minor improvements needed
- [ ] 🟡 Needs Work (5-6.9) - Several issues to address
- [ ] 🔴 Critical (<5) - Major revision required

---

## 🎯 Action Items

**Critical (Fix Today):**
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________

**Medium Priority (This Week):**
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________

**Low Priority (Nice to Have):**
1. _________________________________________________
2. _________________________________________________

---

## ✅ Final Sign-Off

- [ ] All critical issues addressed
- [ ] All auto-fixes applied
- [ ] Manual fixes completed
- [ ] Final validation passed
- [ ] Ready for publication

**Reviewer Signature:** _____________________________________

**Date Completed:** _________________________________________

---

# Skills Cheat Sheet

**Quick reference for common commands**

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

# Troubleshooting Guide

**"If you see X, do Y" - Quick problem-solving reference**

## 🔴 Structure Issues

### Issue: "Missing Why section"

**What you see:**
```
⚠️ Document missing "Why [topic]" section
```

**What to do:**
1. Add a "## Why [topic]" section after introduction
2. Include 3-4 challenges in **Bold challenge:** format
3. Each challenge should describe business/operational impact
4. Add concluding paragraph explaining how topic addresses challenges

**Example:**
```markdown
## Why use modules

**Reduce code duplication:** Teams copy infrastructure code across projects, creating maintenance burden and inconsistencies.

**Eliminate configuration drift:** Manual configuration steps introduce differences between environments, causing deployment failures.

**Accelerate deployment cycles:** Writing infrastructure from scratch for each project slows development and delays time to market.

Modules address these challenges by providing tested, reusable infrastructure components.
```

**Quick fix:** See `templates/reference/PATTERNS.md` for more examples

---

### Issue: "Vague pronoun at sentence start"

**What you see:**
```
⚠️ Line 56: "This improves security..."
⚠️ Line 98: "It enables rollbacks..."
```

**What to do:**
Replace vague pronouns with explicit subjects

**Before:**
```markdown
This improves security across environments.
It enables rollbacks to previous versions.
```

**After:**
```markdown
Module versioning improves security across environments.
Immutable infrastructure enables rollbacks to previous versions.
```

**Quick fix:** `/check-structure docs/file.mdx --fix` (auto-fixes most cases)

---

### Issue: "List missing 'the following' introduction"

**What you see:**
```
⚠️ Line 45: List needs "the following" in introduction
```

**What to do:**
Add "the following" before the list

**Before:**
```markdown
You can install these packages with Packer:
```

**After:**
```markdown
You can install the following packages with Packer:
```

**Quick fix:** `/check-structure docs/file.mdx --fix` (auto-fixes)

---

### Issue: "Heading uses Title Case"

**What you see:**
```
⚠️ Line 89: "Version Control Best Practices" should be "Version control best practices"
```

**What to do:**
Change to sentence case (capitalize only first word and proper nouns)

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

**Quick fix:** `/check-structure docs/file.mdx --fix` (auto-fixes)

---

## 💻 Code Example Issues

### Issue: "Code example is empty template"

**What you see:**
```
⚠️ Packer template missing provisioners (lines 67-89)
⚠️ Example shows only base configuration
```

**What to do:**
Add provisioners to show complete workflow

**Before (empty template):**
```hcl
source "docker" "ubuntu" {
  image  = "ubuntu:22.04"
  commit = true
}

build {
  sources = ["source.docker.ubuntu"]
}
```

**After (complete example):**
```hcl
source "docker" "ubuntu" {
  image  = "ubuntu:22.04"
  commit = true
}

build {
  sources = ["source.docker.ubuntu"]

  provisioner "file" {
    source      = "dist/"
    destination = "/app"
  }

  provisioner "shell" {
    inline = [
      "apt-get update",
      "apt-get install -y nodejs npm",
      "cd /app && npm install --production"
    ]
  }

  post-processor "docker-tag" {
    repository = "myregistry/myapp"
    tags       = ["1.0.0"]
  }
}
```

**Reference:** See `templates/reference/PATTERNS.md` for tool-specific requirements

---

### Issue: "Code example missing summary"

**What you see:**
```
⚠️ Code block at line 89 needs 1-2 sentence summary
```

**What to do:**
Add summary after code block explaining what/why/outcome

**Pattern:**
```markdown
[Code block]

[1-2 sentences explaining: what it does + why it matters + what it produces]
```

**Example:**
```markdown
```hcl
[Packer template code]
```

This Packer template packages a Node.js application into a Docker image. Running `packer build` produces a container image tagged for your registry that's ready to deploy.
```

**Check:** `/check-code-examples docs/file.mdx`

---

### Issue: "Terraform example uses hardcoded values"

**What you see:**
```
⚠️ Line 123: Hardcoded AMI ID "ami-12345678"
⚠️ Use data source to query dynamic values
```

**What to do:**
Replace hardcoded IDs with data sources

**Before:**
```hcl
resource "aws_instance" "app" {
  ami           = "ami-12345678"  # Hardcoded
  instance_type = "t3.micro"
}
```

**After:**
```hcl
data "aws_ami" "app" {
  most_recent = true
  owners      = ["self"]

  filter {
    name   = "name"
    values = ["myapp-*"]
  }
}

resource "aws_instance" "app" {
  ami           = data.aws_ami.app.id  # Dynamic
  instance_type = "t3.micro"
}
```

**Why:** Data sources query current values, making examples realistic and maintainable

---

## 🔗 Link & Resources Issues

### Issue: "Verb inside link brackets"

**What you see:**
```
⚠️ Line 189: "[Learn about Terraform state]"
Should be: "Learn about [Terraform state]"
```

**What to do:**
Move verb outside brackets

**Before:**
```markdown
- [Learn about Terraform state]
- [Get started with Packer tutorials]
```

**After:**
```markdown
- Learn about [Terraform state]
- Get started with [Packer tutorials]
```

**Quick fix:** `/check-resources docs/file.mdx --fix` (auto-fixes)

---

### Issue: "Link description uses dash"

**What you see:**
```
⚠️ Line 234: Dash after link
"Read the [documentation] - for comprehensive features"
```

**What to do:**
Remove dash, put context in sentence

**Before:**
```markdown
- Read the [Terraform documentation] - for comprehensive features
- Learn about [modules] - to organize code
```

**After:**
```markdown
- Read the [Terraform documentation] for comprehensive features
- Learn about [modules] to organize reusable code
```

**Quick fix:** `/check-resources docs/file.mdx --fix` (auto-fixes)

---

### Issue: "Only X resource links (need 5+)"

**What you see:**
```
⚠️ Document has only 3 resource links
Target: 5-8+ links for implementers
```

**What to do:**
Add more HashiCorp resource links

**Categories to include:**
- Get started (tutorials, introductions)
- Core concepts (documentation, key features)
- Advanced features (integrations, advanced configs)
- Tool-specific sections (if multi-tool doc)

**Quick fix:** `/add-resources docs/file.mdx`

---

### Issue: "Broken link"

**What you see:**
```
⚠️ Line 245: Link returns 404
https://old-domain.com/page
```

**What to do:**
1. Find correct URL (check if page moved)
2. Update link in document
3. Verify new link works

**Common fixes:**
- `learn.hashicorp.com` → `developer.hashicorp.com`
- `terraform.io/docs` → `developer.hashicorp.com/terraform/docs`
- Check for redirects and use final URL

**Quick fix:** `/fix-links docs/file.mdx`

---

## ✍️ Style Issues

### Issue: "Passive voice detected"

**What you see:**
```
⚠️ Line 67: "The configuration is managed by Terraform"
Use active voice: "Terraform manages the configuration"
```

**What to do:**
Rewrite in active voice

**Before (passive):**
```markdown
The infrastructure is provisioned by Terraform.
Secrets are stored by Vault.
```

**After (active):**
```markdown
Terraform provisions the infrastructure.
Vault stores secrets.
```

**Quick fix:** `/check-hashicorp-style docs/file.mdx --fix` (auto-fixes many cases)

---

### Issue: "Future tense with 'will'"

**What you see:**
```
⚠️ Line 89: "Terraform will create resources"
Use present tense: "Terraform creates resources"
```

**What to do:**
Change to present tense

**Before:**
```markdown
Terraform will create the resources.
The module will deploy the application.
```

**After:**
```markdown
Terraform creates the resources.
The module deploys the application.
```

**Quick fix:** `/check-hashicorp-style docs/file.mdx --fix` (auto-fixes)

---

### Issue: "Use 'lets' instead of 'allows' or 'enables'"

**What you see:**
```
⚠️ Line 123: "Terraform allows you to..."
Use: "Terraform lets you..."
```

**What to do:**
Replace with "lets"

**Before:**
```markdown
Terraform allows you to define infrastructure.
Vault enables you to manage secrets.
```

**After:**
```markdown
Terraform lets you define infrastructure.
Vault lets you manage secrets.
```

**Quick fix:** `/check-hashicorp-style docs/file.mdx --fix` (auto-fixes)

---

### Issue: "Unofficial abbreviation"

**What you see:**
```
⚠️ Line 156: "TF" should be "Terraform"
⚠️ Line 178: "TFC" should be "HCP Terraform"
```

**What to do:**
Use full product names

**Before:**
```markdown
Use TF to provision infrastructure.
Configure TFC for team collaboration.
Use TFE for enterprise features.
```

**After:**
```markdown
Use Terraform to provision infrastructure.
Configure HCP Terraform for team collaboration.
Use Terraform Enterprise for enterprise features.
```

**Quick fix:** `/check-hashicorp-style docs/file.mdx --fix` (auto-fixes)

---

## 🆘 When All Else Fails

### Get Skill Recommendations
```bash
/skill-advisor docs/file.mdx --auto-suggest
```
Shows which skills to use for detected issues

### Get Overall Health Check
```bash
/doc-intelligence --view tactical
```
See all issues across documentation

### Ask for Help
```bash
# Ask Claude specific questions
"How do I fix vague pronouns?"
"What should a complete Packer example show?"
"How do I organize resources sections?"
```

### Run Full Review
```bash
/review-doc docs/file.mdx --phases 1-7
```
Comprehensive review with detailed recommendations

---

## 📚 Reference Files

- **Full guidelines:** `AGENTS.md`
- **Review process:** `templates/REVIEW_PHASES.md`
- **All patterns:** `templates/reference/PATTERNS.md` (structure, code, resources, tools, pitfalls)
