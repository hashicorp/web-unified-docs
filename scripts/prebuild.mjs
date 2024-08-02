import path from "path";
import buildMdxTransforms from "./mdx-transforms/build-mdx-transforms.mjs";
import gatherVersionMetadata from "./gather-version-metadata.mjs";

/**
 * We expect the current working directory to be the project root.
 * We expect MDX files to be located in `public/products`.
 */
const CWD = process.cwd();
const CONTENT_DIR = path.join(CWD, "content");
const CONTENT_DIR_OUT = path.join(CWD, "public", "content");
const VERSION_METADATA_FILE = path.join(
	CWD,
	"app/api/content/[productSlug]/version-metadata/data.json"
);

/**
 * Define the prebuild script.
 */
async function main() {
	// Apply MDX transforms
	await buildMdxTransforms(CONTENT_DIR, CONTENT_DIR_OUT);
	// Gather and write out version metadata
	const versionMetadata = await gatherVersionMetadata(CONTENT_DIR_OUT);
	const versionMetadataJson = JSON.stringify(versionMetadata, null, 2);
	fs.writeFileSync(VERSION_METADATA_FILE, versionMetadataJson);
}

/**
 * Run the prebuild script.
 */
main();
