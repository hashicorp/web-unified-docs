/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

import remark from 'remark'
import remarkMdx from 'remark-mdx'
import grayMatter from 'gray-matter'

import { listFiles } from '#scriptUtils/list-files.mjs'
import { PRODUCT_CONFIG } from '#productConfig.mjs'
import { transformExcludeContent } from './mdx-transforms/exclude-content/index.mjs'

/**
 * Resolve content exclusion directives in a copied internal-product file using
 * the consuming product's context.
 *
 * Internal-product source files intentionally keep their exclusion directives
 * intact during their own transform pass, so the directives are resolved here -
 * against the product the content is copied into. Processing is forced on so
 * shared directives are always resolved and never leak into the output as raw
 * HTML comments.
 *
 * @param {string} fileContents Raw file contents (including frontmatter)
 * @param {Object} context
 * @param {string} context.filePath File path (used for error messages)
 * @param {string} context.repoSlug Consuming product slug
 * @param {string} context.version Consuming product version
 * @returns {string} Transformed file contents
 */
function applyExclusionDirectives(
	fileContents,
	{ filePath, repoSlug, version },
) {
	const { data, content } = grayMatter(fileContents)
	const result = remark()
		.use(remarkMdx)
		.use(transformExcludeContent, {
			filePath,
			version,
			repoSlug,
			productConfig: PRODUCT_CONFIG[repoSlug],
		})
		.processSync(content)
	return grayMatter.stringify(String(result), data)
}

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

	for (const filePath of versionConfigFiles) {
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
		for (const importEntry of imports) {
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

					// Resolve exclusion directives in the copied files using the
					// consuming product's context, so shared directives behave correctly
					// for the product the content was copied into.
					await processCopiedExclusionDirectives(contentDestPath, {
						repoSlug,
						version: verifiedVersion,
					})
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
		}
	}
}

/**
 * Walk the copied content directory and resolve any exclusion directives found
 * in `.mdx` files against the consuming product's context.
 *
 * @param {string} contentDestPath Directory the internal content was copied into
 * @param {Object} context
 * @param {string} context.repoSlug Consuming product slug
 * @param {string} context.version Consuming product version
 */
async function processCopiedExclusionDirectives(
	contentDestPath,
	{ repoSlug, version },
) {
	const copiedFiles = await listFiles(contentDestPath)

	copiedFiles
		.filter((copiedPath) => {
			return copiedPath.endsWith('.mdx')
		})
		.forEach((copiedPath) => {
			const originalContent = fs.readFileSync(copiedPath, 'utf8')

			// Only reprocess files that actually contain exclusion directives to
			// avoid unnecessarily re-serializing unrelated content.
			if (!originalContent.includes('BEGIN:')) {
				return
			}

			const processedContent = applyExclusionDirectives(originalContent, {
				filePath: copiedPath,
				repoSlug,
				version,
			})
			fs.writeFileSync(copiedPath, processedContent)
		})
}
