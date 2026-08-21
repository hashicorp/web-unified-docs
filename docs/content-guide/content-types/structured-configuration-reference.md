# Structured configuration reference pages

Structured configuration references describe keywords, values, defaults, and
other aspects of a HashiCorp configuration item that practitioners must specify
according to a schema or structure. They map to the Diátaxis **reference**
category.

Reference pages describe constructs or system components, similar to a phone book
or encyclopedia, but they don't explain concepts or provide instructions for
implementing the reference information.

If the reference artifact you are documenting is flat or nearly flat, use the
[tabular reference](tabular-reference.md) type instead.

Two templates support this content type:

| Template | Use it for |
| --- | --- |
| [templates/structured-configuration-reference.mdx](../templates/structured-configuration-reference.mdx) | Configurations documented in more than one language, such as HCL, JSON, and YAML |
| [templates/structured-configuration-reference-single.mdx](../templates/structured-configuration-reference-single.mdx) | Single-language configurations, such as Terraform configuration language |

## Existing examples

- [Service resolver configuration entry reference](https://developer.hashicorp.com/consul/docs/connect/config-entries/service-resolver)
- [`data` block configuration reference](https://developer.hashicorp.com/terraform/language/block/data)
- [`tf-migrate` configuration file reference](https://developer.hashicorp.com/terraform/migrate/reference/configuration)

## North star principles

Make sure that your structured configuration reference content aligns with the
following north star principles.

### Write for CTRL+F

We expect users to perform page-level searches for specific constructs or
elements. The following guidance supports this experience:

- Avoid writing documentation that can only be understood by reading from
  beginning to end.
- Repeating some information where relevant is acceptable, even if it's already
  on the page.
- Add links to related content generously.
- Ignore page length. Because the content isn't read from beginning to end,
  there's no such thing as a reference page that's too long or too short.

### Reference is canonical

Reference information is complete, accurate, and up-to-date. When an element in
the reference is mentioned in other parts of the documentation, those mentions
should always link to the description in the reference page.

- Be thorough when describing configuration options, but avoid conceptual and
  usage information.
- When a configuration entity associated with the product changes, always update
  the reference first.

## User journeys

Reference information is usually most helpful for experienced users. These users
may have background information about how a specific element works, but need to
know defaults, data types, and parent or child elements to help them write a
configuration or troubleshoot issues in an existing configuration.

- Looking for details about specific parameters to complete their immediate task.
- Uses CONTROL or COMMAND+F keys to locate the configuration element on the page.
- Focused on understanding how to affect system behaviors.

Product learners, such as people studying for their certification exam, represent
secondary target audiences. These users are looking for general information about
how to use the configuration item as they learn how to use the product.

- Seeking basic information about how to format the configuration item.
- Skims through the content to gain broad understanding and focuses on parent
  parameters for a high-level approach.
- Primarily interested in simple examples they can copy, paste, and adapt to
  their use cases.
- Focused on why the system behaves in a specific way.

## Page structure

Configuration reference pages use content blocks in the following order:

- [Description](#description) (required)
- [Introduction](#introduction)
- [Configuration model](#configuration-model) (required)
- [Complete configuration](#complete-configuration) (required)
- [Specification](#specification) (required)
- [Examples](#examples)

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

The contents of the description block should align with the meta description
field for the markdown file. Refer to [metadata.md](metadata.md) for meta
description patterns, and to [Description](building-blocks.md#description) for
examples.

### Introduction

The introduction block serves one or more of the following purposes:

1. To provide additional context or background about the topic.
1. To summarize main points described on the page.
1. To help users understand how the topic helps them achieve their goals.

Introductions have H2 (`##`) headings and immediately follow the description. You
can omit the introduction section when the page description clearly describes the
topic.

Use one of the following heading types for the introduction section:

| Heading | Description | Example |
| --- | --- | --- |
| Introduction | The general introduction provides additional context to help readers understand why the topic is important. For general-purpose introductions, use an "Introduction" heading. | [Introduction](https://developer.hashicorp.com/hcp/docs/packer/manage/audit-logs#introduction) to enabling audit log streaming in HCP Packer |
| Background | For topics that require significant background knowledge, use the "Background" heading for the introduction. Background-oriented introductions focus on how the topic relates to other processes or concepts, as opposed to highlighting its importance. | [Background](https://developer.hashicorp.com/consul/docs/deploy/server/vm/bootstrap) for bootstrapping a Consul server |
| Overview | Use an "Overview" heading to orient users to the process the page describes. Overviews focus on summarizing the contents of the topic, as opposed to highlighting its importance or providing background information. | [Overview](https://developer.hashicorp.com/terraform/mcp-server/deploy/local#overview) of deploying a local MCP server |

Refer to [Introduction](building-blocks.md#introduction) for examples.

### Configuration model

The configuration model is a table of contents that lists constructs available in
the configuration artifact. The model links to more detailed descriptions in the
specification, communicates hierarchical information, and provides information
about each construct, such as data type, default value, and whether it's
required. Each entry presents the following information:

- **Name of the element**: Use code font and link to the detailed description in
  the specification block.
- **Data type**: Conform to the data types specified in the
  [HCL documentation](https://developer.hashicorp.com/terraform/language/expressions/types#types).
  Add clarity or specify a type subset as necessary. For example, "list of
  strings" is acceptable.
- **Default value**: Include the default value if there is one, otherwise omit.
- **Required**: Ignore if the element is optional, otherwise use "Required".
- **Enterprise**: Use the `<EnterpriseAlert inline/>` flag if applicable.

#### Format

The design principles for the configuration model are standard, but the actual
format differs across products. Additionally, the format of the configuration
model is tightly coupled to the format of the specification. This is because we
rely on the automatic anchors headings create in Markdown. To ensure effective
links, use unique headers. For example, if `ElementA` is "Failover" and you want
to include a failover configuration example, the example heading cannot be the
single word "Failover".

For products that document HCL and JSON, use the following model format:

```mdx
- [`ElementA`](#elementa): data type | default | required
- [`ElementB`](#elementb): data type | default
  - [`ElementC`](#elementc): data type | default
  - [`ElementD`](#elementd): data type | default
    - [`ElementE`](#elemente): data type | default
    - [`ElementF`](#elementf): data type | default
      - [`ElementG`](#elementg): data type | default
```

Infrastructure products are only required to document HCL, so many of the
formatting complexities do not apply. Use the following template for
configuration models in infrastructure documentation:

```mdx
- [`elementA`](#elementa) &nbsp data type | default | required
- [`elementB`](#elementb) &nbsp data type | default
  - [`elementC`](#elementc) &nbsp | default
  - [`elementD`](#elementd) &nbsp data type | default
    - [`elementE`](#elemente) &nbsp data type | default
    - [`elementF`](#elementf) &nbsp data type | default
      - [`elementG`](#elementg) &nbsp data type | default
  - [`elementH`](#elementh) &nbsp data type | default
  - [`elementI`](#elementi) &nbsp data type | default
```

#### Tabs

If the configuration you are documenting has a different format or syntax for
different runtimes or environments, such as HCL on VMs and YAML on Kubernetes,
use markdown tabs to represent both syntaxes. You must also create corresponding
tabbed sections for the specifications and the example configurations.

Use the `<Tab>` component, and include both `heading` and `group` attributes in
the tag, for example `<Tab heading="YAML" group="yaml">`.

Note that HCL and JSON are sometimes grouped together as a heading. In these
instances, you should still use the `"hcl"` group label to ensure effective tab
grouping.

#### Links to tables

When an element contains a flat list of child elements, you can document the
child elements as part of its parent in a table per guidance for the
specification block. In these cases, the parent and child elements should link to
the parent heading in the specification.

### Complete configuration

The complete configuration block contains a single, fully-configured code block
for a configuration item. It is intended to provide the information communicated
in the configuration model in a form that readers can copy, paste, and update
with values for their environments.

- The complete configuration is for demonstrative purposes only and does not
  communicate real world scenarios or logical patterns for more complicated
  configurations. Those configuration examples should be implemented in the
  "Examples" section under clearly labeled headings.
- This configuration communicates hierarchy and data types implicitly and uses
  comments to bring key information about required fields and mutually exclusive
  configuration items into the code editor when copied and pasted.

Refer to
[Complete configuration](building-blocks.md#complete-configuration) for
additional information and examples.

### Specification

The specification section is a flattened list of elements described in the
configuration model. It contains the details of how to configure the elements in
the configuration item.

If the configuration item you are documenting has a different format or syntax
for different runtimes or environments, use markdown tabs to represent both
syntaxes. The tabs must correspond to entries in the configuration model.

#### Format

The following guidance applies to all configuration artifacts:

- Use an H2 tag (`##`) and "Specification" for the section header.
- Introduce the section and use H3 tags (`###`) for each element heading.
- Use code font for H3 element headings.
- Provide thorough descriptions to help readers understand what the configuration
  element does and how it works.
- Link to usage or conceptual information as necessary, but do not mix content
  types.

#### Dot-notation headings

Configuration items frequently reuse parameter names at several hierarchical
levels, which can be confusing to users using COMMAND/CONTROL+F to locate
information about specific elements. Use dot-notation to format headings for
element names in the specification. Dot-notation is a visual representation of
the relationship between parent and child elements that disambiguates between
elements that have the same name at different levels of the hierarchy and ensures
that links in the configuration model function as designed.

- **Use periods to separate parameter hierarchy**: `ElementA.ElementB` states
  that Element B is a child of Element A, while `ElementA.ElementB.ElementC`
  states that Element C is a child of Element B.
- **Use square brackets to identify lists in HCL:** `ElementA[].ElementB` states
  that Element B is a member of the Element A list.
- **Use curly braces to identify maps in HCL:** `ElementA{}.ElementB` states that
  Element B is an object within the Element A map.

For example, in a service resolver configuration entry, the `Failover` parameter
is a map. Its heading omits punctuation and is represented as `Failover`.
`Failover` has a child element named `Targets`. The resulting heading is
formatted as `Failover{}.Targets`. The `Targets` parameter contains a _list_ of
configurations, one of which is `Service`. As a result, the `Service` parameter
is formatted as `Failover{}.Target[].Service`.

Punctuation marks do not affect hyperlinks in the configuration model. In our
documentation's markdown, punctuation cannot be used in page anchors, so it is
interpreted as dashes. As a result, the anchor `#failover-target-service` links
to the `Failover{}.Target[].Service` heading automatically.

For YAML specifications, many parameters are children of the `spec` block, so you
just add `spec` to the beginning of most parameters. Additionally, YAML uses
square brackets to indicate lists, but does not always use curly braces to
indicate maps. As a result, do not use curly braces in YAML notation. Use square
brackets only.

#### Values

Each description has a "Values" section, formatted with an H4 tag (`####`), that
lists the following information:

- Default value
- "This field is required" (when required — omit otherwise)
- Data type

The default value refers to the value of the parameter, not its behavior. If a
value is an empty string by default, its default value is "None," even if it
inherits a name from another field.

Use data types as described in the
[HCL data types and values](https://developer.hashicorp.com/terraform/language/expressions/types)
documentation, but use the specific data type implementation if necessary. For
example, specify "Integer" or "Float" if "Number" is too general. HCL does not
distinguish between integers and floats, but other languages may require
specificity.

Spell out the data type (Boolean instead of `bool`). Prefer "list" and "map" over
"tuple" and "object".

List sub-values under "data type." List only one nested level of fields. Use an
unordered list, code font, and link to the relevant sections.

#### Descriptions

Write thorough descriptions to help readers understand what the configuration
element does and how it works. The following list is the preferred order of the
kinds of information that a description may need to communicate:

1. A sentence that describes the information the user specifies in the field,
   including default units of measurement if applicable.
1. Requirements for the field's value.
1. The field's default value and the default behavior that value produces.
1. Other fields that are required when using this field.
1. Other fields whose use is mutually exclusive with using this field.
1. Additional parameters that must be configured (intentions, ACLs, etc).
1. Expected system and component behaviors when the field is configured or
   ignored.
1. Expected inverse behavior or alternate steps to implement inverse behavior.
1. Use cases where the field is required.
1. Additional clarification.
1. Links to HashiCorp documentation.
1. Links to third party documentation.

If relevant, include a sentence linking to an example configuration in the
"Examples" section.

#### Tables

You can use lists, tables, or other formatting elements in the description to
help make the information easier to consume. In some cases, you can group the
child elements into a table instead of listing them out as separate entries in
the specification. Tables work best in the following instances:

- When the children are tightly coupled, such as `port` and `address` within
  `destination` configuration, so that it makes more sense to list them together
  than separately.
- When the children are used to define opposing configurations, either-or
  behavior, or define a range of values.
- When the children are at the lowest level of the hierarchy.

In the following example from the service resolver configuration entry reference,
the children define a range and are easier to understand in the same table:

| Parameter | Description | Data type | Default |
| --- | --- | --- | --- |
| `MinimumRingSize` | Determines the minimum number of entries in the hash ring. | Integer | `1024` |
| `MaximumRingSize` | Determines the maximum number of entries in the hash ring. | Integer | `8192` |

In the following example, the child parameters are listed under
`LoadBalancer{}.HashPolicies[].CookieConfig` and help users understand how they
work together to define cookie hash policy:

| Parameter | Description | Data type | Default |
| --- | --- | --- | --- |
| `Session` | Directs Consul to generate a session cookie with no expiration. | Boolean | `false` |
| `TTL` | Specifies the TTL for generated cookies. Cannot be specified for session cookies. | String | `0s` |
| `Path` | Specifies the path to set for the cookie. | String | None |

### Examples

The examples section contains example configurations that enable you to achieve a
specific use case.

- Add examples to reference topics where a user would need to produce their own
  artifact or perform an operation, such as configuration and CLI references.
- The Examples section is an H2 level block, but each example is an H3 level. Use
  a descriptive heading for each use case that adheres to the style guide.
- Preface each example with a detailed and descriptive sentence or paragraph that
  states what the example does. Call out configuration elements to help users
  understand which fields drive the behaviors.
- Examples aren't exhaustive. When additional conditions are necessary, describe
  them when introducing the example and link to appropriate topics as necessary.

Refer to [examples.md](examples.md) for additional guidance.

## Maintenance

When updating an existing reference page, use the following checklist to ensure
that changes are correctly documented across all tabs.

### New parameter

- Add the parameter to the two configuration model tabs.
- Add the parameter to the three full configuration tabs.
- Add parameters to appropriate tables or make new sections (both tabs).
- Optionally, add a section with an example config demonstrating how the
  parameter is used. The example should be in three languages (HCL, JSON, and
  YAML).

### Update to existing parameter

- Make changes in the two configuration model tabs.
- Make the change to the three complete configuration tabs.
- Make the change in section titles and tables (both tabs).
- Make the change in the three example tabs.
- Confirm links and anchors. Search for the `#anchor` and check each one.
