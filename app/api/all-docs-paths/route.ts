import { errorResultToString } from '@utils/result'
import { getDocsPaths } from '@utils/allDocsPaths'

export async function GET(req: Request) {
	const url = new URL(req.url)
	const productSlugs = url.searchParams.getAll('products') ?? []
	const docsPaths = await getDocsPaths(productSlugs)

	if (!docsPaths.ok) {
		console.error(errorResultToString('API', docsPaths))
		return new Response('Not found', { status: 404 })
	}
	return Response.json({
		result: docsPaths.value,
	})
}
