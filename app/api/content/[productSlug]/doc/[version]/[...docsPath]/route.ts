import { readFile, parseMarkdownFrontMatter } from '@utils/file'
import { getProductVersion } from '@utils/contentVersions'
import { errorResultToString } from '@utils/result'
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'
import { statSync } from 'fs'
import { join } from 'path'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = {
	/**
	 * The product that docs are being requested for (i.e "terraform")
	 */
	productSlug: string

	/**
	 * Can be a semver version (i.e: `v10.0.1`) or a ptfe dated version (i.e: `v20220610-01`)
	 */
	version: string

	/**
	 * Full path to the location of docs on the filesystem relative to `content/`
	 */
	docsPath: string[]
}

export async function GET(request: Request, { params }: { params: GetParams }) {
	// Grab the parameters we need to fetch content
	const { productSlug, version, docsPath } = params

	if (!Object.keys(PRODUCT_CONFIG).includes(productSlug)) {
		console.error(
			`API Error: Product, ${productSlug}, not found in contentDirMap`,
		)
		return new Response('Not found', { status: 404 })
	}

	// Determine the content directory based on the "product" (actually repo) slug
	const { contentDir } = PRODUCT_CONFIG[productSlug]
	const productVersionResult = getProductVersion(productSlug, version)
	if (!productVersionResult.ok) {
		console.error(errorResultToString('API', productVersionResult))
		return new Response('Not found', { status: 404 })
	}

	const { value: parsedVersion } = productVersionResult

	const parsedDocsPath = docsPath.join('/')

	/**
	 * TODO: possible improvement: rename files instead of two requests. Which
	 * files are "named" files (`slug.mdx`) and "index" files (`slug/index.mdx`)
	 * is known at build time. Named files are more common than index files. Maybe
	 * near the end of our prebuild script, we could traverse the output content
	 * directory. For any `<slug>/index.mdx` file, we could rename or rm the file:
	 * - If `<slug>.mdx` already exists, then rm `<slug>/index.mdx`. This reflects
	 *   the preference for named files already built in to this API route. We
	 *   definitely want to warn if we hit this case, maybe even fail the build.
	 * - Else, renamed `<slug>/index.mdx` to `<slug>.mdx`
	 * With this prebuild rename step in place, then for a given `docsPath`, we'll
	 * have a consistent and predictable file path to fetch - always:
	 * - `.../${contentDir}/${docsPath.join("/")}.mdx`. We'd be able to remove
	 * one of the two locations below.
	 */
	const possibleContentLocations = [
		[
			`content`,
			productSlug,
			parsedVersion,
			contentDir,
			`${parsedDocsPath}.mdx`,
		],
		[
			`content`,
			productSlug,
			parsedVersion,
			contentDir,
			parsedDocsPath,
			`index.mdx`,
		],
	]

	let foundContent, githubFile, createdAt
	for (const loc of possibleContentLocations) {
		const readFileResult = await readFile(loc)

		if (readFileResult.ok) {
			foundContent = readFileResult.value
			githubFile = loc.join('/')
			const fullPath = join(process.cwd(), githubFile)
			const stats = statSync(fullPath)
			createdAt = stats.birthtime.toISOString()
			break
		}
	}

	if (!foundContent) {
		console.error(`API Error: No content found at ${possibleContentLocations}`)
		return new Response('Not found', { status: 404 })
	}

	const markdownFrontMatterResult = parseMarkdownFrontMatter(foundContent)

	if (!markdownFrontMatterResult.ok) {
		console.error(errorResultToString('API', markdownFrontMatterResult))
		return new Response('Not found', { status: 404 })
	}

	const { metadata, markdownSource } = markdownFrontMatterResult.value

	return Response.json({
		meta: {
			status_code: 200,
			status_text: 'OK',
		},
		result: {
			fullPath: parsedDocsPath,
			product: productSlug,
			version: parsedVersion,
			metadata,
			subpath: 'docs', // TODO: I guess we could grab the first part of the rawDocsPath? Is there something I am missing here?
			markdownSource,
			created_at: createdAt,
			sha: '', // TODO: Do we really need this?
			githubFile,
		},
	})
}
