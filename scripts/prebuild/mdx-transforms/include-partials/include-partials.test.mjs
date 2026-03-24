/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test, vi } from 'vitest'

// Third-party
import grayMatter from 'gray-matter'
// Local
import { includePartials } from './include-partials.mjs'
import { PARTIALS_ALIAS } from './remark-include-partials.mjs'

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

	test('should include root-relative local partial', async () => {
		const mdxString = `# Hello\n\n@include "/test-partial.mdx"\n`
		const transformed = await includePartials(mdxString, partialsDir)

		expect(transformed).toContain(
			'Hey, this is some text in a `partial` MDX file!',
		)
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

	test('throws an error when an include escapes the allowed partials roots', async () => {
		const mdxString = `# Hello\n\n@include "../../../outside.mdx"\n`

		await expect(includePartials(mdxString, partialsDir, 'test-file.mdx')).rejects.toThrow(
			'@include path escapes allowed partials directories',
		)
	})

	test('allows includes from product global partials', async () => {
		const tempRoot = fs.mkdtempSync(path.join(process.cwd(), 'tmp-include-partials-'))
		const localPartialsDir = path.join(tempRoot, 'content', 'vault', 'v1.20.x', 'docs', 'partials')
		const productGlobalDir = path.join(tempRoot, 'content', 'vault', 'global', 'partials')

		fs.mkdirSync(localPartialsDir, { recursive: true })
		fs.mkdirSync(productGlobalDir, { recursive: true })
		fs.writeFileSync(
			path.join(productGlobalDir, 'shared.mdx'),
			'This came from product global partials.\n',
		)

		const mdxString = `# Hello\n\n@include "../../../global/partials/shared.mdx"\n`
		const transformed = await includePartials(
			mdxString,
			localPartialsDir,
			'test-file.mdx',
			{ productGlobalPartialsDir: productGlobalDir },
		)

		expect(transformed).toContain('This came from product global partials.')

		fs.rmSync(tempRoot, { recursive: true, force: true })
	})

	test('throws an error when a partial symlink escapes the allowed roots', async () => {
		const tempRoot = fs.mkdtempSync(path.join(process.cwd(), 'tmp-include-partials-'))
		const localPartialsDir = path.join(tempRoot, 'content', 'vault', 'v1.20.x', 'docs', 'partials')
		const outsideFile = path.join(tempRoot, 'outside.mdx')
		const linkedPartial = path.join(localPartialsDir, 'linked.mdx')

		fs.mkdirSync(localPartialsDir, { recursive: true })
		fs.writeFileSync(outsideFile, 'This should stay outside the partials roots.\n')
		fs.symlinkSync(outsideFile, linkedPartial)

		const mdxString = `# Hello\n\n@include "linked.mdx"\n`

		await expect(includePartials(mdxString, localPartialsDir, 'test-file.mdx')).rejects.toThrow(
			'@include path escapes allowed partials directories',
		)

		fs.rmSync(tempRoot, { recursive: true, force: true })
	})

	describe(`${PARTIALS_ALIAS.GLOBAL} alias`, () => {
		const globalPartialName = 'global-test-partial.mdx'
		const globalPartialContent = 'Hey this is some partial content!'

		test(`resolves global alias to global partials directory`, async () => {
			const mdxString = `# Hello\n\n@include "${PARTIALS_ALIAS.GLOBAL}/${globalPartialName}"\n`
			vi.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
				return globalPartialContent
			})
			const transformed = await includePartials(mdxString, partialsDir)

			expect(transformed).toContain(globalPartialContent)

			vi.restoreAllMocks()
		})

		test('does not fall through to local partials for missing global partials', async () => {
			// alias-only.mdx exists in local partialsDir but NOT in content/global/partials
			const mdxString = `# Hello\n\n@include "${PARTIALS_ALIAS.GLOBAL}/alias-only.mdx"\n`

			await expect(includePartials(mdxString, partialsDir)).rejects.toThrow(
				'@include file not found',
			)
		})

		test('throws an error when the aliased partial does not exist', async () => {
			const mdxString = `# Hello\n\n@include "${PARTIALS_ALIAS.GLOBAL}/nonexistent.mdx"\n`

			await expect(includePartials(mdxString, partialsDir)).rejects.toThrow(
				'@include file not found',
			)
		})
	})
})
