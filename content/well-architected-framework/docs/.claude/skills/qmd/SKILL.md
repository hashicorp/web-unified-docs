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

This skill enables searching a local SQLite database using the `qmd` command-line tool to find relevant resources, tutorials, examples, and reference materials when working on documentation or technical content.

## When to Use This Skill

Use this skill proactively when:

1. **Working on documentation** - You're editing or creating docs and need supporting information
2. **Fact-checking** - You want to verify technical details or best practices
3. **Finding examples** - You need code examples, tutorials, or reference implementations
4. **Gathering context** - You want to understand related topics or architectural patterns
5. **Cross-referencing** - You need to check consistency with other documentation

## When NOT to Use This Skill

Skip this skill when:
- **Simple typo fixes** - Don't need research for obvious corrections
- **Formatting-only changes** - Style guide issues don't need qmd searches
- **User provides specific sources** - If user already has the docs they want to reference
- **Quick questions** - Simple questions the user asks don't need comprehensive research
- **Non-technical content** - Marketing copy, blog posts, general content

## How to Search the Database

The `qmd` tool searches a local SQLite database with multiple search methods:

### Primary Search Method (Recommended)
```bash
qmd query "search term"
```
Uses combined search with query expansion and reranking for best results.

### Alternative Search Methods
- `qmd search "term"` - Full-text search (BM25) for exact keyword matches
- `qmd vsearch "term"` - Vector similarity search for semantic/conceptual matches

### Common Search Patterns

**Search by topic:**
```bash
qmd query "authentication"
qmd query "database design"
qmd query "API best practices"
```

**Search for tutorials:**
```bash
qmd query "tutorial: REST API"
qmd query "how to configure nginx"
```

**Search for code examples:**
```bash
qmd query "example: terraform module"
qmd query "python async patterns"
```

**Search for architecture patterns:**
```bash
qmd query "microservices architecture"
qmd query "event-driven design"
```

### Useful Search Options
- `-n <num>` - Limit number of results (default: 5)
- `--full` - Get full document instead of snippet
- `--line-numbers` - Include line numbers in output
- `-c <collection>` - Filter to specific collection
- `--json` - Get JSON output for structured results
- `--files` - Output file paths only

### Strategic Collection Filtering

**Start broad, then narrow:**
1. First search: No `-c` filter (search all collections)
2. Review which collections have relevant results
3. Follow-up searches: Use `-c <collection>` to focus

**For HashiCorp docs:**
- `-c vault` - Vault-specific content
- `-c terraform` - Terraform-specific content
- `-c tutorials` - Step-by-step guides
- `-c well-architected-framework` - WAF-specific guidance

## Workflow

When this skill is activated, follow this comprehensive approach:

**Expected time commitment:**
- Phase 1 (Discovery): 10-20 minutes (15+ searches + reading)
- Phase 2 (Analysis): 5-10 minutes (organizing findings)
- Phase 3 (Recommendations): 5-10 minutes (presenting to user)
- Phase 4 (Implementation): Variable (depends on scope)

**Total:** 30-60 minutes for comprehensive enhancement

### Pre-Flight Check

Before starting, verify:
```bash
# Check qmd status and database
qmd status

# Verify collections are indexed
qmd collection list
```

If database hasn't been updated recently, consider running:
```bash
qmd update
```

### Phase 1: Discovery and Research
1. **Identify the context** - What document or topic are you working on?
2. **Read the current document** - Understand what's already written
3. **Formulate search queries** - Extract key terms and concepts to research
4. **Search systematically** - Use qmd to find relevant resources across multiple topics:
   - Core technical concepts mentioned in the document
   - Authentication/authorization methods
   - Code examples and patterns
   - Best practices and security guidance
   - Tutorials and integration guides
5. **Retrieve and read sources** - Use `qmd get` to read full documents for detailed information

### Phase 2: Analysis and Organization
6. **Organize findings by category**:
   - **Accuracy & Technical Corrections** - Verify technical details, check for outdated information
   - **Missing Examples** - Identify where code examples would help
   - **Additional Resources** - Find relevant docs, tutorials, and guides to reference
   - **Best Practices** - Discover security and operational guidance
   - **Additional Topics** - Note optional enhancements
7. **Document sources** - Record the qmd path for each recommendation (e.g., `qmd://vault/v1-21-x/content/docs/auth/approle/index.mdx`)
8. **Verify claims** - When making recommendations, cite the exact document and quote that supports it

