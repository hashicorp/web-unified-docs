# Vault content conventions

Vault diverges from the global content types more than any other product. Its
divergence is not house style, it is a taxonomy difference. Vault renames the
usage type, and publishes two page types the taxonomy does not have.

Owner: Vault documentation team.

This page describes what Vault's documentation looks like today so the Vault 
team can own it. Refer to [index.md](index.md#status-labels) for what the status
labels mean.

## Census summary

833 nav-reachable pages in `content/vault/v2.x`, classified 2026-08-25:

| Content type | Pages | Share |
| --- | --- | --- |
| API reference | 189 | 22.7% |
| Concept | 187 | 22.4% |
| How-to | 144 | 17.3% |
| CLI reference | 112 | 13.4% |
| Overview | 66 | 7.9% |
| Structured configuration reference | 58 | 7.0% |
| Usage | 32 | 3.8% |
| Cookbook | 17 | 2.0% |
| Release notes and updates | 11 | 1.3% |
| Core reference | 10 | 1.2% |
| Tabular reference | 7 | 0.8% |

Vault is the most partial-heavy product in the repo: 1,687 `@include`
directives across 833 pages, against 570 in Consul and 5 in Terraform. Structure
that other products write inline, Vault composes from partials.

## Usage is replaced by how-to

**Status: Adopted.**

**What Vault does.** Vault does not use the usage type. Procedural content is
written as **how-to**, with its own structure. Feature documentation goes to
**concept**, which is where the global taxonomy already puts it: `content-types.md`
states that "**internals**, **subjects**, and **features** are synonymous with
**concepts**."

So Vault's divergence from the global guidance is a **rename**, not a split. The
global usage type is a procedure type — [usage.md](../content-types/usage.md)
defines it as "a procedure or a tightly-coupled set of procedures that enable you
to perform a unit of work" — and Vault calls that a how-to.

**Evidence, 2026-08-25.** The how-to convention is unanimous within Vault and
absent everywhere else:

| Convention | Vault | Boundary | Consul | Nomad | Packer | Terraform |
| --- | --- | --- | --- | --- | --- | --- |
| `## Before you start` | **51** | 0 | 0 | 0 | 0 | 0 |
| `## Step N:` headings | **47** | 1 | 0 | 0 | 0 | 0 |

```shell-session
$ grep -rl --include='*.mdx' '^## Before you start' content/vault/v2.x/
$ grep -rl --include='*.mdx' '^## Step [0-9]' content/vault/v2.x/
```

**How the page structure differs from [usage.md](../content-types/usage.md):**

| Global block | Vault how-to |
| --- | --- |
| Requirements | **Before you start** — bolded lead-in per item, not a plain list |
| Instructions, under one heading | **`## Step N: <imperative>`**, one H2 per step |
| Next steps | **Additional resources** (15 pages) or **Next steps** (18 pages) |

**Template:** [how-to.mdx](../templates/vault/how-to.mdx).

### A note on "usage", the word

Vault's internal vocabulary and this guide use the word **usage** for opposite
things. In Vault's vocabulary, a usage page documents a feature; in this guide,
the usage type documents a procedure. Anyone reconciling Vault's content types
with the global ones needs to know that before comparing them, or the two
taxonomies appear to conflict when they agree.

Vault's feature documentation is concept content and uses
[concept.mdx](../templates/concept.mdx). No override is needed for it: Vault's
`docs/concepts/` pages already match the global concept structure — a description
followed by general subtopics at H2, one per aspect of the thing.

The census initially classified 32 Vault pages as feature-shaped usage, which
looked like evidence for a Vault usage override. Reading them showed otherwise.
`concepts/ha.mdx` and `enterprise/performance-standby` share two body headings
verbatim — Server-to-Server communication and Request forwarding — and differ
only in that one has an imperative title. They are the same page type, filed in
two places.

**One thing for the Vault team rather than for a template.** Several of those
pages carry operational content under concept headings: `performance-standby` has
"Disabling performance standbys" and "Monitoring performance standbys".
[concept.md](../content-types/concept.md) says explicitly not to mix usage
information into a concept page. That is a content question for Vault, not a
structural divergence, and no template can settle it.

## Plugin pages

**Status: In use.**

**What Vault does.** Every secrets engine and auth method has a landing page, and
the two families use different fixed heading sets. These are the highest-traffic
non-CLI pages in Vault's documentation and neither shape appears in the global
taxonomy.

**Evidence, 2026-08-25.**

| Shape | Headings | Pages |
| --- | --- | --- |
| Secrets plugin | `## Setup`, `## Usage`, `## API`, often `## Tutorial` and `## Terraform` | 38 with Setup, 37 with Setup + Usage, 37 of those with API |
| Auth method | `## Authentication` with `### Via the CLI` / `### Via the API`, `## Configuration`, `## API`, `## Terraform` | 17 with Authentication + API, 15 with Configuration, 18 with Terraform |

```shell-session
$ grep -rl --include='*.mdx' '^## Setup$' content/vault/v2.x/content/docs/secrets/
$ grep -rl --include='*.mdx' '^## Authentication$' content/vault/v2.x/content/docs/auth/
```

Of Vault's 107 `secrets/` pages, 37 use the secrets plugin shape. Of its 44
`auth/` pages, 17 use the auth method shape. The rest of each folder is how-to,
cookbook, and concept material about the plugin.

**Templates:** [secrets-plugin.mdx](../templates/vault/secrets-plugin.mdx) and
[auth-method.mdx](../templates/vault/auth-method.mdx).

## Cookbook

**Status: Adopted.**

**What Vault does.** A cookbook page documents one atomic task against one plugin.
It carries no requirements block, no next steps, and usually no H2 headings at
all. The body is a `<Tip title="Assumptions">` block followed by a tab set that
gives the same task in each interface.

**Evidence, 2026-08-25.** 23 files under a `cookbook/` folder, in four plugin
areas — `secrets/kv/kv-v2`, `secrets/ldap`, `secrets/transit`, and
`ai/oauth-server`. 30 pages carry a `<Tip title="Assumptions">` block. No other
product has a cookbook folder.

```shell-session
$ find content/vault/v2.x -type d -name cookbook
$ grep -rl --include='*.mdx' 'title="Assumptions"' content/vault/v2.x/
```

**This is a new type, not an override.** Nothing in the global taxonomy covers
it. It is closest to how-to, but deliberately smaller: one task, no scaffolding,
no narrative.

Do not name it `example`. [examples.md](../content-types/examples.md) governs
examples *inside* other pages, and "cookbook" is the word already on disk.

**Template:** [cookbook.mdx](../templates/vault/cookbook.mdx). It covers both
body shapes the existing pages use: a flat tab set, and a short ordered sequence
with tab sets inside each step. The LDAP rotation pages show that tabs are used
for directory variants (`openldap`, `ad`, `racf`) as well as for interfaces.

## CLI reference

**Status: two shapes — one Adopted, one Legacy.**

Vault's CLI reference is mid-migration. Both shapes are documented, because a
writer touching an unconverted page needs to know what its neighbours look like,
and a writer creating a new page needs to know where the product is going.

### The target shape

**Status: Adopted.**

A one-sentence summary, the syntax in a `<CodeBlockConfig hideClipboard>` block
with no `## Usage` heading, then Description, Command arguments, Command options,
Command flags, Standard flags, and Examples. Argument, option, and flag
descriptions are composed from partials rather than written inline.

**Evidence, 2026-08-25.** 8 of 112 CLI pages use this shape:
`agent/generate-config`, `agent/index`, `audit/disable`, `audit/enable`,
`audit/list`, `hcp/connect`, `hcp/disconnect`, and `monitor`.

```shell-session
$ grep -rl --include='*.mdx' '^## Command arguments' content/vault/v2.x/content/docs/commands/
```

The heading vocabulary is settled by those pages rather than by preference. Seven
of the eight use **Command arguments**, **Command options**, **Command flags**,
and **Standard flags**. Only `agent/generate-config` differs, using Arguments,
Options, Command Flags, and Global flags; it is the outlier and the template does
not follow it.

That the team built 42 partials under `content/vault/v2.x/content/partials/cli/`
to support this shape is the reason it is marked Adopted at 8 pages rather than
In use. The partials are the strongest signal in the census that a decision was
made.

**Templates:** [cli-reference-command.mdx](../templates/vault/cli-reference-command.mdx)
and [cli-reference-command-group.mdx](../templates/vault/cli-reference-command-group.mdx).

### The current shape

**Status: Legacy.**

A one-sentence summary followed by `## Examples`, and often `## Usage`. No
description, argument, option, or flag sections.

**Evidence, 2026-08-25.** The remaining 104 of 112 pages.

| Heading | Pages |
| --- | --- |
| `## Examples` | 100 |
| `## Usage` | 92 |

Use this template only when editing an existing page that already has this shape
and converting it is out of scope for the change. Do not create new pages from
it.

**Template:** [cli-reference-command-legacy.mdx](../templates/vault/cli-reference-command-legacy.mdx).

### Divergences that apply to both shapes

- **Folder structure.** The global guidance prescribes `/reference/cli` with a
  `global-flags.mdx`. Vault uses `docs/commands/`.
- **No global flags page.** Standard flags come from
  `@include 'cli/standard-settings/all-standard-flags-but-format.mdx'`. The
  global `cli-reference-global-flags.mdx` template does not apply to Vault, and
  its absence is deliberate rather than an oversight.
- **Related links.** The global template ends with a `## Related` section. Vault
  uses a `<Tip title="Related API endpoints">` block inside Description.

## Structured configuration reference

**Status: In use.**

**What Vault does.** Vault names its parameter block after the stanza it
documents — `` ## `raft` parameters ``, `` ## `azure` parameters `` — optionally
followed by `` ## `<block>` examples ``. It does not use the global template's
Configuration model, Complete configuration, and Specification triad.

**Evidence, 2026-08-25.** 60 pages under `docs/configuration/`.

| Heading pattern | Pages |
| --- | --- |
| `` ## `<block>` parameters `` | 39 |
| `` ## `<block>` examples `` | 17 |
| `## Configuration model` | **0** |
| `## Specification` | **0** |

```shell-session
$ grep -rlE '^## `[^`]+` parameters' content/vault/v2.x/content/docs/configuration/
```

Across the whole product, 49 pages use a `parameters` heading and **none** use
any of the three global headings. The global
`structured-configuration-reference.mdx` template describes Consul and Terraform
practice; it does not describe Vault's.

**Template:** [structured-configuration-reference.mdx](../templates/vault/structured-configuration-reference.mdx).

## API reference

**Status: In use.**

**What Vault does.** Vault's API reference is authored by hand in this repository
and follows the global [API reference](../content-types/api-reference.md)
structure, with one consistent difference: **Vault uses sentence-case H3
headings** where the other four authored products use title case.

**Evidence, 2026-08-25.** 190 API pages; 147 carry both a sample request and a
sample response.

| Heading | Occurrences |
| --- | --- |
| `### Sample request` | 962 |
| `### Parameters` | 668 |
| `### Sample response` | 537 |
| `### Sample payload` | 367 |

```shell-session
$ grep -rl --include='*.mdx' '^### Sample request' content/vault/v2.x/content/api-docs/
```

Vault is the largest authored API set in the repo at 190 pages, 22.7% of Vault's
documentation. Sentence case matches the style guide, so Vault is the product
that needs no change here — the other four diverge from it.

Use the global [api-reference.mdx](../templates/api-reference.mdx) template with
sentence-case headings.

## Types Vault shares with the global guidance

What is, concept, tabular reference, and core reference need no override.

**Overview is a known gap rather than a match.** Of Vault's 120 `index.mdx`
pages, 0 use the global overview template's `## Introduction` heading, 1 uses
`## Workflows`, and 0 use `## Guidance`. Vault index pages are link hubs without
the prescribed structure. This is recorded rather than corrected — 120 pages is
not a cleanup — but do not read the absence of an override as compliance.

Release notes follow the product's own structure, per the global guidance. Vault
uses `updates/release-notes`, `updates/important-changes`, and
`updates/deprecation`.
