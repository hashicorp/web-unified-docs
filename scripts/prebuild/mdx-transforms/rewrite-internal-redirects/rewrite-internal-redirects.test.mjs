/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, test } from 'vitest'
import grayMatter from 'gray-matter'

import { transformRewriteInternalRedirects } from './rewrite-internal-redirects.mjs'

describe('Transform Rewrite Internal Links', () => {
	const fixtureDir = path.join(
		process.cwd(),
		'scripts/prebuild/mdx-transforms/rewrite-internal-redirects/__fixtures__',
	)

	test('should transform links that need to be redirected', async () => {
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

	test('should cache redirects for multiple files', async () => {
		// Set up paths to the test data
		const testFilePath = path.join(fixtureDir, 'test-file.mdx')
		const testResultPath = path.join(fixtureDir, 'test-file-results.mdx')

		const testFilePath2 = path.join(fixtureDir, 'test-file2.mdx')
		const testResultPath2 = path.join(fixtureDir, 'test-file-results2.mdx')

		// Read in the test file, and split the MDX string from frontmatter
		const testFileString = fs.readFileSync(testFilePath, 'utf8')
		const testResultString = fs.readFileSync(testResultPath, 'utf-8')
		const testMdxString = grayMatter(testFileString).content

		const testFileString2 = fs.readFileSync(testFilePath2, 'utf8')
		const testResultString2 = fs.readFileSync(testResultPath2, 'utf-8')
		const testMdxString2 = grayMatter(testFileString2).content

		// Transform the MDX, this should have the transformed redirect
		const transformed = await transformRewriteInternalRedirects(
			testMdxString,
			'test',
			fixtureDir,
		)
		const transformed2 = await transformRewriteInternalRedirects(
			testMdxString2,
			'test',
			fixtureDir,
		)

		expect(transformed).toContain(testResultString)
		expect(transformed2).toContain(testResultString2)
	})
})
