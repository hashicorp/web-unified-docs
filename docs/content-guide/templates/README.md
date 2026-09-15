# Templates

Copy a template from this directory and fill it in. Refer to
[content-types.md](../content-types.md) to choose the right one.

## Resolution order

1. **Check [products/](../products/) for your product.** If the product has a
   page, that page's mapping table names the template to use. It may point at a
   template in a product subdirectory here, at a template in this directory, or
   at no template at all.
1. **Otherwise use the template in this directory** named for the content type.

The mapping table in the product page — not the presence or absence of a file in
a product subdirectory — decides which template applies. A product subdirectory
that has no template for a given type does not mean "fall back to the global
one"; it means whatever the product page says it means, which may be that the
type does not exist for that product.

## Product subdirectories

| Directory | Product page | Planned overrides |
| --- | --- | --- |
| [boundary/](boundary/) | [products/boundary.md](../products/boundary.md) | `usage.mdx`, `cli-reference-command.mdx`, `domain-model.mdx` |
| [consul/](consul/) | [products/consul.md](../products/consul.md) | `cli-reference-command.mdx` |
| [nomad/](nomad/) | [products/nomad.md](../products/nomad.md) | `cli-reference-command.mdx`, `structured-configuration-reference.mdx`, `task-driver.mdx`, `autoscaler-plugin.mdx` |
| [terraform/](terraform/) | [products/terraform.md](../products/terraform.md) | `backend-reference.mdx`, `meta-argument.mdx` |
| [packer/](packer/) | [products/packer.md](../products/packer.md) | `structured-configuration-reference.mdx` |
| [terraform-docs-common/](terraform-docs-common/) | [products/terraform-docs-common.md](../products/terraform-docs-common.md) | API reference — maintained in `content/`, not here |
| [terraform-enterprise/](terraform-enterprise/) | [products/terraform-enterprise.md](../products/terraform-enterprise.md) | `release-notes.mdx` |
| [well-architected-framework/](well-architected-framework/) | [products/well-architected-framework.md](../products/well-architected-framework.md) | `guidance.mdx`, `pillar.mdx` |
| [vault/](vault/) | [products/vault.md](../products/vault.md) | `how-to.mdx`, `secrets-plugin.mdx`, `auth-method.mdx`, `cookbook.mdx`, `structured-configuration-reference.mdx`, and three CLI templates |

Each subdirectory carries a `README.md` listing its templates and linking to the
product page that explains what each one encodes and why.

These templates describe what each product's documentation actually looks like
today. They are a starting point for the team that owns the product, not a
finished standard — a team that wants its template to say something different
should change it.

## Placeholder convention

Templates use two placeholder styles, and the difference is not cosmetic:

- **`` `<lowercase_name>` `` inside backticks or a code fence** — the normal
  case. Backticks keep MDX from parsing the angle brackets as a JSX tag.
- **`UPPERCASE_NAME` with no brackets** — used in `@include` paths and in link
  destinations, where backticks are not available and a bare `<name>` would be
  parsed as JSX and break the page.

A link destination that stands in for a real page uses `UPPERCASE_NAME` for the
parts a writer replaces — `/vault/api-docs/secret/PLUGIN_NAME`, not
`/vault/api-docs/secret/name`. A lowercase placeholder path is indistinguishable
from a real link, so it survives into published pages. Where the whole
destination is a placeholder, `(link)` is clearer than a fabricated path.

Never write a bare `<name>` in prose, in an `@include` path, or in a link
destination. Replace every placeholder of either style before publishing.
