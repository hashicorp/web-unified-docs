/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, test, expect } from 'vitest'
import { collectHeadings } from './collect-headings.mjs'

describe('collectHeadings', () => {
	test('should collect headings from markdown content', async () => {
		const content = `# Heading 1
## Heading 2
this is not a heading
### Heading 3
this is not a heading
#### Heading 4
this is not a heading
##### Heading 5
this is not a heading
###### Heading 6 should not be collected.`

		const expectedHeadings = [
			'Heading 1',
			'Heading 2',
			'Heading 3',
			'Heading 4',
			'Heading 5',
		]

		const result = await collectHeadings(content)
		expect(result).toEqual(expectedHeadings)
	})

	test('should return an empty array if there are no headings', async () => {
		const content = `This is some content without any headings.`

		const result = await collectHeadings(content)
		expect(result).toEqual([])
	})

	test('should handle nested children nodes correctly', async () => {
		const content = `# Heading 1 with **bold** text and *italic* text`

		const expectedHeadings = ['Heading 1 with bold text and italic text']

		const result = await collectHeadings(content)
		expect(result).toEqual(expectedHeadings)
	})

	test('should handle inline code headings', async () => {
		const content = `### \`--outputs-file\``
		const expectedHeadings = ['--outputs-file']

		const result = await collectHeadings(content)
		expect(result).toEqual(expectedHeadings)
	})

	test('should handle headings that contain inline code', async () => {
		const content = `### Fetching \`--outputs-file\``
		const expectedHeadings = ['Fetching --outputs-file']

		const result = await collectHeadings(content)
		expect(result).toEqual(expectedHeadings)
	})

	test('should include text from headings and exclude html nodes', async () => {
		const content = `## Constructs <a name="Constructs" id="Constructs"></a>`
		const expectedHeadings = ['Constructs']

		const result = await collectHeadings(content)
		expect(result).toEqual(expectedHeadings)
	})

	test('should handle headings that contain links', async () => {
		const content = `### A Heading to [a link](https://example.com)`
		const expectedHeadings = ['A Heading to a link']

		const result = await collectHeadings(content)
		expect(result).toEqual(expectedHeadings)
	})
})
