/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { Ok, Err, errorResultToString } from '#utils/result'
import docsPathsAllVersions from '#api/docsPathsAllVersions.json'
import { getProductVersionMetadata } from './contentVersions'
import { PRODUCT_CONFIG } from '#productConfig.mjs'

export const getDocsPaths = async (
	productSlugs: string[],
	docsPathsData: typeof docsPathsAllVersions = docsPathsAllVersions,
) => {
	const paths = productSlugs
		.map((productSlug: string) => {
			const latestProductMetadata = getProductVersionMetadata(
				productSlug,
				'latest',
			)

			if (!latestProductMetadata.ok) {
				console.error(errorResultToString('API', latestProductMetadata))
				return []
			}

			const { version, releaseStage } = latestProductMetadata.value

			let parsedVersion
			if (!PRODUCT_CONFIG[productSlug].versionedDocs) {
				parsedVersion = 'v0.0.x'
			} else if (releaseStage !== 'stable') {
				parsedVersion = `${version} (${releaseStage})`
			} else {
				parsedVersion = version
			}

			const docsPath = docsPathsData[productSlug]?.[parsedVersion]

			if (!docsPath) {
				console.error(
					`Product, ${productSlug}, version ${parsedVersion}, not found in docs paths`,
				)
				return []
			}

			return docsPath
		})
		.flat()

	if (paths !== undefined && paths.length > 0) {
		return Ok(paths)
	}
	return Err('All docs paths not found')
}
