# Writing Resources for WAF Documents
##
### THIS IS A WIP
##
#

## Templates 

### 1. **DOCUMENT_TEMPLATE.md** - Your primary guide
**Location:** `/docs/templates/DOCUMENT_TEMPLATE.md`

**Why use this:**
- Complete MDX template you can copy and adapt
- Section-by-section guidance for every part of your document
- Writing standards checklist
- Examples of good vs. bad patterns
- Pre-publish checklist for both personas

**Key sections to reference:**
- MDX template structure (lines 22-123)
- "Why section" requirements (lines 155-168)
- Code example requirements (lines 202-226)
- HashiCorp resources patterns (lines 238-283)
- Prose vs. lists guidance (lines 169-199)

### 2. **AGENTS.md** - Complete writing standards
**Location:** `/docs/templates/AGENTS.md`

**Why use this:**
- Defines WAF goals and personas (lines 19-38)
- Complete writing standards (lines 69-151)
- SEO optimization requirements (lines 242-285)
- AI/LLM optimization requirements (lines 287-341)
- Code example patterns with realistic examples (lines 652-697)
- Common pitfalls to avoid (lines 600-650)

**Critical sections:**
- Document structure patterns (lines 163-206)
- HashiCorp resources section patterns (lines 352-596)
- IBM portfolio tools guidance (lines 220-240)

### 3. **REVIEW_PHASES.md** - Review process
**Location:** `/docs/templates/REVIEW_PHASES.md`

**Why use this:**
- Phase-by-phase review process to check your work
- Helps you self-review before submitting
- Ensures you haven't missed critical requirements

### 4. **styleguide.md** - HashiCorp style guide
**Location:** `/docs/templates/styleguide.md`

**Why use this:**
- Official HashiCorp writing conventions
- Takes precedence over other writing standards
- Grammar, punctuation, and formatting rules

---

## Example WAF Documents by Type

### Collection Index Documents (Overview + Decision Guidance)

These documents provide overview and direct users to specific implementation documents.

#### 1. **Automate monitoring dashboards and alerts**
**Location:** `/docs/define-and-automate-processes/monitor/dashboards-alerts/index.mdx`

**Why this is excellent:**
- Shows decision guidance pattern with "Choose your monitoring approach" section
- Presents two approaches with clear criteria for each
- Includes iterative workflow with numbered steps
- Strong "Why" section with 4 challenges
- Directs users to correct implementation document based on their needs
- Comprehensive opening that hooks both personas

**Key patterns to copy:**
- How to present decision criteria without being prescriptive
- Structure: Overview → Why → How-to guidance → Decision section → Resources
- Links to both conceptual docs and implementation docs
- Clear "When to use X" vs "When to use Y" format

#### 2. **Package applications with containers and machine images**
**Location:** `/docs/define-and-automate-processes/automate/packaging.mdx`

**Why this is excellent:**
- Shows Packer workflows with realistic code examples
- Demonstrates "Why" section with 3 strong challenges (lines 13-21)
- Includes complete code examples with provisioners (lines 40-84, 105-162)
- Has clear summaries after code blocks explaining outputs and workflow connections
- Well-organized HashiCorp resources section with grouped subheadings (lines 168-186)
- Shows both container and VM workflows

**Key patterns to copy:**
- How to structure provisioner examples that show actual work being done
- How to explain what one tool outputs and how another consumes it (line 164)
- Link description patterns in resources section

### Implementation Documents (Specific How-To)

These documents provide detailed implementation guidance for a specific approach.

#### 3. **Configure cloud provider monitoring tools**
**Location:** `/docs/define-and-automate-processes/monitor/dashboards-alerts/manage-cloud-native.mdx`

**Why this is excellent:**
- Focused on one specific implementation path (cloud-native)
- Resources organized by cloud provider for easy navigation
- Includes comparison link to alternative approach (vendor tools)
- Clear explanation of when this approach is appropriate
- Balance from beginner (tutorials) to advanced (specific resources)

**Key patterns to copy:**
- How to organize resources by subcategory (AWS/Azure/GCP)
- Cross-references to related approaches
- Clear positioning of when to use this approach vs alternatives

#### 4. **Create immutable virtual machines**
**Location:** `/docs/define-and-automate-processes/define/immutable-infrastructure/virtual-machines.mdx`

**Why this is excellent:**
- Perfect multi-tool workflow example (Packer → Terraform)
- Shows data sources for querying outputs from other tools (lines 36-79)
- Explains workflow connections explicitly (lines 80-100)
- "Immutable VM workflow" section uses numbered steps (lines 82-93)
- Mentions complementary tools at the right point (Vault for secrets, line 99)
- Multiple tool resources organized well (lines 101-129)

