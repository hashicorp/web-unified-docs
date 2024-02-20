export async function GET(
  request: Request,
  {
    params,
  }: { params: { productSlug: string; version: string; docsPath: string[] } }
) {
  const { productSlug, version, docsPath } = params;

  const res = await Promise.all([
    fetch(
      `http://localhost:3000/products/${productSlug}/${version}/content/${docsPath.join(
        "/"
      )}.mdx`
    ),
    fetch(
      `http://localhost:3000/products/${productSlug}/${version}/content/${docsPath.join(
        "/"
      )}/index.mdx`
    ),
  ]);

  for (const r of res) {
    if (r.ok) {
      const text = await r.text();
      return new Response(text);
    }
  }

  return new Response("Not found", { status: 404 });
}
