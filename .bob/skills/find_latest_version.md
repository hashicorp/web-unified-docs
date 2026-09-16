# Find Latest Version

Quickly identify the latest version directory for a given product in the web-unified-docs repository.

## Usage

```
find_latest_version <product_name>
```

## Examples

- `find_latest_version consul`
- `find_latest_version terraform`
- `find_latest_version vault`

## Implementation

```javascript
const fs = require('fs');
const path = require('path');

function findLatestVersion(productName) {
  const contentDir = path.join(process.cwd(), 'content', productName);
  
  // Check if product directory exists
  if (!fs.existsSync(contentDir)) {
    return { error: `Product '${productName}' not found in content directory` };
  }
  
  // Get all version directories
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  const versionDirs = entries
    .filter(entry => entry.isDirectory() && /^v?\d+\.\d+\.x$/.test(entry.name))
    .map(entry => entry.name);
  
  if (versionDirs.length === 0) {
    return { error: `No versioned directories found for '${productName}'. This product may not use version directories.` };
  }
  
  // Sort versions (semantic versioning)
  const sortedVersions = versionDirs.sort((a, b) => {
    const parseVersion = (v) => {
      const match = v.match(/(\d+)\.(\d+)\.x/);
      return match ? [parseInt(match[1]), parseInt(match[2])] : [0, 0];
    };
    
    const [aMajor, aMinor] = parseVersion(a);
    const [bMajor, bMinor] = parseVersion(b);
    
    if (aMajor !== bMajor) return bMajor - aMajor;
    return bMinor - aMinor;
  });
  
  const latestVersion = sortedVersions[0];
  const fullPath = path.join(contentDir, latestVersion);
  
  return {
    product: productName,
    latestVersion: latestVersion,
    path: fullPath,
    allVersions: sortedVersions
  };
}

// Execute if called directly
if (require.main === module) {
  const productName = process.argv[2];
  if (!productName) {
    console.error('Usage: node find_latest_version.js <product_name>');
    process.exit(1);
  }
  
  const result = findLatestVersion(productName);
  console.log(JSON.stringify(result, null, 2));
}

module.exports = findLatestVersion;
```

## Bob Shell Integration

When a user asks about the latest version of a product:

1. Use `list_files` to check the content directory structure
2. Identify version directories matching the pattern `v{major}.{minor}.x`
3. Sort them semantically to find the latest
4. Return the path and version information

## Notes

- Version directories follow the pattern: `v{major}.{minor}.x` (e.g., `v1.15.x`)
- Some products like HCP don't use versioned directories
- The skill handles both `v` prefix and non-prefixed versions
