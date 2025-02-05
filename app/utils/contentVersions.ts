import { Ok, Err } from '@utils/result'
import fs from 'fs'
import { join } from 'path'

export const getProductVersion = (productSlug: string, version: string) => {
	const VERSION_METADATA_FILE = join(
		process.cwd(),
		'app/api/versionMetadata.json',
	)
	const versionMetadata = JSON.parse(
		fs.readFileSync(VERSION_METADATA_FILE, 'utf8'),
	)
	const productVersionMetadata = versionMetadata[productSlug]

	if (!productVersionMetadata) {
		return Err(`Product, ${productSlug}, not found in version metadata`)
	}

	let parsedVersion
	if (version === 'latest') {
		// Grab the latest version of the product
		const foundVersion = productVersionMetadata.find((v) => {
			return v.isLatest
		})

		if (!foundVersion) {
			parsedVersion = '' // Set to an empty string if no latest version is found, as in the case for versionless docs such as terraform-docs-common
		} else {
			parsedVersion = foundVersion.version
		}
	} else {
		// Ensure the requested version is valid
		if (
			!productVersionMetadata.find((v) => {
				return v.version === version
			})
		) {
			return Err(`Product, ${productSlug}, has no "${version}" version`)
		}

		parsedVersion = version
	}

	return Ok(parsedVersion)
}

export const getProductVersionMetadata = (productSlug: string) => {
	const VERSION_METADATA_FILE = join(
		process.cwd(),
		'app/api/versionMetadata.json',
	)
	const versionMetadata = JSON.parse(
		fs.readFileSync(VERSION_METADATA_FILE, 'utf8'),
	)

	if (versionMetadata[productSlug]) {
		return Ok(versionMetadata[productSlug])
	}

	return Err(`Product, ${productSlug}, not found in version metadata`)
}
