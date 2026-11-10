# Boundary content conventions

Boundary follows the global content types closely. Two differences are real: the
vocabulary of the closing block, and the shape of its CLI reference.

Owner: Boundary documentation team.

This page describes what Boundary's documentation looks like today so the
Boundary team can own it. Refer to [index.md](index.md#status-labels) for what
the status labels mean.

## Census summary

425 nav-reachable pages in `content/boundary/v1.0.x`, classified 2026-08-25:

| Content type | Pages | Share |
| --- | --- | --- |
| CLI reference | 204 | 48.0% |
| Concept | 78 | 18.4% |
| How-to | 55 | 12.9% |
| Overview | 40 | 9.4% |
| Structured configuration reference | 23 | 5.4% |
| Usage | 13 | 3.1% |
| Tabular reference | 5 | 1.2% |
| Core reference | 2 | 0.5% |
| Release notes | 2 | 0.5% |

Three further nav entries did not resolve to a file and are recorded as
unresolved in the census.

Nearly half of Boundary's documentation is CLI reference. Any change to the CLI
reference convention is the highest-leverage change available in this product.

Boundary's procedural pages skew **feature-shaped**: organized by the aspects of
the thing being configured rather than by steps. Of the pages carrying a
requirements block, roughly three in four are organized this way. Boundary uses
the global usage type as written, and has one stepped page in the entire product.

## Closing block: both **More information** and **Next steps**

**Status: In use.**

**What Boundary does.** The global usage guidance prescribes a single closing
block, **Next steps**. Boundary uses two, and many pages carry both.

**Evidence, 2026-08-25.**

| Heading | Pages |
| --- | --- |
| `## More information` | 75 |
| `## Next steps` | 66 |

```shell-session
$ grep -rl --include='*.mdx' '^## More information' content/boundary/v1.0.x/
$ grep -rl --include='*.mdx' '^## Next steps' content/boundary/v1.0.x/
```

**Both are valid in Boundary.** As used across the product, they divide roughly
as follows:

- **Next steps** points forward, to the task a reader does next in the same
  workflow.
- **More information** points sideways, to related reference and concept material
  that is not the next task.

A page may use one or both. When it uses both, **Next steps** comes last, so the
forward path is the final thing on the page.

**Why this is marked In use rather than Adopted.** The split above is inferred
from how the two headings are distributed across 141 pages, not from a decision
the Boundary team recorded. Some pages appear to use them interchangeably. Match
the surrounding pages, and do not introduce a third closing heading.

Moving this entry to **Adopted** requires the Boundary team to confirm the split,
or to replace it with the rule they actually intend.

**Template:** [usage.mdx](../templates/boundary/usage.mdx) carries both blocks.

## CLI reference

**Status: In use.**

**What Boundary does.** A Boundary CLI page opens with the command name, a
`` Command: `boundary <cmd>` `` line, and a one-sentence description. Examples
come **before** the usage block. Options are documented as an H3 inside the usage
block rather than as their own H2, and commands that take a type argument repeat
the example, usage, and options inside a tab per type. Pages close with the
shared `cmd-option-note.mdx` partial.

**Evidence, 2026-08-25.** 204 CLI pages.

| Element | Pages |
| --- | --- |
| `` Command: `boundary ...` `` line | 203 |
| `## Usage` | 203 |
| `### Command options` | 154 |
| `## Example` | 136 |
| `@include 'cmd-option-note.mdx'` | 171 |
| `## Examples` | 67 |

```shell-session
$ grep -rl --include='*.mdx' '^### Command options' content/boundary/v1.0.x/content/docs/commands/
```

**Boundary's shape is complete; it is nested differently.** The global template
puts Description, Command arguments, Flags, and Options at H2. Boundary puts the
description in the opening paragraph and the options at H3 under Usage. The
information is there — 154 of 204 pages document their options — it is organized
around the usage block rather than alongside it.

Boundary and Consul share this shape almost exactly, both inheriting it from the
same legacy `layout: commands` page type. It is the most-used CLI shape in the
repo by page count.

**One thing to fix rather than record.** `## Example` (136 pages) and
`## Examples` (67) are the same block under two names. The style guide and the
global template both use the plural, so the override template uses `## Examples`
and existing pages can converge as they are touched.

**Template:** [cli-reference-command.mdx](../templates/boundary/cli-reference-command.mdx).

## Domain model pages

**Status: Adopted.**

**What Boundary does.** Boundary documents each resource in its domain model on a
dedicated page under `docs/domain-model/`. Every page describes the resource and
its relationships in prose, then closes with the same three blocks: the
resource's configurable **Attributes**, the resources that reference it under
**Referenced by**, and links to its generated API service under **Service API
docs**.

Reference-style links carry the cross-references between resources, with the
definitions collected at the end of the Referenced by section, defined in both
singular and plural so prose reads naturally.

**Evidence, 2026-08-25.** 23 pages under `docs/domain-model/`.

| Element | Pages |
| --- | --- |
| Reference-style link definitions | 21 |
| `## Referenced by` | 19 |
| `## Attributes` | 18 |
| `## Service API docs` | 18 |
| "The following services are relevant to this resource:" | 18 |
| "has the following configurable attributes:" | 16 |
| `## Tutorial` | 6 |

```shell-session
$ grep -rl --include='*.mdx' '^## Referenced by' content/boundary/v1.0.x/
```

**The shape is exclusive to this folder.** All 19 uses of `## Referenced by`, all
18 of `## Service API docs`, and all 18 of `## Attributes` are domain model
pages. Nothing else in Boundary uses them.

**This is neither a concept page nor a configuration reference**, which is why
the census could not place it: of the 23 pages it classified 11 as structured
configuration reference, 11 as concept, and 1 as overview. The taxonomy has no
entity-reference type, and the classifier split the difference. The pages
themselves are entirely consistent — the disagreement was the classifier's, not
Boundary's.

**Template:** [domain-model.mdx](../templates/boundary/domain-model.mdx).

## API reference

**Status: Adopted — generated, not authored.**

**Boundary's API reference is not in this repository.** It is generated from
Boundary's protocol buffer definitions and published by a separate pipeline to
`developer.hashicorp.com/boundary/api-docs`. Boundary has no `api-docs` directory
under `content/boundary/`.

The generation runs `buf generate` with the `openapiv2` plugin, configured in
`buf.openapiv2.gen.yaml` in the Boundary repository, and emits
`internal/gen/controller.swagger.json`.

**Do not hand-author API reference pages for Boundary in this repository**, to
supplement or to correct the generated output. They would drift from the
specification immediately and nothing reconciles them. Fix the protocol buffer
definitions instead.

Refer to [api-reference.md](../content-types/api-reference.md#first-decide-whether-you-should-be-writing-one-at-all)
for the general rule.

## Types Boundary shares with the global guidance

Usage, overview, what is, concept, tabular reference, and core reference need no
override. Requirements vocabulary matches the global rule (`## Requirements` on
26 pages, `## Prerequisites` on 6).

**Overview is a known gap rather than a match.** Of Boundary's 71 `index.mdx`
pages, 1 uses the global overview template's `## Introduction` heading and none
use `## Workflows` or `## Guidance`. Do not read the absence of an override as
compliance.

**Structured configuration reference is unresolved.** 19 Boundary pages use a
`parameters` heading, concentrated in `configuration/kms` (7),
`configuration/events` and `monitor/events` (6), and listeners (4). None use the
global Configuration model / Complete configuration / Specification triad. The
shape is not consistent enough across those 19 pages to template from, so no
override is provided.

The 18 pages using `## Attributes` are domain model pages and are covered by
[domain-model.mdx](../templates/boundary/domain-model.mdx) instead.

**This is the one open question on this page that needs the Boundary team rather
than a decision here:** whether the configuration pages should converge on the
global template, on Boundary's own shape, or stay as they are.
