/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import versionMetadata from '#api/versionMetadata.json'
import { Ok, Err } from '#utils/result'

import { PRODUCT_CONFIG } from '#productConfig.mjs'

export type ProductVersionMetadata = {
	version: string
	isLatest: boolean
	releaseStage: string
}

type VersionMetadataMap = Record<string, ProductVersionMetadata[]>

export const getProductVersionMetadata = (
	productSlug: string,
	version: string,
	versionMetaData: VersionMetadataMap = versionMetadata,
) => {
	const productVersionMetadata = versionMetaData[productSlug]

	if (!productVersionMetadata) {
		return Err(`Product, ${productSlug}, not found in version metadata`)
	}

	let parsedVersion, releaseStage, isLatest
	if (version === 'latest') {
		// Grab the latest version of the product
		const foundVersion = productVersionMetadata.find(
			(v: ProductVersionMetadata) => {
				return v.isLatest
			},
		)

		releaseStage = foundVersion.releaseStage
		isLatest = foundVersion.isLatest
		if (!PRODUCT_CONFIG[productSlug].versionedDocs) {
			parsedVersion = '' // Set to an empty string if no latest version is found, as in the case for versionless docs such as terraform-docs-common
		} else {
			parsedVersion = foundVersion.version
		}
	} else {
		// Ensure the requested version is valid
		const foundVersion = productVersionMetadata.find(
			(v: ProductVersionMetadata) => {
				return v.version === version
			},
		)

		if (!foundVersion) {
			return Err(`Product, ${productSlug}, has no "${version}" version`)
		}

		releaseStage = foundVersion.releaseStage
		isLatest = foundVersion.isLatest
		parsedVersion = version
	}

	return Ok({ version: parsedVersion, releaseStage, isLatest })
}

export const getProductMetadata = (
	productSlug: string,
	versionMetaData: VersionMetadataMap = versionMetadata,
) => {
	if (versionMetaData[productSlug]) {
		return Ok(versionMetaData[productSlug])
	}

	return Err(`Product, ${productSlug}, not found in version metadata`)
}
