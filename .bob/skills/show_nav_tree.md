# Show Navigation Tree

Generate a formatted markdown navigation tree for any product, showing the hierarchical structure with relative file paths. Works with both versioned and non-versioned products.

## Usage

```
show_nav_tree <product_name> [version] [nav_file] [--format=ascii|markdown]
```

**Arguments:**
- `product_name`: Name of the product (required)
- `version`: Version string (optional, uses latest if not specified)
- `nav_file`: Navigation file name (optional, defaults to 'docs-nav-data.json')
- `--format`: Output format - 'ascii' (default) or 'markdown'

## Examples

- `show_nav_tree sentinel` (ASCII format, latest version)
- `show_nav_tree consul v1.22.x --format=markdown` (markdown list format)
- `show_nav_tree vault v1.15.x api-docs-nav-data.json` (specific nav file)
- `show_nav_tree hcp-docs --format=ascii` (explicit ASCII format)

## Implementation

```javascript
const fs = require('fs');
const path = require('path');

function showNavTree(productName, version = null, navFile = 'docs-nav-data.json', format = 'ascii') {
  const contentDir = path.join(process.cwd(), 'content', productName);
  
  // Check if product exists
  if (!fs.existsSync(contentDir)) {
    return { error: `Product '${productName}' not found in content directory` };
  }
  
  let targetDir = contentDir;
  let resolvedVersion = version;
  
  // Determine version directory
  if (!version) {
    const entries = fs.readdirSync(contentDir, { withFileTypes: true });
    const versionDirs = entries.filter(entry => 
      entry.isDirectory() && /^v?\d+\.\d+\.x$/.test(entry.name)
    );
    
    if (versionDirs.length > 0) {
      // Find latest version
      const sortedVersions = versionDirs
        .map(entry => entry.name)
        .sort((a, b) => {
          const parseVersion = (v) => {
            const match = v.match(/(\d+)\.(\d+)\.x/);
            return match ? [parseInt(match[1]), parseInt(match[2])] : [0, 0];
          };
          const [aMajor, aMinor] = parseVersion(a);
          const [bMajor, bMinor] = parseVersion(b);
          if (aMajor !== bMajor) return bMajor - aMajor;
          return bMinor - aMinor;
        });
      
      resolvedVersion = sortedVersions[0];
      targetDir = path.join(contentDir, resolvedVersion);
    }
  } else {
    targetDir = path.join(contentDir, version);
    resolvedVersion = version;
  }
  
  // Find navigation file
  const dataDir = path.join(targetDir, 'data');
  if (!fs.existsSync(dataDir)) {
    return { error: `No 'data' directory found in ${targetDir}` };
  }
  
  const navFilePath = path.join(dataDir, navFile);
  if (!fs.existsSync(navFilePath)) {
    return { error: `Navigation file '${navFile}' not found in ${dataDir}` };
  }
  
  // Read and parse navigation data
  const navData = JSON.parse(fs.readFileSync(navFilePath, 'utf8'));
  
  // Find the docs base directory
  const docsBaseDir = findDocsBaseDir(targetDir);
  
  // Generate tree based on format
  const tree = format === 'markdown' 
    ? generateMarkdownTree(navData, 0)
    : generateAsciiTree(navData, '', true);
  
  return {
    product: productName,
    version: resolvedVersion || 'unversioned',
    navFile: navFile,
    navFilePath: navFilePath,
    docsBaseDir: docsBaseDir,
    format: format,
    tree: tree
  };
}

function findDocsBaseDir(versionDir) {
  // Common patterns for docs directories
  const patterns = [
    path.join(versionDir, 'content', '*', 'docs'),
    path.join(versionDir, 'docs'),
    path.join(versionDir, 'content')
  ];
  
  for (const pattern of patterns) {
    const dir = pattern.replace('*', path.basename(path.dirname(versionDir)));
    if (fs.existsSync(dir)) {
      return dir;
    }
  }
  
  return versionDir;
}

function generateAsciiTree(items, prefix = '', isLast = true) {
  let output = '';
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const isLastItem = i === items.length - 1;
    
    if (item.divider) {
      output += `${prefix}\n${prefix}───────────────\n${prefix}\n`;
      continue;
    }
    
    const title = item.title.replace(/<\/?code>/g, '`').replace(/<sup>.*?<\/sup>/g, '');
    const connector = isLastItem ? '└── ' : '├── ';
    const childPrefix = prefix + (isLastItem ? '    ' : '│   ');
    
    if (item.routes) {
      // Section with children
      output += `${prefix}${connector}${title}/\n`;
      output += generateAsciiTree(item.routes, childPrefix, isLastItem);
    } else if (item.path) {
      // Leaf node with path
      const filePath = `${item.path}.mdx`;
      output += `${prefix}${connector}${title} (${filePath})\n`;
    } else if (item.href) {
      // External link
      output += `${prefix}${connector}${title} ⇗ ${item.href}\n`;
    } else {
      // Just a title
      output += `${prefix}${connector}${title}\n`;
    }
  }
  
  return output;
}

function generateMarkdownTree(items, indent = 0) {
  let output = '';
  const prefix = '  '.repeat(indent);
  
  for (const item of items) {
    if (item.divider) {
      output += '\n---\n\n';
      continue;
    }
    
    const title = item.title.replace(/<\/?code>/g, '`').replace(/<sup>.*?<\/sup>/g, '');
    
    if (item.routes) {
      // Section with children
      output += `${prefix}- **${title}**\n`;
      output += generateMarkdownTree(item.routes, indent + 1);
    } else if (item.path) {
      // Leaf node with path
      const filePath = `${item.path}.mdx`;
      output += `${prefix}- ${title} (\`${filePath}\`)\n`;
    } else if (item.href) {
      // External link
      output += `${prefix}- ${title} ⇗ [${item.href}](${item.href})\n`;
    } else {
      // Just a title
      output += `${prefix}- ${title}\n`;
    }
  }
  
  return output;
}

