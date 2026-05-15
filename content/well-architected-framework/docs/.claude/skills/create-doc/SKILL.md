---
name: create-doc
description: Creates new documentation files with proper structure and frontmatter following WAF standards.
argument-hint: <file-path> <page-title>
---

# Create Documentation Skill

## Arguments

- **file-path**: Path to new `.mdx` file (required, must end in `.mdx`)
- **--type** / **-t**: `concept` (default), `howto`, `reference`, `overview`
- **--title**: Document title
- **--description**: Meta description (150-160 chars)
- **--interactive** / **-i**: Prompt for all fields
- **--with-example**: Include code block template

## Process

1. Validate file doesn't exist, path is valid, `.mdx` extension, parent directory exists
2. Apply template from `../../../templates/doc-templates/DOCUMENT_TEMPLATE.md`
3. Generate frontmatter (`page_title`, `description`)
4. Create content structure with Why section, implementation sections, HashiCorp Resources
5. Validate: kebab-case filename, meta description 150-160 chars

## Document template structure

```markdown
---
page_title: <Title>
description: <Meta description 150-160 chars>
---

# <Title>

<Introduction paragraph>

## Why [topic]

**Bold challenge:** <Challenge statement>

**Bold challenge:** <Challenge statement>

**Bold challenge:** <Challenge statement>

<Solution paragraph>

## <Main Content Section>

<Content>

## HashiCorp resources

<Resources with verbs outside brackets>

## Next steps

<Cross-references>
```
