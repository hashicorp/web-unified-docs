---
name: qmd
version: 2.0.0
description: |
  Use this skill when working on documentation, architecture documents, or technical
  writing and you need to search for relevant resources, fact-check information,
  find tutorials, or gather context. This skill searches a local SQLite database
  using the qmd command-line tool to find related content, examples, best practices,
  and reference materials that can inform the current document being worked on.

  Activate when:
  - The user is editing or creating documentation
  - You need to verify technical accuracy
  - You want to find related examples or tutorials
  - You need context about architectural patterns or best practices
  - The user mentions "check the database", "search qmd", or "find resources"
allowed-tools:
  - Bash
  - Read
  - Grep
  - Glob
  - Edit
  - Write
---

# QMD Database Search Skill

## Search Commands

```bash
qmd query "search term"          # Best quality (combined search + reranking)
qmd search "term"                # Fast keyword/BM25 search
qmd vsearch "term"               # Semantic/conceptual search
```

## Useful Flags

- `-n <num>` - Limit results (default: 5)
- `--full` - Full document instead of snippet
- `-c <collection>` - Filter to collection: `vault`, `terraform`, `tutorials`, `well-architected-framework`
- `--files` - File paths only
- `--json` - Structured JSON output

**Strategy:** Start broad (no `-c`), see which collections have relevant results, then narrow with `-c`.

## Workflow

### Phase 1: Discovery (15+ searches)
1. Read the current document to understand context
2. Search core technical concepts, auth methods, code patterns, best practices, tutorials
3. Use `qmd get "qmd://collection/path"` to read full documents for detail

### Phase 2: Organize findings into categories
- Accuracy & Technical Corrections (FIRST priority)
- Missing Code Examples
- Additional HashiCorp Resources
- Missing Best Practices & Security Guidance
- Additional Topics (optional)

### Phase 3: Present recommendations with sources
For every recommendation include:
- QMD path: `qmd://vault/v1-21-x/content/docs/auth/approle/index.mdx`
- Public URL: `https://developer.hashicorp.com/vault/docs/auth/approle`
- Exact quote from source
- Distinguish "docs say X" from "I inferred X from Y"

### Phase 4: Implement after user approval
- Implement incrementally, section by section
- Link to official docs rather than duplicating large code blocks
- After adding content, check for redundancy

## Handling Conflicting Sources

1. Newer docs supersede older ones
2. Official docs > blog posts > tutorials
3. Check context: Enterprise vs OSS, different versions, deprecation notes
4. Present both to user if conflicting
