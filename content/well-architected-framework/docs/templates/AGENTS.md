# HashiCorp Well-Architected Framework documentation
# Based on:
# https://www.mintlify.com/blog/how-mintlify-uses-claude-code-as-a-technical-writing-assistant


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
- **Showcase the full HashiCorp toolset when it provides value:** When writing about automation, infrastructure, or workflows, consider the complete HashiCorp stack (Terraform, Packer, Vault, Consul, Nomad, Boundary, Waypoint, etc.) and include tools where they naturally fit the use case. Only include tools when they solve a real problem in the document's context - never force tools just to mention them. Each tool should address a specific challenge that implementers face. Examples:
  - Vault when discussing secrets in automation scripts
  - Consul when services need discovery or health checking
  - Nomad when orchestrating application deployments
  - Boundary when discussing secure access to infrastructure
  - Waypoint when enabling developer self-service

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
- Present 3-4 strategic operational/security challenges that the topic addresses
- Focus on business outcomes and consequences of not addressing the challenge
- Example challenges: "Eliminate deployment inconsistencies:", "Reduce deployment time and risk:"

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
  1. HashiCorp resources (links to tutorials, product docs, etc.)
  2. External resources (optional, for third-party documentation)
  3. Next steps (links to related WAF documents with context)
- Example:
  ```markdown
  HashiCorp resources:
  - Get started with [Packer tutorials](/packer/tutorials)
  - Learn about [Terraform providers](...)

  External resources:
  - [Dockerfile reference](https://docs.docker.com/...)

  ## Next steps
  In this section of Define your processes, you learned...
  ```

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
- Mention or reference HashiCorp Waypoint

## SEO

Analyze this document's SEO optimization and provide specific recommendations.

**Areas to evaluate and improve:**
1. **Title** - Provide 3 options that:
   - Use sentence case
   - Avoid colons
   - Exclude tool names (e.g., Terraform, AWS) from the main title
   - Are compelling and clear
   
2. **Meta description** - Suggest an optimized version (150-160 characters)

3. **First paragraph** - Recommend improvements for:
   - Hook/engagement
   - Keyword placement
   - Clarity of value proposition

4. **H2 headings** - Evaluate current headings and suggest improvements
   - Tool-specific names (Terraform, AWS) are allowed in H2s only when the section content is tool-specific
   - Otherwise, keep headings generic and benefit-focused

5. **Description for images and videos** - Review the tags for images and videos:
   - Review descriptions for videos and images

6. **Other critical SEO elements** - Flag any major issues with:
   - Keyword usage and density
   - Content structure and readability
   - Internal linking opportunities
   - Image alt text (if applicable)

7. **Link descriptions** - Are link descriptions optimized? Do they clearly explain what the user will find (vs. generic "Learn more")?
   - Avoid generic link text like "click here" or "read more"
   - Use descriptive text that tells users what they'll find: "Learn about Terraform state management" instead of "Learn more"
   - Link descriptions should stand alone and make sense out of context
   - Include key context in the link text itself when possible

**Writing requirements:**
- Eliminate all passive voice
- Use sentence case throughout
- Prioritize clarity and user intent

**Output format:**
For each recommendation, explain why the change improves SEO and provide specific before/after examples where helpful.

## AI/LLM Optimization

When reviewing documents, analyze how well they are optimized for LLMs and AI systems to retrieve and understand.

**Areas to evaluate:**

1. **Clear topic sentences and summaries**
   - Each section should start with a clear topic sentence that states what it covers
   - Include brief summaries that state key takeaways explicitly
   - LLMs extract information more accurately when key points are stated directly

2. **Explicit relationships between concepts**
   - Use clear transition phrases: "After X, you can Y", "X depends on Y", "Use X when you need Y"
   - Define relationships explicitly rather than implying them
   - Make prerequisite knowledge clear

