# Well-Architected Framework Templates Guide

This folder contains templates, documentation standards, and AI assistant configurations for creating and maintaining HashiCorp Well-Architected Framework (WAF) documentation.

## File Descriptions

### Content Templates

**DOCUMENT_TEMPLATE.md**
- Comprehensive template for individual WAF articles
- Includes MDX template, section-by-section guidance, and writing standards checklist
- Structure: Introduction, "Why [topic]" section, implementation examples, resources, Next steps
- Serves both decision-makers (strategic value) and implementers (actionable guidance)
- When to use: Creating new topic-specific WAF articles (most common use case)

**pillar-overview.mdx**
- MDX template for pillar overview pages
- Includes structure for pillar introduction, topics, rationale, audience, timing, and framework relationships
- More strategic and comprehensive than individual articles
- Target audience: High-level pillar landing pages
- When to use: Creating new pillar overview documents (rare - only for new pillars)

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

### Review and Quality Control

**REVIEW_PHASES.md**
- Seven-phase documentation review process
- Phases: User Success Evaluation, Technical Accuracy, Cross-Document Relationships, Style Guide Compliance, SEO & AI/LLM Optimization, Link Quality & Balance, Final User Success Check
- Works in conjunction with AGENTS.md (provides process, AGENTS.md provides rules and standards)
- When to use: Conducting comprehensive document reviews before publication

**TASK_AGENT_GUIDE.md**
- Guide for using task agents effectively
- Contains strategies for delegating work to AI agents
- When to use: Learning how to work with specialized AI agents for documentation tasks

### Utility Files

**prompts.md**
- Collection of useful prompts for content creation and review
- Most have been integrated into the REVIEW_PHASES.md so you probably don't need to use this

**CONTENT_PATHS.md**
- Contains information about content organization and file paths

## Quick Start Workflow

### Creating a New WAF Article

1. Choose the appropriate template:
   - Use **DOCUMENT_TEMPLATE.md** for standard WAF articles (most common)
   - Use **pillar-overview.mdx** for pillar landing pages (rare)

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

## JIRA Ticket Creation

Create standardized WAF documentation tasks using the JIRA ticket creation tools in the `jira_tickets/` folder.

View the JIRA tickets [README.md](/templates/jira_tickets/README.md) to learn how