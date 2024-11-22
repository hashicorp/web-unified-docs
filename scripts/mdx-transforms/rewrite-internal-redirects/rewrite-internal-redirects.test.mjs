import fs from 'fs'
import path from 'path'
import { describe, expect, test } from 'vitest'
// Third-party
import grayMatter from 'gray-matter'
// Local
import { transformRewriteInternalRedirects } from './rewrite-internal-redirects.mjs'

describe('Transform Rewrite Internal Links', () => {
	const fixtureDir = path.join(
		process.cwd(),
		'scripts/mdx-transforms/rewrite-internal-redirects/__fixtures__',
	)

	test('should transform alerts', async () => {
		// Set up paths to the test data
		const testFilePath = path.join(fixtureDir, 'test-file.mdx')
		const testResultPath = path.join(fixtureDir, 'test-file-results.mdx')
		// Read in the test file, and split the MDX string from frontmatter
		const testFileString = fs.readFileSync(testFilePath, 'utf8')
		const testResultString = fs.readFileSync(testResultPath, 'utf-8')
		const testMdxString = grayMatter(testFileString).content
		// Transform the MDX, this should have the transformed redirect
		const transformed = await transformRewriteInternalRedirects(
			testMdxString,
			'test',
			fixtureDir,
		)
		expect(transformed).toContain(testResultString)
	})
})
