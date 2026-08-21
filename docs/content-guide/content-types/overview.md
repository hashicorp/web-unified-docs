# Overview pages

Overview pages are landing pages that funnel practitioners to more detailed
usage, reference, or concept pages. Overviews bridge the gap between usage and
concept pages by describing workflows and introducing vocabulary that help
practitioners understand a topic area more broadly. They map to the Diátaxis
**explanation** category.

To start drafting, copy [templates/overview.mdx](../templates/overview.mdx).

## Common patterns

The most common pattern is to position an overview page as the first topic in a
folder. As a de facto README, the overview guides users to appropriate topics and
explains concepts within the topic area. Other patterns for applying the overview
content type include:

- Describing the architecture of a module or system component
- Providing a table of contents for a topic area

Non-product documentation content, such as a landing page for a collection of
best practices in the well-architected framework (WAF), can still follow the
guidance for creating overview page as long as the purpose of the content aligns
with the principles associated with the guidance. Whether or not the information
can be considered "overview" information in a more conventional sense is less
important than using a consistent set of patterns for similar types of
information or information that is intended to achieve similar purposes.

An overview page is also the index page for its folder. Every folder must contain
an `index.mdx` file so that users can reach a page of content at every segment of
the URL. Refer to [indexing.md](../indexing.md) for naming and navigation
guidance.

## Existing examples

For examples of overview pages that implement these guidelines, refer to the
following:

