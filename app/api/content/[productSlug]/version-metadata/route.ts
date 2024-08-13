import versionMetadata from "../../../content-versions.json";

export async function GET(
  request: Request,
  { params }: { params: { productSlug: string } }
) {
  const { productSlug } = params;

  if (versionMetadata[productSlug]) {
    return Response.json({ result: versionMetadata[productSlug] });
  }

  return new Response("Not found", { status: 404 });
}
