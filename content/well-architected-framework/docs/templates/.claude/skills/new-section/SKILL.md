---
name: new-section
description: Creates complete documentation sections with overview page, initial documents, and cross-referencing.
argument-hint: <section-name>
disable-model-invocation: true
---

# New Section Skill

Creates complete documentation sections with overview page, initial documents, and proper cross-referencing structure.

## Usage

```bash
/new-section <section-path> [options]
```

## Arguments

- **section-path**: Directory path for the new section (required)
  - Example: `/new-section docs/security`
  - Creates directory if it doesn't exist

- **--title** or **-t**: Section title (required)
  - Example: `--title "Security and Compliance"`
  - Used in index.mdx and navigation

- **--description** or **-d**: Section description (optional)
  - Used in index.mdx meta description
  - Should be 150-160 characters

- **--docs**: Initial documents to create (optional)
  - Comma-separated list of document names
  - Example: `--docs "authentication,authorization,secrets-management"`

- **--interactive** or **-i**: Interactive mode (optional)
  - Prompts for all fields and document list

- **--template**: Section template type (optional)
  - Values: `workflow`, `concept`, `reference`, `mixed` (default)
  - Example: `--template workflow`

## What This Skill Does

This skill automates the creation of new documentation sections with consistent structure and navigation.

### Section Creation Process

1. **Directory Structure**
   - Creates section directory
   - Creates subdirectories if needed
   - Sets up proper file organization

2. **Index Page Creation**
   - Creates `index.mdx` as section overview
   - Includes section description
   - Lists all documents in section
   - Provides learning path guidance
   - Links to prerequisite sections

3. **Initial Document Generation**
   - Creates specified documents from template
   - Uses consistent naming (kebab-case)
   - Applies proper frontmatter
   - Includes placeholder content

4. **Cross-Referencing Setup**
   - Links index to all documents
   - Links documents back to index
   - Establishes document relationships
   - Sets up workflow progression

5. **Navigation Integration**
   - Updates parent section (if exists)
   - Adds to navigation structure
   - Ensures discoverability

## Examples

### Create basic section
```bash
/new-section docs/security --title "Security and Compliance"
```
Creates section directory and index.mdx.

### Create section with initial docs
```bash
/new-section docs/observability \
  --title "Observability and Monitoring" \
  --docs "monitoring,logging,alerting,tracing"
```
Creates section with 4 initial documents.

### Interactive mode
```bash
/new-section docs/governance --interactive
```
Prompts for:
- Section title
- Description
- Initial documents
- Template type

### Create workflow section
```bash
/new-section docs/deployment \
  --title "Deployment Strategies" \
  --template workflow \
  --docs "blue-green,canary,rolling-updates"
```

### With description
```bash
/new-section docs/cost-optimization \
  --title "Cost Optimization" \
  --description "Learn strategies to optimize infrastructure costs through resource management, automation, and best practices." \
  --docs "resource-tagging,rightsizing,automation"
```

## Output Format

```
Creating New Section: Security and Compliance
==============================================

Section Path: docs/security
Documents to Create: 3

Step 1: Creating Directory Structure
-------------------------------------
✓ Created: docs/security/

Step 2: Creating Index Page
----------------------------
✓ Created: docs/security/index.mdx
  - Title: Security and Compliance
  - Description: Learn how to implement security...
  - Type: Overview

Step 3: Creating Initial Documents
-----------------------------------
✓ Created: docs/security/authentication.mdx
  - Title: Authentication and Identity
  - Type: Concept
  - Links: ← index.mdx

✓ Created: docs/security/authorization.mdx
  - Title: Authorization and Access Control
  - Type: Concept
  - Links: ← index.mdx, ← authentication.mdx

✓ Created: docs/security/secrets-management.mdx
  - Title: Secrets Management
  - Type: How-to
  - Links: ← index.mdx, ← authentication.mdx

Step 4: Setting Up Cross-References
------------------------------------
✓ Updated: docs/security/index.mdx
  - Added links to 3 documents
  - Added workflow progression

✓ Updated: docs/security/authentication.mdx
  - Added "Related Documentation" section
  - Links to authorization.mdx, secrets-management.mdx

✓ Updated: docs/security/authorization.mdx
  - Added "Related Documentation" section
  - Links to authentication.mdx

Step 5: Navigation Integration
-------------------------------
✓ Updated: docs/index.mdx (if exists)
  - Added "Security and Compliance" section

---

Section Structure Created
=========================

docs/security/
├── index.mdx                    (Overview, links to all docs)
├── authentication.mdx           (Concept document)
├── authorization.mdx            (Concept document)
└── secrets-management.mdx       (How-to document)

Recommended Next Steps:
1. Review and customize index.mdx
2. Fill in content for each document
3. Add code examples: /extract-examples --template
4. Enhance resources: /add-resources docs/security/*.mdx --add
5. Validate style: /check-style docs/security/*.mdx
6. Full review: /review docs/security/*.mdx

Documentation Standards Applied:
✓ AGENTS.md structure patterns
✓ Proper frontmatter format
✓ Why sections with challenge format
✓ HashiCorp Resources sections
✓ Cross-reference setup
```

## Section Templates

### Workflow Template

For sequential process documentation:

```markdown
# <Section Title>

<Overview of workflow stages>

## Documents in This Section

Follow these stages in order:

1. [Stage 1](./stage-1.mdx) - Brief description
2. [Stage 2](./stage-2.mdx) - Brief description
3. [Stage 3](./stage-3.mdx) - Brief description

## Prerequisites

Before starting this workflow:
- [Prerequisite 1](../section/doc.mdx)
- [Prerequisite 2](../section/doc.mdx)
```

