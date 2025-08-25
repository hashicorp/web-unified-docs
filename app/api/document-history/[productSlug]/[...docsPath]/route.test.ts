import { describe, it, vi, expect } from 'vitest'
import { GET } from './route'
import { mockRequest } from '@utils/mockRequest.js'

describe('GET /document-history/[productSlug]', () => {
	it('finds alternate URLs on disk using product redirects', async () => {
		const product = vi.hoisted(() => {
			return 'vault'
		})
		const latestVersion = vi.hoisted(() => {
			return 'v1.20.x'
		})

		// The redirects file is ALWAYS the latest version - older versions are
		// ignored
		vi.mock('@utils/contentVersions', () => {
			return {
				getProductVersionMetadata: () => {
					return { ok: true, value: { product, version: latestVersion } }
				},
			}
		})

		// Mock out the findFileWithMetadata function so that we don't have to
		// go all the way down faking out the filesystem (and redirects.jsonc)
		vi.mock('@utils/file', async (importActual) => {
			const actual: any = await importActual()
			return {
				...actual,
				findFileWithMetadata: async () => {
					return {
						ok: true,
						value: JSON.stringify([
							{
								source: `/${product}/docs/platform/aws/:slug(.*)`,
								destination: `/${product}/docs/deploy/aws/:slug`,
								permanent: true,
							},
						]),
					}
				},
			}
		})

		// Fake the contents of docsPathsAllVersions.json so that we can test with
		// different versions and paths
		vi.mock('@api/docsPathsAllVersions.json', () => {
			return {
				default: {
					[product]: {
						// These two versions represent the content IA reorg that the education team did
						[latestVersion]: [
							{ path: product + '/docs/deploy/aws/run' },
							{ path: product + '/docs/deploy/aws/overview' },
						],
						['v1.19.x']: [
							{ path: product + '/docs/deploy/aws/run' },
							{ path: product + '/docs/deploy/aws/overview' },
						],

						// This version and below have different paths
						['v1.18.x']: [
							{ path: product + '/docs/platform/aws/run' },
							{ path: product + '/docs/platform/aws/overview' },
						],
					},
				},
			}
		})

		const response = await mockRequest(GET, {
			productSlug: product,
			docsPath: ['docs', 'deploy', 'aws', 'run'],
		})

		expect(await response.json()).toEqual([product + '/docs/platform/aws/run'])
	})
})
