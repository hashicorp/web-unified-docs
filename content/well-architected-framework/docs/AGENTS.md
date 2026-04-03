# HashiCorp Well-Architected Framework documentation
# Based on:
# https://www.mintlify.com/blog/how-mintlify-uses-claude-code-as-a-technical-writing-assistant

## About this file

This file contains **writing standards, content patterns, and examples** for creating WAF documentation. It defines what good documentation looks like, not how to review it.

**For review processes:** See [templates/REVIEW_PHASES.md](./templates/REVIEW_PHASES.md) for the step-by-step review workflow. That file references the standards defined here.

**File organization:**
- **Standards** - Writing rules, formatting requirements, SEO/AI optimization criteria
- **Patterns** - Document structure, code examples, resource sections
- **Examples** - Good vs. bad patterns with explanations
- **Quick Reference Checklist** - Mechanical standards summary (not a review process)

## Before modifying this file

When adding or updating rules in AGENTS.md:

1. **Search for existing rules first** - Use grep with multiple related keywords before adding anything new
2. **View in context** - Read the surrounding section to understand full scope
3. **Consolidate, don't duplicate** - Enhance existing sections rather than creating new ones
4. **Skills are the source of truth for validation rules** - If a rule is enforced by a skill, a brief summary + skill reference is sufficient here

**Why this matters:** Duplicate or conflicting rules create confusion. One comprehensive section is always better than multiple partial sections.

---

## Goals

The goal of HashiCorp Well-Architected Framework documentation:
HashiCorp Well-Architected Framework is also called WAF

The goal of this documentation is to give users a high-level understanding of topics, implementations, and best practices. These documents are usually about cloud computing, security, and networking. After discussing and teaching concepts, which should inform the reader why they should implement what is described in the document, the document then gives a high-level overview of how to do so with HashiCorp tools, and resources (like tutorials or supporting documentation) on how to do so. 

The documents in WAF address these use cases and give recommendations that decision-makers can trust to make informed decisions. Implementers can use these documents to learn how to implement best practices, following the resources we provide them.

## Personas

There are two personas of target users: decision-makers and implementers:
Decision makers are CTOs, architects, staff engineers, and so on, who can make architecture and major technology decisions at their company. They can come to WAF and read an article about a specific topic that addresses a need of their organization or team. Ideally, they decide our solutions can best help them achieve their use case. Once they choose, they can send the document to their implementers, who can learn about the needed resources to achieve the implementation.

An implementer will do the actual work that the decision-maker has directed. Most likely they will be devops, platform, or other engineers. A WAF article should explain to the implementer the what, why, and how of the best practice. The document should act as a directory so the implementer can find the appropriate documentation in developer.hashicorp.com, or outside resources (cloud providers, OS, etc), to confidently work on the implementation.

An example is a customer who uses Terraform, Packer, and Consul and wants to use blue/green deployments for their application. Ideally, the decision-maker would come to our WAF and read our document "Best practices for application blue/green deployments." This document would discuss blue/green, the benefits, why users should do it, best practices, different strategies for blue/green deployment etc. We will then explain how our tools can assist the user in implementing each blue/green strategy.

Suppose the decision-maker decides that Terraform and Packer fit their organization's blue/green deployment needs. Using the blue/green WAF best practice document, they can send their implementer links to supporting resources outlined in the document (these most likely live in product docs). The implementer will use these resources, such as documentation and tutorials, to learn how to run blue/green deployments using Terraform and Packer.


## Working relationship
- You can push back on ideas as it can lead to better documentation. Cite sources and explain your reasoning when you do so
- ALWAYS ask for clarification rather than making assumptions
- NEVER lie, guess, or make up information
- If you are making an inferrance, stop and ask me for confirmation or say that you need more information

## Project context
- Format: MDX files with YAML frontmatter

