
# Partials

Partials allow you to share content across as many different docs pages as you'd like. To see an example of a partial, check out the `replicated-and-fdo` folder. You can write some in MDX, then import into a docs page like so:

```mdx
@include "replicated-and-fdo/architecture/data-security-partial.mdx"
```

With that in place you can made updates directly to a partial and it updates the content everywhere the site uses that partial! Meaning, we don't have to duplicate and maintain information across pages!
