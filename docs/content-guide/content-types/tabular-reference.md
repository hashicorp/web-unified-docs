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
- [Agent telemetry metrics](https://developer.hashicorp.com/consul/docs/reference/agent/telemetry)
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

## Writing style

Content types organize information. For word choice, formatting, headings,
links, and other page-level rules, refer to the
[style guide](../../style-guide/index.md), starting with the
[top 12 guidelines](../../style-guide/top-12.md).

For calling out paid editions and pre-GA releases on this page type, refer to
[Use inline alerts when calling out edition considerations on reference pages](../../style-guide/general/enterprise-releases.md#use-inline-alerts-when-calling-out-edition-considerations-on-reference-pages).
