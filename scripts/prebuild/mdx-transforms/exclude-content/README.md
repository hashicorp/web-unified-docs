# Content Exclusion Transform

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
3. **Explicit Routing**: For each block, check if in (`directiveProcessingFuncs`) object to route to appropriate processor:
   ```javascript
   const directiveProcessingFuncs = {
		Vault: processVaultBlock,
		TFC: processTFCBlock,
		TFEnterprise: processTFEnterpriseBlock,
	}

	// Explicit routing
	if (product in directiveProcessingFuncs) {
		directiveProcessingFuncs[product](directive, block, tree, options)
	} 
	else {
		// Error for unknown products
		throw new Error(
			`Unknown directive product: "${product}" in block "${block.content}" at lines ${block.start}-${block.end}. Expected: Vault, TFC, or TFEnterprise`,
		)
	}
   ```
4. **Product-Specific Processing**: Each processor handles its own business logic
5. **Error Handling**: Contextual error messages with line numbers

### Key Design Principles

- **Explicit over Implicit**: No configuration-driven pattern matching
- **Single Pass Performance**: Parse all blocks once, route individually
- **Clear Error Messages**: Immediate feedback with file context and line numbers
- **Extensible**: Add new products with an additional key-val pair in directiveProcessingFuncs and one processor file

## Integration

### Processing Pipeline Order

**IMPORTANT**: This transform runs AFTER the `remarkIncludePartialsPlugin` in the MDX processing pipeline:

```javascript
.use(remarkIncludePartialsPlugin, { partialsDir, filePath })  // ← First: expand all @include statements
.use(transformExcludeContent, { ... })                        // ← Second: process exclusion directives
```

**Why this order matters (The Chicken/Egg Problem):**

There's a dependency relationship that dictates this processing order:
- **Content exclusion** needs to see all directive blocks in the AST to process them
- **Global partials** can contain exclusion directives, but aren't in the AST until `@include` statements are expanded
- **Therefore**: If content exclusion runs first, it won't see directives in global partials because they haven't been included yet

This creates a chicken/egg problem if we try to reverse the order:
1. ❌ If content exclusion runs first: Global partial directives are missed (partials not yet expanded)
2. ✅ If partials run first: All directives are present in the AST (partials are expanded), then content exclusion processes everything

**How it works:**
- Global partials (e.g., `/vault/global/partials/`) can contain exclusion directives
- The partials plugin expands all `@include` statements into the main AST
- Content exclusion then processes the fully expanded AST with all partial content included
- This ensures exclusion directives in global partials are properly evaluated

### Global Partials Exception

**IMPORTANT**: Files located in `*/global/partials/` directories are **excluded** from content exclusion processing:

```javascript
const isGlobalPartial = filePath.includes('/global/partials/')

// Only apply content exclusion if this is NOT a global partial
if (!isGlobalPartial) {
  processor.use(transformExcludeContent, { ... })
}
```

**Why this matters:**
- Global partials are version-agnostic and shared across all versions
- They should contain the raw exclusion directives, not have them processed
- When a version-specific file includes a global partial, the directives ARE processed based on that file's version
- This allows global partials to contain version-specific content through directives

**Example:**
1. `/vault/global/partials/feature.mdx` contains `<!-- BEGIN: Vault:>=v1.21.x -->` directive
2. This file is processed WITHOUT content exclusion - directive stays intact
3. `/vault/v1.20.x/docs/page.mdx` includes the global partial via `@include`
4. During processing, the partial is expanded into the v1.20.x file's AST
5. Content exclusion runs on the v1.20.x file, processing the directive (v1.20.x < v1.21.x, content removed)
6. `/vault/v1.21.x/docs/page.mdx` includes the same global partial
7. Content exclusion runs on the v1.21.x file (v1.21.x >= v1.21.x, content kept)

### Edge Case: Exclusion Directives Wrapping @include Statements

**The Problem:**

When an exclusion directive wraps an `@include` statement, there's a subtle bug related to AST position data:

```html
<!-- BEGIN: TFC:only -->
@include 'tfc-feature.mdx'
<!-- END: TFC:only -->
```

**What Should Happen:**
In terraform-enterprise files, the entire block (including the partial content) should be removed.

**What Was Happening:**
- ✅ BEGIN comment removed (line 65)
- ❌ Partial content NOT removed (reports position as line 1)
- ✅ END comment removed (line 69)
- Result: The partial content survived!

**Root Cause - AST Position Mismatch:**

1. The include-partials plugin replaces `@include` with the partial's AST nodes
2. Those nodes retain position data from the **partial file** (line 1, line 2, etc.)
3. Content exclusion's `removeNodesInRange(tree, 65, 69)` looks for nodes between lines 65-69
4. Partial nodes with `position.start.line = 1` are **not** in range 65-69
5. They don't get removed

