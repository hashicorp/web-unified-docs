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