### Phase 3: Recommendations
9. **Present findings to user** - Don't implement changes immediately
10. **Organize recommendations clearly**:
    - What needs to change and why
    - What you found in the docs (with sources)
    - Suggested additions or modifications
11. **Provide document paths** - Always include qmd:// paths or public URLs so user can verify
12. **Discuss tradeoffs** - If user questions a recommendation, search for supporting evidence

### Phase 4: Implementation
13. **Get approval** - Wait for user to approve specific changes
14. **Implement incrementally** - Make changes one section at a time
15. **Follow maintainability principles**:
    - Link to official docs rather than duplicating code
    - Keep examples concise and focused
    - Show patterns, not full implementations
16. **Review for consistency** - After changes, check for repetition or redundancy

## Tips for Effective Searches

- **Be specific** - Use precise technical terms rather than general ones
- **Search multiple angles** - Try different phrasings to get comprehensive results
- **Look for related topics** - Don't just search the exact topic, explore adjacent areas
- **Check dates** - Information may be outdated; prioritize recent entries
- **Cross-reference** - Verify information appears in multiple sources when possible

## Example Usage

### Scenario 1: Verifying Technical Details
```
Working on: AWS architecture document mentioning VPC peering

Search:
1. qmd query "VPC peering"
2. qmd query "AWS VPC best practices"
3. qmd query "VPC peering limitations"
```

### Scenario 2: Finding Examples
```
Working on: Tutorial for setting up CI/CD pipeline

Search:
1. qmd query "CI/CD pipeline examples"
2. qmd query "GitHub Actions tutorial"
3. qmd query "deployment automation patterns"
```

### Scenario 3: Fact-Checking
```
Working on: Security guidelines document

Search:
1. qmd query "OAuth 2.0 best practices"
2. qmd query "API security checklist"
3. qmd query "authentication patterns"
```

## Integration with Document Work

When editing documents:

1. **Before making changes** - Search for existing guidance or patterns
2. **During writing** - Look up technical details to ensure accuracy
3. **After completing** - Cross-reference with related documentation
4. **When uncertain** - Search rather than guess or make assumptions

## Handling Search Results

After retrieving results from qmd:

- **Read thoroughly** - Don't just skim, understand the context
- **Evaluate relevance** - Not all results will apply to your current work
- **Check consistency** - If results contradict each other, investigate further
- **Extract key points** - Identify the most relevant information to apply
- **Track sources** - Note where information came from for future reference

### When Sources Conflict

If you find contradictory information:
1. **Check document versions** - Newer docs supersede older ones
2. **Check authority** - Official docs > blog posts > tutorials
3. **Check context** - Enterprise vs OSS, different versions, deprecation notes
4. **Present both to user** - Let them decide which applies to their context
5. **Note the conflict** - "Source A says X, but Source B says Y because..."

### Check Document Versions

- **Note the version** in qmd paths (e.g., `v1-21-x`)
- **Prefer latest** versions unless user specifies otherwise
- **Call out deprecations** if you find references to deprecated features
- **Check release dates** - Information from newer releases is preferred

## Providing Sources for Fact-Checking

**CRITICAL:** Always provide sources so users can verify your findings.

### For Every Recommendation, Include:

1. **QMD Path** - The internal database path
   ```
   qmd://vault/v1-21-x/content/docs/auth/approle/index.mdx
   ```

2. **Public URL** - The corresponding public documentation URL
   ```
   https://developer.hashicorp.com/vault/docs/auth/approle
   ```

3. **Exact Quote** - The relevant text from the source
   ```
   "We recommend using `batch` tokens with the `AppRole` auth method"
   ```

4. **Line Numbers** (when applicable) - For precise references
   ```
   Lines 13-15 of the document
   ```

### Source Format Template

When presenting findings:
```markdown
**Source:** qmd://vault/v1-21-x/content/docs/auth/approle/index.mdx
**Public URL:** https://developer.hashicorp.com/vault/docs/auth/approle
**Quote (lines 13-15):**
> "We recommend using `batch` tokens with the `AppRole` auth method"
```

### If User Questions Your Claim

