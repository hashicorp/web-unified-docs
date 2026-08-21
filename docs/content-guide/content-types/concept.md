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

The first section is the description block. It introduces the topic or topic area
that the page is about and clearly states the purpose of the page. **The
description block is required for all page types**.

**Aim for approximately 60 words to meet best practices for SEO and GEO**. Because
a concept page exists to explain related terms, the description should describe
the overarching idea that bridges those terms.

To disambiguate content and provide alternate options for user journeys, use a
second paragraph with a hyperlink that directs users to an appropriate
alternative.

The contents of the description block should align with the meta description
field for the markdown file. Refer to [metadata.md](metadata.md) for meta
description patterns, and to [Description](building-blocks.md#description) for
examples.

### Context

The context block introduces the concept by explaining the relationship between
the product and the concept. It may contain information about the concept in the
larger cloud computing and networking field, so that practitioners can begin
conceptualizing nuances between similar constructs.

The context block is optional. When you use one, always place it immediately
after the description and give it an H2 (`##`) heading. Use one of the following
labels, based on the kind of context you provide:

| Heading | Description | Example |
| --- | --- | --- |
| Introduction | Introduces terms, constructs, architectural components, and workflows to help a user understand a concept and its importance. For general-purpose introductions, use an "Introduction" heading. | [Introduction](https://developer.hashicorp.com/hcp/docs/packer/manage/audit-logs#introduction) to enabling audit log streaming in HCP Packer |
| Background | Provides historical or situational context, especially in the context of a product's release history and available features. Background-oriented introductions focus on how the topic relates to other processes or concepts, as opposed to highlighting its importance. | [Background](https://developer.hashicorp.com/consul/docs/deploy/server/vm/bootstrap) for bootstrapping a Consul server |
| Overview | Orients users to the process the page describes. Overviews focus on summarizing the contents of the topic, as opposed to highlighting its importance or providing background information. | [Overview](https://developer.hashicorp.com/terraform/mcp-server/deploy/local#overview) of deploying a local MCP server |

Refer to [Introduction](building-blocks.md#introduction) for examples.

### General subtopic

Place information about a concept, feature, or subject into general subtopics.
General blocks glue pieces of the documentation together and provide space to
describe how processes and concepts relate to other sections in the topic. You
can embed visual elements and format content as lists, tables, tabs, or any other
form so long as it is consistent with our writing styles and the following
principles:

- **Modular subtopics that tell a story:** Write subtopics so that they are
  comprehensible to practitioners that scan the page and practitioners that read
  the page from top to bottom. Each general block supports a single aspect of the
  main topic. Arrange the blocks in a logical order on the page. Group and nest
  subtopics in a manner that is consistent with our style guidance.
- **Headings:** Use headings that clearly signal to readers what the subtopic is
  about.
- **Stay in type:** Do not mix information associated with other content types,
  such as usage or reference information, into the concept.

Concepts are the most dense type of content. Look for opportunities to visually
break information up into digestible chunks:

- Use a bulleted list when describing three or more components.
- Use diagrams, video, and other media as necessary. Refer to
  [visual-aids.md](visual-aids.md) for guidance.
- Use subheadings to segment and organize information.

Refer to [General subtopic](building-blocks.md#general-subtopic) for examples.
