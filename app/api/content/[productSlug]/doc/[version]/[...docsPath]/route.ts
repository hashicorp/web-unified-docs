import { readFile, parseMarkdownFrontMatter } from '@utils/file'
import { getProductVersion } from '@utils/contentVersions'
import { errorResultToString } from '@utils/result'

/**
 * TODO: we have different content directory structures across repos.
 *
 * In the current API, powered by mktg-content-workflows, we have repo-config
 * that handles these differences. In the short term, it may make sense
 * to mirror that type of config in this repository.
 *
 * On the other hand, it would be nice to not have to deal with these cases...
 * Maybe during the process of migrating docs to this repo, we standardize
 * the directory structure?
 */
const contentDirMap: Record<string, string> = {
	boundary: 'content',
	consul: 'content',
	'hcp-docs': 'content',
	nomad: 'content',
	packer: 'content',
	'ptfe-releases': 'docs',
	terraform: 'docs',
	'terraform-cdk': 'docs',
	'terraform-docs-agents': 'docs',
	'terraform-docs-common': 'docs',
	'terraform-plugin-framework': 'docs',
	'terraform-plugin-log': 'docs',
	'terraform-plugin-mux': 'docs',
	'terraform-plugin-sdk': 'docs',
	'terraform-plugin-testing': 'docs',
	vagrant: 'content',
	vault: 'content',
	waypoint: 'content',
}

export async function GET(
	request: Request,
	{
		params,
	}: { params: { productSlug: string; version: string; docsPath: string[] } }
) {
	// Grab the parameters we need to fetch content
	const { productSlug, version, docsPath } = params

	// Determine the content directory based on the "product" (actually repo) slug
	const contentDir = contentDirMap[productSlug]
	if (!contentDir) {
		console.error(
			`API Error: Product, ${productSlug}, not found in contentDirMap`
		)
		return new Response('Not found', { status: 404 })
	}

	const productVersionResult = getProductVersion(productSlug, version)
	if (!productVersionResult.ok) {
		console.error(errorResultToString('API', productVersionResult))
		return new Response('Not found', { status: 404 })
	}

	const parsedVersion = productVersionResult.value

	/**
	 * NOTE: our `content.hashicorp.com` API accepts more complex "section"
	 * values. It seems this is mainly to handle Sentinel content, which is
	 * organized differently than other products, as the content is in a
	 * `sentinel` subdirectory. To ensure parity with the existing API,
	 * we handle this here. In the future, post-migration, it probably makes
	 * sense to try to standardize on `section` format, to avoid having
	 * this special case.
	 */
	const rawDocsPath = docsPath.join('/')
	let parsedDocsPath
	if (productSlug === 'sentinel') {
		if (rawDocsPath.startsWith('sentinel/intro')) {
			parsedDocsPath = rawDocsPath
		} else {
			parsedDocsPath = rawDocsPath.replace(/^sentinel(\/?)/, 'sentinel/docs$1')
		}
	} else {
		parsedDocsPath = rawDocsPath
	}

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

	let foundContent
	for (const loc of possibleContentLocations) {
		const readFileResult = await readFile(loc)

		if (readFileResult.ok) {
			foundContent = readFileResult.value
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
			fullPath: rawDocsPath,
			product: productSlug,
			version: parsedVersion,
			metadata,
			subpath: 'docs', // TODO: I guess we could grab the first part of the rawDocsPath? Is there something I am missing here?
			markdownSource: markdownSource,
			created_at: 'Fri Aug 13 2021 18:50:23 GMT+0000 (GMT)', // TODO: Currently we store this in dynamodb, but maybe we could just use the file system's/git's created date?
			sha: '', // TODO: Do we really need this?
		},
	})
}
