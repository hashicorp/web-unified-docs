/**
 * Copyright IBM Corp. 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// We need to mock PRODUCT_CONFIG before importing the module under test
vi.mock('#productConfig.mjs', () => ({
	PRODUCT_CONFIG: {
		// Versioned product with explicit basePaths
		boundary: {
			productSlug: 'boundary',
			contentDir: 'content',
			basePaths: ['api-docs', 'docs'],
			versionedDocs: true,
		},
		// Unversioned product without explicit basePaths (uses nav-data)
		'hcp-docs': {
			productSlug: 'hcp',
			contentDir: 'content',
			versionedDocs: false,
		},
		// Product with nested basePath
		'terraform-plugin-framework': {
			productSlug: 'terraform',
			contentDir: 'docs',
			basePaths: ['plugin/framework'],
			navDataPath: 'plugin-framework',
			versionedDocs: true,
		},
	},
}))

const { buildMdRoutes } = await import('./generate-md-routes.mjs')

describe('buildMdRoutes', () => {
	let tmpDir
	let contentDir
	let outputDir

	beforeEach(() => {
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'md-routes-test-'))
		contentDir = path.join(tmpDir, 'content')
		outputDir = path.join(tmpDir, 'output')
		fs.mkdirSync(contentDir, { recursive: true })
		fs.mkdirSync(outputDir, { recursive: true })
	})

	afterEach(() => {
		fs.rmSync(tmpDir, { recursive: true, force: true })
	})

	/**
	 * Helper to create a file with directory creation.
	 */
	function writeFixture(relativePath, content) {
		const fullPath = path.join(contentDir, relativePath)
		fs.mkdirSync(path.dirname(fullPath), { recursive: true })
		fs.writeFileSync(fullPath, content, 'utf-8')
	}

	describe('versioned product with explicit basePaths', () => {
		beforeEach(() => {
			// boundary/v0.13.x/content/docs/overview.mdx
			writeFixture(
				'boundary/v0.13.x/content/docs/overview.mdx',
				`---
page_title: Overview
description: Overview of Boundary
---

# What is Boundary?

Boundary is a tool for managing access.
`,
			)

			// boundary/v0.13.x/content/docs/install/index.mdx
			writeFixture(
				'boundary/v0.13.x/content/docs/install/index.mdx',
				`---
page_title: Install
---

# Install Boundary

Follow these steps to install.
`,
			)

			// boundary/v0.13.x/content/api-docs/sessions.mdx
			writeFixture(
				'boundary/v0.13.x/content/api-docs/sessions.mdx',
				`---
page_title: Sessions API
---

# Sessions

The sessions API manages sessions.
`,
			)

			// Should be skipped: partials directory
			writeFixture(
				'boundary/v0.13.x/content/docs/partials/shared-note.mdx',
				'This is a partial and should not appear in output.',
			)

			// Should be skipped: _prefixed directory
			writeFixture(
				'boundary/v0.13.x/content/docs/_internal/debug.mdx',
				'Internal debug doc.',
			)
		})

		it('generates .md files at correct paths', async () => {
			const versionMetadata = {
				boundary: [{ version: 'v0.13.x', isLatest: true }],
			}

			await buildMdRoutes(contentDir, outputDir, versionMetadata)

			// Check expected files exist
			expect(
				fs.existsSync(path.join(outputDir, 'boundary/docs/overview.md')),
			).toBe(true)
			expect(
				fs.existsSync(path.join(outputDir, 'boundary/docs/install.md')),
			).toBe(true)
			expect(
				fs.existsSync(path.join(outputDir, 'boundary/api-docs/sessions.md')),
			).toBe(true)
		})

		it('strips frontmatter from output', async () => {
			const versionMetadata = {
				boundary: [{ version: 'v0.13.x', isLatest: true }],
			}

			await buildMdRoutes(contentDir, outputDir, versionMetadata)

			const content = fs.readFileSync(
				path.join(outputDir, 'boundary/docs/overview.md'),
				'utf-8',
			)
			expect(content).not.toContain('---')
			expect(content).not.toContain('page_title')
			expect(content).toContain('# What is Boundary?')
			expect(content).toContain('Boundary is a tool for managing access.')
		})

		it('converts index.mdx to directory-level .md file', async () => {
			const versionMetadata = {
				boundary: [{ version: 'v0.13.x', isLatest: true }],
			}

			await buildMdRoutes(contentDir, outputDir, versionMetadata)

			// install/index.mdx -> install.md (not install/index.md)
			expect(
				fs.existsSync(path.join(outputDir, 'boundary/docs/install.md')),
			).toBe(true)
			expect(
				fs.existsSync(path.join(outputDir, 'boundary/docs/install/index.md')),
			).toBe(false)
		})

		it('excludes partials and _-prefixed directories', async () => {
			const versionMetadata = {
				boundary: [{ version: 'v0.13.x', isLatest: true }],
			}

			await buildMdRoutes(contentDir, outputDir, versionMetadata)

			expect(
				fs.existsSync(
					path.join(outputDir, 'boundary/docs/partials/shared-note.md'),
				),
			).toBe(false)
			expect(
				fs.existsSync(
					path.join(outputDir, 'boundary/docs/_internal/debug.md'),
				),
			).toBe(false)
		})

		it('uses latest version from versionMetadata', async () => {
			// Add an older version
			writeFixture(
				'boundary/v0.12.x/content/docs/old-page.mdx',
				`---
page_title: Old
---

# Old page
`,
			)

			const versionMetadata = {
				boundary: [
					{ version: 'v0.12.x', isLatest: false },
					{ version: 'v0.13.x', isLatest: true },
				],
			}

			await buildMdRoutes(contentDir, outputDir, versionMetadata)

			// Old version content should not appear
			expect(
				fs.existsSync(path.join(outputDir, 'boundary/docs/old-page.md')),
			).toBe(false)
			// Latest version content should appear
			expect(
				fs.existsSync(path.join(outputDir, 'boundary/docs/overview.md')),
			).toBe(true)
		})
	})

	describe('unversioned product with nav-data-derived basePaths', () => {
		beforeEach(() => {
			// hcp-docs/content/docs/getting-started.mdx
			writeFixture(
				'hcp-docs/content/docs/getting-started.mdx',
				`---
page_title: Getting Started
---

# Getting Started with HCP
`,
			)

			// hcp-docs/data/docs-nav-data.json (needed to derive basePath)
			writeFixture(
				'hcp-docs/data/docs-nav-data.json',
				JSON.stringify([{ title: 'Getting Started', path: 'getting-started' }]),
			)
		})

		it('derives basePath from nav-data and generates correct output path', async () => {
			await buildMdRoutes(contentDir, outputDir, null)

			expect(
				fs.existsSync(path.join(outputDir, 'hcp/docs/getting-started.md')),
			).toBe(true)

			const content = fs.readFileSync(
				path.join(outputDir, 'hcp/docs/getting-started.md'),
				'utf-8',
			)
			expect(content).toContain('# Getting Started with HCP')
			expect(content).not.toContain('page_title')
		})
	})

	describe('nested basePath (plugin/framework)', () => {
		beforeEach(() => {
			writeFixture(
				'terraform-plugin-framework/v1.0.x/docs/plugin/framework/acctests.mdx',
				`---
page_title: Acceptance Tests
---

# Acceptance Tests

Run acceptance tests with \`TF_ACC=1\`.
`,
			)
		})

		it('generates files under nested basePath', async () => {
			const versionMetadata = {
				'terraform-plugin-framework': [
					{ version: 'v1.0.x', isLatest: true },
				],
			}

			await buildMdRoutes(contentDir, outputDir, versionMetadata)

			expect(
				fs.existsSync(
					path.join(outputDir, 'terraform/plugin/framework/acctests.md'),
				),
			).toBe(true)

			const content = fs.readFileSync(
				path.join(outputDir, 'terraform/plugin/framework/acctests.md'),
				'utf-8',
			)
			expect(content).toContain('# Acceptance Tests')
		})
	})

	describe('content with JSX components', () => {
		beforeEach(() => {
			writeFixture(
				'boundary/v0.13.x/content/docs/with-jsx.mdx',
				`---
page_title: JSX Example
---

# Config Example

<CodeBlockConfig highlight="1,3">

\`\`\`hcl
resource "aws_instance" "example" {
  ami = "abc-123"
}
\`\`\`

</CodeBlockConfig>

<Note>

This is important.

</Note>

<Tabs>
<Tab heading="Linux">

Use \`apt-get\`.

</Tab>
<Tab heading="macOS">

Use \`brew\`.

</Tab>
</Tabs>
`,
			)
		})

		it('preserves JSX components in output', async () => {
			const versionMetadata = {
				boundary: [{ version: 'v0.13.x', isLatest: true }],
			}

			await buildMdRoutes(contentDir, outputDir, versionMetadata)

			const content = fs.readFileSync(
				path.join(outputDir, 'boundary/docs/with-jsx.md'),
				'utf-8',
			)

			expect(content).toContain('<CodeBlockConfig highlight="1,3">')
			expect(content).toContain('</CodeBlockConfig>')
			expect(content).toContain('<Note>')
			expect(content).toContain('<Tabs>')
			expect(content).toContain('<Tab heading="Linux">')
			expect(content).toContain('Use `apt-get`.')
		})
	})

	describe('root index file', () => {
		beforeEach(() => {
			writeFixture(
				'boundary/v0.13.x/content/docs/index.mdx',
				`---
page_title: Boundary Docs
---

# Boundary Documentation

Welcome to Boundary docs.
`,
			)
		})

		it('generates index.md for root index files', async () => {
			const versionMetadata = {
				boundary: [{ version: 'v0.13.x', isLatest: true }],
			}

			await buildMdRoutes(contentDir, outputDir, versionMetadata)

			expect(
				fs.existsSync(path.join(outputDir, 'boundary/docs/index.md')),
			).toBe(true)
		})
	})

	describe('fallback version resolution', () => {
		it('falls back to sorting version dirs when no versionMetadata', async () => {
			writeFixture(
				'boundary/v0.12.x/content/docs/old.mdx',
				'---\npage_title: Old\n---\n\n# Old\n',
			)
			writeFixture(
				'boundary/v0.13.x/content/docs/new.mdx',
				'---\npage_title: New\n---\n\n# New\n',
			)

			// Pass null versionMetadata — should pick last sorted dir (v0.13.x)
			await buildMdRoutes(contentDir, outputDir, null)

			expect(
				fs.existsSync(path.join(outputDir, 'boundary/docs/new.md')),
			).toBe(true)
			expect(
				fs.existsSync(path.join(outputDir, 'boundary/docs/old.md')),
			).toBe(false)
		})
	})
})
