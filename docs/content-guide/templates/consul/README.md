# Consul templates

Refer to [products/consul.md](../../products/consul.md) for what this template
encodes and the evidence behind it.

| Template | Replaces | Status |
| --- | --- | --- |
| [cli-reference-command.mdx](cli-reference-command.mdx) | `templates/cli-reference-command.mdx` | In use |

The template places examples before the usage block and documents options at H4
inside it, split into command, API, and enterprise categories, matching the 129
existing Consul CLI pages under `content/commands`.

Consul uses the global `structured-configuration-reference.mdx` as written — its
pages match it exactly. Do not add an override for it.

Consul also uses the global templates for usage, overview, what is, concept,
tabular reference, and core reference.
