/**
 * Copyright IBM Corp. 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, expect, it } from 'vitest'
import {
	generateSubProductLlmsTxt,
	resolveBasePath,
} from './generate-llms-txt.mjs'

describe('generateSubProductLlmsTxt', () => {
	it('produces heading, description, and grouped links', () => {
		const navDataFiles = [
			{
				navData: [
					{ heading: 'My Product' },
					{ title: 'Overview', path: '' },
					{
						title: 'Guides',
						routes: [
							{ title: 'Getting Started', path: 'getting-started' },
							{ title: 'Advanced', path: 'advanced' },
						],
					},
				],
			},
		]

		const result = generateSubProductLlmsTxt(
			'My Product',
			'myproduct',
			'docs',
			navDataFiles,
		)

		expect(result).toContain('# My Product Documentation')
		expect(result).toContain('> Documentation for My Product.')
		expect(result).toContain(
			'- [Overview](https://developer.hashicorp.com/myproduct/docs)',
		)
		expect(result).toContain('## Guides')
		expect(result).toContain(
			'- [Getting Started](https://developer.hashicorp.com/myproduct/docs/getting-started)',
		)
	})

	it('excludes hidden items and headings from links', () => {
		const navDataFiles = [
			{
				navData: [
					{ heading: 'Product' },
					{ title: 'Hidden', path: 'hidden', hidden: true },
					{ title: 'Visible', path: 'visible' },
				],
			},
		]

		const result = generateSubProductLlmsTxt(
			'Product',
			'p',
			'docs',
			navDataFiles,
		)

		expect(result).not.toContain('hidden')
		expect(result).toContain(
			'- [Visible](https://developer.hashicorp.com/p/docs/visible)',
		)
	})
})

describe('resolveBasePath', () => {
	it('resolves all four branches correctly', () => {
		expect(
			resolveBasePath('x-nav-data.json', { basePaths: ['enterprise'] }),
		).toBe('enterprise')
		expect(
			resolveBasePath('api-docs-nav-data.json', {
				basePaths: ['api-docs', 'docs'],
			}),
		).toBe('api-docs')
		expect(
			resolveBasePath('x-nav-data.json', {
				basePaths: ['a', 'b'],
				navDataPath: 'cdktf',
			}),
		).toBe('cdktf')
		expect(resolveBasePath('docs-nav-data.json', {})).toBe('docs')
	})
})
