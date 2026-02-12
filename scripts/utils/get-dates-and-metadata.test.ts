/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import { vol } from 'memfs'
import fs from 'node:fs'
import grayMatter from 'gray-matter'
import {
	getCreatedDate,
	getLastModifiedDate,
	parseMarkdownFrontMatter,
	addDateMetadata,
} from './get-dates-and-metadata.mjs'

// Mock dependencies
vi.mock('node:child_process')
vi.mock('node:fs')
vi.mock('gray-matter')

const mdxContent = `---
title: Test
description: A test
---

# Hello World
`

beforeEach(() => {
	vol.fromJSON({
		'/path/to/file.mdx': mdxContent,
	})
})

describe('get-dates-and-metadata', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('getCreatedDate', () => {
		it('should return ISO 8601 formatted date from first commit', () => {
			const mockDate = '2025-04-20T04:20:00Z'
			vi.mocked(execSync).mockReturnValue(mockDate)

			const filePath = '/path/to/file.mdx'
			const result = getCreatedDate(filePath)

			expect(result).toBe(mockDate)
		})

		it('should trim whitespace from git output', () => {
			const mockDate = '2025-04-20T04:20:00Z\n'
			vi.mocked(execSync).mockReturnValue(mockDate)

			const filePath = '/path/to/file.mdx'
			const result = getCreatedDate(filePath)

			expect(result).toBe('2025-04-20T04:20:00Z')
		})

		it('should return null when git log fails', () => {
			vi.mocked(execSync).mockImplementation(() => {
				throw new Error('No commits found')
			})
			// eat error message
			vi.spyOn(console, 'error').mockImplementation(() => {})

			const filePath = '/path/to/file.mdx'
			const result = getCreatedDate(filePath)

			expect(result).toBe(null)
		})

		it('should return null for empty git output', () => {
			vi.mocked(execSync).mockReturnValue('\n')

			const filePath = '/path/to/file.mdx'
			const result = getCreatedDate(filePath)

			expect(result).toBe(null)
		})
	})

	describe('getLastModifiedDate', () => {
		it('should return ISO 8601 formatted date from most recent commit', () => {
			const mockDate = '2025-04-20T04:20:00Z'
			vi.mocked(execSync).mockReturnValue(mockDate)

			const filePath = '/path/to/file.mdx'
			const result = getLastModifiedDate(filePath)

			expect(result).toBe(mockDate)
		})

		it('should return the trimmed most recent commit date', () => {
			const mockDate = '2025-04-20T04:20:00Z\n'
			vi.mocked(execSync).mockReturnValue(mockDate)

			const filePath = '/path/to/file.mdx'
			const result = getLastModifiedDate(filePath)

			expect(result).toBe('2025-04-20T04:20:00Z')
		})

		it('should return null when git log fails', () => {
			vi.mocked(execSync).mockImplementation(() => {
				throw new Error('Git error')
			})
			// eat error message
			vi.spyOn(console, 'error').mockImplementation(() => {})

			const filePath = '/path/to/file.mdx'
			const result = getLastModifiedDate(filePath)

			expect(result).toBe(null)
		})

		it('should return null for empty git output', () => {
			vi.mocked(execSync).mockReturnValue('\n')

			const filePath = '/path/to/file.mdx'
			const result = getLastModifiedDate(filePath)

			expect(result).toBe(null)
		})
	})

	describe('parseMarkdownFrontMatter', () => {
		it('should parse frontmatter and markdown content from file', () => {
			const mockParsed = {
				content: '# Hello World\n\nSome content',
				matter: 'title: Test\ndescription: A test file',
				data: { title: 'Test', description: 'A test file' },
			}

			vi.mocked(grayMatter.read).mockReturnValue(mockParsed as any)

			const filePath = '/path/to/file.mdx'
			const result = parseMarkdownFrontMatter(filePath)

			expect(grayMatter.read).toHaveBeenCalledWith(filePath)
			expect(result).toEqual({
				markdownSource: mockParsed.content,
				matter: mockParsed.matter,
				metadata: mockParsed.data,
			})
		})

		it('should return null when parsing fails', () => {
			vi.mocked(grayMatter.read).mockImplementation(() => {
				throw new Error('Parse error')
			})
			// eat error message
			vi.spyOn(console, 'error').mockImplementation(() => {})

			const filePath = '/path/to/file.mdx'
			const result = parseMarkdownFrontMatter(filePath)

			expect(result).toBe(null)
		})

		it('should handle files with empty frontmatter', () => {
			const mockParsed = {
				content: 'Just content, no frontmatter',
				matter: '',
				data: {},
			}

			vi.mocked(grayMatter.read).mockReturnValue(mockParsed as any)

			const filePath = '/path/to/file.mdx'
			const result = parseMarkdownFrontMatter(filePath)

			expect(result?.metadata).toEqual({})
			expect(Object.keys(result?.metadata || {}).length).toBe(0)
		})

		it('should handle files with only markdown content', () => {
			const mockParsed = {
				content: '# Title\n\n## Section\n\nContent here',
				matter: '',
				data: {},
			}

			vi.mocked(grayMatter.read).mockReturnValue(mockParsed as any)

			const filePath = '/path/to/file.mdx'
			const result = parseMarkdownFrontMatter(filePath)

			expect(result?.markdownSource).toContain('## Section')
		})
	})

	describe('addDateMetadata', () => {
		beforeEach(() => {
			vi.clearAllMocks()
		})

		it('should add metadata block to frontmatter', () => {
			const filePath = '/path/to/file.mdx'
			const createdDate = '2025-04-20T04:20:00Z'
			const lastModifiedDate = '2026-04-20T04:20:00Z'
			const originalFrontmatter = 'title: Test\ndescription: A test'
			const originalContent = '# Hello World'
			const newMdxContent = `---title: Test
description: A test
# START AUTO GENERATED METADATA, DO NOT EDIT
created_at: 2025-04-20T04:20:00Z
last_modified: 2026-04-20T04:20:00Z
# END AUTO GENERATED METADATA
---
# Hello World`

			vi.mocked(execSync)
				.mockReturnValueOnce(createdDate)
				.mockReturnValueOnce(lastModifiedDate)
			vi.mocked(grayMatter.read).mockReturnValue({
				content: originalContent,
				matter: originalFrontmatter,
				data: { title: 'Test', description: 'A test' },
			} as any)
			const fsWriteSpy = vi.spyOn(fs, 'writeFileSync')
			// eat log message
			vi.spyOn(console, 'log').mockImplementation(() => {})

			addDateMetadata(filePath)

			expect(fsWriteSpy).toHaveBeenCalledWith(filePath, newMdxContent, 'utf-8')
			expect(fsWriteSpy).toHaveBeenCalledTimes(1)
		})

		it('should remove existing auto-generated metadata before adding new', () => {
			const filePath = '/path/to/file.mdx'
			const createdDate = '2025-04-20T04:20:00Z'
			const lastModifiedDate = '2026-04-20T04:20:00Z'
			const oldMetadataBlock =
				'# START AUTO GENERATED METADATA, DO NOT EDIT\ncreated_at: 2025-01-01T00:00:00Z\nlast_modified: 2025-01-02T00:00:00Z\n# END AUTO GENERATED METADATA\n'
			const frontmatterWithOldMetadata = `title: Test\n${oldMetadataBlock}`
			const newMdxContent = `---title: Test

# START AUTO GENERATED METADATA, DO NOT EDIT
created_at: 2025-04-20T04:20:00Z
last_modified: 2026-04-20T04:20:00Z
# END AUTO GENERATED METADATA
---
# Hello World`

			vi.mocked(execSync)
				.mockReturnValueOnce(createdDate)
				.mockReturnValueOnce(lastModifiedDate)
			vi.mocked(grayMatter.read).mockReturnValue({
				content: '# Hello World',
				matter: frontmatterWithOldMetadata,
				data: {
					title: 'Test',
					created_at: createdDate,
					last_modified: lastModifiedDate,
				},
			} as any)
			const fsWriteSpy = vi.spyOn(fs, 'writeFileSync')
			// eat log message
			vi.spyOn(console, 'log').mockImplementation(() => {})

			addDateMetadata(filePath)

			expect(fsWriteSpy).toHaveBeenCalledWith(filePath, newMdxContent, 'utf-8')
			expect(fsWriteSpy).toHaveBeenCalledTimes(1)
		})

		it('should add newline before metadata block if frontmatter lacks one', () => {
			const filePath = '/path/to/file.mdx'
			const createdDate = '2025-04-20T04:20:00Z'
			const lastModifiedDate = '2026-04-20T04:20:00Z'
			const frontmatterNoNewline = 'title: Test'
			const newMdxContent = `---title: Test
# START AUTO GENERATED METADATA, DO NOT EDIT
created_at: 2025-04-20T04:20:00Z
last_modified: 2026-04-20T04:20:00Z
# END AUTO GENERATED METADATA
---
# Hello World`

			vi.mocked(execSync)
				.mockReturnValueOnce(createdDate)
				.mockReturnValueOnce(lastModifiedDate)
			vi.mocked(grayMatter.read).mockReturnValue({
				content: '# Hello World',
				matter: frontmatterNoNewline,
				data: { title: 'Test' },
			} as any)
			const fsWriteSpy = vi.spyOn(fs, 'writeFileSync')
			// eat log message
			vi.spyOn(console, 'log').mockImplementation(() => {})

			addDateMetadata(filePath)

			expect(fsWriteSpy).toHaveBeenCalledWith(filePath, newMdxContent, 'utf-8')
			expect(fsWriteSpy).toHaveBeenCalledTimes(1)
		})

		it('should skip file if created date is missing', () => {
			const filePath = '/path/to/file.mdx'
			const consoleWarnSpy = vi
				.spyOn(console, 'warn')
				.mockImplementation(() => {})

			vi.mocked(execSync)
				.mockReturnValueOnce('')
				.mockReturnValueOnce('2026-04-20T04:20:00Z')

			addDateMetadata(filePath)

			expect(vi.mocked(fs.writeFileSync)).not.toHaveBeenCalled()
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				expect.stringContaining(
					'⚠️  Skipping /path/to/file.mdx: Could not retrieve git dates',
				),
			)
			consoleWarnSpy.mockRestore()
		})

		it('should skip file if last modified date is missing', () => {
			const filePath = '/path/to/file.mdx'
			const consoleWarnSpy = vi
				.spyOn(console, 'warn')
				.mockImplementation(() => {})

			vi.mocked(execSync)
				.mockReturnValueOnce('2025-04-20T04:20:00Z')
				.mockReturnValueOnce('')

			addDateMetadata(filePath)

			expect(vi.mocked(fs.writeFileSync)).not.toHaveBeenCalled()
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				expect.stringContaining(
					'⚠️  Skipping /path/to/file.mdx: Could not retrieve git dates',
				),
			)
			consoleWarnSpy.mockRestore()
		})

		it('should skip file if no frontmatter exists', () => {
			const filePath = '/path/to/file.mdx'
			const createdDate = '2025-04-20T04:20:00Z'
			const lastModifiedDate = '2026-04-20T04:20:00Z'
			const consoleWarnSpy = vi
				.spyOn(console, 'warn')
				.mockImplementation(() => {})

			vi.mocked(execSync)
				.mockReturnValueOnce(createdDate)
				.mockReturnValueOnce(lastModifiedDate)
			vi.mocked(grayMatter.read).mockReturnValue({
				content: 'Just content',
				matter: undefined,
				data: {},
			} as any)

			addDateMetadata(filePath)

			expect(vi.mocked(fs.writeFileSync)).not.toHaveBeenCalled()
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				expect.stringContaining(
					'⚠️  Skipping /path/to/file.mdx: No frontmatter found',
				),
			)
			consoleWarnSpy.mockRestore()
		})

		it('should skip file if metadata is empty', () => {
			const filePath = '/path/to/file.mdx'
			const createdDate = '2025-01-15T10:30:00Z'
			const lastModifiedDate = '2025-01-20T14:48:01Z'
			const consoleWarnSpy = vi
				.spyOn(console, 'warn')
				.mockImplementation(() => {})

			vi.mocked(execSync)
				.mockReturnValueOnce(createdDate)
				.mockReturnValueOnce(lastModifiedDate)
			vi.mocked(grayMatter.read).mockReturnValue({
				content: 'Content',
				matter: 'some raw frontmatter',
				data: {},
			} as any)

			addDateMetadata(filePath)

			expect(vi.mocked(fs.writeFileSync)).not.toHaveBeenCalled()
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				expect.stringContaining(
					'⚠️  Skipping /path/to/file.mdx: No frontmatter found',
				),
			)
			consoleWarnSpy.mockRestore()
		})
	})
})
