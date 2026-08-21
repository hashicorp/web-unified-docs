# Concept template

## Template

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

## Checklist

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata
- [ ] Opens with a clear definition or "what is X" statement
- [ ] Uses prose paragraphs, not numbered steps
- [ ] Explains *why* something exists or works the way it does
- [ ] Links to related tutorials or how-to guides for hands-on follow-up
- [ ] Does not include step-by-step instructions
