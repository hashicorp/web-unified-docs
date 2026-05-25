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
import semver from 'semver'

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
 * Given a repo slug, version, and content directory, resolve the verified
 * version and content directory parts.
 *
 * Handles versionless products where the version segment of a path is actually
 * the content directory.
 *
 * @param {string} repoSlug
 * @param {string} version
 * @param {string} contentDir
 * @returns {{ verifiedVersion: string, verifiedContentDir: string }}
 */
export function resolveVersionParts(repoSlug, version, contentDir) {
	const verifiedVersion = PRODUCT_CONFIG[repoSlug].versionedDocs ? version : ''
	const verifiedContentDir = semver.valid(semver.coerce(version))
		? contentDir
		: version
	return { verifiedVersion, verifiedContentDir }
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
export async function applyMdxTransforms(entry, versionMetadata = {}) {
	try {
		const { filePath, partialsDir, outPath, version, redirectsDir } = entry
		const redirects = await loadRedirects(version, redirectsDir)

		const fileString = await fs.promises.readFile(filePath, 'utf8')
		const { data, content } = grayMatter(fileString)

		// Check if this file is in a global/partials directory
		// Global partials should not have content exclusion applied to them
		// as they are version-agnostic and shared across all versions
		const isGlobalPartial = filePath.includes('/global/partials/')

		const processor = remark()
			.use(remarkMdx)
			// Process partials first, then content exclusion
			// This ensures exclusion directives in global partials are properly evaluated
			.use(remarkIncludePartialsPlugin, { partialsDir, filePath })

		// Make sure the content exclusion process skips looking through
		// the global partial filepath (it should only be processed once the global
		// partial is written to the file)
		if (!isGlobalPartial) {
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
		// Ensure the parent directory for the output file path exists
		const outDir = path.dirname(outPath)
		await fs.promises.mkdir(outDir, { recursive: true })
		// Write out the file
		await fs.promises.writeFile(outPath, transformedFileString)
		return { error: null }
	} catch (e) {
		return { error: String(e).split('\n')[0], file: entry.filePath }
	}
}
