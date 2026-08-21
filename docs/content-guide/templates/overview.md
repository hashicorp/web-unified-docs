# Overview template

## Template

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

If a dedicated how-to page exists, follow the workflow with a [link to refer the reader to the how-to page](https://developer.hashicorp.com).

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

### How-to documentation

Grouping links into lists that align with the order of the workflows on this page and the order of pages in the nav bar.

- [How-to page title](https://developer.hashicorp.com)
- [How-to page title](https://developer.hashicorp.com)
- [How-to page title](https://developer.hashicorp.com)

### Runtime specific how-to documentation

You can also separate how-to docs according to environment, runtime, or other logical segments:

- [How-to page title](https://developer.hashicorp.com)
- [How-to page title](https://developer.hashicorp.com)
- [How-to page title](https://developer.hashicorp.com)

### Reference

The most experienced users want to quickly find the reference information for specific parts of the component they are using. List all relevant reference pages for the topic.

- [Reference page title](https://developer.hashicorp.com)
- [Reference page title](https://developer.hashicorp.com)
- [Reference page title](https://developer.hashicorp.com)

### Constraints, limitations, and troubleshooting

List limitations that inhibit functionality. When creating new content, we typically refer to this section as "constraints and limitations" and update its contents as new features are added. When a release goes GA and all runtimes/environments are supported, you can refer to this section as "Basic troubleshooting".

- List limitations such as constraints on names or operating features simultaneously.
- List alternate approaches for completing how-to tasks (example: Two admin partitions in the same datacenter cannot be peered. Use the `exported-services` configuration entry instead.)
```

## Checklist

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata
- [ ] Opens with a brief intro paragraph describing the topic area and its purpose
- [ ] Summarizes key workflows or use cases to orient the reader
- [ ] Links to all relevant child pages (how-to, concept, and reference) with short descriptions
- [ ] May include contextual prose to explain what to expect as readers progress through the topic
- [ ] Does not contain full procedural steps or deep conceptual explanations — those belong in dedicated how-to or concept docs
- [ ] Organized logically (by workflow order, complexity, or category)
