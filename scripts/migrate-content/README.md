# Content Migration Scripts

The intent with the scripts in `scripts/migrate-content` is to be able to automatically migrate versioned documentation from all content source repositories that currently provide "docs content" to `developer.hashicorp.com`.

How to use:
> Migrate over all Terraform content:
`node ./scripts/migrate-content/migrate-content.mjs terraform`

> Migrate over all Terraform content and override existing content:
`node ./scripts/migrate-content/migrate-content.mjs terraform -force`

> Migrate Terraform v1.1.x content:
`node ./scripts/migrate-content/migrate-content.mjs terraform:v1.1.x`

> Migrate content for many products at once:
`node ./scripts/migrate-content/migrate-content.mjs boundary consul terraform`

For details on what we mean when we say "docs content", see [How docs content gets on developer.hashicorp.com - Web Presence Internal Docs](https://web-presence-internal-docs-hashicorp.vercel.app/DevPortal/how-docs-content-gets-on-developer/).
