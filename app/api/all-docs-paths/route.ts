import { errorResultToString } from '@utils/result'
import { getAllDocsPaths } from '@utils/allDocsPaths'

export async function GET() {
	const docsPaths = await getAllDocsPaths()

	if (!docsPaths.ok) {
		console.error(errorResultToString('API', docsPaths))
		return new Response('Not found', { status: 404 })
	}
	return Response.json({
		result: docsPaths.value,
	})
}
