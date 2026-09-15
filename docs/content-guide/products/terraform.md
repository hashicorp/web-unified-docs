# Terraform content conventions

Terraform's configuration reference and CLI reference pages are the closest in
the repo to the global templates, and the global templates seem to be derived 
from this shape. Two of its reference sets do not fit them, and are recorded 
below.

Terraform's significant finding is not an override. It is that **36% of its
documentation is a content type the global taxonomy does not have.**

Owner: Terraform documentation team.

This page describes what Terraform's documentation looks like today so the
Terraform team can own it. Refer to [index.md](index.md#status-labels) for what
the status labels mean.

## Census summary

348 nav-reachable pages in `content/terraform/v1.15.x`, classified 2026-08-25:

| Content type | Pages | Share |
| --- | --- | --- |
| Function reference | 126 | 36.2% |
| CLI reference | 67 | 19.3% |
| Concept | 53 | 15.2% |
| Structured configuration reference | 34 | 9.8% |
| Overview | 31 | 8.9% |
| How-to | 28 | 8.0% |
| Usage | 7 | 2.0% |
| Core reference | 1 | 0.3% |
| Tabular reference | 1 | 0.3% |

The census walked `cli`, `language`, `internals`, and `intro` nav files.
Terraform has no `docs-nav-data.json`.

## Function reference

**Status: Adopted — global type.**

126 of Terraform's 348 nav-reachable pages document a single language function.
The census found the same type in Nomad (84 pages) and Packer (105), **315
across the three products**, all using the same shape, with nothing in the
taxonomy covering it.

It is now a global content type rather than a product override:
[function-reference.md](../content-types/function-reference.md), with
[templates/function-reference.mdx](../templates/function-reference.mdx).

Terraform is the product the global template most closely follows. 107 of its
127 function pages carry `## Examples` and 76 carry `## Related Functions`. Ten
pages use a newer variant with explicit `## Introduction`, `## Syntax`, and
`## Example use case` headings; the global template does not adopt it, because
296 pages across three products use the simpler shape.

## Backend reference pages

**Status: In use.**

**What Terraform does.** Each state backend has a page under `language/backend/`
using Example Configuration, then optional subject sections such as
Authentication or State Locking, then Data Source Configuration showing the
`terraform_remote_state` shape, then Configuration Variables.

**Evidence, 2026-08-25.** 13 backend pages. `## Configuration Variables` appears
on 9 pages in the whole product, all of them here.

```shell-session
$ grep -rl --include='*.mdx' '^## Configuration Variables' content/terraform/v1.15.x/
```

This is not the global configuration reference shape, which Terraform otherwise
follows exactly. The Data Source Configuration block in particular has no
equivalent in it.

**Template:** [backend-reference.mdx](../templates/terraform/backend-reference.mdx).

## Meta-argument pages

**Status: In use.**

**What Terraform does.** Each meta-argument has a page under
`language/meta-arguments/` using Usage, Supported constructs, and Example use
cases.

**Evidence, 2026-08-25.** 7 pages, a complete set — one per meta-argument.
`## Supported constructs` appears on 5 pages in the whole product, all of them
here.

Note `for_each.mdx` carries the typo `## Supported constucts` and uses
`## Examples` where its siblings use `## Example use cases`. Both are worth
correcting when the page is next touched.

**Template:** [meta-argument.mdx](../templates/terraform/meta-argument.mdx).

## Types Terraform shares with the global guidance

**Structured configuration reference matches the global template.**
`## Configuration model` (29 pages), `## Complete configuration` (29), and
`## Specification` (31), alongside `## Background` (30). No override.

**CLI reference is the closest of any product to the global template.** Of 97
CLI files, 30 carry `## Description`, 29 `## Global flags`, 28 `## Related`, and
25 `## Options` — the global template's own sections. 70 carry `## Usage`.

Terraform therefore does not need a CLI override. What it has instead is a
partially completed migration: roughly 30 of 97 pages on the target shape. That
is a content backlog, not a convention difference, and it does not belong in this
directory.

`## Introduction` appears on 16 CLI pages, which the global CLI template does not
include. Below the bar for an override.

What is, concept, usage, tabular reference, and core reference need no override.

**Overview is a partial match.** `## Introduction` appears on 43 pages and
`## Workflows` on 14 — the second-strongest adoption in the repo after Consul —
but `## Guidance` appears on 1. Terraform's configuration reference pages also
use the global template's H2 headings without its nested `#### Values` blocks,
which Consul does use on 27 pages. Requirements vocabulary matches the global rule.

Terraform is the least partial-dependent product in the repo: 5 `@include`
directives across 348 pages, against 1,687 in Vault. Guidance that assumes
partials will not transfer here.
