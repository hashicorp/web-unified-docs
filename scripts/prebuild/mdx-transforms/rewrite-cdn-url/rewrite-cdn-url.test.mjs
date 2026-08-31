/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, it, expect, afterEach, vi } from 'vitest'
import { transformRewriteCdnUrl } from './rewrite-cdn-url.mjs'

vi.mock('#productConfig.mjs', () => {
	return {
		PRODUCT_CONFIG: {
			'validated-designs': { versionedDocs: false },
			'terraform-plugin-log': { versionedDocs: true },
		},
	}
})

describe('transformRewriteCdnUrl', () => {
	afterEach(() => {
		vi.unstubAllEnvs()
	})

	it('replaces {{CDN_URL}} with selfUrl/assets/<product> for an unversioned product', async () => {
		vi.stubEnv('VERCEL_URL', '')
		vi.stubEnv('UNIFIED_DOCS_PORT', '3000')

		const entry = { repoSlug: 'validated-designs', version: '' }
		const content = `[Guide]({{CDN_URL}}/pdf/Boundary-Administration-Guide.pdf)`
		const result = await transformRewriteCdnUrl(content, entry)
		expect(result).toBe(
			'[Guide](http://localhost:3000/assets/validated-designs/pdf/Boundary-Administration-Guide.pdf)\n',
		)
	})

	it('replaces {{CDN_URL}} with selfUrl/assets/<product>/<version> for a versioned product', async () => {
		vi.stubEnv('VERCEL_URL', '')
		vi.stubEnv('UNIFIED_DOCS_PORT', '3000')

		const entry = { repoSlug: 'terraform-plugin-log', version: 'v0.4.x' }
		const content = `[Docs]({{CDN_URL}}/img/diagram.png)`
		const result = await transformRewriteCdnUrl(content, entry)
		expect(result).toBe(
			'[Docs](http://localhost:3000/assets/terraform-plugin-log/v0.4.x/img/diagram.png)\n',
		)
	})

	it('uses VERCEL_URL when set', async () => {
		vi.stubEnv('VERCEL_URL', 'my-deployment.vercel.app')
		vi.stubEnv('UNIFIED_DOCS_PORT', '3000')

		const entry = { repoSlug: 'validated-designs', version: '' }
		const content = `[Download]({{CDN_URL}}/file.zip)`
		const result = await transformRewriteCdnUrl(content, entry)
		expect(result).toBe(
			'[Download](https://my-deployment.vercel.app/assets/validated-designs/file.zip)\n',
		)
	})

	it('replaces {{CDN_URL}} in a definition url', async () => {
		vi.stubEnv('VERCEL_URL', '')
		vi.stubEnv('UNIFIED_DOCS_PORT', '4000')

		const entry = { repoSlug: 'validated-designs', version: '' }
		const content = `[asset]: {{CDN_URL}}/file.zip`
		const result = await transformRewriteCdnUrl(content, entry)
		expect(result).toBe(
			'[asset]: http://localhost:4000/assets/validated-designs/file.zip\n',
		)
	})

	it('does not modify links without {{CDN_URL}}', async () => {
		vi.stubEnv('VERCEL_URL', '')
		vi.stubEnv('UNIFIED_DOCS_PORT', '3000')

		const entry = { repoSlug: 'validated-designs', version: '' }
		const content = `[External](https://example.com/file.zip)`
		const result = await transformRewriteCdnUrl(content, entry)
		expect(result).toBe('[External](https://example.com/file.zip)\n')
	})
})
