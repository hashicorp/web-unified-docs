import grayMatter from "gray-matter";

const SELF_URL = "http://localhost:3000";

export async function GET(
	request: Request,
	{
		params,
	}: { params: { productSlug: string; version: string; docsPath: string[] } }
) {
	const { productSlug, version, docsPath } = params;

	/**
	 * TODO: we have different content directory structures across repos.
	 *
	 * In the current API, powered by mktg-content-workflows, we have repo-config
	 * that handles these differences. In the short term, it probably makes sense
	 * to mirror that type of config in this repository.
	 *
	 * On the other hand, it would be nice to not have to deal with these cases...
	 * Maybe during the process of migrating docs to this repo, we standardize
	 * the directory structure? As long as the API routes are still drop-in
	 * replacements for the previous API, maybe that'd make sense... rather than
	 * migrating repo-config, we migrate in a way that requires less (maybe zero)
	 * "repo-config".
	 *
	 * Related thought: migration scripting probably makes sense? Script would:
	 * - Pull down the content source repo
	 * - Iterate over known versions (based on our existing live content API), and
	 *   for each known version of content...
	 * - Check out the ref for that version
	 * - Copy content into `public/products`, with the content directory now
	 *   normalized (probably to `content`, since that's most common?)
	 */
	const contentDirMap: Record<string, string> = {
		boundary: "content",
		consul: "content",
		"hcp-docs": "content",
		nomad: "content",
		packer: "content",
		"ptfe-releases": "docs",
		sentinel: "content",
		terraform: "docs",
		"terraform-cdk": "docs",
		"terraform-docs-agents": "docs",
		"terraform-docs-common": "docs",
		"terraform-plugin-framework": "docs",
		"terraform-plugin-log": "docs",
		"terraform-plugin-mux": "docs",
		"terraform-plugin-sdk": "docs",
		"terraform-plugin-testing": "docs",
		vagrant: "content",
		vault: "content",
		waypoint: "content",
	};

	// Determine the expected content path.
	// Note that either an `.mdx` file or an `index.mdx` file may exist,
	// we don't have a good way to determine which to expect, so we try both,
	// and use the first one that comes back.
	const contentPath = [contentDirMap[productSlug], ...docsPath].join("/");

	const res = await Promise.all([
		fetch(`${SELF_URL}/products/${productSlug}/${version}/${contentPath}.mdx`),
		fetch(
			`${SELF_URL}/products/${productSlug}/${version}/${contentPath}/index.mdx`
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
