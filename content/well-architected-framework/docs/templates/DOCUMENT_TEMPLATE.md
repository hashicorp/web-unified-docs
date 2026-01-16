# WAF Document Template

Use this template when creating new Well-Architected Framework documents. Copy the MDX template below and fill in each section following the guidelines.

---

## Quick reference

**Document philosophy:** WAF docs explain the **why and what**, show a representative example, then direct users to tutorials and product docs for the **how**. They are directories, not tutorials.

**Target word count:** 500-1,200 words

**Two personas to serve:**
- **Decision-makers:** CTOs, architects, staff engineers who need to understand strategic value
- **Implementers:** DevOps, platform engineers who need actionable guidance and resources
- Read a detailed description of Decision-makers and Implementers in the AGENTS.md file

---

## MDX template

```mdx
---
page_title: [Action verb] + [outcome] + [context if needed]
description: [150-160 characters. Include key concepts and value proposition. Use active voice.]
---

# [H1 title - sentence case, matches page_title or is slightly shorter]

[Opening paragraph: 2-3 sentences that hook the reader, establish the problem, and introduce the solution. Include target keywords naturally. Use active voice and second-person ("you").]

[Second paragraph: Explain how Terraform or HashiCorp tools address this challenge. Connect to broader workflow if applicable.]

## Why [topic name]

[Topic name] addresses the following challenges:

- **[Action verb] [outcome]:** [Description of the challenge and consequence of not addressing it.]
- **[Action verb] [outcome]:** [Description of the challenge and consequence of not addressing it.]
- **[Action verb] [outcome]:** [Description of the challenge and consequence of not addressing it.]
- **[Action verb] [outcome]:** [Description of the challenge and consequence of not addressing it.]

## How [topic] works

[1-2 paragraphs explaining the concept, approach, or technology. Define technical terms on first use. Keep explanations high-level - link to product docs for deep dives.]

[If covering multiple cloud providers or approaches, briefly describe each option and when to use it.]

## [Implementation section title - be specific, e.g., "Configure X with Terraform"]

[Brief intro sentence explaining what the example demonstrates.]

<Tabs>
<Tab heading="AWS" group="cloud-provider">

```hcl
[Terraform configuration for AWS]
```

[1-2 sentence summary: What does this configuration do? What does it produce?]

</Tab>
<Tab heading="Azure" group="cloud-provider">

```hcl
[Terraform configuration for Azure]
```

[1-2 sentence summary: What does this configuration do? What does it produce?]

</Tab>
<Tab heading="GCP" group="cloud-provider">

```hcl
[Terraform configuration for GCP]
```

[1-2 sentence summary: What does this configuration do? What does it produce?]

</Tab>
</Tabs>

[Summary paragraph after tabs: Explain key patterns, note provider differences, and reference Terraform registry docs for complete options.]

## [Operational section - e.g., "Respond to X" or "Manage X"]

[Brief intro explaining the value of this operational practice.]

When [trigger event], complete the following steps:

1. **[Action verb] [what]:** [Detailed guidance with specific actions to take.]
1. **[Action verb] [what]:** [Detailed guidance with specific actions to take.]
1. **[Action verb] [what]:** [Detailed guidance with specific actions to take.]

[Optional: Transition sentence connecting to related WAF document.]

HashiCorp resources:

- Learn Terraform with the [Terraform tutorials](/terraform/tutorials) and read the [Terraform documentation](/terraform/docs)
- [Brief description of what user will learn] with [link to related WAF document](/well-architected-framework/path/to/doc)
- [Brief description of what user will learn] with [link to related WAF document](/well-architected-framework/path/to/doc)
- Explore [terraform_resource_name](https://registry.terraform.io/providers/hashicorp/provider/latest/docs/resources/resource) for [specific configuration options]
- Explore [terraform_resource_name](https://registry.terraform.io/providers/hashicorp/provider/latest/docs/resources/resource) for [specific configuration options]

External resources:

- [Resource title](https://external-url) covers [what the resource explains]
- [Resource title](https://external-url) walks through [what the resource demonstrates]
- [Resource title](https://external-url) explains [what the resource teaches]

## Next steps

In this section of [Pillar name], you learned [brief summary of what the document covered]. [Document topic] is part of the [Pillar name pillar](/well-architected-framework/pillar-path).

Visit the following documents to continue building your [strategy/workflow]:

- [Brief description of next logical step] with [document title](/well-architected-framework/path/to/next-doc)
- [Brief description of related topic] by [document title](/well-architected-framework/path/to/related-doc)
```

---

## Section-by-section guidance

### Frontmatter

| Field | Requirements |
|-------|-------------|
| `page_title` | Action-oriented, 50-60 characters, sentence case, no colons |
| `description` | 150-160 characters, includes keywords, active voice |

**Title patterns:**
- "Prevent [problem] with [solution]"
- "Create [thing] with Terraform"
- "[Action verb] [resources] for [outcome]"

**Description pattern:**
"[Action verb] [what you'll do] with [tool]. [Benefit or outcome]."

### Opening paragraphs

- **First sentence:** Hook with a problem statement or compelling statistic
- **Include keywords:** Target search terms in first 100 words
- **Establish value:** Why should the reader care?
- **Connect to HashiCorp:** How do our tools help?

### Why section

Use action verbs for bold titles, not noun phrases:

| Do | Don't |
|----|-------|
| **Track spending by team:** | **Lack of visibility:** |
| **Prevent configuration drift:** | **Configuration inconsistency:** |
| **Detect problems early:** | **Delayed detection:** |

