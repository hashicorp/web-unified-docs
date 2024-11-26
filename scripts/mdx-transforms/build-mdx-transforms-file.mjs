import fs from 'fs'
import path from 'path'
// Third-party
import grayMatter from 'gray-matter'
// Local
import { includePartials } from './include-partials/include-partials.mjs'
import {
	sigils,
	transformParagraphCustomAlerts,
} from './paragraph-custom-alert/paragraph-custom-alert.mjs'
import { transformRewriteInternalRedirects } from './rewrite-internal-redirects/rewrite-internal-redirects.mjs'

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

	console.log(`🪄 Running MDX transform on ${filePath}...`)
	const result = await applyFileMdxTransforms(entry)
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
export async function applyFileMdxTransforms(entry) {
	try {
		const { filePath, partialsDir, outPath, version, redirectsDir } = entry
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
			redirectsDir,
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
