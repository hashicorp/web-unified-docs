/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import path from 'path'
// Third-party
import semver from 'semver'

import { PRODUCT_CONFIG } from '../app/utils/productConfig.mjs'

/**
 * Given a content directory, and a JSON output file, build version metadata
 * based on the content directory structure, and return it.
 *
 * @param {string} contentDir
 * @returns {object} versionMetadata
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
			return semver.valid(normalizeGenericPatchVersion(v))
		})

		const versions = rawVersions
			.sort((a, b) => {
				const [aVersion, bVersion] = [a, b].map(normalizeGenericPatchVersion)
				if (isAllSemver) {
					// Sort semver
					return semver.compare(aVersion, bVersion)
				} else {
					// Sort alphabetically
					return aVersion.localeCompare(bVersion)
				}
			})
			// Reverse the array after sorting, so the latest version is first
			.reverse()
		/**
		 * Iterate over the version entries, augmenting them with version metadata,
		 * and adding them to the `versionMetadata` object.
		 */
		let latestVersionIndex = 0
		for (const [idx, version] of versions.entries()) {
			// Check if version contains beta and adjust accordingly
			let cleanVersion = version
			let releaseStage = 'stable'

			if (version.includes('(beta)')) {
				releaseStage = 'beta'
				cleanVersion = version.replace(/\(beta\)$/, '').trim()
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
 * Given a version string, which _may_ end in a generic patch `.x` suffix,
 * Return a normalized version string with any trailing `.x` replaced with `.0`.
 *
 * @param {string} version
 * @returns {string}
 */
function normalizeGenericPatchVersion(version) {
	return version.replace(/\.x$/, '.0')
}
