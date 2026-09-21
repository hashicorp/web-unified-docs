# Consul content conventions

Consul is the product the global content types most closely describe. Its
structured configuration reference pages match the global template exactly. One
override is needed for the CLI reference.

Owner: Consul documentation team.

This page describes what Consul's documentation looks like today so the Consul
team can own it. Refer to [index.md](index.md#status-labels) for what the status
labels mean.

## Census summary

734 nav-reachable pages in `content/consul/v2.0.x`, classified 2026-08-25:

| Content type | Pages | Share |
| --- | --- | --- |
| How-to | 166 | 22.6% |
| CLI reference | 134 | 18.3% |
| Concept | 112 | 15.3% |
| Overview | 88 | 12.0% |
| Structured configuration reference | 65 | 8.9% |
| Release notes and updates | 60 | 8.2% |
| API reference | 48 | 6.5% |
| Usage | 43 | 5.9% |
| Core reference | 10 | 1.4% |
| Tabular reference | 8 | 1.1% |

Consul has the largest release notes footprint in the repo at 60 pages, spanning
Consul, Consul on Kubernetes, Consul ECS, and Consul-Terraform-Sync. The global
guidance not to template release notes matters more here than anywhere else.

## The usage and how-to question

Consul is the clearest evidence that the global **usage** type conflates two
kinds of page. Its procedural pages split almost evenly between workflow-shaped
pages organized by steps and feature-shaped pages organized by aspect — under one
type name, at near-equal volume.

Consul has not named the distinction the way Vault has, and this page does not
propose that it should. It is recorded here because any decision about splitting
the global usage type will land hardest on Consul.

`## Introduction` appears on 122 pages, against `## Background` in the global
usage template. Both are permitted by
[building-blocks.md](../content-types/building-blocks.md), which lists
Introduction, Background, and Overview as the three heading options. No override
is needed; Consul has simply settled on the first option.

## CLI reference

**Status: In use.**

**What Consul does.** A Consul CLI page opens with the command name, a
`` Command: `consul <cmd>` `` line, a link to the corresponding HTTP API
endpoint, and a required-ACL table. Examples come **before** the usage block.
Options are documented as H4 headings inside the usage block, split into command,
API, and enterprise categories, with the last two composed from shared partials.

**Evidence, 2026-08-25.** 129 pages under `content/consul/v2.0.x/content/commands`.

| Element | Pages |
| --- | --- |
| `` Command: `consul ...` `` line | 126 |
| `## Usage` | 118 |
| `#### API Options` | 88 |
| `## Examples` | 80 |
| `#### Command Options` | 80 |
| `Corresponding HTTP API Endpoint` | 84 |
| ACL Required table | 83 |
| `#### Enterprise Options` | 56 |

```shell-session
$ grep -rl --include='*.mdx' '^#### Command Options' content/consul/v2.0.x/content/commands/
```

**Consul and Boundary share this shape almost exactly**, both inheriting it from
the same legacy `layout: commands` page type. Between them they account for 333
CLI pages, which makes it the most-used CLI shape in the repo — more common than
the global template's shape.

The nesting is the main difference from the global template: Consul puts the
description in the opening paragraph and the options at H4 under Usage, where the
global template puts both at H2. The API and enterprise option partials have no
equivalent in the global template at all.

**A note on location.** `docs/reference/cli` — the path the global guidance
prescribes — holds 5 pages in Consul, covering `consul-aws`, `consul-k8s`, and
Consul-Terraform-Sync. The Consul CLI itself lives in a separate top-level
`commands` section with its own nav file. Do not read the presence of
`reference/cli` as Consul following the global folder rule.

**Heading case.** Consul's CLI headings are title case (`#### Command Options`).
The style guide requires sentence case. The override template uses the existing
title case for the partial-backed headings, because changing them would break the
visual match with 129 sibling pages, and sentence case elsewhere. Revisit when
the set is next touched in bulk.

**Template:** [cli-reference-command.mdx](../templates/consul/cli-reference-command.mdx).

## Recurring task patterns

**Status: In use. Not content types.**

Two families of Consul page repeat a fixed procedure across many targets. They
are usage pages rather than distinct content types — the information they carry
is the same kind, applied to different subjects — but a writer adding to either
family should match the existing structure rather than inventing one.

**ACL token pages** — 13 pages under `docs/secure/acl/token/`. Structure is
`## Introduction`, `## Requirements`, then one section per edition or use case,
each containing the same three H3 steps: define a policy, register the policy
with Consul, link the policy to a token. 11 of the 13 carry all three.

**Kubernetes installation pages** — 7 pages under `docs/deploy/server/k8s/platform/`
sharing create a values file, install Consul in your cluster, deploy Consul,
configure your CLI, view Consul services. And 10 pages under
`docs/deploy/server/k8s/vault/data/` sharing store the secret in Vault, create a
Vault policy, create Vault authorization roles for Consul, update the Helm chart.

```shell-session
$ grep -rl --include='*.mdx' 'Link the policy to a token' content/consul/v2.0.x/
```

No template is provided for either. A content type is defined by what kind of
information a page carries, not by which task it documents — templating every
recurring task family would produce dozens of templates and would not make the
guidance more useful. Copy a sibling page.

## API reference

**Status: In use.**

**What Consul does.** Consul's API reference is authored by hand and follows the
global [API reference](../content-types/api-reference.md) structure, with two
additions worth preserving:

- A **capability table** after the method and path, showing blocking query
  support, consistency mode, agent caching, and required ACLs.
- A **corresponding CLI command** link, connecting the endpoint to its
  `consul` command.

Consul also uses `### JSON Request Body Schema` where other products use
`### Request Body`.

**Evidence, 2026-08-25.** 48 API pages; 37 carry both a sample request and a
sample response.

| Heading | Occurrences |
| --- | --- |
| `### Sample Request` | 153 |
| `### Query Parameters` | 133 |
| `### Sample Response` | 114 |
| `### Path Parameters` | 71 |
| `### Sample Payload` | 45 |
| `### JSON Request Body Schema` | 40 |

Headings are title case, against sentence case in Vault. Match the surrounding
pages.

Use the global [api-reference.mdx](../templates/api-reference.mdx) template,
keeping the capability table and the CLI cross-reference.

## Types Consul shares with the global guidance

**Structured configuration reference matches the global template exactly.**
Status: Adopted.
`## Configuration model` (31 pages), `## Complete configuration` (26), and
`## Specification` (33) are the three headings the global template prescribes.
No override.

**Consul is the product the global templates describe.** It is the only one of
the eleven analyzed where every global template it uses is matched by its pages
at scale. Verified 2026-08-25:

| Global template | Prescribed heading | Consul pages | Next-best product |
| --- | --- | --- | --- |
| `overview.mdx` | `## Introduction` | **122** | Terraform, 43 |
| `overview.mdx` | `## Workflows` | **47** | Terraform, 14 |
| `overview.mdx` | `## Guidance` | **24** | Terraform, 1 |
| `usage.mdx` | `## Requirements` | **89** | HCP Terraform, 53 |
| `usage.mdx` | `## Next steps` | **56** | HCP Terraform, 21 |
| `structured-configuration-reference.mdx` | `## Configuration model` | **31** | Terraform, 29 |
| `structured-configuration-reference.mdx` | `#### Values` | **27** | none — 0 elsewhere |

`#### Values` is the strongest signal in the table. It is a nested block deep
inside the global configuration reference template, it appears on 27 Consul pages,
and on **zero** pages in every other product — including Terraform, which matches
the H2 headings but not the nesting.

This is why Consul needs only one override. The global templates are, in
substance, a description of Consul's practice.

What is, concept, usage, overview, tabular reference, and core reference need no
override. Requirements vocabulary matches the global rule (`## Requirements` on
90 pages, `## Prerequisites` on 33) and is the largest requirements-block
population in the repo.