// Execute if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  let productName, version, navFile = 'docs-nav-data.json', format = 'ascii';
  
  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--format=')) {
      format = args[i].split('=')[1];
    } else if (!productName) {
      productName = args[i];
    } else if (!version && !args[i].includes('.json')) {
      version = args[i];
    } else if (args[i].includes('.json')) {
      navFile = args[i];
    }
  }
  
  if (!productName) {
    console.error('Usage: node show_nav_tree.js <product_name> [version] [nav_file] [--format=ascii|markdown]');
    process.exit(1);
  }
  
  const result = showNavTree(productName, version, navFile, format);
  
  if (result.error) {
    console.error('Error:', result.error);
    process.exit(1);
  }
  
  console.log(`# ${result.product} Documentation Navigation Tree (${result.version})`);
  console.log();
  console.log(`Navigation file: ${result.navFile}`);
  console.log(`Base directory: ${result.docsBaseDir}`);
  console.log(`Format: ${result.format}`);
  console.log();
  console.log(result.tree);
}

module.exports = showNavTree;
```

## Bob Shell Integration

When a user asks to see a navigation tree:

1. Use `list_files` to identify the product directory
2. Use `find_latest_version` to determine the latest version (if not specified)
3. Use `find_nav_data` to locate the navigation file
4. Read and parse the JSON navigation data
5. Generate a formatted markdown tree with:
   - Hierarchical structure (using indentation)
   - Section headers in **bold**
   - File paths in parentheses (relative to docs directory)
   - Dividers where present in the navigation

## Output Format

### ASCII Format (Default)

Tree-like structure similar to the Unix `tree` command:

```
# Product Documentation Navigation Tree (version)

Navigation file: docs-nav-data.json
Base directory: content/product/version/content/product/docs/
Format: ascii

├── Page Title (path/to/file.mdx)
├── Section Title/
│   ├── Overview (section/index.mdx)
│   ├── Subsection (section/subsection.mdx)
│   └── Nested Section/
│       └── Deep Page (section/nested/deep.mdx)
│
───────────────
│
└── Another Section (another.mdx)
```

### Markdown Format

Indented markdown list with file paths:

```markdown
# Product Documentation Navigation Tree (version)

Navigation file: docs-nav-data.json
Base directory: content/product/version/content/product/docs/
Format: markdown

- Page Title (`path/to/file.mdx`)
- **Section Title**
  - Overview (`section/index.mdx`)
  - Subsection (`section/subsection.mdx`)
  - **Nested Section**
    - Deep Page (`section/nested/deep.mdx`)

---

- Another Section (`another.mdx`)
```

## Path Resolution Rules

1. **Simple paths** (e.g., `"intro"`) → `intro.mdx`
2. **Nested paths** (e.g., `"concepts/imports"`) → `concepts/imports.mdx`
3. **Sections with children** → Displayed with `/` suffix in ASCII, `**bold**` in markdown
4. **External links** → Shown with `⇗` symbol and full URL
5. **Dividers** → Rendered as separator line in both formats

## Format Symbols

### ASCII Format
- `├──` Branch connector (not last item)
- `└──` Branch connector (last item)
- `│` Vertical line for hierarchy
- `(path)` File path in parentheses
- `⇗` External link indicator
- `/` Directory/section suffix

### Markdown Format
- `-` List item
- `**bold**` Section headers
- `(` `` `code` `` `)` File paths in code blocks within parentheses
- `⇗` External link indicator

## Common Use Cases

### View Latest Version Navigation (ASCII)
```
User: "Show me the navigation tree for Vault"
Bob: [Uses show_nav_tree with latest version, ASCII format by default]
```

### View Navigation in Markdown Format
```
User: "Show me the Consul navigation as a markdown list"
Bob: [Uses show_nav_tree with --format=markdown]
```

### View Specific Version
```
User: "Show me the Consul v1.20.x navigation"
Bob: [Uses show_nav_tree with specified version, ASCII format]
```

### View Specific Navigation File
```
User: "Show me the API docs navigation for Terraform in markdown"
Bob: [Uses show_nav_tree with api-docs-nav-data.json and --format=markdown]
```

### Compare Navigation Across Versions
```
User: "Compare navigation between Nomad v1.8.x and v1.9.x"
Bob: [Uses show_nav_tree twice, once for each version, can use different formats]
```

### Export Navigation Structure
```
User: "Give me the cloud-docs navigation in markdown format"
Bob: [Uses show_nav_tree hcp-docs --format=markdown for easy copying]
```

## Notes

- **Default format is ASCII** (tree-like structure)
- Automatically finds the latest version if not specified
- Works with both versioned and non-versioned products
- Handles multiple navigation files (docs, api-docs, commands, tutorials)
- Preserves the hierarchical structure from the JSON
- Shows relative paths from the docs base directory (e.g., `path/to/file.mdx`)
- Handles HTML tags in titles (converts `<code>` to backticks, strips `<sup>` tags)
- Respects dividers in the navigation structure
- External links shown with `⇗` symbol
- ASCII format uses box-drawing characters for visual hierarchy
- Markdown format uses indentation and bold for sections

## Integration with Other Skills

This skill builds on:
- **find_latest_version**: To determine which version to use
- **find_nav_data**: To locate the navigation file
- Both skills provide the foundation for this tree visualization

## Error Handling

The skill provides clear error messages for:
- Product not found
- Version not found
- No data directory
- Navigation file not found
- Invalid JSON in navigation file
