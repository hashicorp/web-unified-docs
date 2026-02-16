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
