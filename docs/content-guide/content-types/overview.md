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

The description block introduces the topic and states the page's purpose. It is
required on every page type. Aim for approximately 60 words, and keep it aligned
with the page's `description` frontmatter field.

Refer to [Description](building-blocks.md#description) for the full guidance and
examples, and to [metadata.md](metadata.md) for meta description patterns.

### Introduction

The introduction block adds context or background, summarizes the main points, or
connects the topic to the reader's goals. Omit it when the description already
covers the topic. Use "Introduction", "Background", or "Overview" for the
heading, depending on the kind of context you provide.

Refer to [Introduction](building-blocks.md#introduction) for the heading options,
the full guidance, and examples.

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

General subtopics hold information about a concept, feature, or subject, and
connect the parts of a page to each other. Use headings that clearly signal what
each subtopic covers, and keep each one focused on a single aspect of the main
topic.

Refer to [General subtopic](building-blocks.md#general-subtopic) for the full
guidance and examples.

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

## Writing style

Content types organize information. For word choice, formatting, headings,
links, and other page-level rules, refer to the
[style guide](../../style-guide/index.md), starting with the
[top 12 guidelines](../../style-guide/top-12.md).

For calling out paid editions and pre-GA releases on this page type, refer to
[Use an enterprise alert to create a partial that calls out paid edition considerations on overview and concept pages](../../style-guide/general/enterprise-releases.md#use-an-enterprise-alert-to-create-a-partial-that-calls-out-paid-edition-considerations-on-overview-and-concept-pages).
