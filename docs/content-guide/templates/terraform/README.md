# Terraform templates

Refer to [products/terraform.md](../../products/terraform.md) for what these
templates encode and the evidence behind them.

| Template | Replaces | Status |
| --- | --- | --- |
| [backend-reference.mdx](backend-reference.mdx) | `templates/structured-configuration-reference.mdx` | In use |
| [meta-argument.mdx](meta-argument.mdx) | Nothing — Terraform-only page type | In use |

Terraform follows the global templates more closely than any other product, and
these two sets are the exceptions. Its `language/block/` pages use the global
`structured-configuration-reference.mdx` shape exactly — Configuration model,
Complete configuration, Specification — and need no override. Its CLI pages are
the closest in the repo to the global CLI template.

Both templates here use **title case headings**, matching the existing pages.
That conflicts with the style guide and is worth revisiting when either set is
next touched in bulk; reproducing it is the lesser evil against 13 pages that
would otherwise stop matching each other.

Terraform uses the global templates for usage, overview, what is, concept, CLI
reference, structured configuration reference, tabular reference, core reference,
and function reference. It has no API reference in this repository.
