# WAF Documentation Patterns

**Comprehensive reference for all WAF documentation patterns**

This consolidated file contains all patterns for creating high-quality WAF documentation: document structure, code examples, resources sections, tool-specific requirements, and common pitfalls to avoid.

**Last updated:** January 30, 2026

---

## Table of Contents

1. [Code Example Patterns](#code-example-patterns-for-waf-documentation)
   - When to include examples
   - Complete vs empty templates
   - Realistic values with context
   - Code summaries
   - Packer, Terraform, Sentinel patterns

2. [Document Structure Patterns](#waf-document-structure-patterns)
   - "Why [topic]" section format
   - Workflow connections
   - Decision guidance patterns
   - Code example summaries
   - Document ending structure

3. [Resources Section Patterns](#hashicorp-resources-section-patterns)
   - Link formatting rules
   - Organization strategies
   - Flat vs grouped structures
   - Link description patterns
   - Anti-patterns to avoid

4. [Tool-Specific Patterns](#tool-specific-documentation-patterns)
   - Packer requirements
   - Terraform requirements
   - Sentinel requirements
   - Multi-tool integration
   - Quick reference by tool

5. [Common Pitfalls](#common-documentation-pitfalls)
   - Empty base examples
   - Missing workflow connections
   - Generic tool documentation
   - Document depth red flags
   - Quality self-check

---

# Part 1: Code Example Patterns

# Code Example Patterns for WAF Documentation

This reference file contains patterns for creating realistic, actionable code examples in WAF documents. These patterns ensure examples help implementers understand workflows and get started quickly.

## When to Use This File

**Use this reference when:**
- Adding code examples to WAF documents
- Reviewing code quality and completeness
- Running `/check-code-examples` skill
- Understanding tool-specific requirements (Packer, Terraform, Sentinel)
- Creating multi-tool workflow examples

**For quick checks, use:**
- `/check-code-examples` skill (auto-applies these patterns)

---

## When to Include Code Examples

### Include Examples For:
- ✅ Implementation guides
- ✅ Technical how-tos
- ✅ Documents showing specific tool usage
- ✅ Workflow demonstrations

### Skip Examples For:
- ❌ Strategic overviews
- ❌ Decision guides
- ❌ High-level concept documents

**Principle:** Add code examples when they provide clear value to implementers, not as a checkbox requirement.

---

## Core Requirements for All Examples

### 1. Complete Examples (Not Empty Templates)

**Bad - Empty Base Template:**
```hcl
# Creates empty Ubuntu image with no application
source "docker" "ubuntu" {
  image  = "ubuntu:20.04"
  commit = true
}

build {
  sources = ["source.docker.ubuntu"]
}
```

**Good - Complete Application Packaging:**
```hcl
# Shows actual application packaging workflow
source "docker" "ubuntu" {
  image  = "ubuntu:20.04"
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
    tags       = ["1.0.0"]
  }
}
```

**Why:** Implementers need to see the complete workflow, not just skeleton configuration.

---

### 2. Realistic Values with Context

**Bad - Hardcoded Values:**
```hcl
resource "aws_instance" "web" {
  ami = "ami-12345678"  # Meaningless hardcoded value
  instance_type = "t2.micro"
}
```

**Good - Dynamic Values:**
```hcl
# Query AMI built by Packer
data "aws_ami" "packer_image" {
  most_recent = true
  owners      = ["self"]

  filter {
    name   = "tag:Name"
    values = ["web-app-*"]
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.packer_image.id
  instance_type = "t2.micro"

  tags = {
    Name        = "web-server"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}
```

**Why:** Shows realistic workflow integration and eliminates hardcoded dependencies.

---

### 3. Code Summaries (1-2 Sentences)

Every code block needs a summary explaining:

1. **What the code does**
2. **What it produces**
3. **How to use the output**
4. **Why it matters**

**Example Summary:**
```markdown
The data source queries the most recent AMI built by Packer with the web-app tag. Running `terraform apply` creates an EC2 instance using this AMI. This eliminates manual AMI ID updates when you rebuild images and ensures deployments always use the latest application version. Terraform stores this configuration in state, enabling team collaboration and tracking infrastructure changes over time.
```

**Placement:**
- After code blocks (preferred)
- Before code blocks if introducing context
- Never skip summaries on implementation examples

---

## Packer Example Patterns

### Required Elements

Packer examples must include:

1. **Provisioners** - Show how application code gets into images
2. **Post-processors** - Show versioning/tagging strategy
3. **Realistic application setup** - Not empty base images

### Complete Packer Example

```hcl
source "amazon-ebs" "web_app" {
  ami_name      = "web-app-{{timestamp}}"
  instance_type = "t2.micro"
  region        = "us-east-1"

  source_ami_filter {
    filters = {
      name                = "ubuntu/images/*ubuntu-focal-20.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }

  ssh_username = "ubuntu"
}

build {
  sources = ["source.amazon-ebs.web_app"]

  # Copy application files
  provisioner "file" {
    source      = "app/"
    destination = "/tmp/app"
  }

  # Install and configure application
  provisioner "shell" {
    inline = [
      "sudo mv /tmp/app /opt/app",
      "sudo chown -R app:app /opt/app",
      "sudo systemctl enable app.service",
      "sudo systemctl start app.service"
    ]
  }

  # Tag for deployment tracking
  post-processor "manifest" {
    output = "manifest.json"
  }
}
```

**Summary:**
"This Packer template builds an AWS AMI with your application pre-installed at /opt/app. The provisioners copy files, set permissions, and configure systemd for automatic startup. The manifest post-processor records the AMI ID for use in Terraform deployments. Running `packer build` produces a versioned AMI that ensures consistent deployments across environments."

### What to Show in Packer Docs

- ✅ Complete build blocks with provisioners (not just source definitions)
- ✅ How application code gets into images
- ✅ How to tag/version images for tracking
- ✅ How outputs connect to deployment tools (Terraform, Kubernetes, Nomad)

### Common Packer Mistakes

❌ **Empty templates with no provisioners**
❌ **No post-processors for versioning**
❌ **No explanation of artifact usage downstream**

---

## Terraform Example Patterns

### Required Elements

Terraform examples must show:

1. **Backend configuration** - For state management
2. **Data sources** - For dynamic values (not hardcoded IDs)
3. **Workflow connections** - Where values come from
4. **Resource tags** - For organization

### Complete Terraform Example

```hcl
terraform {
  backend "remote" {
    organization = "my-org"

    workspaces {
      name = "production"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# Query AMI built by Packer
data "aws_ami" "app" {
  most_recent = true
  owners      = ["self"]

  filter {
    name   = "tag:Application"
    values = ["web-app"]
  }

  filter {
    name   = "tag:Environment"
    values = ["production"]
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.app.id
  instance_type = "t2.micro"

  tags = {
    Name        = "web-server"
    Environment = "production"
    ManagedBy   = "terraform"
    Application = "web-app"
  }
}

output "instance_id" {
  value = aws_instance.web.id
}

output "ami_used" {
  value = data.aws_ami.app.id
}
```

**Summary:**
"Terraform queries the latest AMI built by Packer using tags to filter for production web-app images. The remote backend stores state in HCP Terraform, enabling team collaboration and state locking. Running `terraform apply` creates an EC2 instance with the latest application image. The outputs capture the instance ID and AMI used for documentation and integration with other tools."

### What to Show in Terraform Docs

- ✅ Backend configuration for state management
- ✅ Data sources for querying dynamic values (not hardcoded IDs)
- ✅ How to reference artifacts from other tools (Packer AMIs, container images)
- ✅ Resource tags for organization and filtering

### Common Terraform Mistakes

❌ **Hardcoded AMI/image IDs**
❌ **No backend configuration**
❌ **Missing resource tags**
❌ **No explanation of workflow integration**

---

## Sentinel Example Patterns

### Required Elements

Sentinel examples must show:

1. **Complete policies** with imports and rules
2. **What gets checked** during evaluation
3. **What happens when policies fail**
4. **How to test policies**

### Complete Sentinel Example

```sentinel
import "tfplan/v2" as tfplan

# Require specific tags on all resources
required_tags = ["Environment", "Owner", "CostCenter"]

# Find all resources
all_resources = filter tfplan.resource_changes as _, rc {
  rc.mode is "managed" and
  rc.change.actions contains "create"
}

# Validate tags
violations = filter all_resources as _, resource {
  any required_tags as tag {
    resource.change.after.tags not contains tag
  }
}

# Policy rule
main = rule {
  length(violations) == 0
}
```

**Summary:**
"This Sentinel policy enforces required tags (Environment, Owner, CostCenter) on all newly created resources. When you run `terraform plan`, Sentinel evaluates the policy against the plan. If any resource is missing required tags, the policy fails and blocks `terraform apply`, displaying which resources need tags. Test the policy using the Sentinel simulator before deploying to HCP Terraform."

### What to Show in Sentinel Docs

- ✅ Complete policies with imports and rules
- ✅ How policies evaluate plans (what gets checked)
- ✅ What happens when policies fail (blocks apply, shows violations)
- ✅ How to test policies before deploying them

---

## Multi-Tool Integration Examples

### Required Elements

Integration examples must show:

1. **Clear workflow sequence** (Tool A → Tool B → Tool C)
2. **How outputs become inputs** between tools
3. **Matching example values** across all tools
4. **End-to-end example** showing complete flow

### Complete Integration Example

**Step 1: Packer builds AMI**
```hcl
# packer/web-app.pkr.hcl
build {
  sources = ["source.amazon-ebs.web"]

  provisioner "file" {
    source      = "app/"
    destination = "/opt/app"
  }

  post-processor "manifest" {
    output = "manifest.json"
  }
}
```

**Step 2: Terraform deploys AMI**
```hcl
# terraform/main.tf
data "aws_ami" "app" {
  most_recent = true
  owners      = ["self"]

  filter {
    name   = "tag:Name"
    values = ["web-app-*"]
  }
}

resource "aws_instance" "web" {
  ami = data.aws_ami.app.id
  # ... rest of config
}
```

**Step 3: Vault provides secrets**
```hcl
# vault/config.hcl
data "vault_generic_secret" "db" {
  path = "secret/database"
}

resource "aws_instance" "web" {
  user_data = templatefile("userdata.sh", {
    db_password = data.vault_generic_secret.db.data["password"]
  })
}
```

**Summary:**
"This workflow demonstrates image build, deployment, and secrets management. Packer builds an AMI with your application and outputs the AMI ID to manifest.json. Terraform queries the AMI using a data source and deploys an EC2 instance. Vault provides database credentials at runtime through the Terraform Vault provider. This creates immutable infrastructure with dynamic secrets, ensuring consistent deployments and credential rotation."

### What to Show in Integration Docs

- ✅ Clear workflow sequence (Tool A → Tool B → Tool C)
- ✅ How outputs from one tool become inputs to the next
- ✅ Example values that match across all tools
- ✅ End-to-end example showing complete flow

---

## Code Summary Requirements

### Four Required Elements

Every code summary must explain:

**1. What the code does**
- "This template copies application files and installs dependencies"
- "The configuration creates an EC2 instance using Packer-built AMI"

**2. What it produces**
- "Running `packer build` produces AMI ami-0abc123"
- "Running `terraform apply` outputs the instance ID"

**3. How to use the output**
- "Reference this AMI in Terraform using a data source"
- "Use the instance ID to configure monitoring"

**4. Why it matters**
- "This creates immutable infrastructure that deploys consistently"
- "This approach enables team collaboration through shared state"

### Good Summary Example

```markdown
The Packer template packages your Node.js application with dependencies into an AWS AMI. Running `packer build web-app.pkr.hcl` produces a tagged AMI (e.g., web-app-1234567890). Reference this AMI in Terraform using the aws_ami data source filtered by tags. This approach creates immutable infrastructure that deploys consistently across environments and eliminates configuration drift from manual installation steps.
```

### Bad Summary Examples

❌ "This is a Packer configuration." (too vague)
❌ "Use this to build images." (no context or outcomes)
❌ No summary at all

---

## Language Tags

**Rule:** Every code block must have a language tag

**Common tags:**
- `hcl` - Terraform, Packer, Nomad, Consul, Vault configuration
- `bash` or `shell-session` - Command line examples
- `python` - Python code
- `json` - JSON configuration
- `yaml` - YAML configuration

**Example:**
````markdown
```hcl
resource "aws_instance" "web" {
  ami = "ami-12345678"
}
```
````

---

## Quick Reference

**All examples need:**
- [ ] Language tags
- [ ] Complete configuration (not empty templates)
- [ ] Realistic values (data sources, not hardcoded)
- [ ] 1-2 sentence summary
- [ ] Explanation of workflow integration

**Packer examples need:**
- [ ] Provisioners showing app installation
- [ ] Post-processors for versioning
- [ ] Connection to deployment tools

**Terraform examples need:**
- [ ] Backend configuration
- [ ] Data sources (not hardcoded IDs)
- [ ] Resource tags
- [ ] Workflow context

**Integration examples need:**
- [ ] Tool A → Tool B → Tool C sequence
- [ ] Matching values across tools
- [ ] Complete end-to-end flow

---

## Related Files

- **REVIEW_PHASES.md** - Code example validation
- **AGENTS.md** - Main documentation guidelines
- **Skills:** `/check-code-examples` - Auto-validates these patterns
# WAF Document Structure Patterns

This reference file contains detailed patterns for structuring WAF documents. These patterns ensure consistency across the framework and help both decision-makers and implementers succeed.

## When to Use This File

**Use this reference when:**
- Creating new WAF documents
- Reviewing document structure (Phase 4)
- Running `/check-structure` skill
- Understanding Why section format
- Planning workflow connections

**For quick checks, use:**
- `/check-structure` skill (auto-applies these patterns)

---

## "Why [topic]" Section

### Purpose
Explain strategic value early in the document (after intro, before implementation details). Helps decision-makers understand business impact within 2 minutes.

### Format Requirements

**Structure:**
1. Section titled "Why [topic]" (e.g., "Why prevent leaked secrets")
2. 3-4 **Bold challenge:** statements
3. Follow-up paragraph explaining how topic addresses challenges

**Challenge format:**
```markdown
**Challenge name:** Description of business/operational problem and its consequences.
```

### Best Practices

**Focus on business outcomes:**
- Explain consequences of NOT addressing the challenge
- Connect to operational, security, or compliance impact
- Use specific scenarios, not generic problems

**Example challenges:**
- "Eliminate deployment inconsistencies:" Manual configuration steps introduce differences...
- "Reduce deployment time and risk:" Writing infrastructure from scratch slows development...
- "Improve security compliance:" Inconsistent configurations increase audit failures...

### Complete Example

```markdown
## Why use infrastructure modules

**Reduce code duplication:** Teams copy infrastructure code across projects, creating maintenance burden and increasing the risk of configuration errors propagating across environments.

**Eliminate configuration drift:** Manual configuration steps introduce differences between environments, causing deployment failures and security gaps that are difficult to diagnose and fix.

**Accelerate deployment cycles:** Writing infrastructure from scratch for each project slows development and delays time to market, preventing teams from responding quickly to business needs.

**Improve security compliance:** Inconsistent security configurations across teams increase audit failures and expose vulnerabilities that attackers can exploit.

Infrastructure modules address these challenges by providing tested, reusable components that teams can share across projects, ensuring consistency and reducing time to deployment.
```

### Common Mistakes

❌ **Too few challenges** (only 1-2)
- Need 3-4 to show comprehensive value

❌ **Generic problems** without consequences
- "Code duplication is bad" → Need to explain WHY and WHAT happens

❌ **Missing follow-up paragraph**
- Must explain how topic solves the challenges

❌ **Wrong format** for bold titles
- `**Challenge** - Description` ❌
- `**Challenge:** Description` ✅

---

## Workflow Connections

### Purpose
Help users understand how documents connect in end-to-end workflows. Show prerequisite relationships and logical flow.

### Pattern Examples

**Sequential workflow:**
- "After [packaging your application](/link) into images, deploy these artifacts using..."
- "Before you can [deploy](/link), you must [configure backends](/link)..."
- "Once you have [classified data](/link), implement [encryption](/link)..."

**Prerequisite relationships:**
- "To enable [feature X](/link), first [configure Y](/link)..."
- "This approach requires [Z](/link) to be configured..."

**Alternative paths:**
- "Instead of [approach A](/link), you can [approach B](/link) when..."

### Where to Place

**In body text** (not just resources sections):
- Beginning of implementation sections
- Transitions between major topics
- Before code examples that depend on previous work

### Complete Example

```markdown
## Deploy containerized applications

After [packaging your application](/path/to/packaging) into container images and [storing them in a registry](/path/to/registry), deploy these artifacts to your target environment using an orchestrator.

Before you can deploy, [configure your infrastructure](/path/to/infrastructure) to support container workloads.
```

### Benefits
- Users understand prerequisites
- Reduces confusion about order of operations
- Helps users discover related content
- Shows how WAF docs form complete solutions

---

## Decision Guidance

### Purpose
When presenting multiple options (tools, approaches, strategies), clearly state when to use each. Help decision-makers choose confidently.

### Pattern: "Use X when you need..."

**Structure:**
```markdown
Use [Option A] when you need [specific criteria]:
- Criterion 1
- Criterion 2
- Criterion 3

Use [Option B] when you need [different criteria]:
- Criterion 1
- Criterion 2
```

### Best Practices

**Use neutral criteria** (not comparisons):
- ✅ "Use Kubernetes when you need extensive ecosystem tooling, have complex networking requirements..."
- ❌ "Use Kubernetes when you need something more powerful than..."

**Avoid subjective language:**
- ❌ "simpler", "easier", "better"
- ✅ Specific technical criteria

**Provide concrete scenarios:**
- ✅ "Use Docker when you have single-host deployments under 10 containers"
- ❌ "Use Docker for simple use cases"

### Complete Example

```markdown
## Choose a deployment strategy

Use blue/green deployment when you need:
- Zero-downtime deployments for customer-facing applications
- Ability to instantly roll back to previous version
- Capacity to run two full environments simultaneously

Use canary deployment when you need:
- Gradual traffic shifting to validate changes
- Lower infrastructure costs (no duplicate environment)
- Real user validation before full rollout
```

---

## Code Example Summaries

### Purpose
After code blocks, explain what the configuration accomplishes and why it matters. Help implementers understand context and outcomes.

### Required Elements

**1. What the code does**
- "This template copies application files..."
- "The configuration creates..."

**2. What it produces**
- "Running `packer build` produces AMI ami-0abc123..."
- "Terraform outputs..."

**3. How to use the output**
- "Reference this AMI in Terraform using a data source"
- "Use this output in..."

**4. Why it matters**
- "This creates immutable infrastructure that deploys consistently"
- "This approach enables team collaboration by..."

### Complete Example

```markdown
```hcl
data "aws_ami" "app" {
  most_recent = true
  owners      = ["self"]

  filter {
    name   = "tag:Application"
    values = ["web-app"]
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.app.id
  instance_type = "t2.micro"
}
\```

The data source queries the most recent AMI built by Packer with the web-app tag. Running `terraform apply` creates an EC2 instance using this AMI. This eliminates manual AMI ID updates when you rebuild images and ensures deployments always use the latest application version. Terraform stores this configuration in state, enabling team collaboration and tracking infrastructure changes over time.
```

### Placement
- **After code blocks** (preferred)
- Before code blocks if introducing context
- Never skip summaries on implementation examples

---

## Document Ending Structure

### Purpose
Provide consistent, predictable organization so users know where to find resources and next steps.

### Standard Order

**1. HashiCorp resources**
- Links to tutorials, product docs, WAF cross-references
- Always present

**2. External resources** (optional)
- Third-party documentation (AWS, Azure, GCP, NIST, etc.)
- Only include if valuable and credible

**3. Next steps**
- Links to related WAF documents
- Context about what was learned
- Guidance on logical next topics

### Complete Example

```markdown
## HashiCorp resources

- Learn how to [grant least privilege](/waf/link) for identity management
- Get started with [Vault tutorials](/vault/get-started) for hands-on examples
- Read the [Vault documentation](/vault/docs) for comprehensive features

## External resources

- [NIST Cybersecurity Framework](https://nist.gov/cyberframework)
- [OWASP Secrets Management Cheat Sheet](https://owasp.org/cheatsheets)

## Next steps

In this section, you learned how to prevent leaked secrets through separation of duties, dynamic credentials, and centralized secret management. Learn how to [detect and remediate leaked secrets](/waf/remediate) when they occur.
```

### Common Mistakes

❌ **Wrong order**
- Next steps before resources ❌

❌ **Missing context in Next steps**
- Just links without explanation ❌

❌ **Generic resource links**
- Landing pages instead of specific docs ❌

---

## Document Structure Pattern

### Complete Document Flow

```markdown
---
page_title: [Title]
description: [150-160 characters]
---

# [H1 Title]

[Intro paragraph 1: Hook with problem/value]

[Intro paragraph 2: Expand on context]

[Optional intro paragraph 3: Preview of content]

[List of strategies/approaches with "the following"]

## Why [topic]

**Challenge 1:** Description...

**Challenge 2:** Description...

**Challenge 3:** Description...

**Challenge 4:** Description...

[Paragraph explaining how topic addresses challenges]

## Implementation section 1

[Content with workflow connections to related docs]

[Code example if valuable]

[Code example summary]

## Implementation section 2

[Content]

## HashiCorp resources

- [Links]

## External resources

- [Links]

## Next steps

[Context and related docs]
```

---

## Quick Reference

**Why sections:**
- 3-4 **Bold challenge:** statements
- Early in document
- Business/operational focus
- Follow-up explanation

**Workflow connections:**
- In body text
- "After [X], do Y" patterns
- Help users understand flow

**Decision guidance:**
- "Use X when you need..."
- Neutral criteria
- Specific scenarios

**Code summaries:**
- What, produces, use, why
- After code blocks
- 1-2 sentences minimum

**Document ending:**
1. HashiCorp resources
2. External resources (optional)
3. Next steps

---

## Related Files

- **REVIEW_PHASES.md** - Phase 4 checklist
- **AGENTS.md** - Main documentation guidelines
- **Skills:** `/check-structure` - Auto-applies these patterns
# HashiCorp Resources Section Patterns

This reference file contains detailed patterns for formatting and organizing HashiCorp resources sections. These patterns ensure consistent, user-friendly resource presentation across WAF documents.

## When to Use This File

**Use this reference when:**
- Adding/updating HashiCorp resources sections
- Reviewing resource link descriptions (Phase 6)
- Running `/check-resources` skill
- Understanding link formatting rules
- Organizing multi-tool resource sections

**For quick checks, use:**
- `/check-resources` skill (auto-applies these patterns)

---

## Organization Structure

### Balance Beginner and Advanced Links

Progressive organization from beginner to advanced:

1. **WAF cross-references** - Links to related WAF documents (always first)
2. **Get started section** - For beginners (tutorials, introductions, getting started guides)
3. **Core concepts section** - For intermediate users (documentation, CLI, key features)
4. **Advanced features section** - For advanced users (integrations, advanced configurations)
5. **Tool-specific sections** - When covering multiple tools, organize by tool with clear headings

---

## When to Group Resources vs. Keep Flat

### Use Flat Structure When:
- Links are similar in nature (mostly WAF cross-references)
- Document focuses on a single tool
- Total links are under 8
- Grouping would not improve readability

**Example:**
```markdown
## HashiCorp resources

- Learn how to [grant least privilege](/waf/path) for access management
- Get started with [Vault tutorials](/vault/get-started) for hands-on examples
- Read the [Vault documentation](/vault/docs) for comprehensive features
- Configure [Vault OIDC authentication](/vault/oidc) for SSO
- Use [Vault dynamic secrets](/vault/dynamic) for short-lived credentials
```

### Group with Subheadings When:
- Document covers multiple HashiCorp products (Packer, Nomad, Kubernetes, Vault)
- Links naturally fall into distinct categories by tool or purpose
- Total links exceed 8-10 and organization helps readability
- Users would benefit from quickly finding tool-specific resources

**Subheading format:**
- ✅ `Packer for containers:` (plain text with colon)
- ✅ `Nomad deployment resources:`
- ✅ `Kubernetes deployment resources:`
- ❌ `### Packer for containers` (no markdown headings)

**Example:**
```markdown
## HashiCorp resources

- Learn how to [package applications](/waf/packaging) for deployment

Get started with automation tools:

- Get started with [Terraform tutorials](/terraform/get-started) for infrastructure as code
- Get started with [Packer tutorials](/packer/get-started) for image building
- Get started with [Vault tutorials](/vault/get-started) for secrets management

Terraform for deployment:

- Deploy [applications to Kubernetes](/terraform/kubernetes)
- Manage [cloud infrastructure](/terraform/cloud)

Packer for containers:

- Build [Docker images](/packer/docker)
- Create [multi-platform images](/packer/multi)
```

**Use your judgment:** When in doubt, ask whether grouping helps the reader find what they need faster.

---

## Structure Options

### 1. Simple List

Use when resources are related and don't need categorization:

```markdown
## HashiCorp resources

- [Related WAF page](/path/to/page)
- Learn about [concept](/path)
- Get started with [tutorials](/path)
- Read the [documentation](/path)
```

### 2. Categorized with Introductory Text

Use when resources fall into distinct topics or multiple tools:

```markdown
## HashiCorp resources

- [WAF cross-reference links]

Learn about specific topic:

- Learn how to [do thing](/path)
- Read the [documentation](/path)

Deploy to specific platform:

- Deploy [specific thing](/path)
- Read the [provider documentation](/path)
```

---

## Formatting Rules

### Core Requirements

- **Start with WAF cross-references** (other pillar pages)
- **Use action verbs:** "Learn", "Read", "Get started with", "Deploy", "Use", "Create", "Implement", "Explore"
- **Group related links** under plain text introductions (not headings with ##)
- **Plain text introductions** should end with a colon
- **Keep link descriptions** concise and action-oriented
- **Multiple related providers** can be listed in one bullet with commas

---

## Example Structures

### Single-Tool Documents

```markdown
## HashiCorp resources

- [WAF cross-reference links]

Get started with Vault:

- Get started with [Vault tutorials] for hands-on examples
- Read the [Vault documentation] for comprehensive features

Vault for secrets management:

- Generate [dynamic database credentials](/vault/db)
- Configure [Vault OIDC authentication](/vault/oidc)

Vault advanced features:

- Implement [Vault Enterprise namespaces](/vault/namespaces)
- Use [Vault replication](/vault/replication)
```

### Multi-Tool Documents

```markdown
## HashiCorp resources

- [WAF cross-reference links]

Get started with automation tools:

- Get started with [Terraform tutorials] for infrastructure as code
- Get started with [Packer tutorials] for image building
- Get started with [Vault tutorials] for secrets management

Terraform for infrastructure:

- Deploy [Kubernetes clusters](/terraform/kubernetes)
- Manage [AWS infrastructure](/terraform/aws)

Packer for image building:

- Build [Docker images](/packer/docker)
- Create [AWS AMIs](/packer/aws)

Vault for secrets:

- Generate [dynamic credentials](/vault/dynamic)
- Configure [encryption as a service](/vault/transit)
```

### Real-World Examples

**Categorized resources:**
```markdown
To learn how to deploy applications to Kubernetes with Terraform:

- Learn how to deploy [Federated Multi-Cloud Kubernetes Clusters](/path)
- Read the [Terraform Kubernetes provider documentation](https://example.com)
```

**Multiple providers in one bullet:**
```markdown
- Review the artifact management Terraform providers: [Artifactory](url), [Nexus](url), and [CodeArtifact](url)
```

---

## Link Description Patterns

### Always Place Verbs OUTSIDE Link Brackets

**Good:**
- ✅ "Read the [Terraform documentation] for comprehensive features"
- ✅ "Get started with [Terraform tutorials] for hands-on examples"
- ✅ "Configure [Vault OIDC authentication] for centralized identity"

**Bad:**
- ❌ "Read the [Terraform documentation for comprehensive features]"
- ❌ "[Get started with Terraform tutorials] for hands-on examples"
- ❌ "[Configure Vault OIDC authentication for centralized identity]"

**Why:** Keeps link text concise and scannable

---

### Split Combined Documentation and Tutorial Links

**Bad:**
- ❌ "Learn X with the [documentation] and [tutorials]"

**Good (two bullets):**
- ✅ "Read the [documentation] for core concepts"
- ✅ "Follow hands-on [tutorials] for examples"

**Why:** Clearer structure, easier to scan

---

### Add Context Directly in Sentence (No Dashes)

**Good:**
- ✅ "Read the [Terraform Kubernetes provider documentation] for resource syntax and configuration options"
- ✅ "Learn about [Nomad job specifications] for container workloads"

**Bad:**
- ❌ "Read the [Terraform Kubernetes provider documentation] - for resource syntax and configuration"
- ❌ "Learn about [Nomad job specifications] - for containers"

**Why:** Better readability, more natural flow

---

### Use Specific, Descriptive Link Text

**Good:**
- ✅ "Explore [Kubernetes tutorials] for deployment patterns and workflows"
- ✅ "Read the [Sentinel documentation] for policy as code concepts"
- ✅ "Configure [Vault dynamic secrets] for time-limited database access"

**Bad:**
- ❌ "Browse [Kubernetes tutorials] for additional examples"
- ❌ "Read the [Sentinel documentation] and learn more"
- ❌ "Check out [Vault dynamic secrets]"

**Why:** Users understand value before clicking

---

## Standard Patterns for Common Link Types

### Documentation Links

```markdown
- Read the [Tool documentation] for comprehensive features
- Read the [Tool documentation] for [specific feature area]
- Read the [Tool introduction] to understand [core concept]
```

**Examples:**
- "Read the [Vault documentation] for comprehensive secrets management features"
- "Read the [Terraform AWS provider documentation] for EC2 and VPC resources"
- "Read the [Consul introduction] to understand service mesh concepts"

### Tutorial Links

```markdown
- Get started with [Tool tutorials] for hands-on examples
- Follow hands-on [Tool tutorials] for [specific use case]
- Explore [Tool tutorials] for [deployment patterns/workflows/examples]
```

**Examples:**
- "Get started with [Packer tutorials] for hands-on image building examples"
- "Follow hands-on [Terraform tutorials] for AWS infrastructure provisioning"
- "Explore [Nomad tutorials] for container orchestration workflows"

### Feature-Specific Links

```markdown
- Learn about [Feature] for [specific benefit]
- Use [Feature] to [accomplish specific task]
- Configure [Feature] for [specific outcome]
```

**Examples:**
- "Learn about [Terraform workspaces] for environment isolation"
- "Use [Vault dynamic secrets] to generate time-limited database credentials"
- "Configure [Sentinel policies] for compliance enforcement"

### Provider/Integration Links

```markdown
- Read the [Provider documentation] for [resource type] and configuration
- Use [Integration] for [specific purpose]
- Manage [resources] with the [Provider]
```

**Examples:**
- "Read the [Terraform Kubernetes provider documentation] for Deployment and Service resources"
- "Use [Vault Kubernetes auth] for pod-based authentication"
- "Manage [AWS infrastructure] with the [Terraform AWS provider]"

---

## Common Link Descriptions by Tool

### Standard Beginner Format (All Tools)

Pattern: "Learn [Tool] with the [[Tool] tutorials] and read the [[Tool] documentation]"

**Examples:**
- Terraform
- Vault
- Packer
- Consul
- Nomad
- Boundary

### Tool-Specific Examples

**Terraform:**
- "Get started with [AWS], [Azure], or [GCP]"
- "Learn the [Terraform language]"
- "Learn about [Terraform state]"

**Packer:**
- "Learn about [Packer builders]"
- "Use [Packer provisioners]"

**Vault:**
- "Learn about [Vault dynamic secrets]"
- "Use [Vault with Terraform]"

**Consul:**
- "Learn about [Consul service mesh]"

**Nomad:**
- "Learn about [Nomad job specifications]"

**Sentinel:**
- "Learn the [Sentinel language syntax]"

**HCP:**
- "Get started with [HCP Terraform]"
- "Learn about [HCP Packer]"
- "Use [HCP Packer channels]"

---

## Section Naming Conventions

Use clear, descriptive section headers that indicate the learning level or purpose:

### Beginner Sections

```markdown
Get started with [Tool]:
Get started with automation tools:
[Tool] foundations for [use case]:
```

**Examples:**
- "Get started with Terraform:"
- "Get started with automation tools:"
- "Vault foundations for secrets management:"

### Intermediate Sections

```markdown
[Tool] core concepts:
[Tool] documentation and tutorials:
[Tool] for [specific use case]:
```

**Examples:**
- "Terraform core concepts:"
- "Packer documentation and tutorials:"
- "Vault for dynamic secrets:"

### Advanced Sections

```markdown
[Tool] advanced features:
[Tool] integrations:
Automating [use case]:
[Tool] CI/CD automation:
```

**Examples:**
- "Terraform advanced features:"
- "Vault integrations:"
- "Automating compliance:"
- "Packer CI/CD automation:"

### Multi-Tool Sections

```markdown
[Tool] for [use case]:
[Feature area]:
```

**Examples:**
- "Terraform for GitOps:"
- "Packer for containers:"
- "Monitoring and observability:"
- "Policy enforcement:"

---

## Avoid These Anti-Patterns

### ❌ Generic Verbs Without Context

**Don't:**
- "Browse [tutorials]"
- "Learn more about [X]"
- "Check out [X]"

**Do:**
- "Explore [Kubernetes tutorials] for deployment patterns"
- "Learn about [Terraform state] for team collaboration"
- "Review the [Sentinel documentation] for policy as code"

### ❌ Dashes After Links

**Don't:**
- "Read the [documentation] - comprehensive guide"
- "Learn about [X] - for specific use case"

**Do:**
- "Read the [documentation] for comprehensive features"
- "Learn about [X] for specific use case"

### ❌ Verbs Inside Brackets

**Don't:**
- "[Learn about Terraform state]"
- "[Configure backends for state]"

**Do:**
- "Learn about [Terraform state]"
- "Configure [backends for state]"

### ❌ Combined Links Without Separation

**Don't:**
- "Learn X with the [documentation] and [tutorials]"

**Do (separate bullets):**
- "Read the [documentation] for core concepts"
- "Follow hands-on [tutorials] for examples"

### ❌ Missing Context

**Don't:**
- "Read the [Terraform Kubernetes provider documentation]" (what will they learn?)
- "Use [HCP Packer channels]" (for what purpose?)

**Do:**
- "Read the [Terraform Kubernetes provider documentation] for resource configuration"
- "Use [HCP Packer channels] for image promotion workflows"

### ❌ Tool Name Repetition

**Don't:**
- "Learn Packer with the Packer [documentation] and [tutorials]"

**Do:**
- "Read the Packer [documentation] for core concepts"
- "Follow hands-on [tutorials] for image building examples"

---

## Checklist for HashiCorp Resources Section

- [ ] WAF cross-reference links appear first
- [ ] Clear "Get started" section for beginners
- [ ] Progressive organization from beginner to advanced
- [ ] Verbs are outside link brackets
- [ ] Documentation and tutorial links are separate bullets
- [ ] Context is in the sentence, not after a dash
- [ ] Link descriptions explain what users will find
- [ ] Section names clearly indicate learning level
- [ ] No generic verbs like "browse" or "learn more"
- [ ] Tool-specific sections use consistent naming
- [ ] 5-8+ links per document (more for multi-tool docs)
- [ ] Links are specific, not generic dashboards

---

## Quick Reference

**Link format:**
- Verb OUTSIDE brackets: "Read the [docs]"
- Context in sentence: "...for specific purpose"
- No dashes: "...for purpose" not "... - for purpose"

**Organization:**
- WAF cross-refs first
- Beginner → Advanced progression
- Group when 8+ links or multiple tools

**Section naming:**
- Plain text with colon (not ## headings)
- Indicate learning level
- Descriptive and specific

---

## Related Files

- **REVIEW_PHASES.md** - Phase 6: Link Quality & Balance
- **AGENTS.md** - Main documentation guidelines
- **Skills:** `/check-resources` - Auto-applies these patterns
# Tool-Specific Documentation Patterns

This reference file contains requirements for documenting specific HashiCorp tools. Different tools need different documentation approaches to serve implementers effectively.

## When to Use This File

**Use this reference when:**
- Writing documentation about specific tools (Packer, Terraform, Sentinel, etc.)
- Reviewing tool-specific content
- Understanding what to show for each tool
- Creating multi-tool integration guides

**Related files:**
- **CODE_PATTERNS.md** - Code example requirements
- **AGENTS.md** - General documentation guidelines
- **Skills:** `/check-code-examples` - Validates tool-specific patterns

---

## Packer Documents Must Show

### Required Elements

1. **Complete build blocks with provisioners** (not just source definitions)
2. **How application code gets into images**
3. **How to tag/version images for tracking**
4. **How outputs connect to deployment tools** (Terraform, Kubernetes, Nomad)

### What to Include

**Source definitions:**
- Realistic source configuration
- Proper AMI/image selection (filters, not hardcoded)
- SSH/WinRM configuration

**Provisioners:**
- File provisioner copying application code
- Shell provisioner installing dependencies
- Configuration steps for application setup

**Post-processors:**
- Docker-tag for container versioning
- Manifest for CI/CD integration
- Appropriate tagging strategy

### Complete Example

```hcl
source "amazon-ebs" "web_app" {
  ami_name      = "web-app-{{timestamp}}"
  instance_type = "t2.micro"
  region        = "us-east-1"

  source_ami_filter {
    filters = {
      name                = "ubuntu/images/*ubuntu-focal-20.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }

  ssh_username = "ubuntu"
}

build {
  sources = ["source.amazon-ebs.web_app"]

  # Copy application files
  provisioner "file" {
    source      = "app/"
    destination = "/tmp/app"
  }

  # Install and configure
  provisioner "shell" {
    inline = [
      "sudo mv /tmp/app /opt/app",
      "sudo chown -R app:app /opt/app",
      "sudo systemctl enable app.service"
    ]
  }

  # Record AMI for downstream tools
  post-processor "manifest" {
    output     = "manifest.json"
    strip_path = true
  }
}
```

**Summary:**
"This Packer template builds an AWS AMI with your application installed at /opt/app. The provisioners copy files, set ownership, and configure systemd for automatic startup. The manifest post-processor records the AMI ID in manifest.json for use in Terraform deployments. Running `packer build` creates a versioned, immutable image that deploys consistently across environments."

### Common Mistakes

❌ **Empty build blocks** without provisioners
❌ **No post-processors** for versioning/tracking
❌ **Hardcoded source AMIs** instead of filters
❌ **No explanation** of how Terraform/Kubernetes uses the image

### Workflow Integration

**Show how Packer outputs connect to:**
- Terraform (data source queries by tag)
- Kubernetes (image registry references)
- Nomad (artifact stanza using image)
- CI/CD (manifest.json in pipelines)

---

## Terraform Documents Must Show

### Required Elements

1. **Backend configuration** for state management
2. **Data sources** for querying dynamic values (not hardcoded IDs)
3. **How to reference artifacts** from other tools (Packer AMIs, container images)
4. **Resource tags** for organization and filtering

### What to Include

**Backend configuration:**
```hcl
terraform {
  backend "remote" {
    organization = "my-org"
    workspaces {
      name = "production"
    }
  }
}
```

**Data sources instead of hardcoded values:**
```hcl
data "aws_ami" "packer_built" {
  most_recent = true
  owners      = ["self"]

  filter {
    name   = "tag:Name"
    values = ["web-app-*"]
  }
}
```

**Resource tags:**
```hcl
resource "aws_instance" "web" {
  ami = data.aws_ami.packer_built.id

  tags = {
    Name        = "web-server"
    Environment = "production"
    ManagedBy   = "terraform"
    CostCenter  = "engineering"
  }
}
```

### Complete Example

```hcl
terraform {
  backend "remote" {
    organization = "my-org"
    workspaces {
      name = "production"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# Query AMI built by Packer
data "aws_ami" "app" {
  most_recent = true
  owners      = ["self"]

  filter {
    name   = "tag:Application"
    values = ["web-app"]
  }

  filter {
    name   = "tag:Environment"
    values = ["production"]
  }
}

# Get latest container image from registry
data "docker_registry_image" "app" {
  name = "myregistry/myapp:latest"
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.app.id
  instance_type = "t2.micro"

  user_data = templatefile("userdata.sh", {
    container_image = data.docker_registry_image.app.name
  })

  tags = {
    Name        = "web-server"
    Environment = "production"
    ManagedBy   = "terraform"
    Application = "web-app"
  }
}

output "instance_id" {
  value       = aws_instance.web.id
  description = "EC2 instance ID for monitoring configuration"
}
```

**Summary:**
"Terraform queries the latest AMI built by Packer using tag filters, ensuring deployments always use the most recent application image. The remote backend stores state in HCP Terraform, enabling team collaboration, state locking, and audit trails. Resource tags enable cost tracking and resource filtering. Running `terraform apply` creates infrastructure with proper tagging and outputs the instance ID for integration with monitoring tools."

### Common Mistakes

❌ **Hardcoded AMI/resource IDs**
❌ **No backend configuration** (local state only)
❌ **Missing resource tags**
❌ **No outputs** for downstream tools
❌ **No data sources** (all values hardcoded)

### Workflow Integration

**Show how Terraform integrates with:**
- Packer (query AMIs via data sources)
- Vault (dynamic secrets injection)
- Consul (service discovery configuration)
- Nomad (infrastructure for workload placement)
- Sentinel (policy enforcement)

---

## Sentinel Documents Must Show

### Required Elements

1. **Complete policies** with imports and rules
2. **How policies evaluate plans** (what gets checked)
3. **What happens when policies fail** (blocks apply, shows violations)
4. **How to test policies** before deploying them

### What to Include

**Complete policy with imports:**
```sentinel
import "tfplan/v2" as tfplan
import "strings"

# Helper functions
validate_tags = func(resource) {
  required_tags = ["Environment", "Owner", "CostCenter"]

  for required_tags as tag {
    if resource.change.after.tags not contains tag {
      return false
    }
  }

  return true
}

# Find resources
all_resources = filter tfplan.resource_changes as _, rc {
  rc.mode is "managed" and
  rc.change.actions contains "create"
}

# Validate
violations = filter all_resources as address, resource {
  not validate_tags(resource)
}

# Main rule
main = rule {
  length(violations) == 0
}
```

**Explain what gets checked:**
"This policy evaluates all newly created resources in the Terraform plan. It checks whether each resource has the required tags: Environment, Owner, and CostCenter. The policy runs during `terraform plan` before any infrastructure changes occur."

**Explain failure behavior:**
"If any resource is missing required tags, the policy fails and blocks `terraform apply`. The policy output shows which resources violated the rule and which tags are missing, allowing you to fix the configuration before rerunning the plan."

**Show testing approach:**
"Test the policy using the Sentinel simulator before deploying to HCP Terraform. Create mock Terraform plans with both compliant and non-compliant resources to verify the policy catches violations correctly."

### Complete Example

```sentinel
import "tfplan/v2" as tfplan
import "strings"

# Configuration
required_tags = ["Environment", "Owner", "CostCenter", "Application"]
allowed_instance_types = ["t2.micro", "t2.small", "t3.micro", "t3.small"]

# Validate tags
validate_tags = func(resource) {
  if resource.change.after.tags is null {
    return false
  }

  for required_tags as tag {
    if resource.change.after.tags not contains tag {
      return false
    }
  }

  return true
}

# Validate instance type
validate_instance_type = func(resource) {
  instance_type = resource.change.after.instance_type
  return instance_type in allowed_instance_types
}

# Find all EC2 instances
ec2_instances = filter tfplan.resource_changes as _, rc {
  rc.type is "aws_instance" and
  rc.mode is "managed" and
  (rc.change.actions contains "create" or rc.change.actions contains "update")
}

# Check tags
tag_violations = filter ec2_instances as address, resource {
  not validate_tags(resource)
}

# Check instance types
type_violations = filter ec2_instances as address, resource {
  not validate_instance_type(resource)
}

# Policy rules
tag_rule = rule {
  length(tag_violations) == 0
}

type_rule = rule {
  length(type_violations) == 0
}

main = rule {
  tag_rule and type_rule
}
```

**Summary:**
"This Sentinel policy enforces required tags and allowed instance types for EC2 instances. It runs during `terraform plan`, checking all instances being created or updated. If violations occur, the policy fails and blocks `terraform apply`, displaying which resources need fixing. Test the policy with the Sentinel simulator using mock plans before deploying to HCP Terraform to ensure it catches violations correctly."

### Common Mistakes

❌ **Incomplete policies** (missing imports or helper functions)
❌ **No explanation** of what gets checked
❌ **No failure behavior** description
❌ **No testing guidance**

### Workflow Integration

**Show how Sentinel integrates with:**
- Terraform (policy checks during plan)
- HCP Terraform (policy sets and enforcement levels)
- CI/CD (automated policy testing)
- VCS (policy as code in repositories)

---

## Integration Documents (Multi-Tool) Must Show

### Required Elements

1. **Clear workflow sequence** (Tool A → Tool B → Tool C)
2. **How outputs from one tool become inputs to the next**
3. **Example values that match across all tools**
4. **End-to-end example showing complete flow**

### Complete Integration Example

**Workflow:** Packer builds image → Terraform deploys infrastructure → Vault provides secrets

**Step 1: Packer builds AMI**
```hcl
# packer/web-app.pkr.hcl
build {
  name = "web-app"
  sources = ["source.amazon-ebs.web"]

  provisioner "file" {
    source      = "dist/"
    destination = "/opt/app"
  }

  provisioner "shell" {
    inline = [
      "cd /opt/app",
      "npm install --production"
    ]
  }

  post-processor "manifest" {
    output = "manifest.json"
  }
}
```
Output: AMI ami-0abc123 tagged as `web-app-1678901234`

**Step 2: Terraform queries AMI and deploys**
```hcl
# terraform/main.tf
data "aws_ami" "app" {
  most_recent = true
  owners      = ["self"]

  filter {
    name   = "tag:Name"
    values = ["web-app-*"]
  }
}

data "vault_generic_secret" "db" {
  path = "secret/database/prod"
}

resource "aws_instance" "web" {
  ami = data.aws_ami.app.id  # Uses Packer-built AMI

  user_data = templatefile("userdata.sh", {
    db_host     = data.vault_generic_secret.db.data["host"]
    db_password = data.vault_generic_secret.db.data["password"]
  })

  tags = {
    Name = "web-app-${data.aws_ami.app.id}"
  }
}
```

**Step 3: Vault provides dynamic secrets**
```bash
# vault/setup.sh
vault secrets enable database

vault write database/config/postgres \
  plugin_name=postgresql-database-plugin \
  allowed_roles="web-app" \
  connection_url="postgresql://{{username}}:{{password}}@postgres:5432/app"

vault write database/roles/web-app \
  db_name=postgres \
  creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}';" \
  default_ttl="1h" \
  max_ttl="24h"
```

**Summary:**
"This workflow demonstrates immutable infrastructure with dynamic secrets. Packer builds an AMI with your application and outputs the AMI ID to manifest.json. Terraform queries the latest AMI using a data source and creates an EC2 instance. The Vault provider injects dynamic database credentials at deployment time. This approach ensures consistent deployments with automatic credential rotation, reducing secret exposure and meeting compliance requirements."

### Common Mistakes

❌ **Unclear sequence** (tools mentioned randomly)
❌ **No connection** between outputs and inputs
❌ **Mismatched example values** (Packer builds `app-123`, Terraform references `service-456`)
❌ **No complete flow** (only shows isolated pieces)

### What to Show

**For each tool in workflow:**
1. What it does in the sequence
2. What it receives as input (from previous tool)
3. What it produces as output (for next tool)
4. How outputs are formatted/tagged for discovery

---

## Quick Reference by Tool

| Tool | Must Show | Common Mistake |
|------|-----------|----------------|
| **Packer** | Provisioners, post-processors, workflow integration | Empty build blocks |
| **Terraform** | Backend, data sources, tags, artifact queries | Hardcoded values |
| **Sentinel** | Complete policies, what gets checked, failure behavior | Incomplete examples |
| **Vault** | Dynamic secrets, rotation, integration | Static credentials only |
| **Consul** | Service mesh config, health checks, discovery | Generic service registry info |
| **Nomad** | Job specs, artifact stanza, service integration | Empty task definitions |
| **Integration** | Tool A → B → C sequence, matching values | Disconnected examples |

---

## Related Files

- **CODE_PATTERNS.md** - Complete code example requirements
- **DOCUMENT_PATTERNS.md** - Overall document structure
- **AGENTS.md** - General documentation guidelines
- **Skills:** `/check-code-examples` - Validates tool-specific patterns
# Common Documentation Pitfalls

This reference file identifies frequent content issues in WAF documentation. Use it to avoid common mistakes that reduce document quality and user success.

## When to Use This File

**Use this reference when:**
- Reviewing document completeness
- Checking for content gaps
- Validating document depth
- Running comprehensive reviews (Phase 1, Phase 7)
- Creating new WAF documents

**Related skills:**
- `/check-code-examples` - Validates against code pitfalls
- `/review-doc` - Comprehensive review using Phase 1 and Phase 7

---

## Content Gaps

### Empty Base Examples

**Problem:** Code examples that don't show the actual use case

**Wrong:**
```hcl
# Creates empty Ubuntu image with no application - not useful!
source "docker" "ubuntu" {
  image  = "ubuntu:20.04"
  commit = true
}

build {
  sources = ["source.docker.ubuntu"]
}
```

**Right:**
```hcl
# Shows complete application packaging workflow
source "docker" "ubuntu" {
  image  = "ubuntu:20.04"
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
    tags       = ["1.0.0"]
  }
}
```

**Why it matters:** Implementers need to see complete workflows, not skeleton configurations. Empty templates don't show how to solve real problems.

**How to fix:**
- Add provisioners showing application installation
- Include post-processors for versioning
- Show realistic file paths and commands
- Explain what the example produces

---

### Missing Workflow Connections

**Problem:** Not explaining how outputs connect to inputs between tools

**Wrong:**
```hcl
resource "aws_instance" "web" {
  ami = "ami-12345678"  # Where did this come from? How do I update it?
  instance_type = "t2.micro"
}
```

**Right:**
```hcl
# Query AMI built by Packer
data "aws_ami" "packer_image" {
  most_recent = true
  owners      = ["self"]

  filter {
    name   = "tag:Name"
    values = ["web-app-*"]
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.packer_image.id
  instance_type = "t2.micro"
}
```

With explanation:
"The data source queries the most recent AMI built by Packer with the web-app tag. Running `packer build` in your CI/CD pipeline produces tagged AMIs that Terraform automatically discovers. This eliminates manual AMI ID updates and ensures deployments always use the latest application version."

**Why it matters:** Users need to understand how tools integrate in end-to-end workflows.

**How to fix:**
- Show how Packer outputs become Terraform inputs
- Explain tagging/naming strategies for discovery
- Use data sources instead of hardcoded values
- Add summaries connecting the workflow

---

### Generic Tool Documentation

**Problem:** Content that could apply to any tool, not HashiCorp-specific

**Wrong:**
"Test your infrastructure before deploying it to production. Testing helps catch errors early and reduces deployment risk."

**Right:**
"Use Sentinel for policy-as-code to enforce compliance requirements before deployment. Validate infrastructure changes with Terratest to ensure resources deploy correctly. Sentinel policies run during `terraform plan`, blocking non-compliant changes before they reach production. Terratest executes actual deployment and validation, ensuring infrastructure behaves as expected."

**Why it matters:** WAF docs should show how HashiCorp tools solve problems, not provide generic advice.

**How to fix:**
- Name specific HashiCorp tools (Sentinel, Terratest, Vault, etc.)
- Show how to use the tools
- Link to product docs and tutorials
- Provide tool-specific examples

---

### Missing Outcomes

**Problem:** Not explaining what happens when you run the code

**Wrong:**
Shows code with no explanation:
```hcl
build {
  sources = ["source.amazon-ebs.web"]
  # ... provisioners
}
```
→ Next section

**Right:**
Shows code with outcome explanation:
```hcl
build {
  sources = ["source.amazon-ebs.web"]
  # ... provisioners
}
```

"Running `packer build web-app.pkr.hcl` produces an AWS AMI with ID ami-0abc123 tagged as `web-app-1678901234`. The manifest post-processor records this AMI ID in manifest.json for use in CI/CD pipelines. Reference this AMI in Terraform using the aws_ami data source, filtered by the tag:Name pattern `web-app-*` to always deploy the most recent build."

**Why it matters:** Implementers need to know what artifacts they create and how to use them.

**How to fix:**
- State what command produces (AMI ID, container tag, etc.)
- Explain where output is stored (manifest, state, etc.)
- Show how to use the output in next workflow step
- Connect to broader deployment workflow

---

## Document Depth Red Flags

### Too Short (< 500 words)

**Red flag:** Document under 500 words likely lacks depth for implementers

**Symptoms:**
- Missing "Why" section
- No code examples
- < 3 HashiCorp resource links
- Implementation details glossed over

**Impact:**
- Decision-makers can't understand strategic value
- Implementers can't get started
- Document doesn't serve either persona

**How to fix:**
- Add "Why [topic]" section with 3-4 challenges
- Include representative code example
- Provide 5-8 HashiCorp resource links
- Expand implementation guidance
- Compare to similar existing documents

---

### Implementation Guides Without Examples

**Red flag:** Implementation guide without code examples may leave implementers unable to get started

**Example of problem:**
Document titled "Deploy applications with blue/green strategy" but contains only:
- Definition of blue/green deployment
- Benefits list
- Link to external docs

**What's missing:**
- Terraform code showing dual environment setup
- Routing configuration switching traffic
- Rollback procedure example

**How to fix:**
- Add complete code example showing implementation
- Show both environments configured
- Demonstrate traffic switching mechanism
- Include rollback example
- Add summary explaining the workflow

---

### Insufficient Resources (< 3 links)

**Red flag:** Fewer than 3 HashiCorp resource links means implementers lack implementation guidance

**Minimum required:**
- WAF cross-reference (related pillar doc)
- Tutorial link (hands-on learning)
- Product documentation (reference)

**Target:**
- 5-8 links for single-tool documents
- 8-12+ links for multi-tool documents

**Example good resources section:**
```markdown
## HashiCorp resources

- Learn how to [package applications](/waf/packaging) for deployment
- Get started with [Terraform tutorials](/terraform/get-started)
- Read the [Terraform documentation](/terraform/docs)
- Deploy to [AWS](/terraform/aws), [Azure](/terraform/azure), or [GCP](/terraform/gcp)
- Use [Terraform workspaces](/terraform/workspaces) for environment isolation
- Configure [Terraform backends](/terraform/backends) for state management
- Implement [Terraform modules](/terraform/modules) for reusable components
```

**How to fix:**
- Add WAF cross-references first
- Include beginner resources (get started, tutorials)
- Add product docs links
- Include feature-specific links (relevant to doc topic)
- Organize with progression from beginner to advanced

---

### Too Shallow Compared to Similar Docs

**Red flag:** If your document is 1/3 the length of similar documents, it's probably too shallow

**How to check:**
- Find 2-3 similar WAF documents (same pillar, similar topic)
- Compare word counts
- Compare code examples (0 vs 2)
- Compare resource links (3 vs 8)
- Compare "Why" section depth

**Example:**
- Your doc: "Use encryption" (400 words, 0 examples, 2 links)
- Similar doc: "Encrypt data at rest" (1,100 words, 2 examples, 8 links)
- **Problem:** Your doc is too shallow

**How to fix:**
- Read similar documents for structure ideas
- Match depth of similar successful documents
- Add code examples if similar docs have them
- Expand resource links to match coverage
- Ensure both personas (decision-makers + implementers) are served

---

## Quality Self-Check

Use this checklist to avoid common pitfalls:

### Content Quality
- [ ] Code examples are complete, not empty templates
- [ ] Examples show realistic values (data sources, not hardcoded IDs)
- [ ] Workflow connections explained (Packer → Terraform → Vault)
- [ ] HashiCorp-specific guidance (not generic advice)
- [ ] Outcomes explained (what command produces)

### Document Depth
- [ ] Document is 700-1,200 words (or more if needed)
- [ ] Has "Why" section with 3-4 challenges
- [ ] Implementation guides include code examples
- [ ] 5-8+ HashiCorp resource links
- [ ] Comparable depth to similar documents

### Both Personas Served
- [ ] Decision-makers understand strategic value
- [ ] Implementers have actionable guidance
- [ ] Code examples help implementers get started
- [ ] Links provide path to deeper learning

---

## When Documents Are Too Short

**Problem:** Sub-500 word document

**Diagnosis questions:**
1. Does it have a "Why" section? (If no, add it - minimum 100 words)
2. Does it have code examples? (If no and it's implementation guide, add them)
3. Does it have 5+ resource links? (If no, add more)
4. Does it explain workflow connections? (If no, add them)

**Typical expansion:**
- Base document: 350 words
- Add Why section (3-4 challenges): +200 words
- Add code example + summary: +150 words
- Expand implementation details: +200 words
- Result: 900 words → much more useful

---

## When Documents Lack Examples

**Problem:** Implementation guide without code

**Diagnosis questions:**
1. Is this an implementation guide? (If yes, needs examples)
2. Is this showing how to use a tool? (If yes, needs examples)
3. Is this explaining a workflow? (If yes, likely needs examples)
4. Is this strategic overview? (If yes, examples optional)

**What to add:**
- 1-2 complete code examples
- Summaries explaining what examples do
- Workflow connections (how example outputs are used)
- Representative patterns implementers can adapt

---

## Related Files

- **CODE_PATTERNS.md** - Patterns for complete, realistic examples
- **DOCUMENT_PATTERNS.md** - Structure patterns for depth
- **REVIEW_PHASES.md** - Phase 1 (User Success) and Phase 7 (Final Check)
- **AGENTS.md** - Document depth guidelines
- **Skills:** `/check-code-examples`, `/review-doc`
