# HashiCorp Well-Architected Framework documentation
# Pulled from:
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
- Check existing patterns for consistency
- Start by making the smallest reasonable changes

## Frontmatter requirements for pages
- title: Clear, descriptive page title
- description: Concise summary for SEO/navigation

## Writing standards

When reviewing for writing standards, the HashiCorp writing standards supersedes the Other writing standards

### HashiCorp writing standards
- Here is a link to the top 12 rules for HashiCorp writing style - `web-unified-docs/blob/main/docs/style-guide/top-12.md`
- Here is a link to our full style guide. Each is a page in the 'general' folder - `web-unified-docs/blob/main/docs/style-guide/general/index.md`

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
- Keep examples simple and practical
- Use consistent formatting and naming
- Provide clear, actionable examples rather than showing multiple options when one will do
- Add a summary after code blocks explaining what the code does and why it matters

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