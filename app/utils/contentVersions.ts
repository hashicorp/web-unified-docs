import versionMetadata from '@api/versionMetadata.json'

import { Ok, Err } from '@utils/result'

export const getProductVersion = (productSlug: string, version: string) => {
	const productVersionMetadata = versionMetadata[productSlug]

	if (!productVersionMetadata) {
		return Err(`Product, ${productSlug}, not found in version metadata`)
	}

	let parsedVersion
	if (version === 'latest') {
		// Grab the latest version of the product
		const foundVersion = productVersionMetadata.find((v) => v.isLatest)

		if (!foundVersion) {
			return Err(`Product, ${productSlug}, has no "${version}" version`)
		}

		parsedVersion = foundVersion.version
	} else {
		// Ensure the requested version is valid
		if (!productVersionMetadata.find((v) => v.version === version)) {
			return Err(`Product, ${productSlug}, has no "${version}" version`)
		}

		parsedVersion = version
	}

	return Ok(parsedVersion)
}

export const getProductVersionMetadata = (productSlug: string) => {
	if (versionMetadata[productSlug]) {
		return Ok(versionMetadata[productSlug])
	}

	return Err(`Product, ${productSlug}, not found in version metadata`)
}
