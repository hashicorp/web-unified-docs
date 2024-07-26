const IS_DEV = process.env.VERCEL_ENV === "development";
const SELF_URL = IS_DEV ? "http://localhost:3000" : process.env.VERCEL_URL;

export async function GET(
	request: Request,
	{
		params,
	}: { params: { productSlug: string; version: string; section: string } }
) {
	const { productSlug, version, section } = params;

	const res = await fetch(
		`${SELF_URL}/products/${productSlug}/${version}/data/${section}-nav-data.json`
	);
	if (res.ok) {
		const navData = await res.json();
		return Response.json({ result: { navData } });
	}

	return new Response("Not found", { status: 404 });
}
