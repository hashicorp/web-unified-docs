---
name: check-code-examples
description: Validate code examples have summaries, are complete, use realistic values, and follow WAF patterns for Terraform, Packer, and other tools.
argument-hint: <file-paths> [--fix]
disable-model-invocation: true
---

# Check Code Examples Skill

Validates code examples against AGENTS.md standards. Ensures examples have summaries, are complete and realistic, and follow tool-specific patterns.

## Usage

```bash
/check-code-examples <file-paths> [options]
```

## Arguments

- **file-paths**: One or more `.mdx` files to check (required)
  - Single file: `/check-code-examples docs/deploy.mdx`
  - Multiple files: `/check-code-examples docs/file1.mdx docs/file2.mdx`
  - Glob pattern: `/check-code-examples docs/**/*.mdx`

- **--fix** or **-f**: Automatically add basic summaries where missing
- **--report-only** or **-r**: Generate report without changes

## What This Skill Checks

### 1. **Code Block Summaries**

**Rule:** Each code block needs 1-2 sentences explaining what it does and why it matters

**Bad Example:**
```markdown
```hcl
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
}
\`\`\`

## Next section...
```

**Good Example:**
```markdown
```hcl
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
}
\`\`\`

Terraform creates a t2.micro EC2 instance using the specified AMI. The configuration stores infrastructure state remotely, enabling team collaboration and preventing configuration drift.

## Next section...
```

**Auto-fixable:** Partial (can add placeholder summaries that need manual review)

---

### 2. **Complete Examples (Not Empty Templates)**

**Rule:** Examples should show actual use cases, not empty base configurations

**Bad Example - Empty Packer:**
```hcl
# BAD: Creates empty Ubuntu image with no application
source "docker" "ubuntu" {
  image  = "ubuntu:20.04"
  commit = true
}

build {
  sources = ["source.docker.ubuntu"]
}
```

**Good Example - Complete Packer:**
```hcl
# GOOD: Shows actual application packaging
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

**Auto-fixable:** No (requires understanding use case)

---

### 3. **Realistic Values with Context**

**Rule:** Use realistic values with explanations, not hardcoded placeholders

**Bad Example:**
```hcl
# BAD: Hardcoded AMI with no context
resource "aws_instance" "web" {
  ami = "ami-12345678"
  instance_type = "t2.micro"
}
```

**Good Example:**
```hcl
# GOOD: Data source to query AMI dynamically
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

Summary: "The data source queries the most recent AMI built by Packer with the web-app tag. This eliminates manual AMI ID updates when you rebuild images."

**Auto-fixable:** No (requires architecture knowledge)

---

### 4. **Packer Examples Must Include**

**Required elements:**
- ✅ Provisioners (file, shell) showing how app code gets into image
- ✅ Post-processors (docker-tag, manifest) for versioning
- ✅ Realistic application setup (not empty base images)

**Bad Example:**
```hcl
# Missing: provisioners, post-processors, actual application
source "amazon-ebs" "example" {
  ami_name      = "my-ami"
  instance_type = "t2.micro"
  region        = "us-east-1"
  source_ami    = "ami-12345678"
}

build {
  sources = ["source.amazon-ebs.example"]
}
```

**Good Example:**
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
}

build {
  sources = ["source.amazon-ebs.web_app"]

  provisioner "file" {
    source      = "app/"
    destination = "/tmp/app"
  }

  provisioner "shell" {
    inline = [
      "sudo mv /tmp/app /opt/app",
      "sudo systemctl enable app.service"
    ]
  }

  post-processor "manifest" {
    output = "manifest.json"
  }
}
```

**Auto-fixable:** No

---

### 5. **Terraform Examples Must Show**

**Required elements:**
- ✅ Data sources for dynamic values (not hardcoded IDs)
- ✅ Backend configuration for state management
- ✅ Connection to workflow (where values come from)
- ✅ Resource tags for organization

**Bad Example:**
```hcl
# Missing: backend, data sources, tags, context
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
}
```

**Good Example:**
```hcl
terraform {
  backend "remote" {
    organization = "my-org"
    workspaces {
      name = "production"
    }
  }
}

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

  tags = {
    Name        = "web-server"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}
