# ADR 004: Parity with existing API - Jan 2025 update

## Status

Accepted

## Context

The project in this repository, `hashicorp/web-presence-experimental-docs`, aims to implement [[DEVDOT-023] Unified Product Documentation Repository](https://docs.google.com/document/d/1p8kOqySttvWUVfn7qiC4wGBR73LMBGMelwLt69pM3FQ/edit). The RFC for this project was intentionally light on implementation details, in order to foster consensus on the broad direction.

The existing API (`content.hashicorp.com`) has endpoints that serve documentation content, the source code for which can be found in [hashicorp/mktg-content-workflows](https://github.com/hashicorp/mktg-content-workflows/blob/main/api/content.ts). The endpoints related to documentation content will be replaced with a new API.

Without a clear direction for the shape of our new API, we have a wide open field in terms of how we might approach the API surfaced by our new product documentation repository. This lack of direction creates uncertainty and potential for scope creep. As well, any changes we introduce relative to the existing API will complicate an already complex migration process, as our front-end will need to adapt to new endpoints or formats during the migration process.

## Decision

The new API will have parity with existing `GET` endpoints used to fetch product documentation content for dev portal.

This parity will apply to the shape of requests and responses for each operation that is directly used by our [hashicorp/dev-portal](https://github.com/hashicorp/dev-portal) front-end. To achieve this parity in operations, we will implement endpoints in the `app/api` directory of this repository.

This parity will also apply to the specific content returned from each endpoint in our new API. One way to achieve content parity is through scripts that clone source repositories and extract content in much the same way our [checkout-and-upload](https://github.com/hashicorp/mktg-content-workflows/tree/main/workflows/checkout-and-upload) workflow populates the database that underpins our existing content API. At time of writing, we've populated the `public/products` directory with extracted content, though it does not yet fully match the content in our database.

### What we will not do

- Aim for parity with unused operations, that is, operations that are not directly used by our [hashicorp/dev-portal](https://github.com/hashicorp/dev-portal) front-end. For specific examples of unused operations, see [Examples of unused operations](#examples-of-unused-operations).

As a more specific commitment to parity, we will implement `GET` operations for the following endpoints:

- [`/api/content/<productSlug>/version-metadata`](https://github.com/hashicorp/mktg-content-workflows/blob/01c3c1bd8c1be5d0d036835f90d191b2b1cca3a1/api/content.ts#L41)
  - Purpose: Returns version metadata. Version metadata determines which versioned `nav-data` will be fetched, and serves as the content source for versioned docs dropdowns.
  - Note: we'd ideally like to move this API route to `/api/version-metadata/<product>`. We intend to adopt this new route after migration is complete. See [this GitHub comment](https://github.com/hashicorp/web-presence-experimental-docs/pull/9#discussion_r1695970388) for more context.
- [`/api/content/<productSlug>/nav-data/<version>/<section>`](https://github.com/hashicorp/mktg-content-workflows/blob/01c3c1bd8c1be5d0d036835f90d191b2b1cca3a1/api/content.ts#L41)
  - Purpose: Returns `nav-data`. Nav data determines which individual documents will be rendered, and serves as the content source for the sidebars for each documentation section.
  - Note that `section` is sometimes referred to as a docs "category". Some products, such as `boundary`, have a single `docs` section. Other products include sections such as `intro`, `commands`, `tools`, `guides`, and others.
- [`/api/content/<productSlug>/doc/<version>/<...docsPath>`](https://github.com/hashicorp/mktg-content-workflows/blob/01c3c1bd8c1be5d0d036835f90d191b2b1cca3a1/api/content.ts#L41)
  - Purpose: Returns individual `.mdx` documents
- [`/api/content-versions`](https://github.com/hashicorp/mktg-content-workflows/blob/01c3c1bd8c1be5d0d036835f90d191b2b1cca3a1/api/content-versions.ts)
  - Purpose: Returns version metadata on specific `.mdx` documents, which allows us to filter our versioned docs dropdowns to only show links to documents that actually exist in the associated versioned set of content.
  - Note: we'd ideally like to move this API route to `/api/content/<productSlug>/content-versions/doc/<...docsPath>`, for consistency with other API routes. We intend to adopt this new route after migration is complete. See [this GitHub comment](https://github.com/hashicorp/web-presence-experimental-docs/pull/9#discussion_r1695450448) for more context.

> UPDATE [Jan 2025] > **We will now include this endpoint as part of our feature parity with the current Content API**. This was decided in the 2024 Q3 and 2025 Q1 milestone planning. Google doc [here](https://docs.google.com/document/d/1CuHwobTJHKODZCUVfT5iRITK360eFBBBeASZr3tg67A/edit?usp=sharing)

- [`/api/static_paths`](https://github.com/hashicorp/mktg-content-workflows/blob/01c3c1bd8c1be5d0d036835f90d191b2b1cca3a1/api/static_paths.ts)
  - Purpose: Returns a subset of documents to render at build time, prioritizing documents that are frequently viewed based on analytics

At time of writing, the endpoints listed above are the only known endpoints that our [hashicorp/dev-portal](https://github.com/hashicorp/dev-portal) front-end interacts with directly in order to render documentation content. If new endpoints are surfaced or implemented after this document is written, we'll need to make another decision on how to handle those new endpoints.

## Consequences

We expect that parity with our existing API will reduce the complexity and shorten the potential timeline of migrating to our new API.

We expect that parity with our existing API may introduce some additional work. It may compromise what we might see as an ideal interface for each endpoint. We expect this downside will be outweighed by the ease of migration. We also expect that once the migration is complete, we'll be in a better position to make any changes to the interface that we might have wished we could've made during migration.

We do not expect any negative consequences on the internal implementation details of our new API. We will aim for parity in the request & response shape that our new API provides, but not in any implementation details beyond that, so we expect to have full flexibility in how our new API works under the hood.

## Examples of unused operations

In the context of this decision, "unused operations" refers to any endpoint of the `content.hashicorp.com` API which is _not_ used directly by the [hashicorp/dev-portal](https://github.com/hashicorp/dev-portal) front-end.

These operations are used by other parts of our web presence. They may be used indirectly for documentation content. But they are nonetheless outside the scope of this project and outside the scope of this decision.

Some specific examples of operations that are not used directly by [hashicorp/dev-portal](https://github.com/hashicorp/dev-portal):

- `POST` and `DELETE` methods on `/api/content/...` routes
  - These operations are used to update the content database served by our existing content API
  - These operations may no longer be used once we've fully completed our migration.
- `/api/algolia` (all HTTP operations)
  - This endpoint is used indirectly by [hashicorp/dev-portal](https://github.com/hashicorp/dev-portal), as it manages the `integrations` content in our Algolia search index. This endpoint also manages Algolia indices used on `www.hashicorp.com`.
- `/api/event` (all HTTP operations)
  - This endpoint is used to gather events from content source GitHub repositories. The future of this endpoint is uncertain. We may choose to retain this endpoint even after our migration is complete, for example to automatically extract documentation files that have been auto-generated product source code. Or we may choose to implement a different workflow to push auto-generated documentation to our unified docs content repository.
- `GET` `/api/content?product=ptfe-releases&fullPath=doc%2Fdev-portal%2Fenterprise`
  - This endpoint is an example of a strangely malformed document with a version string `dev-portal`. The existence of such documents in our database is likely related to early testing of versioned docs. We do not access this document or use it to render user-facing content in any current environment. The new content API will _not_ match the content for documents that are not ultimately used by the front-end, such as those with malformed version strings.
