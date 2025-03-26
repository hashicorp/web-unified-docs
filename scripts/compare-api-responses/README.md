# Tool to compare API responses

> Note: As of March 2025, this script is set up for comparing version-metadata between endpoints

This script is a utility for comparing API responses between two endpoints, typically the UDR API and Content API. It supports multiple API types and provides options for filtering, saving output, and customizing the comparison.

## Options:

-n, --new-api-url <url>: The base URL of the new API to compare.
-o, --old-api-url <url>: The base URL of the old API to compare against.
-v, --version <version>: The version of the product to compare.
-p, --product <product>: The product name to compare.
-a, --api <api>: The API type to compare. Options: content, nav-data, version-metadata, content-versions. Default: version-metadata.
-r, --drop-keys <keys>: Comma-separated list of keys to exclude from the comparison.
-s, --save-output: Save the comparison output to a file. Disabled by default.

### Example

To compare version metadata between APIs for a specific product:

```bash
npm run compare-api-responses -- -n localhost:8080 -o https://content.hashicorp.com -p terraform-docs-agents
```

### Example output:

```diff
@@ -2,11 +2,4 @@
    {
-     "created_at": "2025-03-18T19:47:18.641Z",
-     "display": "v1.21.0",
      "isLatest": true,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.21.0",
      "releaseStage": "stable",
-     "sha": "54ed38c9bafb5c437c294a6b7238e08915188332",
-     "sk": "version-metadata/v1.21.x",
      "version": "v1.21.x"
@@ -14,11 +7,4 @@
    {
-     "created_at": "2025-03-18T19:47:18.605Z",
-     "display": "v1.20.x",
      "isLatest": false,
-     "pk": "terraform-docs-agents#version-metadata",
-     "product": "terraform-docs-agents",
-     "ref": "v1.20.2",
      "releaseStage": "stable",
-     "sha": "3265ff727b24d97f94e2e272ab6ea77dad2418ea",
-     "sk": "version-metadata/v1.20.x",
      "version": "v1.20.x"
      ...
```