**Key patterns to copy:**
- How to explain data sources preventing hardcoded IDs
- Numbered workflow steps with clear actions
- How to position complementary tools naturally

### Concept Documents (Strategic/Architectural)

These documents explain concepts, principles, or strategic approaches.

#### 5. **Policy as code**
**Location:** `/docs/secure-systems/compliance-and-governance/policy-as-code.mdx`

**Why this is useful:**
- Short, focused document (good example of minimal viable depth)
- Shows Sentinel policy example with clear purpose
- Explains enforcement and compliance value
- Positions policy as part of larger workflow

**Key patterns to copy:**
- How to keep strategic documents concise while still valuable
- Code example with clear enforcement context
- Balance between high-level concepts and implementation

#### 6. **Protect data at rest**
**Location:** `/docs/secure-systems/data/protect-data-at-rest.mdx`

**Why this is excellent:**
- Security-focused with real-world context
- Shows Vault integration for encryption and secrets
- Explains defense-in-depth approach
- Good balance of why (strategic) and how (implementation)
- Links to compliance frameworks and external resources

**Key patterns to copy:**
- How to position security tools in context
- Balance between high-level concepts and implementation
- External resources section with relevant compliance/security links

### Multi-Tool Integration Documents

These documents show how multiple HashiCorp tools work together.

#### 7. **Deploy packaged applications**
**Location:** `/docs/define-and-automate-processes/automate/deployments.mdx`

**Why this is excellent:**
- Continuation of packaging workflow
- Shows Packer → Terraform → orchestrator flow
- Explicit connections between tool outputs and inputs
- Multiple deployment targets (VMs, containers, Kubernetes)

**Key patterns to copy:**
- How to show tool integration points
- Workflow connections made explicit
- Multiple implementation paths for different targets

#### 8. **CI/CD secrets management**
**Location:** `/docs/secure-systems/secure-applications/ci-cd-secrets/index.mdx`

**Why this is useful:**
- Shows Vault integration across workflows
- Security configuration examples
- Positions Vault as secrets layer throughout workflow

**Key patterns to copy:**
- How to position one tool's role in broader workflows
- Integration patterns with external systems

---

## Documents to Review by Topic Area

### When writing about Infrastructure Provisioning:
- `/docs/define-and-automate-processes/automate/packaging.mdx`
- `/docs/define-and-automate-processes/define/immutable-infrastructure/virtual-machines.mdx`
- `/docs/define-and-automate-processes/automate/deployments.mdx`

### When writing about Monitoring/Observability:
- `/docs/define-and-automate-processes/monitor/dashboards-alerts/index.mdx`
- `/docs/define-and-automate-processes/monitor/dashboards-alerts/manage-cloud-native.mdx`
- `/docs/define-and-automate-processes/monitor/dashboards-alerts/manage-vendor.mdx`

### When writing about Security:
- `/docs/secure-systems/data/protect-data-at-rest.mdx`
- `/docs/secure-systems/compliance-and-governance/policy-as-code.mdx`
- `/docs/secure-systems/secure-applications/ci-cd-secrets/index.mdx`

### When writing about Testing/Validation:
- `/docs/define-and-automate-processes/automate/testing.mdx`

---

## Key Document Structure Patterns

### 1. Collection Index Pattern (Overview + Decision)
```
1. Frontmatter (title, description with primary keywords)
2. Opening paragraphs (2-3, hook with pain point + solution)
3. Why section (3-4 challenges with bold action verb titles)
4. How-to or workflow guidance (optional, depends on topic)
5. Decision guidance section ("Choose your X approach")
   - "Use approach A when you:" (3-4 clear criteria)
   - "Use approach B when you:" (3-4 clear criteria)
6. HashiCorp resources (grouped logically)
7. External resources (industry sources, vendor docs)
8. Next steps (links to implementation docs)
```

**Example:** dashboards-alerts/index.mdx

### 2. Implementation Document Pattern
```
1. Frontmatter (title, description with specific tools/features)
2. Opening paragraphs (2-3, problem → solution → integration)
3. Why section (3 challenges this approach solves)
4. How it works section (explanation of architecture/workflow)
5. Implementation sections (code examples with summaries)
6. HashiCorp resources (organized by subtopic if 8+ links)
7. External resources (tool-specific docs, real-world examples)
8. Next steps (related implementations, agent setup, modules)
```

**Example:** dashboards-alerts/manage-cloud-native.mdx

### 3. Multi-Tool Workflow Pattern
```
1. Frontmatter
2. Opening paragraphs (workflow context)
3. Why section (challenges this workflow solves)
4. Tool integration sections (H2 for each tool)
   - Show explicit connections between tools
   - Include code examples showing outputs/inputs
   - Explain how data flows between tools
5. Workflow summary (numbered steps)
6. HashiCorp resources (grouped by tool)
7. External resources
8. Next steps (complementary tools, modules, automation)
```

