const SELF_URL = process.env.VERCEL_URL || "http://localhost:3000";

export async function GET(
	request: Request,
	{
		params,
	}: { params: { productSlug: string; version: string; section: string } }
) {
	const { productSlug, version, section } = params;

	const res = await fetch(
		`${SELF_URL}/content/${productSlug}/${version}/data/${section}-nav-data.json`
	);
	if (res.ok) {
		const navData = await res.json();
		return Response.json({ result: { navData } });
	}

	return new Response("Not found", { status: 404 });
}
