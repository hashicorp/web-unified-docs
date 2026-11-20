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

## Writing style

Content types organize information. For word choice, formatting, headings,
links, and other page-level rules, refer to the
[style guide](../../style-guide/index.md), starting with the
[top 12 guidelines](../../style-guide/top-12.md).

For calling out paid editions and pre-GA releases on this page type, refer to
[Describe edition and pricing considerations in the requirements section for topics that provide instructions](../../style-guide/general/enterprise-releases.md#describe-edition-and-pricing-considerations-in-the-requirements-section-for-topics-that-provide-instructions).
