# HCP Terraform content conventions

HCP Terraform documentation and [Terraform Enterprise](terraform-enterprise.md)
documentation are maintained in parallel. Read this page and that one together:
101 nav paths exist in both, and neither is a complete picture on its own.

Its API reference is the most developed in the repo. The team maintains its own
template, in the content directory, and publishes it.

This page describes what HCP Terraform's documentation looks like today so its
team can own it. Refer to [index.md](index.md#status-labels) for what the status
labels mean.

Owner: HCP Terraform documentation team.

## Census summary

281 nav-reachable pages in `content/terraform-docs-common`, classified
2026-08-25:

| Content type | Pages | Share |
| --- | --- | --- |
| API reference | 91 | 32.4% |
| How-to | 69 | 24.6% |
| Concept | 44 | 15.7% |
| Overview | 35 | 12.5% |
| Usage | 24 | 8.5% |
| Core reference | 9 | 3.2% |
| Tabular reference | 4 | 1.4% |
| Structured configuration reference | 4 | 1.4% |
| Release notes | 1 | 0.4% |

The census walked the `cloud-docs`, `docs`, `plugin`, and `registry` nav files.

Like Terraform Enterprise, HCP Terraform has **no CLI reference** and almost no
configuration reference. Guidance written with a CLI or a configuration schema in
mind does not transfer to either product.

## The parallel relationship with Terraform Enterprise

**Status: In use.**

Terraform Enterprise is the self-hosted form of HCP Terraform, and its
documentation is maintained as an adapted copy rather than as a separate work.

**Evidence, 2026-08-25.**

| Measure | Result |
| --- | --- |
| Nav paths present in both products | 101 |
| Bodies near-identical, within 15% length | 80 |
| Bodies byte-identical | 0 |

Shared paths by section: `api-docs` 50, `workspaces` 17,
`users-teams-organizations` 11, `vcs` 11, `registry` 7, `projects` 3.

Zero identical and 80 near-identical is the signature of parallel hand
maintenance. A convention recorded on one of these two pages almost certainly
applies to the other, and a change to one product's page structure should be
checked against the other before it ships.

**This is the divergence most likely to cause a mistake.** A writer who reads only
[terraform-enterprise.md](terraform-enterprise.md) will believe a shared
convention is Terraform Enterprise's own.

## API reference

**Status: Adopted.**

**What HCP Terraform does.** Each page documents one resource. Each endpoint on
that resource gets an H2 named "Verb a Noun", followed by the method and path as
a single code span, a parameter table, a status-and-response table, and then H3
blocks for permissions, request body, and samples.

**The team maintains its own template and publishes it**, at
`cloud-docs/api-docs/_template.mdx`. It carries inline HTML comments explaining
each convention, and it ships in the navigation as a page. Terraform Enterprise
carries a copy in every version folder back to `1.1.x`.

**Use that template rather than anything in this guide.** It is more specific
than a global API template could be, its owners maintain it, and copying it into
`docs/content-guide/templates/` would create precisely the duplication that
[single-source-of-truth.md](../single-source-of-truth.md) warns against.

**Evidence, 2026-08-25.** 91 API pages.

| Element | Pages |
| --- | --- |
| `JSON API document` link reference block | 83 |
| `### Sample Request` | 85 |
| `### Sample Response` | 84 |
| `### Query Parameters` | 44 |
| `### Request Body` | 43 |
| `permissions-citation` maintainer marker | 25 |
| `### Available Related Resources` | 19 |

```shell-session
$ grep -rl --include='*.mdx' '^### Sample Request' content/terraform-docs-common/docs/cloud-docs/api-docs/
```

**These pages are hand-authored.** No OpenAPI or Swagger specification generates
them, and no script in `scripts/` writes to these paths. The boilerplate link
reference block at the top of each page — the HTTP status codes the tables link
to — is maintained by hand, which is why the in-content template opens by telling
authors to copy it.

## Types HCP Terraform shares with the global guidance

How-to and usage pages follow the global `usage.mdx` structure: `## Requirements`
on 48 pages against `## Prerequisites` on 12, with `## Introduction` and
`## Background` context blocks in equal use, and `## Next steps` on 21.

What is, concept, tabular reference, and core reference need no override.

**Overview is a partial match.** `## Introduction` appears on 12 pages and
`## Workflows` on 6, against `## Guidance` on **none**. As with
[Terraform Enterprise](terraform-enterprise.md), index pages introduce and
sometimes describe a workflow, then stop.

HCP Terraform has four configuration reference pages and no CLI reference —
too few to establish a convention. Pattern-match a sibling page.
