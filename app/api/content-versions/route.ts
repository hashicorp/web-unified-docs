import { searchNavDataFiles } from './_searchNavDataFiles'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const product = url.searchParams.get('product')
	const fullPath = url.searchParams.get('fullPath')

	// If a `product` parameter has not been provided, return a 400
	if (!product) {
		return new Response(
			'Missing `product` query parameter. Please provide the `product` under which the requested document is expected to be found, for example `vault`.',
			{ status: 400 }
		)
	}
	// If a `fullPath` parameter has not been provided, return a 400
	if (!fullPath) {
		return new Response(
			'Missing `fullPath` query parameter. Please provide the full document path, in the format `doc#<path/to/document>`, for example `doc#docs/internals`.',
			{ status: 400 }
		)
	}
	/**
	 * reformat fullPath to searchable file path
	 * e.g. doc#cdktf/api-reference/python/classes -> api-reference/python/classes
	 */
	const splitPath = fullPath.split('/')
	const fileNameQuery = splitPath.slice(1).join('/')
	const versions = await searchNavDataFiles(product, fileNameQuery)
	/**
	 * return either A) versions array or B) an empty array (if no content matches the query params)
	 * this matches the current Content API behaviour
	 */
	return Response.json({
		versions,
	})
}
