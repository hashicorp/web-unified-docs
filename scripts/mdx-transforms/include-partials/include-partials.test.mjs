import fs from 'fs'
import { expect, test } from 'vitest'

import path from 'path'
// Third-party
import grayMatter from 'gray-matter'
// Local
import { includePartials } from './include-partials.mjs'

test('should include partial', async () => {
	// We're using test data from a fixtures directory
	const fixtureDir = path.join(
		process.cwd(),
		'scripts/mdx-transforms/include-partials/__fixtures__/basic',
	)
	// Set up paths to the test data
	const testFilePath = path.join(fixtureDir, 'test-file.mdx')
	const partialsDir = path.join(fixtureDir, 'partials')
	// Read in the test file, and split the MDX string from frontmatter
	const testFileString = fs.readFileSync(testFilePath, 'utf8')
	const testMdxString = grayMatter(testFileString).content
	// Transform the MDX, this should include the referenced partial
	const transformed = await includePartials(testMdxString, partialsDir)
	// Log out the transformed MDX, then manually confirm the partial is there
	console.log({ transformed })
})

test('throw error if partialDir is ommitted', async () => {
	await expect(includePartials('')).rejects.toThrow(
		'Error in remarkIncludePartials: The partialsDir argument is required. Please provide the path to the partials directory.',
	)
})

console.log('#FIXME skipped test')
test.skip('throw error if filePath is not found', async () => {
	const fixtureDir = path.join(
		process.cwd(),
		'scripts/mdx-transforms/include-partials/__fixtures__/basic',
	)
	// Set up paths to the test data
	const testFilePath = path.join(fixtureDir, 'no_file_here.mdx')
	const partialsDir = path.join(fixtureDir, 'partials')
	await expect(includePartials('', partialsDir, testFilePath)).rejects.toThrow(
		'Error in remarkIncludePartials: The partialsDir argument is required. Please provide the path to the partials directory.',
	)
})
