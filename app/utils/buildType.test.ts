/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { afterEach, beforeEach, expect, test, vi } from 'vitest'

beforeEach(() => {
	vi.resetModules()
	vi.stubEnv('NODE_ENV', 'development')
	vi.stubEnv('INCREMENTAL_BUILD', 'true')
	vi.stubEnv('VERCEL_ENV', undefined)
})

afterEach(() => {
	vi.unstubAllEnvs()
})

test('caches the application build type until the module reloads', async () => {
	const { BUILD_TYPE, getBuildType } = await import(
		'#scriptUtils/get-type-of-build.mjs'
	)
	const first = await import('./buildType')
	expect(first.BUILD_TYPE).toBe(BUILD_TYPE)
	expect(first.buildType).toBe(BUILD_TYPE.incBuildLocalDev)

	vi.stubEnv('NODE_ENV', 'production')
	expect(getBuildType()).toBe(BUILD_TYPE.incBuildPRPreview)
	const second = await import('./buildType')
	expect(second.buildType).toBe(first.buildType)

	vi.resetModules()
	const reloaded = await import('./buildType')
	expect(reloaded.buildType).toBe(BUILD_TYPE.incBuildPRPreview)
})
