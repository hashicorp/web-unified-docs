/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

// Third-party
import grayMatter from 'gray-matter'
// Local
import { includePartials } from './include-partials.mjs'
import { vol } from 'memfs'

describe('Include Partials', () => {
	const fixtureDir = path.join(
		process.cwd(),
		'scripts/prebuild/mdx-transforms/include-partials/__fixtures__',
	)

	const partialsDir = path.join(fixtureDir, 'basic', 'partials')

	test('should include markdown partial', async () => {
		const transformedText = `# Hello world!

This is a test file. Here's a partial file included in this file:

Hey, this is some text in a \`partial\` MDX file!

This is the end of the test file.
`

		// Set up paths to the test data
		const testFilePath = path.join(fixtureDir, 'basic', 'test-file.mdx')
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
		const testFilePath = path.join(
			fixtureDir,
			'basic',
			'test-file-text-partial.mdx',
		)
		// Read in the test file, and split the MDX string from frontmatter
		const testFileString = fs.readFileSync(testFilePath, 'utf8')
		const testMdxString = grayMatter(testFileString).content
		// Transform the MDX, this should include the referenced partial
		const transformed = await includePartials(testMdxString, partialsDir)
		expect(transformed).toContain(transformedText)
	})

	test('should throw error when partial is missing', async () => {
		// Set up paths to the test data
		const testFilePath = path.join(
			fixtureDir,
			'basic',
			'test-file-bad-partial.mdx',
		)
		const partialsDir = path.join(fixtureDir, 'basic', 'partials')
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
	test('should include global product partial', async () => {
		const fixturePath = path.join(
			fixtureDir,
			'global',
			'partials',
			'test-partial.mdx',
		)
		const baseContent = `# Hello world! \n\n@include "${path.basename(fixturePath)}"\n`

		const fixtureContent = fs.readFileSync(fixturePath, 'utf8')

		const transformed = await includePartials(
			baseContent,
			path.join(fixtureDir, 'global', 'partials'),
		)

		expect(transformed).toContain(fixtureContent)
	})

	test('global partials includes content from ./content/global/partials', async () => {
		const globalPartialContent = fs.readFileSync(
			path.join(fixtureDir, 'global', 'partials', 'test-partial.mdx'),
			'utf8',
		)
		const testFilePath = path.join(fixtureDir, 'basic', 'test-file.mdx')
		vol.fromJSON({
			[testFilePath]: `---
	title: Hello world test document
	---

	# Hello world!

	This is a test file. Here's a partial file included in this file:

	@include 'test-partial.mdx'

	This is the end of the test file.
	`,
			[path.join(fixtureDir, 'global', 'partials', 'test-partial.mdx')]:
				globalPartialContent,
		})
		const { content: testMdxString } = grayMatter(
			fs.readFileSync(testFilePath, 'utf8'),
		)

		const transformed = await includePartials(
			testMdxString,
			path.join(fixtureDir, 'global', 'partials'),
		)

		expect(transformed).toContain(globalPartialContent)

		vol.reset()
	})
})
