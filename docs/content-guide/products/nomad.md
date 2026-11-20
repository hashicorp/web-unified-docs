# Nomad content conventions

Nomad needs two overrides: its CLI reference is the most complete of any product
and uses its own section names, and its configuration reference uses a different
structure from the global template.

Owner: Nomad documentation team.

This page describes what Nomad's documentation looks like today so the Nomad 
team can own it. Refer to [index.md](index.md#status-labels) for what the status
labels mean.

## Census summary

688 nav-reachable pages in `content/nomad/v2.0.x`, classified 2026-08-25:

| Content type | Pages | Share |
| --- | --- | --- |
| CLI reference | 234 | 34.0% |
| Structured configuration reference | 122 | 17.7% |
| Function reference | 84 | 12.2% |
| Concept | 67 | 9.7% |
| How-to | 59 | 8.6% |
| API reference | 49 | 7.1% |
| Overview | 39 | 5.7% |
| Usage | 17 | 2.5% |
| Release notes | 10 | 1.5% |

Two thirds of Nomad's documentation is reference material. Nomad has the
smallest procedural footprint of the six products relative to its size.

## CLI reference

**Status: In use.**

**What Nomad does.** Nomad's CLI pages are the most structurally complete in the
repo — nearly every page documents its options — but the section names differ
from the global template.

**Evidence, 2026-08-25.** 234 CLI pages. Heading counts:

| Heading | Pages | Global template equivalent |
| --- | --- | --- |
| `## Usage` | 230 | `## Usage` |
| `## Examples` | 174 | `## Examples` |
| `## General options` | 156 | `## Global flags` |
| `## Options` | 155 | `## Options` |

```shell-session
$ grep -rl --include='*.mdx' '^## General options' content/nomad/v2.0.x/
```

The gap is narrow and mostly lexical: **General options** where the global
template says **Global flags**, and no Description, Command arguments, or Related
sections. Unlike Boundary and Consul, Nomad is not missing the content — it is
using different names for it.

**Decision needed.** Because the gap is lexical rather than structural, adopting
the global names is a rename across 156 pages rather than a rewrite. That may be
cheaper than maintaining an override. Decide which before the template is
written.

`## General Options` also appears on 2 pages against `## General options` on 156.
That is a style-guide sentence-case fix, not a convention.

**Template:** [cli-reference-command.mdx](../templates/nomad/cli-reference-command.mdx).

## Structured configuration reference

**Status: In use.**

**What Nomad does.** Nomad's job specification and agent configuration pages use
`## Parameters` followed by `## Examples`. The global template uses
`## Configuration model`, `## Complete configuration`, and `## Specification`.

**Evidence, 2026-08-25.** `## Parameters` appears on 53 pages. The global triad
appears on none.

```shell-session
$ grep -rl --include='*.mdx' '^## Parameters' content/nomad/v2.0.x/
```

Nomad shares this divergence with Packer and, in a different form, with Vault.
Consul and Terraform follow the global template. The configuration reference type
is therefore split three-to-two across the products, which is close enough to
even that the global template's claim to be the default is worth re-examining.

**Template:** [structured-configuration-reference.mdx](../templates/nomad/structured-configuration-reference.mdx).

## Task driver pages

**Status: In use.**

**What Nomad does.** Each task driver has a page under `docs/deploy/task-driver/`
using a fixed heading set: Capabilities, Client Requirements, Plugin Options,
Client Attributes, Resource Isolation, then Next steps. Capabilities is presented
as a feature table so a reader comparing drivers can scan across pages.

**Evidence, 2026-08-25.** 5 driver pages plus an index. `## Resource Isolation`
appears on 5 pages in the whole product, all of them here; `## Client
Requirements` on 6, of which 5 are here.

```shell-session
$ grep -rl --include='*.mdx' '^## Resource Isolation' content/nomad/v2.0.x/
```

Six pages is a small set, but it is a **complete** one — every task driver Nomad
ships has a page, and a new driver would need to match. That is the same argument
that justifies the Well-Architected Framework's four pillar pages.

**Template:** [task-driver.mdx](../templates/nomad/task-driver.mdx).

## Autoscaler plugin pages

**Status: In use.**

**What Nomad does.** Each Nomad Autoscaler plugin has a page under
`tools/autoscaling/plugins/` with exactly two headings: Agent Configuration
Options and Policy Configuration Options. Category index pages use "Common Policy
Configuration Options" for options shared across the category.

**Evidence, 2026-08-25.** 21 plugin pages. `## Policy Configuration Options`
appears on 15 pages in the whole product, **all 15 of them here**.

```shell-session
$ grep -rl --include='*.mdx' '^## Policy Configuration Options' content/nomad/v2.0.x/
```

**Template:** [autoscaler-plugin.mdx](../templates/nomad/autoscaler-plugin.mdx).

Both of these are plugin reference pages, and neither matches Nomad's
`## Parameters` configuration reference shape. They are separate page types
rather than variants of it.

## Function reference

84 pages document a single HCL function under `docs/reference/hcl2/functions/`.
This was a gap in the global taxonomy, shared with Terraform (126 pages) and
Packer (105 pages). It is now a global content type: refer to
[function-reference.md](../content-types/function-reference.md) and use
[templates/function-reference.mdx](../templates/function-reference.mdx).

No Nomad override is needed. Nomad's existing pages use the title-case heading
`## Related Functions`; new pages use sentence case per the style guide.

## API reference

**Status: In use.**

**What Nomad does.** Nomad's API reference is authored by hand and follows the
global [API reference](../content-types/api-reference.md) structure closely. It
is the most straightforward of the five authored sets — parameters, then samples,
with no product-specific blocks.

**Evidence, 2026-08-25.** 49 API pages; 38 carry both a sample request and a
sample response.

| Heading | Occurrences |
| --- | --- |
| `### Sample Request` | 198 |
| `### Parameters` | 186 |
| `### Sample Response` | 159 |
| `### Sample Payload` | 47 |

Headings are title case, with a handful of sentence-case strays — 5 pages use
`### Sample response` and 4 use `### Sample request`. Match the majority.

Use the global [api-reference.mdx](../templates/api-reference.mdx) template.

## Types Nomad shares with the global guidance

What is, concept, usage, tabular reference, and core reference need no override.

**Overview is a known gap rather than a match.** Of Nomad's 99 `index.mdx` pages,
15 use the global overview template's `## Introduction` heading and 2 use
`## Workflows`. Do not read the absence of an override as compliance.

Nomad prefers `## Prerequisites` (22 pages) to `## Requirements` (6). Both are
permitted by [usage.md](../content-types/usage.md), which distinguishes
requirements from prerequisites, so this is a permitted choice rather than a
divergence.
