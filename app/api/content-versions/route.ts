import { searchNavDataFiles } from '../../utils/searchNavDataFiles'
import { PRODUCT_CONFIG } from '@utils/productConfig.mjs'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const product = url.searchParams.get('product')
	const fullPath = url.searchParams.get('fullPath')

	// If a `product` parameter has not been provided, return a 400
	if (!product) {
		return new Response(
			'Missing `product` query parameter. Please provide the `product` under which the requested document is expected to be found, for example `vault`.',
			{ status: 400 },
		)
	}
	// If a `fullPath` parameter has not been provided, return a 400
	if (!fullPath) {
		return new Response(
			'Missing `fullPath` query parameter. Please provide the full document path, in the format `doc#<path/to/document>`, for example `doc#docs/internals`.',
			{ status: 400 },
		)
	}
	/**
	 * reformat fullPath to searchable file path
	 * e.g. doc#cdktf/api-reference/python/classes -> api-reference/python/classes
	 */
	// todo: use product config to filter out the default file path - split by # and then use product config to filter out path
	const splitPath = fullPath.split('#')
	const basePath = PRODUCT_CONFIG[product].basePaths?.find(
		(basePath: string) => {
			return splitPath[1].startsWith(`${basePath}`)
		},
	)
	let fileNameQuery = splitPath[1].replace(basePath, '')
	if (fileNameQuery.startsWith('/')) {
		fileNameQuery = fileNameQuery.slice(1)
	}
	const versions = await searchNavDataFiles(product, fileNameQuery)
	/**
	 * return either A) versions array or B) an empty array (if no content matches the query params)
	 * this matches the current Content API behaviour
	 */
	return Response.json({
		versions,
	})
}
