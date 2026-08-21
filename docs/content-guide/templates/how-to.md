# How-to template

## Template

```markdown
---
page_title: Match the H1 and nav title 
description: |-
  {Feature} to {things you can do with the feature}. Use {feature} to {user-focused goal}.
  Learn how to {user-focused goal} with {feature or topic}.
---

# Title

Explain what the topic is about. 

## Requirements

The requirements block describes the following information necessary to operate the product: 

- system
- environment
- software requirements
- product version: Note that because we have versioned docs, specifying the core product version is not as important as version requirements for ancillary software, such as `kubectl`.

Requirements and prerequisites are not the same thing: requirements are conditions that must
already hold true to proceed (for example, "a running Kubernetes cluster"), while
prerequisites are steps the reader must complete first (for example, "install `kubectl`").
Group related requirements or prerequisites under an `###` subheading when there are several.

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

Introduce related tasks that either enhance this topic or are necessary to achieve a larger goal. Next steps link to other how-to pages, rather than additional conceptual or reference information.

```

## Checklist

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata
- [ ] Title is action-oriented (describes the task the reader will complete)
- [ ] Brief intro paragraph states the goal
- [ ] `## Requirements` section lists system, environment, and software prerequisites (may be absent if the doc has no meaningful prerequisites)
- [ ] Distinguishes requirements (conditions that must already hold) from prerequisites (steps the reader must complete first), rather than conflating the two
- [ ] Procedural content uses numbered steps, grouped under a `## Steps` heading or concrete action-oriented subheadings (for example, `## Configure the agent`, `## Deploy the service`)
- [ ] Does not over-explain concepts — stays task-focused
- [ ] Uses inline command/API examples to support individual steps, not a standalone Examples section — full, standalone example configurations belong on the matching reference page, not duplicated here
- [ ] `## Next steps` section links to related how-to pages (optional but encouraged)
- [ ] Optional but encouraged: troubleshooting section at the end
