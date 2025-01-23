import { getProductVersionMetadata } from '@utils/contentVersions'
import { errorResultToString } from '@utils/result'

/**
 * Parameters expected by `GET` route handler
 */
export type GetParams = {
	/**
	 * The product that version metadata is being requested for (i.e "terraform")
	 */
	productSlug: string
}

export async function GET(request: Request, { params }: { params: GetParams }) {
	const { productSlug } = params

	const productVersionMetadataResult = getProductVersionMetadata(productSlug)

	if (!productVersionMetadataResult.ok) {
		console.error(errorResultToString('API', productVersionMetadataResult))
		return new Response('Not found', { status: 404 })
	}

	return Response.json({
		result: productVersionMetadataResult.value,
	})
}
