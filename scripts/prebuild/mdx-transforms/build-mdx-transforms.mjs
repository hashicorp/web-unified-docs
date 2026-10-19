/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

// Third-party
import remark from 'remark'
import remarkMdx from 'remark-mdx'
import grayMatter from 'gray-matter'

import { batchPromises } from '#scriptUtils/batch-promises.mjs'

import { paragraphCustomAlertsPlugin } from './paragraph-custom-alert/paragraph-custom-alert.mjs'
import { rewriteInternalLinksPlugin } from './add-version-to-internal-links/add-version-to-internal-links.mjs'
import { remarkIncludePartialsPlugin } from './include-partials/remark-include-partials.mjs'
import {
	rewriteInternalRedirectsPlugin,
	loadRedirects,
} from './rewrite-internal-redirects/rewrite-internal-redirects.mjs'

import { transformExcludeContent } from './exclude-content/index.mjs'

import { PRODUCT_CONFIG } from '#productConfig.mjs'

/**
 * Apply MDX transforms to the provided `.mdx` paths under the target
 * directory and write the transformed files to the output directory, or
 * return them without writing when requested.
 *
 * Note: we expect the following directory structure:
 * - `<targetDir>/<repoSlug>/<version>/<contentDir>/<...file>.mdx`
 * And we expect the `partials` directory to be located at:
 * - `<targetDir>/<repoSlug>/<version>/<contentDir>/partials`
 *
 * @param {string} targetDir
 * @param {string} outputDir the directory to write transformed files to
 * @param {string[]} filesToCheck the explicit paths to consider for transformation
 * @param {{ verbose?: boolean, returnTransformedMdx?: boolean }} [options]
 * Progress logging is enabled by default. Set `returnTransformedMdx` to return
 * transformed content for each file without writing it to the output directory.
 * Errors are always logged.
 * @returns {Promise<string[] | void>} Transformed files when requested.
 * @throws {Error} If any file fails, with details for every failed file.
 */
export async function buildMdxTransforms(
	targetDir,
	outputDir,
	versionMetadata,
	filesToCheck,
	options = {},
) {
	const { verbose = true, returnTransformedMdx = false } = options

	// Filter for `.mdx` files
	const mdxFiles = filesToCheck.filter((filePath) => {
		const relativePath = path.relative(targetDir, filePath)
		const repoSlug = relativePath.split('/')[0]
		return path.extname(filePath) === '.mdx' && repoSlug in PRODUCT_CONFIG
	})
	/**
	 * Map over each `.mdx` file, and prepare the file for transformation
	 */
	const mdxFileEntries = mdxFiles.map((filePath) => {
		const relativePath = path.relative(targetDir, filePath)
		const [repoSlug, version, contentDir] = relativePath.split('/')
		const isVersionedDocs = PRODUCT_CONFIG[repoSlug].versionedDocs
		/**
		 * handles version and content dir for versionless docs
		 * these values are index based
		 * if versionless, version becomes the content dir
		 * which will cause an error when trying resolve partials
		 */
		const verifiedVersion = isVersionedDocs ? version : ''
		const verifiedContentDir = isVersionedDocs ? contentDir : version
		const partialsDir = path.join(
			targetDir,
			repoSlug,
			verifiedVersion,
			verifiedContentDir,
			'partials',
		)
		const redirectsDir = path.join(targetDir, repoSlug, verifiedVersion)
		const outPath = path.join(outputDir, relativePath)
		return { repoSlug, filePath, partialsDir, outPath, version, redirectsDir }
	})

	if (verbose) {
		console.log(`Running MDX transforms on ${mdxFileEntries.length} files...`)
	}

	const results = await batchPromises(
		'MDX transforms',
		mdxFileEntries,
		(entry) => {
			return applyMdxTransforms(
				entry,
				versionMetadata,
				targetDir,
				returnTransformedMdx,
			)
		},
		{ loggingEnabled: verbose },
	)
	// Log out any errors encountered
	const errors = results
		.filter((result) => {
			return result.error !== null
		})
		.map(({ error, file }) => {
			return { error, file }
		})
	if (errors.length > 0) {
		if (errors.length !== 1) {
			console.error(`\n❗ Encountered ${errors.length} errors:`)
		}

		console.log('\n')
		errors.forEach(({ error, file }) => {
			// displayed in red
			console.error(
				`\x1b[31m❌ MDX Transform Error\n${error}\nIn File: ${file}\x1b[0m`,
			)
		})
		console.log('\n')

		if (verbose) {
			console.error('\n❗ Build failed due to errors in MDX transforms.')
		}
		throw new Error('MDX Transform Error')
	}

	// Log out that the script has complete
	if (verbose) {
		console.log(`✅ Applied MDX transforms to ${mdxFileEntries.length} files.`)
	}

	if (returnTransformedMdx) {
		return results.map(({ transformedMdx }) => {
			return transformedMdx
		})
	}
}

