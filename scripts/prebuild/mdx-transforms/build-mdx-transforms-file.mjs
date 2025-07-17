/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

// Third-party
import remark from 'remark'
import remarkMdx from 'remark-mdx'
import grayMatter from 'gray-matter'

import { paragraphCustomAlertsPlugin } from './paragraph-custom-alert/paragraph-custom-alert.mjs'
import { rewriteInternalLinksPlugin } from './add-version-to-internal-links/add-version-to-internal-links.mjs'
import { remarkIncludePartialsPlugin } from './include-partials/remark-include-partials.mjs'
import {
	rewriteInternalRedirectsPlugin,
	loadRedirects,
} from './rewrite-internal-redirects/rewrite-internal-redirects.mjs'
import { transformExcludeTerraformContent } from './exclude-terraform-content/index.mjs'

const CWD = process.cwd()
const VERSION_METADATA_FILE = path.join(CWD, 'app/api/versionMetadata.json')

/**
 * Given a file path,
 * Apply MDX transforms to the file and copy the transformed file to the
 * corresponding path in the `public/content` directory.
 *
 * @param {string} filePath
 */
export async function buildFileMdxTransforms(filePath) {
	const targetDir = 'content'
	const outputDir = 'public/content'

	const relativePath = path.relative(targetDir, filePath)
	const [repoSlug, version, contentDir] = relativePath.split('/')
	const partialsDir = path.join(
		targetDir,
		repoSlug,
		version,
		contentDir,
		'partials',
	)
	const redirectsDir = path.join('/server/', targetDir, repoSlug, version)
	const outPath = path.join(outputDir, relativePath)

	const entry = {
		filePath,
		partialsDir,
		outPath,
		version,
		redirectsDir,
	}
	const versionMetadata = fs.readFileSync(VERSION_METADATA_FILE, 'utf-8')
	const serializedVersionMetadata = JSON.parse(versionMetadata)
	console.log(`🪄 Running MDX transform on ${filePath}...`)
	const result = await applyFileMdxTransforms(entry, serializedVersionMetadata)
	if (result.error) {
		console.error(`❗ Encountered an error: ${result.error}`)
	} else {
		console.log(`✅ Applied MDX transform to ${filePath}`)
	}
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
export async function applyFileMdxTransforms(entry, versionMetadata = {}) {
	try {
		const { filePath, partialsDir, outPath, version, redirectsDir } = entry
		const redirects = await loadRedirects(version, redirectsDir)

		const fileString = fs.readFileSync(filePath, 'utf8')

		const { data, content } = grayMatter(fileString)

		const remarkResults = await remark()
			.use(remarkMdx)
			.use(transformExcludeTerraformContent, { filePath })
			.use(remarkIncludePartialsPlugin, { partialsDir, filePath })
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