Each challenge should:
- Start with an action verb
- Describe the operational/business challenge
- Explain the consequence of not addressing it

### Code examples

**When to include:** Implementation guides and technical how-tos benefit from examples. Strategic overviews may not need them.

**Requirements:**
- Language tag on every code block (`hcl`, `bash`, `json`)
- Complete, realistic configurations (not empty templates)
- Summary after each code block explaining what it does
- Use tabs for multi-cloud examples with `group="cloud-provider"`

**If a provider lacks Terraform support:**
```mdx
<Tab heading="GCP" group="cloud-provider">

[Provider] does not currently have a dedicated Terraform resource for [feature]. [Provider] provides [feature] through [alternative], but Terraform support is not yet available.

To [achieve goal] in [provider], you can use the following approaches:

- [Alternative approach 1]
- [Alternative approach 2]

Track the [feature request](https://github.com/link) for updates on native support.

</Tab>
```

### Ordered lists

Always use `1.` for every item - Markdown auto-numbers:

```markdown
1. **First step:** Description
1. **Second step:** Description
1. **Third step:** Description
```

### HashiCorp resources section

**Not a heading** - use `HashiCorp resources:` (with colon, no ##)

**Organization:**
1. Beginner links first (tutorials, introductions)
2. Related WAF documents
3. Specific Terraform registry resources

**Link patterns:**
- "Learn Terraform with the [Terraform tutorials](/terraform/tutorials) and read the [Terraform documentation](/terraform/docs)"
- "Get started with [AWS](/terraform/tutorials/aws-get-started), [Azure](/terraform/tutorials/azure-get-started), or [GCP](/terraform/tutorials/gcp-get-started)"
- "[Action verb] [outcome] with [link text](/path)"
- "Explore [resource_name](url) for [specific options]"

**Verbs go OUTSIDE brackets:**
- ✅ "Explore [aws_budgets_budget] for cost filters"
- ❌ "[Explore aws_budgets_budget for cost filters]"

### External resources section

**Not a heading** - use `External resources:` (with colon, no ##)

**Link patterns:**
- "[Title](url) covers [what it explains]"
- "[Title](url) walks through [what it demonstrates]"
- "[Title](url) explains [what it teaches]"

### Next steps section

**Is a heading** - use `## Next steps`

**Structure:**
1. Summary sentence: "In this section of [Pillar], you learned..."
2. Context sentence: "[Topic] is part of the [Pillar pillar]."
3. Introduction: "Visit the following documents to continue..."
4. 2-3 links to related WAF documents

---

## Writing standards checklist

### Voice and tone
- [ ] Second-person voice ("you configure", not "we configure")
- [ ] Active voice ("Terraform creates", not "resources are created")
- [ ] Present tense ("The command creates", not "The command will create")
- [ ] No promotional language or marketing phrases
- [ ] No editorializing ("it's important", "simply", "just")

### Formatting
- [ ] Sentence case for all headings
- [ ] "the following" before every list (except resource sections)
- [ ] Bold titles with colons: `**Title:** Description`
- [ ] `1.` for every ordered list item
- [ ] Language tags on all code blocks
- [ ] No vague pronouns at sentence start ("This", "That", "It")

### Content
- [ ] 3-4 challenges in "Why" section with action verb titles
- [ ] Code examples have summaries explaining what they do
- [ ] 5+ HashiCorp resource links
- [ ] External resources section if third-party tools mentioned
- [ ] Next steps links to related WAF documents

### Links
- [ ] Relative paths for internal links (`/well-architected-framework/...`)
- [ ] Descriptive link text (not "click here" or "learn more")
- [ ] Verbs outside link brackets
- [ ] Specific destinations (not generic dashboards)

---

## Pre-publish checklist

Before publishing, verify the document serves both personas:

### Decision-makers
- [ ] Can understand strategic value in under 2 minutes
- [ ] Can articulate why this matters to their organization
- [ ] Can make informed decisions about approaches

### Implementers
- [ ] Can understand what to build/implement
- [ ] Have concrete examples to adapt (if applicable)
- [ ] Can find resources to complete implementation
- [ ] Know what to do next

### The "Newcomer Test"
If someone unfamiliar with HashiCorp tools reads this document, can they:
1. Understand what problem it solves?
2. Decide if it's right for their use case?
3. Find enough information to start implementing?
4. Know where to go for detailed implementation steps?

---

## Common mistakes to avoid

| Mistake | Fix |
|---------|-----|
| Noun phrases in Why section | Use action verbs: "Track spending" not "Lack of visibility" |
| `## Resources` as heading | Use `HashiCorp resources:` (no heading) |
| Sequential list numbers (1, 2, 3) | Always use `1.` for every item |
| Missing "the following" | Add before every list except resource sections |
| Vague pronouns | "This configuration creates..." → "The Terraform configuration creates..." |
| Passive voice | "resources are created" → "Terraform creates resources" |
| Future tense | "will create" → "creates" |
| Generic link text | "Learn more" → "Explore [specific topic] for [specific outcome]" |
| Verbs inside brackets | "[Learn about X]" → "Learn about [X]" |
| Tutorial-length content | Keep concise; link to tutorials for step-by-step |

---

## Example documents

Reference these documents as models:

- `/docs/optimize-systems/manage-cost/create-cloud-budgets.mdx`
- `/docs/optimize-systems/manage-cost/detect-cloud-spending-anomalies.mdx`
- `/docs/define-and-automate-processes/automate/packaging.mdx`
