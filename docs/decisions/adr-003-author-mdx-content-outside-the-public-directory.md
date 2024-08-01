# ADR 003: Author MDX content outside the public directory

## Status

Proposed

## Context

In our prototype so far, `.mdx` content has been located in the `public` directory.

We have established in [web-presence-experimental-docs#10 - propose adr-002 on mdx transforms at build time](https://github.com/hashicorp/web-presence-experimental-docs/pull/10) that we want to execute content transforms at build time. This means that the content original authored files, currently located in the `public` directory, are _not_ the files we want to serve for consumption by the `hashicorp/dev-portal` site.

Storing authored `.mdx` content in the `public` directory implies that the authored files are what we're serving for consumption, which is not the case. This setup seems to steer us towards content processing workflows that might feel unintuitive.

As an example of such workflows, with content already in the `public` directory, it might feel intuitive to modify content in place for deploy preview and production builds, to avoid making both "raw" and transformed content publicly available. But for local development, if we modify files in place, we'll mess up the authoring workflows, as changes to those are tracked in version control systems.

## Decision

We will locate authored `.mdx` content in a `content` directory at the root of our unified docs repository, currently `hashicorp/web-presence-experimental-docs`.

When we run MDX transforms, we will write transformed `.mdx` files into a directory within the `public` directory. This output directory will mirror the structure of the `content` directory. This output directory will be ignored in version control.

## What we will not do

We will not yet make an intentional decision on the directory structure within the `content` directory. For now, we'll retain the directory structure already present in our prototype, but this should not be interpreted as any kind of signal on the merits of that structure. We will need to make a decision on how to organize the `content` directory at some point, and this decisions will be made in collaboration with content authors.

We will not yet make an intentional decision on where images and other assets should be located. So far, there does not seem to be a need to process images before serving them, so we do not have a clear need to change the approach in the prototype so far, which is to locate images and other assets in the `public/assets` directory. We will need to make a decision on how to organize versioned images and assets at some point, and this decisions will be made in collaboration with content authors.

## Consequences

We will be able to adopt a consistent and arguably more intuitive MDX transformation workflow across local development, deploy preview, and production build contexts.

Authors will have a clearly signalled and well-isolated directory in which `.mdx` content should be written.

Original authored MDX files will no longer be accessible through the Vercel CDN. We do not expect this to be a negative consequence, as our `hashicorp/dev-portal` application needs access to the _transformed_ MDX files, and not to the original authored files.
