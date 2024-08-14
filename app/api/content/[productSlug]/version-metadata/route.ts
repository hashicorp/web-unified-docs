import { getProductVersionMetadata } from '@utils/contentVersions'
import { errorResultToString } from '@utils/result'

export async function GET(
	request: Request,
	{ params }: { params: { productSlug: string } }
) {
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
