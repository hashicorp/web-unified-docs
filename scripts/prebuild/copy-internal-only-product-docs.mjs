/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { listFiles } from '#scriptUtils/list-files.mjs'
import { PRODUCT_CONFIG } from '#productConfig.mjs'

/**
 * This function copies content and assets for internal-only imports as specified in
 * version-config.json files.
 *
 * @param {*} sourceDir Directory where the source content lives
 * @param {*} destDir Directory where the destination content should be copied
 * @param {*} destDirAssets Directory where the destination assets should be copied
 */
export async function copyInternalOnlyProductDocs(
	sourceDir,
	destDir,
	destDirAssets,
) {
	const filesToCheck = await listFiles(sourceDir)

	const versionConfigFiles = filesToCheck.filter((filePath) => {
		return filePath.endsWith('version-config.json')
	})

	versionConfigFiles.forEach((filePath) => {
		console.log(
			'\nCopying internal-only product docs for version config file:',
			filePath,
		)
		const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

		const imports = fileData.imports || []

		const relativePath = path.relative(sourceDir, filePath)
		const [repoSlug, version] = relativePath.split('/')
		const verifiedVersion = PRODUCT_CONFIG[repoSlug].versionedDocs
			? version
			: ''

		const contentDir = PRODUCT_CONFIG[repoSlug].contentDir
		const outPathContent = path.join(
			destDir,
			repoSlug,
			verifiedVersion,
			contentDir,
		)
		const outPathAssets = path.join(
			destDirAssets,
			repoSlug,
			verifiedVersion,
			'img',
		)
		imports.forEach((importEntry) => {
			if (importEntry['content-root'] && importEntry.version) {
				// Copy content to the corresponding content directory in the public folder
				const contentDirInternal = PRODUCT_CONFIG[importEntry.slug].contentDir
				const contentSourcePath = path.join(
					destDir,
					importEntry['content-root'],
					importEntry.version,
					contentDirInternal,
				)
				const contentDestPath = path.join(
					outPathContent,
					importEntry['content-root'],
				)

				if (fs.existsSync(contentSourcePath)) {
					console.log(
						`Copying content files from ${contentSourcePath} to ${contentDestPath}...`,
					)
					fs.cpSync(contentSourcePath, contentDestPath, { recursive: true })
				}

				// Copy assets to the corresponding assets directory in the public folder
				const assetSourcePath = path.join(
					destDirAssets,
					importEntry['content-root'],
					importEntry.version,
					'img',
				)
				const assetDestPath = path.join(
					outPathAssets,
					importEntry['content-root'],
				)
				if (fs.existsSync(assetSourcePath)) {
					console.log(
						`Copying assets from ${assetSourcePath} to ${assetDestPath}...`,
					)
					fs.cpSync(assetSourcePath, assetDestPath, { recursive: true })
				}
			}
		})
	})
}