### Concept Template

For related conceptual topics:

```markdown
# <Section Title>

<Overview of concepts>

## Topics in This Section

- [Concept A](./concept-a.mdx) - Foundational concept
- [Concept B](./concept-b.mdx) - Related concept
- [Concept C](./concept-c.mdx) - Advanced concept

Start with Concept A for foundational knowledge.
```

### Reference Template

For technical specifications:

```markdown
# <Section Title>

<Overview of reference material>

## Reference Documents

- [Configuration](./configuration.mdx) - Settings and options
- [API Reference](./api.mdx) - Endpoints and methods
- [CLI Commands](./cli.mdx) - Command-line interface
```

### Mixed Template (Default)

Combines concept, how-to, and reference:

```markdown
# <Section Title>

<Overview of section>

## Getting Started

Begin with these foundational topics:
- [Understanding X](./concept.mdx) - Core concepts
- [Setting up X](./setup.mdx) - Initial configuration

## Implementation

Implement specific features:
- [Feature A](./feature-a.mdx) - How-to guide
- [Feature B](./feature-b.mdx) - How-to guide

## Reference

- [Configuration Options](./config.mdx)
- [Best Practices](./best-practices.mdx)
```

## Index.mdx Structure

The skill creates index pages with this structure:

```markdown
---
page_title: <Section Title>
description: <Section description>
---

# <Section Title>

<Introduction: What this section covers and why it matters>

## Why

**Bold challenge:** <Challenge relevant to section>

**Bold challenge:** <Challenge relevant to section>

**Bold challenge:** <Challenge relevant to section>

<How this section addresses these challenges>

## Documents in This Section

<Organized list with descriptions and progression>

## Prerequisites

<Optional: Links to required prior knowledge>

## Learning Path

<Suggested order for reading documents>

## HashiCorp Resources

<Relevant external resources>
```

## Best Practices

**Planning the section:**
```bash
# 1. Plan document structure
#    - Identify main topics
#    - Determine relationships
#    - Choose template type

# 2. Create section
/new-section docs/section --interactive

# 3. Review structure
ls -la docs/section/
```

**After creation:**
```bash
# 1. Customize index.mdx
#    - Refine overview
#    - Adjust learning path
#    - Add prerequisites

# 2. Fill in document content
#    (Manual editing)

# 3. Enhance all documents
/add-resources docs/section/*.mdx --add
/check-style docs/section/*.mdx --fix

# 4. Validate relationships
/cross-reference docs/section/*.mdx

# 5. Comprehensive review
/review docs/section/*.mdx
```

## Integration with Other Skills

**Complete section creation workflow:**
```bash
# 1. Create section structure
/new-section docs/security --interactive

# 2. Fill in content (manual)

# 3. Add resources to all docs
/add-resources docs/security/*.mdx --add

# 4. Style validation
/check-style docs/security/*.mdx --fix

# 5. SEO optimization
/seo-optimize docs/security/*.mdx --fix

# 6. Validate cross-references
/cross-reference docs/security/**/*.mdx

# 7. Comprehensive review
/review docs/security/*.mdx
```

**With /create-doc:**
```bash
# Create section first
/new-section docs/section --title "Section" --docs "doc1,doc2"

# Add more documents later
/create-doc docs/section/new-doc.mdx --interactive

# Update index to reference new doc
```

## File Naming Conventions

**Section directories:**
```
✅ security
✅ cost-optimization
✅ deployment-strategies

❌ Security (no capitals)
❌ cost_optimization (no underscores)
❌ deployment (too generic)
```

**Document files:**
```
✅ authentication.mdx
✅ secrets-management.mdx
✅ role-based-access-control.mdx

❌ Authentication.mdx (no capitals)
❌ secrets_management.mdx (no underscores)
❌ rbac.mdx (avoid abbreviations)
```

## Common Section Patterns

**Workflow sections:**
- Define → Build → Test → Deploy
- Setup → Configure → Validate → Monitor
- Plan → Design → Implement → Optimize

**Concept sections:**
- Foundational → Intermediate → Advanced
- Core Concepts → Related Topics → Deep Dives
- Theory → Patterns → Examples

**Tool-specific sections:**
- Overview → Installation → Configuration → Usage
- Getting Started → Features → Advanced → Reference

## When to Use This Skill

Use `/new-section` when:
- ✅ Creating new major documentation areas
- ✅ Reorganizing documentation structure
- ✅ Adding new product features needing docs
- ✅ Starting new documentation initiatives
- ✅ Establishing section-level organization

Don't use `/new-section` when:
- ❌ Adding single document (use `/create-doc`)
- ❌ Updating existing sections (manual edits)
- ❌ Minor reorganization (manual moves + `/update-redirects`)

## Reference Files

This skill uses:
- **`DOCUMENT_TEMPLATE.md`** - Document structure
- **`AGENTS.md`** - Writing standards
- **`styleguide.md`** - HashiCorp style guide

## Notes

- Creates complete, consistent section structure
- All files follow AGENTS.md standards
- Index pages are fully functional overviews
- Cross-references are bidirectional
- Navigation is automatically integrated
- Supports nested sections (e.g., docs/security/compliance/)
- Works with existing documentation structure
- Can extend sections created previously
