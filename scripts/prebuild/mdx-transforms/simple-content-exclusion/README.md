# Simple Content Exclusion Refactor

This folder contains a straightforward refactoring of the terraform and vault content exclusion transforms.

## Approach

This refactor simply extracts the shared functionality into utility functions while keeping the product-specific logic in separate files.

## Files

### Core Files
- **`shared-utils.mjs`** - Shared utility functions for block parsing and node removal
- **`terraform-transform.mjs`** - Terraform-specific transform using shared utilities
- **`vault-transform.mjs`** - Vault-specific transform using shared utilities
- **`index.mjs`** - Unified dispatcher that applies both transforms

### Tests
- **`index.test.mjs`** 

## Extracted Shared Functionality

### `parseExclusionBlocks(tree, errorClass)`
- Parses BEGIN/END comment blocks from the AST
- Handles all validation (mismatched blocks, unexpected blocks, etc.)
- ~80 lines of identical code extracted from both transforms

### `removeNodesInRange(tree, start, end)`  
- Removes AST nodes within specified line ranges
- Recursive node removal logic

### `ContentExclusionError`
- Base error class with consistent formatting
- Replaces `ExcludeTerraformContentError` and `ExcludeVaultContentError` which was duplicated

## Usage

```javascript
import { transformExcludeContent } from './simple-content-exclusion/index.mjs'

// Unified transform
.use(transformExcludeContent, { filePath, version })

// Or use individual transforms
import { 
  transformExcludeTerraformContent, 
  transformExcludeVaultContent 
} from './simple-content-exclusion/index.mjs'

.use(transformExcludeTerraformContent, { filePath })
.use(transformExcludeVaultContent, { filePath, version })
```

## Adding on extra functionality for more products

  - create the transform file to parse for the specific (consul-transform.mjs, etc)
  - add it to index.mjs
  - add it to DIRECTIVE_PRODUCTS in shared-utils.mjs

## Benefits

- Reduced Code Duplication
- Clear separation between shared and specific logic

## Performance

This approach should perform similarly to the original code
