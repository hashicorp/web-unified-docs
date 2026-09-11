# Terraform Enterprise templates

Refer to [products/terraform-enterprise.md](../../products/terraform-enterprise.md)
for what this template encodes and the evidence behind it.

| Template | Replaces | Status |
| --- | --- | --- |
| [release-notes.mdx](release-notes.mdx) | Nothing — release notes are untemplated globally | In use |

**This is a deliberate exception.** [content-types.md](../../content-types.md)
states that release notes are not templated because products structure them
differently. That reasoning holds across products and fails inside this one:
Terraform Enterprise ships a release page on a fixed cadence with the same eight
headings, 83 pages deep. The global rule is unchanged; this records the
exception.

The template preserves title-case headings, matching the existing pages. It is
the one place in this guide where title case is deliberate.

Terraform Enterprise uses the global templates for usage, overview, what is,
concept, tabular reference, and core reference. It has one CLI page and three
configuration reference pages — too few to establish a convention, so
pattern-match a sibling.