## Content strategy
- Document just enough for user success - not too much, not too little
- Prioritize accuracy and usability of information
- Make content evergreen when possible
- Search for existing information before adding new content. Avoid duplication unless it is done for a strategic reason
- **Link to existing documents instead of duplicating content:** When a topic is already covered comprehensively in another WAF document, link to that document rather than repeating the information. Provide brief context (1-2 sentences) explaining what the linked document covers and why it's relevant, then direct users there for complete details. This approach maintains a single source of truth, reduces maintenance burden, and helps users discover related content. Only duplicate content when there's a strategic reason, such as providing a different perspective or addressing a different persona's needs.
- Check existing patterns for consistency
- Start by making the smallest reasonable changes
- **Showcase the full HashiCorp and IBM portfolio when it provides value:** When writing about automation, infrastructure, or workflows, consider the complete HashiCorp stack (Terraform, Packer, Vault, Consul, Nomad, Boundary) and Ansible. Only include tools when they solve a real problem in the document's context - never force tools just to mention them. Each tool should address a specific challenge that implementers face. Examples:
  - Vault when discussing secrets in automation scripts
  - Consul when services need discovery or health checking
  - Nomad when orchestrating application deployments
  - Boundary when discussing secure access to infrastructure
  - Ansible when discussing configuration management alongside infrastructure provisioning

## Frontmatter requirements for pages
- title: Clear, descriptive page title
- description: Concise summary for SEO/navigation

## Writing standards

When reviewing for writing standards, the HashiCorp writing standards supersedes the Other writing standards

### HashiCorp writing standards
- The complete HashiCorp style guide is available in `content/well-architected-framework/docs/templates/styleguide.md`

## Other writing standards
- Second-person voice ("you")
- Test all code examples before publishing
- Match style and formatting of existing pages
- Language tags on all code blocks
- Alt text on all images
- Relative paths for internal links
- Use broadly applicable examples rather than overly specific business cases
- Lead with context when helpful - explain what something is before diving into implementation details
- Use sentence case for all headings ("Getting started", not "Getting Started")
- Use sentence case for code block titles ("Expandable example", not "Expandable Example")
- Prefer active voice and direct language
- Remove unnecessary words while maintaining clarity
- Break complex instructions into clear numbered steps
- Make language more precise and contextual
- Avoid vague pronouns at the start of sentences. Instead of starting with "This", "That", or "It", explicitly name what you're referring to.
    Bad examples:
    - "This Terraform configuration creates..." → "The Terraform configuration creates..."
    - "This approach eliminates..." → "Using data sources eliminates..."
    - "This enables rollbacks..." → "Immutable containers enable rollbacks..."

    Good examples:
    - "The Kubernetes Deployment creates three replicas..."
    - "The data source queries AWS for the most recent AMI..."
    - "Using data sources eliminates manual AMI ID updates..."

    Why: Starting sentences with vague pronouns assumes the reader knows exactly what "this" refers to. Being explicit improves clarity, especially when sentences follow code blocks or complex concepts
- Before a list of items, there needs to be `the following` somewhere in the introduction
    Valid examples:
    - You can install the following package with Packer:
    - The following is an example of early design decisions:
    - Consider the following approaches:
    - HCP Terraform includes the following key features:

    All of these are correct as long as "the following" appears before the list.

    The exception to this rule is HashiCorp resources and External resources at the end of documents

- For titles of items, format like this
    **Eliminate configuration drift:** Manual configuration steps introduce inconsistencies between environments.

    and not like this

    **Eliminate configuration drift** - Manual configuration steps introduce inconsistencies between environments.

- For ordered lists, use `1.` for every item (Markdown will auto-number)
    Format like this:
    ```
    1. First step
    1. Second step
    1. Third step
    ```

    Not like this:
    ```
    1. First step
    2. Second step
    3. Third step
    ```

    Reference: https://github.com/hashicorp/web-unified-docs/blob/main/docs/style-guide/markdown/fonts-and-formats.md#use-1-for-every-item-in-an-ordered-list

### Language and tone standards
- Avoid promotional language. You are a technical writing assistant, not a marketer. Never use phrases like "breathtaking" or "exceptional value"
- Reduce conjunction overuse. Limit use of "moreover," "furthermore," "additionally," "on the other hand." Favor direct, clear statements
- Avoid editorializing. Remove phrases like "it's important to note," "this article will," "in conclusion," or personal interpretations
- No undue emphasis. Avoid overstating importance or significance of routine technical concepts

