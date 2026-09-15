# Packer content conventions

Packer needs one override, for its configuration reference. Its more pressing
issue is not a content type divergence at all: Packer's headings are largely in
title case, against the sentence case the style guide requires.

Owner: Packer documentation team.

This page describes what Packer's documentation looks like today so the Packer
team can own it. Refer to [index.md](index.md#status-labels) for what the status
labels mean.

## Census summary

222 nav-reachable pages in `content/packer/v1.16.x`, classified 2026-08-25:

| Content type | Pages | Share |
| --- | --- | --- |
| Function reference | 105 | 47.3% |
| Concept | 40 | 18.0% |
| Structured configuration reference | 24 | 10.8% |
| Overview | 19 | 8.6% |
| CLI reference | 15 | 6.8% |
| Usage | 7 | 3.2% |
| How-to | 6 | 2.7% |
| Release notes | 6 | 2.7% |

Nearly half of Packer's documentation is function reference. Packer has the
smallest procedural footprint of the six products: 13 how-to and usage pages
combined.

## Structured configuration reference

**Status: In use.**

**What Packer does.** Packer's plugin pages — builders, provisioners,
post-processors, and data sources — use `## Basic Example` followed by
`## Configuration Reference` with `### Required` and `### Optional` subsections.
The global template uses `## Configuration model`, `## Complete configuration`,
and `## Specification`.

**Evidence, 2026-08-25.**

| Heading | Pages |
| --- | --- |
| `## Configuration Reference` | 16 |
| `## Basic Example` | 14 |

```shell-session
$ grep -rl --include='*.mdx' '^## Configuration Reference' content/packer/v1.16.x/
```

The required-and-optional split is a genuine structural difference, not a
renaming: it groups parameters by whether they are mandatory, where the global
template groups them by position in the schema. For plugin documentation that is
arguably the more useful organization.

**Template:** [structured-configuration-reference.mdx](../templates/packer/structured-configuration-reference.mdx).
It is written in sentence case; see below.

## Function reference

105 pages document a single HCL function under
`docs/templates/hcl_templates/functions/`. This was a gap in the global taxonomy,
shared with Terraform (126 pages) and Nomad (84 pages). It is now a global
content type: refer to
[function-reference.md](../content-types/function-reference.md) and use
[templates/function-reference.mdx](../templates/function-reference.mdx).

No Packer override is needed.

## Not an override: title case headings

Packer's headings are predominantly title case — `## Configuration Reference`,
`## Basic Example`, `## Related Functions`, `## Before You Begin`,
`## Machine-Readable Output`. The style guide requires sentence case.

This is not a content type difference and does not belong in this directory. It
is recorded here only so that a writer comparing Packer pages against the global
templates understands the mismatch is a style issue with a known fix, and does
not carry title case into new pages.

`## Before You Begin` appears on 4 pages, against `## Requirements` on 2. At that
volume neither is a convention.

## Usage and overview are known gaps, not matches

**Status: In use — no competing convention.**

Packer does not follow the global usage or overview templates, and it has not
replaced them with anything consistent. This is recorded so the absence of an
override is not read as compliance.

**Evidence, 2026-08-25.**

| Global template signal | Packer pages |
| --- | --- |
| `## Next steps` (usage) | **0** |
| `## Requirements` (usage) | 2 |
| `## Introduction` (overview) | 15 |
| `## Workflows` (overview) | 2 |
| `## Guidance` (overview) | 1 |

```shell-session
$ grep -rl --include='*.mdx' '^## Next steps' content/packer/v1.16.x/
```

**`## Next steps` does not appear anywhere in Packer's documentation.** Packer
closes with `## Related` on 7 pages instead. Most index pages carry no H2
headings at all — `builders/index.mdx`, `datasources/index.mdx`,
`plugins/index.mdx`, and `guides/index.mdx` are bare link lists.
`plugins/index.mdx` is the one page in the product that follows the global
overview structure.

**No override template is provided, deliberately.** Packer has 13 usage and
how-to pages between them and they share no structure. That is an absent
convention rather than a competing one, and templating it would mean inventing a
convention rather than recording one. The right fix is for the Packer team to
decide whether to adopt the global templates or define their own.

This is the main open question on this page.

## Types Packer shares with the global guidance

What is, concept, tabular reference, core reference, CLI reference, and function
reference need no override.

Packer uses no tab components anywhere in its documentation and only 76
`@include` directives. Guidance that assumes tabs or partials will not transfer.
