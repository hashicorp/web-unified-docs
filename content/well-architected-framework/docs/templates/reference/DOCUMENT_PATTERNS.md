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