**Example:** packaging.mdx, virtual-machines.mdx

### 4. Concept Document Pattern
```
1. Frontmatter
2. Opening paragraphs (strategic context)
3. Why section (business/technical challenges)
4. Conceptual explanation (what it is, how it works)
5. Optional: Simple code example (illustrative, not comprehensive)
6. HashiCorp resources (focused on learning and concepts)
7. External resources (standards, frameworks, industry practices)
8. Next steps (implementation docs)
```

**Example:** policy-as-code.mdx, protect-data-at-rest.mdx

---

## Code Example Patterns

### Pattern 1: Basic Configuration Example
```
[Brief intro sentence explaining what this example does]

[Code block with language tag]

[1-2 sentence summary explaining:
 - What the code does
 - What it produces/achieves
 - How it connects to workflow (if applicable)]
```

### Pattern 2: Multi-Tool Integration Example
```
[Brief intro explaining the integration point]

[Code block showing first tool]

[1 sentence: what it produces]

[Code block showing second tool consuming that output]

[1-2 sentences: how the integration works, what it enables]
```

**See:** virtual-machines.mdx data source examples

### Pattern 3: Workflow Demonstration
```
[Workflow context paragraph]

[Code block showing step 1]

[Brief: what happens next]

[Code block showing step 2]

[Summary: complete workflow outcome]
```

**See:** packaging.mdx provisioner examples

---

## Decision Guidance Patterns

### Pattern: When to Use Which Approach

```markdown
**Use [approach A] when you:**
- [Clear criterion 1]
- [Clear criterion 2]
- [Clear criterion 3]
- [Clear criterion 4]

Learn more: [Link to implementation doc A]

**Use [approach B] when you:**
- [Clear criterion 1]
- [Clear criterion 2]
- [Clear criterion 3]
- [Clear criterion 4]

Learn more: [Link to implementation doc B]
```

**Key principles:**
- Present criteria, not recommendations
- Let reader decide based on their situation
- Avoid "better" or prescriptive language
- 3-4 specific, concrete criteria per approach

**See:** dashboards-alerts/index.mdx "Choose your monitoring approach" section

---

## Critical Formatting Rules (Easy to Miss!)

From AGENTS.md, these are the most common mistakes:

1. **"The following" before lists** - Every list needs this except resource sections
   - ❌ "Follow this workflow:"
   - ✅ "Use the following workflow:"

2. **Bold titles with colons INSIDE** - Not dashes
   - ❌ `**Challenge** - Description`
   - ✅ `**Challenge:** Description`

3. **Ordered lists use `1.` for every item**
   - ❌ `1. First\n2. Second\n3. Third`
   - ✅ `1. First\n1. Second\n1. Third`

4. **All bullet points need dashes** - Even after blank lines
   - ❌ Missing dash in Why section
   - ✅ `- **Challenge:** Description`

5. **Verbs OUTSIDE link brackets**
   - ❌ "[Learn about Terraform state]"
   - ✅ "Learn about [Terraform state]"

6. **No vague pronouns at sentence start**
   - ❌ "This eliminates errors..."
   - ✅ "Automated testing eliminates errors..."

7. **Sentence case for all headings**
   - ❌ "Why Use Terraform"
   - ✅ "Why use Terraform"

---

## Link Description Patterns

### Good patterns from example documents:

**Documentation links:**
- "Read the [X documentation](/path) for core concepts"
- "Explore the [X provider documentation](/path) for comprehensive resources"

**Tutorial links:**
- "Follow the [X tutorial](/path) to deploy Y"
- "Get started with [X tutorials](/path) for hands-on learning"

**Module/registry links:**
- "Use the [module-name module](/path) to deploy X with Y"
- "Explore [category modules](/path) for Z patterns"

**Resource links:**
- "Configure [resource-name](/path) for X"
- "Create [resource-name](/path) for Y"

**Concept links:**
- "Learn about [concept name](/path) before implementing"
- "Understand [concept name](/path) and benefits"

**See:** packaging.mdx lines 168-186 for excellent examples

---

## Questions? Reference These

- **Document type patterns:** This file, "Key Document Structure Patterns" section
- **Structure questions:** DOCUMENT_TEMPLATE.md
- **Writing style questions:** AGENTS.md sections 69-151
- **Code example questions:** AGENTS.md lines 652-697, packaging.mdx
- **Link patterns:** AGENTS.md lines 352-596, packaging.mdx lines 168-186
- **Decision guidance patterns:** dashboards-alerts/index.mdx "Choose your monitoring approach"
- **Workflow connections:** virtual-machines.mdx lines 80-100
- **SEO questions:** AGENTS.md lines 242-285
---
