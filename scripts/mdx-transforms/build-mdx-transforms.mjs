import fs from 'fs'
import path from 'path'
// Third-party
import grayMatter from 'gray-matter'
// Local
import listFiles from '../utils/list-files.mjs'
import { includePartials } from './include-partials/include-partials.mjs'
import batchPromises from '../utils/batch-promises.mjs'
import {
	sigils,
	transformParagraphCustomAlerts,
} from './paragraph-custom-alert/paragraph-custom-alert.mjs'
import { transformRewriteInternalRedirects } from './rewrite-internal-redirects/rewrite-internal-redirects.mjs'
import { transformRewriteInternalLinks } from './add-version-to-internal-links.mjs'

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
		const partialsDir = path.join(
			targetDir,
			repoSlug,
			version,
			contentDir,
			'partials',
		)
		const redirectsDir = path.join(targetDir, repoSlug, version)
		const outPath = path.join(outputDir, relativePath)
		return { filePath, partialsDir, outPath, version, repoSlug, redirectsDir }
	})
	/**
	 * Apply MDX transforms to each file entry, in batches
	 */
	console.log(`🪄 Running MDX transforms on ${mdxFileEntries.length} files...`)
	const batchSize = 16
	const results = await batchPromises(
		mdxFileEntries,
		(entry) => {
			return applyMdxTransforms(entry, versionMetadata)
		},
		batchSize,
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
async function applyMdxTransforms(entry, versionMetadata) {
	try {
		const { filePath, partialsDir, outPath, version, repoSlug, redirectsDir } =
			entry
		const fileString = fs.readFileSync(filePath, 'utf8')
		const { data, content } = grayMatter(fileString)
		let transformedContent = content
		if (content.includes('@include')) {
			transformedContent = await includePartials(content, partialsDir, filePath)
		}
		if (
			Object.keys(sigils).some((sigil) => {
				return content.includes(sigil)
			})
		) {
			transformedContent =
				await transformParagraphCustomAlerts(transformedContent)
		}
		transformedContent = await transformRewriteInternalRedirects(
			transformedContent,
			version,
			repoSlug,
			redirectsDir,
		)
		transformedContent = await transformRewriteInternalLinks(
			transformedContent,
			entry,
			versionMetadata,
		)

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
