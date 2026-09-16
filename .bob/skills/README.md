# Web Unified Docs Skills

This directory contains Bob Shell skills specifically designed for working with the `hashicorp/web-unified-docs` repository. These skills help navigate the complex structure of versioned documentation across multiple HashiCorp products.

## Available Skills

### 1. Find Latest Version (`find_latest_version.md`)

Quickly identify the latest version directory for a given product.

**Use cases:**
- Determining which version folder to edit for current release updates
- Understanding the version history of a product
- Verifying the latest published version

**Example queries:**
- "What's the latest version of Consul docs?"
- "Show me the latest Vault version directory"
- "Which Terraform version should I update?"

**How it works:**
- Lists all version directories in `content/<product>/`
- Identifies directories matching the pattern `v{major}.{minor}.x`
- Sorts them semantically to find the latest
- Returns the path and all available versions

---

### 2. Find Navigation Data (`find_nav_data.md`)

Locate navigation JSON files for a product and version, including both product-specific and common/shared navigation files.

**Use cases:**
- Finding the right nav-data.json file when adding new pages
- Understanding the navigation structure for a product
- Verifying that a page is included in the navigation
- Discovering shared navigation files used across products

**Example queries:**
- "Where's the nav data for Vault v1.15.x docs?"
- "Show me all navigation files for Consul"
- "Find the API docs navigation for Terraform"
- "What navigation files are available for this product?"

**How it works:**
- Navigates to the product's version directory (or latest if not specified)
- Checks the `data` subdirectory for `*-nav-data.json` files
- **Also checks `content/terraform-docs-common/data` for shared navigation**
- Returns paths to all navigation files, clearly indicating product-specific vs. common
- Identifies the primary navigation file (typically `docs-nav-data.json`)

**Important notes:**
- Pages not included in navigation files will NOT be rendered on the website
- Always check both product-specific and common navigation locations
- Common navigation files are typically in `terraform-docs-common` for Terraform products

---

### 3. Identify Release Workflow (`identify_release_workflow.md`)

Determine which PR workflow to use based on the type of changes being made.

**Use cases:**
- Understanding which branch to target for a PR
- Determining the correct workflow for documentation changes
- Planning documentation for upcoming releases
- Avoiding mistakes with branch targeting

**Example queries:**
- "I need to fix a typo in Vault docs - what workflow should I use?"
- "I'm adding docs for Nomad 2.0 - what's the process?"
- "How do I contribute docs for the next Consul minor release?"
- "What branch should I use for this change?"

**How it works:**
- Analyzes the change description for keywords
- Categorizes into three workflows:
  1. **Current Release** (main branch) - for published content updates
  2. **Minor/Patch Release** (assembly branch) - for upcoming minor releases
  3. **Major Release** (major release branch) - for upcoming major versions
- Provides step-by-step instructions for each workflow
- Includes branch naming patterns and important notes

**The Three Workflows:**

#### Current Release (main branch)
- **When:** Fixing typos, errors, or updating published docs
- **Branch:** `main`
- **Timeline:** Changes appear ~10 minutes after merge

#### Minor/Patch Release (assembly branch)
- **When:** Adding docs for upcoming minor/patch releases
- **Branch:** Product-specific (e.g., `vault/202511`, `consul/1.19.0`)
- **Timeline:** Merged by tech writers at release time
- **Note:** Contact tech writer team for branch name

#### Major Release (major release branch)
- **When:** Adding docs for upcoming major versions
- **Branch:** Product-specific (e.g., `nomad/2.0.0`)
- **Timeline:** Merged by tech writers at release time
- **Note:** Includes new version folder for major version

---

### 4. Show Navigation Tree (`show_nav_tree.md`)

Generate a formatted markdown navigation tree for any product, showing the hierarchical structure with relative file paths.

**Use cases:**
- Visualizing the complete navigation structure for a product
- Understanding the documentation hierarchy
- Quickly seeing all available pages and their organization
- Comparing navigation across different versions
- Identifying where to add new pages in the structure

**Example queries:**
- "Show me the navigation tree for Sentinel"
- "What's the structure of Consul v1.22.x docs?"
- "Display the API docs navigation for Vault"
- "Compare the navigation between Nomad v1.8.x and v1.9.x"

