# Content types

The content we create and host on developer.hashicorp.com follows the principles of the [Diátaxis method for structured documentation](https://diataxis.fr/), which use the following basic content types:

- Explanation
- Usage
- Reference
- Tutorials

Because tutorials are hosted in a separate repository, this README focuses on the first three content types.

Within the "Explanation" category, we use three different types of pages, each of which has a distinct purpose.

- **Index** pages provide lists of links to supporting documentation on a subject. [Example: Deploy Consul](https://developer.hashicorp.com/consul/docs/deploy)
- **Overview** pages provide an introduction to a subject and serve as a central information point. [Example: Expand service network east/west](https://developer.hashicorp.com/consul/docs/east-west)
- **Concept** pages provide discursive explanations of Consul's underlying systems and their operations. [Example: Consul catalog](https://developer.hashicorp.com/consul/docs/concept/catalog)

HashiCorp employees may refer to the [internal Technical Writing
wiki](https://hashicorp.atlassian.net/wiki/x/eYBVnw) for detailed explanations.

## Page templates

### Usage template

```markdown
---
page_title: Match the H1 and nav title 
description: |-
  Include target keywords and keyword phrases so that users can easily search. 
---

# Title

Explain what the topic is about. 

## Requirements

The requirements block describes the following information necessary to operate the product: 

- system
- environment
- software requirements
- product version: Note that because we have versioned docs, specifying the core product version is not as important as version requirements for ancillary software, such as `kubectl`.

## Steps

Depending on the context, you can either add an introduction statement about the procedure or begin describing the procedure directly.

1. If the procedure describes a series of commands, we recommend setting environment variables as the first step so that you can use the variable name in subsequent commands. In some cases, you can place the response or output into the same code block. Always link to the relevant [reference documentation](link):

   <COMMAND>
   <RESPONSE>

   Provide any additional context about the step as either a new paragraph in the step or as a list nested within the step.

1. The next step may require the user to configure a file. Always link to the relevant [reference documentation](link). Use appropriate code blocks as necessary:

   <CodeBlock>


   </CodeBlock>

1. The final step may require another command. Always link to the relevant [reference documentation](link):

   <COMMAND>

   If the response or outcome requires additional explanation, describe it as part of the step:

   <RESPONSE>

## Next steps

Introduce related tasks that either enhance this topic or are necessary to achieve a larger goal. Next steps link to other usage pages, rather than additional conceptual or reference information. 

```

### Concept template

```markdown
---
page_title: Page title matches the H1 page title 
description: |-
  Learn about the {topic} concepts for using {product}. As needed, include a second sentence that elaborates on the concept.
---

# Page title for Concepts (short) content

The first paragraph of the first block is the page description. It introduces the topic for the page by summarizing the content the page contains. Because this page exists to explain related terms, this sentence should describe the overarching idea that bridges these terms.

## Context

The optional context block introduces the concept by explaining the relationship between the product and the concept. It may contain information about the concept in the larger cloud computing and networking field, so that practitioners can begin conceptualizing nuances between similar constructs.

When using a context block, always place it immediately after the description and use an H2 (##) heading. Use one of the three following labels for the title of this section, based on the kind of context you provide:

- **Introduction**: Introduces terms, constructs, architectural components, and workflows to help a user understand a concept and its importance
- **Background**: Provide historical or situational context, especially in the context of a product's release history and available features

## Concept 1

*Concept* is defined in the first sentence. The second sentence explains the concept's overall importance to the product. The third sentence provides additional information.

If necessary, use multiple paragraphs to explain the concept. [Link to other concepts on the page](#concept-2) or link to [other documentation resources](https://developer.hashicorp.com) as needed.

## Concept 2

Treat concept pages as the reference section for ideas and constructs associated with HashiCorp product. Other content types should link to concept pages for information. Be concise but thorough.

## Concept 3

You can include images or diagrams as necessary to explain concepts. Always include text before the image to introduce it.

![Include descriptive alt text for the image](/public/img/example.png)

Always include at least one sentence after an image that explains or provides additional context for the image.
```

### Overview template

```markdown
--- 
Page_title: Overview topic template
Description: |-
  {Feature or thing} is {description of what it is} that you can use to {list of things verbs corresponding to feature permutations}. Learn how {feature} can help you {user goals}.
---

# Overview topic template

The first paragraph describes the page's content.

## Introduction

Introductory blocks are optional and may not be necessary for your overview page. If applicable, describe why the topic area is important in the introductory block. 

## Workflows

Use this section to summarize the main usage steps associated with the topic area. The topic area you are introducing may have a simple workflow, a complex set of workflows, or multiple related but separate workflows.
 
### Primary workflow

The overall process for {end goal of workflow} consists of the following steps.

1. First action users take complete this workflow. When using multiple sentences, keep the first sentence short and action-oriented, then elaborate in the second sentence.
1. Second action for completing this workflow. Try to keep workflow steps symmetrical, so if you use two sentences for one step, use two sentences for the other steps.
1. Final action common to the workflow. After this action, users will take actions specific to their organization or operational needs.

If a dedicated usage page exists, follow the workflow with a [link to refer the reader to the usage page](https://developer.hashicorp.com).

### Alternative or secondary workflow

To {achieve a secondary goal}, complete the following steps:

- Describe the first action users would need to undertake to complete this workflow.     
- Second action for completing this workflow.
- Final action.

## General subtopic

You may need to describe additional characteristics about topic area. 

### Nested subtopic

Group information into logical sections. 

### Nested subtopic 

- Use a bulleted list when describing three or more components.
- Use diagrams, video, and other media as necessary.       
- Use subheadings to segment and organize information.

## Guidance

Some users land on an overview page and do not know where to go next. Use this section to link to topics that help get started.

### Tutorials

- To learn how to {do what the tutorial describes}, complete the [Name of tutorial](https://link-to-tutorial).
- To learn how to {do what the tutorial describes}, complete the [Name of tutorial](https://link-to-tutorial).

### Usage documentation

Grouping links into lists that align with the order of the workflows on this page and the order of pages in the nav bar.

- [Usage page title](https://developer.hashicorp.com)
- [Usage page title](https://developer.hashicorp.com)
- [Usage page title](https://developer.hashicorp.com)

### Runtime specific usage documentation

You can also separate usage docs according to environment, runtime, or other logical segments:

- [Usage page title](https://developer.hashicorp.com)
- [Usage page title](https://developer.hashicorp.com)
- [Usage page title](https://developer.hashicorp.com)

### Reference

The most experienced users want to quickly find the reference information for specific parts of the component they are using. List all relevant reference pages for the topic.

- [Reference page title](https://developer.hashicorp.com)
- [Reference page title](https://developer.hashicorp.com)
- [Reference page title](https://developer.hashicorp.com)

### Constraints, limitations, and troubleshooting

List limitations that inhibit functionality. When creating new content, we typically refer to this section as "constraints and limitations" and update its contents as new features are added. When a release goes GA and all runtimes/environments are supported, you can refer to this section as "Basic troubleshooting".

- List limitations such as constraints on names or operating features simultaneously.
- List alternate approaches for completing usage tasks (example: Two admin partitions in the same datacenter cannot be peered. Use the `exported-services` configuration entry instead.)
```

### Reference templates

For configuration, CLI, API, and other reference content, find an existing page
in your product's content and use that as a template.
