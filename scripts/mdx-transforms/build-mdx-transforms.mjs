/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'fs'
import path from 'path'

// Third-party
import remark from 'remark'
import remarkMdx from 'remark-mdx'
import grayMatter from 'gray-matter'

import semver from 'semver'

import { listFiles } from '../utils/list-files.mjs'
import { batchPromises } from '../utils/batch-promises.mjs'

import { paragraphCustomAlertsPlugin } from './paragraph-custom-alert/paragraph-custom-alert.mjs'
import { rewriteInternalLinksPlugin } from './add-version-to-internal-links/add-version-to-internal-links.mjs'
import { remarkIncludePartialsPlugin } from './include-partials/remark-include-partials.mjs'
import {
	rewriteInternalRedirectsPlugin,
	loadRedirects,
} from './rewrite-internal-redirects/rewrite-internal-redirects.mjs'
import { transformStripTerraformEnterpriseContent } from './strip-terraform-enterprise-content/strip-terraform-enterprise-content.mjs'

/**
 * Given a target directory,
 * Apply MDX transforms to all `.mdx` files found in the directory and its
 * subdirectories. Each `.mdx` file will be modified in place.
 *
 * Note: we expect the following directory structure:
 * - `<targetDir>/<repoSlug>/<version>/<contentDir>/<...file>.mdx`
 * And we expect the `partials` directory to be located at:
 * - `<targetDir>/<repoSlug>/<version>/<contentDir>/partials`
 *
 * @param {string} targetDir
 * @param {string} outputDir the directory to write transformed files to
 */
export async function buildMdxTransforms(
	targetDir,
	outputDir,
	versionMetadata,
) {
	// Walk the directory to get a list of all files
	const allFiles = await listFiles(targetDir)
	// Filter for `.mdx` files
	const mdxFiles = allFiles.filter((filePath) => {
		return path.extname(filePath) === '.mdx'
	})
	/**
	 * Map over each `.mdx` file, and prepare the file for transformation
	 */
	const mdxFileEntries = mdxFiles.map((filePath) => {
		const relativePath = path.relative(targetDir, filePath)
		const [repoSlug, version, contentDir] = relativePath.split('/')
		/**
		 * handles version and content dir for versionless docs
		 * these values are index based
		 * if versionless, version becomes the content dir
		 * which will cause an error when trying resolve partials
		 */
		const verifiedVersion = semver.valid(semver.coerce(version)) ? version : ''
		const verifiedContentDir = semver.valid(semver.coerce(version))
			? contentDir
			: version
		const partialsDir = path.join(
			targetDir,
			repoSlug,
			verifiedVersion,
			verifiedContentDir,
			'partials',
		)
		const redirectsDir = path.join(targetDir, repoSlug, verifiedVersion)
		const outPath = path.join(outputDir, relativePath)
		return { filePath, partialsDir, outPath, version, redirectsDir }
	})
	/**
	 * Apply MDX transforms to each file entry, in batches
	 */
	console.log(`Running MDX transforms on ${mdxFileEntries.length} files...`)
	const results = await batchPromises(
		'MDX transforms',
		mdxFileEntries,
		(entry) => {
			return applyMdxTransforms(entry, versionMetadata)
		},
	)
	// Log out any errors encountered
	const errors = results
		.filter((result) => {
			return result.error !== null
		})
		.map(({ error }) => {
			return error
		})
	if (errors.length > 0) {
		console.error(`❗ Encountered ${errors.length} errors:`)
		errors.forEach((error) => {
			console.error(`❌ ${error}`)
		})
	}
	// Log out that the script has complete
	console.log(`✅ Applied MDX transforms to ${mdxFileEntries.length} files.`)
}

/**
 * Given an `.mdx` file entry, read the file in, apply MDX transforms,
 * and then write it out.
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
async function applyMdxTransforms(entry, versionMetadata = {}) {
	try {
		const { filePath, partialsDir, outPath, version, redirectsDir } = entry
		const redirects = await loadRedirects(version, redirectsDir)

		const fileString = fs.readFileSync(filePath, 'utf8')
		const { data, content } = grayMatter(fileString)

		const remarkResults = await remark()
			.use(remarkMdx)
			.use(remarkIncludePartialsPlugin, { partialsDir, filePath })
			.use(transformStripTerraformEnterpriseContent, { filePath })
			.use(paragraphCustomAlertsPlugin)
			.use(rewriteInternalRedirectsPlugin, {
				redirects,
			})
			.use(rewriteInternalLinksPlugin, { entry, versionMetadata })
			.process(content)

		const transformedContent = String(remarkResults)
		const transformedFileString = grayMatter.stringify(transformedContent, data)
		// Ensure the parent directory for the output file path exists
		const outDir = path.dirname(outPath)
		if (!fs.existsSync(outDir)) {
			fs.mkdirSync(outDir, { recursive: true })
		}
		// Write out the file
		fs.writeFileSync(outPath, transformedFileString)
		return { error: null }
	} catch (e) {
		return { error: String(e).split('\n')[0] }
	}
}
