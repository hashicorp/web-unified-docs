import fs from "fs";
import path from "path";
// Third-party
import grayMatter from "gray-matter";
// Local
import { includePartials } from "./include-partials.mjs";

main();

/**
 * This is a simple test script to demo the includePartials function.
 *
 * TODO: Set up some kind of testing framework.
 */
async function main() {
	// We're using test data from a fixtures directory
	const fixtureDir = path.join(
		process.cwd(),
		"scripts/mdx-transforms/include-partials/__fixtures__/basic"
	);
	// Set up paths to the test data
	const testFilePath = path.join(fixtureDir, "test-file.mdx");
	const partialsDir = path.join(fixtureDir, "partials");
	// Read in the test file, and split the MDX string from frontmatter
	const testFileString = fs.readFileSync(testFilePath, "utf8");
	const testMdxString = grayMatter(testFileString).content;
	// Transform the MDX, this should include the referenced partial
	const transformed = await includePartials(testMdxString, partialsDir);
	// Log out the transformed MDX, then manually confirm the partial is there
	console.log({ transformed });
}
