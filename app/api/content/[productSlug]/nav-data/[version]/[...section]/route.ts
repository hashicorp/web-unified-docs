import { readFile, parseJson } from '@utils/file'
import { getProductVersion } from '@utils/contentVersions'
import { errorResultToString } from '@utils/result'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = {
	/**
	 * The product that docs are being requested for
	 * @example 'terraform'
	 */
	productSlug: string

	/**
	 * Can be a semver version
	 * @example 'v.1.9.x'
	 * or a dated version string for PTFE
	 * @example 'v20220610-01'
	 */
	version: string

	/**
	 * An array of strings representing the path relative to `content/<productSlug>/nav-data/<version>/data`
	 * @example ['cli']
	 */
	section: string[]
}
export async function GET(request: Request, { params }: { params: GetParams }) {
	const { productSlug, version, section } = params
	const productVersionResult = getProductVersion(productSlug, version)
	if (!productVersionResult.ok) {
		console.error(errorResultToString('API', productVersionResult))
		return new Response('Not found', { status: 404 })
	}

	const { value: parsedVersion } = productVersionResult

	const sectionPath = section.join('/')

	const readFileResult = await readFile([
		'content',
		productSlug,
		parsedVersion,
		'data',
		`${sectionPath}-nav-data.json`,
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
