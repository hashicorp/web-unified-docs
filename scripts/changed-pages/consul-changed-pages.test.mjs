/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import {
	collectChangedPages,
	getConsulVersions,
	pageUrlPath,
	parseChangedFiles,
	parseVersionDir,
	renderReport,
	renderReportWithinLimit,
	splitConsulPath,
} from './consul-changed-pages.mjs'

const latest = { version: 'v2.1.x', isLatest: true }
const older = { version: 'v1.22.x', isLatest: false }

describe('parseVersionDir', () => {
	test('parses stable and release-stage versions', () => {
		expect(parseVersionDir('v2.1.x')).toMatchObject({
			version: 'v2.1.x',
			releaseStage: 'stable',
			major: 2,
			minor: 1,
		})
		expect(parseVersionDir('v2.2.x (rc)')).toMatchObject({
			version: 'v2.2.x',
			releaseStage: 'rc',
		})
	})

	test('ignores directories that are not versions', () => {
		expect(parseVersionDir('global')).toBeNull()
	})
})

describe('splitConsulPath', () => {
	test('splits a Consul content path', () => {
		expect(
			splitConsulPath('content/consul/v2.1.x/content/docs/intro/index.mdx'),
		).toEqual({ versionDir: 'v2.1.x', relativePath: 'docs/intro/index.mdx' })
	})

	test('returns no relative path for non-content Consul files', () => {
		expect(
			splitConsulPath('content/consul/v2.1.x/data/docs-nav-data.json'),
		).toEqual({ versionDir: 'v2.1.x', relativePath: null })
	})

	test('returns null for other products', () => {
		expect(
			splitConsulPath('content/vault/v1.18.x/content/docs/index.mdx'),
		).toBeNull()
	})
})

describe('pageUrlPath', () => {
	test('latest version pages are unversioned', () => {
		expect(
			pageUrlPath('docs/north-south/api-gateway/vm/listener.mdx', latest),
		).toBe('/consul/docs/north-south/api-gateway/vm/listener')
	})

	test('older version pages include the version after the base path', () => {
		expect(pageUrlPath('api-docs/catalog.mdx', older)).toBe(
			'/consul/api-docs/v1.22.x/catalog',
		)
	})

	test('index pages map to their directory', () => {
		expect(pageUrlPath('docs/intro/index.mdx', latest)).toBe(
			'/consul/docs/intro',
		)
		expect(pageUrlPath('commands/index.mdx', older)).toBe(
			'/consul/commands/v1.22.x',
		)
	})

	test('returns null for files outside the base paths', () => {
		expect(pageUrlPath('partials/text/example.mdx', latest)).toBeNull()
		expect(pageUrlPath('docs/intro/image.png', latest)).toBeNull()
	})
})

describe('parseChangedFiles', () => {
	test('parses the TSV output of the pull request files API', () => {
		expect(
			parseChangedFiles(
				'modified\tcontent/a.mdx\t\nrenamed\tcontent/b.mdx\tcontent/old.mdx\n',
			),
		).toEqual([
			{ status: 'modified', filename: 'content/a.mdx', previousFilename: null },
			{
				status: 'renamed',
				filename: 'content/b.mdx',
				previousFilename: 'content/old.mdx',
			},
		])
	})
})