1. **Re-read the source** - Verify your interpretation
2. **Provide exact quotes** - Show the text that supports your claim
3. **Distinguish facts from inferences**:
   - ✅ "The docs say X" (direct quote)
   - ✅ "I inferred Y from X because..." (logical inference)
   - ❌ Don't claim "docs explicitly say Y" if you inferred it

### Example: Handling a Challenge

User: "Where does it explicitly say batch tokens for CI/CD?"

Response:
```
You're right - let me clarify the sources:

**Source 1:** qmd://vault/v1-21-x/content/docs/auth/approle/index.mdx
**Public URL:** https://developer.hashicorp.com/vault/docs/auth/approle
**Quote (line 13-15):**
> "We recommend using `batch` tokens with the `AppRole` auth method"

**Source 2:** qmd://vault/v1-21-x/content/docs/auth/approle/approle-pattern.mdx
**Public URL:** https://developer.hashicorp.com/vault/docs/auth/approle/approle-pattern
**Quote:**
> "If high authentication throughput, 1000s of authentications per second,
> are expected we recommend using batch tokens which are issued from memory
> and do not consume storage"

**My inference:** The docs recommend batch tokens for AppRole (general),
and AppRole is designed for automated workflows (including CI/CD).
However, there's no explicit "use batch tokens for CI/CD pipelines" statement.
```

## Recommendation Structure

When presenting findings to users, organize them clearly:

### Format for Each Recommendation

```markdown
✅ **[Topic/Section Name]**
- **Current:** What the document currently says (or lacks)
- **Found in docs:** What you discovered in qmd search
- **Source:** qmd://collection/path/to/document.mdx or public URL
- **Recommendation:** What should be added/changed and why

**Suggested addition/change:**
[Provide the exact text or code to add]
```

### Organization Categories

1. **Accuracy & Technical Corrections**
   - Verify claims against official docs
   - Check for outdated information
   - Correct technical inaccuracies

2. **Missing Code Examples**
   - Identify where examples would clarify concepts
   - Balance: show enough to understand, link to docs for full details
   - Avoid duplicating code that will need maintenance

3. **Additional HashiCorp Resources**
   - Find relevant tutorials and guides
   - Add specific documentation links
   - Enhance resource sections

4. **Missing Best Practices & Security Guidance**
   - Security recommendations
   - Operational best practices
   - Common pitfalls to avoid

5. **Additional Topics to Consider**
   - Optional enhancements
   - Advanced use cases
   - Related integrations

### Prioritizing Recommendations

When you have many findings, prioritize:
1. **Accuracy & Corrections FIRST** - Wrong information is critical
2. **Security/Best Practices** - Safety issues can't wait
3. **Missing Examples** - Clarity improvements
4. **Additional Resources** - Nice-to-have enhancements
5. **Additional Topics** - Optional, user-decides

If presenting 10+ recommendations, group by priority and ask user which to tackle first.

## Best Practices

### Research and Analysis
1. **Search early and often** - Don't wait until you're stuck
2. **Use multiple queries** - Different phrasings reveal different results
3. **Go broad then narrow** - Start with general searches, then get specific
4. **Question assumptions** - Verify what you think you know
5. **Read full documents** - Use `qmd get` to read complete docs, not just snippets

### Making Recommendations
6. **Always cite sources** - Provide qmd:// paths or URLs for every claim
7. **Verify before recommending** - If user questions a claim, re-check the source
8. **Organize systematically** - Use the category structure above
9. **Present, don't implement** - Show recommendations first, implement after approval
10. **Be honest about inferences** - Distinguish between "docs say X" and "I inferred X from Y"

### Implementation
11. **Link over duplicate** - Reference official docs rather than copying large code blocks
12. **Keep it maintainable** - Less code in the doc = less maintenance burden
13. **Eliminate repetition** - After adding content, check for redundancy
14. **Implement incrementally** - Make changes section by section with user approval

## Real-World Example: Enhancing Azure DevOps Documentation

This example shows the complete workflow used to enhance an Azure DevOps + Vault integration document:

