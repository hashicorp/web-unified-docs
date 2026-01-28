/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, test, expect } from 'vitest'
import { collectCodeListItems } from './collect-code-list-items.mjs'

describe('collectCodeListItems', () => {
	test('should collect content from list items that start with inline code', async () => {
		const mdxContent = `# Setting Up Logging for HTTP Transactions

The recommended logging helper for SDK is built on top of [terraform-plugin-log](/terraform/plugin/log). This lets you leverage the features from our structured logging framework without having to write an entire implementation of \`http.RoundTripper\`.

There are two functions inside \`helper/logging\` that target a specific logging setup for your provider. Refer to [“Writing Log Output”](/terraform/plugin/log/writing) for details.

-   \`NewLoggingHTTPTransport(transport http.RoundTripper)\`: Use this method when you want logging against the \`tflog\` Provider root logger.
-   \`NewSubsystemLoggingHTTPTransport(subsystem string, transport http.RoundTripper)\`: Use this method when you want logging against a \`tflog\` Provider [Subsystem logger](/terraform/plugin/log/writing#subsystems). The \`subsystem\` string you use with \`NewSubsystemLoggingHTTPTransport()\` must match the [pre-created subsystem logger name](/terraform/plugin/log/writing#create-subsystems).

To set up HTTP transport, you must create the HTTP Client to use the new transport and then add logging configuration to the HTTP request context.`

		const result = await collectCodeListItems(mdxContent)
		expect(result).toEqual([
			'NewLoggingHTTPTransport(transport http.RoundTripper)',
			'NewSubsystemLoggingHTTPTransport(subsystem string, transport http.RoundTripper)',
		])
		expect(result).not.toContain('NewSubsystemLoggingHTTPTransport()')
	})

	test('should return an empty array if no list items start with inline code', async () => {
		const mdxContent = `
-   [AWS](/terraform/enterprise/cost-estimation/aws)
-   [GCP](/terraform/enterprise/cost-estimation/gcp)
-   [Azure](/terraform/enterprise/cost-estimation/azure)`

		const result = await collectCodeListItems(mdxContent)
		expect(result).toEqual([])
	})

	test('should return an empty array for nested list items that do not start with inline code, but contain inline code', async () => {
		const mdxContent = `### 2021-06-8

-   Updated [Registry Module APIs](/terraform/enterprise/api-docs/private-registry/modules).
    -   added \`registry_name\` scoped APIs.
    -   added \`organization_name\` scoped APIs.`
		const result = await collectCodeListItems(mdxContent)
		expect(result).toEqual([])
	})

	test('should handle nested list items that start with inline code', async () => {
		const mdxContent = `### 2021-06-8

-   Updated [Registry Module APIs](/terraform/enterprise/api-docs/private-registry/modules).
    -   added \`registry_name\` scoped APIs.
    -   added \`organization_name\` scoped APIs.
    -   added [Module List API](/terraform/enterprise/api-docs/private-registry/modules#list-registry-modules-for-an-organization).
    -   updated [Module Delete APIs](/terraform/enterprise/api-docs/private-registry/modules#delete-a-module) (see deprecation note below).
    -   **CLOUD**: added public registry module related APIs.
-   **DEPRECATION**: The following [Registry Module APIs](/terraform/enterprise/api-docs/private-registry/modules) have been replaced with newer apis and will be removed in the future.
    -   The following endpoints to delete modules are replaced with [Module Delete APIs](/terraform/enterprise/api-docs/private-registry/modules#delete-a-module)
        -   \`POST /registry-modules/actions/delete/:organization_name/:name/:provider/:version\` replaced with \`DELETE /organizations/:organization_name/registry-modules/:registry_name/:namespace/:name/:provider/:version\`
        -   \`POST /registry-modules/actions/delete/:organization_name/:name/:provider\` replaced with \`DELETE /organizations/:organization_name/registry-modules/:registry_name/:namespace/:name/:provider\`
        -   \`POST /registry-modules/actions/delete/:organization_name/:name\` replaced with \`DELETE /organizations/:organization_name/registry-modules/:registry_name/:namespace/:name\`
    -   \`POST /registry-modules\` replaced with [\`POST /organizations/:organization_name/registry-modules/vcs\`](/terraform/enterprise/api-docs/private-registry/modules#publish-a-private-module-from-a-vcs)
    -   \`POST /registry-modules/:organization_name/:name/:provider/versions\` replaced with [\`POST /organizations/:organization_name/registry-modules/:registry_name/:namespace/:name/:provider/versions\`](/terraform/enterprise/api-docs/private-registry/modules#create-a-module-version)
    -   \`GET /registry-modules/show/:organization_name/:name/:provider\` replaced with [\`GET /organizations/:organization_name/registry-modules/:registry_name/:namespace/:name/:provider\`](/terraform/enterprise/api-docs/private-registry/modules#get-a-module)`

		const result = await collectCodeListItems(mdxContent)
		expect(result).toEqual([
			'POST /registry-modules/actions/delete/:organization_name/:name/:provider/:version',
			'POST /registry-modules/actions/delete/:organization_name/:name/:provider',
			'POST /registry-modules/actions/delete/:organization_name/:name',
			'POST /registry-modules',
			'POST /registry-modules/:organization_name/:name/:provider/versions',
			'GET /registry-modules/show/:organization_name/:name/:provider',
		])
	})
})
