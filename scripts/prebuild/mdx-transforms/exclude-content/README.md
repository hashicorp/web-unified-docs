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

**The Problem - Three Layers of Complexity:**

When exclusion directives wrap `@include` statements, there are actually THREE interconnected bugs:

1. **Partial content not removed** - Position data mismatch
2. **Content after exclusion blocks deleted** - `insideRange` never resets
3. **END comments nested in nodes** - Remark parsing quirk

**Scenario:**
```html
<!-- Line 37: BEGIN: TFC:only -->
<!-- Line 38: @include 'tfc-feature.mdx' -->
<!-- Line 45: END: TFC:only -->
<!-- Line 46: Content that should survive -->
```

**What Should Happen:**
- Lines 37-45: Removed in terraform-enterprise
- Line 46+: PRESERVED

**What Was Happening:**
- ✅ BEGIN comment removed (line 37)
- ❌ Partial content NOT removed (position reports as line 1)
- ✅ END comment removed (line 45)
- ❌ **ALL content after line 45 also removed!**

**Root Cause 1 - Position Data Mismatch:**

The include-partials plugin replaces `@include` with partial's AST nodes, which retain position data from the **partial file**:

```javascript
// After partial expansion:
{
  type: 'jsx',           // BEGIN comment
  position: { line: 37 } // ✅ In range 37-45
}
{
  type: 'paragraph',     // Partial content
  position: { line: 1 }  // ❌ NOT in range 37-45 (from partial file!)
}
{
  type: 'jsx',           // END comment
  position: { line: 45 } // ✅ In range 37-45
}
{
  type: 'paragraph',     // Content after
  position: { line: 46 } // Should be preserved
}
```

**Root Cause 2 - insideRange Never Resets:**

When all partial nodes are removed, no node matches `endLine` to reset the flag:

```javascript
// Partial node at line 1 < endLine 45 → doesn't reset
// No node at line 45 exists anymore (removed) → doesn't reset
// insideRange stays true FOREVER
// Line 46+ gets removed as "partial nodes"!
```

**Root Cause 3 - Nested END Comments:**

Remark can parse END comments as **children** of other nodes:

```markdown
- List item content
<!-- END: TFC:only -->  ← Becomes child of listItem!
```

The AST structure becomes:
```javascript
{
  type: 'list',
  children: [{
    type: 'listItem',
    children: [
      { type: 'paragraph', ... },
      { type: 'jsx', value: '<!-- END: TFC:only -->' } // ← Nested!
    ]
  }]
}
```

**The Complete Fix - Three-Part Solution:**

**1. Comment-Node-Only Boundaries**
Only `jsx` and `html` nodes can be BEGIN/END comments (prevents false matches):

```javascript
const isCommentNode = node.type === 'jsx' || node.type === 'html'

if (!insideRange && isCommentNode && nodeStart >= startLine && nodeEnd <= endLine) {
  insideRange = true  // Only comment nodes can start ranges
}
```

**2. Recurse-First Algorithm**
Process children BEFORE deciding parent's fate (finds nested END comments):

```javascript
function removeNodesInRange(nodes, depth = 0, parentInsideRange = false) {
  let insideRange = parentInsideRange

  for (let i = 0; i < nodes.length; i++) {
    const wasInsideRange = insideRange

    // STEP 1: Recurse into children FIRST
    if (node.children) {
      insideRange = removeFromNodes(node.children, depth + 1, insideRange)

      // If parent was in range, remove it (unless it's a comment)
      if (wasInsideRange && !isCommentNode) {
        remove(node)
        continue
      }
    }

    // STEP 2: Check if this node is a range boundary
    // ... boundary logic
  }

  return insideRange  // Propagate state back to parent
}
```

**3. State Propagation Through Recursion**
Pass and return `insideRange` state (maintains state across recursion):

```javascript
// Pass state down to children
insideRange = removeFromNodes(node.children, depth + 1, insideRange)

// Return state back to parent
return insideRange
```

**Complete Algorithm:**