**How it works:**
- Uses `find_latest_version` to determine the version (if not specified)
- Uses `find_nav_data` to locate the navigation file
- Parses the JSON navigation structure
- Generates a formatted markdown tree with:
  - Hierarchical indentation
  - Section headers in **bold**
  - File paths in parentheses (relative to docs directory)
  - Dividers where present

**Output format:**
```markdown
- Page Title (/path/to/file.mdx)
- **Section Title**
  - Overview (/section/index.mdx)
  - Subsection (/section/subsection.mdx)
  - **Nested Section**
    - Deep Page (/section/nested/deep.mdx)
```

**Features:**
- Automatically finds latest version if not specified
- Works with both versioned and non-versioned products
- Handles multiple navigation files (docs, api-docs, commands, tutorials)
- Preserves hierarchical structure from JSON
- Converts HTML tags in titles (e.g., `<code>` to backticks)
- Respects dividers in navigation structure

**Integration:**
This skill builds on `find_latest_version` and `find_nav_data` to provide a complete visualization of the documentation structure.

---

## Repository Context

### Versioned vs. Non-Versioned Products

**Versioned products** (use version directories):
- Boundary, Consul, Nomad, Sentinel, Terraform, Vault, and most Terraform plugins
- Structure: `content/<product>/v{major}.{minor}.x/`
- Example: `content/consul/v1.22.x/`

**Non-versioned products** (single directory):
- HCP, HCP Vault Dedicated, HCP Vault Secrets, HCP Packer, Waypoint, Well-Architected Framework
- Structure: `content/<product>/`
- Example: `content/hcp-docs/`

### Navigation Structure

Navigation files are located in `data` subdirectories:
- **Product-specific:** `content/<product>/<version>/data/*-nav-data.json`
- **Common/Shared:** `content/terraform-docs-common/data/*-nav-data.json`

Common navigation file types:
- `docs-nav-data.json` - Main documentation
- `api-docs-nav-data.json` - API reference
- `commands-nav-data.json` - CLI commands
- `tutorials-nav-data.json` - Tutorials

### Key Repository Facts

- **Main branch:** All published content lives here
- **Assembly branches:** Created by tech writers for upcoming releases
- **Preview time:** ~10 minutes from merge to live on developer.hashicorp.com
- **Local preview:** Use `make` to run Docker-based local preview
- **Navigation requirement:** Pages MUST be in nav-data.json to render

---

## Using These Skills with Bob Shell

These skills are designed to be used conversationally with Bob Shell. Simply ask questions in natural language, and Bob will use the appropriate skill to help you.

**Example conversations:**

```
You: "I need to update the Consul authentication docs. What's the latest version?"
Bob: [Uses find_latest_version skill]
     "The latest Consul version is v1.22.x at content/consul/v1.22.x"

You: "Where do I add this new page to the navigation?"
Bob: [Uses find_nav_data skill]
     "The navigation file is at content/consul/v1.22.x/data/docs-nav-data.json"

You: "I'm adding a new feature for Vault 1.16.0 that's coming out next month"
Bob: [Uses identify_release_workflow skill]
     "You should use the minor release workflow. Contact the Vault tech writer 
     team to get the assembly branch name (likely vault/202512 or vault/1.16.0)"
```

---

## Contributing New Skills

When adding new skills to this directory:

1. Create a new `.md` file with a descriptive name
2. Include clear usage examples
3. Provide implementation details (if applicable)
4. Document Bob Shell integration approach
5. Add the skill to this README
6. Test with real repository examples

**Suggested future skills:**
- `validate_nav_structure` - Check if files exist in nav-data.json
- `create_doc_page_template` - Generate new .mdx files with frontmatter
- `check_migration_status` - Identify migrated vs. non-migrated products
- `find_product_readme` - Locate product-specific contribution guides
- `list_product_versions` - Show all versions for a product

---

## Additional Resources

- [Repository README](../README.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Style Guide](../docs/style-guide/index.md)
- [Content Guide](../docs/content-guide/)
- [Broken Link Monitoring](../.github/BROKEN_LINK_MONITORING.md)

---

## Support

For questions about these skills or the repository:
- Contact your product's tech writer team
- Ask in #team-web-presence Slack channel
- Review the [CONTRIBUTING.md](../CONTRIBUTING.md) guide
