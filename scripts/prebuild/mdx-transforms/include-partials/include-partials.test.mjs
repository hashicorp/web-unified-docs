/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

// Third-party
import grayMatter from 'gray-matter'
// Local
import { includePartials } from './include-partials.mjs'

describe('Include Partials', () => {
	const fixtureDir = path.join(
		process.cwd(),
		'scripts/prebuild/mdx-transforms/include-partials/__fixtures__/basic',
	)

	const partialsDir = path.join(fixtureDir, 'partials')

	test('should include markdown partial', async () => {
		const transformedText = `# Hello world!

This is a test file. Here's a partial file included in this file:

Hey, this is some text in a \`partial\` MDX file!

This is the end of the test file.
`

		// Set up paths to the test data
		const testFilePath = path.join(fixtureDir, 'test-file.mdx')
		// Read in the test file, and split the MDX string from frontmatter
		const testFileString = fs.readFileSync(testFilePath, 'utf8')
		const testMdxString = grayMatter(testFileString).content
		// Transform the MDX, this should include the referenced partial
		const transformed = await includePartials(testMdxString, partialsDir)
		expect(transformed).toContain(transformedText)
	})

	test('should include text partial', async () => {
		const transformedText = `# Hello world!

This is a test file. Here's a partial file included in this file:

\`\`\`txt
Hey, this is some text in a \`partial\` MDX file!
\`\`\`

This is the end of the test file.
`

		// Set up paths to the test data
		const testFilePath = path.join(fixtureDir, 'test-file-text-partial.mdx')
		// Read in the test file, and split the MDX string from frontmatter
		const testFileString = fs.readFileSync(testFilePath, 'utf8')
		const testMdxString = grayMatter(testFileString).content
		// Transform the MDX, this should include the referenced partial
		const transformed = await includePartials(testMdxString, partialsDir)
		expect(transformed).toContain(transformedText)
	})

	test('should throw error when partial is missing', async () => {
		// Set up paths to the test data
		const testFilePath = path.join(fixtureDir, 'test-file-bad-partial.mdx')
		const partialsDir = path.join(fixtureDir, 'partials')
		// Read in the test file, and split the MDX string from frontmatter
		const testFileString = fs.readFileSync(testFilePath, 'utf8')
		const testMdxString = grayMatter(testFileString).content
		// Transform the MDX, this should include the referenced partial
		await expect(includePartials(testMdxString, partialsDir)).rejects.toThrow()
	})

	test('throw error if partialDir is ommitted', async () => {
		await expect(includePartials('')).rejects.toThrow(
			'Error in remarkIncludePartials: The partialsDir argument is required. Please provide the path to the partials directory.',
		)
	})

	test('throw error if filePath is not found', async () => {
		await expect(includePartials()).rejects.toThrow(
			'Error in remarkIncludePartials: The partialsDir argument is required. Please provide the path to the partials directory.',
		)
	})
})
