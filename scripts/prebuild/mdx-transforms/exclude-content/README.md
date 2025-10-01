# Content Exclusion Transform - Final Implementation

A single-pass MDX transform that handles content exclusion directives for HashiCorp products with explicit, maintainable if-block routing.

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

### Cross-Product Behavior

| Product | TFC:only | TFEnterprise:only | Vault:* |
|---------|----------|-------------------|---------|
| `terraform-docs-common` | Keep | Remove | Ignore |
| `terraform-enterprise` | Remove | Keep | Ignore |
| `terraform` | Remove | Remove | Ignore |
| `vault` | Ignore | Ignore | Process |

**Legend:**
- **Keep**: Content remains in output
- **Remove**: Content is removed from output
- **Ignore**: Directive blocks are not handled
- **Process**: Apply version comparison logic

## Architecture

### File Structure
```
exclude-content/
├── index.mjs              # Main transform with if-block routing
├── ast-utils.mjs          # Block parsing and node removal utilities
├── vault-processor.mjs    # Vault version directive processing
├── terraform-processor.mjs # TFC/TFEnterprise only directive processing
├── index.test.mjs         # Comprehensive tests
└── README.md             # This file
```

### Code Flow

1. **Early Return**: If `productConfig.supportsExclusionDirectives` is false, skip processing
2. **Single AST Pass**: Parse all directive blocks in one traversal (`parseDirectiveBlocks`)
3. **Explicit Routing**: For each block, use if-blocks to route to appropriate processor:
   ```javascript
   if (product === 'Vault') {
     processVaultBlock(...)
   } else if (product === 'TFC') {
     processTFCBlock(...)
   } else if (product === 'TFEnterprise') {
     processTFEnterpriseBlock(...)
   } else {
     throw new Error(`Unknown product: ${product}`)
   }
   ```
4. **Product-Specific Processing**: Each processor handles its own business logic
5. **Error Handling**: Contextual error messages with line numbers

### Key Design Principles

- **Explicit over Implicit**: No configuration-driven pattern matching
- **Single Pass Performance**: Parse all blocks once, route individually
- **Clear Error Messages**: Immediate feedback with file context and line numbers
- **Extensible**: Add new products with one if-block and one processor file

## Integration

### build-mdx-transforms.mjs Integration
```javascript
import { transformExcludeContent } from './exclude-content/index.mjs'

// In the remark pipeline:
.use(transformExcludeContent, {
  filePath,                                    // Full file path
  version,                                     // Content version
  repoSlug: entry.repoSlug,                   // Product slug (e.g., 'vault')
  productConfig: PRODUCT_CONFIG[entry.repoSlug] // Full product config
})
```

### Product Configuration (productConfig.mjs)
```javascript
export const PRODUCT_CONFIG = {
  'vault': {
    // ... existing config
    supportsExclusionDirectives: true,
  },
  'terraform-docs-common': {
    // ... existing config
    supportsExclusionDirectives: true,
  }
}
```

## Adding a New Product for Content Exclusion

Follow these steps to add content exclusion support for a new product:

### Step 1: Update Product Configuration
In `productConfig.mjs`, add exclusion support to your product:

```javascript
export const PRODUCT_CONFIG = {
  // ... existing products
  'consul': {
    // ... existing consul config
    supportsExclusionDirectives: true,
  }
}
```

### Step 2: Add Routing Logic
In `exclude-content/index.mjs`, add your product to the if-block routing:

```javascript
function routeAndProcessBlock(block, tree, options) {
  const [product, ...rest] = block.content.split(':')
  const directive = rest.join(':')

  if (product === 'Vault') {
    processVaultBlock(directive, block, tree, options)
  } else if (product === 'TFC') {
    processTFCBlock(directive, block, tree, options)
  } else if (product === 'TFEnterprise') {
    processTFEnterpriseBlock(directive, block, tree, options)
  } else if (product === 'Consul') {  // ← ADD THIS
    processConsulBlock(directive, block, tree, options)
  } else {
    throw new Error(
      `Unknown directive product: "${product}" in block "${block.content}" at lines ${block.start}-${block.end}. ` +
      `Expected: Vault, TFC, TFEnterprise, or Consul`  // ← UPDATE ERROR MESSAGE
    )
  }
}
```

### Step 3: Create Product Processor
Create a new file `exclude-content/consul-processor.mjs`:

