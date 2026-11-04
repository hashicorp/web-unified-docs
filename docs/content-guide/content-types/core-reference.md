# Core reference pages

Core reference pages describe product-supporting information that is not
conducive to a standard format, such as:

- Technical specifications
- Single error messages
- Groups of related error messages
- Troubleshooting procedures
- Benchmarking data
- Collections of best practices

Core reference pages map to the Diátaxis **reference** category. This content
type was previously called _irregular reference_.

> **No canonical template exists for this content type.** Either design a custom
> page or model your content on an existing topic in the same product that
> describes similar information. In either case, apply the north star principles
> below for consistency. Refer to
> [content-types.md](../content-types.md#types-without-a-template) for how to
> pattern-match an existing page.

## North star principles

Make sure that your core reference content aligns with the following north star
principles.

### Reference is canonical

Reference information is complete, accurate, and up-to-date. When an element in
the reference is mentioned in other parts of the documentation, those mentions
should always link to the description in the reference page.

Be thorough when describing configuration options, but avoid conceptual and usage
information. When a configuration entity associated with the product changes,
always update the reference first.

### Format for discoverability

Users tend to search on error messages, required component versions, and other
technical data. The search engine on our site only indexes metadata and headings,
so format core reference information in such a way that headings contain keywords
that users may search on.

### Consistency across similar content

You have a significant amount of discretion when formatting this kind of content,
such as error messages. Use consistent headings, labels, and other formatting
devices within the same page or for sibling pages in the same directory of
content.

## User journeys

Our goal is to create documentation for all audience types, but core reference
pages are optimized for the following practitioners.

### Target: Troubleshooter

This user may already have experience working with the product, but something is
either not working or not working as expected.

- Looking for details about specific error messages, component versions, expected
  outcomes, and other data to complete their immediate task.
- Searches on an error message or other output from the system in Google, then
  uses CONTROL/COMMAND+F keys to locate a recognizable string on the page.

### Secondary: Implementor

This user is preparing to implement the product or make a change to an existing
implementation.

- Seeking guidance and attempting to avoid implementation gotchas.
- Searches on general sets of information, such as "best practices for
  \<product\>" or "system requirements for \<product\>".

## Writing style

Content types organize information. For word choice, formatting, headings,
links, and other page-level rules, refer to the
[style guide](../../style-guide/index.md), starting with the
[top 12 guidelines](../../style-guide/top-12.md).

For calling out paid editions and pre-GA releases on this page type, refer to
[Use inline alerts when calling out edition considerations on reference pages](../../style-guide/general/enterprise-releases.md#use-inline-alerts-when-calling-out-edition-considerations-on-reference-pages).
