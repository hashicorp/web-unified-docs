# Content Exclusion Transform

A single-pass MDX transform that handles content exclusion directives for HashiCorp products with routing.

## How It Works

### Overview
This transform processes HTML-style comments in MDX files to conditionally include or exclude content based on product and version criteria. It uses a single AST traversal with explicit if-block routing.

### Directive Format
Content exclusion blocks follow this format:
```html
<!-- BEGIN: Product:directive -->
Content to conditionally include/exclude
<!-- END: Product:directive -->
```

### Supported Directive Types

#### 1. Version Directives (Vault)
```html
<!-- BEGIN: Vault:>=v1.21.x -->
This content appears only in Vault v1.21.x and later
<!-- END: Vault:>=v1.21.x -->
```

**Supported operators:** `>=`, `<=`, `>`, `<`, `=`
**Version format:** `vX.Y.x` (e.g., `v1.20.x`)

#### 2. "Only" Directives (Terraform products)
```html
<!-- BEGIN: TFC:only -->
This content appears only in Terraform Cloud docs
<!-- END: TFC:only -->

<!-- BEGIN: TFEnterprise:only -->
This content appears only in Terraform Enterprise docs
<!-- END: TFEnterprise:only -->
```

**Optional name parameter:**
```html
<!-- BEGIN: TFEnterprise:only name:revoke -->
Content with a descriptive name for documentation purposes
<!-- END: TFEnterprise:only name:revoke -->
```
The `name:` parameter is optional and can be used to add semantic meaning to directive blocks. It does not affect the processing logic - blocks are still evaluated based on the product (TFC/TFEnterprise) and the "only" directive.

### Cross-Product Behavior

| Product | TFC:only | TFEnterprise:only | Vault:* |
|---------|----------|-------------------|---------|
| `terraform-docs-common` | Keep | Remove | Ignore |
| `terraform-enterprise` | Remove | Keep | Ignore |
| `terraform`** | Remove | Remove | Ignore |
| `vault` | Ignore | Ignore | Process |
** An extra feature based on the current logic, can be explicity ignored if needed

**Legend:**
- **Keep**: Content remains in output (BEGIN/END comments are kept)
- **Remove**: Content is removed from output (including BEGIN/END comments)
- **Ignore**: Directive blocks are not processed
- **Process**: Apply version comparison logic

## Architecture

### File Structure
```
exclude-content/
├── index.mjs              # Main transform with if-block routing
├── ast-utils.mjs          # Block parsing and node removal utilities
├── vault-processor.mjs    # Vault version directive processing
├── terraform-processor.mjs # TFC/TFEnterprise only directive processing
├── index.test.mjs         # Unit tests
└── README.md             # This file
```

### Code Flow

1. **Early Return**: If `productConfig.supportsExclusionDirectives` is false, skip processing
2. **Single AST Pass**: Parse all directive blocks in one traversal (`parseDirectiveBlocks`)
   - Stores **node references** (not line numbers) for BEGIN/END comments
   - Returns blocks with `{ startNode, endNode, startLine, endLine, content }`
3. **Explicit Routing**: For each block, route to appropriate processor:
   ```javascript
   const directiveProcessingFuncs = {
		Vault: processVaultBlock,
		TFC: processTFCBlock,
		TFEnterprise: processTFEnterpriseBlock,
	}

	if (product in directiveProcessingFuncs) {
		directiveProcessingFuncs[product](directive, block, tree, options)
	} else {
		throw new Error(`Unknown directive product: "${product}"...`)
	}
   ```
4. **Product-Specific Processing**: Each processor handles its own business logic
5. **Node Removal**: `removeNodesInRange()` removes content between BEGIN/END comments

### Key Design Principles

- **Explicit over Implicit**: No configuration-driven pattern matching
- **Single Pass Performance**: Parse all blocks once, route individually
- **Clear Error Messages**: Immediate feedback with file context and line numbers
- **Extensible**: Add new products by creating a processor and adding to routing object

## Integration

### Processing Pipeline Order

**CRITICAL**: This transform runs AFTER the `remarkIncludePartialsPlugin`:

```javascript
.use(remarkIncludePartialsPlugin, { partialsDir, filePath })  // ← First: expand all @include statements
.use(transformExcludeContent, { ... })                        // ← Second: process exclusion directives
```

**Why this order matters:**

Global partials can contain exclusion directives, but aren't in the AST until `@include` statements are expanded. If content exclusion runs first, it won't see directives in global partials.

**How it works:**
1. Partials plugin expands all `@include` statements into the main AST
2. Content exclusion processes the fully expanded AST
3. Directives in global partials are properly evaluated based on the including file's version/product

### Global Partials Exception

Files in `*/global/partials/` directories **skip** content exclusion processing:

```javascript
const isGlobalPartial = filePath.includes('/global/partials/')

if (!isGlobalPartial) {
  processor.use(transformExcludeContent, { ... })
}
```

**Rationale:** Global partials are version-agnostic and shared across versions. They keep their directives intact. When included in version-specific files, directives ARE processed based on the including file's version/product.

## Implementation Details

### parseDirectiveBlocks() Function

Parses all directive blocks from the AST in a single pass and returns block objects containing:

- `startNode`: Reference to the BEGIN comment node
- `endNode`: Reference to the END comment node  
- `startLine`: Line number where BEGIN comment appears (for error messages)
- `endLine`: Line number where END comment appears (for error messages)
- `content`: The directive content (e.g., "TFEnterprise:only name:project-remote-state")

**Why node references instead of line numbers?**

