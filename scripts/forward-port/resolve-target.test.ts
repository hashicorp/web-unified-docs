/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const RESOLVE_TARGET_SCRIPT = path.resolve(
	'scripts/forward-port/resolve-target.mjs',
)

// Config uses slug-based keys — the part after "forward-port:" in the PR label.
// Every entry requires: sourceVersionFolder, targetProduct, targetBranch, targetVersionFolder.
const SAMPLE_CONFIG = `
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

tf-test:
  sourceVersionFolder: v1.0.0
  targetProduct: terraform
  targetBranch: TF-test
  targetVersionFolder: v1.1.0

tf-test-beta:
  sourceVersionFolder: v1.0.0
  targetProduct: terraform
  targetBranch: TF-test-beta
  targetVersionFolder: v1.1.0-beta

tf-test-rc:
  sourceVersionFolder: v1.0.0
  targetProduct: terraform
  targetBranch: TF-test-rc
  targetVersionFolder: v1.1.0-rc

tf-10:
  sourceVersionFolder: v9.x.x
  targetProduct: terraform
  targetBranch: TF-10
  targetVersionFolder: v10.x.x
`

// A valid /forward-port comment body for Scenario B testing.
// The first line must be "/forward-port forward-port:<slug>" where <slug> matches
// the forward-port:* label on the PR. This ties the comment to a specific run and
// disambiguates multiple forward-port runs on the same PR.
const VALID_COMMENT = `/forward-port forward-port:boundary-1.0
sourceVersionFolder: v1.1.0
targetProduct: boundary
targetBranch: boundary-test
targetVersionFolder: v1.2.0`

