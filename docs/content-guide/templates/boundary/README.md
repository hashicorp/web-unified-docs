# Boundary templates

Refer to [products/boundary.md](../../products/boundary.md) for what these
templates encode and the evidence behind them.

| Template | Replaces | Status |
| --- | --- | --- |
| [usage.mdx](usage.mdx) | `templates/usage.mdx` | In use |
| [cli-reference-command.mdx](cli-reference-command.mdx) | `templates/cli-reference-command.mdx` | In use |
| [domain-model.mdx](domain-model.mdx) | Nothing — Boundary-only page type | Adopted |

`usage.mdx` carries both **More information** and **Next steps**, because
Boundary uses both. Keep whichever fits; when a page uses both, Next steps comes
last.

`cli-reference-command.mdx` places examples before the usage block and documents
options at H3 inside it, matching the 204 existing Boundary CLI pages.

`domain-model.mdx` is an entity reference page — it documents a resource in
Boundary's domain model, its attributes, and what references it. It is neither a
concept page nor a configuration reference, and the global taxonomy has no type
for it. Use it only for pages under `docs/domain-model/`.

Boundary's API reference is generated from protocol buffers outside this
repository, so there is no API template here. Refer to
[products/boundary.md](../../products/boundary.md#api-reference).

Boundary uses the global templates for overview, what is, concept, tabular
reference, structured configuration reference, and core reference.
