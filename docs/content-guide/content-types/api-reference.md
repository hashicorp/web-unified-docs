# API reference pages

API reference pages document the HTTP endpoints a product exposes: the method and
path, the parameters each endpoint accepts, and what a request and response look
like. They map to the Diátaxis **reference** category.

## First, decide whether you should be writing one at all

Products publish API reference documentation in two different ways, and only one
of them is authored in this repository.

| | Authored | Generated |
| --- | --- | --- |
| Where the content lives | `content/<product>/<version>/.../api-docs/` | A specification in the product's own repository |
| How it is written | By hand, in MDX | Emitted from protocol buffers or an OpenAPI specification |
| What this guide governs | The page structure, described below | Nothing — the spec is the source |
| Products | Vault, Consul, Nomad, HCP Terraform, Terraform Enterprise | Boundary |

**If your product generates its API reference, stop here.** Do not hand-author
pages in this repository to supplement or correct generated output — they will
drift from the specification immediately and there is no mechanism to reconcile
them. Fix the source. Record where the source lives on your
[product page](../products/index.md) so the next person can find it.

Boundary is the worked example. Its API reference is generated from protocol
buffers with `buf generate`, using the `openapiv2` plugin, into
`internal/gen/controller.swagger.json` in the Boundary repository, and published
by a separate pipeline. Boundary has no `api-docs` directory in this repository
at all. Refer to [products/boundary.md](../products/boundary.md#api-reference).

Everything below applies to authored API reference only.

## Existing examples

For examples of authored API reference pages that implement these guidelines,
refer to the following:

- [KV secrets engine v2](https://developer.hashicorp.com/vault/api-docs/secret/kv/kv-v2)
- [ACL token HTTP API](https://developer.hashicorp.com/consul/api-docs/acl/tokens)
- [Run triggers API](https://developer.hashicorp.com/terraform/cloud-docs/api-docs/run-triggers)

To start drafting, copy
[templates/api-reference.mdx](../templates/api-reference.mdx).

**HCP Terraform and Terraform Enterprise maintain their own API template**, at
`cloud-docs/api-docs/_template.mdx` in the content directory. It is more specific
than this one and its owners maintain it. Use theirs for those two products.

## North star principles

### One resource per page, one endpoint per section

A page documents the endpoints of a single resource. Each endpoint gets an H2
heading, and every endpoint on the page repeats the same block sequence. A reader
scanning for one endpoint should be able to find the same information in the same
place on every page in the set.

### Show a real request and a real response

The sample request and sample response are the most-read parts of the page.
Paste them from an actual call rather than composing them by hand — invented
responses are wrong in ways that are hard to spot and expensive to debug.

### Do not explain the product here

API reference describes endpoints. Workflows belong on usage pages, and the
concepts behind a resource belong on concept pages. Link out to them rather than
restating them. An endpoint description that runs past a short paragraph is
usually carrying content that belongs elsewhere.

## Page structure

Every endpoint section carries these blocks, in this order. Omit a block when the
endpoint has nothing for it; do not reorder them.

| Block | Level | Required |
| --- | --- | --- |
| Endpoint heading | H2 | Yes |
| Description | — | Yes |
| Method and path | — | Yes |
| Capability or permission table | — | Product-specific |
| Parameters | H3 | When the endpoint takes any |
| Sample payload | H3 | For endpoints with a request body |
| Sample request | H3 | Yes |
| Sample response | H3 | When the endpoint returns a body |

**Evidence for this shape.** 369 of the 450 authored API pages across the five
products carry both a sample request and a sample response block, and all five
document parameters in the same slot:

| Product | Pages | Sample request and response |
| --- | --- | --- |
| Vault | 190 | 147 |
| HCP Terraform | 91 | 84 |
| Terraform Enterprise | 72 | 63 |
| Nomad | 49 | 38 |
| Consul | 48 | 37 |

## Content block guidance

### Endpoint heading

Name the operation, not the HTTP method: "Create a token", not "PUT /acl/token".
Use the form "Verb a noun" or "Verb nouns".

Products differ on heading case. Vault uses sentence case, the other four use
title case. Match the pages around you; the style guide's preference for sentence
case does not justify making one page differ from its 40 siblings.

### Method and path

Present the method and path immediately after the description, before any H3. Two
conventions are in use and both are fine — match your product:

- **A table**, used by Vault, Consul, and Nomad:

  ```mdx
  | Method | Path                         |
  |:-------|:-----------------------------|
  | `POST` | `/:secret-mount-path/config` |
  ```

- **A single code span**, used by HCP Terraform and Terraform Enterprise, with
  the global `/api/v2` prefix omitted and the method capitalized:

  ```mdx
  `POST /organizations/:organization_name/somethings`
  ```

### Capability or permission table

Several products follow the method and path with a table of endpoint
characteristics — blocking query support, consistency modes, caching, required
ACLs, or the response status codes. These are product-specific and valuable; keep
whichever your product uses and match its columns exactly.

### Parameters

Name the block for what it documents: **Parameters**, **Query parameters**,
**Path parameters**, or **Request body**. Use more than one when an endpoint
takes more than one kind.

List each parameter with its name in code font, its type and default in
parentheses, then the description:

```mdx
- `parameter_name` `(string: <required>)` - What it does. Where it is specified,
  when that is not obvious. What happens when it is omitted.
```

Say explicitly when a parameter is part of the URL rather than the body.

### Sample payload, request, and response

Show the payload as JSON, the request as a runnable `curl` invocation with the
authentication header the product requires, and the response as the real body the
endpoint returns.

Keep the three consistent with each other: a reader should be able to run the
sample request against the sample payload and get the sample response.

## Writing style

Content types organize information. For word choice, formatting, headings,
links, and other page-level rules, refer to the
[style guide](../../style-guide/index.md), starting with the
[top 12 guidelines](../../style-guide/top-12.md).
