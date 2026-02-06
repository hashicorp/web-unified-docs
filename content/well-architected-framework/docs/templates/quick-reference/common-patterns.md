# WAF Documentation Common Patterns - Visual Guide

**Quick visual reference for common documentation patterns**

---

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

## 📊 Document Structure Pattern

### Complete Document Template

```markdown
---
title: "Topic name"
description: "150-160 character description for SEO optimization and search results display"
---

# Topic name

[2-3 paragraph introduction explaining the problem and solution]

## Why [topic]

**Challenge 1:** Business/operational impact description

**Challenge 2:** Business/operational impact description

**Challenge 3:** Business/operational impact description

**Challenge 4:** Business/operational impact description

[Topic] addresses these challenges by [explanation].

## [Implementation section 1]

[Content with examples]

## [Implementation section 2]

[Content with examples]

## HashiCorp resources

- [WAF cross-reference 1]
- [WAF cross-reference 2]

Get started with [Tool]:

- Get started with [tutorials]
- Read the [documentation]

[Tool] for [use case]:

- [Specific resources]

## External resources

- [Third-party documentation]
- [Cloud provider guides]

## Next steps

In this document, you learned [summary of key points].

Next, [suggested next action with link to related document].
```

---

## 🎨 Visual Formatting Tips

### Bold Text Usage
```markdown
✅ **Challenge name:** Description
✅ **Key term:** Definition
❌ **Entire sentences for emphasis**
```

### Code Block Language Tags
```markdown
✅ ```hcl
✅ ```bash
✅ ```json
❌ ``` (no language tag)
```

### Ordered Lists
```markdown
✅ Use 1. for every item (Markdown auto-numbers)
1. First step
1. Second step
1. Third step

❌ Don't manually number
1. First step
2. Second step
3. Third step
```

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

## 📖 Full Examples

**See these documents for complete examples:**

Run `/doc-intelligence --view tactical` to see current top performers, or check:
- `docs/secure-systems/secrets/store-static-secrets.mdx`
- `docs/define-and-automate-processes/define/immutable-infrastructure/containers.mdx`
- `docs/design-resilient-systems/failover.mdx`

---

**Print this guide:** File → Print → Save as PDF
**Last Updated:** January 29, 2026