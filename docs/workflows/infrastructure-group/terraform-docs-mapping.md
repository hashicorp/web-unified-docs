# Terraform docs directory to published location mapping

Terraform documentation on `developer.hashicorp.com/terraform` is assembled from
13 separate content directories in `web-unified-docs`, one for each Terraform
sub-product. This page describes those directories, shows how each maps to a
`productConfig.mjs` entry and a published URL path, and provides a URL-to-file
reference for locating the source file behind any given page.

Refer to [Terraform docs rendering
architecture](terraform-docs-rendering-architecture.md) for engineering-level
detail on how the `dev-portal` platform renders all the Terraform docs content.

## The 13 Terraform content directories

The `content/` directory in `web-unified-docs` contains 13 subdirectories whose names begin with `terraform`. Each maps to a distinct entry in [`productConfig.mjs`](../../productConfig.mjs). Together they compose all Terraform documentation on the developer portal.

| Content directory | `productSlug` (API key) | URL base path(s) | Versioned? |
|---|---|---|---|
| `content/terraform/` | `terraform` | `cli`, `internals`, `intro`, `language` | ✅ |
| `content/terraform-docs-common/` | `terraform-docs-common` | `cloud-docs`, `docs`, `plugin`, `registry` | ❌ (always `v0.0.x`) |
| `content/terraform-docs-agents/` | `terraform-docs-agents` | `cloud-docs/agents` | ✅ |
| `content/terraform-enterprise/` | `terraform-enterprise` | `enterprise` | ✅ (date-versioned, for example `v202507-1`) |
| `content/terraform-cdk/` | `terraform-cdk` | `cdktf` | ✅ |
| `content/terraform-plugin-framework/` | `terraform-plugin-framework` | `plugin/framework` | ✅ |
| `content/terraform-plugin-sdk/` | `terraform-plugin-sdk` | `plugin/sdkv2` | ✅ |
| `content/terraform-plugin-mux/` | `terraform-plugin-mux` | `plugin/mux` | ✅ |
| `content/terraform-plugin-log/` | `terraform-plugin-log` | `plugin/log` | ✅ |
| `content/terraform-plugin-testing/` | `terraform-plugin-testing` | `plugin/testing` | ✅ |
| `content/terraform-migrate/` | `terraform-migrate` | `migrate` | ✅ |
| `content/terraform-mcp-server/` | `terraform-mcp-server` | `mcp-server` | ✅ |
| `content/terraform-policy/` | `terraform-policy` | `policy` | ✅ |

All 13 content directories use `productSlug: 'terraform'` in
`productConfig.mjs`, so they all end up under the `/terraform/` URL namespace in
`dev-portal`.

The `productSlug` field in `productConfig.mjs` is the API routing key used by
`web-unified-docs`. The `productSlug` in `src/data/terraform.json` inside
`dev-portal` is the frontend product identifier. They are different concepts
that share the value `"terraform"` for the core Terraform repo.

#### Shared content with HCP Terraform

Most `terraform-enterprise` content is copied from
`content/terraform-docs-common/docs/cloud-docs/`, the same source that HCP
Terraform docs render from. Because of this, a change that should affect both
editions has to be made in two places: `terraform-docs-common/cloud-docs` and
the corresponding `terraform-enterprise/<version>` directory. Editing only one
leaves the two editions out of sync until the next content synchronization
overwrites the un-mirrored change. Refer to [Terraform Enterprise quarterly
releases](./publish-tfe-docs.md) for the synchronization workflow and exclusion
tag syntax used to keep HCP Terraform-only or Terraform Enterprise-only content
from leaking into the other edition.

### Contribute to a content directory

To find the source file for a page you want to update, click the **Edit this page on GitHub** button at the bottom of the published page. This navigates directly to the correct `.mdx` file in the repository.

If you prefer to locate files manually or are creating a new page, use the
following table to find the right directory. Each row describes what the
directory contains, which URL paths it drives, and where to open a pull request.

