# What is template

A "What is" page is a top-of-funnel landing page for a product or sub-product. Use it to
describe what the product does and why a reader should care, before they've decided to use
it. This is a different job from Overview (see [overview.md](overview.md)): Overview pages
orient readers who are already navigating between usage, reference, and concept pages within
a topic area; What-is pages answer "why would I use this product at all?" for a reader who
hasn't made that decision yet.

## Template

```markdown
---
page_title: What is {Product}?
description: |-
  Brief summary of the tool and its purpose, 150 characters or less. Start with
  "{Product} is…"
---

# What is {Product}?

1-3 sentences describing the product and its main benefits.

> **Hands-on**: Complete the [Tutorial title](URL) tutorial to help you learn how to {topic}.

## How does {Product} work?

Briefly explain how the product delivers the benefits mentioned in the introductory
sentences.

Describe how practitioners and other key user groups use the product at a high level.
Define key user workflows and explain how the product communicates with other parts of the
broader ecosystem (cloud providers, CI/CD pipelines, databases, and so on).

If the product is complex, briefly discuss use cases or provide an example scenario that
illustrates the product's benefits.

Include at least one visual aid to illustrate key workflows or data flows between the
product and its ecosystem. Provide descriptive alt text for accessibility.

## Why {Product}?

List the main product benefits as section titles structured as action statements. Under
each heading, briefly explain the product features that help users achieve these benefits,
and link to the relevant reference documentation where possible. Always provide context for
product-specific jargon like feature names.

(Optional) Include an explanatory video if one exists for the product.

## {Description of paid offerings}

Optional. Explain the product's paid tiers or editions and link to pricing or more
information. Omit this section if tiers or editions don't exist for the product, or if they
already have their own dedicated page.

## Community

Link to where users can ask questions, contribute to the product, and submit bugs or
feature requests.
```

## Checklist

- [ ] Frontmatter includes `page_title`, `description`, and any required metadata;
      `description` starts with "{Product} is…" and is 150 characters or less
- [ ] Title is a question that mimics what users search for (`# What is {Product}?`)
- [ ] Uses industry-standard, practitioner-facing vocabulary — avoids flowery language or
      hyperbole
- [ ] Section headings lead with user goals, not product features (for example,
      "Standardize configurations" rather than "Custom modules")
- [ ] Includes a `> **Hands-on**:` blockquote linking to an introductory tutorial, if one exists
- [ ] `## How does {Product} work?` includes at least one visual aid with descriptive alt text
- [ ] `## Why {Product}?` links to reference documentation for each benefit where possible
- [ ] Does not include step-by-step instructions or deep conceptual explanations — those
      belong in dedicated how-to or concept docs