describe('resolve-target', () => {
	let tmpDir: string
	let configPath: string
	let githubEnvPath: string

	beforeEach(() => {
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'resolve-target-'))
		configPath = path.join(tmpDir, 'forward-port-config.yml')
		githubEnvPath = path.join(tmpDir, 'github-env')
		fs.writeFileSync(configPath, SAMPLE_CONFIG, 'utf-8')
		fs.writeFileSync(githubEnvPath, '', 'utf-8')
	})

	afterEach(() => {
		fs.rmSync(tmpDir, { recursive: true, force: true })
	})

	function runScript(
		labels: string[],
		{
			allowFailure = false,
			commentFile = null,
		}: { allowFailure?: boolean; commentFile?: string | null } = {},
	): string {
		const args = [
			'node',
			JSON.stringify(RESOLVE_TARGET_SCRIPT),
			'--config',
			JSON.stringify(configPath),
			'--labels',
			JSON.stringify(JSON.stringify(labels)),
		]
		if (commentFile) {
			args.push('--comment-file', JSON.stringify(commentFile))
		}
		try {
			return execSync(args.join(' '), {
				encoding: 'utf-8',
				stdio: 'pipe',
				env: {
					...process.env,
					GITHUB_ENV: githubEnvPath,
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

	function readGithubEnv(): Record<string, string> {
		const content = fs.readFileSync(githubEnvPath, 'utf-8')
		return Object.fromEntries(
			content
				.split('\n')
				.filter(Boolean)
				.map((line) => {
					const eq = line.indexOf('=')
					return [line.slice(0, eq), line.slice(eq + 1)]
				}),
		)
	}

	// ── Scenario A: config-driven (slug found in config) ─────────────────────

	it('writes TARGET_BRANCH, TARGET_VERSION_FOLDER, SOURCE_VERSION_FOLDER, and TARGET_PRODUCT when a forward-port:* label matches the config', () => {
		runScript(['forward-port:tf-forward-porting-testing'])

		const output = readGithubEnv()
		expect(output.TARGET_BRANCH).toBe('rn-forward-porting-test-rc')
		expect(output.TARGET_VERSION_FOLDER).toBe('v1.15.x')
		expect(output.SOURCE_VERSION_FOLDER).toBe('v1.14.x')
		expect(output.TARGET_PRODUCT).toBe('terraform')
	})

	it('matches on label regardless of its position in the labels array', () => {
		runScript(['some-other-label', 'forward-port:vault-test'])

		const output = readGithubEnv()
		expect(output.TARGET_BRANCH).toBe('rn-test-vault')
		expect(output.TARGET_VERSION_FOLDER).toBe('v1.20.x')
		expect(output.SOURCE_VERSION_FOLDER).toBe('v1.19.x')
		expect(output.TARGET_PRODUCT).toBe('vault')
	})

	it('uses config values even when a comment file is also provided', () => {
		const commentPath = path.join(tmpDir, 'comment.txt')
		fs.writeFileSync(commentPath, VALID_COMMENT, 'utf-8')

		runScript(['forward-port:vault-test'], { commentFile: commentPath })

		// Config wins — not the comment's boundary values
		const output = readGithubEnv()
		expect(output.TARGET_BRANCH).toBe('rn-test-vault')
		expect(output.TARGET_PRODUCT).toBe('vault')
	})

	// ── Scenario B: comment-driven (slug not in config) ──────────────────────

	it('falls back to the comment file when the slug is not found in the config', () => {
		const commentPath = path.join(tmpDir, 'comment.txt')
		fs.writeFileSync(commentPath, VALID_COMMENT, 'utf-8')

		runScript(['forward-port:boundary-1.0'], { commentFile: commentPath })

		const output = readGithubEnv()
		expect(output.TARGET_BRANCH).toBe('boundary-test')
		expect(output.TARGET_VERSION_FOLDER).toBe('v1.2.0')
		expect(output.SOURCE_VERSION_FOLDER).toBe('v1.1.0')
		expect(output.TARGET_PRODUCT).toBe('boundary')
	})

	it('exits with code 1 when the slug is not in config and no comment file is provided', () => {
		const output = runScript(['forward-port:unknown-slug'], {
			allowFailure: true,
		})

		expect(output).toContain('not found in config')
		expect(output).toContain('comment file')
		const githubEnv = readGithubEnv()
		expect(githubEnv.TARGET_BRANCH).toBeUndefined()
	})

	it('exits with code 1 when the comment first line has the wrong slug', () => {
		const commentPath = path.join(tmpDir, 'comment.txt')
		// VALID_COMMENT has "forward-port:boundary-1.0" but label is boundary-2.0
		fs.writeFileSync(commentPath, VALID_COMMENT, 'utf-8')

		const output = runScript(['forward-port:boundary-2.0'], {
			allowFailure: true,
			commentFile: commentPath,
		})

		expect(output).toContain('forward-port:boundary-2.0')
		const githubEnv = readGithubEnv()
		expect(githubEnv.TARGET_BRANCH).toBeUndefined()
	})

	it('exits with code 1 when the comment first line is bare /forward-port without a slug', () => {
		const commentPath = path.join(tmpDir, 'comment.txt')
		fs.writeFileSync(
			commentPath,
			`/forward-port\nsourceVersionFolder: v1.1.0\ntargetProduct: boundary\ntargetBranch: boundary-test\ntargetVersionFolder: v1.2.0`,
			'utf-8',
		)

		const output = runScript(['forward-port:boundary-1.0'], {
			allowFailure: true,
			commentFile: commentPath,
		})

		expect(output).toContain('forward-port:boundary-1.0')
		const githubEnv = readGithubEnv()
		expect(githubEnv.TARGET_BRANCH).toBeUndefined()
	})

	it('exits with code 1 when the comment file is missing a required field', () => {
		const commentPath = path.join(tmpDir, 'comment.txt')
		// Missing targetBranch
		fs.writeFileSync(
			commentPath,
			`/forward-port forward-port:boundary-1.0\nsourceVersionFolder: v1.1.0\ntargetProduct: boundary\ntargetVersionFolder: v1.2.0`,
			'utf-8',
		)

		const output = runScript(['forward-port:boundary-1.0'], {
			allowFailure: true,
			commentFile: commentPath,
		})

		expect(output).toContain('targetBranch')
		const githubEnv = readGithubEnv()
		expect(githubEnv.TARGET_BRANCH).toBeUndefined()
	})

	// ── Error cases ───────────────────────────────────────────────────────────

	it('exits with code 1 when no forward-port:* label is present', () => {
		const output = runScript(['some-label', 'another-label'], {
			allowFailure: true,
		})

		expect(output).toContain('forward-port:')
		const githubEnv = readGithubEnv()
		expect(githubEnv.TARGET_BRANCH).toBeUndefined()
	})

	// Intentional for now to avoid potential complex edge cases
	it('exits with code 1 when multiple forward-port:* labels are present', () => {
		const output = runScript(
			['forward-port:vault-test', 'forward-port:tf-test'],
			{ allowFailure: true },
		)

		expect(output).toContain('Multiple')
		const githubEnv = readGithubEnv()
		expect(githubEnv.TARGET_BRANCH).toBeUndefined()
		expect(githubEnv.SOURCE_VERSION_FOLDER).toBeUndefined()
	})

	it('exits with code 1 when a matching config entry is missing sourceVersionFolder', () => {
		fs.writeFileSync(
			configPath,
			`tf-missing-source:\n  targetBranch: rn-test-tf\n  targetVersionFolder: v1.15.x\n  targetProduct: terraform`,
			'utf-8',
		)

		const output = runScript(['forward-port:tf-missing-source'], {
			allowFailure: true,
		})
		expect(output).toContain('sourceVersionFolder')
		const githubEnv = readGithubEnv()
		expect(githubEnv.TARGET_BRANCH).toBeUndefined()
	})

	it('exits with code 1 when the config file does not exist', () => {
		fs.rmSync(configPath)
		const output = runScript(['forward-port:tf-test'], { allowFailure: true })
		expect(output).toContain('Error')
	})

	// ── Version format tests ──────────────────────────────────────────────────

	it('resolves a semver targetVersionFolder (v1.1.0) correctly', () => {
		runScript(['forward-port:tf-test'])
		const output = readGithubEnv()
		expect(output.TARGET_BRANCH).toBe('TF-test')
		expect(output.TARGET_VERSION_FOLDER).toBe('v1.1.0')
		expect(output.SOURCE_VERSION_FOLDER).toBe('v1.0.0')
	})

	it('resolves a pre-release targetVersionFolder (v1.1.0-beta) correctly', () => {
		runScript(['forward-port:tf-test-beta'])
		const output = readGithubEnv()
		expect(output.TARGET_VERSION_FOLDER).toBe('v1.1.0-beta')
		expect(output.SOURCE_VERSION_FOLDER).toBe('v1.0.0')
	})

	it('resolves a release-candidate targetVersionFolder (v1.1.0-rc) correctly', () => {
		runScript(['forward-port:tf-test-rc'])
		const output = readGithubEnv()
		expect(output.TARGET_VERSION_FOLDER).toBe('v1.1.0-rc')
		expect(output.SOURCE_VERSION_FOLDER).toBe('v1.0.0')
	})

	it('resolves a double-wildcard targetVersionFolder (v10.x.x) correctly', () => {
		runScript(['forward-port:tf-10'])
		const output = readGithubEnv()
		expect(output.TARGET_VERSION_FOLDER).toBe('v10.x.x')
		expect(output.SOURCE_VERSION_FOLDER).toBe('v9.x.x')
	})
})
