import { errorResultToString } from '@utils/result'
import { getDocsPaths } from '@utils/allDocsPaths'

export async function GET(
	req: Request,
	{ params }: { params: { productSlugs: string[] } },
) {
	const productSlugs = params?.productSlugs ?? []
	const docsPaths = await getDocsPaths(productSlugs)

	if (!docsPaths.ok) {
		console.error(errorResultToString('API', docsPaths))
		return new Response('Not found', { status: 404 })
	}
	return Response.json({
		result: docsPaths.value,
	})
}