| Content directory | What it contains | Published at |
|---|---|---|
| `content/terraform/` | Terraform language reference, CLI reference, internals, and intro | `/terraform/language`, `/terraform/cli`, `/terraform/internals`, `/terraform/intro` | 
| `content/terraform-docs-common/` | HCP Terraform docs, general Terraform docs, plugin overview pages, and public registry publishing docs | `/terraform/cloud-docs`, `/terraform/docs`, `/terraform/plugin` (overview), `/terraform/registry` |
| `content/terraform-docs-agents/` | HCP Terraform Agents | `/terraform/cloud-docs/agents` |
| `content/terraform-enterprise/` | Terraform Enterprise deployment, administration, upgrade instructions, and release notes | `/terraform/enterprise` |
| `content/terraform-cdk/` | CDK for Terraform (CDKTF, deprecated) | `/terraform/cdktf` |
| `content/terraform-plugin-framework/` | Plugin Framework reference docs | `/terraform/plugin/framework` |
| `content/terraform-plugin-sdk/` | Plugin SDKv2 reference docs | `/terraform/plugin/sdkv2` |
| `content/terraform-plugin-mux/` | Plugin muxing reference docs | `/terraform/plugin/mux` |
| `content/terraform-plugin-log/` | Plugin logging reference docs | `/terraform/plugin/log` |
| `content/terraform-plugin-testing/` | Plugin testing reference docs | `/terraform/plugin/testing` |
| `content/terraform-migrate/` | `tf-migrate` CLI docs | `/terraform/migrate` |
| `content/terraform-mcp-server/` | Terraform MCP Server docs | `/terraform/mcp-server` |
| `content/terraform-policy/` | Terraform Policy docs | `/terraform/policy` |

### Directory layout convention

Versioned products follow this structure:

```
content/<repo-slug>/
  <version>/         # e.g. v1.14.x
    docs/            # MDX content files  (contentDir in productConfig)
    data/            # *-nav-data.json    (dataDir in productConfig)
    img/             # image assets       (assetDir in productConfig)
    partials/        # MDX partials (inlined at build time)
    redirects.jsonc  # URL redirect rules
```

Unversioned products, such as `terraform-docs-common`, omit the version segment.

```
content/terraform-docs-common/
  docs/
  data/
  img/
  redirects.jsonc
```

---

## URL-to-file reference

This section maps every published URL path under `developer.hashicorp.com/terraform/` to its source file location in `web-unified-docs/content/`. The formula for every mapping is:

```
https://developer.hashicorp.com/terraform/<url-path>
    ↓ resolved by dev-portal through productSlugForLoader
content/<repo>/<version>/docs/<file-path>.mdx
    (or <file-path>/index.mdx for directory index pages)
```

> **How to read the table**
> - **URL path**: the path segment after `developer.hashicorp.com/terraform/`, with optional version segment shown in `[brackets]`.
> - **Source file path**: relative to the repo root; `<v>` is a placeholder for the current version directory (for example, `v1.14.x`).
> - **Nav-data file**: the JSON file that drives the sidebar for this section.
> - The **latest version** for each product is determined at prebuild by
>   [`gather-version-metadata.mjs`](../../../scripts/prebuild/gather-version-metadata.mjs) and recorded in [`app/api/versionMetadata.json`](../../../app/api/versionMetadata.json).

### `content/terraform/`: CLI, language, internals, intro

API slug: `terraform` · Versioned: yes (semver, for example `v1.14.x`)

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/cli[/<v>]/...` | `content/terraform/<v>/docs/cli/...mdx` | `content/terraform/<v>/data/cli-nav-data.json` |
| `/terraform/language[/<v>]/...` | `content/terraform/<v>/docs/language/...mdx` | `content/terraform/<v>/data/language-nav-data.json` |
| `/terraform/internals[/<v>]/...` | `content/terraform/<v>/docs/internals/...mdx` | `content/terraform/<v>/data/internals-nav-data.json` |
| `/terraform/intro[/<v>]/...` | `content/terraform/<v>/docs/intro/...mdx` | `content/terraform/<v>/data/intro-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/language/resources/configure`
→ `content/terraform/v1.14.x/docs/language/resources/configure.mdx`

**Example (versioned):** `https://developer.hashicorp.com/terraform/v1.13.x/language/resources/configure`
→ `content/terraform/v1.13.x/docs/language/resources/configure.mdx`

---

### `content/terraform-docs-common/`: HCP Terraform docs, plugin overview, registry, general docs

API slug: `terraform-docs-common` · Versioned: **no** (always resolves to the single unversioned directory at `content/terraform-docs-common/`)

This directory holds content for four distinct URL sections. The file lives at the path matching the URL segment after the section prefix:

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/cloud-docs/...` | `content/terraform-docs-common/docs/cloud-docs/...mdx` | `content/terraform-docs-common/data/cloud-docs-nav-data.json` |
| `/terraform/docs/...` | `content/terraform-docs-common/docs/docs/...mdx` | `content/terraform-docs-common/data/docs-nav-data.json` |
| `/terraform/plugin/...` *(overview pages only)* | `content/terraform-docs-common/docs/plugin/...mdx` | `content/terraform-docs-common/data/plugin-nav-data.json` |
| `/terraform/registry/...` | `content/terraform-docs-common/docs/registry/...mdx` | `content/terraform-docs-common/data/registry-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/cloud-docs/migrate`
→ `content/terraform-docs-common/docs/cloud-docs/migrate.mdx`

**Example:** `https://developer.hashicorp.com/terraform/docs/glossary`
→ `content/terraform-docs-common/docs/docs/glossary.mdx`

