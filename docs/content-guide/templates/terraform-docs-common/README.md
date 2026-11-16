# HCP Terraform templates

Refer to
[products/terraform-docs-common.md](../../products/terraform-docs-common.md) for
what these conventions are and the evidence behind them.

| Template | Location | Status |
| --- | --- | --- |
| API reference | `content/terraform-docs-common/docs/cloud-docs/api-docs/_template.mdx` | Adopted |

**The API reference template is not in this directory, and should not be copied
here.** The HCP Terraform team maintains it inside the content directory, ships
it in the navigation, and Terraform Enterprise carries a copy in every version
folder. Duplicating it into the content guide would create two sources of truth
for the same convention — the thing
[single-source-of-truth.md](../../single-source-of-truth.md) exists to prevent.

This directory holds no other templates. HCP Terraform uses the global templates
for usage, overview, what is, concept, tabular reference, and core reference, and
has too few configuration reference pages and no CLI reference pages to establish
a convention for either.

**Read [terraform-enterprise/](../terraform-enterprise/) alongside this.** The two
products' documentation is maintained in parallel: 101 nav paths exist in both,
80 of them near-identical.
