import { readFile, parseJson } from '@utils/file'
import { getProductVersion } from '@utils/contentVersions'
import { errorResultToString } from '@utils/result'

export async function GET(
	request: Request,
	{
		params,
	}: { params: { productSlug: string; version: string; section: string[] } }
) {
	const { productSlug, version, section } = params

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
	const rawSection = section.join('/')
	let parsedSection
	if (productSlug === 'sentinel') {
		if (rawSection === 'sentinel') {
			parsedSection = 'docs'
		} else {
			parsedSection = rawSection.replace(/^sentinel\//, '')
		}
	} else {
		parsedSection = rawSection
	}

	const readFileResult = await readFile([
		'public',
		'content',
		productSlug,
		parsedVersion,
		'data',
		`${parsedSection}-nav-data.json`,
	])

	if (!readFileResult.ok) {
		console.error(errorResultToString('API', readFileResult))
		return new Response('Not found', { status: 404 })
	}

	const fileData = readFileResult.value
	const navDataResult = parseJson(fileData)

	if (!navDataResult.ok) {
		console.error(errorResultToString('API', navDataResult))
		return new Response('Not found', { status: 404 })
	}

	return Response.json({ result: { navData: navDataResult.value } })
}
