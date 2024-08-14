# ADR 002: Apply include MDX transform at build time

## Status

Accepted

## Context

We committed to parity with our existing `content.hashicorp.com` API, in [adr-001-parity-with-existing-api.md](https://github.com/hashicorp/web-presence-experimental-docs/pull/9).

In our existing setup, some (but [not all](https://github.com/hashicorp/dev-portal/blob/73bf5a139e4cedfe163ce0b834307da58390ee56/src/views/docs-view/server.ts#L177)) MDX transforms are applied during our [extract-content](https://github.com/hashicorp/mktg-content-workflows/blob/01c3c1bd8c1be5d0d036835f90d191b2b1cca3a1/workflows/extract-content/action.ts#L170) workflow, _before_ adding content to the database that backs our existing API. As a result, our existing API returns content with some MDX transforms already applied.

The `@include`-based transform used to insert `partial` files into other `.mdx` files is particularly noteworthy, as it requires access to the folder of `partial` files. In the new unified docs setup we've prototyped so far, the `@include` feature is not functional, as we are not applying any MDX transforms before serving content.

We need some way to apply the `@include` transform, and possibly others, _before_ returning content from our API.

## Decision

We will apply some MDX transforms to docs content as part of the build script in the unified docs repository, currently named `web-presence-experimental-docs`.

## What we will not do

We will not commit transformed MDX content to version control in the unified docs repository, currently named `web-presence-experimental-docs`.

We will not _require_ all MDX transforms to be applied as part of our build script. While we expect that many MDX transforms will be more efficient to apply at build time, other MDX transforms may be suited to server-side functions in the `hashicorp/dev-portal` application. For example, in our existing setup, shifting the shape of content in our database is an almost impossibly laborious process, so we apply any transforms that may need to change in server-side functions rather than at extraction time. This way, changes to those transforms can be executed in `hashicorp/dev-portal` alone, without touching the database. While we don't expect to have this same limitation in our new setup, other reasons to have MDX transforms in other part of our toolchain may come up. With this in mind, we want to explicitly leave this door open for now.

## Consequences

With MDX transforms in place, we will be able to match the content returned from our existing API, and enable custom features such as `@include`, which are a key part of the content author workflow.

One negative consequence is that build times will increase for this project, `hashicorp/web-presence-experimental-docs`. The increase in build times is seen as a necessary compromise to achieve the functionality we have in the existing API.
