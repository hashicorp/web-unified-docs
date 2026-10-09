# Content type census

The counts on the product pages in this directory come from a census of every
nav-reachable page in eleven products, taken **2026-08-25**.

**The census was a starting map, and the per-product audit that followed it
superseded it for discovery.** Use it for volume and distribution. Do not use it
to determine a page's content type — refer to the product pages for that.

This page records the census scope, method, accuracy, and known failure modes.
**Read it before quoting any figure.**

The full per-page classification — all 4,291 rows — is not committed, because it
is generated output that would go stale in place. `census.py` regenerates it on
demand, either as a CSV or as a reviewable document; refer to
[Running it](#running-it). A copy is attached to the pull request that introduced
this directory, for reviewers who want it without running anything.

## Coverage

| Product | Version analyzed | Pages |
| --- | --- | --- |
| Boundary | `v1.0.x` | 425 |
| Consul | `v2.0.x` | 734 |
| Nomad | `v2.0.x` | 688 |
| Packer | `v1.16.x` | 222 |
| Terraform | `v1.15.x` | 348 |
| Vault | `v2.x` | 833 |
| Terraform Enterprise | `v202507-1` | 356 |
| Well-Architected Framework | unversioned | 123 |
| HCP Terraform docs | unversioned | 281 |
| Vagrant | `v2.4.9` | 198 |
| Sentinel | `v0.40.x` | 83 |
| **Total** | | **4,291** |

Pages not reachable from a nav file are out of scope. The census measures the
published information architecture, not the filesystem.

HCP docs, validated designs, Terraform CDK, and the Terraform plugin SDK,
framework, testing, and policy documentation were not analyzed. Refer to
[index.md](index.md#coverage) for what that leaves uncovered.

## Distribution

| Content type | boundary | consul | nomad | packer | terraform | vault | TFE | WAF | HCP TF | vagrant | sentinel | Total | % |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CLI reference | 204 | 134 | 234 | 15 | 67 | 112 | 1 | 0 | 0 | 34 | 4 | 805 | 18.8% |
| Concept | 78 | 112 | 67 | 40 | 53 | 187 | 36 | 45 | 44 | 102 | 40 | 804 | 18.7% |
| How-to | 55 | 166 | 59 | 6 | 28 | 144 | 81 | 43 | 69 | 10 | 3 | 664 | 15.5% |
| API reference | 0 | 48 | 49 | 0 | 0 | 189 | 72 | 0 | 91 | 0 | 0 | 449 | 10.5% |
| Overview | 40 | 88 | 39 | 19 | 31 | 66 | 36 | 18 | 35 | 28 | 11 | 411 | 9.6% |
| Structured configuration reference | 23 | 65 | 122 | 24 | 34 | 58 | 3 | 0 | 4 | 14 | 6 | 353 | 8.2% |
| Function reference | 0 | 0 | 84 | 105 | 126 | 0 | 0 | 0 | 0 | 0 | 10 | 325 | 7.6% |
| Usage | 13 | 43 | 17 | 7 | 7 | 32 | 30 | 17 | 24 | 6 | 7 | 203 | 4.7% |
| Release notes and updates | 2 | 60 | 10 | 6 | 0 | 11 | 83 | 0 | 1 | 0 | 1 | 174 | 4.1% |
| Core reference | 2 | 10 | 3 | 0 | 1 | 10 | 4 | 0 | 9 | 4 | 1 | 44 | 1.0% |
| Tabular reference | 5 | 8 | 3 | 0 | 1 | 7 | 10 | 0 | 4 | 0 | 0 | 38 | 0.9% |
| Cookbook | 0 | 0 | 0 | 0 | 0 | 17 | 0 | 0 | 0 | 0 | 0 | 17 | 0.4% |
| Unresolved | 3 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 4 | 0.1% |
| **Total** | 425 | 734 | 688 | 222 | 348 | 833 | 356 | 123 | 281 | 198 | 83 | **4291** | |

859 pages, 20.0%, carry a second strong structural signal. The rate varies
sharply by product: 64% in the Well-Architected Framework, 33% in Terraform
Enterprise, 6% in Vagrant.

## What the census established

**Function reference had no home in the taxonomy.** 315 pages across Nomad,
Packer, and Terraform document a single language function, and all three products
had converged on the same shape — `## Examples` on 286 of them, `## Related
Functions` on 191 — without the taxonomy naming the type. It is now
[function-reference.md](../content-types/function-reference.md).

**CLI reference is the largest divergence surface.** 766 pages, 23.6% of
everything analyzed, and every product differs from the global template in a
different way. Boundary and Consul share a near-identical shape inherited from
the same legacy layout, Nomad documents options thoroughly under its own heading
names, Terraform is closest to the global template, and Vault is mid-migration.

**The global configuration reference template describes two products, not six.**
Consul and Terraform match it exactly. Nomad uses `## Parameters`, Packer uses
`## Configuration Reference` with required and optional subsections, and Vault
uses a per-block variant.

**Terraform Enterprise's release notes are the most rigid convention in the
repo**, and the global guidance says not to template release notes. 83 pages
across a fixed eight-heading set. The reasoning behind the global rule — products
structure release notes differently — holds across products and fails inside this
one. Recorded as a documented exception rather than a change to the rule.

**The Well-Architected Framework barely fits the taxonomy.** Only four content
types appear across its 123 pages, 64% carry a second structural signal, and its
concept/how-to split is the classifier guessing at a line WAF does not draw. Its
page structure is nonetheless the most consistent measured: `## Next steps` on
114 of 123 pages and `## HashiCorp resources` on 97.

**Two products independently run two closing blocks.** Boundary pairs
`## More information` with `## Next steps`, and WAF pairs `## HashiCorp
resources` with `## Next steps` — both splitting sideways links from forward
links. The global guidance describes one closing block. Two products arriving at
the same two-block split is worth considering as a change to the global rule
rather than as two exceptions.

**API reference is the most convergent content type in the repo, and it is not
generated.** 450 authored pages across five products, 369 of which carry both a
sample request and a sample response block, all documenting parameters in the
same slot. No OpenAPI or Swagger specification generates any of them and no
script in `scripts/` writes to those paths. Boundary is the counter-example and
proves the rule: its API reference *is* generated, from protocol buffers, and it
is not in this repository at all. The distinction that matters is not "generated
or not" in the abstract — it is whether the pages are authored in `content/`.

**The usage type is weak everywhere.** It accounts for 119 pages, 3.7%, and it
has no reliable structural signature — a feature page with a non-imperative title
and no requirements block cannot be distinguished from a concept page. That 119
is a floor, not a count. Vault names half the distinction by giving workflow pages
their own how-to structure, but continues to publish feature pages alongside them;
the other products carry the same ambiguity unnamed.

**A third conventional page type the classifier could not see.** Boundary's 23
domain model pages share an exclusive three-block structure — Attributes,
Referenced by, Service API docs — and the census classified them 11 structured
configuration reference, 11 concept, and 1 overview. The pages are entirely
consistent with each other; the disagreement was the classifier's. Together with
Vault's plugin pages and Terraform Enterprise's release notes, that is three
strongly conventional page types found by reading rather than by measuring.

**Conventional page types are invisible to a generic classifier.** Vault's secrets
plugin pages (`## Setup` / `## Usage` / `## API`, 37 pages) and auth method pages
(`## Authentication` / `## Configuration` / `## API`, 17 pages) are among the most
rigidly conventional pages in the repo, and the census scattered them across
usage, concept, and how-to. They were found by reading the pages afterward. A
census of this kind measures shape; it does not discover named page types, and a
product's own writers will know types it cannot see.

## How wrong the per-page classifications are

The audit established ten conventional page types, each recorded on a product
page. Applying those conventions back over the census — as a separate
`documented_type` column, computed independently of the classifier — measures the
gap directly:

**259 pages match a documented convention. The shape classifier disagreed on 120
of them, 46%.**

| Product | Documented type | Pages the classifier got wrong |
| --- | --- | --- |
| Vault | secrets plugin | 38 |
| Boundary | domain model | 22 |
| Vault | auth method | 17 |
| Nomad | autoscaler plugin | 14 |
| Terraform | backend reference | 12 |
| Vault | cookbook | 6 |
| Terraform | meta-argument | 6 |
| Nomad | task driver | 5 |

On pages belonging to a rigidly conventional page type — the pages a classifier
should find *easiest* — shape inference is wrong about half the time. That is the
single most useful number this census produced, and it is an argument against
trusting any individual row in it.

These rules were deliberately **not** folded into the classifier. Doing so would
make the census confirm what it had been told and erase the evidence that shape
inference could not find these types on its own.

## A second pass found five more conventional page types

The census counts were followed by a per-product audit that looked for folders
whose pages share a heading set the classifier had scattered across types — the
signature that had already turned up Vault's plugin pages, Terraform
Enterprise's release notes, and Boundary's domain model. It found five more:

| Type | Product | Pages | Census had classified them as |
| --- | --- | --- | --- |
| Configuration reference | Vault | 39 | 43 config-ref, 17 spread across 5 other types |
| Autoscaler plugin | Nomad | 21 | mostly config-ref, some overview |
| Backend reference | Terraform | 13 | 10 config-ref, 2 overview, 1 how-to |
| Meta-argument | Terraform | 7 | 3 overview, 2 concept, 1 config-ref, 1 how-to |
| Task driver | Nomad | 6 | 5 config-ref, 1 how-to |

The audit also corrected two claims made from census buckets:

- **Vault's configuration reference does not match the global template.** 49
  Vault pages use a `parameters` heading and **zero** use any of the global
  template's three headings. An earlier reading called it "close enough to
  share"; it is not.
- **The global overview template describes Consul and Terraform, and almost
  nothing else.** Consul has `## Introduction` on 122 pages and `## Workflows` on
  47. Vault has 0 and 1 across 120 index pages; Boundary has 1 and 0 across 71.

Together with the first three, that is **eight** conventional page types the
classifier could not name, and two template-fit claims it got wrong. Every
product page now records where the global templates genuinely apply and where
their absence is a gap rather than compliance.

## Verifying the negative

Finding undocumented types answers only half the question. The other half —
whether the global templates actually apply where no override exists — was
checked separately, by grepping each global template's own prescribed headings
against each product.

The result reframes what the global templates are:

| Global template signal | Consul | Terraform | TFE | HCP TF | Nomad | Vault | Boundary | Packer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `## Introduction` (overview) | **122** | 43 | 34 | 12 | 15 | 0 | 1 | 15 |
| `## Workflows` (overview) | **47** | 14 | 9 | 6 | 2 | 1 | 0 | 2 |
| `## Guidance` (overview) | **24** | 1 | 0 | 0 | 0 | 0 | 0 | 1 |
| `## Configuration model` | **31** | 29 | 1 | 0 | 0 | 0 | 0 | 0 |
| `#### Values` (nested) | **27** | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| `## Next steps` (usage) | **56** | 15 | 11 | 21 | 33 | 18 | 66 | **0** |

**The global templates are a description of Consul's practice.** Consul leads
every column, and `#### Values` — a nested block deep inside the configuration
reference template — appears on 27 Consul pages and zero pages everywhere else.
Terraform is second and matches on configuration reference and partly on
overview.

That is not an argument against the templates as a standard. It is an argument
for stating plainly, on every product page, whether the absence of an override
means the product complies or simply that nothing was written. Packer's zero
`## Next steps` is the clearest case: it needed a recorded gap, not a template.

## Method

### Selecting pages

For each product, the newest version directory was resolved, then every
`*-nav-data.json` in its `data/` directory was walked recursively. Nodes carrying
a `path` were resolved to a file by trying `<section>/<path>.mdx` and
`<section>/<path>/index.mdx`. Nodes carrying only `href` are external links and
were skipped.

### Classifying pages

Classification is **structural, not editorial**. Each page was reduced to a
feature vector — heading text, ordered-list step count, tab count and group
names, code fence languages, table row count, link density, word count,
parameter-style list entries, `@include` count, and the presence of a
requirements-style block — then routed by rules in this order:

1. **Location.** Files under `api-docs/` are API reference; files under
   `commands/` or `cli/` are CLI reference; paths matching release, changelog,
   deprecation, or upgrade patterns are release notes; paths under `functions/`
   are function reference.
1. **Title.** An H1 beginning "What is" is a what-is page.
1. **Shape.** The remaining rules test for cookbook, overview, structured
   configuration reference, how-to, usage, tabular reference, and core reference
   in that order, falling through to concept.

The how-to and usage split matters most, so it is worth stating precisely:

- **How-to** — three or more ordered steps accompanied by code blocks, **or** a
  majority of non-boilerplate H2 headings beginning with an imperative verb or
  `Step N:`.
- **Usage** — two or more H2 headings that are not predominantly imperative,
  plus either a requirements-style block or an imperative page title.
- **Concept** — everything else that is prose.

### Accuracy

A stratified sample of 24 pages across every type was hand-checked against the
rendered headings. Roughly 20 agreed. Two independent ground-truth checks:

- 47 of the 51 Vault pages carrying `## Before you start` classify as how-to.
- 44 of the 47 Vault pages carrying `## Step N:` headings classify as how-to.

Treat the per-product percentages as accurate to a few points, and treat any
individual page's classification as a hypothesis rather than a verdict.

## Known failure modes

- **Concept is the fallback bucket.** A page lands there when no other rule
  fires. It holds genuine concept pages alongside reference pages whose headings
  use vocabulary the configuration-reference rule does not recognize.
- **The census counts H2 headings only.** Products that document options at H3 or
  H4 read as thinner than they are. Boundary documents options at
  `### Command options` on 154 of its 204 CLI pages, and Consul at
  `#### Command Options` on 80 of its 129 — none of which the classifier sees.
  The distribution is reliable; a claim that either product "has no options
  sections", derived from these counts, would be false.
- **Fixed heading sets are invisible**, as described above. Reading a product's
  pages found types the classifier could not.
- **Cookbook is not structurally detectable.** Detection requires the `cookbook/`
  folder name or a `<Tip title="Assumptions">` block. Without one, a cookbook
  page is indistinguishable from a short how-to.
- **Usage and concept overlap, and usage is a floor.** Hand-reading the 32 Vault
  pages classified as usage found roughly 20 genuine feature pages plus several
  misfiled troubleshooting and overview pages, with more feature pages certainly
  sitting in Vault's 187-page concept bucket.
- **Partial-heavy products hide their structure.** Vault has 1,687 `@include`
  directives and Terraform has 5. The classifier does not follow includes, so
  Vault pages read as thinner than they render.

## Defects found after the first run

Both of these changed counts materially, and both were found by reading output
rather than by the classifier reporting a problem. They are the strongest
argument for treating any individual row as a hypothesis:

- **Nav paths beginning with `/` failed to resolve.** `os.path.join` treats a
  leading slash as an absolute path, so five Well-Architected Framework pages
  were recorded as unresolved when the files existed.
- **The release-notes rule matched `release-notes` but not `releases`.** All 83
  Terraform Enterprise release pages classified as `concept` and `overview` until
  the pattern was widened.

Four nav entries remain genuinely unresolved: three in Boundary and one in Nomad.

## Running it

`census.py` needs Python 3 and nothing else. It prints a summary and **writes
nothing unless you ask**:

```shell-session
$ python3 docs/content-guide/products/census.py
```

To write the per-page data, the reviewable document, or both:

```shell-session
$ python3 docs/content-guide/products/census.py --csv /tmp/census.csv
$ python3 docs/content-guide/products/census.py --matrix /tmp/census-matrix.md
```

`--csv` carries every page with every feature used in its classification, so a
disputed row can be re-judged without re-running anything. `--matrix` renders the
same data as a document: per-product sections, collapsible per-nav-file tables,
and the disagreement breakdown, with a documented type shown in bold wherever it
contradicts the inferred one.

Neither output belongs in the repository. Write them somewhere outside it.

## Refreshing

When a product ships a new version directory, update the `PRODUCTS` table at the
top of the script, re-run it, and re-stamp the counts on the product pages with
the new date. Each count on those pages ships the command that produced it, so
individual figures can be refreshed without a full re-run.
