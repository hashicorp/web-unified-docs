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