When multiple partials are included in a file, each partial's AST nodes retain their original line numbers from the source file. This means multiple partials can have overlapping line ranges (e.g., both starting at line 1). Using actual node object references ensures we match the exact BEGIN/END pair, not just any nodes at those line numbers.

### removeNodesInRange() Function

This is the core function that removes content between BEGIN/END comments using node identity matching.

**Key Algorithm:**
```javascript
// Check if this is the START node
if (node === startNode) {
  insideRange = true
  nodesToRemove.add(node)
}

// Check if this is the END node  
if (node === endNode) {
  nodesToRemove.add(node)
  insideRange = false
}

// If inside range, mark for removal
if (insideRange) {
  nodesToRemove.add(node)
}
```

**Why node identity matching?**

Using `node === startNode` comparison ensures we match the exact node objects that were identified during parsing. This is critical when:
- Multiple partials contain the same directive name (e.g., both have `TFEnterprise:only name:project-remote-state`)
- Partial AST nodes have overlapping line numbers from their source files
- Same directive appears multiple times in sequence

**Handles Partial Content:**
- Once BEGIN node is found, all subsequent nodes are marked for removal until END node
- Recurses into children to handle nested structures

**Recurse-First Algorithm:**
- Processes children BEFORE deciding parent's fate
- Finds nested END comments even when parent is marked for removal
- Parent nodes that contained removed children are also removed (if empty)

**Helper Function:**
```javascript
function isCommentNode(node) {
  if (node.type === 'jsx' || node.type === 'html') return true
  // Remark sometimes parses indented HTML comments as code nodes
  if (node.type === 'code' && node.value) {
    return node.value.trim().startsWith('<!--') && node.value.trim().endsWith('-->')
  }
  return false
}
```

## Adding a New Product

### Step 1: Update Product Configuration

In `productConfig.mjs`:
```javascript
export const PRODUCT_CONFIG = {
  'consul': {
    supportsExclusionDirectives: true,
  }
}
```

### Step 2: Add Routing Logic

In `exclude-content/index.mjs`:
```javascript
const directiveProcessingFuncs = {
  Vault: processVaultBlock,
  TFC: processTFCBlock,
  TFEnterprise: processTFEnterpriseBlock,
  Consul: processConsulBlock // ← Add this
}
```

### Step 3: Create Product Processor

Create `exclude-content/consul-processor.mjs`:
```javascript
import { removeNodesInRange } from './ast-utils.mjs'

export function processConsulBlock(directive, block, tree, options) {
  const { repoSlug } = options

  if (directive === 'only') {
    // Consul:only kept ONLY in consul, removed elsewhere
    if (repoSlug !== 'consul') {
      removeNodesInRange(tree, block)
    }
    return
  }

  // Version directive example
  const versionMatch = directive.match(/^(<=|>=|<|>|=)v(\d+\.\d+\.x)$/)
  if (versionMatch) {
    // Process version comparison...
    // If content should be removed:
    // removeNodesInRange(tree, block)
  }

  throw new Error(`Invalid Consul directive: "${directive}" at lines ${block.startLine}-${block.endLine}`)
}
```

### Step 4: Import the Processor

In `exclude-content/index.mjs`:
```javascript
import { processConsulBlock } from './consul-processor.mjs'
```

### Step 5: Add Tests

Add test cases in `exclude-content/index.test.mjs` for your new product's behavior.

## Example Usage

```html
<!-- Show feature only in Vault 1.21.x and later -->
<!-- BEGIN: Vault:>=v1.21.x -->
## New Feature in Vault 1.21.x
This feature is only available in Vault 1.21.x and later versions.
<!-- END: Vault:>=v1.21.x -->

<!-- Show content only in Terraform Cloud -->
<!-- BEGIN: TFC:only -->
Click the **Settings** tab in the Terraform Cloud UI.
<!-- END: TFC:only -->

<!-- Show content only in Terraform Enterprise -->
<!-- BEGIN: TFEnterprise:only -->
Navigate to `/admin/settings` in your Terraform Enterprise instance.
<!-- END: TFEnterprise:only -->
```

## Error Handling

Example error messages:

```
Unknown directive product: "InvalidProduct" in block "InvalidProduct:only" at lines 5-7. Expected: Vault, TFC, or TFEnterprise

Mismatched block names: BEGIN="Vault:>=v1.21.x" at line 3, END="Vault:>=v1.22.x" at line 5

Invalid Vault directive: "invalidformat" at lines 8-10. Expected format: Vault:>=vX.Y.x
```

## Testing

### Unit Tests

```bash
npx vitest scripts/prebuild/mdx-transforms/exclude-content
```

Coverage:
- Version directive processing (Vault)
- "Only" directive processing (Terraform products)
- Cross-product behavior
- Error handling for malformed directives
- Edge cases (nested comments, indented comments, multiple partials with same directive name)

### Integration Tests

```bash
npx vitest scripts/prebuild/mdx-transforms/build-mdx-transforms.test.mjs
```

Coverage:
- Full MDX pipeline (partials → exclusion → output)
- Global partials processing
- Exclusion directives in global partials
- Exclusion directives wrapping `@include` statements
- Multi-file processing

**Test Notes:**
- Most tests use mock filesystem data (`memfs`) and do not rely on real files in the repository, only a few do.

## Performance Considerations

- **Single AST Traversal**: All directive blocks are parsed in one pass
- **Reverse Processing**: Blocks are processed in reverse order for safe node removal
- **Early Returns**: Products without exclusion support skip processing entirely