```javascript
/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { removeNodesInRange } from './ast-utils.mjs'

/**
 * Process Consul-specific directive blocks
 *
 * @param {string} directive The directive part (e.g., "only" or ">=v1.15.x")
 * @param {Object} block Block information with start, end, content
 * @param {Object} tree Remark AST
 * @param {Object} options Processing options
 */
export function processConsulBlock(directive, block, tree, options) {
  const { repoSlug } = options

  // Option A: "Only" directive (like Terraform products)
  if (directive === 'only') {
    // Consul:only should be kept ONLY in consul files, removed elsewhere
    if (repoSlug !== 'consul') {
      removeNodesInRange(tree, block.start, block.end)
    }
    return
  }

  // Option B: Version directive (like Vault)
  const versionMatch = directive.match(/^(<=|>=|<|>|=)v(\d+\.\d+\.x)$/)
  if (versionMatch) {
    // Only process version directives in consul files
    if (repoSlug !== 'consul') {
      return // Skip - ignore consul version directives in non-consul files
    }

    processConsulVersionDirective(versionMatch, block, tree, options)
    return
  }

  // Invalid directive
  throw new Error(
    `Invalid Consul directive: "${directive}" at lines ${block.start}-${block.end}. ` +
    `Expected format: Consul:only or Consul:>=vX.Y.x`
  )
}

/**
 * Process Consul version directives (if needed)
 */
function processConsulVersionDirective(versionMatch, block, tree, options) {
  // Implementation similar to vault-processor.mjs if version directives are needed
  // ... version comparison logic
}
```

### Step 4: Import the Processor
In `exclude-content/index.mjs`, add the import:

```javascript
import { parseDirectiveBlocks } from './ast-utils.mjs'
import { processVaultBlock } from './vault-processor.mjs'
import { processTFCBlock, processTFEnterpriseBlock } from './terraform-processor.mjs'
import { processConsulBlock } from './consul-processor.mjs'  // ← ADD THIS
```

### Step 5: Add Tests
In `exclude-content/index.test.mjs`, add test cases for your new product:

```javascript
describe('transformExcludeContent - Consul Directives', () => {
  const consulOptions = {
    filePath: 'consul/some-file.md',
    version: '1.15.x',
    repoSlug: 'consul',
    productConfig: {
      supportsExclusionDirectives: true,
    }
  }

  it('should keep Consul:only content in consul files', async () => {
    const markdown = `
<!-- BEGIN: Consul:only -->
This consul content should stay.
<!-- END: Consul:only -->
Regular content.
`
    const result = await runTransform(markdown, consulOptions)
    expect(result.trim()).toContain('This consul content should stay.')
  })

  it('should remove Consul:only content from non-consul files', async () => {
    const nonConsulOptions = {
      filePath: 'vault/some-file.md',
      repoSlug: 'vault',
      productConfig: { supportsExclusionDirectives: true }
    }

    const markdown = `
<!-- BEGIN: Consul:only -->
This should be removed.
<!-- END: Consul:only -->
Regular content.
`
    const result = await runTransform(markdown, nonConsulOptions)
    expect(result.trim()).toBe('Regular content.')
  })
})
```

### Step 6: Update Documentation
Update this README to include your new product in:
- The supported directive types section
- The cross-product behavior table
- The error message examples

## Example Usage in Documentation

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

The transform provides clear, contextual error messages:

```
Unknown directive product: "InvalidProduct" in block "InvalidProduct:only" at lines 5-7. Expected: Vault, TFC, or TFEnterprise

Mismatched block names: BEGIN="Vault:>=v1.21.x" at line 3, END="Vault:>=v1.22.x" at line 5

Invalid Vault directive: "invalidformat" at lines 8-10. Expected format: Vault:>=vX.Y.x
```

## Performance Considerations

- **Single AST Traversal**: All directive blocks are parsed in one pass
- **Reverse Processing**: Blocks are processed in reverse order for safe node removal
- **Early Returns**: Products without exclusion support skip processing entirely
- **Explicit Routing**: No regex matching or configuration lookups during processing

## Testing

Run the tests with:
```bash
npx vitest scripts/prebuild/mdx-transforms/exclude-content
```

The test suite covers:
- Version directive processing for Vault
- "Only" directive processing for Terraform products
- Cross-product behavior (ignore vs remove vs keep)
- Error handling for malformed directives
- Configuration edge cases
- TODO include tests for global partials with versioning