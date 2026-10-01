/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * End-to-end tests for the forward-port pipeline.
 *
 * These tests simulate what the forward-port-pr.yml GitHub Actions workflow
 * does when a PR with a product label is merged:
 *
 *   1. resolve-target.mjs   — reads the config and PR labels, prints the routing
 *                              (TARGET_BRANCH, TARGET_VERSION, etc.) as JSON to stdout
 *                              for the workflow to write into GITHUB_ENV
 *   2. get-changed-content-files.mjs
 *                           — diffs against github.event.pull_request.base.sha
 *                              (the pre-merge base), writes changedContentFiles.json
 *   3. apply-forward-port-changes.mjs
 *                           — copies added/modified files and deletes removed files
 *                              from the source version directory into the target
 *
 * Each "happy path" test is one step in the pipeline and builds on the state
 * left by the previous step (shared tmpDir, githubOutputPath, changesFilePath).
 */

import { execSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const RESOLVE_TARGET = path.resolve('scripts/forward-port/resolve-target.mjs')
const GET_CHANGED = path.resolve('scripts/utils/get-changed-content-files.mjs')
const APPLY_CHANGES = path.resolve(
	'scripts/forward-port/apply-forward-port-changes.mjs',
)

const FORWARD_PORT_CONFIG = `
tf-forward-porting-testing:
  sourceVersionFolder: v1.14.x
  targetProduct: terraform
  targetBranch: rn-forward-porting-test-rc
  targetVersionFolder: v1.15.x

vault-test:
  sourceVersionFolder: v1.19.x
  targetProduct: vault
  targetBranch: rn-test-vault
  targetVersionFolder: v1.20.x
`

function initRepo(dir: string): void {
	execSync('git init', { cwd: dir })
	execSync('git config user.email "test@example.com"', { cwd: dir })
	execSync('git config user.name "Test User"', { cwd: dir })
}

function commitAll(dir: string, message: string): string {
	execSync('git add -A', { cwd: dir })
	execSync(`git commit -m "${message}"`, { cwd: dir })
	return execSync('git rev-parse HEAD', { cwd: dir, encoding: 'utf-8' }).trim()
}

// ---------------------------------------------------------------------------
// Happy path — three sequential steps that chain state from step to step
// ---------------------------------------------------------------------------

describe.sequential(
	'Forward-port pipeline — happy path (add + modify + remove)',
	() => {
		let tmpDir: string
		let configPath: string
		let githubEnvPath: string
		let changesFilePath: string

		// baseSha is set in beforeAll. This is the SHA that
		// github.event.pull_request.base.sha provides — the state of the repo
		// BEFORE the PR's commits landed.
		let baseSha: string

		beforeAll(() => {
			tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fp-e2e-happy-'))
			configPath = path.join(tmpDir, 'forward-port-config.yml')
			githubEnvPath = path.join(tmpDir, 'github_env')
			changesFilePath = path.join(tmpDir, 'changedContentFiles.json')

			fs.writeFileSync(configPath, FORWARD_PORT_CONFIG)
			fs.writeFileSync(githubEnvPath, '')

			initRepo(tmpDir)

			// ------------------------------------------------------------------
			// Base state — what existed before the PR
			// source: content/terraform/v1.14.x   target: content/terraform/v1.15.x
			// ------------------------------------------------------------------
			const src = path.join(tmpDir, 'content/terraform/v1.14.x/docs')
			const tgt = path.join(tmpDir, 'content/terraform/v1.15.x/docs')
			fs.mkdirSync(src, { recursive: true })
			fs.mkdirSync(tgt, { recursive: true })

			// A file that the PR will modify
			fs.writeFileSync(path.join(src, 'existing.mdx'), '# Existing (original)')
			fs.writeFileSync(path.join(tgt, 'existing.mdx'), '# Existing (original)')

			// A file that the PR will delete
			fs.writeFileSync(path.join(src, 'to-be-removed.mdx'), '# Will be deleted')
			fs.writeFileSync(path.join(tgt, 'to-be-removed.mdx'), '# Will be deleted')

			// Commit — this SHA is what github.event.pull_request.base.sha provides
			baseSha = commitAll(tmpDir, 'Base state before PR changes')

			// ------------------------------------------------------------------
			// PR changes land (simulating the merge commit arriving on origin/main)
			// ------------------------------------------------------------------
			// 1. New file added
			fs.writeFileSync(path.join(src, 'new-feature.mdx'), '# New Feature')
			// 2. Existing file modified
			fs.writeFileSync(
				path.join(src, 'existing.mdx'),
				'# Existing (updated by PR)',
			)
			// 3. File removed
			fs.rmSync(path.join(src, 'to-be-removed.mdx'))

			commitAll(
				tmpDir,
				'PR: add new-feature, update existing, remove to-be-removed',
			)
		})

		afterAll(() => {
			fs.rmSync(tmpDir, { recursive: true, force: true })
		})

		it('Step 1 — resolve-target: resolves TARGET_BRANCH, TARGET_VERSION_FOLDER, SOURCE_VERSION_FOLDER, and TARGET_PRODUCT from PR labels', () => {
			const labels = JSON.stringify(['forward-port:tf-forward-porting-testing'])

			const result = spawnSync(
				'node',
				[RESOLVE_TARGET, '--config', configPath, '--labels', labels],
				{ encoding: 'utf-8' },
			)

			expect(result.status, result.stderr).toBe(0)

			// Script now outputs JSON to stdout
			const routing = JSON.parse(result.stdout.trim()) as Record<string, string>
			expect(routing.TARGET_BRANCH).toBe('rn-forward-porting-test-rc')
			expect(routing.TARGET_VERSION_FOLDER).toBe('v1.15.x')
			expect(routing.SOURCE_VERSION_FOLDER).toBe('v1.14.x')
			expect(routing.TARGET_PRODUCT).toBe('terraform')

			// Simulate what the workflow shell does: write KEY=VALUE lines to
			// githubEnvPath so Step 3 can read them (mirrors jq parsing in the workflow).
			fs.writeFileSync(
				githubEnvPath,
				Object.entries(routing)
					.map(([k, v]: [string, string]): string => {
						return `${k}=${v}`
					})
					.join('\n') + '\n',
				'utf-8',
			)
		})

		it('Step 2 — get-changed-content-files: diffs against pre-merge base SHA, excludes partial fan-out', () => {
			const result = spawnSync(
				'node',
				[
					GET_CHANGED,
					'--merge-base',
					baseSha,
					'--include-partials',
					'false',
					'--output',
					changesFilePath,
				],
				{ cwd: tmpDir, encoding: 'utf-8' },
			)

			expect(result.status, result.stderr).toBe(0)

			const changes = JSON.parse(fs.readFileSync(changesFilePath, 'utf-8'))

			expect(changes.added).toContain(
				'content/terraform/v1.14.x/docs/new-feature.mdx',
			)
			expect(changes.modified).toContain(
				'content/terraform/v1.14.x/docs/existing.mdx',
			)
			expect(changes.removed).toContain(
				'content/terraform/v1.14.x/docs/to-be-removed.mdx',
			)

			// Partial fan-out is disabled — only the 3 directly changed files
			expect(
				changes.added.length + changes.modified.length + changes.removed.length,
			).toBe(3)
		})

		it('Step 3 — apply-forward-port-changes: ports files into target version using --source-dir (simulating post-checkout state)', () => {
			// Read TARGET_VERSION and SOURCE_VERSION from the GITHUB_ENV file step 1 wrote
			// after parsing resolve-target's JSON output.
			// In the real workflow these become shell env vars for subsequent steps.
			const envContent = fs.readFileSync(githubEnvPath, 'utf-8')
			const targetVersion = envContent
				.match(/TARGET_VERSION_FOLDER=(.+)/)?.[1]
				.trim()
			const sourceVersion = envContent
				.match(/SOURCE_VERSION_FOLDER=(.+)/)?.[1]
				.trim()
			const targetProduct = envContent.match(/TARGET_PRODUCT=(.+)/)?.[1].trim()
			expect(targetVersion).toBe('v1.15.x')
			expect(sourceVersion).toBe('v1.14.x')
			expect(targetProduct).toBe('terraform')

			// Simulate the "Save source files" step: copy changed source files to a
			// temp dir before the working directory is replaced by the target checkout.
			const sourceSaveDir = fs.mkdtempSync(
				path.join(os.tmpdir(), 'fp-e2e-source-'),
			)
			try {
				const changes = JSON.parse(fs.readFileSync(changesFilePath, 'utf-8'))
				for (const srcPath of [...changes.added, ...changes.modified]) {
					const src = path.join(tmpDir, srcPath)
					const dest = path.join(sourceSaveDir, srcPath)
					fs.mkdirSync(path.dirname(dest), { recursive: true })
					if (fs.existsSync(src)) {
						fs.copyFileSync(src, dest)
					}
				}

				// Simulate "Check out target branch": delete the source version directory
				// so the script cannot read source files from the working tree.
				fs.rmSync(path.join(tmpDir, `content/terraform/${sourceVersion!}`), {
					recursive: true,
					force: true,
				})

				const result = spawnSync(
					'node',
					[
						APPLY_CHANGES,
						'--changes-file',
						changesFilePath,
						'--target-product',
						targetProduct!,
						'--source-version',
						sourceVersion!,
						'--target-version',
						targetVersion!,
						'--source-dir',
						sourceSaveDir,
					],
					{ cwd: tmpDir, encoding: 'utf-8' },
				)

				expect(result.status, result.stderr).toBe(0)

				const tgt = path.join(tmpDir, 'content/terraform/v1.15.x/docs')
				expect(fs.existsSync(path.join(tgt, 'new-feature.mdx'))).toBe(true)
				expect(
					fs.readFileSync(path.join(tgt, 'new-feature.mdx'), 'utf-8'),
				).toBe('# New Feature')
				expect(fs.readFileSync(path.join(tgt, 'existing.mdx'), 'utf-8')).toBe(
					'# Existing (updated by PR)',
				)
				expect(fs.existsSync(path.join(tgt, 'to-be-removed.mdx'))).toBe(false)
			} finally {
				fs.rmSync(sourceSaveDir, { recursive: true, force: true })
			}
		})
	},
)

// ---------------------------------------------------------------------------
// Failure cases — each is self-contained with its own repo setup
// ---------------------------------------------------------------------------

describe('Forward-port pipeline — failure cases', () => {
	let tmpDir: string
	let configPath: string

	beforeAll(() => {
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fp-e2e-fail-'))
		configPath = path.join(tmpDir, 'forward-port-config.yml')
		fs.writeFileSync(configPath, FORWARD_PORT_CONFIG)
	})

	afterAll(() => {
		fs.rmSync(tmpDir, { recursive: true, force: true })
	})

	it('pipeline halts at Step 1 when no PR label matches the config — exits 1, no JSON output', () => {
		const labels = JSON.stringify(['some-label', 'some-unlisted-team-label'])

		const result = spawnSync(
			'node',
			[RESOLVE_TARGET, '--config', configPath, '--labels', labels],
			{ encoding: 'utf-8' },
		)

		expect(result.status).toBe(1)
		expect(result.stderr).toContain('No forward-port:*')
		// No JSON should be written to stdout on failure
		expect(result.stdout.trim()).toBe('')
	})

	it('Step 2 with no diff — produces empty arrays, Step 3 exits cleanly as a no-op', () => {
		const emptyRepoDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fp-e2e-empty-'))

		try {
			initRepo(emptyRepoDir)

			const src = path.join(emptyRepoDir, 'content/terraform/v1.14.x/docs')
			fs.mkdirSync(src, { recursive: true })
			fs.writeFileSync(path.join(src, 'untouched.mdx'), '# No changes here')

			// Commit and immediately use HEAD as baseSha — no subsequent changes
			const headSha = commitAll(emptyRepoDir, 'Unchanged state')

			const emptyChangesFile = path.join(
				emptyRepoDir,
				'changedContentFiles.json',
			)

			const getResult = spawnSync(
				'node',
				[
					GET_CHANGED,
					'--merge-base',
					headSha,
					'--include-partials',
					'false',
					'--output',
					emptyChangesFile,
				],
				{ cwd: emptyRepoDir, encoding: 'utf-8' },
			)

			expect(getResult.status, getResult.stderr).toBe(0)
			const changes = JSON.parse(fs.readFileSync(emptyChangesFile, 'utf-8'))
			expect(changes).toEqual({ added: [], modified: [], removed: [] })

			const applyResult = spawnSync(
				'node',
				[
					APPLY_CHANGES,
					'--changes-file',
					emptyChangesFile,
					'--target-product',
					'terraform',
					'--source-version',
					'v1.14.x',
					'--target-version',
					'v1.15.x',
				],
				{ cwd: emptyRepoDir, encoding: 'utf-8' },
			)

			expect(applyResult.status, applyResult.stderr).toBe(0)
			expect(applyResult.stdout).toContain('0 copied, 0 deleted')
		} finally {
			fs.rmSync(emptyRepoDir, { recursive: true, force: true })
		}
	})
})

// ---------------------------------------------------------------------------
// workflow_dispatch path — resolve-target is skipped; SOURCE_VERSION_FOLDER, TARGET_VERSION_FOLDER,
// and TARGET_BRANCH come directly from the user's manual inputs (pre-set env vars).
// These tests verify that the diff + apply steps work correctly in that mode.
// ---------------------------------------------------------------------------

describe.sequential(
	'Forward-port pipeline — workflow_dispatch (SOURCE_VERSION from inputs, no resolve-target)',
	() => {
		let dispatchDir: string
		let changesFilePath: string
		let sourceSaveDir: string
		let baseSha: string

		beforeAll(() => {
			dispatchDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fp-e2e-dispatch-'))
			changesFilePath = path.join(dispatchDir, 'changedContentFiles.json')

			initRepo(dispatchDir)

			const src = path.join(dispatchDir, 'content/terraform/v1.14.x/docs')
			const tgt = path.join(dispatchDir, 'content/terraform/v1.15.x/docs')
			fs.mkdirSync(src, { recursive: true })
			fs.mkdirSync(tgt, { recursive: true })

			fs.writeFileSync(path.join(src, 'stable.mdx'), '# Stable (original)')
			fs.writeFileSync(path.join(tgt, 'stable.mdx'), '# Stable (original)')

			baseSha = commitAll(dispatchDir, 'Base state before PR')

			// PR changes
			fs.writeFileSync(path.join(src, 'stable.mdx'), '# Stable (updated by PR)')
			fs.writeFileSync(path.join(src, 'new-dispatch.mdx'), '# New via dispatch')

			commitAll(dispatchDir, 'PR changes for dispatch test')
		})

		afterAll(() => {
			fs.rmSync(dispatchDir, { recursive: true, force: true })
			if (sourceSaveDir && fs.existsSync(sourceSaveDir)) {
				fs.rmSync(sourceSaveDir, { recursive: true, force: true })
			}
		})

		it('Step 2 (dispatch) — get-changed-content-files diffs against the provided merge-base SHA', () => {
			const result = spawnSync(
				'node',
				[
					GET_CHANGED,
					'--merge-base',
					baseSha,
					'--include-partials',
					'false',
					'--output',
					changesFilePath,
				],
				{ cwd: dispatchDir, encoding: 'utf-8' },
			)

			expect(result.status, result.stderr).toBe(0)

			const changes = JSON.parse(fs.readFileSync(changesFilePath, 'utf-8'))
			expect(changes.added).toContain(
				'content/terraform/v1.14.x/docs/new-dispatch.mdx',
			)
			expect(changes.modified).toContain(
				'content/terraform/v1.14.x/docs/stable.mdx',
			)
		})

		it('Step 3 (dispatch) — apply uses SOURCE_VERSION from inputs and --source-dir for file reads', () => {
			// Simulate "Save source files" before checkout switch
			sourceSaveDir = fs.mkdtempSync(
				path.join(os.tmpdir(), 'fp-dispatch-source-'),
			)
			const changes = JSON.parse(fs.readFileSync(changesFilePath, 'utf-8'))
			for (const srcPath of [...changes.added, ...changes.modified]) {
				const src = path.join(dispatchDir, srcPath)
				const dest = path.join(sourceSaveDir, srcPath)
				fs.mkdirSync(path.dirname(dest), { recursive: true })
				if (fs.existsSync(src)) {
					fs.copyFileSync(src, dest)
				}
			}

			// Simulate "Check out target branch" — source version directory is gone
			fs.rmSync(path.join(dispatchDir, 'content/terraform/v1.14.x'), {
				recursive: true,
				force: true,
			})

			// SOURCE_VERSION_FOLDER and TARGET_VERSION_FOLDER come from workflow_dispatch inputs
			// (written to GITHUB_ENV via jq or labelSlug config lookup) — simulated here as
			// hardcoded strings, not read from GITHUB_ENV.
			const result = spawnSync(
				'node',
				[
					APPLY_CHANGES,
					'--changes-file',
					changesFilePath,
					'--target-product',
					'terraform',
					'--source-version',
					'v1.14.x',
					'--target-version',
					'v1.15.x',
					'--source-dir',
					sourceSaveDir,
				],
				{ cwd: dispatchDir, encoding: 'utf-8' },
			)

			expect(result.status, result.stderr).toBe(0)

			const tgt = path.join(dispatchDir, 'content/terraform/v1.15.x/docs')
			expect(fs.readFileSync(path.join(tgt, 'stable.mdx'), 'utf-8')).toBe(
				'# Stable (updated by PR)',
			)
			expect(fs.existsSync(path.join(tgt, 'new-dispatch.mdx'))).toBe(true)
			expect(fs.readFileSync(path.join(tgt, 'new-dispatch.mdx'), 'utf-8')).toBe(
				'# New via dispatch',
			)
		})
	},
)