describe('with a content directory', () => {
	let contentDir

	const write = (relativePath, content = '# Page\n') => {
		const fullPath = path.join(contentDir, relativePath)
		fs.mkdirSync(path.dirname(fullPath), { recursive: true })
		fs.writeFileSync(fullPath, content)
	}

	beforeEach(() => {
		contentDir = fs.mkdtempSync(path.join(os.tmpdir(), 'consul-pages-'))
		write('consul/v2.0.x/content/docs/intro.mdx')
		write('consul/v2.1.x/content/docs/intro.mdx')
		write('consul/v2.2.x (rc)/content/docs/intro.mdx')
		write(
			'consul/v2.1.x/content/docs/uses-partial.mdx',
			"# Page\n\n@include 'text/outer.mdx'\n",
		)
		write(
			'consul/v2.1.x/content/api-docs/uses-inner.mdx',
			"# Page\n\n@include 'text/inner.mdx'\n",
		)
		write(
			'consul/v2.1.x/content/partials/text/outer.mdx',
			"@include 'text/inner.mdx'\n",
		)
		write('consul/v2.1.x/content/partials/text/inner.mdx', 'Inner partial\n')
	})

	afterEach(() => {
		fs.rmSync(contentDir, { recursive: true, force: true })
	})

	test('marks the newest stable version as latest', () => {
		const versions = getConsulVersions(contentDir)
		expect(
			versions.map((v) => {
				return [v.dirName, v.isLatest]
			}),
		).toEqual([
			['v2.2.x (rc)', false],
			['v2.1.x', true],
			['v2.0.x', false],
		])
	})

	test('collects pages, partial-affected pages, and other files', () => {
		const result = collectChangedPages(
			[
				{
					status: 'modified',
					filename: 'content/consul/v2.1.x/content/docs/intro.mdx',
				},
				{
					status: 'removed',
					filename: 'content/consul/v2.0.x/content/docs/intro.mdx',
				},
				{
					status: 'modified',
					filename: 'content/consul/v2.1.x/content/partials/text/inner.mdx',
				},
				{
					status: 'modified',
					filename: 'content/consul/v2.1.x/data/docs-nav-data.json',
				},
				{
					status: 'modified',
					filename: 'content/vault/v1.18.x/content/docs/index.mdx',
				},
			],
			contentDir,
		)

		expect(
			result.pages.map((p) => {
				return [p.urlPath, p.change, p.removed]
			}),
		).toEqual([
			['/consul/docs/intro', 'Modified', false],
			['/consul/docs/v2.0.x/intro', 'Removed', true],
		])
		// inner.mdx is included directly by one page and through outer.mdx by another.
		expect(
			result.partialPages.map((p) => {
				return p.urlPath
			}),
		).toEqual(['/consul/api-docs/uses-inner', '/consul/docs/uses-partial'])
		expect(
			result.otherFiles.map((f) => {
				return f.file
			}),
		).toEqual([
			'content/consul/v2.1.x/content/partials/text/inner.mdx',
			'content/consul/v2.1.x/data/docs-nav-data.json',
		])
	})

	test('does not list a page twice when it and its partial both change', () => {
		const result = collectChangedPages(
			[
				{
					status: 'modified',
					filename: 'content/consul/v2.1.x/content/docs/uses-partial.mdx',
				},
				{
					status: 'modified',
					filename: 'content/consul/v2.1.x/content/partials/text/outer.mdx',
				},
			],
			contentDir,
		)
		expect(result.pages).toHaveLength(1)
		expect(result.partialPages).toHaveLength(0)
	})
})

describe('renderReport', () => {
	const baseUrl = 'https://preview.example/'
	const page = {
		file: 'content/consul/v2.1.x/content/docs/intro.mdx',
		urlPath: '/consul/docs/intro',
		version: { ...latest, releaseStage: 'stable' },
		change: 'Modified',
		removed: false,
	}

	test('links each page to the preview and the source file', () => {
		const report = renderReport(
			{ pages: [page], partialPages: [], otherFiles: [] },
			{ baseUrl, repo: 'hashicorp/web-unified-docs', sha: 'abc123' },
		)
		expect(report).toContain(
			'| [`/consul/docs/intro`](https://github.com/hashicorp/web-unified-docs/blob/abc123/content/consul/v2.1.x/content/docs/intro.mdx) | v2.1.x (latest) | Modified | [Preview](https://preview.example/consul/docs/intro) |',
		)
	})

	test('does not link removed pages', () => {
		const report = renderReport(
			{
				pages: [{ ...page, removed: true, change: 'Removed' }],
				partialPages: [],
				otherFiles: [],
			},
			{ baseUrl },
		)
		expect(report).toContain(
			'| `/consul/docs/intro` | v2.1.x (latest) | Removed | Not available |',
		)
	})

	test('limits the number of rows', () => {
		const report = renderReport(
			{ pages: [page, page, page], partialPages: [], otherFiles: [] },
			{ baseUrl, maxRows: 2 },
		)
		expect(report).toContain('Showing 2 of 3 pages.')
	})

	test('reports when no Consul pages changed', () => {
		const report = renderReport(
			{ pages: [], partialPages: [], otherFiles: [] },
			{ baseUrl },
		)
		expect(report).toContain('This PR does not change any Consul docs pages.')
	})

	test('shrinks the tables to fit a character limit', () => {
		const pages = Array.from({ length: 50 }, () => {
			return page
		})
		const report = renderReportWithinLimit(
			{ pages, partialPages: [], otherFiles: [] },
			{ baseUrl, maxChars: 2000 },
		)
		expect(report.length).toBeLessThanOrEqual(2000)
		expect(report).toMatch(/Showing \d+ of 50 pages\./)
	})
})