**Example:** `https://developer.hashicorp.com/terraform/plugin`
→ `content/terraform-docs-common/docs/plugin/index.mdx`

> **Note:** The top-level `plugin/` overview pages (index, how-terraform-works,
> debugging, best-practices, and similar pages) live in `terraform-docs-common`.
> The versioned SDK-specific sub-sections (`plugin/framework`, `plugin/sdkv2`,
> `plugin/mux`, `plugin/log`, `plugin/testing`) each come from their own
> dedicated repository.

---

### `content/terraform-docs-agents/`: HCP Terraform Agents

API slug: `terraform-docs-agents` · Versioned: yes (semver, for example `v1.25.x`)

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/cloud-docs/agents[/<v>]/...` | `content/terraform-docs-agents/<v>/docs/cloud-docs/agents/...mdx` | `content/terraform-docs-agents/<v>/data/cloud-docs-agents-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/cloud-docs/agents`
→ `content/terraform-docs-agents/v1.25.x/docs/cloud-docs/agents/index.mdx`

---

### `content/terraform-enterprise/`: Terraform Enterprise

API slug: `terraform-enterprise` · Versioned: yes (semver, for example `v2.0.x`)

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/enterprise[/<v>]/...` | `content/terraform-enterprise/<v>/docs/enterprise/...mdx` | `content/terraform-enterprise/<v>/data/enterprise-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/enterprise`
→ `content/terraform-enterprise/v202507-1/docs/enterprise/index.mdx`

**Example (versioned):** `https://developer.hashicorp.com/terraform/enterprise/v202504-1/deploy`
→ `content/terraform-enterprise/v202504-1/docs/enterprise/deploy/index.mdx`

