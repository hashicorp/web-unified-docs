/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import versionMetadata from '@api/versionMetadata.json'
import { Ok, Err } from '@utils/result'

type ProductVersionMetadata = {
	version: string
	isLatest: boolean
	releaseStage: string
}

type VersionMetadataMap = Record<string, ProductVersionMetadata[]>

export const getProductVersion = (
	productSlug: string,
	version: string,
	versionMetaData: VersionMetadataMap = versionMetadata,
) => {
	const productVersionMetadata = versionMetaData[productSlug]

	if (!productVersionMetadata) {
		return Err(`Product, ${productSlug}, not found in version metadata`)
	}

	let parsedVersion
	if (version === 'latest') {
		// Grab the latest version of the product
		const foundVersion = productVersionMetadata.find(
			(v: ProductVersionMetadata) => {
				return v.isLatest
			},
		)

		if (!foundVersion || foundVersion.version === 'v0.0.x') {
			parsedVersion = '' // Set to an empty string if no latest version is found, as in the case for versionless docs such as terraform-docs-common
		} else {
			parsedVersion = foundVersion.version
		}
	} else {
		// Ensure the requested version is valid
		if (
			!productVersionMetadata.find((v: ProductVersionMetadata) => {
				return v.version === version
			})
		) {
			return Err(`Product, ${productSlug}, has no "${version}" version`)
		}

		parsedVersion = version
	}

	return Ok(parsedVersion)
}

export const getProductVersionMetadata = (
	productSlug: string,
	versionMetaData: VersionMetadataMap = versionMetadata,
) => {
	if (versionMetaData[productSlug]) {
		return Ok(versionMetaData[productSlug])
	}

	return Err(`Product, ${productSlug}, not found in version metadata`)
}