3. **Well-defined terminology**
   - Define technical terms when first introduced
   - Use consistent terminology throughout (don't switch between synonyms)
   - Spell out acronyms on first use

4. **Question-answer patterns**
   - Structure content to answer common questions directly
   - Use headings that match how users ask questions (e.g., "When to use X" rather than "X usage")
   - Include clear decision guidance with "Use X when..." patterns

5. **Contextual completeness**
   - Provide enough context that sections can be understood independently
   - Don't rely solely on directional references ("above", "below")
   - Include relevant context when linking to other documents

6. **Structured examples**
   - Provide complete, working examples with explanations
   - Clearly state what the example demonstrates
   - Explain why the example matters (the outcome, not just what it does)

7. **Explicit prerequisites and outcomes**
   - State what readers need before starting
   - Clearly describe what readers will achieve
   - Make success criteria explicit

8. **Semantic clarity**
   - Avoid ambiguous pronouns (use specific nouns instead of "it", "this", "that" when unclear)
   - Use parallel structure in lists
   - Make subject-verb relationships clear

**Why this matters:**
LLMs and AI systems retrieve and synthesize information based on semantic understanding. Clear structure, explicit relationships, and direct statements improve:
- Retrieval accuracy when AI systems search documentation
- Answer quality when AI assistants reference documentation
- Context understanding when content is used in RAG (Retrieval-Augmented Generation) systems

**Output format:**
Flag any areas where content could be clearer for AI systems and suggest specific improvements.


## Resources

- Provide links to HashiCorp tutorials and documentation that users can use to implement the goals of the document.
- **Consider video tutorial links:** Some users learn better from videos than written documentation. When relevant video tutorials exist for HashiCorp tools, include them alongside written tutorials to serve different learning preferences. Video links are particularly valuable for:
  - Complex visual workflows (UI-based tasks, architecture diagrams)
  - Step-by-step implementation demonstrations
  - Tool introductions and overviews
  - Conference talks explaining use cases and patterns

### HashiCorp Resources Section Patterns

The "HashiCorp resources" section at the end of documents should follow these organization and writing patterns for consistency:

#### Organization Structure

**Balance beginner and advanced links** with clear progression:

1. **WAF cross-references** - Links to related WAF documents (always first)
2. **Get started section** - For beginners (tutorials, introductions, getting started guides)
3. **Core concepts section** - For intermediate users (documentation, CLI, key features)
4. **Advanced features section** - For advanced users (integrations, advanced configurations)
5. **Tool-specific sections** - When covering multiple tools, organize by tool with clear headings

#### When to Group Resources vs. Keep Flat

**Use a single flat `HashiCorp resources:` section when:**
- Links are similar in nature (mostly WAF cross-references)
- Document focuses on a single tool
- Total links are under 8
- Grouping would not improve readability

**Group resources under descriptive subheadings when:**
- Document covers multiple HashiCorp products (Packer, Nomad, Kubernetes, Vault)
- Links naturally fall into distinct categories by tool or purpose
- Total links exceed 8-10 and organization helps readability
- Users would benefit from quickly finding tool-specific resources

**Grouped subheading format:** Use descriptive names with colon, no `##` or `###`
- ✅ `Packer for containers:`
- ✅ `Nomad deployment resources:`
- ✅ `Kubernetes deployment resources:`
- ❌ `### Packer for containers`

Use your judgment. When in doubt, ask whether grouping helps the reader find what they need faster.

**Example structure for single-tool documents:**
```markdown
HashiCorp resources:

- [WAF cross-reference links]
- [WAF cross-reference links]

Get started with [Tool]:

- Get started with [Tool tutorials] for hands-on examples
- Read the [Tool introduction] to understand core concepts
- [Basic getting started links]

[Tool] core concepts:

- Read the [Tool documentation] for comprehensive features
- [Intermediate feature links]

[Tool] advanced features:

- [Advanced configuration links]
- [Integration links]
```

**Example structure for multi-tool documents:**
```markdown
HashiCorp resources:

- [WAF cross-reference links]

Get started with automation tools:

- Get started with [Terraform tutorials] and read the [Terraform introduction] for infrastructure as code
- Get started with [Packer tutorials] and read the [Packer introduction] for image building
- Get started with [Vault tutorials] and read the [Vault introduction] for secrets management

Terraform for [use case]:

- [Terraform-specific links]

Packer for [use case]:

- [Packer-specific links]

Vault for [use case]:

- [Vault-specific links]
```

#### Link Description Patterns

**Always place verbs OUTSIDE the link brackets:**
- ✅ "Read the [Terraform documentation] for comprehensive features"
- ❌ "Read the [Terraform documentation for comprehensive features]"
- ✅ "Get started with [Terraform tutorials] for hands-on examples"
- ❌ "[Get started with Terraform tutorials] for hands-on examples"

**Split combined documentation and tutorial links** into separate bullets:
- ❌ "Learn X with the [documentation] and [tutorials]"
- ✅ Two bullets:
  - "Read the [documentation] for core concepts"
  - "Follow hands-on [tutorials] for examples"

**Add context directly in the sentence** (no dashes after links):
- ✅ "Read the [Terraform Kubernetes provider documentation] for resource syntax and configuration options"
- ❌ "Read the [Terraform Kubernetes provider documentation] - for resource syntax and configuration"
- ✅ "Learn about [Nomad job specifications] for container workloads"
- ❌ "Learn about [Nomad job specifications] - for containers"

**Use specific, descriptive link text** that explains what users will find:
- ✅ "Explore [Kubernetes tutorials] for deployment patterns and workflows"
- ❌ "Browse [Kubernetes tutorials] for additional examples"
- ✅ "Read the [Sentinel documentation] for policy as code concepts"
- ❌ "Read the [Sentinel documentation] and learn more"

**Standard patterns for common link types:**

Documentation links:
- "Read the [Tool documentation] for comprehensive features"
- "Read the [Tool documentation] for [specific feature area]"
- "Read the [Tool introduction] to understand [core concept]"

Tutorial links:
- "Get started with [Tool tutorials] for hands-on examples"
- "Follow hands-on [Tool tutorials] for [specific use case]"
- "Explore [Tool tutorials] for [deployment patterns/workflows/examples]"

Feature-specific links:
- "Learn about [Feature] for [specific benefit]"
- "Use [Feature] to [accomplish specific task]"
- "Configure [Feature] for [specific outcome]"

Provider/Integration links:
- "Read the [Provider documentation] for [resource type] and configuration"
- "Use [Integration] for [specific purpose]"
- "Manage [resources] with the [Provider]"

#### Common Link Descriptions by Tool

**Standard beginner format (combining tutorials and docs):**
- "Learn Terraform with the [Terraform tutorials](/terraform/tutorials) and read the [Terraform documentation](/terraform/docs)"
- "Learn Vault with the [Vault tutorials](/vault/tutorials) and read the [Vault documentation](/vault/docs)"
- "Learn Packer with the [Packer tutorials](/packer/tutorials) and read the [Packer documentation](/packer/docs)"
- "Learn Consul with the [Consul tutorials](/consul/tutorials) and read the [Consul documentation](/consul/docs)"
- "Learn Nomad with the [Nomad tutorials](/nomad/tutorials) and read the [Nomad documentation](/nomad/docs)"
- "Learn Boundary with the [Boundary tutorials](/boundary/tutorials) and read the [Boundary documentation](/boundary/docs)"

**Cloud provider getting started:**
- "Get started with [AWS](/terraform/tutorials/aws-get-started), [Azure](/terraform/tutorials/azure-get-started), or [GCP](/terraform/tutorials/gcp-get-started)"

**Terraform:**
- "Learn Terraform with the [Terraform tutorials](/terraform/tutorials) and read the [Terraform documentation](/terraform/docs)"
- "Get started with [AWS](/terraform/tutorials/aws-get-started), [Azure](/terraform/tutorials/azure-get-started), or [GCP](/terraform/tutorials/gcp-get-started)"
- "Learn the [Terraform language] for writing configurations"
- "Learn about [Terraform state] for infrastructure tracking"
- "Configure [backends] for remote state storage"

**Packer:**
- "Learn Packer with the [Packer tutorials](/packer/tutorials) and read the [Packer documentation](/packer/docs)"
- "Learn about [Packer builders] for different platforms"
- "Use [Packer provisioners] to configure images"

**Vault:**
- "Learn Vault with the [Vault tutorials](/vault/tutorials) and read the [Vault documentation](/vault/docs)"
- "Learn about [Vault dynamic secrets] for automation"
- "Use [Vault with Terraform] for secure deployments"

**Consul:**
- "Learn Consul with the [Consul tutorials](/consul/tutorials) and read the [Consul documentation](/consul/docs)"
- "Learn about [Consul service mesh] for traffic management"

**Nomad:**
- "Learn Nomad with the [Nomad tutorials](/nomad/tutorials) and read the [Nomad documentation](/nomad/docs)"
- "Learn about [Nomad job specifications] for container workloads"

**Sentinel:**
- "Get started with [Sentinel tutorials] for hands-on examples"
- "Read the [Sentinel documentation] for policy as code concepts"
- "Learn the [Sentinel language syntax] for writing policies"

**HCP Products:**
- "Get started with [HCP Terraform] for team collaboration"
- "Learn about [HCP Packer] for image metadata tracking"
- "Use [HCP Packer channels] for environment promotion"

#### Section Naming Conventions

Use clear, descriptive section headers that indicate the learning level or purpose:

**Beginner sections:**
- "Get started with [Tool]"
- "Get started with automation tools"
- "[Tool] foundations for [use case]"

**Intermediate sections:**
- "[Tool] core concepts"
- "[Tool] documentation and tutorials"
- "[Tool] for [specific use case]"

**Advanced sections:**
- "[Tool] advanced features"
- "[Tool] integrations"
- "Automating [use case]"
- "[Tool] CI/CD automation"

**Multi-tool sections:**
- "[Tool] for [use case]" (e.g., "Terraform for GitOps", "Packer for containers")
- "[Feature area]" (e.g., "Monitoring and observability", "Policy enforcement")

#### Avoid These Anti-Patterns

❌ **Generic verbs without context:**
- "Browse [tutorials]"
- "Learn more about [X]"
- "Check out [X]"

❌ **Dashes after links:**
- "Read the [documentation] - comprehensive guide"
- "Learn about [X] - for specific use case"

❌ **Verbs inside brackets:**
- "[Learn about Terraform state]"
- "[Configure backends for state]"

❌ **Combined links without separation:**
- "Learn X with the [documentation] and [tutorials]"

❌ **Missing context:**
- "Read the [Terraform Kubernetes provider documentation]" (what will they learn?)
- "Use [HCP Packer channels]" (for what purpose?)

❌ **Tool name repetition:**
- "Learn Packer with the Packer [documentation] and [tutorials]"
- Better: "Read the Packer [documentation] for core concepts"

#### Checklist for HashiCorp Resources Section

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

## Common Pitfalls to Avoid

Watch for these frequent issues when reviewing or creating documents:

### Formatting Issues
- **Missing bullet dashes** - Every list item in a "Why" section needs a dash, even after blank lines
  - Wrong: `**Challenge:** Description` (no dash)
  - Right: `- **Challenge:** Description` (has dash)

- **Incorrect ordered list numbering** - Always use `1.` for every item, not sequential numbers
  - Wrong: `1. First\n2. Second\n3. Third`
  - Right: `1. First\n1. Second\n1. Third`

- **Missing "the following" before lists** - Every list (except resource sections) needs "the following" in the introduction
  - Wrong: "Follow this workflow to deploy changes:" or "Use this workflow:"
  - Right: "Use the following workflow to deploy changes:" or "Follow the following steps:"
  - Wrong: "Implement these best practices:"
  - Right: "Implement the following best practices:"
  - Exception: "HashiCorp resources:" and "External resources:" don't need "the following"

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

### SEO/Clarity Issues
- **Passive voice** - "resources were created", "changes are applied", "tests are run"
  - Wrong: "before they're applied"
  - Right: "before Terraform applies them"

- **Ambiguous pronouns** - Using "it", "this", "that" without clear antecedents
  - Wrong: "This prevents issues" (what is "this"?)
  - Right: "Automated testing prevents production failures"

- **Missing outcomes** - Not explaining what happens when you run the code
  - Wrong: Just showing code with no explanation of results
  - Right: "Running `packer build` produces AMI ami-0abc123 which you can reference in Terraform"

### Document Length Red Flags
- Document < 500 words likely lacks depth for implementers
- Implementation guides without code examples may leave implementers unable to get started (evaluate if examples would add value)
- < 3 resource links means implementers lack implementation guidance
- Compare to similar existing documents - if yours is 1/3 the length, it's probably too shallow

---

## Code Example Patterns

Use these patterns to ensure code examples are realistic and actionable:

### Packer Examples Must Include
```hcl
# GOOD - Shows actual application packaging
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

### Terraform Examples Must Show
- **Data sources** to query dynamic values (AMI IDs, image tags) instead of hardcoded values
- **Realistic values** with context (not "ami-12345678" but "ami built by Packer with data source query")
- **Connection to workflow** - explain where values come from and what happens next

### Example Summaries Must Explain
1. **What the code does** - "This template copies application files and installs dependencies"
2. **What it produces** - "Running `packer build` produces AMI ami-0abc123"
3. **How to use the output** - "Reference this AMI in Terraform using a data source"
4. **Why it matters** - "This creates immutable infrastructure that deploys consistently"

---

## User Success Validation

Before finalizing a document, ask these questions:

### For Decision-Makers
- [ ] Can they understand the strategic value in < 2 minutes?
- [ ] Can they articulate why this matters to their organization?
- [ ] Can they make an informed decision about which approach/tool to use?
- [ ] Can they confidently send this to their implementers?

### For Implementers
- [ ] Can they understand what to build/implement?
- [ ] Do they have concrete examples to adapt?
- [ ] Can they find the resources to complete implementation?
- [ ] Would they know what to do next after reading this?
- [ ] Can they troubleshoot if something goes wrong?

### Critical Test
**The "Newcomer Test"**: If someone unfamiliar with HashiCorp tools reads this document, can they:
1. Understand what problem it solves?
2. Decide if it's right for their use case?
3. Find enough information to start implementing?
4. Know where to go for detailed implementation steps?

If the answer to any is "no", the document needs more detail, examples, or resources.

---

## Document Depth Guidelines

Use existing documents as benchmarks for depth:

### Document Length Guidelines
- **Target word count**: 700-1,200 words
- **Content is more important than word count** - If a topic needs 1,500 words to properly serve both personas, use 1,500 words
- **Quality indicators**: Clear "Why" section, actionable implementation guidance, 5-8 HashiCorp resource links, code examples when they add value
- **Red flags**: Documents under 400 words likely lack depth; implementation guides without actionable guidance or examples may leave implementers unable to get started

### Complete Documents Should Include
- **Sections**: Intro (2-3 paragraphs), Why (3-4 challenges), Implementation guidance, Resources (5-8+ links)
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

Different HashiCorp tools need different documentation approaches:

### Packer Documents Must Show
- Complete build blocks with provisioners (not just source definitions)
- How application code gets into images
- How to tag/version images for tracking
- How outputs connect to deployment tools (Terraform, Kubernetes, Nomad)

### Terraform Documents Must Show
- Backend configuration for state management
- Data sources for querying dynamic values (not hardcoded IDs)
- How to reference artifacts from other tools (Packer AMIs, container images)
- Resource tags for organization and filtering

### Sentinel Documents Must Show
- Complete policies with imports and rules
- How policies evaluate plans (what gets checked)
- What happens when policies fail (blocks apply, shows violations)
- How to test policies before deploying them

### Integration Documents (Multi-Tool) Must Show
- Clear workflow sequence (Tool A → Tool B → Tool C)
- How outputs from one tool become inputs to the next
- Example values that match across all tools
- End-to-end example showing complete flow

---

## Review Process Recommendation

Follow this order for efficient reviews:

### 1. Structure Check (5 minutes)
- Frontmatter present and correct?
- "Why" section exists?
- Code examples present when they would add value (implementation guides, technical how-tos)?
- Resources section exists?

### 2. Persona Value (10 minutes)
- Would decision-makers find strategic value?
- Would implementers have actionable guidance?
- Run through User Success Validation questions

### 3. Content Quality (15 minutes)
- Are code examples (if present) realistic and complete?
- Do workflow steps connect explicitly?
- Are there enough details for implementation?

### 4. Writing Standards (10 minutes)
- Check formatting (bullet dashes, ordered lists, bold titles)
- Check "the following" before lists
- Check for passive voice

### 5. SEO/AI Optimization (10 minutes)
- Meta description length
- Active voice throughout
- Explicit outcomes after examples
- No ambiguous pronouns

### 6. Resources and Links (5 minutes)
- 5+ HashiCorp resources?
- Links are specific, not generic?
- Resources match the content?

**Total: ~55 minutes for thorough review**

For quick reviews, focus on steps 1-3. For publication-ready reviews, do all 6 steps.

---

## Review Checklist

Use this checklist when reviewing or creating WAF documents to ensure all guidelines are followed.

### Document Structure
- [ ] Frontmatter includes `page_title` and `description`
- [ ] Meta description is 150-160 characters
- [ ] Document has a "Why [topic]" section after intro, before implementation
- [ ] "Why" section presents 3-4 strategic challenges with bold title format: `**Challenge name:** Description`
- [ ] H2 headings use sentence case ("Getting started", not "Getting Started")
- [ ] Document includes workflow connections to related WAF documents
- [ ] "Next steps" section at end references related documents
- [ ] HashiCorp resources section with 5+ relevant links
- [ ] External resources section if applicable

### Content Quality
- [ ] Content serves both decision-makers (strategic) and implementers (actionable)
- [ ] Explains the "what", "why", and "how" of the topic
- [ ] Code examples (when present) show realistic, complete implementations (not just empty base examples)
- [ ] Code examples (when present) demonstrate actual application/infrastructure packaging or deployment
- [ ] Document provides enough detail for implementers to be successful
- [ ] Workflow steps explicitly connect (e.g., Packer output → Terraform input)
- [ ] Decision guidance uses "Use X when you need..." format with specific criteria
- [ ] Avoids comparative language ("simpler", "easier") - uses neutral criteria

### Writing Standards
- [ ] Second-person voice ("you") throughout
- [ ] Active voice preferred over passive voice
- [ ] No promotional language or marketing phrases
- [ ] No editorializing ("it's important to note", "in conclusion")
- [ ] No excessive conjunctions ("moreover", "furthermore", "additionally")
- [ ] Sentence case for all headings
- [ ] Language tags on all code blocks
- [ ] Alt text on all images (if applicable)
- [ ] Relative paths for all internal links

### Critical Formatting Rules (Check Every List!)
- [ ] **"The following" before ALL lists** - "Use the following workflow:" NOT "Follow this workflow:" (Exception: resource sections)
- [ ] **Bold titles with colons inside** - `**Title:** Description` NOT `**Title** - Description`
- [ ] **Ordered lists use `1.` for every item** - NOT `1. 2. 3.`
- [ ] **All bullet points have dashes** - Even after blank lines in "Why" sections

### Code Examples
- [ ] All code examples include language tags
- [ ] Examples are complete and actionable (not placeholders or TODOs)
- [ ] Each code block has 1-2 sentence summary explaining what it accomplishes
- [ ] Summaries connect to broader workflow (e.g., "uses AMI built with Packer...")
- [ ] Examples use realistic values (not "ami-12345678" without context)
- [ ] Provisioners included in Packer examples to show actual app packaging
- [ ] Terraform examples show how to reference Packer-built images
- [ ] Examples demonstrate real-world scenarios relevant to both personas

### SEO Optimization
- [ ] Title uses sentence case, avoids colons, excludes tool names from main title
- [ ] Meta description is optimized (150-160 chars, includes key concepts)
- [ ] First paragraph has strong hook with keyword placement
- [ ] First paragraph uses active voice and direct language
- [ ] H2 headings are benefit-focused (tool names only when section is tool-specific)
- [ ] No passive voice throughout document
- [ ] Content structure supports readability and scanning
- [ ] Internal linking opportunities identified and implemented

### AI/LLM Optimization
- [ ] Each section starts with clear topic sentence stating what it covers
- [ ] Explicit relationships between concepts ("After X, you can Y", "X depends on Y")
- [ ] Technical terms defined when first introduced
- [ ] Acronyms spelled out on first use
- [ ] Headings match how users ask questions ("Why automate testing" not "Testing rationale")
- [ ] Decision guidance explicit: "Use X when..." patterns included
- [ ] Sections can be understood independently with sufficient context
- [ ] Avoids relying solely on directional references ("above", "below")
- [ ] Examples clearly state what they demonstrate and the outcome
- [ ] Prerequisites explicitly stated before instructions
- [ ] Success criteria and outcomes clearly described
- [ ] No ambiguous pronouns - specific nouns used instead of "it", "this", "that"
- [ ] Parallel structure in all lists
- [ ] Clear subject-verb relationships throughout
- [ ] Explicit outcomes after code examples (what happens when you run this)
- [ ] Workflow sequences numbered with clear prerequisites and results

### Resources and Links
- [ ] 5+ HashiCorp resource links (documentation, tutorials, references)
- [ ] External resources section if relevant third-party tools mentioned
- [ ] All links are specific (not generic dashboards)
- [ ] Links direct users to exact pages needed for implementation
- [ ] Resources organized logically (by tool, by task, or by workflow stage)

### Persona Value Assessment
- [ ] Decision-makers can understand strategic value and make informed decisions
- [ ] Decision-makers see clear business outcomes and consequences
- [ ] Implementers have actionable guidance to follow
- [ ] Implementers can find resources to complete implementation
- [ ] Examples bridge the gap between concepts and real implementation
- [ ] Document acts as a directory to deeper implementation resources
- [ ] Both personas will be successful after reading the document