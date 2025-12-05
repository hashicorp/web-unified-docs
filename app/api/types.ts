/**
 * Copyright IBM Corp. 2025
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
