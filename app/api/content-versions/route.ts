import versionMetadata from "../content/[productSlug]/version-metadata/data.json";

/**
 * TODO: need to actually implement this endpoint.
 *
 * For now, return all versions. Later, probably makes sense to make a script
 * similar to `build-version-metadata`, that makes some kind of lookup or
 * something, where given a product and a document path, we can return a list
 * of the version directories in which that document is present.
 *
 * Note that we query parameters to get the `product`.
 */
export async function GET(request: Request) {
	const url = new URL(request.url);
	const product = url.searchParams.get("product");
	// Actual implementation would use `fullPath` too, but we're not there yet
	// const fullPath = url.searchParams.get("fullPath");

	if (versionMetadata[product]) {
		return Response.json({
			versions: versionMetadata[product].map((v) => v.version),
		});
	}

	return new Response("Not found", { status: 404 });
}
