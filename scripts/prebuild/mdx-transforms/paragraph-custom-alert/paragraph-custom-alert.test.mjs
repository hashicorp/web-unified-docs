/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, test } from 'vitest'
// Third-party
import grayMatter from 'gray-matter'
// Local
import { transformParagraphCustomAlerts } from './paragraph-custom-alert.mjs'

describe('Transform Paragraph Custom Alerts', () => {
	const fixtureDir = path.join(
		process.cwd(),
		'scripts/prebuild/mdx-transforms/paragraph-custom-alert/__fixtures__/basic',
	)

	test('should transform alerts', async () => {
		// Set up paths to the test data
		const testFilePath = path.join(fixtureDir, 'test-file.mdx')
		const testResultPath = path.join(fixtureDir, 'test-file-results.mdx')
		// Read in the test file, and split the MDX string from frontmatter
		const testFileString = fs.readFileSync(testFilePath, 'utf8')
		const testResultString = fs.readFileSync(testResultPath, 'utf-8')
		const testMdxString = grayMatter(testFileString).content
		// Transform the MDX, this should include the referenced partial
		const transformed = await transformParagraphCustomAlerts(testMdxString)
		expect(transformed).toContain(testResultString)
	})
})
