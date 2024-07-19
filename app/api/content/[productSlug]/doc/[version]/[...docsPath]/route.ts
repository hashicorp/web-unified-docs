import grayMatter from "gray-matter";

const SELF_URL = "http://localhost:3000";

export async function GET(
	request: Request,
	{
		params,
	}: { params: { productSlug: string; version: string; docsPath: string[] } }
) {
	const { productSlug, version, docsPath } = params;

	const res = await Promise.all([
		fetch(
			`${SELF_URL}/products/${productSlug}/${version}/content/${docsPath.join(
				"/"
			)}.mdx`
		),
		fetch(
			`${SELF_URL}/products/${productSlug}/${version}/content/${docsPath.join(
				"/"
			)}/index.mdx`
		),
	]);

	for (const r of res) {
		if (r.ok) {
			const text = await r.text();
			const { data: metadata, content: markdownSource } = grayMatter(text);
			return Response.json({ result: { markdownSource, metadata } });
		}
	}

	return new Response("Not found", { status: 404 });
}
