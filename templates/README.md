# HashiCorp Documentation Content Types

This directory contains templates for different content types used across HashiCorp documentation. These templates are based on the [Diátaxis framework](https://diataxis.fr/) and adapted for HashiCorp's documentation needs.

## Content Type Overview

| Diátaxis Category | HashiCorp Content Type | Template File | Description |
|-------------------|------------------------|---------------|-------------|
| **Tutorial** | Tutorial | _(managed by Education)_ | Hands-on activities that teach product features through scenarios with code examples. New users complete tutorials as their first step in learning. Owned by Education Engineers. |
| **How-to Guide** | Usage | [`usage.mdx`](./usage.mdx) | Instructions for completing a single procedure or tightly-coupled set of procedures. Does not include environment setup code. |
| **Explanation** | Overview | [`overview.mdx`](./overview.mdx) | Landing pages that guide practitioners to detailed usage, reference, or concept pages. Explains workflows and what to expect. |
| **Explanation** | Concept | [`concept.mdx`](./concept.mdx) | Describes constructs and abstractions associated with a product, including internals, subjects, and features. |
| **Explanation** | What Is | [`what_is.mdx`](./what_is.mdx) | Introduces products, sub-products, and complex workflows to describe how functionality works. |
| **Reference** | Configuration Reference | [`configuration_reference.mdx`](./configuration_reference.mdx) | Structured references describing keywords, values, defaults, and other aspects of configuration items. |
| **Reference** | Tabular Reference | [`tabular_reference.mdx`](./tabular_reference.mdx) | Organizes non-hierarchical information like flat configuration items, error codes, or metrics. |
| **Reference** | Core Reference | [`reference.mdx`](./reference.mdx) | Product-supporting information including technical specifications, error messages, troubleshooting procedures, benchmarking data, and best practices. |
| **Reference** | CLI Reference | [`cli_reference.mdx`](./cli_reference.mdx) | Specialized template for documenting CLI command options and usage. Designed for consistency between website docs and binary-shipped content. |
| **Reference** | API Reference | _(in development)_ | Specialized template for documenting HTTP API options and usage. |

## Content Type Details

### Tutorial
**Diátaxis Category:** Tutorial (Hands-on activity that teaches)

Tutorials demonstrate how to use product features and capabilities to complete a goal. They contain scenarios, including code for instantiating environments to operate the product in, so that they can quickly and clearly demonstrate the value of a feature or set of features.

We expect new users to complete a tutorial as the first step toward learning how to use a HashiCorp tool.

**Note:** The tutorial content type is owned and managed by Education Engineers.

### Usage
**Template:** [`usage.mdx`](./usage.mdx)  
**Diátaxis Category:** How-to Guide (Instructions on how to complete a task)

Usage pages describe a single procedure or a tightly-coupled set of procedures that enable you to perform a unit of work. Unlike tutorials, usage pages do not provide code or instructions for creating an operating environment. Usage pages are synonymous with user guides.

### Overview
**Template:** [`overview.mdx`](./overview.mdx)  
**Diátaxis Category:** Explanation (Discursive lecture about a topic)

Overview pages are landing pages that funnel practitioners to more detailed usage, reference, or concept pages. They help practitioners understand workflows associated with the functionality and what to expect as they progress through related topics.

### Concept
**Template:** [`concept.mdx`](./concept.mdx)  
**Diátaxis Category:** Explanation (Discursive lecture about a topic)

Concept pages describe constructs and abstractions associated with a HashiCorp product. For the purpose of segmenting information into types, internals, subjects, and features are synonymous with concepts.

### What Is
**Template:** [`what_is.mdx`](./what_is.mdx)  
**Diátaxis Category:** Explanation (Discursive lecture about a topic)

Introduces products, sub-products, and some kinds of workflows to describe how complex functionality works.

### Configuration Reference (Structured Reference)
**Template:** [`configuration_reference.mdx`](./configuration_reference.mdx)  
**Diátaxis Category:** Reference (Technical description of an entity)

Structured references describe keywords, values, defaults, and other aspects of a HashiCorp configuration item.

### Tabular Reference
**Template:** [`tabular_reference.mdx`](./tabular_reference.mdx)  
**Diátaxis Category:** Reference (Technical description of an entity)

Tabular reference pages organize non-hierarchical information. They can describe flat or nearly-flat configuration items, error codes, metrics emitted by a product, or other reference information.

### Core Reference
**Template:** [`reference.mdx`](./reference.mdx)  
**Diátaxis Category:** Reference (Technical description of an entity)

Describes product-supporting information, such as:
- Technical specifications
- Single error messages
- Groups of related error messages
- Troubleshooting procedures
- Benchmarking data
- Collections of best practices

### CLI Reference
**Template:** [`cli_reference.mdx`](./cli_reference.mdx)  
**Diátaxis Category:** Reference (Technical description of an entity)

Specialized template for documenting CLI command options and usage.

The CLI content type represents a repeatable design for ensuring that the documentation published to the website is consistent with the content shipped with the binary.

In the long term, we should be able to implement the template as part of the source files so that we can publish documentation to the website directly from the code.

### API Reference
**Diátaxis Category:** Reference (Technical description of an entity)

Specialized template for documenting HTTP API options and usage.

**Note:** Guidance on API reference is still in development.

## Using These Templates

1. Choose the appropriate template based on the content type you need to create
2. Copy the template file to your content directory
3. Follow the structure and guidance provided in the template
4. Refer to the [HashiCorp style guide](../docs/style-guide/) for writing conventions

## Additional Resources

- [Diátaxis Framework](https://diataxis.fr/)
- [HashiCorp Documentation Style Guide](../docs/style-guide/)
- [Content Guide](../docs/content-guide/)