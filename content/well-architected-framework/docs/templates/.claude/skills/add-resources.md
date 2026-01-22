# Add Resources Skill

Enhances HashiCorp Resources sections by finding and suggesting relevant documentation links, tutorials, and related content.

## Usage

```bash
/add-resources <file-path> [options]
```

## Arguments

- **file-path**: The `.mdx` file to enhance (required)
  - Example: `/add-resources docs/modules.mdx`

- **--add** or **-a**: Automatically add suggested resources (default: false)
  - Without flag: Show suggestions only
  - With flag: Add resources to file

- **--tool** or **-t**: Focus on specific HashiCorp tool (optional)
  - Values: `terraform`, `packer`, `vault`, `consul`, `nomad`, `waypoint`
  - Example: `--tool terraform`

- **--level** or **-l**: Target specific skill level (optional)
  - Values: `beginner`, `intermediate`, `advanced`, `all` (default: all)
  - Example: `--level beginner`

- **--min-links**: Minimum number of resource links to ensure (optional)
  - Default: 5
  - Example: `--min-links 8`

## What This Skill Does

This skill analyzes documentation content and enhances the HashiCorp Resources section with relevant, well-formatted links.

### Resource Discovery Process

1. **Content Analysis**
   - Extracts keywords and topics from document
   - Identifies mentioned HashiCorp tools
   - Determines technical level (beginner/intermediate/advanced)
   - Analyzes code examples for context

2. **Resource Search**
   - Searches Terraform documentation
   - Finds relevant tutorials and guides
   - Identifies related WAF documents
   - Locates tool-specific documentation
   - Searches for hands-on examples

3. **Link Organization**
   - Groups by skill level (beginner → advanced)
   - Categories: Tutorials, Guides, Reference, Examples
   - Balances different content types
   - Ensures minimum link count

4. **Format Validation**
   - Verbs outside brackets: "Learn about [topic]" ✅
   - Not inside: "[Learn about topic]" ❌
   - Includes outcome/benefit in link text
   - Uses action verbs (Learn, Explore, Configure, etc.)

5. **Quality Checks**
   - Verifies URLs are accessible
   - Ensures relevance to document topic
   - Avoids duplicate links
   - Checks for broken links

### Link Categories

**Beginner Resources**
- Getting started tutorials
- Basic concepts and terminology
- Simple examples and walkthroughs
- Foundation-building content

**Intermediate Resources**
- Best practices guides
- Real-world implementation patterns
- Integration examples
- Performance optimization

**Advanced Resources**
- Complex architectures
- Enterprise patterns
- Deep technical details
- Advanced configuration

## Examples

### Analyze and suggest resources
```bash
/add-resources docs/modules.mdx
```
Shows suggested resources without modifying file.

### Auto-add resources
```bash
/add-resources docs/modules.mdx --add
```
Adds suggested resources to HashiCorp Resources section.

### Focus on specific tool
```bash
/add-resources docs/cicd-pipelines.mdx --tool terraform --add
```
Adds Terraform-specific resources.

### Ensure minimum link count
```bash
/add-resources docs/workflows.mdx --min-links 8 --add
```
Ensures at least 8 resource links.

### Target beginner audience
```bash
/add-resources docs/new-topic.mdx --level beginner --add
```
Adds beginner-focused resources only.

## Output Format

### Suggestion Mode (without --add)

```
Resource Enhancement Report
===========================

File: docs/modules.mdx
Current Resources: 3 links
Target: 5+ links (2 more needed)

Topic Analysis
--------------
Primary topics: modules, reusability, version control
HashiCorp tools: Terraform
Technical level: Intermediate
Keywords: module structure, versioning, registry

---

Recommended Additions (7 resources)
===================================

Beginner (2)
------------
✨ Get started with [Terraform tutorials](/terraform/tutorials) for hands-on module examples
   - Why: Provides practical introduction to module concepts
   - Category: Tutorial

✨ Learn about [module basics](/terraform/language/modules) to understand module structure
   - Why: Essential foundation for module development
   - Category: Guide

Intermediate (3)
----------------
✨ Explore [module development best practices](/terraform/language/modules/develop) to create production-ready modules
   - Why: Directly addresses document's focus on quality
   - Category: Guide

✨ Configure [module versioning](/terraform/language/modules/sources#selecting-a-revision) to manage module updates
   - Why: Critical for the version control section
   - Category: Reference

✨ Review [module testing strategies](/terraform/language/modules/testing) to ensure module reliability
   - Why: Complements code quality discussion
   - Category: Guide

Advanced (2)
------------
✨ Implement [private module registry](/terraform/registry/private) for enterprise module management
   - Why: Scales module distribution for teams
   - Category: Guide

✨ Optimize [module composition patterns](/terraform/language/modules/composition) for complex architectures
   - Why: Advanced patterns for experienced users
   - Category: Reference

---

Related WAF Documents (2)
=========================
✨ Review [version control best practices](./version-control.mdx) for module source management
✨ Explore [standardize workflows](./standardize-workflows.mdx) for module integration patterns

---

Current Links Analysis
======================
✅ All 3 existing links are properly formatted
✅ Good balance between beginner and intermediate
⚠️ No advanced resources currently
⚠️ Missing testing and registry topics

Run with --add to insert these resources into the document.
```