### Technical accuracy standards
- Verify all links. Every link, both internal and external, must be tested and functional before publication
- Maintain consistency. Use consistent terminology, formatting, and language variety throughout all documentation
- Valid technical references. Ensure all code examples, API references, and technical specifications are current and accurate

### Formatting discipline
- Clean structure. Avoid excessive formatting. Never use emoji or decorative elements that don't add functional value

### Code examples
- Add code examples when they provide clear value to implementers - not as a checkbox requirement
- Appropriate for implementation guides, technical how-tos, and documents showing specific tool usage
- Not always necessary for strategic overviews, decision guides, or high-level concept documents
- When you do include examples:
  - Keep them simple and practical
  - Use consistent formatting and naming
  - Provide clear, actionable examples rather than showing multiple options when one will do
  - Add a summary after code blocks explaining what the code does and why it matters
  - Ensure examples are complete and realistic, not just empty base templates

### Document structure patterns
Based on successful WAF documents, use these patterns:

**"Why [topic]" section:**
- Include early in the document (after intro, before implementation details)
- Use bold title format with colons inside: `**Challenge name:** Description`
- **Bold titles must start with action verbs, not noun phrases**
  - ✅ Good: "Track spending by team:", "Prevent configuration drift:", "Eliminate deployment inconsistencies:"
  - ❌ Bad: "Lack of visibility:", "Configuration inconsistency:", "Deployment problems:"
- Present 3-4 strategic operational/security challenges that the topic addresses
- Focus on business outcomes and consequences of not addressing the challenge
- Write each challenge as a paragraph (2-4 sentences of prose), not bullet lists

**Workflow connections:**
- Explicitly link related WAF documents to show how topics connect
- Example: "After [packaging your application](/link) into images, deploy these artifacts using..."
- Help users understand the end-to-end workflow across multiple documents

**Decision guidance:**
- When presenting multiple options (tools, approaches, strategies), clearly state when to use each
- Use "Use X when you need..." format followed by specific criteria
- Example: "Use Kubernetes when you need extensive ecosystem tooling, have complex networking requirements..."
- Avoid comparative language ("simpler", "easier") - use neutral criteria instead

**Code example summaries:**
- After code blocks, add 1-2 sentences explaining what the configuration accomplishes
- Connect to broader workflow (e.g., "This configuration uses an AMI built with Packer...")
- Highlight key concepts like state management, team collaboration benefits

**Document ending structure:**
- Place resource sections before the "Next steps" section at the end of documents
- Standard order at document end:
  1. `## HashiCorp resources` - H2 heading for HashiCorp tutorials, product docs, WAF cross-references
  2. `### External resources` - H3 heading for third-party documentation (optional)
  3. `## Next steps` - H2 heading for links to related WAF documents with context

**Next steps section pattern:**
- When a document is part of a subsection (e.g., "Managing leaked secrets"), the first paragraph must link the subsection name back to its index page
- Format: "In this section of [Subsection Name](/path/to/index), you learned..."
- Example: "In this section of [Managing leaked secrets](/well-architected-framework/secure-systems/secrets/manage-leaked-secrets), you learned..."
- Do NOT add this link in the index page itself, only in the child pages

## Content organization
- Structure content in the order users need it
- Combine related information to reduce redundancy
- Use specific links (direct to relevant pages rather than generic dashboards)
- Put most commonly needed information first

## Do not
- Skip frontmatter on any MDX file
- Use absolute URLs for internal links
- Include untested code examples
- Make assumptions - always ask for clarification

## IBM portfolio tools guidance

HashiCorp is part of the IBM portfolio alongside Red Hat (Ansible, OpenShift) and other automation tools. When IBM portfolio tools provide value in a workflow, mention them naturally:

**When to mention IBM portfolio tools:**
- Ansible: Configuration management that complements infrastructure provisioning (Terraform provisions infrastructure, Ansible configures applications)

