---
name: add-resources
description: Enhances HashiCorp Resources sections with relevant documentation links and tutorials. Use when resources sections need improvement.
argument-hint: <file-paths>
---

# Add Resources Skill

## Arguments

- **file-path**: The `.mdx` file to enhance (required)
- **--add** / **-a**: Automatically add suggested resources (default: show suggestions only)
- **--tool** / **-t**: Focus on specific tool: `terraform`, `packer`, `vault`, `consul`, `nomad`
- **--level** / **-l**: `beginner`, `intermediate`, `advanced`, `all` (default)
- **--min-links**: Minimum resource links to ensure (default: 5)

## Process

1. **Content analysis**: Extract keywords, identify HashiCorp tools mentioned, determine technical level, analyze code examples.

2. **Resource search**: Find relevant tutorials, documentation, WAF cross-references, tool-specific docs, hands-on examples.

3. **Link organization**: Group by skill level (beginner → advanced). Balance tutorials, guides, references.

4. **Format validation**: Verbs outside brackets (`Learn about [topic]` ✅, `[Learn about topic]` ❌). Action verbs: Learn, Explore, Configure, Review, Get started, Implement, Optimize, Troubleshoot.

5. **Quality checks**: No duplicates, relevance to document topic, minimum link count met.

## Link format

```markdown
✅ Learn about [module structure](/terraform/modules) to organize reusable code
✅ Explore [Terraform registry](/terraform/registry) for pre-built modules
✅ Get started with [tutorials](/terraform/tutorials) for hands-on examples

❌ [Learn about module structure](/terraform/modules)
❌ [Explore the Terraform registry](/terraform/registry)
```
