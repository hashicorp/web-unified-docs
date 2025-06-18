/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

// Composable productSlug param type for typing request handlers
export type ProductParam = {
	/**
	 * The product that docs are being requested for
	 * @example 'terraform'
	 */
	productSlug: string
}

// Composable version param type for typing request handlers
export type VersionParam = {
	/**
	 * Can be a semver version
	 * @example 'v.1.9.x'
	 * or a dated version string for PTFE
	 * @example 'v20220610-01'
	 */
	version: string
}

/**
 * Utility type for the combination of `productSlug` and `version` together(since the
 * two are often expected together in our API handlers). For example, an API
 * handler might be passed the following params:
 *
 * @example const response = await GET(req, { product: 'terraform', version: 'v20220610-01' })
 */
export type VersionedProduct = ProductParam & VersionParam

/**
 * A single document metadata record representing a single document
 * (.mdx file, really) on disk
 */
export type DocPathRecord = {
	/**
	 * The path that API clients should use to request this document
	 */
	path: string
	/**
	 * The path on disk (relative to the app root) where this document is located
	 */
	itemPath: string
	/**
	 * A timestamp in ISO8601 format
	 */
	created_at: string
	/**
	 * A unique stable identifier for a document used to link documents accross
	 * versions. This identifier should be considered globally unique.
	 */
	id?: string
}

/**
 * An array of {@link DocPathRecord} objects representative of all the
 * documentation for a particular version of a product
 * @example
 * ```js
 * {
 *   "v1.0.x": [
 *     {
 *          created_at: '2025-05-01 13:54'
 *          path: 'terraform/account/settings',
 *          itemPath: 'content/terraform/v1.0.x/docs/account/settings.mdx',
 *     },
 *     {
 *          created_at: '2025-05-01 13:54'
 *          path: 'terraform/account/settings',
 *          itemPath: 'content/terraform/v1.0.x/docs/account/settings.mdx',
 *     },
 *   ]
 * }
 * ```
 */
export type VersionDocumentGroup = Record<string, DocPathRecord[]>

/**
 * The top level type of docsPathsAllVersions.json.
 *
 * @example
 * ```js
 * {
 *   "terraform": {
 *     "v1.0.x": [
 *       {
 *            created_at: '2025-05-01 13:54'
 *            path: 'terraform/account/settings',
 *            itemPath: 'content/terraform/v1.0.x/docs/account/settings.mdx',
 *       },
 *       {
 *            created_at: '2025-05-01 13:54'
 *            path: 'terraform/account/settings',
 *            itemPath: 'content/terraform/v1.0.x/docs/account/settings.mdx',
 *       },
 *     ],
 *   },
 * }
 * ```
 */
export type DocPathMetadata = Record<string, VersionDocumentGroup>
