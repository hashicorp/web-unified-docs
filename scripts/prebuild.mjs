import path from "path";
import buildMdxTransforms from "./mdx-transforms/build-mdx-transforms.mjs";

/**
 * We expect the current working directory to be the project root.
 * We expect MDX files to be located in `public/products`.
 */
const CWD = process.cwd();
const CONTENT_DIR = path.join(CWD, "content");
const CONTENT_DIR_OUT = path.join(CWD, "public", "content");

/**
 * Define the prebuild script.
 */
async function main() {
	await buildMdxTransforms(CONTENT_DIR, CONTENT_DIR_OUT);
}

/**
 * Run the prebuild script.
 */
main();
