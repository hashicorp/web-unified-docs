# Function reference pages

Function reference pages document a single function in a configuration or
templating language: what it returns, the arguments it takes, and what it looks
like in use. They map to the Diátaxis **reference** category.

For examples of function reference pages that implement these guidelines, refer
to the following:

- [`element`](https://developer.hashicorp.com/terraform/language/functions/element)
- [`templatefile`](https://developer.hashicorp.com/terraform/language/functions/templatefile)
- [`abs`](https://developer.hashicorp.com/nomad/docs/reference/hcl2/functions/numeric/abs)

To start drafting, copy
[templates/function-reference.mdx](../templates/function-reference.mdx).

## When to use this type

Use a function reference page when the thing you are documenting is a callable
unit of a configuration language — an HCL function, a template function, a
policy language built-in.

Do not use it for a CLI command, which is a
[CLI reference](cli-reference.md), or for a configuration block, which is a
[structured configuration reference](structured-configuration-reference.md).

Function reference pages are almost always part of a large set. Consistency
within the set matters more than any individual page.

## North star principles

### One function per page

A function reference page documents exactly one function. Do not group related
functions onto a shared page, however small they are. Practitioners arrive from
search or from a cross-reference on a sibling page, and a page that documents
six functions cannot be linked to precisely or summarized accurately.

The set as a whole is served by an [overview](overview.md) page that groups
functions into categories.

### Lead with the signature

A reader who already knows what the function does is here for the argument
order. Put the signature immediately after the one-sentence summary, before any
prose. Do not give it a heading.

### Examples do the explaining

Function behavior is easier to show than to describe, particularly at the edges —
empty inputs, negative indices, type coercion. Prefer an additional example over
an additional paragraph. Show the call and its result together in the same block,
in the format the language's console produces.

Cover the common case first, then the edge cases a reader is likely to hit.

### Keep pages short

Most function pages are correctly under 100 words of prose. Length is not a
measure of quality here. If a function needs extensive explanation, the
explanation belongs on a [concept](concept.md) page that the function page links
to.

## File and folder structure

Store function reference pages in a dedicated folder, grouped into subfolders by
category when the set is large enough to need them:

```text
/reference
- /functions
  - index.mdx              # overview, grouping functions by category
  - /numeric
    - abs.mdx
    - ceil.mdx
  - /string
    - format.mdx
  . . .
```

## Page titles

Use the function name in code font, followed by the word "function":

- `` `{function_name}` function reference ``

## Page structure

| Block | Required |
| --- | --- |
| Summary and signature | Yes |
| Description | Yes |
| Examples | Yes |
| Related functions | When sibling functions exist |

## Content block guidance

### Summary and signature

The page title serves as the heading. Do not add another heading below it.

Open with one sentence describing what the function returns, phrased in active
voice and starting with the function name: "`abs` returns the absolute value of
the given number."

Follow it immediately with the signature in a code block, using the language's
own syntax:

````text
```hcl
element(list, index)
```
````

Name the arguments the way the language names them. Do not use angle brackets or
other stand-in notation here — this is the real signature, not a usage pattern.

### Description

Describe the behavior that the signature does not convey: how arguments are
interpreted, what the function does at boundaries, and when a practitioner should
reach for something else instead.

State error conditions explicitly. A reader hitting an error is a common reason
to open the page.

If the language provides built-in syntax that does the same job, say so and say
when the function is still the right choice.

### Examples

Show the call and its result in the same block, in the format the language's
interactive console produces:

````text
```
> element(["a", "b", "c"], 1)
"b"
```
````

Introduce each example with one sentence only when the example is not
self-evident. A first example demonstrating the common case usually needs no
introduction at all.

Cover edge cases the reader is likely to hit — wrap-around, negative values,
empty collections — each as its own example with a one-line explanation.

### Related functions

Link to sibling functions that a reader might have meant instead, with a short
clause explaining the difference. This block is what makes a large function set
navigable, so write the clause rather than listing bare links:

```mdx
## Related functions

- [`index`](link) finds the index for a particular element value.
- [`lookup`](link) retrieves a value from a map given its key.
```

Omit the block only when the function has no siblings.

## Writing style

Content types organize information. For word choice, formatting, headings,
links, and other page-level rules, refer to the
[style guide](../../style-guide/index.md), starting with the
[top 12 guidelines](../../style-guide/top-12.md).

Note that existing function pages across products use the title-case heading
`## Related Functions`. New pages use sentence case, per the style guide.
