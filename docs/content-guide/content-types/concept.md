# Concept pages

A concept provides detailed information about an abstraction associated with a
HashiCorp product. Use the concept type to describe any construct related to your
product that is necessary for helping practitioners build mental models. This
includes HashiCorp constructs and HashiCorp-specific implementations of cloud
infrastructure technology. For the purpose of segmenting information into types,
_internals_, _subjects_, and _features_ are synonymous with _concepts_. Concepts
map to the Diátaxis **explanation** category.

Concept pages come in two structures:

| Structure | Use it for | Template | Produces |
| --- | --- | --- | --- |
| Concept (long) | A single concept explained in depth, with nested subtopics | [templates/concept.mdx](../templates/concept.mdx) | `{concept}.mdx` |
| Concepts (short) | Several related short concepts collected on one page | [templates/concepts.mdx](../templates/concepts.mdx) | `concepts.mdx` |

Refer to [indexing.md](../indexing.md) for guidance on when to create a
`/concepts` folder versus a single `concepts.mdx` page.

## Existing examples

For examples of Concepts (short) pages that implement these guidelines, refer to
the following:

- [HCP Consul Central](https://developer.hashicorp.com/hcp/docs/consul/concepts/consul-central)
- [HCP Consul cluster tiers](https://developer.hashicorp.com/hcp/docs/consul/concepts/cluster-tiers)
- [HCP Consul network topologies](https://developer.hashicorp.com/hcp/docs/consul/concepts/network-topologies)

For examples of Concept (long) pages that implement these guidelines, refer to
the following:

- [HCP Consul cluster management](https://developer.hashicorp.com/hcp/docs/consul/concepts/cluster-management)
- [Consul architecture: Catalog v1 API](https://developer.hashicorp.com/consul/docs/architecture/catalog/v1)
- [Consul architecture: Catalog v2 API](https://developer.hashicorp.com/consul/docs/architecture/catalog/v2)

## Concept versus overview

Concepts and overviews are variations of the Diátaxis _explanation_ content type.
They are similar but have slightly different purposes and characteristics.

| Concept | Overview |
| --- | --- |
| Learning-oriented | Action-oriented |
| Primary purpose is to explain the concept | Primary purpose is to funnel users to actionable topics |
| Canonical description; destination for links from other topics | Links to dedicated concept page |
| Dedicated page topic | Describes the concept in the context of a workflow |

## North star principles

Make sure that your concept content aligns with the following north star
principles.

### Domain of nuance and details

Write for users that are seeking complete information. Other content types may
mention a concept topic in the introduction or within the context of a workflow,
but they should link to concept pages for thorough and up-to-date details.
Include as much detail as necessary to effectively describe the concept topic.

### Follow a beginning-to-end structure

The order of details on a concept page matters. Define terms and explain
mechanics in a logical sequence that optimizes learning. Note that this is in
contrast to usage and reference content types, which contain modular information
written for CTRL+F searches.

## User journeys

Our goal is to create documentation for all audience types, but concept pages are
optimized for the following practitioners.

### New users, learners, and researchers

- This user is trying to understand terminology necessary for learning how to use
  the product.
- May be studying for certification or is new to cloud infrastructure, in
  general.
- Has allocated time to read and absorb the page in its entirety instead of
  quickly scanning for terms to address an immediate need.
- Focused on "what" and learning patterns.

## Page structure

### Concepts (short)

Use this structure when you have several related concepts that each need a
paragraph or two rather than a dedicated page.

1. [Description](#description)
1. [Context](#context) (optional)
1. [General subtopic](#general-subtopic) — one per concept, each at H2 (`##`)

### Concept (long)

Use this structure when a single concept needs in-depth treatment.

1. [Description](#description)
1. [Context](#context) (optional)
1. Main subtopic at H2 (`##`), with nested subtopics at H3 (`###`)
1. Additional [general subtopics](#general-subtopic) at H2 (`##`) as needed

## Content block guidance

### Description

The description block introduces the topic and states the page's purpose. It is
required on every page type. Aim for approximately 60 words, and keep it aligned
with the page's `description` frontmatter field.

Refer to [Description](building-blocks.md#description) for the full guidance and
examples, and to [metadata.md](metadata.md) for meta description patterns.

### Context

The context block explains the relationship between the product and the concept,
including how the concept relates to the wider field. It is optional. When you
use one, place it immediately after the description and use "Introduction" or
"Background" for the heading.

Refer to [Introduction](building-blocks.md#introduction) for the heading options,
the full guidance, and examples.

### General subtopic

General subtopics hold information about a concept, feature, or subject, and
connect the parts of a page to each other. Use headings that clearly signal what
each subtopic covers, and keep each one focused on a single aspect of the main
topic.

Concepts are the most dense type of content. Look for opportunities to break
information into digestible chunks with lists, subheadings, and visual aids.

Refer to [General subtopic](building-blocks.md#general-subtopic) for the full
guidance and examples, and to [visual-aids.md](visual-aids.md) for diagram
conventions.

## Writing style

Content types organize information. For word choice, formatting, headings,
links, and other page-level rules, refer to the
[style guide](../../style-guide/index.md), starting with the
[top 12 guidelines](../../style-guide/top-12.md).

For calling out paid editions and pre-GA releases on this page type, refer to
[Use an enterprise alert to create a partial that calls out paid edition considerations on overview and concept pages](../../style-guide/general/enterprise-releases.md#use-an-enterprise-alert-to-create-a-partial-that-calls-out-paid-edition-considerations-on-overview-and-concept-pages).