/**
 * Given an `.mdx` file entry, read it, apply MDX transforms, and either
 * return the transformed content or write it out.
 *
 * If an error is encountered during MDX transforms, we catch the error,
 * and return it as a string. If there are no errors, we return { error: null}.
 *
 * @param {object} entry
 * @param {string} entry.filePath
 * @param {string} entry.partialsDir
 * @param {string} entry.outPath
 * @return {object} { error: string | null }
 */
async function applyMdxTransforms(
	entry,
	versionMetadata = {},
	targetDir,
	returnTransformedMdx = false,
) {
	try {
		const { filePath, partialsDir, outPath, version, redirectsDir } = entry
		const redirects = await loadRedirects(version, redirectsDir)

		const fileString = fs.readFileSync(filePath, 'utf8')
		const { data, content } = grayMatter(fileString)

		// Check if this file is in a global/partials directory
		// Global partials should not have content exclusion applied to them
		// as they are version-agnostic and shared across all versions
		const isGlobalPartial = filePath.includes('/global/partials/')

		// Internal-only products keep their exclusion directives intact during
		// their own transform pass. The directives are resolved later, against the
		// consuming product's context, when the content is copied
		// (see copyInternalOnlyProductDocs).
		const isInternalProduct = Boolean(
			PRODUCT_CONFIG[entry.repoSlug]?.internalProduct,
		)

		const processor = remark()
			.use(remarkMdx)
			// Process partials first, then content exclusion
			// This ensures exclusion directives in global partials are properly evaluated
			.use(remarkIncludePartialsPlugin, { partialsDir, targetDir, filePath })

		// Make sure the content exclusion process skips looking through
		// the global partial filepath (it should only be processed once the global
		// partial is written to the file)
		if (!isGlobalPartial && !isInternalProduct) {
			processor.use(transformExcludeContent, {
				filePath,
				version,
				repoSlug: entry.repoSlug,
				productConfig: PRODUCT_CONFIG[entry.repoSlug],
			})
		}

		const remarkResults = await processor
			.use(paragraphCustomAlertsPlugin)
			.use(rewriteInternalRedirectsPlugin, {
				redirects,
			})
			.use(rewriteInternalLinksPlugin, { entry, versionMetadata })
			.process(content)

		const transformedContent = String(remarkResults)
		const transformedFileString = grayMatter.stringify(transformedContent, data)

		if (returnTransformedMdx) {
			return { error: null, transformedMdx: transformedFileString }
		}

		// Ensure the parent directory for the output file path exists
		const outDir = path.dirname(outPath)
		if (!fs.existsSync(outDir)) {
			fs.mkdirSync(outDir, { recursive: true })
		}
		// Write out the file
		fs.writeFileSync(outPath, transformedFileString)

		return { error: null }
	} catch (e) {
		return { error: String(e).split('\n')[0], file: entry.filePath }
	}
}
