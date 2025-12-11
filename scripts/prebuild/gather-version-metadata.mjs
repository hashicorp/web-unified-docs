/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
// Third-party
import semver from 'semver'

import { PRODUCT_CONFIG } from '#productConfig.mjs'

const acceptedReleaseStages = ['alpha', 'beta', 'rc']

/**
 * Given a content directory, and a JSON output file, build version metadata
 * based on the content directory structure, and return it.
 *
 * @param {string} contentDir
 * @returns {Promise<Record<string, unknown>} versionMetadata
 */
export async function gatherVersionMetadata(contentDir) {
	// Set up the version metadata object, this is what we'll return
	const versionMetadata = {}
	/**
	 * We expect the content directory to contain a directory for each product.
	 * Note that "product" and "content source repo" are used interchangeably.
	 * Some products, such as Terraform, have multiple content source repos.
	 */
	const products = fs.readdirSync(contentDir).filter((file) => {
		return fs.statSync(path.join(contentDir, file)).isDirectory()
	})

	// Iterate over each product directory, adding to `versionMetadata`
	for (const product of products) {
		// Initialize the product array
		versionMetadata[product] = []

		/**
		 * If the product is not versioned, we add a single entry for the
		 * "v0.0.x" version, which is a placeholder for non-versioned products.
		 * This is useful for products that do not have versioned documentation,
		 * such as the HashiCorp Cloud Platform.
		 */
		if (PRODUCT_CONFIG[product].versionedDocs === false) {
			versionMetadata[product].push({
				version: 'v0.0.x',
				releaseStage: 'stable',
				isLatest: true,
			})
		}

		/**
		 * We expect the product directory to contain a directory for each version.
		 * We expect that either:
		 * - _All_ version directory names are semver-valid. In this case, versions
		 *   will be sorted using `semver.compare`.
		 * - _None_ of the version directories are semver-valid. In this case,
		 *   versions will be sorted alphabetically.
		 */
		const productDir = path.join(contentDir, product)
		const rawVersions = fs.readdirSync(productDir).filter((version) => {
			// filter out non-version directories
			return semver.valid(semver.coerce(version))
		})

		// Sort versions by semver if possible, otherwise sort alphabetically
		const isAllSemver = rawVersions.every((v) => {
			return semver.valid(normalizeVersion(v))
		})

		let versions

		if (isAllSemver) {
			versions = rawVersions
				.sort((a, b) => {
					const [aVersion, bVersion] = [a, b].map(normalizeVersion)
					// Sort by semver
					return semver.compare(aVersion, bVersion)
				})
				// Reverse the array after sorting, so the latest version is first
				.reverse()
		} else {
			const rawSemverVersions = rawVersions.filter((v) => {
				return semver.valid(normalizeVersion(v))
			})
			const rawNonSemverVersions = rawVersions.filter((v) => {
				return !semver.valid(normalizeVersion(v))
			})

			const sortedSemverVersions = rawSemverVersions
				.sort((a, b) => {
					const [aVersion, bVersion] = [a, b].map(normalizeVersion)
					// Sort by semver
					return semver.compare(aVersion, bVersion)
				})
				.reverse()

			const sortedNonSemverVersions = rawNonSemverVersions
				.sort((a, b) => {
					const [aVersion, bVersion] = [a, b].map(normalizeVersion)
					// Sort alphabetically
					return aVersion.localeCompare(bVersion)
				})
				.reverse()

			// semver versions should be before non-semver versions since they are more recent
			versions = [...sortedSemverVersions, ...sortedNonSemverVersions]
		}

		/**
		 * Iterate over the version entries, augmenting them with version metadata,
		 * and adding them to the `versionMetadata` object.
		 */
		let latestVersionIndex = 0
		for (const [idx, version] of versions.entries()) {
			// Check if version contains beta and adjust accordingly
			let cleanVersion = version
			let releaseStage = 'stable'

			if (version.includes('(') && version.includes(')')) {
				const stage = version.match(/\(([^)]+)\)/)?.[1]
				const spacesCount = version.split(' ').length - 1

				if (spacesCount > 1) {
					throw new Error(
						`Invalid version format "${version}" for product "${product}". Release stage should be in parentheses with only one space separating it from the version, e.g., "1.0.0 (beta)".`,
					)
				}

				if (stage && acceptedReleaseStages.includes(stage)) {
					releaseStage = stage
					cleanVersion = version.replace(` (${stage})`, '').trim()
				} else {
					throw new Error(
						`Invalid release stage "${stage}" in version "${version}" for product "${product}". Accepted stages are: ${acceptedReleaseStages.join(', ')}.`,
					)
				}
			}

			if (releaseStage !== 'stable') {
				latestVersionIndex++
			}

			versionMetadata[product].push({
				version: cleanVersion,
				releaseStage,
				isLatest: idx === latestVersionIndex,
			})
		}
	}
	// Return the version metadata
	return versionMetadata
}

/**
 * Normalizes a version string by replacing trailing `.x` with `.0` and removing any release stage in parentheses.
 * This allows generic patch versions to be processed by semver.
 *
 * @param {string} version - The version string to normalize
 * @returns {string} The normalized version string
 */
function normalizeVersion(version) {
	const TFE_VERSION_IN_PATH_REGEXP = /v[0-9]{6}-\d+/i

	const cleanVersion = version
		.replace(/\s*\([^)]+\)/, '') // Remove any release stage in parentheses
		.replace(/\.x$/, '.0') // Replace trailing `.x` with `.0`

	if (TFE_VERSION_IN_PATH_REGEXP.test(cleanVersion)) {
		return cleanVersion
	}

	// Use semver.coerce to handle versions like "v2.x" for proper version sorting
	const normalized = semver.coerce(cleanVersion).version
	return normalized
}
