---
name: doc-health-dashboard
description: Generate comprehensive health dashboard showing structure, content, style, and link health with visual indicators
argument-hint: <file-paths|--pillar pillar-name> [--format text|json]
---

# Document Health Dashboard Skill

## Arguments

- **file-paths**: One or more `.mdx` files, OR
- **--pillar**: `secure-systems`, `define-and-automate-processes`, `design-resilient-systems`, `optimize-systems`
- **--format**: `text` (default) or `json`

## Checks

### 1. Structure Health 🏗️
- Frontmatter: title, description (150-160 chars), valid YAML
- Required sections: intro (2-3 paragraphs), "Why [topic]" with 3-4 challenges, implementation, HashiCorp resources, Next steps
- Heading hierarchy: proper nesting, sentence case
- List formatting: "the following" before lists, consistent bullets

### 2. Content Health 📝
- Word count: 🟢 700-1,200 (target), 🟡 500-700 or 1,200-1,500, 🔴 <500 or >1,500
- Code examples: complete workflows, realistic values, summaries after each block
- Resource links: 🟢 8-12, 🟡 5-7, 🔴 <5
- Persona coverage: decision-maker content (Why section), implementer content (examples, resources)

### 3. Style Health ✍️
- Second-person "you" throughout, present tense, active voice
- Vague pronouns: 🔴 sentences starting with "This", "That", "It"
- Promotional language: 🔴 marketing terms, vague quality claims
- Conjunction overuse: 🔴 excessive "moreover", "furthermore", "additionally"
- Word choice: 🔴 "please", "simply", "just", "easy"

### 4. Link Health 🔗
- Internal links: relative paths, existing targets, descriptive text
- Link descriptions: verbs outside brackets, no dashes after links, specific descriptions
- External links: functional, HTTPS, current
- HashiCorp resources: proper format, action verbs

## Scoring

Overall score = weighted average: Structure (25%) + Content (30%) + Style (25%) + Links (20%).

🟢 9-10 Excellent, 🟢 7-8.9 Good, 🟡 5-6.9 Needs Attention, 🔴 <5 Critical.

Report shows: score per category, specific issues with line numbers, priority fixes (red first), quick wins with skill commands.