```javascript
export function removeNodesInRange(tree, startLine, endLine) {
  function removeFromNodes(nodes, depth = 0, parentInsideRange = false) {
    let insideRange = parentInsideRange
    const indicesToRemove = []

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const wasInsideRange = insideRange

      // STEP 1: Recurse first to find nested END comments
      if (node.children) {
        insideRange = removeFromNodes(node.children, depth + 1, insideRange)

        // If parent was in excluded range, remove it
        const isCommentNode = node.type === 'jsx' || node.type === 'html'
        if (wasInsideRange && !isCommentNode) {
          indicesToRemove.push(i)
          continue
        }
      }

      // STEP 2: Check boundaries (only for comment nodes with position)
      if (hasPosition) {
        const isCommentNode = node.type === 'jsx' || node.type === 'html'

        // Only comment nodes can start ranges
        if (!insideRange && isCommentNode &&
            nodeStart >= startLine && nodeEnd <= endLine) {
          insideRange = true
          indicesToRemove.push(i)
        }
        // Only comment nodes can end ranges
        else if (insideRange && isCommentNode &&
                 nodeStart >= startLine && nodeEnd === endLine) {
          insideRange = false
          indicesToRemove.push(i)
        }
        // Everything else inside range is a partial node
        else if (insideRange) {
          indicesToRemove.push(i)
        }
      }
      // STEP 3: Nodes without position (from partials)
      else if (insideRange) {
        indicesToRemove.push(i)
      }
    }

    // Remove marked nodes
    for (let i = indicesToRemove.length - 1; i >= 0; i--) {
      nodes.splice(indicesToRemove[i], 1)
    }

    return insideRange
  }

  removeFromNodes(tree.children)
}
```

**Edge Cases Handled:**

✅ Partial content with mismatched position data
✅ Content after exclusion blocks preserved
✅ END comments nested in list items
✅ END comments nested in any node type
✅ Single-line and multi-line partial nodes
✅ Multiple exclusion blocks in sequence
✅ Empty parent nodes after children removed
✅ Parent nodes containing BEGIN comments as children (state transition detection)
✅ END comments indented in list items (parent nodes with remaining children preserved)
✅ Indented comments parsed as code nodes (isCommentNode helper recognizes all types)
✅ Overlapping directive comments on the same line (skip adjacent BEGIN comments after END)

**Testing:**

Integration tests in `build-mdx-transforms.test.mjs`:
```javascript
test('should preserve content after Vault:>=v1.21.x wrapping partial in v1.20.x')
test('should preserve content after TFC:only wrapping partial in terraform-enterprise')
```

Unit test in `index.test.mjs`:
```javascript
test('should remove TFEnterprise:only with name parameter from terraform product')
// Tests END comment nested in list item structure
```

**Detailed Reference:**

For a complete deep-dive into this bug, the investigation process, and key learnings, see:
**[BUG_FIX_REFERENCE.md](./BUG_FIX_REFERENCE.md)**

This reference document includes:
- Visual AST representations
- Step-by-step debugging process
- Key insights about position data and recursion
- How to debug similar issues
- Common pitfalls to avoid

#### Multi-line Partial Bug Fix

**Additional Issue Discovered:**

After the initial fix, multi-line partial content was still not being removed in some cases:

- **Affected Files**: `notification-configurations.mdx` in terraform-enterprise v202301-1 through v202402-1
- **Problem**: The `ephemeral-workspaces.mdx` partial (spanning 2 lines) remained after exclusion processing
- **Example Partial Content**:
  ```markdown
  -> **Note:** Ephemeral workspace (automatic destroy runs) functionality is available in Terraform Cloud **Plus** Edition. Refer to [Terraform Cloud pricing](https://www.hashicorp.com/products/terraform/pric
  ing) for details.
  ```

**Root Cause:**

The initial fix had an overly restrictive condition requiring single-line nodes:

```javascript
// OLD CODE (too restrictive)
else if (insideRange && nodeStart === nodeEnd && nodeStart < startLine) {
    indicesToRemove.push(i)
}
```

This required `nodeStart === nodeEnd` (single-line only), so multi-line partials failed the check.

**Solution:**

Removed the single-line restriction:

```javascript
// NEW CODE (handles all partial nodes)
else if (insideRange) {
    // Node from partial - has position data from partial file, not parent
    indicesToRemove.push(i)
}
```

**Why This Is Safe:**

1. Nodes are processed sequentially in document order
2. `insideRange` is only `true` after encountering the BEGIN comment
3. `insideRange` is set to `false` after the END comment
4. Any node between BEGIN and END that doesn't match the normal range is from a partial

**Comprehensive Edge Case Tests Added:**

Added 5 integration tests covering all multi-line partial scenarios:

1. **Multi-line partial (2 lines)** - The actual bug case with line break in URL
2. **Multiple paragraphs** - Partial with 3 separate paragraph nodes
3. **Nested markdown** - Partial with lists, code blocks, and complex structures
4. **High line numbers** - Partial spanning 20+ lines to test upper bounds
5. **Preservation test** - Multi-line partial correctly kept in terraform-docs-common

All tests verify both removal in incorrect contexts and preservation in correct contexts.

#### Parent Nodes Containing BEGIN Comments Bug Fix

**Additional Issue Discovered:**