### Phase 1: Discovery (15+ searches)
```bash
# Search for core integration content
qmd query "Azure DevOps Vault integration" -c vault --files
qmd query "AppRole authentication CI/CD pipeline example" -c vault --files
qmd query "JWT OIDC Azure AD authentication Vault" -c vault --files

# Search for specific auth methods
qmd query "Azure auth method managed identity" -c vault --files
qmd query "dynamic secrets database credentials CI/CD" -c vault --files

# Search for best practices
qmd query "Vault policy examples CI/CD least privilege" -c vault --files
qmd query "batch tokens service tokens CI/CD recommendation" -c vault --files
qmd query "Vault token lifecycle TTL CI/CD" -c vault --files

# Read detailed documentation
qmd get "qmd://vault/v1-21-x/content/docs/auth/approle/index.mdx" -l 100
qmd get "qmd://vault/v1-21-x/content/docs/auth/azure.mdx" -l 100
qmd get "qmd://vault/v1-21-x/content/docs/secrets/azure.mdx" -l 100
```

### Phase 2: Analysis
Organized findings into categories:
1. **Accuracy**: Found that AppRole docs recommend batch tokens - verified source
2. **Examples**: Found database and Azure secrets engine examples
3. **Resources**: Found Terraform+Vault tutorial, AppRole best practices
4. **Best Practices**: Found security guidance on token rotation, cleanup
5. **Additional**: Found Vault Agent option for self-hosted agents

### Phase 3: Recommendations
Presented organized recommendations with sources:
- "AppRole Recommendation - Add Batch Token Guidance"
  - Source: `qmd://vault/v1-21-x/content/docs/auth/approle/index.mdx`
  - Quote: "We recommend using `batch` tokens with the `AppRole` auth method"

When user questioned specificity, searched for and found supporting blog post.

### Phase 4: Implementation
- Got approval for each category
- User decided to link to docs rather than duplicate code (maintainability)
- Implemented incrementally, checking for repetition
- Added token cleanup example showing `vault token revoke -self`
- Enhanced resources section with specific database links

### Outcome
Document enhanced with:
- ✅ Verified technical accuracy with sources
- ✅ Practical code examples (kept concise, linked to docs)
- ✅ Comprehensive resource links
- ✅ Security best practices
- ✅ All recommendations backed by qmd sources

## Providing Summaries

After completing analysis, provide:

**Executive Summary:**
- Total findings: X across Y categories
- Critical issues: Z requiring immediate attention
- Time estimate: ~N changes to implement
- Recommendation: Start with [category] first

**High-level overview before details** helps user understand scope.

## Common Use Cases

### Documentation Review
When reviewing or updating documentation, search for:
- Related documentation that might be affected
- Current best practices
- Recent changes or updates to mentioned technologies
- Common patterns used in similar docs

### Technical Writing
When creating new technical content, search for:
- Existing examples to reference or build upon
- Terminology standards and conventions
- Related tutorials or guides
- Technical accuracy verification

### Architecture Documentation
When working on architecture docs, search for:
- Similar architectural patterns
- Implementation examples
- Design decisions and rationale
- Trade-offs and considerations

## Troubleshooting

If searches return no results:
- Try broader search terms
- Check spelling and technical terminology
- Search for synonyms or related concepts
- Consider searching for the broader category

If searches return too many results:
- Add more specific qualifiers
- Combine multiple search terms
- Filter by document type or category
- Search for exact phrases using quotes

### QMD Command Errors

If qmd commands fail:
- **"qmd: command not found"** - Check installation: `which qmd`
- **"No results"** - Try broader search terms or check `qmd status`
- **"Collection not found"** - Run `qmd collection list` to see available collections
- **Slow searches** - Consider using `qmd search` (faster) instead of `qmd query`
- **Timeout errors** - Database may need re-indexing: `qmd update`

## Notes

- The qmd database is local and contains curated resources relevant to your work
- Search results depend on what's been added to the database
- Keep queries focused on technical and architectural topics
- The tool is command-line based and accessed through Bash

## Quick Reference Card

**Search commands:**
- Fast keyword: `qmd search "term"`
- Best quality: `qmd query "term"`
- Semantic: `qmd vsearch "term"`

**Common flags:**
- `-c vault` - Filter to Vault docs
- `-n 10` - Get 10 results
- `--files` - Just show file paths
- `--full` - Get complete document

**Workflow summary:**
1. Search (15+ queries)
2. Organize (5 categories)
3. Present (with sources!)
4. Implement (incrementally)

**Remember:** Always cite sources with qmd:// paths AND public URLs!

---

Remember: The goal is to enhance documentation quality by leveraging existing knowledge and ensuring technical accuracy. Search proactively to make informed decisions about content.
