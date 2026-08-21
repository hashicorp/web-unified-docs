# Metadata

The page title and meta description for each file is very important for helping
users find information relevant to their tasks.

The page title should mirror the navigation text and the H1 (`#`) heading on the
page. Meta descriptions should include keywords and keyword phrases associated
with the title. Strive to include alternate keywords, such as "CTS" and "Consul
Terraform Sync", in the description. You should also strive for a description
that is 130 to 160 characters long.

Use the following templates to help you construct useful meta descriptions:

| Content type | Template |
| --- | --- |
| [Concept](concept.md) | Learn how {concept} enables {product} to {what it does}. |
| [Overview](overview.md), [What is](what-is.md) | {Feature or thing} is {description of what it is} that you can use to {list of verbs corresponding to feature permutations}. Learn how {feature} can help you {user goals}. |
| [Usage](usage.md) | {Feature} to {things you can do with the feature}.<br />Use {feature} to {user-focused goal}.<br />Learn how to {user-focused goal} with {feature/topic}. |
| Reference — general, configuration, language elements, metrics, support | Use {reference topic} to {thing you, the user, do}. Learn how {what the reference page contains}. |
| [Reference — CLI](cli-reference.md) | The {full command} command {what it does, phrased in active voice}. |
| Reference — API | Use the {/full/endpoint/address} to {what you can do from the endpoint} using the HTTP API. |

Frontmatter uses lowercase keys. Every `.mdx` page requires both:

```mdx
---
page_title: Match the H1 and nav title
description: |-
  Front-load descriptions with target keywords and keyword phrases so that users
  can easily search.
---
```