> Before August 11, 2025, Terraform Enterprise used calendar-date versions (`v202507-1`) rather than
> semver. Refer to [Terraform Enterprise: Special
> Versioning](#terraform-enterprise-special-versioning) for the custom sort
> logic.

---

### `content/terraform-cdk/`: CDK for Terraform

API slug: `terraform-cdk` · Versioned: yes (semver, for example `v0.21.x`)

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/cdktf[/<v>]/...` | `content/terraform-cdk/<v>/docs/cdktf/...mdx` | `content/terraform-cdk/<v>/data/cdktf-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/cdktf/concepts`
→ `content/terraform-cdk/v0.21.x/docs/cdktf/concepts/index.mdx`

---

### `content/terraform-plugin-framework/`: Plugin Framework

API slug: `terraform-plugin-framework` · Versioned: yes (semver, for example `v1.16.x`)

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/plugin/framework[/<v>]/...` | `content/terraform-plugin-framework/<v>/docs/plugin/framework/...mdx` | `content/terraform-plugin-framework/<v>/data/plugin-framework-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/plugin/framework`
→ `content/terraform-plugin-framework/v1.16.x/docs/plugin/framework/index.mdx`

---

### `content/terraform-plugin-sdk/`: Plugin SDKv2

API slug: `terraform-plugin-sdk` · Versioned: yes (semver, for example `v2.38.x`)

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/plugin/sdkv2[/<v>]/...` | `content/terraform-plugin-sdk/<v>/docs/plugin/sdkv2/...mdx` | `content/terraform-plugin-sdk/<v>/data/plugin-sdkv2-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/plugin/sdkv2`
→ `content/terraform-plugin-sdk/v2.38.x/docs/plugin/sdkv2/index.mdx`

---

### `content/terraform-plugin-mux/`: Plugin Mux (combining and translating)

API slug: `terraform-plugin-mux` · Versioned: yes (semver, for example `v0.21.x`)

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/plugin/mux[/<v>]/...` | `content/terraform-plugin-mux/<v>/docs/plugin/mux/...mdx` | `content/terraform-plugin-mux/<v>/data/plugin-mux-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/plugin/mux`
→ `content/terraform-plugin-mux/v0.21.x/docs/plugin/mux/index.mdx`

---

### `content/terraform-plugin-log/`: Plugin Logging

API slug: `terraform-plugin-log` · Versioned: yes (semver, for example `v0.9.x`)

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/plugin/log[/<v>]/...` | `content/terraform-plugin-log/<v>/docs/plugin/log/...mdx` | `content/terraform-plugin-log/<v>/data/plugin-log-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/plugin/log`
→ `content/terraform-plugin-log/v0.9.x/docs/plugin/log/index.mdx`

---

### `content/terraform-plugin-testing/`: Plugin Testing

API slug: `terraform-plugin-testing` · Versioned: yes (semver, for example `v1.13.x`)

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/plugin/testing[/<v>]/...` | `content/terraform-plugin-testing/<v>/docs/plugin/testing/...mdx` | `content/terraform-plugin-testing/<v>/data/plugin-testing-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/plugin/testing`
→ `content/terraform-plugin-testing/v1.13.x/docs/plugin/testing/index.mdx`

---

### `content/terraform-migrate/`: Terraform Migrate

API slug: `terraform-migrate` · Versioned: yes (semver, for example `v2.0.x`)

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/migrate[/<v>]/...` | `content/terraform-migrate/<v>/docs/migrate/...mdx` | `content/terraform-migrate/<v>/data/migrate-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/migrate`
→ `content/terraform-migrate/v2.0.x/docs/migrate/index.mdx`

---

### `content/terraform-mcp-server/`: Terraform MCP Server

API slug: `terraform-mcp-server` · Versioned: yes (semver, for example `v0.3.x`)

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/mcp-server[/<v>]/...` | `content/terraform-mcp-server/<v>/docs/mcp-server/...mdx` | `content/terraform-mcp-server/<v>/data/mcp-server-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/mcp-server/deploy`
→ `content/terraform-mcp-server/v0.3.x/docs/mcp-server/deploy.mdx`

---

### `content/terraform-policy/`: Terraform Policy

API slug: `terraform-policy` · Versioned: yes (semver, `v0.1.x` (beta))

| URL path | Source file | Nav-data file |
|---|---|---|
| `/terraform/policy[/<v>]/...` | `content/terraform-policy/<v>/docs/policy/...mdx` | `content/terraform-policy/<v>/data/policy-nav-data.json` |

**Example:** `https://developer.hashicorp.com/terraform/policy`
→ `content/terraform-policy/v0.1.x (beta)/docs/policy/index.mdx`

> The version directory name `v0.1.x (beta)` includes the release stage in
> parentheses. The prebuild pipeline strips the ` (beta)` suffix when building
> the API version string, but the filesystem path retains it.

---

### Quick-reference: all URL patterns in one place

| URL path prefix | Source `content/` directory | `docs/` sub-path |
|---|---|---|
| `/terraform/cli` | `content/terraform/<v>/` | `docs/cli/` |
| `/terraform/language` | `content/terraform/<v>/` | `docs/language/` |
| `/terraform/internals` | `content/terraform/<v>/` | `docs/internals/` |
| `/terraform/intro` | `content/terraform/<v>/` | `docs/intro/` |
| `/terraform/cloud-docs` | `content/terraform-docs-common/` | `docs/cloud-docs/` |
| `/terraform/cloud-docs/agents` | `content/terraform-docs-agents/<v>/` | `docs/cloud-docs/agents/` |
| `/terraform/docs` | `content/terraform-docs-common/` | `docs/docs/` |
| `/terraform/enterprise` | `content/terraform-enterprise/<v>/` | `docs/enterprise/` |
| `/terraform/cdktf` | `content/terraform-cdk/<v>/` | `docs/cdktf/` |
| `/terraform/plugin` *(overview)* | `content/terraform-docs-common/` | `docs/plugin/` |
| `/terraform/plugin/framework` | `content/terraform-plugin-framework/<v>/` | `docs/plugin/framework/` |
| `/terraform/plugin/sdkv2` | `content/terraform-plugin-sdk/<v>/` | `docs/plugin/sdkv2/` |
| `/terraform/plugin/mux` | `content/terraform-plugin-mux/<v>/` | `docs/plugin/mux/` |
| `/terraform/plugin/log` | `content/terraform-plugin-log/<v>/` | `docs/plugin/log/` |
| `/terraform/plugin/testing` | `content/terraform-plugin-testing/<v>/` | `docs/plugin/testing/` |
| `/terraform/registry` | `content/terraform-docs-common/` | `docs/registry/` |
| `/terraform/migrate` | `content/terraform-migrate/<v>/` | `docs/migrate/` |
| `/terraform/mcp-server` | `content/terraform-mcp-server/<v>/` | `docs/mcp-server/` |
| `/terraform/policy` | `content/terraform-policy/<v>/` | `docs/policy/` |

## Add a new Terraform sub-product

Refer to [Add a versioned docs set to
developer.hashicorp.com](../add-versioned-docs.md) for complete workflow
instructions.
