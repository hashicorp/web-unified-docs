# Packer templates

Refer to [products/packer.md](../../products/packer.md) for what this template
encodes and the evidence behind it.

| Template | Replaces | Status |
| --- | --- | --- |
| [structured-configuration-reference.mdx](structured-configuration-reference.mdx) | `templates/structured-configuration-reference.mdx` | In use |

The template groups parameters into required and optional, matching Packer's
plugin pages, where the global template groups them by position in the schema.

**The template is written in sentence case.** Packer's existing pages use title
case — `## Configuration Reference`, `## Basic Example` — which the style guide
does not permit. That is a style issue with a known fix rather than a convention
to carry forward, so the template does not reproduce it.

Packer uses the global templates for usage, overview, what is, concept, CLI
reference, tabular reference, and function reference.
