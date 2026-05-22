/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const GET_CHANGED_CONTENT_FILES_SCRIPT = path.resolve(
	'scripts/utils/get-changed-content-files.mjs',
)

describe.sequential('get-changed-content-files CLI integration', () => {
	let originalCwd: string
	let repoPath: string
	let outputPath: string

	beforeEach(() => {
		originalCwd = process.cwd()
		repoPath = fs.mkdtempSync(path.join(os.tmpdir(), 'changed-content-files-'))
		outputPath = path.join(repoPath, 'changedContentFiles.json')
	})

	afterEach(() => {
		process.chdir(originalCwd)
		fs.rmSync(repoPath, { recursive: true, force: true })
	})

	function runCommand(command: string): string {
		return execSync(command, {
			cwd: repoPath,
			encoding: 'utf-8',
			stdio: 'pipe',
		}).trim()
	}

	function writeRepoFile(relativePath: string, content: string): void {
		const absolutePath = path.join(repoPath, relativePath)
		fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
		fs.writeFileSync(absolutePath, content, 'utf-8')
	}

	function initializeRepo(): void {
		runCommand('git init -q -b main')
		runCommand('git config user.name test')
		runCommand('git config user.email test@example.com')
	}

	it('supports CLI flags and BASE_SHA-driven diffs for forward-port workflows', () => {
		initializeRepo()

		writeRepoFile('content/terraform/v1.14.x/docs/partials/alpha.mdx', 'alpha\n')
		writeRepoFile('content/terraform/v1.14.x/docs/consumer.mdx', '{{ partial "alpha" }}\n')
		runCommand('git add .')
		runCommand('git commit -qm init')

		const baseSha = runCommand('git rev-parse HEAD')

		writeRepoFile('content/terraform/v1.14.x/docs/new.mdx', 'new\n')
		writeRepoFile('content/terraform/v1.14.x/docs/partials/alpha.mdx', 'alpha changed\n')
		runCommand('git add content/terraform/v1.14.x/docs/new.mdx content/terraform/v1.14.x/docs/partials/alpha.mdx')

		runCommand(
			[
				`BASE_SHA=${baseSha}`,
				'node',
				JSON.stringify(GET_CHANGED_CONTENT_FILES_SCRIPT),
				'--merge-base',
				baseSha,
				'--include-partials=false',
				'--output',
				JSON.stringify(outputPath),
			].join(' '),
		)

		expect(fs.existsSync(outputPath)).toBe(true)

		const changedFiles = JSON.parse(fs.readFileSync(outputPath, 'utf-8'))
		expect(changedFiles.added).toContain('content/terraform/v1.14.x/docs/new.mdx')
		expect(changedFiles.modified).toContain(
			'content/terraform/v1.14.x/docs/partials/alpha.mdx',
		)

		// Partial fan-out should be disabled for forward-porting mode.
		expect(changedFiles.modified).not.toContain(
			'content/terraform/v1.14.x/docs/consumer.mdx',
		)
	})
})
