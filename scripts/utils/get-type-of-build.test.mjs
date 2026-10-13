/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	test,
	vi,
} from 'vitest'
import { BUILD_TYPE, getBuildType } from './get-type-of-build.mjs'

const scenarios = [
	[BUILD_TYPE.prodBuild, 'production', 'true', 'production'],
	[BUILD_TYPE.prodBuild, 'development', 'true', 'production'],
	[BUILD_TYPE.prodBuild, undefined, 'false', 'production'],
	[BUILD_TYPE.incBuildLocalDev, 'development', 'true', undefined],
	[BUILD_TYPE.incBuildPRPreview, 'production', 'true', 'preview'],
	[BUILD_TYPE.fullBuild, 'development', 'false', undefined],
	[BUILD_TYPE.fullBuild, 'production', undefined, 'preview'],
	[BUILD_TYPE.fullBuild, 'test', 'true', undefined],
	[BUILD_TYPE.fullBuild, undefined, 'true', undefined],
]

afterEach(() => {
	vi.unstubAllEnvs()
})

describe('getBuildType', () => {
	test.each(scenarios)(
		'returns %s with NODE_ENV=%s, INCREMENTAL_BUILD=%s, VERCEL_ENV=%s',
		(expected, nodeEnv, incrementalBuild, vercelEnv) => {
			vi.stubEnv('NODE_ENV', nodeEnv)
			vi.stubEnv('INCREMENTAL_BUILD', incrementalBuild)
			vi.stubEnv('VERCEL_ENV', vercelEnv)

			expect(getBuildType()).toBe(expected)
		},
	)

	test('reads the current environment on every call without reloading', () => {
		vi.stubEnv('VERCEL_ENV', undefined)
		vi.stubEnv('INCREMENTAL_BUILD', 'true')
		vi.stubEnv('NODE_ENV', 'development')
		expect(getBuildType()).toBe(BUILD_TYPE.incBuildLocalDev)

		vi.stubEnv('NODE_ENV', 'production')
		expect(getBuildType()).toBe(BUILD_TYPE.incBuildPRPreview)

		vi.stubEnv('INCREMENTAL_BUILD', 'false')
		expect(getBuildType()).toBe(BUILD_TYPE.fullBuild)

		vi.stubEnv('VERCEL_ENV', 'production')
		expect(getBuildType()).toBe(BUILD_TYPE.prodBuild)
	})
})

describe('compiled getBuildType', () => {
	let directory
	let binary

	beforeAll(() => {
		directory = mkdtempSync(path.join(tmpdir(), 'unified-docs-build-type-'))
		binary = path.join(directory, 'build-type')
		const entry = path.join(directory, 'build-type.mjs')
		const modulePath = fileURLToPath(
			new URL('./get-type-of-build.mjs', import.meta.url),
		)
		writeFileSync(
			entry,
			`import { getBuildType } from ${JSON.stringify(modulePath)}\nconsole.log(getBuildType())\n`,
		)
		execFileSync(
			path.join(process.cwd(), 'node_modules/.bin/bun'),
			[
				'build',
				'--compile',
				'--minify',
				'--sourcemap',
				'--bytecode',
				entry,
				'--outfile',
				binary,
			],
			{
				env: { ...process.env, NODE_ENV: 'development' },
				encoding: 'utf8',
			},
		)
	}, 30_000)

	afterAll(() => {
		rmSync(directory, { recursive: true, force: true })
	})

	test.each(scenarios)(
		'returns %s with runtime NODE_ENV=%s, INCREMENTAL_BUILD=%s, VERCEL_ENV=%s',
		(expected, nodeEnv, incrementalBuild, vercelEnv) => {
			const output = execFileSync(binary, [], {
				cwd: directory,
				env: {
					...process.env,
					NODE_ENV: nodeEnv,
					INCREMENTAL_BUILD: incrementalBuild,
					VERCEL_ENV: vercelEnv,
				},
				encoding: 'utf8',
			})

			expect(output.trim()).toBe(expected)
		},
	)
})
