import versionMetadata from "../../../version-metadata/data.json";

import grayMatter from "gray-matter";

const SELF_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

/**
 * TODO: we have different content directory structures across repos.
 *
 * In the current API, powered by mktg-content-workflows, we have repo-config
 * that handles these differences. In the short term, it may make sense
 * to mirror that type of config in this repository.
 *
 * On the other hand, it would be nice to not have to deal with these cases...
 * Maybe during the process of migrating docs to this repo, we standardize
 * the directory structure?
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

export async function GET(
  request: Request,
  {
    params,
  }: { params: { productSlug: string; version: string; docsPath: string[] } }
) {
  // Grab the parameters we need to fetch content
  const { productSlug, version, docsPath } = params;
  // Determine the content directory based on the "product" (actually repo) slug
  const contentDir = contentDirMap[productSlug];
  const productVersionMetadata = versionMetadata[productSlug];

  if (!contentDir || !productVersionMetadata) {
    return new Response("Not found", { status: 404 });
  }

  let parsedVersion;
  if (version === "latest") {
    // Grab the latest version of the product
    const foundVersion = versionMetadata[productSlug].find((v) => v.isLatest);

    if (!foundVersion) {
      return new Response("Not found", { status: 404 });
    }

    parsedVersion = foundVersion.version;
  } else {
    // Ensure the requested version is valid
    if (!productVersionMetadata.find((v) => v.version === version)) {
      return new Response("Not found", { status: 404 });
    }

    parsedVersion = version;
  }

  /**
   * NOTE: our `content.hashicorp.com` API accepts more complex "section"
   * values. It seems this is mainly to handle Sentinel content, which is
   * organized differently than other products, as the content is in a
   * `sentinel` subdirectory. To ensure parity with the existing API,
   * we handle this here. In the future, post-migration, it probably makes
   * sense to try to standardize on `section` format, to avoid having
   * this special case.
   */
  const rawDocsPath = docsPath.join("/");
  let parsedDocsPath;
  if (productSlug === "sentinel") {
    if (rawDocsPath.startsWith("sentinel/intro")) {
      parsedDocsPath = rawDocsPath;
    } else {
      parsedDocsPath = rawDocsPath.replace(/^sentinel(\/?)/, "sentinel/docs$1");
    }
  } else {
    parsedDocsPath = rawDocsPath;
  }

  console.log({ rawDocsPath, parsedDocsPath });

  /**
   * Note: at present, we don't have a good way to determine in advance whether
   * the file will exist as a named file or an index file. We therefore have
   * to make two separate requests to check for both, and we return whichever
   * returns, favouring the named file.
   *
   * TODO: possible improvement: rename files instead of two requests. Which
   * files are "named" files (`slug.mdx`) and "index" files (`slug/index.mdx`)
   * is known at build time. Named files are more common than index files. Maybe
   * near the end of our prebuild script, we could traverse the output content
   * directory. For any `<slug>/index.mdx` file, we could rename or rm the file:
   * - If `<slug>.mdx` already exists, then rm `<slug>/index.mdx`. This reflects
   *   the preference for named files already built in to this API route. We
   *   definitely want to warn if we hit this case, maybe even fail the build.
   * - Else, renamed `<slug>/index.mdx` to `<slug>.mdx`
   * With this prebuild rename step in place, then for a given `docsPath`, we'll
   * have a consistent and predictable file path to fetch - always:
   * - `.../${contentDir}/${docsPath.join("/")}.mdx`. We'd be able to remove
   * one of the two fetches below.
   */
  const res = await Promise.all([
    fetch(
      `${SELF_URL}/content/${productSlug}/${parsedVersion}/${contentDir}/${parsedDocsPath}.mdx`
    ),
    fetch(
      `${SELF_URL}/content/${productSlug}/${parsedVersion}/${contentDir}/${parsedDocsPath}/index.mdx`
    ),
  ]);

  for (const r of res) {
    if (r.ok) {
      const text = await r.text();
      const { data: metadata, content: markdownSource } = grayMatter(text);

      console.log(r.url);

      ("doc/latest/docs/configuration/acl");

      return Response.json({
        meta: {
          status_code: 200,
          status_text: "OK",
        },
        result: {
          fullPath: "doc/latest/docs/configuration/acl",
          product: productSlug,
          metadata,
          subpath: "docs",
          markdownSource,
          parsedVersion,
          created_at: "Fri Aug 13 2021 18:50:23 GMT+0000 (GMT)",
          sha: "068b1fbd12d6eded8325407c0ef22c1ff127a91d",
        },
      });
    }
  }

  return new Response("Not found", { status: 404 });
}
