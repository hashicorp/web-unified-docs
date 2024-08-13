const SELF_URL = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000'

export async function GET(
	request: Request,
	{
		params,
	}: { params: { productSlug: string; version: string; section: string[] } }
) {
	const { productSlug, version, section } = params

	/**
	 * NOTE: our `content.hashicorp.com` API accepts more complex "section"
	 * values. It seems this is mainly to handle Sentinel content, which is
	 * organized differently than other products, as the content is in a
	 * `sentinel` subdirectory. To ensure parity with the existing API,
	 * we handle this here. In the future, post-migration, it probably makes
	 * sense to try to standardize on `section` format, to avoid having
	 * this special case.
	 */
	const rawSection = section.join('/')
	let parsedSection
	if (productSlug === 'sentinel') {
		if (rawSection === 'sentinel') {
			parsedSection = 'docs'
		} else {
			parsedSection = rawSection.replace(/^sentinel\//, '')
		}
	} else {
		parsedSection = rawSection
	}

	const res = await fetch(
		`${SELF_URL}/content/${productSlug}/${version}/data/${parsedSection}-nav-data.json`
	)

	if (res.ok) {
		const navData = await res.json()

		return Response.json({ result: { navData } })
	}

	return new Response('Not found', { status: 404 })
}
