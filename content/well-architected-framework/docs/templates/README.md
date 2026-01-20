# Well-Architected Framework Templates Guide

This folder contains templates, documentation standards, and AI assistant configurations for creating and maintaining HashiCorp Well-Architected Framework (WAF) documentation.

## Overview

The templates folder provides a complete system for creating consistent, high-quality WAF content that serves both decision-makers and implementers. These files work together to establish writing standards, content structure, and review processes.

## File Descriptions

### Content Templates

**waf-article.mdx**
- MDX template for individual WAF articles (500-1,200 words)
- Includes structure for introduction, "Why" section, implementation examples, and resources
- Provides detailed section-by-section guidance and writing standards checklist
- Target audience: Individual practice or concept documents
- When to use: Creating new topic-specific WAF articles

**pillar-overview.mdx**
- MDX template for pillar overview pages
- Includes structure for pillar introduction, topics, rationale, audience, timing, and framework relationships
- More strategic and comprehensive than individual articles
- Target audience: High-level pillar landing pages
- When to use: Creating new pillar overview documents

**DOCUMENT_TEMPLATE.md**
- Simplified template focusing on atomic, single-topic articles
- Emphasizes conversational, tutorial-like tone with 1-2 sections maximum
- Focuses on practical implementation with natural prose (avoiding excessive lists)
- Target audience: Short, focused WAF articles adapted from tutorial content
- When to use: Creating concise, implementation-focused documents

### AI Assistant Configurations

**AGENTS.md**
- Comprehensive documentation requirements and standards for AI assistants (GitHub Copilot)
- Defines WAF goals, personas (decision-makers and implementers), and working relationship
- Contains content strategy, frontmatter requirements, and complete writing standards
- References the HashiCorp style guide in styleguide.md
- When to use: Primary reference for AI-assisted content creation and editing

**CLAUDE.md**
- Points to the AGENTS.md file

### Style and Standards

**styleguide.md**
- Complete HashiCorp writing style guide
- Contains the "Top 12 guidelines" covering voice, tense, word choice, and formatting
- Includes examples of correct and incorrect usage for each guideline
- Critical rules: active voice, present tense, simple language, avoiding jargon
- When to use: Reference during writing and editing to ensure consistency with HashiCorp standards

### Review and Quality Control

**REVIEW_PHASES.md**
- Seven-phase documentation review process
- Phases: User Success Evaluation, Technical Accuracy, Cross-Document Relationships, Style Guide Compliance, SEO & AI/LLM Optimization, Link Quality & Balance, Final User Success Check
- Includes quick commands for requesting specific types of reviews
- Works in conjunction with AGENTS.md (provides process, AGENTS.md provides rules and standards)
- Phase 5 references AGENTS.md SEO and AI/LLM Optimization sections for detailed standards
- When to use: Conducting comprehensive document reviews before publication

**TASK_AGENT_GUIDE.md**
- Guide for using task agents effectively
- Contains strategies for delegating work to AI agents
- When to use: Learning how to work with specialized AI agents for documentation tasks

### Utility Files

**prompts.md**
- Collection of useful prompts for content creation and review
- Includes setup instructions, content prompts, review prompts, CLI prompts, and SEO prompts
- Examples: checking spelling/grammar, finding supporting documents, testing links
- When to use: Quick reference for common documentation tasks

**CONTENT_PATHS.md**
- Likely contains information about content organization and file paths
- When to use: Understanding repository structure and where to place new content

## Quick Start Workflow

### Creating a New WAF Article

1. Choose the appropriate template:
   - Use **waf-article.mdx** for standard 500-1,200 word articles
   - Use **DOCUMENT_TEMPLATE.md** for shorter, atomic articles
   - Use **pillar-overview.mdx** for pillar landing pages

2. Reference **AGENTS.md** for:
   - Understanding target personas (decision-makers and implementers)
   - Content strategy and writing standards
   - Frontmatter requirements

3. Check **styleguide.md** for:
   - Voice and tone guidelines
   - Grammar and formatting rules
   - Examples of correct usage

4. Before publishing, use **REVIEW_PHASES.md** to:
   - Verify user success (Phase 1)
   - Check technical accuracy (Phase 2)
   - Validate writing standards (Phase 4)

### Reviewing Existing Content

**Quick review commands:**
- Full review with fixes: "Full review on [document]. Implement fixes."
- Style check only: "Phase 4 review on [document]."
- Final polish: "Phases 4-6 review on [document]. Fix issues."

**Review order:**
1. Read **REVIEW_PHASES.md** to understand the review process
2. Reference **AGENTS.md** for detailed standards to check against
3. Use **prompts.md** for specific review commands
4. Validate against **styleguide.md** for HashiCorp-specific guidelines

## Key Principles

### Content Philosophy
- WAF docs explain the **why and what**, show representative examples, then direct to tutorials for the **how**
- Documents are directories, not tutorials
- Target word count: 500-1,200 words for articles
- Serve two personas: decision-makers (strategic understanding) and implementers (actionable guidance)

### Writing Standards Hierarchy
1. **HashiCorp writing standards** (styleguide.md) supersede all other standards
2. Second-person voice ("you"), active voice, present tense
3. Avoid jargon, Latin phrases, and unnecessary complexity
4. All code examples must have language tags and be tested

### Content Strategy
- Link to existing documents instead of duplicating content
- Showcase full HashiCorp toolset when it provides value (but don't force it)
- Make content evergreen when possible
- Check existing patterns for consistency
- Start with minimal, focused changes

## File Dependencies

- **REVIEW_PHASES.md** references → **AGENTS.md** (for detailed rules)
- **AGENTS.md** references → **styleguide.md** (for complete style guide)
- **DOCUMENT_TEMPLATE.md** references → **AGENTS.md** (for persona descriptions)
- All templates follow standards defined in **AGENTS.md** and **styleguide.md**

## Additional Resources

- Example documents referenced in templates:
  - `/docs/optimize-systems/manage-cost/create-cloud-budgets.mdx`
  - `/docs/optimize-systems/manage-cost/detect-cloud-spending-anomalies.mdx`
  - `/docs/define-and-automate-processes/automate/packaging.mdx`

## Contributing

When adding new templates or updating existing ones:
1. Ensure consistency with existing standards in AGENTS.md and styleguide.md
2. Update this README to reflect changes
3. Provide clear "When to use" guidance for new templates
4. Include examples where applicable