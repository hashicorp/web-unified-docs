# Find Navigation Data

Locate the navigation JSON file for a product and version in the web-unified-docs repository. This skill checks both product-specific navigation data and common navigation files that may be shared across products.

## Usage

```
find_nav_data <product_name> [version]
```

## Examples

- `find_nav_data vault v1.15.x`
- `find_nav_data consul v1.18.x`
- `find_nav_data hcp-docs` (non-versioned product)
- `find_nav_data terraform` (finds latest version's nav data)

## Implementation

```javascript
const fs = require('fs');
const path = require('path');

function findNavData(productName, version = null) {
  const contentDir = path.join(process.cwd(), 'content', productName);
  
  // Check if product directory exists
  if (!fs.existsSync(contentDir)) {
    return { error: `Product '${productName}' not found in content directory` };
  }
  
  let targetDir = contentDir;
  
  // If version is specified, use that directory
  if (version) {
    targetDir = path.join(contentDir, version);
    if (!fs.existsSync(targetDir)) {
      return { error: `Version '${version}' not found for product '${productName}'` };
    }
  } else {
    // Check if product uses versioned directories
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
      
      targetDir = path.join(contentDir, sortedVersions[0]);
      version = sortedVersions[0];
    }
  }
  
  // Look for product-specific data directory and nav files
  const dataDir = path.join(targetDir, 'data');
  const productNavFiles = [];
  
  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir)
      .filter(file => file.endsWith('-nav-data.json'))
      .map(file => ({
        name: file,
        path: path.join(dataDir, file),
        section: file.replace('-nav-data.json', ''),
        type: 'product-specific'
      }));
    productNavFiles.push(...files);
  }
  
  // Check for common navigation files (e.g., terraform-docs-common)
  const commonNavFiles = [];
  const commonDir = path.join(process.cwd(), 'content', 'terraform-docs-common');
  
  if (fs.existsSync(commonDir)) {
    const commonDataDir = path.join(commonDir, 'data');
    if (fs.existsSync(commonDataDir)) {
      const files = fs.readdirSync(commonDataDir)
        .filter(file => file.endsWith('-nav-data.json'))
        .map(file => ({
          name: file,
          path: path.join(commonDataDir, file),
          section: file.replace('-nav-data.json', ''),
          type: 'common'
        }));
      commonNavFiles.push(...files);
    }
  }
  
  const allNavFiles = [...productNavFiles, ...commonNavFiles];
  
  if (allNavFiles.length === 0) {
    return {
      error: `No navigation data files found`,
      checkedLocations: [
        dataDir,
        path.join(commonDir, 'data')
      ],
      suggestion: 'Navigation files should follow the pattern: *-nav-data.json'
    };
  }
  
  return {
    product: productName,
    version: version || 'unversioned',
    productDataDirectory: dataDir,
    productNavFiles: productNavFiles,
    commonNavFiles: commonNavFiles,
    allNavFiles: allNavFiles,
    primaryNavFile: allNavFiles.find(f => f.name === 'docs-nav-data.json') || allNavFiles[0]
  };
}

// Execute if called directly
if (require.main === module) {
  const productName = process.argv[2];
  const version = process.argv[3];
  
  if (!productName) {
    console.error('Usage: node find_nav_data.js <product_name> [version]');
    process.exit(1);
  }
  
  const result = findNavData(productName, version);
  console.log(JSON.stringify(result, null, 2));
}

module.exports = findNavData;
```

## Bob Shell Integration

When a user asks about navigation data:

1. Use `list_files` to check the product's directory structure
2. Navigate to the appropriate version directory (or use latest if not specified)
3. Look for the `data` subdirectory in the product directory
4. **Also check `content/terraform-docs-common/data` for shared navigation files**
5. List all `*-nav-data.json` files from both locations
6. Return the paths and available navigation sections, clearly indicating which are product-specific and which are common

## Common Navigation Files

### Product-Specific
- `docs-nav-data.json` - Main documentation navigation
- `api-docs-nav-data.json` - API reference navigation
- `tutorials-nav-data.json` - Tutorial navigation
- `commands-nav-data.json` - CLI command reference navigation

### Shared/Common
- Located in `content/terraform-docs-common/data/`
- May include shared navigation structures used across multiple Terraform-related products

## Notes

- Navigation files must be in a `data` subdirectory within the version directory
- Files follow the pattern: `{section}-nav-data.json`
- The navigation structure must match the actual file structure in the content directory
- Pages not included in navigation files will not be rendered on the website
- **Always check both product-specific and common navigation locations**
- Common navigation files are typically in `terraform-docs-common` for Terraform-related products
