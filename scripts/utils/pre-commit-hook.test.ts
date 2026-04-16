/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const HOOK_PATH = path.resolve('.husky/pre-commit')
const TEST_METADATA_MARKER = '# TEST METADATA\n'

describe.sequential('pre-commit hook metadata flow', () => {
	let originalCwd: string
	let repoPath: string
	let binPath: string

	beforeEach(() => {
		originalCwd = process.cwd()
		repoPath = fs.mkdtempSync(path.join(os.tmpdir(), 'pre-commit-hook-'))
		binPath = path.join(repoPath, 'bin')
		fs.mkdirSync(binPath, { recursive: true })
	})

	afterEach(() => {
		process.chdir(originalCwd)
		fs.rmSync(repoPath, { recursive: true, force: true })
	})

	function runCommand(
		command: string,
		{ allowFailure = false }: { allowFailure?: boolean } = {},
	): string {
		try {
			return execSync(command, {
				cwd: repoPath,
				encoding: 'utf-8',
				stdio: 'pipe',
				env: {
					...process.env,
					PATH: `${binPath}:${process.env.PATH}`,
				},
			}).trim()
		} catch (error: any) {
			if (allowFailure) {
				return [error.stdout?.toString(), error.stderr?.toString()]
					.filter(Boolean)
					.join('\n')
					.trim()
			}

			throw error
		}
	}

	function writeRepoFile(relativePath: string, content: string): void {
		const absolutePath = path.join(repoPath, relativePath)
		fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
		fs.writeFileSync(absolutePath, content, 'utf-8')
	}

	function readRepoFile(relativePath: string): string {
		return fs.readFileSync(path.join(repoPath, relativePath), 'utf-8')
	}

	function initializeRepo(): void {
		runCommand('git init -q -b main')
		runCommand('git config user.name test')
		runCommand('git config user.email test@example.com')
	}

	function installHookStubs(): void {
		writeRepoFile(
			'scripts/add-date-metadata.mjs',
			`import fs from 'node:fs'
const filePath = process.argv[2]
fs.appendFileSync('metadata.log', \`${'${filePath}'}\\n\`, 'utf-8')
fs.appendFileSync(filePath, ${JSON.stringify(TEST_METADATA_MARKER)}, 'utf-8')
`,
		)
		writeRepoFile('bin/npx', '#!/bin/sh\nprintf \'%s\\n\' "$*" >> npx.log\n')
		fs.chmodSync(path.join(binPath, 'npx'), 0o755)
	}

	function runHook(): string {
		return runCommand(`sh ${JSON.stringify(HOOK_PATH)}`)
	}

	it('updates metadata for staged MDX files during a normal commit', () => {
		initializeRepo()
		installHookStubs()
		writeRepoFile('content/prod/doc.mdx', '---\ntitle: Doc\n---\nbody\n')
		writeRepoFile('content/prod/notes.txt', 'notes\n')
		runCommand('git add .')
		runCommand('git commit -qm init')

		writeRepoFile(
			'content/prod/doc.mdx',
			'---\ntitle: Updated Doc\n---\nbody\n',
		)
		writeRepoFile('content/prod/notes.txt', 'updated notes\n')
		runCommand('git add content/prod/doc.mdx content/prod/notes.txt')

		const output = runHook()

		expect(output).toContain('Adding date metadata to changed .mdx files...')
		expect(fs.readFileSync(path.join(repoPath, 'metadata.log'), 'utf-8')).toBe(
			'content/prod/doc.mdx\n',
		)
		expect(readRepoFile('content/prod/doc.mdx')).toBe(
			`---\ntitle: Updated Doc\n---\nbody\n${TEST_METADATA_MARKER}`,
		)
		expect(readRepoFile('content/prod/notes.txt')).toBe('updated notes\n')
		expect(fs.readFileSync(path.join(repoPath, 'npx.log'), 'utf-8')).toBe(
			'lint-staged\n',
		)
	})

	it('does not update any staged MDX files while resolving a merge commit', () => {
		initializeRepo()
		installHookStubs()
		writeRepoFile(
			'content/prod/conflicted.mdx',
			'---\ntitle: Original Conflict\n---\nbody\n',
		)
		writeRepoFile(
			'content/prod/main-only-a.mdx',
			'---\ntitle: Original A\n---\nbody\n',
		)
		writeRepoFile(
			'content/prod/main-only-b.mdx',
			'---\ntitle: Original B\n---\nbody\n',
		)
		runCommand('git add .')
		runCommand('git commit -qm init')
		runCommand('git branch side')

		writeRepoFile(
			'content/prod/conflicted.mdx',
			'---\ntitle: Main Conflict\n---\nbody\n',
		)
		writeRepoFile(
			'content/prod/main-only-a.mdx',
			'---\ntitle: Main Only A\n---\nbody\n',
		)
		writeRepoFile(
			'content/prod/main-only-b.mdx',
			'---\ntitle: Main Only B\n---\nbody\n',
		)
		runCommand(
			'git add content/prod/conflicted.mdx content/prod/main-only-a.mdx content/prod/main-only-b.mdx',
		)
		runCommand('git commit -qm "main edits conflict and extra docs"')

		runCommand('git checkout -q side')
		writeRepoFile(
			'content/prod/conflicted.mdx',
			'---\ntitle: Side Conflict\n---\nbody\n',
		)
		runCommand('git add content/prod/conflicted.mdx')
		runCommand('git commit -qm "side edit"')
		runCommand('git merge main', { allowFailure: true })

		writeRepoFile(
			'content/prod/conflicted.mdx',
			'---\ntitle: Resolved Conflict\n---\nbody\n',
		)
		runCommand('git add content/prod/conflicted.mdx')

		expect(
			runCommand('git diff --cached --name-only --diff-filter=d -- content/'),
		).toBe(
			[
				'content/prod/conflicted.mdx',
				'content/prod/main-only-a.mdx',
				'content/prod/main-only-b.mdx',
			].join('\n'),
		)

		const output = runHook()

		expect(output).toContain(
			'Skipping date metadata outside normal commit flow',
		)
		expect(readRepoFile('content/prod/conflicted.mdx')).toBe(
			'---\ntitle: Resolved Conflict\n---\nbody\n',
		)
		expect(readRepoFile('content/prod/main-only-a.mdx')).toBe(
			'---\ntitle: Main Only A\n---\nbody\n',
		)
		expect(readRepoFile('content/prod/main-only-b.mdx')).toBe(
			'---\ntitle: Main Only B\n---\nbody\n',
		)
		expect(fs.existsSync(path.join(repoPath, 'metadata.log'))).toBe(false)
		expect(fs.readFileSync(path.join(repoPath, 'npx.log'), 'utf-8')).toBe(
			'lint-staged\n',
		)
	})

	it('does not update metadata while resolving a rebase', () => {
		initializeRepo()
		installHookStubs()
		writeRepoFile('content/prod/doc.mdx', '---\ntitle: Doc\n---\nbody\n')
		runCommand('git add .')
		runCommand('git commit -qm init')
		runCommand('git checkout -q -b topic')

		writeRepoFile('content/prod/doc.mdx', '---\ntitle: Topic Doc\n---\nbody\n')
		runCommand('git add content/prod/doc.mdx')
		runCommand('git commit -qm "topic edit"')

		runCommand('git checkout -q main')
		writeRepoFile('content/prod/doc.mdx', '---\ntitle: Main Doc\n---\nbody\n')
		runCommand('git add content/prod/doc.mdx')
		runCommand('git commit -qm "main edit"')

		runCommand('git checkout -q topic')
		runCommand('git rebase main', { allowFailure: true })

		writeRepoFile(
			'content/prod/doc.mdx',
			'---\ntitle: Resolved Doc\n---\nbody\n',
		)
		runCommand('git add content/prod/doc.mdx')

		const output = runHook()

		expect(output).toContain(
			'Skipping date metadata outside normal commit flow',
		)
		expect(readRepoFile('content/prod/doc.mdx')).toBe(
			'---\ntitle: Resolved Doc\n---\nbody\n',
		)
		expect(fs.existsSync(path.join(repoPath, 'metadata.log'))).toBe(false)
		expect(fs.readFileSync(path.join(repoPath, 'npx.log'), 'utf-8')).toBe(
			'lint-staged\n',
		)
	})

	it('does not update metadata while resolving a cherry-pick', () => {
		initializeRepo()
		installHookStubs()
		writeRepoFile('content/prod/doc.mdx', '---\ntitle: Doc\n---\nbody\n')
		runCommand('git add .')
		runCommand('git commit -qm init')
		runCommand('git checkout -q -b source')

		writeRepoFile('content/prod/doc.mdx', '---\ntitle: Source Doc\n---\nbody\n')
		runCommand('git add content/prod/doc.mdx')
		runCommand('git commit -qm "source edit"')
		const commitId = runCommand('git rev-parse HEAD')

		runCommand('git checkout -q main')
		writeRepoFile('content/prod/doc.mdx', '---\ntitle: Main Doc\n---\nbody\n')
		runCommand('git add content/prod/doc.mdx')
		runCommand('git commit -qm "main edit"')
		runCommand(`git cherry-pick ${commitId}`, { allowFailure: true })

		writeRepoFile(
			'content/prod/doc.mdx',
			'---\ntitle: Resolved Doc\n---\nbody\n',
		)
		runCommand('git add content/prod/doc.mdx')

		const output = runHook()

		expect(output).toContain(
			'Skipping date metadata outside normal commit flow',
		)
		expect(readRepoFile('content/prod/doc.mdx')).toBe(
			'---\ntitle: Resolved Doc\n---\nbody\n',
		)
		expect(fs.existsSync(path.join(repoPath, 'metadata.log'))).toBe(false)
		expect(fs.readFileSync(path.join(repoPath, 'npx.log'), 'utf-8')).toBe(
			'lint-staged\n',
		)
	})

	it('does not update metadata while resolving a revert', () => {
		initializeRepo()
		installHookStubs()
		writeRepoFile('content/prod/doc.mdx', '---\ntitle: Doc\n---\nbody\n')
		runCommand('git add .')
		runCommand('git commit -qm init')

		writeRepoFile('content/prod/doc.mdx', '---\ntitle: Change One\n---\nbody\n')
		runCommand('git add content/prod/doc.mdx')
		runCommand('git commit -qm "change one"')
		const revertTarget = runCommand('git rev-parse HEAD')

		writeRepoFile('content/prod/doc.mdx', '---\ntitle: Change Two\n---\nbody\n')
		runCommand('git add content/prod/doc.mdx')
		runCommand('git commit -qm "change two"')
		runCommand(`git revert ${revertTarget}`, { allowFailure: true })

		writeRepoFile(
			'content/prod/doc.mdx',
			'---\ntitle: Resolved Revert\n---\nbody\n',
		)
		runCommand('git add content/prod/doc.mdx')

		const output = runHook()

		expect(output).toContain(
			'Skipping date metadata outside normal commit flow',
		)
		expect(readRepoFile('content/prod/doc.mdx')).toBe(
			'---\ntitle: Resolved Revert\n---\nbody\n',
		)
		expect(fs.existsSync(path.join(repoPath, 'metadata.log'))).toBe(false)
		expect(fs.readFileSync(path.join(repoPath, 'npx.log'), 'utf-8')).toBe(
			'lint-staged\n',
		)
	})
})