After implementing the recurse-first algorithm, a new edge case was discovered where parent nodes containing BEGIN comments as children were being incorrectly removed:

**Scenario:**
```markdown
-   First list item content
    <!-- BEGIN: TFC:only name:premium -->
-   Content to exclude (this list item)
    <!-- END: TFC:only name:premium -->
-   Third list item content (keep this)
```

**Problem:**
- First list item was removed entirely (BUG - it only contains the BEGIN comment as a child)
- Should keep the list item, only remove the BEGIN comment child

**Root Cause:**

The recurse-first algorithm correctly removes the BEGIN comment child during recursion. This sets `insideRange = true`. When control returns to the parent:
- `wasInsideRange = false` (wasn't in range before recursing)
- `insideRange = true` (became true during recursion because BEGIN was found)

The existing code didn't distinguish between "parent was already inside range" vs "range started inside children". The parent contains the BEGIN boundary but isn't excluded content.

**Solution (ast-utils.mjs:143-149):**

Added state transition detection after recursion:

```javascript
// If range STARTED inside this node's children (BEGIN found in children),
// the parent node CONTAINS the range start and should NOT be removed.
// Example: listItem containing [paragraph, BEGIN comment] - keep the listItem, only BEGIN removed
if (!wasInsideRange && insideRange) {
    if (debug) console.log(`${indent}  → KEEP ${node.type} (contains BEGIN comment)`)
    continue
}
```

**Logic:**
- Detect when `insideRange` transitions from `false` → `true` during recursion
- This means the BEGIN comment was found in children, not before the parent
- Parent CONTAINS the boundary and should be preserved
- Only the BEGIN comment child (already removed during recursion) needs to go

**Test Added:**

Unit test in `index.test.mjs`:
```javascript
test('should remove TFC:only content from terraform-enterprise but when wrapped in list item/special text')
// Tests BEGIN/END comments as children of list items - parent should be preserved
```

**Result:**
✅ Parent nodes containing BEGIN comments are now correctly preserved
✅ Only the BEGIN comment child is removed, maintaining parent structure
✅ Handles any parent node type (list items, blockquotes, etc.)

#### Additional Edge Cases: Indented Comments in List Items

**Two critical bugs were discovered in real content files:**

**Bug 1: END Comment Indented Inside List Item**

When an END comment is indented as a child of a list item, content after the exclusion block was being removed:

```markdown
### 2022-06-23

<!-- BEGIN: TFC:only name:health-assessments -->

-   Added the [Assessments](/terraform/enterprise/api-docs/assessment-results).

-   Updated [Workspace](/terraform/enterprise/api-docs/workspaces#create-a-workspace) and
    [Notification Configurations](/terraform/enterprise/api-docs/notification-configurations#notification-triggers) to account for assessments.
    <!-- END: TFC:only name:health-assessments -->

-   Added new query parameter(s) to [List Runs endpoint](/terraform/enterprise/api-docs/run#list-runs-in-a-workspace).  ← This was being removed!
```

**Root Cause:** When the range ended inside a parent node's children, the algorithm removed the parent regardless of whether it had remaining children.

**Fix (ast-utils.mjs:152-167):**

```javascript
// If range ENDED inside this node's children (END found in children),
// only remove parent if it's now empty (all children were removed).
if (wasInsideRange && !insideRange) {
    if (!node.children || node.children.length === 0) {
        indicesToRemove.push(i)  // Parent is empty, remove it
    } else {
        // Parent has remaining children, keep it
    }
    continue
}
```

**Bug 2: Indented Comments Parsed as Code Nodes**

When exclusion comments are heavily indented inside list items, remark sometimes parses them as `code` nodes instead of `jsx` nodes:

```markdown
-   Add documentation for configuring retention policies.
    <!-- BEGIN: TFC:only name:explorer -->

## 2024-2-8

-   Add [Explorer API documentation]
    <!-- END: TFC:only name:explorer -->  ← Parsed as code node, not jsx!
```

**Root Cause:** The algorithm only checked for `jsx` and `html` node types, so indented comments parsed as `code` nodes were ignored. This caused `insideRange` to never reset, removing all subsequent content.

**Fix (ast-utils.mjs:16-25):**

Created a helper function to recognize HTML comments regardless of how remark parses them:

```javascript
/**
 * Helper to check if a node is a comment node (jsx, html, or code containing HTML comment)
 * Remark sometimes parses indented HTML comments as code nodes instead of jsx nodes
 */
function isCommentNode(node) {
    if (node.type === 'jsx' || node.type === 'html') {
        return true
    }
    // Check if it's a code node containing an HTML comment
    if (node.type === 'code' && node.value) {
        return node.value.trim().startsWith('<!--') && node.value.trim().endsWith('-->')
    }
    return false
}
```

This helper is now used throughout `removeNodesInRange` instead of checking `node.type === 'jsx' || node.type === 'html'`.

**Result:**
✅ Content after exclusion blocks properly preserved when END is in list item
✅ Indented comments recognized as comment nodes regardless of parse type
✅ List parent nodes with remaining children after exclusion are preserved

#### Overlapping Directive Comments on Same Line

**Issue Discovered:**

When two directive comments from different blocks appeared on the same line, the algorithm would incorrectly start processing the second block after completing the first one.

**Real-world scenario:**
```markdown
-   [Organization tokens] — each organization can have one API token at a time.
    <!-- BEGIN: TFC:only -->
-   [Audit trails token] - each organization can have a single token.    <!-- END: TFC:only -->    <!-- BEGIN: TFEnterprise:only name:system-endpoints-auth -->

### System endpoints

Requests to the [`/api/v1/ping`] and [`/api/v1/usage/bundle`] endpoints must be authenticated...
<!-- END: TFEnterprise:only name:system-endpoints-auth -->
```

Line 24 contains both `<!-- END: TFC:only -->` and `<!-- BEGIN: TFEnterprise:only name:system-endpoints-auth -->`.

**Problem:**

When `removeNodesInRange(tree, 23, 24)` was called to remove the TFC:only block, it would:
1. ✓ Remove the TFC BEGIN comment (line 23)
2. ✓ Remove the TFC END comment (line 24) and set `insideRange = false`
3. ✗ Continue processing and encounter the TFEnterprise BEGIN comment (also on line 24)
4. ✗ Start a new range because the BEGIN was within the target range (24 <= 24)
5. ✗ Remove all content until the TFEnterprise END comment, including the partial content

**Root Cause:**

`removeNodesInRange()` is designed to remove ONE specific range. When it encounters a BEGIN comment on the same line as the END comment it just processed, it shouldn't start processing a new unrelated range.

**Fix (ast-utils.mjs:125, 231-236, 257):**

Track the line number where we find an END comment and skip BEGIN comments on that same line:

```javascript
let lastEndLine = null  // Track the line number where we last found an END comment

// When we find an END comment, remember its line
if (nodeIsComment && nodeStart >= startLine && nodeEnd === endLine) {
    indicesToRemove.push(i)
    insideRange = false
    lastEndLine = nodeEnd  // Remember the line where we found the END comment
}

// When checking if we should start a new range
if (!insideRange) {
    // Skip BEGIN comments on the same line as the END comment we just processed
    if (lastEndLine !== null && nodeEnd === lastEndLine) {
        // Skip this comment - it's from a different directive block
        continue
    }
    // Normal BEGIN comment processing...
}
```

**Test Added:**

Integration test in `build-mdx-transforms.test.mjs`:
```javascript
test('should keep TFEnterprise:only content wrapping partial in terraform-enterprise')
// Tests TFC:only and TFEnterprise:only on the same line
// Verifies that partial content is preserved in terraform-enterprise
```

**Result:**
✅ TFEnterprise:only partial content now correctly preserved
✅ TFC:only content correctly removed
✅ Multiple directive blocks can coexist on the same line without interfering

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
- BEGIN/END comments as children of parent nodes (list items, etc.)
- **Real-world edge cases:**
  - END comments indented inside list items (content after exclusion preserved)
  - BEGIN comments indented inside list items (all subsequent exclusion blocks work)
  - Comments parsed as code nodes by remark

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

**Multi-line Partial Edge Cases:**
- Multi-line partial content (2+ lines) wrapped in exclusion directives
- Partials with multiple paragraphs
- Partials with nested markdown structures (lists, code blocks)
- Partials with high line numbers (20+ lines)
- Multi-line partials preserved in correct product contexts

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
- **TFEnterprise:only content wrapping partials** (real-world test from v202507-1)
- **Overlapping directive comments on same line** (TFC:only END and TFEnterprise:only BEGIN on line 24)

**Multi-File Processing:**
- Processing multiple files with shared and versioned partials

All tests use mock filesystem data (`memfs`) and do not rely on real files in the repository.

**Test Summary:**
- ✅ **24 unit tests** covering core exclusion logic and edge cases
- ✅ **20 integration tests** covering full MDX pipeline with partials
- ✅ **44 total tests** all passing

**Key Test Coverage:**
- Partial content with mismatched position data (from included partials)
- Content preservation after exclusion blocks
- Nested and indented END comments in list items
- Comments parsed as code nodes by remark
- Parent nodes with remaining children after exclusion
- Multiple directive blocks on the same line