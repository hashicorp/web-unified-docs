# CLI reference pages

CLI reference pages are a specialized template for documenting command line
interface (CLI) command options and usage. They map to the Diátaxis **reference**
category.

The CLI content type represents a repeatable design for ensuring that the
documentation published to the website is consistent with the content shipped
with the binary. In the short and medium terms, we want to be able to use
automation workflows to keep the two consistent. In the long term, we should be
able to implement the template as part of the source files so that we can publish
documentation to the website directly from the code.

Three templates support this content type:

| Template | Produces |
| --- | --- |
| [templates/cli-reference-command.mdx](../templates/cli-reference-command.mdx) | `{command}.mdx` |
| [templates/cli-reference-command-group.mdx](../templates/cli-reference-command-group.mdx) | `{command group}/index.mdx` |
| [templates/cli-reference-global-flags.mdx](../templates/cli-reference-global-flags.mdx) | `global-flags.mdx` |

## North star principles

Make sure that your CLI reference content aligns with the following north star
principles.

### Write for built-in and published help channels

We expect the majority of users to use the built-in CLI help as their primary
resource. The references published to the website are available for users who
prefer the website navigation. Consider how the content would render in a
console. Although we manually write the CLI reference published to the website,
we will eventually generate the content from the same sources as the built-in
help files.

### Brevity works better

Reference documentation is akin to a dictionary or phone book. It is available
for users to look up a narrow unit of information. Describe the core behavior of
the command and its options, but avoid creating "all-in-one" pages that mix
reference, usage, and concepts. When necessary, introduce use cases and link to
overview pages that describe high-level workflows, usage pages that describe
running commands within the context of user goals, and conceptual pages that
explain underlying components related to particular commands.

### Optimize for scannability

Users visit CLI reference pages for specific information about the syntax for
running the command, including the supported arguments and options. Consider the
following suggestions to optimize the user's experience:

- Avoid writing documentation that can only be understood by reading from
  beginning to end.
- Ignore page length. Because the content is intended to be scanned, there's no
  such thing as a reference page that's too long. Conversely, some commands
  perform a very specific function with few inputs to modify the behavior. As a
  result, there is no such thing as a topic that is too short.
- Confine content to the sections described in this guide. While we may need to
  explain some nuance, other content types are better containers for describing
  product behaviors in specific contexts. By staying within the boundary of the
  CLI reference and by using the same headings across pages, we make scanning the
  content easier.
- Deviate consistently. Your product's CLI may require specific categories of
  information that do not fit this guidance. If so, define a custom type of
  section that you can add to the template for all pages, but avoid adding
  bespoke sections that only apply to a limited set of pages.

## File and folder structure

Use the following guidance to structure your CLI reference documentation:

- Store the CLI reference documentation under `/reference/cli`.
- Create an overview named `index.mdx` file in the `/reference/cli/` folder. The
  overview groups commands into workflows. Follow the guidance for the
  [overview](overview.md) content type to author this page.
- Create folders in the `/reference/cli/` directory that are named for command
  keys. Describe the command key in the `index.mdx` file.
- Create files for subcommands named `<subcommand>.mdx`. These files comprise the
  core CLI reference documentation.
- Create a separate file named `/reference/cli/global-flags.mdx` for documenting
  global flags. Link to this file in the Global flags section.

The resulting URLs will be optimized for search, sharing, and for redirects if
the CLI changes. Use the following example as a guide:

```text
# Example paths
# base: vault/docs/
/reference
- /cli
  - index.mdx                 # vault/docs/reference/cli
  - /{command}
    - index.mdx               # vault/docs/reference/cli/kv
    - /{command}
      - index.mdx
      - /{subcommand_a}.mdx   # vault/docs/reference/cli/kv/delete
      - /{subcommand_b}.mdx   # vault/docs/reference/cli/kv/destroy
  . . .
  - global-flags.mdx          # vault/docs/reference/cli/global-flags
```

## Page titles

Use the full command in code font for page titles:

- `{product} {command}`
- `{product} {command} {subcommand}`
- `{product} {command} {subcommand} {subcommand}`

## Page structure

The following content blocks are standard for CLI pages. Place them in the order
that they appear in this section.