- [Service mesh proxy overview](https://developer.hashicorp.com/consul/docs/connect/proxies)
- [Cluster peering overview](https://developer.hashicorp.com/consul/docs/connect/cluster-peering)
- [Consul on AWS Elastic Container Service (ECS) architecture](https://developer.hashicorp.com/consul/docs/v1.17.x/ecs/architecture)
- [API gateways overview](https://developer.hashicorp.com/consul/docs/v1.17.x/connect/gateways/api-gateway)
- [Failover overview](https://developer.hashicorp.com/consul/docs/connect/failover)

We recommend writing the overview page after completing the rest of the content
for a topic area. The content may dictate the kind of information you should
include and how to organize it.

## North star principles

Make sure that your overview content aligns with the following north star
principles.

### Broad but shallow topics

Summarize workflows, usage patterns, and other processes but avoid detailed
steps. Link to the appropriate usage page instead. Similarly, avoid describing
configuration details. Instead, highlight key configuration items or elements and
link out to the appropriate reference.

### Common but not always necessary

Do not add overview pages for the sake of adding them. Overview pages are often,
but not always, the first topic in a directory of topics. Add an overview page in
the following instances:

- The usage and configuration pages for a topic area contain too much background
  or introductory information. Port the content from the other page types into an
  overview page.
- Use case or conceptual information is missing or dispersed throughout several
  topics. Aggregate and organize the content from the other page types into an
  overview page.

### Keep the user moving

Overview pages are designed so that users encounter them at the start of their
journey through the documentation. Create pages so that they link to relevant
pages. This design ensures that users do not encounter "dead ends" at the start
of their journey.

## User journeys

Our goal is to create documentation for all audience types, but overview pages
are optimized for the following practitioners.

### Target: Experienced professional new to the product

- Understands general cloud networking, security, and infrastructure concepts but
  is new to HashiCorp product terminology and workflows.
- Wants to understand how to leverage features that allow developers and core
  platform users complete their tasks.
- May have completed getting started tutorials and wants to understand how to use
  the feature in production.

### Secondary: Non-admin user

- Some familiarity with core product concepts but new to product terminology and
  workflows.
- Only wants the minimum level of product knowledge that helps them achiever
  their goals.
- May have completed getting started tutorials and wants to understand how to use
  the feature in production.
- Uses CONTROL/COMMAND+F keys to locate familiar keywords.

## Page structure

Overview pages may have the following content blocks:

- [Description](#description)
- [Introduction](#introduction)
- [Workflow](#workflow)
- [General subtopic](#general-subtopic)
- [Guidance](#guidance)

## Content block guidance

### Description

The first section is the description block. It introduces the topic or topic area
that the page is about and clearly states the purpose of the page. **The
description block is required for all page types**.

**Aim for approximately 60 words to meet best practices for SEO and GEO**. If you
need additional space to introduce the topic, add background information, or
provide an overview of the procedures that the topic contains, add an
introduction section.

We recommend using overt language that states the purpose, for example:

> This topic describes how to register a service with Consul.

Explicitly stating the purpose helps readers and AIs determine if they have found
the correct topic. If the purpose is implied, you can exclude language that
explicitly states the purpose and describe the topic directly.

Add links in the description to connect closely related topics such as usage and
configuration reference pages associated with a single functionality.

The contents of the description block should align with the meta description
field for the markdown file. The meta descriptions are optimized for search and
contain keywords, phrases, acronyms, and alternate spellings that are not always
suitable for displaying on the page. Description blocks take the page title as
the heading.

Refer to [Description](building-blocks.md#description) for examples.

### Introduction

The introduction block serves one or more of the following purposes:

1. To provide additional context or background about the topic.
1. To summarize main points described on the page.
1. To help users understand how the topic helps them achieve their goals.

Introductions have H2 (`##`) headings and immediately follow the description. You
can omit the introduction section when the page description clearly describes the
topic. Follow the hierarchical style guidance for formatting nested content
blocks.

Use one of the following heading types for the introduction section:

| Heading | Description | Example |
| --- | --- | --- |
| Introduction | The general introduction provides additional context to help readers understand why the topic is important. For general-purpose introductions, use an "Introduction" heading. | [Introduction](https://developer.hashicorp.com/hcp/docs/packer/manage/audit-logs#introduction) to enabling audit log streaming in HCP Packer |
| Background | For topics that require significant background knowledge, use the "Background" heading for the introduction. Background-oriented introductions focus on how the topic relates to other processes or concepts, as opposed to highlighting its importance. As the group of related topics evolve, information from the background section may be ported to an overview page. | [Background](https://developer.hashicorp.com/consul/docs/deploy/server/vm/bootstrap) for bootstrapping a Consul server |
| Overview | Use an "Overview" heading to orient users to the process the page describes. Overviews focus on summarizing the contents of the topic, as opposed to highlighting its importance or providing background information. | [Overview](https://developer.hashicorp.com/terraform/mcp-server/deploy/local#overview) of deploying a local MCP server |

Refer to [Introduction](building-blocks.md#introduction) for examples.

### Workflow

Add a **workflow** or **workflows** section to overview pages to summarize the
actions a practitioners must perform to achieve the goal described in the
overview. Workflows are core sections that explain how the information in the
related usage and reference topics connect.

When creating an overview page in the well-architected framework (WAF), a
workflow block may not be necessary or even feasible. This is because high-level
procedures may not be linear in WAF as they are in product documentation.

- It may not always be possible, but describe workflows in three phases according
  to the _Rule of three_ writing principle when possible. The rule of three
  principle is a known device for helping learners digest information.
- Don't reproduce details from the relevant usage topics. Instead, provide a
  reason for the task and link to the topic.

Refer to [Workflow](building-blocks.md#workflow) for examples.

### General subtopic

Place information about a concept, feature, or subject into general subtopics.
General blocks glue pieces of the documentation together and provide space to
describe how processes and concepts relate to other sections in the topic. You
can embed visual elements and format content as lists, tables, tabs, or any other
form so long as it is consistent with our writing styles and following
principles:

- **Content type**: Overview, concept
- **Modular subtopics that tell a story:** Write subtopics so that they are
  comprehensible to practitioners that scan the page and practitioners that read
  the page from top to bottom. Each general block supports a single aspect of the
  main topic. Arrange the blocks in a logical order on the page. Group and nest
  subtopics in a manner that is consistent with our style guidance.
- **Headings:** Use headings that clearly signal to readers what the subtopic is
  about.

Refer to [General subtopic](building-blocks.md#general-subtopic) for examples.

### Guidance

The guidance block contains links to additional information associated with the
topic area. They are optional sections intended to guide practitioners to
actionable content after reading about an overview or concept page.

- **Be opinionated about the content you link to**: Link to the additional
  concepts, usage pages, reference, and tutorials that you believe would best
  facilitate the target user journey.
- **Be concise:** Use lists to format links as opposed to blocks of prose.
- **Be organized:** Group information into types. For instance, add a heading for
  tutorials related to the topic and add a list of links to the section.
- **Adapt**: Adapt headings to the purpose of the page. For instance, you may
  call the guidance block _Best practices_ in an article in the well-architected
  framework (WAF) because the context for WAF is to list best practices. You may
  need to adapt heading labels and other features, but the purpose of the section
  should remain consistent.

Refer to [Guidance](building-blocks.md#guidance) for examples.
