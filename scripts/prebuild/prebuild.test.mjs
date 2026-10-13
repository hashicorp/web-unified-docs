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

function runPrebuild() {
	return spawnSync(process.execPath, [prebuildScript], {
		cwd: directory,
		env: {
			...process.env,
			NODE_ENV: 'production',
			INCREMENTAL_BUILD: 'false',
			VERCEL_ENV: 'preview',
		},
		encoding: 'utf8',
		timeout: 10_000,
	})
}

test('exits successfully after transforming content', () => {
	const result = runPrebuild()

	expect(result.error).toBeUndefined()
	expect(result.status, result.stderr).toBe(0)
	expect(existsSync(outputFile)).toBe(true)
	expect(existsSync(path.join(directory, 'scripts/prebuild/trace'))).toBe(true)
})

test('logs rejected transform errors and exits unsuccessfully at the CLI boundary', () => {
	writeFileSync(sourceFile, "@include 'missing.mdx'\n")

	const result = runPrebuild()

	expect(result.error).toBeUndefined()
	expect(result.status).toBe(1)
	expect(result.stderr).toContain('Prebuild failed:')
	expect(result.stderr).toContain(`in file: ${sourceFile}`)
	expect(result.stdout).not.toContain('Applied MDX transforms')
	expect(existsSync(outputFile)).toBe(false)
	expect(existsSync(path.join(directory, 'scripts/prebuild/trace'))).toBe(false)
})
