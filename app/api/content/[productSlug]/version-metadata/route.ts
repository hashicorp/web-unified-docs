import versionMetadata from './data.json'

export async function GET(
	request: Request,
	{ params }: { params: { productSlug: string } }
) {
	const { productSlug } = params

	if (versionMetadata[productSlug]) {
		return Response.json(versionMetadata[productSlug])
	}

	return new Response('Not found', { status: 404 })
}