```

Summary: "Terraform queries the latest AMI built by Packer using tags. Remote state enables team collaboration and tracks infrastructure changes over time."

**Auto-fixable:** No

---

### 6. **Example Summaries Must Explain**

**Required in summaries:**
1. **What the code does** - "This template copies application files..."
2. **What it produces** - "Running `packer build` produces AMI ami-0abc123..."
3. **How to use the output** - "Reference this AMI in Terraform using a data source"
4. **Why it matters** - "This creates immutable infrastructure that deploys consistently"

**Bad Summary:**
"This is a Packer configuration."

**Good Summary:**
"This Packer template copies application files to /opt/app and installs dependencies. Running `packer build` produces a tagged AMI with your application pre-installed. Reference the AMI in Terraform using the data source pattern shown above. This approach creates immutable infrastructure that deploys consistently across environments."

**Auto-fixable:** No (requires understanding architecture)

---

### 7. **Language Tags on All Code Blocks**

**Rule:** Every code block must have a language tag

**Bad Example:**
```
resource "aws_instance" "web" {
  ami = "ami-12345678"
}
```

**Good Example:**
```hcl
resource "aws_instance" "web" {
  ami = "ami-12345678"
}
```

**Auto-fixable:** Partial (can detect common patterns like `resource`, `data`, `provider` → hcl)

---

### 8. **Code Examples When Valuable**

**Rule:** Add examples when they provide clear value to implementers

**Appropriate for:**
- ✅ Implementation guides
- ✅ Technical how-tos
- ✅ Documents showing specific tool usage
- ✅ Workflow demonstrations

**Not necessary for:**
- ❌ Strategic overviews
- ❌ Decision guides
- ❌ High-level concept documents

**Auto-fixable:** No (requires content judgment)

---

## Output Format

```
Code Examples Check
===================

Files Checked: 2
Code Blocks Found: 8
Issues Found: 12

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 docs/deploy.mdx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Code Block 1 (lines 45-58)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type: Terraform HCL
Language Tag: ✅ hcl

❌ MISSING SUMMARY
  No summary found after code block
  💡 Add 1-2 sentences explaining:
     - What the code does
     - What it produces
     - Why it matters
  [MANUAL REVIEW]

❌ HARDCODED VALUES
  Line 47: ami = "ami-12345678" (hardcoded)
  💡 Use data source to query AMI dynamically
  [MANUAL REVIEW]

❌ MISSING BACKEND
  No terraform backend configuration
  💡 Add backend for state management
  [MANUAL REVIEW]

Code Block 2 (lines 89-102)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type: Packer HCL
Language Tag: ✅ hcl

✅ HAS SUMMARY (lines 104-105)

❌ EMPTY TEMPLATE
  Build block has no provisioners
  💡 Add file/shell provisioners showing app installation
  [MANUAL REVIEW]

❌ NO POST-PROCESSORS
  Missing docker-tag or manifest post-processor
  💡 Add versioning/tagging for built artifacts
  [MANUAL REVIEW]

Code Block 3 (lines 145-150)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type: Shell/Bash
Language Tag: ❌ MISSING

❌ NO LANGUAGE TAG
  Code block missing language identifier
  💡 Add: ```bash or ```shell-session
  [AUTO-FIX AVAILABLE]

✅ HAS SUMMARY (lines 152-153)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SUMMARY BY TYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Terraform Examples: 3
  ├─ Missing summaries: 2
  ├─ Hardcoded values: 2
  └─ Missing backend: 2

Packer Examples: 2
  ├─ Empty templates: 1
  ├─ Missing provisioners: 1
  └─ Missing post-processors: 1

Other Code Blocks: 3
  ├─ Missing language tags: 1
  └─ Missing summaries: 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERALL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Issues: 12
  ├─ Auto-fixable: 1
  └─ Manual Review: 11

