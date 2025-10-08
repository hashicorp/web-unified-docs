# How to create a new page


## Create a page

Create a file ending in `.mdx` in a `content/<product>/<subdirectory>`. The path in the content directory will be the URL route. For example, `content/vault/docs/hello.mdx` will be served from Vault's `/docs/hello` URL.

Files and directories will only be rendered and published to the website if they are [included in sidebar data](#navigation-sidebars). Any file not included in sidebar data will not be rendered or published.

This file can be standard Markdown and also supports [YAML frontmatter](https://middlemanapp.com/basics/frontmatter/). YAML frontmatter is optional, there are defaults for all keys.

```yaml
---
title: 'My Title'
description: "A thorough, yet succinct description of the page's contents"
---
```

The significant keys in the YAML frontmatter are:

- `title` `(string)` - This is the title of the page that will be set in the HTML title.
- `description` `(string)` - This is a description of the page that will be set in the HTML description.




## Navigation sidebars

The structure of the sidebars is controlled by files in the
`content/<product>/<version>/data` directory. For example,
[content/vault/v1.20.x/data/docs-nav-data.json](content/vault/v1.20.x/data/docs-nav-data.json)
controls the Vault docs v1.20.x sidebar. Within the `data` folder, any file with
`-nav-data` after it controls the navigation for the given section.

The sidebar uses a simple recursive data structure to represent _files_ and _directories_. The sidebar is meant to reflect the structure of the docs within the filesystem while also allowing custom ordering. Let's look at an example. First, here's our example folder structure:

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

Here's how this folder structure could be represented as a sidebar navigation, in this example it would be the file `website/data/docs-nav-data.json`:

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

Below we will discuss a couple of more unusual but still helpful patterns.

#### Index-less categories

Sometimes you may want to include a category but not have a need for an index page for the category. This can be accomplished, but as with other branch and leaf nodes, a human-readable `title` needs to be set manually. Here's an example of how an index-less category might look:

```text
.
├── docs
│   └── indexless-category
│       └── file.mdx
```

```json
// website/data/docs-nav-data.json
[
  {
    "title": "Indexless Category",
    "routes": [
      {
        "title": "File",
        "path": "indexless-category/file"
      }
    ]
  }
]
```

#### Custom or external links

Sometimes you may have a need to include a link that is not directly to a file within the docs hierarchy. This can also be supported using a different pattern. For example:

```json
[
  {
    "name": "Directory",
    "routes": [
      {
        "title": "File",
        "path": "directory/file"
      },
      {
        "title": "Another File",
        "path": "directory/another-file"
      },
      {
        "title": "Tao of HashiCorp",
        "href": "https://www.hashicorp.com/tao-of-hashicorp"
      }
    ]
  }
]
```

If the link provided in the `href` property is external, it will display a small icon indicating this. If it's internal, it will appear the same way as any other direct file link.

