# Nomad templates

Refer to [products/nomad.md](../../products/nomad.md) for what these templates
encode and the evidence behind them.

| Template | Replaces | Status |
| --- | --- | --- |
| [cli-reference-command.mdx](cli-reference-command.mdx) | `templates/cli-reference-command.mdx` | In use |
| [structured-configuration-reference.mdx](structured-configuration-reference.mdx) | `templates/structured-configuration-reference.mdx` | In use |
| [task-driver.mdx](task-driver.mdx) | Nothing — Nomad-only page type | In use |
| [autoscaler-plugin.mdx](autoscaler-plugin.mdx) | Nothing — Nomad-only page type | In use |

The CLI template uses **General options** where the global template says
**Global flags**, and puts the command description inside the usage block. This
is the one divergence in the census that is a rename rather than a structural
difference: converging on the global heading would be a change to 156 pages, not
a rewrite. If Nomad would rather converge, delete this template.

`task-driver.mdx` and `autoscaler-plugin.mdx` are plugin reference pages. Neither
uses Nomad's `## Parameters` configuration reference shape — they are separate
page types rather than variants of it.

Nomad uses the global templates for usage, overview, what is, concept, tabular
reference, core reference, and function reference.
