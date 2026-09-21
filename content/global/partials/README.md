# Top-Level Partials

This directory contains product- and version-agnostic partials for documentation. Any partial placed here can be included in any docs page across all products and versions.

## Usage

To include a partial from this directory, use:

```mdx
@include "@global/<partial-name>.mdx"
```

The loader will first check this directory for the partial. If not found, it will fall back to product/version-specific partials.

## Best Practices
- Use this directory for content shared across multiple products or versions (e.g., pricing tables, standard callouts).
- Keep partials organized and well-documented.
- Avoid duplicating partials across product/version directories if they can be shared here.

## Example

Place a file like `pricing-table.mdx` in this directory, then reference it in any docs page:

```mdx
@include "@global/pricing-table.mdx"
```

This ensures updates to the partial are reflected everywhere it is used.

## Combining global and local partials

You can even use global partials together with product-specific partials in the same document:

```mdx
@include "@global/pricing-table.mdx"
@include "product-specific-partial.mdx"
```