**How to mention IBM portfolio tools:**
- Treat them as complementary tools, not competitors
- Focus on integration points and workflows (e.g., "After Terraform provisions infrastructure, use Ansible to configure application settings")
- Link to external documentation (Ansible docs, OpenShift docs) in External resources section
- Don't force IBM tools into documents where they don't naturally fit
- Maintain focus on HashiCorp tools as the primary subject

## SEO & AI/LLM Optimization

Run `/seo-optimize <file>` when optimizing for search engines and AI systems. The skill is the complete source of truth for SEO criteria (meta descriptions, titles, headings, link descriptions, keyword density, readability, and more).


## Resources

- Provide links to HashiCorp tutorials and documentation that users can use to implement the goals of the document.
- **Consider video tutorial links:** Some users learn better from videos than written documentation. When relevant video tutorials exist for HashiCorp tools, include them alongside written tutorials to serve different learning preferences. Video links are particularly valuable for:
  - Complex visual workflows (UI-based tasks, architecture diagrams)
  - Step-by-step implementation demonstrations
  - Tool introductions and overviews
  - Conference talks explaining use cases and patterns

### HashiCorp Resources Section Patterns

The `check-resources` skill is the complete source of truth for resources section validation. Run `/check-resources <file>` to validate or fix formatting.

**Key principles (for writing):**

- Start with WAF cross-references, then progress from beginner to advanced
- Use action verbs **outside** link brackets: `Read the [Terraform documentation] for...` not `[Read the Terraform documentation]`
- Add context in the sentence, not after a dash: `...for resource syntax` not `- for resource syntax`
- Keep documentation and tutorial links as separate bullets
- Use plain text with colon for subheadings, not `##` headings: `Packer for containers:` not `### Packer for containers`
- Include links that genuinely help users implement the topic — don't pad the list, but don't omit useful resources; use grouped subheadings when covering multiple tools
- **Consider video tutorial links** when relevant (complex visual workflows, tool introductions, conference talks)

---

## Common Pitfalls to Avoid

Watch for these frequent content issues (formatting rules are detailed in Writing Standards above):

### Content Gaps
- **Empty base examples** - Code examples that don't show the actual use case
  - Wrong: Packer template that creates empty Ubuntu image with no application
  - Right: Packer template with provisioners that copy app files and install dependencies

- **Missing workflow connections** - Not explaining how outputs connect to inputs
  - Wrong: "ami = ami-12345678" with no context
  - Right: Shows Packer outputs AMI ID, explains how to use data source to query it in Terraform

- **Generic tool documentation** - Content that could apply to any tool, not HashiCorp-specific
  - Wrong: "Test your infrastructure before deploying" (generic)
  - Right: "Use Sentinel for policy-as-code and Terratest for infrastructure validation" (specific HashiCorp tools)

- **Missing outcomes** - Not explaining what happens when you run the code
  - Wrong: Just showing code with no explanation of results
  - Right: "Running `packer build` produces AMI ami-0abc123 which you can reference in Terraform"

### Document Depth Red Flags
- Document < 500 words likely lacks depth for implementers
- Implementation guides without code examples may leave implementers unable to get started
- < 3 resource links means implementers lack implementation guidance
- Compare to similar existing documents - if yours is 1/3 the length, it's probably too shallow

---

## Code Example Patterns

Run `/check-code-examples <file>` to validate. Key requirements for writing:

### Packer examples must include
- Provisioners that copy application files and install dependencies (not just empty source blocks)
- A post-processor to tag/version the image for tracking
- Realistic application content

### Terraform examples must show
- **Data sources** to query dynamic values (AMI IDs, image tags) instead of hardcoded values
- **Realistic values** with context (not "ami-12345678" but a data source query)
- **Connection to workflow** — explain where values come from and what happens next

### Code block summaries must explain
1. **What the code does** - "This template copies application files and installs dependencies"
2. **What it produces** - "Running `packer build` produces AMI ami-0abc123"
3. **How to use the output** - "Reference this AMI in Terraform using a data source"
4. **Why it matters** - "This creates immutable infrastructure that deploys consistently"

