# How to create a new page

Follow these steps to create a new content page:

1. [Decide your content type](#decide-content-type)
1. [Create the page file](#create-the-page-file)
1. [Create your content](#create-your-content)
1. [Add your page to the navigation sidebar](#add-your-page-to-the-navigation-sidebar)

## Decide content type

Decide if your content is a concept, guide, or reference. Refer to the [Content
types](content-types.md) guide for detailed explanations and templates. If you
have questions, reach out to your product's tech writer team for help.

## Create the page file

1. Decide in which directory your new content belongs in your product's most
   recent version folder.

   - Documentation: `docs` directory
   - CLI: Directory varies by product. Common locations are `commands`,
     `docs/commands`, and `docs/cli`.
   - API: Directory varies by product. A common location is `api-docs`. Some
     products generate API content, so check with your team before manually
     creating API content.

   The path in the version content directory becomes the URL route. For example,
   if you add `my-new-page.mdx` to
   `web-unified-docs/content/vault/v1.20.x/docs/concepts` and v1.20.x is the latest
   version, the website URL is `https://developer.hashicorp.com/vault/docs/concepts/my-new-page`.

1. Create a file ending in `.mdx` in the appropriate directory. Choose a file
   name that is short and describes your page's topic. Do not repeat
   the folder name in your page file name.

## Create your content

Use the appropriate page content type as a template for your new content. Refer
to the Page templates section in the [Content
types](./content-types.md) guide for examples.

Follow the Education style guide's [top 12 guidelines](../style-guide/top-12.md) when you create your content.

## Add your page to the navigation sidebar

You must add an entry to the navigation sidebar file in order or your new page
to render in the website. Sidebar files are located in the product's
`<version>/data` directory. `docs-nav-data.json` is the sidebar file for the
`docs` directory.

In the following example, the new file's location is
`web-unified-docs/content/vault/v1.20.x/docs/concepts/tokens.mdx`. The page's
title is "Tokens". In the`docs-nav-data.json` file, add the new page to the
section that corresponds to the filesystem directory.

<table border="1" width="100%">
<tr>
<th>
Filesystem
</th>
<th>
docs-nav-data.json
</th>
<tr>
<td>

```text
vault
├── 1.20.x
│   └── docs
│       └── concepts
│           ├── index.mdx
│           ├── seal.mdx
│           ├── tokens.mdx
```

</td>
<td>

```json
...
  {
    "title": "Key concepts",
    "routes": [
      {
        "title": "Overview",
        "path": "concepts"
      },
      {
        "title": "Seal/Unseal",
        "path": "concepts/seal"
      },
      { "title": "Tokens",  
        "path": "concepts/tokens"
      },
      ...
```

</td>
</tr>
</table>

Refer to the [Sidebars deep dive section](#sidebars-deep-dive) for an
explanation of how the filesystem maps to entries in the sidebar file.

## Sidebars deep dive

The structure of the sidebars is controlled by files in the
`content/<product>/<version>/data` directory. For example,
`web-unified-docs/content/vault/v1.20.x/data/docs-nav-data.json`
controls the Vault docs v1.20.x sidebar. Within the `data` folder, any file with
`-nav-data` after it controls the navigation for the given section.

The sidebar uses a simple recursive data structure to represent files and
directories. The sidebar is meant to reflect the structure of the docs within
the filesystem while also allowing custom ordering.

This is an example sidebar.

```text
.
├── docs
│   └── directory
│       ├── index.mdx
│       ├── file.mdx
│       ├── another-file.mdx
│       └── nested-directory
│           ├── index.mdx
│           └── nested-file.mdx
```

Here's how this folder structure could be represented as a sidebar navigation. In this example, it would be the file `website/data/docs-nav-data.json`:

```json
[
  {
    "title": "Directory",
    "routes": [
      {
        "title": "Overview",
        "path": "directory"
      },
      {
        "title": "File",
        "path": "directory/file"
      },
      {
        "title": "Another File",
        "path": "directory/another-file"
      },
      {
        "title": "Nested Directory",
        "routes": [
          {
            "title": "Overview",
            "path": "directory/nested-directory"
          },
          {
            "title": "Nested File",
            "path": "directory/nested-directory/nested-file"
          }
        ]
      }
    ]
  }
]
```

A couple more important notes:

- Within this data structure, ordering is flexible, but hierarchy is not. The structure of the sidebar must correspond to the structure of the content directory. So while you could put `file` and `another-file` in any order in the sidebar, or even leave one or both of them out, you could not decide to un-nest the `nested-directory` object without also un-nesting it in the filesystem.
- The `title` property on each node in the `nav-data` tree is the human-readable name in the navigation.
- The `path` property on each leaf node in the `nav-data` tree is the URL path where the `.mdx` document will be rendered, and the
- Note that "index" files must be explicitly added. These will be automatically resolved, so the `path` value should be, as above, `directory` rather than `directory/index`. A common convention is to set the `title` of an "index" node to be `"Overview"`.
