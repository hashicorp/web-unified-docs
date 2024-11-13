import fs from 'fs'
import path from 'path'
// Third-party
import grayMatter from 'gray-matter'
// Local
import { transformParagraphCustomAlerts } from './paragraph-custom-alert.mjs'

main()

/**
 * This is a simple test script to demo the transformParagraphCustomAlerts function.
 *
 * TODO: Set up some kind of testing framework.
 */
async function main() {
	// We're using test data from a fixtures directory
	const fixtureDir = path.join(
		process.cwd(),
		'scripts/mdx-transforms/paragraph-custom-alert/__fixtures__/basic',
	)
	// Set up paths to the test data
	const testFilePath = path.join(fixtureDir, 'test-file.mdx')
	// Read in the test file, and split the MDX string from frontmatter
	const testFileString = fs.readFileSync(testFilePath, 'utf8')
	const testMdxString = grayMatter(testFileString).content
	// Transform the MDX
	const transformed = await transformParagraphCustomAlerts(testMdxString)
	// Log out the transformed MDX, then manually confirm the alerts are there
	console.log({ transformed })
}
