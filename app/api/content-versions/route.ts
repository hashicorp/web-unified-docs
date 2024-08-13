import versionMetadata from "../versionMetadata.json";

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
  // Note: implementation should use `fullPath`, but we're not there yet
  const fullPath = url.searchParams.get("fullPath");
  // If a `product` parameter has not been provided, return a 400
  if (!product) {
    return new Response(
      "Missing `product` query parameter. Please provide the `product` under which the requested document is expected to be found, for example `vault`.",
      { status: 400 }
    );
  }
  // If a `fullPath` parameter has not been provided, return a 400
  if (!fullPath) {
    return new Response(
      "Missing `fullPath` query parameter. Please provide the full document path, in the format `doc#<path/to/document>`, for example `doc#docs/internals`.",
      { status: 400 }
    );
  }
  /**
   * If the `product` provided has version metadata, check which versions
   * of the specified document exist, and return those version strings.
   *
   * TODO: this doesn't actually check if the document exists in the given
   * product version. As a way to "make it work", this placeholder assumes that
   * the document exists in all versions. We need to revise our approach here
   * to surface accurate data.
   */
  if (versionMetadata[product]) {
    return Response.json({
      versions: versionMetadata[product].map((v) => v.version),
    });
  } else {
    // If we have zero version metadata for the provided product, return a 404
    return new Response("Not found", { status: 404 });
  }
}
