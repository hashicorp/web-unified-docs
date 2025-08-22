# Using redirects

Use redirects for fun and profit!

---

- [Definitions](#definitions)
- [Limitations and gotchas](#limitations-and-gotchas)
- [Path parameter definition](#path-parameter-definition)
  - [Predefined character classes](#predefined-character-classes)
- [Example path parameter definitions](#example-path-parameter-definitions)
- [Example redirects](#example-redirects)
  - [Basic redirects](#basic-redirects)
  - [Pattern matching](#pattern-matching)
  - [Non-capture groups](#non-capture-groups)
  - [Negative look-ahead non-capture groups](#negative-look-ahead-non-capture-groups)

---

## Definitions

- **Docset** - A collection of docs associated with a specific product and
  version. For example, the 1.20 Vault docset (`vault/docs/v1.20/x`) lives under
  `/content/vault/1.20.x/`.


- **Containing docset** - The docset associated with a specific redirect
  definition file. For example, `vault/docs/v1.20.x` is the containing docset
  for the `/content/vault/1.20.x/redirects.jsonc` file.


- **Standard redirects** - Redirect **unversioned URLs** that no longer exist
  under the containing docset to a different URL in the same docset.

  For example, updating the v1.20 redirect file to send requests for `path/pageA`
  to `path/pageB`.


- **Versioned redirects** - Redirect **unversioned URLs** that no longer exist
  under the containing docset to a different URL in another docset.
  
  For example, updating the v1.20 redirect file to send requests for
  `path/upgrade-to-1.18` to a URL in the v1.18 docset
  (`vault/docs/v1.18.x/path/upgrade-to-1.18`).


- **Backfacing redirects** - Redirect invalid, **versioned URLs** that use valid
  paths from the containing docset to appropriate URLs in other docsets. You can
  use backfacing redirects to help the version picker find the right page across
  versions or keep URL formatting consistent in long-living pages that span
  docsets.
  
  For example, versioned URLs for `updates/important-changes` in the current
  Vault docset (`/vault/docs/{version}/updates/important-changes`) redirect to
  appropriate URLs in older docsets based on the version slug in the requested
  URL.


## Redirect slugs

There are 3 types of slugs: placeholders, wildcards, and named path parameters.

### Placeholders

Placeholders only match to a single path section in the source definition.

- Source definition: `:<name>`
- Destination use: `:<name>`

For example, the source definition `/path/:slug` matches to `path/subpath` but
not `path`, `path/`, or `/path/subpath/anothersubpath/`.

### Wildcards

Wildcards match to the root path (with or without a trailing slash) and all
subpaths.

- Source definition: `:<name>*`
- Destination use: `:<name>*`

For example, the source definition `/path/:slug*` matches to `path`, `path/`,
`path/subpath`, and `/path/subpath/anothersubpath/`.

You must include the `*` character in the destination URL. Just using the slug
name will not work properly.

### Named path parameters

Named parameters match to the corresponding pattern or non-capture group.
Patterns and non-capture groups can include a single path segment, multiple path
segments, or all subpaths.

- Source definition: `:<name>(<pattern or non-capture group>)`
- Destination use: `:<name>`

For example, the source definition `/path/:slug(1\\.(?:9\|1[0-5])\\.x)` matches
to `path/1.9.x` through `path/1.15.x` but not to `path`, `path/` or any other
subpath.


## Path parameter definition

> [!NOTE]  
> If you are reading the raw Markdown, the table says `\|`, but the actual
> character is `|`. GitHub requires an escape character when `|` appears in
> a table for the page to render properly on github.com

You can define and name parameters in the source path and use the matched value
your in destination path definitions. Parameter definitions can include string
constants, predefined character classes, patterns, and non-capture groups that
may match to multiple paths.


Special character | Description
----------------- | -----------
`(` and `)`       | Wraps parameter definitions and non-capture groups
`[` and `]`       | Wraps single-character ranges
`-`               | Defines a **single-character** range (numbers or letters)
`\`               | Indicates a predefined character class
`$`               | Matches a pattern to the end of a string
`.`               | Matches any single character
`*`               | Matches a pattern **zero or more** times
`+`               | Matches a pattern **one or more** times
`?`               | Matches a pattern **zero or one** times
`{ min, max }`    | Matches a pattern `min` or more times up to an optional `max` number of times
`:`               | Starts a parameter definition
`?:`              | Starts a non-capture group
`?!`              | Starts a negative look-ahead non-capture group
`\|`              | Separates alternative strings in a non-capture group

To escape special characters in your non-capture group, use `\\`. For example,
to escape the `.` character in versioned URLs, use `\\.`.


### Predefined character classes

Notation | Character set
-------- | -------------
`\d`     | Single digits (0-9)
`\D`     | Non-digits
`\w`     | Any word character (alphanumeric and underscore)
`\W`     | Non-word characters including most special characters
`\s`     | Whitespace characters
`\S`     | Non-whitespace characters



## Limitations and gotchas

- Only the most recent redirect file matters.  The `developers.hashicorp.com`
  platform only compiles redirects from the most recent redirect file.

- You must perpetuate backfacing redirects across future docsets. Otherwise, the
  most current version of a docset will "forget" how to handle the backfacing
  redirects.

- You cannot split redirects across multiple files. For example, you cannot
  create a file to define your backfacing redirects and include it in the main
  redirect file.

- If you use a non-capture group to capture subpaths, the redirect only works
  for the root path with the `/` included. For example, a source definition like
  `/path/:slug(.*)` works for `/path/path1` or `/path/`, but not for `/path`.
  To capture both forms of the root path, you need to include the `/` character
  as part of the non-capture group instead of the explicit path. For example,
  `/path:slug(/?.*)`. Unless you actually need a non-capture group for subpaths,
  wildcards are typically easier to read.



## Example path parameter definitions

Depending on the paths and page names you want to capture, there may be multiple
ways to capture the same information.

Path segment                                                     | `:slug` value
---------------------------------------------------------------- | -----------------
`:slug(v1\\.(?:12\|13)\\.x)`                                     | "v1.12.x" or "v1.13.x"
`v:slug(1\\.(?:12\|13)\\.x)`                                     | "1.12.x" or "1.13.x"
`v:slug(1\\.(?:12\|13)).x`                                       | "1.12" or "1.13"
`:slug(path1(?:\\-abc$)?)`                                       | "path1" or "path1-abc"
`:slug((?!path1$).*)`                                            | any string != "path1"
`:slug((?!path1$\|path2$).*)`                                    | any string not in ("path1", "path2")
`:slug(\\d{1,})`                                                 | any string of 1 or more digits
`:slug(\\d{1,4})`                                                | any string of 1 to 4 digits
`:slug([a-zA-Z]+)`                                               | any string of at least one letter
`:slug(release-[1-5])`                                           | "release-" followed by 1, 2, 3, 4, or 5
`:slug(release-(?:[0-9]\|10\|11))`                               | "release-" followed by any number between 0 and 11
`:slug(1\\.(?:9\|1[0-5])\\.x)`                                   | "1.9.x" through "1.15.x"
`:slug(1\\.(?:[7-9]\|1[0-8])\\.x)`                               | "1.7.x" through "1.18.x"
`:slug(1\\.(?:7\|8\|9\|10\|11\|12\|13\|14\|15\|16\|17\|18)\\.x)` | "1.7.x" through "1.18.x"



## Example redirects

Example redirects. Some examples come from actual redirects in
`/content/vault/v1.20.x/redirects.jsonc`.


### Basic redirects

Standard redirect:

```json
  {
    "source": "/old/path",
    "destination": "/new/path",
    "permanent": true,
  }
```

Redirect all child paths:

```json
  {
    "source": "/old/path/:slug*",
    "destination": "/new/path/:slug*",
    "permanent": true,
  }
```

Create a versioned redirect to a specific versioned URL:

```json
  {
    "source": "/vault/docs/old/path",
    "destination": "/vault/docs/{version_string}/old/path",
    "permanent": true,
  }
```


### Pattern matching

Redirect any `/old/path/` path that starts with "hello":

```json
  {
    "source": "/old/path/:slug(hello.*)",
    "destination": "/new/path/:slug",
    "permanent": true,
  }
```

Redirect any `/old/path/` path that ends with "goodbye":

```json
  {
    "source": "/old/path/:slug(.*goodbye$)",
    "destination": "/new/path/:slug",
    "permanent": true,
  }
```

Redirect any `/old/path/` path that starts with "hello" and ends with "goodbye":

```json
  {
    "source": "/old/path/:slug(hello.*goodbye$)",
    "destination": "/new/path/:slug",
    "permanent": true,
  }
```


### Non-capture groups

Use a non-capture group to redirect all child paths:

```json
  {
    "source": "/old/path:slug(/?.*)",
    "destination": "/new/path/:slug",
    "permanent": true,
  }
```

Use a non-capture group to create backfacing redirects for v1.12.x and v1.13.x:

```json
  {
    "source": "/vault/docs/:version(v1\\.(?:12|13)\\.x)/new/path",
    "destination": "/vault/docs/:version/old/path",
    "permanent": true,
  }
```

Use a non-capture group to pull out the number portion (`1.N.x`) of a versioned
URL that looks like `vault/docs/v1.N.x/path/to/page` and use the number in the
destination page name:

```json
  {
    "source": "/vault/docs/v:version(1\\.(?:9|1[0-8])\\.x)/updates/important-changes",
    "destination": "/vault/docs/v:version/upgrading/upgrade-to-:version",
    "permanent": true
  },
```

Use a non-capture group to pull out the number and patch of a versioned page
name that looks like `vault/docs/path/to/page-{version}.{patch}` and use the
version to redirect to a versioned URL for the same page:

```json
  {
    "source": "/vault/docs/upgrading/upgrade-to-:version(0\\.(?:[5-9]|10|11)).:patch(.*)",
    "destination": "/vault/docs/v:version.x/upgrading/upgrade-to-:version.:patch",
    "permanent": true
  },
```


### Negative look-ahead non-capture groups

Use a negative look-ahead group to redirect all `docs/agent/` paths except
`docs/agent/autoauth/` to a path under `/agent-and-proxy/agent/`:

```json
  {
    "source": "/vault/docs/agent/:slug((?!autoauth$).*)",
    "destination": "/vault/docs/agent-and-proxy/agent/:slug",
    "permanent": true
  },
```