Most common issues:
1. Missing code summaries (3)
2. Hardcoded values instead of data sources (2)
3. Empty Packer templates (1)
```

## Common Fixes

### Add Code Summary

**Before:**
```markdown
```hcl
data "aws_ami" "app" {
  most_recent = true
  owners      = ["self"]
}
\`\`\`

## Next Section
```

**After:**
```markdown
```hcl
data "aws_ami" "app" {
  most_recent = true
  owners      = ["self"]
}
\`\`\`

The data source queries the most recent AMI built by Packer. This eliminates hardcoded AMI IDs and ensures deployments use the latest application image.

## Next Section
```

### Add Language Tag

**Before:**
```
packer build template.pkr.hcl
```

**After:**
```bash
packer build template.pkr.hcl
```

### Complete Packer Template

**Before (Empty):**
```hcl
build {
  sources = ["source.docker.ubuntu"]
}
```

**After (Complete):**
```hcl
build {
  sources = ["source.docker.ubuntu"]

  provisioner "file" {
    source      = "app/"
    destination = "/opt/app"
  }

  provisioner "shell" {
    inline = [
      "cd /opt/app",
      "npm install --production"
    ]
  }

  post-processor "docker-tag" {
    repository = "myapp"
    tags       = ["${var.version}"]
  }
}
```

## Examples

### Check single file
```bash
/check-code-examples docs/deploy.mdx
```

### Check and add basic summaries
```bash
/check-code-examples docs/deploy.mdx --fix
```

### Check all implementation guides
```bash
/check-code-examples docs/define-and-automate-processes/**/*.mdx
```

## Integration with Other Skills

**Complete review workflow:**
```bash
# 1. Check code examples
/check-code-examples docs/file.mdx

# 2. Check document structure
/check-structure docs/file.mdx --fix

# 3. Check resources
/check-resources docs/file.mdx --fix

# 4. Full review
/review-doc docs/file.mdx --phases 1-3
```

**Quick code review:**
```bash
/check-code-examples docs/file.mdx --report-only
```

## When to Use This Skill

Use `/check-code-examples` when:
- ✅ Adding or updating code examples
- ✅ Reviewing implementation guides
- ✅ Checking for complete (not empty) examples
- ✅ Validating code summaries exist
- ✅ Ensuring realistic values (data sources vs hardcoded)
- ✅ **Part of documentation quality review** (checks completeness and patterns)

Don't use when:
- ❌ Document has no code examples
- ❌ Need syntax validation (use `/extract-examples --validate` for Phase 8)
- ❌ Need full document review (use `/review-doc`)

## Reference

This skill validates against:
- **AGENTS.md** - Code Examples section (lines 174-184)
- **AGENTS.md** - Code Example Patterns (lines 666-710)
- **AGENTS.md** - Tool-Specific Documentation Patterns (lines 748-776)
- **REVIEW_PHASES.md** - Phase 4 code summary requirement

## Performance

Typical execution times:
- Single file: ~30 seconds
- 5 files: ~2.5 minutes
- 20 files: ~10 minutes

## Best Practices

**After adding code examples:**
```bash
/check-code-examples docs/file.mdx
```

**Before publishing:**
```bash
# Check examples are complete
/check-code-examples docs/**/*.mdx

# Run syntax validators (Phase 8)
/extract-examples docs/**/*.mdx --validate
```

**Quick validation during writing:**
```bash
/check-code-examples docs/draft.mdx --fix
```

## Notes

- Focuses on WAF-specific patterns (realistic values, workflow connections)
- Does NOT validate syntax (use Phase 8 with `/extract-examples --validate` or run `terraform fmt`, `packer validate` directly)
- Auto-fix only adds placeholder summaries requiring review
- Most issues require human judgment about architecture and use cases
- **For Phase 8 (Code Example Validation):** Use `/extract-examples` skill to validate syntax with tooling