---

## Document Depth Guidelines

Use existing documents as benchmarks for depth:

### Document Length Guidelines
- **Target word count**: 700-1,200 words
- **Content is more important than word count** - If a topic needs 1,500 words to properly serve both personas, use 1,500 words
- **Quality indicators**: Clear "Why" section, actionable implementation guidance, relevant HashiCorp resource links, code examples when they add value
- **Red flags**: Documents under 400 words likely lack depth; implementation guides without actionable guidance or examples may leave implementers unable to get started

### Complete Documents Should Include
- **Sections**: Intro (2-3 paragraphs), Why (3-4 challenges), Implementation guidance, Resources (relevant links for implementers)
- **Code examples (when valuable)**: 1-2 detailed, realistic examples that show complete workflows (input → processing → output) for implementation guides and technical how-tos
- **Both personas served**: Strategic value for decision-makers, actionable guidance for implementers

### When to Add More Detail
- If you're documenting a NEW concept not covered elsewhere
- If implementers need to make complex decisions (multiple tools, approaches)
- If the topic connects multiple HashiCorp tools in a workflow
- If there are security or compliance implications

### When to Link Out Instead
- For basic tool syntax (link to product docs)
- For step-by-step tutorials (link to tutorials)
- For detailed API references (link to API docs)
- For platform-specific details (link to AWS/Azure/GCP docs)

### The Balance
WAF documents should be:
- **Strategic enough** for decision-makers to understand value
- **Tactical enough** for implementers to start working
- **Connected enough** to guide users to detailed resources
- **NOT step-by-step tutorials** (that's what tutorials are for)

---

## Tool-Specific Documentation Patterns

See [templates/reference/PATTERNS.md](./templates/reference/PATTERNS.md) for per-tool requirements (Packer, Terraform, Sentinel, multi-tool integration documents).

---

## Quick Validation

**For complete review checklists, see [templates/REVIEW_PHASES.md](./templates/REVIEW_PHASES.md).**

**For automated checks, use skills:**
- `/check-structure` - Document structure patterns (Why sections, lists, headings)
- `/check-code-examples` - Code completeness and summaries
- `/check-resources` - HashiCorp resources section formatting
- `/check-hashicorp-style` - Official style guide compliance (voice, tense, word choice)
- `/review-doc --phases 4-5` - Style and SEO optimization

**For detailed pattern references:**
- [templates/reference/PATTERNS.md](./templates/reference/PATTERNS.md) - All documentation patterns (structure, code examples, resources, tools, pitfalls)

---

## Supporting Files and References

### Core Documentation Files
- [templates/SKILL_WORKFLOW.md](./templates/SKILL_WORKFLOW.md) - Skill workflow for existing documents (what to run, in what order)
- [templates/REVIEW_PHASES.md](./templates/REVIEW_PHASES.md) - Phase-based review process
- [templates/styleguide.md](./templates/styleguide.md) - HashiCorp style guide (full)
- [templates/QUICK_REFERENCE.md](./templates/QUICK_REFERENCE.md) - Quick reference: patterns, checklist, skills, troubleshooting

### Reference Materials (templates/reference/ folder)
- [templates/reference/PATTERNS.md](./templates/reference/PATTERNS.md) - All documentation patterns (structure, code, resources, tools, pitfalls)
- [templates/reference/CONTENT_PATHS.md](./templates/reference/CONTENT_PATHS.md) - Content organization and file paths
- [templates/reference/TASK_AGENT_GUIDE.md](./templates/reference/TASK_AGENT_GUIDE.md) - Guide for using task agents

### Document Templates (templates/doc-templates/ folder)
- [templates/doc-templates/DOCUMENT_TEMPLATE.md](./templates/doc-templates/DOCUMENT_TEMPLATE.md) - Standard document template
- [templates/doc-templates/pillar-overview.mdx](./templates/doc-templates/pillar-overview.mdx) - Pillar overview template