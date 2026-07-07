# Single source of truth

This guide explains how to share content from internal-only products with other products in this repository.

## Overview

Some products are marked as **internal-only** in `productConfig.mjs`. Internal-only products are not intended to be used on developer as a product, but their content can be imported into other products' documentation. This lets you maintain content in one place and reuse it across multiple products.

To set up the internal-only product flow, complete the following steps in order:

1. [Register the internal-only product in `productConfig.mjs`](#step-1-register-the-internal-only-product-in-productconfigmjs)
2. [Declare imports in `version-config.json`](#step-2-declare-imports-in-version-configjson)
3. [Add imported pages to the nav data file](#step-3-add-imported-pages-to-the-nav-data-file)
4. [(Optional) Include internal partials in MDX files](#step-4-optional-include-internal-partials-in-mdx-files)

---

## Step 1: Register the internal-only product in `productConfig.mjs`

Add an entry for the internal-only product in `productConfig.mjs` and set `internalProduct: true`. This flag does two things:

- Excludes the product from some public API routes (for example, the `all-docs-paths` route).
- Signals to the MDX transforms pipeline that its content is imported by other products.

```js
// productConfig.mjs
'my-internal-product': {
  assetDir: 'img',
  contentDir: 'content',
  dataDir: 'data',
  internalProduct: true,
  productSlug: 'my-internal-product',
  semverCoerce: semver.coerce,
  versionedDocs: true,
  websiteDir: 'website',
},
```

---

## Step 2: Declare imports in `version-config.json`

In the product that consumes the internal content, add an `imports` array to the `version-config.json` file in that version's `data/` directory. Each entry identifies which internal product and version to pull in.

**File location:** `content/<consuming-product-slug>/<version>/data/version-config.json`

```json
{
  "imports": [
    {
      "slug": "my-internal-product",
      "content-root": "my-internal-product",
      "version": "v1.0.x"
    }
  ]
}
```

| Field | Description |
|---|---|
| `slug` | The product key in `PRODUCT_CONFIG`. Used to look up the product's `contentDir`. |
| `content-root` | The folder name in `content/` where the internal product's files live. Usually the same as `slug`. |
| `version` | The version directory of the internal product to import (for example, `v1.0.x`). |

You can declare multiple imports in the same `version-config.json` file:

```json
{
  "imports": [
    {
      "slug": "my-internal-product",
      "content-root": "my-internal-product",
      "version": "v1.0.x"
    },
    {
      "slug": "another-internal-product",
      "content-root": "another-internal-product",
      "version": "v2.0.x"
    }
  ]
}
```

Once the imports are declared, the `copyInternalOnlyProductDocs` prebuild function automatically copies the internal product's content and assets into the consuming product's output directory before the build runs. Refer to [How the prebuild copies files](#how-the-prebuild-copies-files) for details.

---

## Step 3: Add imported pages to the nav data file

Add the imported pages to the consuming product's nav data file so they appear in the sidebar and resolve to a URL.

Use the `import` field on a route entry to reference a page from the internal product. The `import` value is the path to the file relative to the internal product's content directory, using `<content-root>` as the root. Omit the `.mdx` file extension. The `path` field sets the URL route the page is served at in the consuming product.

**File location:** `content/<consuming-product-slug>/<version>/data/<section>-nav-data.json`

```json
{
  "title": "My internal product content",
  "routes": [
    {
      "title": "Overview",
      "path": "my-section",
      "import": "my-internal-product"
    },
    {
      "title": "A subpage",
      "path": "my-section/subpage",
      "import": "my-internal-product/subpage"
    },
    {
      "title": "A nested subpage",
      "path": "my-section/nested/page",
      "import": "my-internal-product/nested/page"
    }
  ]
}
```

The `import` value maps to a file path under the copied content directory. For example, `"import": "my-internal-product/subpage"` resolves to the file copied to `public/content/<consuming-product>/<version>/<contentDir>/my-internal-product/subpage.mdx`.

To reference the index file at the root of the internal product's content directory, use only `<content-root>` with no subpath:

```json
{
  "title": "Overview",
  "path": "my-section",
  "import": "my-internal-product"
}
```

---

## Step 4: (Optional) Include internal partials in MDX files

You can include partials from the internal product in MDX files using an `@<slug>/` alias in `@include` directives. The alias resolves against the `imports` declared in the consuming product's `version-config.json`.

```mdx
{{/* Include a partial from the imported internal product */}}
@include "@my-internal-product/my-partial.mdx"
```

The `@<slug>` prefix maps to the matching `slug` field in the `imports` array. The partial resolves from the internal product's `content/partials/` directory for the declared version.

---

## How the prebuild copies files

The `copyInternalOnlyProductDocs` function runs automatically during the prebuild after MDX transforms are applied. It scans all `version-config.json` files in the source directory and, for each `imports` entry that has both a `content-root` and a `version`, copies files to the following locations:

| What is copied | Source | Destination |
|---|---|---|
| Content files | `public/content/<content-root>/<version>/<contentDir>/` | `public/content/<product-slug>/<version>/<contentDir>/<content-root>/` |
| Asset files | `public/assets/<content-root>/<version>/img/` | `public/assets/<product-slug>/<version>/img/<content-root>/` |

The function only copies files when the source path exists. If a source path is missing, that entry is silently skipped.

---

## Content exclusion directives in shared content

Shared internal-product content can use content exclusion directives (for example, `<!-- BEGIN: TFEnterprise:only -->` or `<!-- BEGIN: Vault:>=v1.21.x -->`). Because the same file is imported into multiple products, the directives are resolved against the **consuming** product rather than the internal product.

To make this work, the prebuild treats internal products specially:

1. **Internal source files keep their directives intact.** During the internal product's own MDX transform pass, content exclusion is skipped (the `internalProduct` flag in `productConfig.mjs` signals this). The directives are written to the internal product's output unchanged.
2. **Directives are resolved at copy time.** After `copyInternalOnlyProductDocs` copies the content into a consuming product, it reprocesses the copied `.mdx` files and evaluates each directive using the consuming product's slug and version.

This means a directive's product tag is matched against the product the content is copied into:

- A `:only` directive whose tag does **not** match the consuming product is removed, including its `BEGIN`/`END` comments.
- A version directive (for example, `Vault:>=v1.21.x`) is only version-compared when the consuming product matches the tag; in every other product the block is removed.

Author shared content with the tags of the products the file is shared into. For the full directive syntax and cross-product behavior, refer to the [content exclusion transform README](../../scripts/prebuild/mdx-transforms/exclude-content/README.md).

> **Note:** Version directives need the consuming product's version. Only use version directives in content shared into versioned products.

---

## Naming conventions

The following naming conventions are required for the internal-only product flow to work correctly:

- **`version-config.json`**: The config file must be named exactly `version-config.json`. The `copyInternalOnlyProductDocs` function searches for files with this name.
- **`slug`**: The `slug` field in each `imports` entry must exactly match the key for that product in `PRODUCT_CONFIG` in `productConfig.mjs`.
- **`content-root`**: The `content-root` field must match the folder name under `content/` where the internal product's files live. In most cases this is the same as `slug`.
