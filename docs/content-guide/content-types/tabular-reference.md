# Tabular reference pages

Use the tabular reference to organize non-hierarchical information or
information in the same hierarchical plane. Tabular reference pages map to the
Diátaxis **reference** category and may describe several types of data:

- Characteristics associated with a system or component, such as a compatibility
  matrix
- Collections of output data, such as metrics emitted by the product
- Flat or almost flat configuration items, such as CLI options for a command or
  argument

If the reference artifact you are documenting contains structured elements, such
as HCL or the contents of a JSON or YAML file, use the
[structured configuration reference](structured-configuration-reference.md) type
instead.

To start drafting, copy
[templates/tabular-reference.mdx](../templates/tabular-reference.mdx).

## Existing examples

- [Checks configuration reference](https://developer.hashicorp.com/consul/docs/services/configuration/checks-configuration-reference)
- [Required ports](https://developer.hashicorp.com/consul/docs/install/ports)
- [Key metrics](https://developer.hashicorp.com/consul/docs/agent/telemetry#key-metrics)
- [Metrics reference](https://developer.hashicorp.com/terraform/cloud-docs/users-teams-organizations/organizations/metrics#metrics-reference)
- [Audit log reference](https://developer.hashicorp.com/hcp/docs/packer/reference/audit-log)

## North star principles

Make sure that your tabular reference content aligns with the following north
star principles.

### Write for CTRL+F

We expect users to look for information about a specific element using CTRL+F.
Consider the following suggestions to optimize the user's experience:

- Avoid writing documentation that can only be understood by reading from
  beginning to end.
- Ignore page length. Because the content isn't read from beginning to end,
  there's no such thing as a reference page that's too long.
- Be generous in linking to related content. As much as possible, give users an
  escape pod for more info.
- Match language used in product interfaces. For example, if the reference
  describes fields associated with an element then use the exact field names as
  they appear in the interface.

### Reference is canonical

Reference information is complete, accurate, and up-to-date. When an element in
the reference is mentioned in other parts of the documentation, those mentions
should always link to the description in the reference page.

- Be thorough in terms of describing what an item in the reference page is, but
  avoid detailing usage information or veering into conceptual areas. Instead,
  link to appropriate topics.
- The reference should always be the first content updated when documenting a
  change to the product.

## User journeys

Our goal is to create documentation for all audience types, but tabular reference
pages are optimized for the following practitioners.

### Target: Experienced practitioner

- May have experience with the specific component or aspect of the product but
  needs additional details, such as how to interpret metrics or the difference
  between available editions of the product.
- Uses CONTROL/COMMAND+F keys to locate the configuration element on the page.

### Secondary: New user/learner

- Limited experience with the specific component or aspect of the product and
  needs to understand the breadth of functionalities, such as differences between
  available editions of the product.

## Page structure

Tabular reference pages have the following content blocks:

- [Description](#description)
- [Introduction](#introduction)
- [Reference table](#reference-table)

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

### Reference table

You may add one table or several tables depending on the size, shape, and scope
of the content.

The table block describes a group of related components that have common
qualities, such as command line options and flat configuration parameters. Table
blocks have two to five columns and describe non-hierarchical information or
information that is in the same hierarchical plane.

Tables are more efficient than blocks of prose, bulleted lists, or other formats
when describing a large set of related or similar information.

Refer to [Table](building-blocks.md#table) for examples.
