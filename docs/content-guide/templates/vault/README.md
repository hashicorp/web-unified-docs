# Vault templates

Refer to [products/vault.md](../../products/vault.md) for what these templates
encode and the evidence behind them.

| Template | Replaces | Status |
| --- | --- | --- |
| [how-to.mdx](how-to.mdx) | `templates/usage.mdx` | Adopted |
| [secrets-plugin.mdx](secrets-plugin.mdx) | Nothing — Vault-only shape | In use |
| [auth-method.mdx](auth-method.mdx) | Nothing — Vault-only shape | In use |
| [cookbook.mdx](cookbook.mdx) | Nothing — Vault-only type | Adopted |
| [cli-reference-command.mdx](cli-reference-command.mdx) | `templates/cli-reference-command.mdx` | Adopted (target shape, 8 of 112 pages) |
| [cli-reference-command-group.mdx](cli-reference-command-group.mdx) | `templates/cli-reference-command-group.mdx` | Adopted (target shape) |
| [cli-reference-command-legacy.mdx](cli-reference-command-legacy.mdx) | — | Legacy (104 of 112 pages) |
| [structured-configuration-reference.mdx](structured-configuration-reference.mdx) | `templates/structured-configuration-reference.mdx` | In use |

Use `cli-reference-command-legacy.mdx` only when editing an existing page that
already has that shape and converting it is out of scope. Do not create new pages
from it.

Vault does **not** override `cli-reference-global-flags.mdx`. Vault has no global
flags page; standard flags come from a partial. The absence is deliberate.

**Feature documentation is concept content**, and uses the global
[concept.mdx](../concept.mdx). The global taxonomy treats features as concepts,
and Vault's pages already match that structure. Use `how-to.mdx` only for a
procedure the reader follows from start to finish.

Vault uses the global templates for what is, concept, and tabular reference.

Vault's index pages do not follow the global `overview.mdx` structure — none of
its 120 index pages use the template's headings. That is recorded on the product
page as a known gap rather than templated.
