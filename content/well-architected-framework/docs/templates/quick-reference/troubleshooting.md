# WAF Documentation Troubleshooting Guide

**"If you see X, do Y" - Quick problem-solving reference**

---

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

**Quick fix:** See `templates/reference/DOCUMENT_PATTERNS.md` for more examples

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

**Reference:** See `templates/reference/CODE_PATTERNS.md` for tool-specific requirements

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

## 👥 Persona Issues

### Issue: "Persona imbalance: 70% decision-maker, 30% implementer"

**What you see:**
```
⚠️ Too much strategic content, not enough implementation guidance
Target: 40-50% decision-maker, 50-60% implementer
```

**What to do:**
Add implementer content:
- Code examples with explanations
- More resource links (tutorials, docs)
- How-to guidance or step-by-step instructions
- Integration patterns and tool usage

**Check:** `/persona-coverage docs/file.mdx --verbose`

---

### Issue: "Persona imbalance: 30% decision-maker, 70% implementer"

**What you see:**
```
⚠️ Too much tactical content, missing strategic context
Target: 40-50% decision-maker, 50-60% implementer
```

**What to do:**
Add decision-maker content:
- Enhance Why section with business impact
- Add strategic guidance (tool selection, trade-offs)
- Include business value statements (ROI, risk reduction)
- Add comparison of approaches (when appropriate)

**Check:** `/persona-coverage docs/file.mdx --verbose`

---

## 🔄 Cross-Reference Issues

### Issue: "Document is orphaned (no incoming links)"

**What you see:**
```
⚠️ No other documents link to this one
Users can't discover this document through navigation
```

**What to do:**
1. Identify parent documents (pillar overview, related topics)
2. Add links from those documents to this one
3. Verify bidirectional links where appropriate

**Check:** `/smart-cross-reference docs/file.mdx --detect-orphans`

---

### Issue: "Missing workflow connection"

**What you see:**
```
⚠️ Document mentions "after packaging" but doesn't link to packaging doc
```

**What to do:**
Add explicit workflow link

**Before:**
```markdown
After packaging your application, deploy it to production.
```

**After:**
```markdown
After [packaging your application](/define-and-automate-processes/automate/packaging) into container images, deploy these artifacts to production.
```

**Check:** `/smart-cross-reference docs/file.mdx --detect-workflows`

---

## 📊 Content Quality Issues

### Issue: "Document too short (<500 words)"

**What you see:**
```
⚠️ Document is 387 words (target: 700-1,200)
May lack depth for implementers
```

**What to do:**
Add content:
- Expand Why section with more challenges
- Add code examples (if implementation guide)
- Add more resource links
- Expand implementation guidance
- Add troubleshooting or best practices section

**Check:** `/doc-intelligence --view tactical`

---

### Issue: "Content may be outdated"

**What you see:**
```
⚠️ Document references "Terraform 1.3" (version-specific)
⚠️ Link redirects to new URL
⚠️ Uses temporal language "recently released"
```

**What to do:**
1. Remove version-specific references (unless necessary)
2. Update redirected links to final URLs
3. Remove temporal language ("currently", "recently", "soon")
4. Verify code examples use current syntax

**Check:** `/content-freshness docs/file.mdx --check-links`

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
- **Document patterns:** `templates/reference/DOCUMENT_PATTERNS.md`
- **Code patterns:** `templates/reference/CODE_PATTERNS.md`
- **Resources patterns:** `templates/reference/RESOURCES_PATTERNS.md`
- **Common pitfalls:** `templates/reference/PITFALLS.md`

---

**Print this guide:** File → Print → Save as PDF
**Last Updated:** January 29, 2026