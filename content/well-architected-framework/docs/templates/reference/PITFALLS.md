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
