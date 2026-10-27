/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { spawnSync } from 'node:child_process'
import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	realpathSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, beforeEach, expect, test } from 'vitest'
import { PRODUCT_CONFIG } from '#productConfig.mjs'

const prebuildScript = fileURLToPath(new URL('./prebuild.mjs', import.meta.url))
let directory
let sourceFile
let outputFile

beforeEach(() => {
	directory = realpathSync(
		mkdtempSync(path.join(tmpdir(), 'unified-docs-prebuild-')),
	)
	mkdirSync(path.join(directory, 'app/api'), { recursive: true })
	mkdirSync(path.join(directory, 'scripts/prebuild'), { recursive: true })

	for (const [product, config] of Object.entries(PRODUCT_CONFIG)) {
		const relativePath = path.join(
			product,
			config.versionedDocs ? 'v1.0.x' : '',
			config.contentDir,
			'index.mdx',
		)
		const sourcePath = path.join(directory, 'content', relativePath)
		mkdirSync(path.dirname(sourcePath), { recursive: true })
		writeFileSync(sourcePath, '---\npage_title: Test\n---\n\n# Test\n')
		if (product === 'vault') {
			sourceFile = sourcePath
			outputFile = path.join(directory, 'public/content', relativePath)
		}
	}
})

afterEach(() => {
	rmSync(directory, { recursive: true, force: true })
})

function runPrebuild(env = {}, args = []) {
	return spawnSync(process.execPath, [prebuildScript, ...args], {
		cwd: directory,
		env: {
			...process.env,
			NODE_ENV: 'production',
			INCREMENTAL_BUILD: 'false',
			VERCEL_ENV: 'preview',
			...env,
		},
		encoding: 'utf8',
		timeout: 10_000,
	})
}

test('exits successfully after transforming content', () => {
	const result = runPrebuild()

	expect(result.error).toBeUndefined()
	expect(result.status, result.stderr).toBe(0)
	expect(result.stdout).toContain('Build type: fullBuild')
	expect(existsSync(outputFile)).toBe(true)
	expect(existsSync(path.join(directory, 'scripts/prebuild/trace'))).toBe(true)
})

test('skips prebuild work for local incremental builds', () => {
	writeFileSync(
		path.join(directory, 'content/vault/v1.0.x/version-config.json'),
		'invalid JSON that must not be read by the internal-docs copy step',
	)

	const result = runPrebuild({
		NODE_ENV: 'development',
		INCREMENTAL_BUILD: 'true',
		VERCEL_ENV: '',
	})

	expect(result.error).toBeUndefined()
	expect(result.status, result.stderr).toBe(0)
	expect(result.stdout).toContain('Build type: incBuildLocalDev')
	expect(result.stdout).toContain(
		'all content data is dynamically loaded as needed',
	)
	expect(result.stdout).not.toContain('Running MDX transforms')
	expect(result.stdout).not.toContain('Copying')
	expect(existsSync(path.join(directory, 'public'))).toBe(false)
	expect(existsSync(path.join(directory, 'scripts/prebuild/trace'))).toBe(false)
	expect(existsSync(path.join(directory, 'app/api/versionMetadata.json'))).toBe(
		false,
	)
	expect(
		existsSync(path.join(directory, 'app/api/docsPathsAllVersions.json')),
	).toBe(false)
})

test('forces a full rebuild during local incremental builds', () => {
	const result = runPrebuild(
		{
			NODE_ENV: 'development',
			INCREMENTAL_BUILD: 'true',
			VERCEL_ENV: '',
		},
		['--force-full-rebuild'],
	)

	expect(result.error).toBeUndefined()
	expect(result.status, result.stderr).toBe(0)
	expect(result.stdout).toContain('Build type: fullBuild')
	expect(existsSync(outputFile)).toBe(true)
})

test('skips a local incremental build when only the Algolia index is requested', () => {
	const result = runPrebuild(
		{
			NODE_ENV: 'development',
			INCREMENTAL_BUILD: 'true',
			VERCEL_ENV: '',
		},
		['--build-algolia-index'],
	)

	expect(result.error).toBeUndefined()
	expect(result.status, result.stderr).toBe(0)
	expect(result.stdout).toContain('"buildAlgoliaIndex": true')
	expect(result.stdout).toContain('Build type: incBuildLocalDev')
	expect(result.stdout).toContain(
		'all content data is dynamically loaded as needed',
	)
	expect(result.stdout).not.toContain('Running MDX transforms')
	expect(existsSync(outputFile)).toBe(false)
	expect(
		existsSync(
			path.join(
				directory,
				'scripts/algolia/batch-post-records/algoliaRecords.json',
			),
		),
	).toBe(false)
})

test('logs rejected transform errors and exits unsuccessfully at the CLI boundary', () => {
	writeFileSync(sourceFile, "@include 'missing.mdx'\n")

	const result = runPrebuild()

	expect(result.error).toBeUndefined()
	expect(result.status).toBe(1)
	expect(result.stderr).toContain('Prebuild failed:')
	expect(result.stderr).toContain(`In File: ${sourceFile}`)
	expect(result.stdout).not.toContain('Applied MDX transforms')
	expect(existsSync(outputFile)).toBe(false)
	expect(existsSync(path.join(directory, 'scripts/prebuild/trace'))).toBe(false)
})