### Add Mode (with --add)

```
Resources Added to docs/modules.mdx
====================================

Added 7 new resource links:
✓ Terraform tutorials (beginner)
✓ Module basics (beginner)
✓ Module development best practices (intermediate)
✓ Module versioning (intermediate)
✓ Module testing strategies (intermediate)
✓ Private module registry (advanced)
✓ Module composition patterns (advanced)

Added 2 WAF cross-references:
✓ version-control.mdx
✓ standardize-workflows.mdx

Updated HashiCorp Resources section:
- Before: 3 links
- After: 10 links (7 new)

Skill level distribution:
- Beginner: 3 links (30%)
- Intermediate: 5 links (50%)
- Advanced: 2 links (20%)

✅ Document now meets minimum resource requirements (5+ links)
✅ All links use proper format (verbs outside brackets)
✅ Balanced across skill levels
```

## Link Format Patterns

### Correct Format (verb outside brackets)

```markdown
✅ Learn about [module structure](/terraform/modules) to organize reusable code
✅ Explore [Terraform registry](/terraform/registry) for pre-built modules
✅ Configure [version constraints](/terraform/language/expressions/version-constraints) to control module versions
✅ Review [testing strategies](/terraform/testing) to validate module behavior
✅ Get started with [tutorials](/terraform/tutorials) for hands-on examples
```

### Incorrect Format (verb inside brackets)

```markdown
❌ [Learn about module structure](/terraform/modules)
❌ [Explore the Terraform registry](/terraform/registry)
❌ [Configure version constraints](/terraform/language/expressions/version-constraints)
```

### Action Verbs to Use

- **Learn** - For conceptual content
- **Explore** - For discovery and browsing
- **Configure** - For setup and implementation
- **Review** - For best practices and guidelines
- **Get started** - For tutorials and introductions
- **Implement** - For hands-on guides
- **Optimize** - For performance and efficiency
- **Troubleshoot** - For debugging and problem-solving

## Resource Section Structure

The skill organizes resources following this pattern:

```markdown
## HashiCorp Resources

### Getting Started

Get started with [Terraform tutorials](/terraform/tutorials) for hands-on examples.
Learn about [module basics](/terraform/language/modules) to understand core concepts.

### Intermediate

Explore [module development](/terraform/language/modules/develop) to create production modules.
Configure [version constraints](/terraform/language/expressions/version-constraints) to manage dependencies.
Review [testing strategies](/terraform/testing) to validate module behavior.

### Advanced

Implement [private registry](/terraform/registry/private) for enterprise module management.
Optimize [module composition](/terraform/language/modules/composition) for complex architectures.

## Related Documentation

- [Version control best practices](./version-control.mdx)
- [Standardize workflows](./standardize-workflows.mdx)
- [Development environments](./development-environment.mdx)
```

## Best Practices

**After creating new documentation:**
```bash
# 1. Write core content
# 2. Add initial resources
/add-resources docs/new-doc.mdx --add

# 3. Review and refine
/review docs/new-doc.mdx --phases 6
```

**Enhancing existing documentation:**
```bash
# 1. Analyze current resources
/add-resources docs/existing-doc.mdx

# 2. Review suggestions
# 3. Add selected resources
/add-resources docs/existing-doc.mdx --add
```

**Tool-specific documentation:**
```bash
# Focus resources on relevant tool
/add-resources docs/vault-setup.mdx --tool vault --add
```

## Integration with Other Skills

**Complete new doc workflow:**
```bash
/create-doc docs/new.mdx --interactive
# Write content
/add-resources docs/new.mdx --add
/check-style docs/new.mdx --fix
/review docs/new.mdx
```

**Resource enhancement sprint:**
```bash
# Enhance all docs in section
for file in docs/section/*.mdx; do
  /add-resources "$file" --min-links 8 --add
done
```

## Resource Quality Criteria

The skill prioritizes resources that:

✅ **Directly relate to document topic**
- Keywords match
- Examples align with content
- Appropriate technical level

✅ **Provide actionable value**
- Hands-on tutorials
- Working code examples
- Step-by-step guides

✅ **Fill knowledge gaps**
- Complement existing content
- Cover missing topics
- Link to prerequisites

✅ **Are properly maintained**
- Current documentation
- No deprecated content
- Working links

## When to Use This Skill

Use `/add-resources` when:
- ✅ Creating new documentation (add resources early)
- ✅ Existing docs have fewer than 5 resource links
- ✅ Resources section lacks balance (all beginner or all advanced)
- ✅ Document fails Phase 6 review (link quality)
- ✅ Enhancing SEO through internal linking
- ✅ Improving user success (Phase 1 and 7)

## Reference Files

This skill uses:
- **`AGENTS.md`** - Link format patterns and resource section standards
- **`REVIEW_PHASES.md`** - Phase 6 link quality criteria

## Notes

- Suggested resources are validated for accessibility
- The skill respects existing resources (no duplicates)
- Link format follows AGENTS.md exactly
- Resources are organized by skill level automatically
- Related WAF documents are prioritized
- The skill can suggest 5-10 resources per run
- Ensures minimum 5 links per AGENTS.md requirements