**Example AST Structure After Partials:**
```javascript
// Parent file: lines 65-69 contain the exclusion block
{
  type: 'html',           // BEGIN comment
  position: { line: 65 }  // ✅ In range, removed
}
{
  type: 'paragraph',      // Content from partial
  position: { line: 1 }   // ❌ NOT in range 65-69, survives
}
{
  type: 'html',           // END comment
  position: { line: 69 }  // ✅ In range, removed
}
```

**The Fix:**

Modified `removeNodesInRange` in `ast-utils.mjs` to track when we're "inside" a removal range:

```javascript
let insideRange = false

for (let i = 0; i < nodes.length; i++) {
  const node = nodes[i]

  if (hasPosition) {
    // Mark when we enter the range (BEGIN comment)
    if (nodeStart >= startLine && nodeEnd <= endLine && !insideRange) {
      insideRange = true
    }

    // Normal case: node fully in range
    if (nodeStart >= startLine && nodeEnd <= endLine) {
      indicesToRemove.push(i)
    }
    // Edge case: inside range but position is outside (partial node)
    else if (insideRange && nodeStart < startLine) {
      indicesToRemove.push(i)  // Remove it anyway
    }

    // Mark when we exit the range (END comment)
    if (nodeEnd === endLine) {
      insideRange = false
    }
  } else {
    // Node without position - remove if inside range
    if (insideRange) {
      indicesToRemove.push(i)
    }
  }
}
```

**Key Logic:**
- If we're between BEGIN and END (`insideRange = true`)
- And a node has position data that doesn't match the expected range (like line 1 when range is 65-69)
- It's a partial node that needs to be removed

**Testing:**

Added integration test in `build-mdx-transforms.test.mjs`:
```javascript
test('should remove TFC:only block wrapping @include in terraform-enterprise')
```

This test creates the exact scenario: TFC:only wrapping an @include statement in a terraform-enterprise file, and verifies the partial content is removed.

### build-mdx-transforms.mjs Integration
```javascript
import { transformExcludeContent } from './exclude-content/index.mjs'

// Check if file is a global partial
const isGlobalPartial = filePath.includes('/global/partials/')

const processor = remark()
  .use(remarkMdx)
  .use(remarkIncludePartialsPlugin, { partialsDir, filePath })

// Only apply content exclusion if NOT a global partial
if (!isGlobalPartial) {
  processor.use(transformExcludeContent, {
    filePath,                                    // Full file path
    version,                                     // Content version
    repoSlug: entry.repoSlug,                   // Product slug (e.g., 'vault')
    productConfig: PRODUCT_CONFIG[entry.repoSlug] // Full product config
  })
}
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
const directiveProcessingFuncs = {
  Vault: processVaultBlock,
  TFC: processTFCBlock,
  TFEnterprise: processTFEnterpriseBlock,
  Consul: processConsulBlock // <- ADD THIS
}

// Explicit routing
if (product in directiveProcessingFuncs) {
  directiveProcessingFuncs[product](directive, block, tree, options)
} 
else {
  // Error for unknown products
  throw new Error(
    `Unknown directive product: "${product}" in block "${block.content}" at lines ${block.start}-${block.end}. Expected: Vault, TFC, TFEnterprise, or Consul`, // <- ADD THIS
  )
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

## Testing

### Unit Tests

Run the unit tests with:
```bash
npx vitest scripts/prebuild/mdx-transforms/exclude-content
```

The unit test suite (`index.test.mjs`) covers:
- Version directive processing for Vault
- "Only" directive processing for Terraform products
- Cross-product behavior (ignore vs remove vs keep)
- Error handling for malformed directives
- Configuration edge cases

### Integration Tests

Run the integration tests with:
```bash
npx vitest scripts/prebuild/mdx-transforms/build-mdx-transforms.test.mjs
```

The integration test suite (`build-mdx-transforms.test.mjs`) covers the full MDX processing pipeline:

**Global Partials Processing:**
- Basic partial inclusion and content expansion
- Nested partials (partials that include other partials)

**Content Exclusion After Partials:**
- Exclusion directives inside global partials work correctly
- Exclusion directives wrapping `@include` statements
- Multiple exclusion blocks in the same partial

**Global Partials Skip Logic:**
- Files in `*/global/partials/` directories skip content exclusion
- Global partial files retain their directives
- Directives are processed when partials are included in version-specific files

**Error Cases:**
- Missing partial files
- Malformed exclusion directives in partials
- Mismatched BEGIN/END tags in partials

**Cross-Product Support:**
- TFC:only and TFEnterprise:only directives in global partials

**Multi-File Processing:**
- Processing multiple files with shared and versioned partials

All tests use mock filesystem data (`memfs`) and do not rely on real files in the repository.