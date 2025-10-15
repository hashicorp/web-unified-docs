# Add a versioned docs to developer.hashicorp.com

You must create PRs to update the `dev-portal` and `web-unified-docs` APIs to add a new set of versioned docs. 

## Update the dev-portal API

1. Create a new branch for your changes in the `github.com/hashicorp/dev-portal` repository. 
1. In the `config/production.json` file, add a name for the new docs to the `"flags"."unified_docs_migraged_repos"` objects:

   ```json
   "flags": {
		"enable_datadog": true,
		"enable_io_beta_cta": true,
		"enable_hvd_on_preview_branch": false,
		"unified_docs_migrated_repos": [
		   "<existing-docs>",
         "<your-new-docs>"
      ]
   }
   ```

   Use a descriptive name. The API uses this string internally.

1. Make the following changes to the `src/data/<product>.json` file:
   - Add a base slug to the `"basePaths"` object. Take SEO into consideration when declaring the slug because it represents the first segment after the core product name in the URL, for example: `developer.hashicorp.com/terraform/<base-path-slug>`
   - Add the base path slug to the `"docsNavItems"` object so that it appears in the navigation.
   - Add an object with the following attributes:
      - `iconName`: For documentation, specify `"docs"`. Refer to the web engineering team for details about other supported values.
      - `name`: Declares the public name for the docs.
      - `path`: Must match the value you specified for the `"basePaths"` and `"docsNavItems"` objects.
      - `productSlugForLoader`: Must match the name you specified in the `"flags"."unified_docs_migraged_repos"` objects in the `config/production.json` file.

      The following example adds the Terraform MCP server docs:

      ```json
      {
	      "iconName": "docs",
	      "name": "Terraform MCP Server",
	      "path": "mcp-server",
	      "productSlugForLoader": "terraform-mcp-server"	
      }
      ```

1. Complete the following steps to create a homepage for the docs: 
   1. Create the `dev-portal/src/pages/<main-product>/<new-docs>` directory path.
   1. In the directory for the product docs, create a file named `[[...page]]].tsx`.
   1. Add the following code to the new file:

   ```typescript
   /**
   * Copyright (c) HashiCorp, Inc.
   * SPDX-License-Identifier: MPL-2.0
   */

   import DocsView from 'views/docs-view'
   import { getRootDocsPathGenerationFunctions } from 'views/docs-view/utils/get-root-docs-path-generation-functions'

   const { getStaticPaths, getStaticProps } = getRootDocsPathGenerationFunctions(
      '<main-product-eg-terraform>',
      '<value-you-added-for-basePaths-and-docsNavItems>',
      { projectName: '<name-for-the-docs-collection>' }
   )

   export { getStaticProps, getStaticPaths }
   export default DocsView
   ```

Before merging these changes, make changes to the `web-unified-docs` API. Refer to the [Example PRs](#example-prs) for guidance. 

## Update the web-unified-docs API

1. Create a new branch for your changes in the `github.com/hashicorp/web-unified-docs repository` repository.
1. Add the MDX files and a `nav.json` file for your new docs. 
1. Add an entry for the GitHub labeler so that GitHub automatically adds labels to pull requests when someone updates files in your new directory. 
   1. Open the `.github/labeler.yml` file.
   1. Add an object using the following syntax:

   ```yaml
   <string-for-your-label>:
  any:
    changed-files:
      any-glob-to-any-file: [
        'content/<dir-for-your-collection>/**'
      ]
   ```

1. If you need a specific team to act as reviewers, add the group to the repository `CODEOWERS` file. The following example adds the `team-docs-packer-and-terraform ` team to the MCP server documentation: 

   ```text
   content/terraform-mcp-server @hashicorp/team-docs-packer-and-terraform
   ```

1. Add an entry for your docs to the `productConfig.mjs` file. Use the following syntax:

   ```mjs
   '<name-you-declared-in-config/base.json-and-config/development.json-files': {
		assetDir: 'img',
		basePaths: ['<basePath-value-you-declared-in-basePaths-object'],
		contentDir: '<dir-where-you-added-mdx-files>',
		dataDir: 'data',
		productSlug: '<main-product-slug>',
		semverCoerce: semver.coerce,
		versionedDocs: true,
		websiteDir: 'website',
	},
   ```

   The following example adds the MCP server:

   ```mjs
   'terraform-mcp-server': {
		assetDir: 'img',
		basePaths: ['mcp-server'],
		contentDir: 'docs',
		dataDir: 'data',
		productSlug: 'terraform',
		semverCoerce: semver.coerce,
		versionedDocs: true,
		websiteDir: 'website',
	},
   ```

1. Duplicate the changes from step 5 to the `__fixtures__/productConfig.mjs` file in the root directory. This file is for testing purposes.

Push your changes but do not merge until you've launched a preview to verify your updates. Refer to the [Example PRs](#example-prs) for guidance. 

## Preview changes

Normal Vercel previews use the production state of the dev-portal API. As a result, you have to manually instruct Vercel to preview content changes in the `web-unified-docs` repository that rely on changes you make to the dev-portal API. Before you continue, request developer permissions for Vercel so that you can create variables necessary for generating previews that involve dev-portal API changes.

1. Log into Vercel and go into the dev-portal project.
1. Click on **Settings**, then select the **Environment Variables** in the sidebar menu.
1. Click the **Create** new tab. 
1. Open the drop-down menu in the **Environments** section and disable **Development** so that only **Preview** is selected.
1. Click **Select a custom Preview branch** and choose your dev-portal branch. 
1. Set the new variable key to `UNIFIED_DOCS_API`.
1. Open another browser window and go to your `web-unified-docs` PR. 
1. In the **Vercel Previews Deployed** section, copy the URL of the **Unified Docs API preview** link, for example `https://web-unified-docs-beequ48j2-hashicorp.vercel.app/`.
1. Set the `UNIFIED_DOCS_API` variable value to the **Unified Docs API preview** link and save the variable.
1. Confirm that you want to redeploy the dev-portal branch preview when prompted. If Vercel does not prompt you, complete the following steps to redeploy the preview manually: 
   1. Click the **Deployment** tab at the top of the page.
   1. Find your preview and choose **Redeploy** from the ellipses menu.

After each commit to your working `web-unifed-docs` PR, you must update the variable with the new preview URL and redeploy to see changes. 

## Merge PRs

When you are ready to publish your changes, merge the PRs in the following order:

1. `web-unified-docs` 
1. `dev-portal`

## Redeploy the website

After merging your changes, you must redeploy the website. If you do not have appropriate permissions, you can ask for assistance in the `#team-web-support` channel. This process takes approximately 10 to 15 minutes to complete. Verify that your changes appear. If you have any issues, reach out to `#team-web-support`.

## Example PRs

Refer to the following examples for guidance on how to update the APIs.

### TF migrate

- https://github.com/hashicorp/web-unified-docs/pull/555
- https://github.com/hashicorp/dev-portal/pull/2808

### MCP server

- https://github.com/hashicorp/dev-portal/pull/2835
- https://github.com/hashicorp/web-unified-docs/pull/949