Not all blocks may be applicable to the command, such as when the command does
not take an argument, flags, or options. If the command does not have content for
each block, keep the heading for consistency and write a consistent statement,
such as "This command does not use {element}."

In most cases, the following content blocks have content:

| Block | Required |
| --- | --- |
| One-sentence summary | `index.mdx`, `{command}.mdx` |
| Usage | `{command}.mdx` |
| Description | `index.mdx`, `{command}.mdx` |
| Examples | `{command}.mdx` |
| Subcommands | `index.mdx` |
| Global flags | `index.mdx`, `{command}.mdx` |
| Related | `index.mdx`, `{command}.mdx` |

## Content block guidance

### Summary

The first block of text after the page title is a summary. The page title itself
serves as the heading for this block of content. Do not add another heading below
the page title.

The summary contains the following information:

- A one-sentence description of the content on the page. The goal is to help
  readers immediately understand if they are on the correct page: "This topic
  provides reference information about the {command} command."
- A one-sentence description of the operation that the command performs. The
  one-sentence summary also serves as the description in the embedded CLI help:
  "This command {action it performs}."
- For commands that require a paid edition of the product, such as the enterprise
  binary or the HCP Plus tier plan, include it at the end of the block.
- The basic syntax for running the command using stand-in text and values for
  arguments and options as necessary. Users should be able to read the contents
  of the usage block and understand the structural requirements of the command.
  Refer to [Syntax details](#syntax-details) for guidance.

#### Syntax details

The elements in the command you are documenting may need to be in a specific
order, but you can use the following template as a model for presenting syntax in
Usage sections.

````text
```shell-session
$ CLI_PRODUCT command subcommand <argument-name> [flags] --req-option <short-option-desc> [options]
```
````

The template implements the following guidelines:

- Use code blocks to format syntax described in summary sections, as opposed to
  single backticks used for in-line formatting.
- Use a standard syntax highlighter for all commands. When in doubt, standardize
  on `shell-session` as the highlighter per the style guide.
- Include the full command chain.
- Represent required argument values using lowercase words in angle brackets. For
  all other stand-in values, use angle brackets around lower case descriptions.
- Use hyphens between words in stand-in values.
- Include any required options.
- Use square brackets to indicate optional elements.
- Use the following verbiage to refer to different inputs and modifiers
  associated with the command:
  - **argument**: Refers to a single value input for the command. Arguments must
    usually appear in a specific position in the command, such as between the
    command and its flags.
  - **flag**: Refers to a single value or key-value pair that affects the
    operation of the CLI tool. Flags always have a dash, name, space, value.
    Contrast flags with options, which affect the output of the command.
  - **option**: Refers to a key-value pair that provides additional processing
    information for the command operation being performed. Options must usually
    appear in a specific position in the command, such as between arguments and
    flags.
- Match the syntax to realistic usage by including any punctuation marks, such as
  quotation marks around string values, and special characters that may be
  necessary to run the command.
- Refer to [Non-conforming elements](#non-conforming-elements) for guidance about
  elements that do not appear to fit the model.

Example with required argument:

```shell-session
$ consul config write <config-name> [options]
```

Example with required option:

```shell-session
$ consul namespace create -name <name-for-namespace> [options]
```

Example command that does not take an argument and has no required options:

```shell-session
$ consul namespace list [options]
```

Example command that takes optional arguments and options:

```shell-session
$ terraform apply [options] [<plan-file>]
```

#### Non-conforming elements

It may not be immediately clear how some elements fit into the model. You may
need to define additional rubrics for your CLI reference. Before defining a
custom rule for the element, consider that the element may not be a core
component of the CLI. For example, the element may represent usage that should be
documented elsewhere or it may be a function of the shell language and not our
CLI.

You should also consider whether the non-conforming element serves a function
similar to an element within the model. For instance, if a command takes an
external data source that must use a specific syntax, the data source still
functions as an argument. Follow the guidelines for arguments to incorporate the
input.

### Description

Add a full description after the summary block. Place this information under the
"Description" heading.

Follow reference content type principles when adding descriptions. Describe
behaviors, but avoid describing workflows. Instead, link to related topics in the
[Related](#related) section.

Some commands may have complex exceptions or special behaviors depending on
certain conditions. Add subheadings as necessary to group related information
about the command to improve scannability.

### Command arguments

An argument is a single value input for the command. Arguments must usually
appear in a specific position in the command, such as between the command and its
flags.

For commands that take one or more arguments, add a "Command arguments" block and
list the required and optional arguments. List required arguments in alphabetical
order first, then list optional arguments in alphabetical order.

Refer to arguments using the same format and text used in the summary syntax
block. Add the following information as a nested list:

- Description: Keep descriptions succinct. If the argument is related to
  workflows, concepts, or procedures, add a link to the list in the Related
  block.
- Required: Only add if the argument is required.
- Data type: Specify the basic type, such as "string", "number", "boolean", or
  "list of \<types\>", but you can list a specific data type if necessary. You can
  also use the description to explain the data type, such as when string values
  must be formatted as dates or durations.
- Default or inherited value.
- Some types of arguments require an enterprise edition, such as partition names
  in Consul. Use the inline enterprise tag if applicable.

Use the following template:

```mdx
## Command arguments

- `ARGUMENT-TEXT`: Description.
    - This argument is {required || optional}.
    - Data type.
    - Default or inherited value.
    - You must {use the Enterprise edition || have a Plus account || etc.} to specify this argument.
```

### Flags

Flags affect the operation of the CLI tool and are expressed as either a single
value or key-value pair. Contrast flags with options, which affect the output of
the command.

List required flags in alphabetical order first, then list optional flags in
alphabetical order. Include the following information for each flag:

- Description: Keep descriptions succinct. If the flag is related to workflows,
  concepts, or procedures, add a link to the list in the Related block.
- Required: Only add to required flags.
- Data type: Specify the basic type, such as "string", "number", "boolean", or
  "list of \<types\>", but you can list a specific data type if necessary. You can
  also use the description to explain the data type, such as when string values
  must be formatted as dates or durations.
- Default or inherited value.
- Required product edition.

Use the following template:

```mdx
## Flags

- `flag-name`: Description.
    - {Required to {perform task} || optional}.
    - Data type.
    - Default or inherited value.
- `flag-name`: Description.
    - Data type.
    - Default or inherited value.
    - You must {use the Enterprise edition || have a Plus account || etc.} to specify this option.
```

### Options

List required options first in alphabetical order. List optional options next in
alphabetical order. Include the following information for each option:

- Description: Keep descriptions succinct. If the option is related to workflows,
  concepts, or procedures, add a link to the list in the "Description" block.
- Required: Only add to required options.
- Data type: Specify the basic type, such as "string", "number", "boolean", or
  "list of \<types\>", but you can list a specific data type if necessary. You can
  also use the description to explain the data type, such as when string values
  must be formatted as dates or durations.
- Default or inherited value.
- Required product edition.

Use the following template:

```mdx
## Options

- `OPTION_NAME`: Description.
    - {Required to {perform task} || optional}.
    - Data type.
    - Default or inherited value.
- `OPTION_NAME`: Description.
    - Data type.
    - Default or inherited value.
    - You must {use the Enterprise edition || have a Plus account || etc.} to specify this option.
```

### Examples

Include at least one example that describes an expected common pattern. Introduce
all examples with a description of the operation that the example command
performs.

You can exclude this block in `{command group}/index.mdx` pages unless the group
command can perform a task without specifying a subcommand.

### Subcommands

If applicable, add a list of subcommands and link to the appropriate pages. This
block only appears for consistency with the built-in CLI reference help. You can
use the following template:

```mdx
## Subcommands

- [`command`](link)
```

### Global flags

Flags that you can use for all commands are considered global. The content for
this section is the same for all commands. Consider using the following template
to write a partial so that descriptions are consistent across all commands.

```mdx
## Global flags

Refer to [Global flags reference](/{product}/docs/reference/cli/global-flags) for information about flags you can use with all commands.
```

### Related

Add links to related overviews, concepts, and usage pages in the Related section.
To add links, start a new section using the following template:

```mdx
## Related

Refer to the following topics for additional information:

- [Title](link)
```

Use this template even if the command only has one use case, concept, workflow,
or related command associated with it. Every command has a purpose, so you should
always include at least one link that connects the reference to product
functionality.
