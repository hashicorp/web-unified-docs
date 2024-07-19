import versionMetadata from "../content/[productSlug]/version-metadata/data.json";

/**
 * TODO: need to actually implement this endpoint.
 *
 * For now, return all versions. Later, probably makes sense to make a script
 * similar to `build-version-metadata`, that makes some kind of lookup or
 * something, where given a product and a document path, we can return a list
 * of the version directories in which that document is present.
 */
export async function GET(
	request: Request,
	{ params }: { params: { productSlug: string } }
) {
	const { productSlug } = params;

	if (versionMetadata[productSlug]) {
		return Response.json(versionMetadata[productSlug]);
	}

	return new Response("Not found", { status: 404 });
}
