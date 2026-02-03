
# Partials

Partials allow you to present identical information across multiple docs pages. To see an example of a partial, check out the `replicated-and-fdo` folder. You can write some in MDX, then import into a docs page like so:

```mdx
@include "replicated-and-fdo/architecture/data-security-partial.mdx"
```

With that in place you can made updates directly to a partial and it updates the content everywhere the site uses that partial! Meaning, we don't have to duplicate and maintain information across pages!

## When to use a partial

Partials are a mechanism for creating a block of information once and using it across multiple pages, for example:

- Standard beta callouts
- Standard warning messages
- Examples of common coding patterns

Avoid using partials to abstract information from a parent topic. If your partial only applies to one page, then decommision the partial and add it to the parent page.  

Do not use partials to fix structural issues with the information. In some cases, relying on partials is an indication that you need to refactor the content. 

Work with your technical writer for additional guidance.

## Best practices

You should add comments to your partial to document important information about the partial. For example, you can add a list of known pages that includes the partial.
