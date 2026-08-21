# Usage pages

Usage pages, also called **user guides** or **how-to guides**, describe a
procedure or a tightly-coupled set of procedures that enable you to perform a
unit of work. They map to the Diátaxis **how-to guides** category.

Unlike tutorials, usage pages do not provide code or instructions for creating
an operating environment.

For examples of usage pages that implement these guidelines, refer to the
following:

- [Establish cluster peering connections](https://developer.hashicorp.com/consul/docs/connect/cluster-peering/usage/establish-cluster-peering)
- [Create a service token](https://developer.hashicorp.com/consul/docs/security/acl/tokens/create/create-a-service-token)
- [Manage actions](https://developer.hashicorp.com/terraform/cloud-docs/actions)
- [Configure workers for session recording](https://developer.hashicorp.com/boundary/docs/session-recording/configuration/configure-worker-storage)

To start drafting, copy [templates/usage.mdx](../templates/usage.mdx).

## North star principles

Make sure that your usage content aligns with the following north star
principles.

### Write discrete and complete topics

You may need to incorporate additional context, but you should create topics
that can function as standalone instructions for leveraging a discrete unit of
functionality. Target a single goal or use-case per page. Describe pattern
variations as examples for the primary use-case, but do not combine multiple
use-cases into a single page.

#### Practical implications

The outcome may be a standalone artifact, change to the software configuration,
or multiple configuration changes that enable a use case or discrete part of a
use case. In some instances, the outcome may be the input for a related
procedure. Right-sizing your topics is an art that involves anticipating user
search topics, understanding how the product works, and describing functionality
according our product messaging.

We expect practitioners to search on "how do I . . . " phrases. The search engine
results should direct people to either a page that describes the procedure or
page that describes a modular step of the procedure. AI summaries should be able
to coherently source from the page.

When the topic relies on additional usage information, link to the related topics
where appropriate. For example, describe the requirements and prerequisites
necessary to complete the task, but link to additional procedures for
instructions on how to achieve the required state. Similarly, list and describe
settings, commands, and other elements that are part of the usage page, but link
to the detailed references and conceptual information described elsewhere in the
documentation.

## User journeys

Our goal is to create documentation for all audience types, but usage pages
target intermediate users. These users may have either completed a tutorial,
reviewed a relevant overview page, or both and want step-by-step instructions to
help them quickly complete a task.

- Thorough and accurate instructions are most important.
- Example commands or code snippets are important enhancements to the main
  content.
- Expects the topic to either match their use case, contain their use case as a
  subtopic, or be adaptable to their use case.
- How-oriented.

Experienced users are your secondary target. They are familiar with the task and
want to verify their knowledge before taking action.

- Clear headings that facilitate skimming are most important.
- Examples are important components that may replace some of the main content.
- More inclined to recognize linked configuration or concept pages that may be
  useful for their immediate purpose.

## Page structure

Usage pages have the following content blocks:

- [Description](#description)
- [Introduction](#introduction)
- [Requirements](#requirements)
- [Instructions](#instructions)
- [Next steps](#next-steps)

## Content block guidance

This section describes the individual content blocks, including when and how to
use them. It also provides formatting guidance and suggestions.

### Description

The first section is the description block. It introduces the topic or topic
area that the page is about and clearly states the purpose of the page. **The
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

### Requirements

Add a **requirements** or **prerequisites** block to describe systems, software,
permissions, or other entities practitioners must implement to complete the task
as described in the topic. Describe prerequisites, constraints, or any other
conditions or operating parameters in this block.

By organizing the requirements necessary to perform the operations or
sub-operations into a single location, you help reader prepare their environments
to perform the tasks described in the topic.

- Add requirements to usage pages.
- Place requirements between the overview and instructions.
- **Requirements** is the general category, but you can use **Prerequisites** for
  the heading when it is more appropriate for the context. Requirements describe
  conditions that are required to proceed, whereas prerequisites describe steps
  you must take prior to proceeding.
- Group related requirements into H3 (`###`) headings under the main
  **Requirements** H2 (`##`) heading.

Refer to [Requirements](building-blocks.md#requirements) for examples.

### Instructions

Instructions describe the actions practitioners must take to complete a discrete
task. Place the instructions after the requirements section.

Some topics provide instructions as a single list of steps, while some topics
describe multiple sub-procedures, each with their own list of steps. Logically
group related steps into sub-procedures.

- Use ordered lists. It is easier to consume step-by-step information, as well as
  reference previous steps, when it is formatted into numbered lists.
- When doing so improves clarity, explicitly introduce the purpose of the steps.
  Add a results or outcome statement at the end of the procedure as necessary.
- Place elements, such as example commands or additional explanation about a
  step, on new lines in the same step.
- Link to the relevant reference documentation associated with a step in the
  procedure.
- Describe a sequence of actions that result in a discrete output. The output may
  be a configuration end-state, artifact, or input for another action.
- Use examples to show how to perform a step, such as running commands and
  calling API endpoints. Do not include example configurations, which should be
  placed in configuration reference pages.

Refer to [Instructions](building-blocks.md#instructions) for
examples.

### Next steps

The next steps block is a collection of resources at the end of a usage page that
directs users to related topics. By itself, the instructions in a usage page may
not be the end result that the practitioner wants. Link to additional content in
the next steps block to help practitioners achieve their broader goals. You can
either format next steps as blocks of prose or as an ordered or unordered list.

The next steps block is optional, so if you believe that the related tasks are
obvious based on the audience profile, context of the page, or the page's
position in the navigation, omit the next steps block. This is to reduce the
maintenance burden if topics move or if processes become consolidated in later
versions of the product.

Refer to [Next steps](building-blocks.md#next-steps) for examples.
