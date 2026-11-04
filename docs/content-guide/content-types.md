# Content types

The content we create and host on developer.hashicorp.com follows the principles
of the [Diátaxis method for structured documentation](https://diataxis.fr/).
Diátaxis is useful, especially during the planning and drafting phases, but it
lacks prescriptive guidance for producing consistent content at scale. To fill
this gap, we have developed several content types, which are subsets of Diátaxis
categories.

## Check your product first

Products implement these content types differently. Some rename a type, some
split one, some add a type this taxonomy does not have, and some do not use a
type at all.

**Before choosing a type from the table below, check
[products/](products/index.md) for your product.** If your product has a page
there, it takes precedence for the differences it records, and it names the
template to use. Everything it does not mention follows the table below.

| Product | Records differences in |
| --- | --- |
| [Boundary](products/boundary.md) | Domain model pages, closing block, CLI reference, generated API reference |
| [Consul](products/consul.md) | CLI reference, API reference |
| [Nomad](products/nomad.md) | CLI reference, configuration reference, API reference, task driver and autoscaler plugin pages |
| [Packer](products/packer.md) | Configuration reference |
| [Terraform](products/terraform.md) | Backend and meta-argument pages |
| [Terraform (HCP Terraform)](products/terraform-docs-common.md) | API reference, parallel with Terraform Enterprise |
| [Terraform Enterprise](products/terraform-enterprise.md) | Release notes, parallel with HCP Terraform |
| [Vault](products/vault.md) | Usage renamed to how-to, plugin pages, cookbook, CLI reference, configuration reference, API reference |
| [Well-Architected Framework](products/well-architected-framework.md) | Guidance pages, pillar pages, closing blocks |

The templates in this guide remain the standard for new documentation where a
product has expressed no preference. Refer to
[products/index.md](products/index.md) for how those pages are maintained and
what their status labels mean.

## Determine content type

When developing content, either manually or with the assistance of an AI agent,
start by asking what purpose the information serves. When you've identified the
broad kind of information you need to document, use the content type guidance to
create pages consistent with similar kinds of information that fit into the
product's information architecture.

| Diátaxis | Content type | Use it when | Template |
| --- | --- | --- | --- |
| **Tutorial** — hands-on activity that teaches | Tutorial | You need to demonstrate features end to end, including code for instantiating an environment. Owned by Education Engineers and hosted in a separate repository. | Out of scope for this repo |
| **How-to guide** — instructions for completing a task | [Usage](content-types/usage.md) | You are describing a single procedure or a tightly-coupled set of procedures that accomplish a unit of work. Synonymous with **user guides**. | [usage.mdx](templates/usage.mdx) |
| **Explanation** — discursive lecture about a topic | [Overview](content-types/overview.md) | You need a landing page that funnels practitioners to more detailed usage, reference, or concept pages, and explains the workflows that connect them. Also the `index.mdx` for a folder. | [overview.mdx](templates/overview.mdx) |
| | [Concept](content-types/concept.md) | You are describing constructs and abstractions associated with a product. **Internals**, **subjects**, and **features** are synonymous with concepts. | [concept.mdx](templates/concept.mdx), [concepts.mdx](templates/concepts.mdx) |
| | [What is](content-types/what-is.md) | You are introducing a product or sub product, or a workflow complex enough to need its own landing page. | [what-is.mdx](templates/what-is.mdx) |
| **Reference** — technical description of an entity | [Structured configuration reference](content-types/structured-configuration-reference.md) | The artifact you are documenting has a schema or hierarchy, such as HCL, JSON, or YAML configuration. | [structured-configuration-reference.mdx](templates/structured-configuration-reference.mdx), [single-language](templates/structured-configuration-reference-single.mdx) |
| | [Tabular reference](content-types/tabular-reference.md) | The information is non-hierarchical or nearly flat: compatibility matrices, error codes, metrics, flat configuration items. | [tabular-reference.mdx](templates/tabular-reference.mdx) |
| | [Function reference](content-types/function-reference.md) | You are documenting a single function in a configuration or templating language, such as an HCL function. | [function-reference.mdx](templates/function-reference.mdx) |
| | [CLI reference](content-types/cli-reference.md) | You are documenting CLI command options and usage. | [command](templates/cli-reference-command.mdx), [command group](templates/cli-reference-command-group.mdx), [global flags](templates/cli-reference-global-flags.mdx) |
| | [Core reference](content-types/core-reference.md) | The information is product-supporting but resists a standard format: specifications, error messages, troubleshooting, benchmarks, collections of best practices. | None — [pattern-match a sibling page](#types-without-a-template) |
| | [API reference](content-types/api-reference.md) | You are documenting HTTP API endpoints, their parameters, and their requests and responses. **Check first whether your product generates its API reference from a specification** — if so, this guide does not govern it. | [api-reference.mdx](templates/api-reference.mdx) |
| | [Release notes and product updates](#types-without-a-template) | You are documenting what changed in a release, or maintaining a change tracker, deprecation notice, or important-changes page. | None — follow the product's existing pattern |

Index pages, which provide lists of links to supporting documentation on a
subject, are a variant of the overview type rather than a separate content type.
Refer to [Overview](content-types/overview.md) and to
[indexing.md](indexing.md) for navigation and folder conventions.

## Types without a template

Two content types have no canonical template: **core reference** and **release
notes and product updates**. Guidance for core reference is still in development.
Release notes are deliberately not templated, because each product structures
them differently — though [Terraform Enterprise](products/terraform-enterprise.md)
is a documented exception, with 83 release pages on a fixed heading set.

Until a template exists, do not invent a structure. Instead:

1. Find two or three existing pages of the same type in the same product.
1. Extract the structure they share — heading order, frontmatter, how parameters
   or messages are presented.
1. Follow that structure, and apply the north star principles from the
   corresponding content type page.

Consistency within a product matters more than consistency across products for
these types.

Release notes vary the most. Boundary keeps `updates/release-notes` and
`updates/change-tracker`; Vault adds `updates/important-changes` and
`updates/deprecation`; Consul and Nomad organize theirs differently again. Read
the product's existing `updates` section and match it. Do not introduce a new
structure, and do not port another product's structure across.

## Building blocks

Every content type assembles the same set of introductory and body blocks in a
different order. Refer to
[content-types/building-blocks.md](content-types/building-blocks.md) for
definitions and worked examples of each block, including Description,
Introduction, Requirements, Instructions, Workflow, General subtopic, Guidance,
Table, Examples, and Next steps.

## Supporting guidance

| Guide | Covers |
| --- | --- |
| [content-types/metadata.md](content-types/metadata.md) | Page titles and meta description templates per content type |
| [content-types/examples.md](content-types/examples.md) | When and how to use examples, and which content types own them |
| [content-types/visual-aids.md](content-types/visual-aids.md) | Diagrams, screenshots, icons, and symbols |
| [products/](products/index.md) | How each product implements these types, and which template to use |
| [products/census.md](products/census.md) | Scope, method, and accuracy of the census the product pages cite |
| [indexing.md](indexing.md) | Navigation labels, folder names, and file names |
| [create-new-page.md](create-new-page.md) | The mechanics of adding a page and its sidebar entry |
| [single-source-of-truth.md](single-source-of-truth.md) | Avoiding duplicated content |
| [redirects.md](redirects.md) | Moving or renaming a page |

## Writing style

Content types are ultimately principles for organizing information. For guidance
on word choice, formatting, and other page-level features of your content, refer
to the [style guide](../style-guide/index.md). Start with the
[top 12 guidelines](../style-guide/top-12.md).

HashiCorp employees may refer to the internal Technical Writing wiki for the
source material these guides were derived from.
