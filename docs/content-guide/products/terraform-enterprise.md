# Terraform Enterprise content conventions

Terraform Enterprise is unusual in the shape of its documentation rather than in
the structure of individual pages. Almost a quarter of it is release notes, it 
has essentially no CLI or configuration reference, and its release notes follow
the most rigid convention in the repo, though release notes explicitly have no
template, and follow a per-product implementation.

This page describes what Terraform Enterprise's documentation looks like today 
so the Terraform Enterprise team can own it. Refer to
[index.md](index.md#status-labels) for what the status labels mean.

Terraform Enterprise documentation is maintained in parallel with
[HCP Terraform](terraform-docs-common.md) documentation — 101 nav paths exist in
both, 80 of them near-identical. **Read both pages together.** A convention
recorded on either almost certainly applies to the other.

Owner: Terraform Enterprise documentation team.

## Census summary

356 nav-reachable pages in `content/terraform-enterprise/v202507-1`, classified
2026-08-25:

| Content type | Pages | Share |
| --- | --- | --- |
| Release notes | 83 | 23.3% |
| How-to | 81 | 22.8% |
| API reference | 72 | 20.2% |
| Concept | 36 | 10.1% |
| Overview | 36 | 10.1% |
| Usage | 30 | 8.4% |
| Tabular reference | 10 | 2.8% |
| Core reference | 4 | 1.1% |
| Structured configuration reference | 3 | 0.8% |
| CLI reference | 1 | 0.3% |

Two thirds of Terraform Enterprise's documentation is release notes, how-to, and
API reference. It has **one** CLI reference page and **three** configuration
reference pages, against 234 and 122 in Nomad. Guidance written with a CLI or a
configuration schema in mind does not transfer here.

## Release notes

**Status: In use.**

**What Terraform Enterprise does.** Every release gets a page under
`enterprise/releases/<year>/`, titled with the version, using a fixed heading set
in a consistent order:

```text
## Known Issues
## Breaking Changes
## Deprecations
## Highlights
## Features
## Improvements
## Bug Fixes
## Security
```

Headings that have no content for a release are omitted rather than left empty.

**Evidence, 2026-08-25.** 83 release pages.

| Heading | Pages |
| --- | --- |
| `## Bug Fixes` | 57 |
| `## Known Issues` | 55 |
| `## Security` | 54 |
| `## Improvements` | 49 |
| `## Features` | 48 |
| `## Deprecations` | 37 |
| `## Highlights` | 29 |
| `## Breaking Changes` | 16 |

```shell-session
$ grep -rl --include='*.mdx' '^## Bug Fixes' content/terraform-enterprise/v202507-1/
```

**This is a deliberate exception to the global guidance.**
[content-types.md](../content-types.md) states that release notes are not
templated, because each product structures them differently. That reasoning holds
across products and fails within this one: Terraform Enterprise publishes a
release page on a fixed cadence, with the same eight headings, and templating it
is what keeps 83 pages consistent.

The global rule stays as written. This page records the exception rather than
changing it.

**Template:** [release-notes.mdx](../templates/terraform-enterprise/release-notes.mdx).

**Heading case.** The set is title case. The style guide requires sentence case.
The template preserves title case, because changing it would break the visual
match across 83 sibling pages and the set reads as a fixed vocabulary rather than
as prose. Revisit if the set is ever regenerated.

## Closing blocks are usually absent

**Status: In use.**

`## Next steps` appears on 11 of 356 pages. The global usage guidance treats the
block as optional and warns against maintaining links that go stale, so an
almost-total absence is a legitimate reading of that guidance rather than a
divergence from it.

Recorded because a writer coming from Consul or Boundary, where closing blocks
are near-universal, will notice their absence and should not add them page by
page without a decision.

## API reference

**Status: Adopted.**

**What Terraform Enterprise does.** Its API reference is authored by hand and
follows the same convention as [HCP Terraform](terraform-docs-common.md#api-reference),
which is the other half of this pair. Each page documents one resource; each
endpoint gets an H2 named "Verb a Noun", the method and path as a single code
span, a parameter table, a status-and-response table, then H3 blocks for the
request body and the samples.

**The template is not in this guide.** It lives in the content directory at
`enterprise/api-docs/_template.mdx` and is maintained by the team, carried in
every Terraform Enterprise version folder back to `1.1.x` — 54 copies in this
repository. **Use it rather than the global
[api-reference.mdx](../templates/api-reference.mdx)**, which is the more general
version of the same shape.

**Evidence, 2026-08-25.** 72 API pages, Terraform Enterprise's third-largest
content type at 20.2%.

| Element | Pages |
| --- | --- |
| `JSON API document` link reference block | 62 |
| `### Sample Response` | 61 |
| `### Sample Request` | 60 |
| `### Sample Payload` | 47 |
| `### Request Body` | 46 |
| `### Query Parameters` | 45 |
| `permissions-citation` maintainer marker | 23 |
| `### Available Related Resources` | 9 |

```shell-session
$ grep -rl --include='*.mdx' '^### Sample Request' content/terraform-enterprise/v202507-1/docs/enterprise/api-docs/
```

**These pages are hand-authored.** No OpenAPI or Swagger specification generates
them and no script in `scripts/` writes to these paths. 50 of the 101 nav paths
Terraform Enterprise shares with HCP Terraform are API pages, so a change to the
convention on either side should be checked against the other before it ships.

## Recurring task patterns

**Status: In use. Not a content type.**

10 pages under `enterprise/workspaces/dynamic-provider-credentials/` repeat the
same three-part structure — configure the cloud provider, configure HCP
Terraform, configure the Terraform provider — with supporting sections for
required and optional environment variables, required Terraform variables, and
example usage.

This is a usage page family rather than a content type: the same task documented
against AWS, Azure, GCP, HCP, Kubernetes, and Vault. HCP Terraform has a parallel
family under `registry/test/dynamic-credentials`.

No template is provided. Copy a sibling page, and check the HCP Terraform
equivalent before changing the structure.

## Types Terraform Enterprise shares with the global guidance

How-to and usage pages follow the global `usage.mdx` structure: an
`## Introduction` context block, `## Requirements` — 43 pages, against
`## Prerequisites` on 12 — then body sections. No override.

What is, concept, tabular reference, and core reference need no override.

**Overview is a partial match.** `## Introduction` appears on 34 pages and
`## Workflows` on 9, but `## Guidance` — the global overview template's third
block — appears on **none**. Terraform Enterprise index pages introduce and
sometimes describe a workflow, then stop.

Terraform Enterprise has one CLI page and three configuration reference pages —
too few to establish a convention. Pattern-match a sibling page.
