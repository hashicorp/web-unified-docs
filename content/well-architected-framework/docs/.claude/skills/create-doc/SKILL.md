---
name: create-doc
description: Creates new documentation files with proper structure and frontmatter following WAF standards.
argument-hint: <file-path> <page-title>
disable-model-invocation: true
---

# Create Documentation Skill

Creates new documentation files with proper structure, boilerplate, and frontmatter following WAF documentation standards.

## Usage

```bash
/create-doc <file-path> [options]
```

## Arguments

- **file-path**: Path to the new `.mdx` file to create (required)
  - Example: `/create-doc docs/define/new-topic.mdx`
  - Must end with `.mdx` extension

- **--type** or **-t**: Document type (optional, default: concept)
  - Values: `concept`, `howto`, `reference`, `overview`
  - Example: `--type howto`

- **--title**: Document title (optional, prompts if not provided)
  - Example: `--title "CI/CD Pipelines"`

- **--description**: Meta description (optional, prompts if not provided)
  - Should be 150-160 characters
  - Example: `--description "Learn how to implement automated CI/CD pipelines..."`

- **--interactive** or **-i**: Interactive mode - prompts for all fields
  - Example: `/create-doc docs/file.mdx --interactive`

- **--with-example**: Include code block template (optional)
  - Adds empty code block with comment placeholders

## What This Skill Does

This skill automates the creation of new documentation files with proper structure and boilerplate content.

### Creation Process

1. **File Validation**
   - Checks if file already exists
   - Validates file path structure
   - Ensures `.mdx` extension
   - Confirms parent directory exists

2. **Template Application**
   - Uses `../../../templates/doc-templates/DOCUMENT_TEMPLATE.md` as base structure
   - Fills in frontmatter (title, description)
   - Creates "Why" section skeleton with proper formatting
   - Adds HashiCorp Resources section template
   - Includes proper heading structure

3. **Frontmatter Generation**
   ```yaml
   ---
   page_title: <generated from title>
   description: <provided or prompted>
   ---
   ```

4. **Content Structure**
   - Main heading (matches title)
   - "Why" section with **Bold challenge:** template
   - Placeholder content following AGENTS.md patterns
   - HashiCorp Resources section
   - Related documentation section

5. **Validation**
   - Ensures filename follows conventions (kebab-case)
   - Validates file is in correct location
   - Checks meta description length (150-160 chars)

### Document Types

**Concept** (default)
- Explains "what" and "why"
- Includes principles and benefits
- Best for foundational topics

**How-to**
- Provides step-by-step instructions
- Includes prerequisites
- Focuses on implementation

**Reference**
- Technical specifications
- Configuration options
- API or syntax documentation

**Overview**
- High-level introduction to a section
- Navigation to sub-topics
- Learning path guidance

## Examples

### Create basic documentation
```bash
/create-doc docs/define/new-topic.mdx
```
Creates file with prompts for title and description.

### Create with all metadata provided
```bash
/create-doc docs/security/authentication.mdx \
  --title "Authentication and Authorization" \
  --description "Learn how to implement secure authentication patterns in your infrastructure with identity providers and role-based access control."
```

### Create how-to guide
```bash
/create-doc docs/cicd/pipelines.mdx --type howto --with-example
```
Creates a how-to document with code block template.

### Interactive mode
```bash
/create-doc docs/observability/monitoring.mdx --interactive
```
Prompts for:
- Title
- Description
- Document type
- Whether to include code example

### Create overview page for section
```bash
/create-doc docs/security/index.mdx --type overview \
  --title "Security and Compliance"
```

## Document Template Structure

The skill creates files with this structure:

```markdown
---
page_title: <Title>
description: <Meta description 150-160 chars>
---

# <Title>

<Introduction paragraph: What this document covers and why it matters>

## Why

**Bold challenge:** <Challenge statement>

**Bold challenge:** <Challenge statement>

**Bold challenge:** <Challenge statement>

<Solution paragraph explaining how the topic addresses these challenges>

## <Main Content Section>

<Content following AGENTS.md patterns>

## HashiCorp Resources

<Related resources with action verbs outside brackets>

## Related Documentation

<Cross-references to other WAF docs>
```

## Best Practices

**File naming:**
- Use kebab-case: `my-new-topic.mdx` ✅
- Avoid spaces or underscores ❌
- Keep names concise and descriptive

**Location:**
- Place in appropriate docs/ subdirectory
- Follow existing structure patterns
- Use `index.mdx` for section overviews

**After creation:**
1. Fill in placeholder content
2. Add relevant code examples
3. Complete HashiCorp Resources section
4. Run `/check-style` to validate
5. Run `/add-resources` to enhance resources

## Integration with Workflows

**Typical workflow:**
```bash
# 1. Create new doc
/create-doc docs/cicd/pipelines.mdx --interactive

# 2. Edit content (manual)

# 3. Add resources
/add-resources docs/cicd/pipelines.mdx --add

# 4. Validate style
/check-style docs/cicd/pipelines.mdx --fix

# 5. Full review
/review docs/cicd/pipelines.mdx --phases 1-3
```

## Reference Files

This skill uses:
- **`../../../templates/doc-templates/DOCUMENT_TEMPLATE.md`** - Base template structure
- **`AGENTS.md`** - Writing standards and patterns
- **`styleguide.md`** - HashiCorp style guide

## When to Use This Skill

Use `/create-doc` when:
- Starting new documentation from scratch
- Ensuring consistent structure across docs
- Saving time on boilerplate creation
- Onboarding new documentation contributors
- Creating placeholder docs for planned content

## Notes

- The skill will not overwrite existing files
- All created files follow AGENTS.md standards
- Frontmatter is automatically formatted correctly
- Meta descriptions are validated for length
- File paths are relative to docs/ directory
