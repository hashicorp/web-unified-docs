# Content types

The content we create and host on developer.hashicorp.com follows the principles
of the [Diátaxis method for structured documentation](https://diataxis.fr/).
Diátaxis is useful, especially during the planning and drafting phases, but it
lacks prescriptive guidance for producing consistent content at scale. To fill
this gap, we have developed several content types, which are subsets of Diátaxis
categories.

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
| | [CLI reference](content-types/cli-reference.md) | You are documenting CLI command options and usage. | [command](templates/cli-reference-command.mdx), [command group](templates/cli-reference-command-group.mdx), [global flags](templates/cli-reference-global-flags.mdx) |
| | [Core reference](content-types/core-reference.md) | The information is product-supporting but resists a standard format: specifications, error messages, troubleshooting, benchmarks, collections of best practices. | None — [pattern-match a sibling page](#types-without-a-template) |
| | API reference | You are documenting HTTP API options and usage. | None — [pattern-match a sibling page](#types-without-a-template) |

Index pages, which provide lists of links to supporting documentation on a
subject, are a variant of the overview type rather than a separate content type.
Refer to [Overview](content-types/overview.md) and to
[indexing.md](indexing.md) for navigation and folder conventions.

## Types without a template

Two content types have no canonical template yet: **API reference** and **core
reference**. Guidance for these types is still in development.

Until a template exists, do not invent a structure. Instead:

1. Find two or three existing pages of the same type in the same product.
1. Extract the structure they share — heading order, frontmatter, how parameters
   or messages are presented.
1. Follow that structure, and apply the north star principles from the
   corresponding content type page.

Consistency within a product matters more than consistency across products for
these types.

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
