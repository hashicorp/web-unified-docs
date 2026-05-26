/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const APPLY_FORWARD_PORT_CHANGES_SCRIPT = path.resolve(
	'scripts/forward-port/apply-forward-port-changes.mjs',
)

describe.sequential('apply-forward-port-changes integration', () => {
	let originalCwd: string
	let repoPath: string
	let changesFilePath: string

	beforeEach(() => {
		originalCwd = process.cwd()
		repoPath = fs.mkdtempSync(path.join(os.tmpdir(), 'forward-port-apply-'))
		changesFilePath = path.join(repoPath, 'changedContentFiles.json')
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

	function readRepoFile(relativePath: string): string {
		return fs.readFileSync(path.join(repoPath, relativePath), 'utf-8')
	}

	it('applies added, modified, and removed files from source version into target version', () => {
		writeRepoFile('content/terraform/v1.14.x/docs/new.mdx', 'new source content\n')
		writeRepoFile(
			'content/terraform/v1.14.x/docs/edited.mdx',
			'edited source content\n',
		)
		writeRepoFile(
			'content/terraform/v1.15.x/docs/edited.mdx',
			'edited old target content\n',
		)
		writeRepoFile(
			'content/terraform/v1.15.x/docs/deleted.mdx',
			'deleted old target content\n',
		)

		fs.writeFileSync(
			changesFilePath,
			JSON.stringify(
				{
					added: ['content/terraform/v1.14.x/docs/new.mdx'],
					modified: ['content/terraform/v1.14.x/docs/edited.mdx'],
					removed: ['content/terraform/v1.14.x/docs/deleted.mdx'],
				},
				null,
				2,
			),
			'utf-8',
		)

		runCommand(
			[
				'node',
				JSON.stringify(APPLY_FORWARD_PORT_CHANGES_SCRIPT),
				'--changes-file',
				JSON.stringify(changesFilePath),
				'--target-product',
				'terraform',
				'--source-version',
				'v1.14.x',
				'--target-version',
				'v1.15.x',
			].join(' '),
		)

		expect(readRepoFile('content/terraform/v1.15.x/docs/new.mdx')).toBe(
			'new source content\n',
		)
		expect(readRepoFile('content/terraform/v1.15.x/docs/edited.mdx')).toBe(
			'edited source content\n',
		)
		expect(
			fs.existsSync(path.join(repoPath, 'content/terraform/v1.15.x/docs/deleted.mdx')),
		).toBe(false)
	})

	it('filters out files from other products in a multi-product changeset', () => {
		// Terraform files (target product) — should be forward-ported
		writeRepoFile('content/terraform/v1.14.x/docs/tf-file.mdx', 'terraform source content\n')
		// Vault files (other product) — should be ignored
		writeRepoFile('content/vault/v1.14.x/docs/vault-file.mdx', 'vault source content\n')

		fs.writeFileSync(
			changesFilePath,
			JSON.stringify(
				{
					added: [
						'content/terraform/v1.14.x/docs/tf-file.mdx',
						'content/vault/v1.14.x/docs/vault-file.mdx',
					],
					modified: [],
					removed: [],
				},
				null,
				2,
			),
			'utf-8',
		)

		runCommand(
			[
				'node',
				JSON.stringify(APPLY_FORWARD_PORT_CHANGES_SCRIPT),
				'--changes-file',
				JSON.stringify(changesFilePath),
				'--target-product',
				'terraform',
				'--source-version',
				'v1.14.x',
				'--target-version',
				'v1.15.x',
			].join(' '),
		)

		expect(
			fs.existsSync(path.join(repoPath, 'content/terraform/v1.15.x/docs/tf-file.mdx')),
		).toBe(true)
		expect(
			fs.existsSync(path.join(repoPath, 'content/vault/v1.15.x/docs/vault-file.mdx')),
		).toBe(false)
	})

	it('applies no changes and exits successfully when the target product has no matching files', () => {
		writeRepoFile('content/vault/v1.14.x/docs/vault-file.mdx', 'vault content\n')

		fs.writeFileSync(
			changesFilePath,
			JSON.stringify(
				{
					added: ['content/vault/v1.14.x/docs/vault-file.mdx'],
					modified: [],
					removed: [],
				},
				null,
				2,
			),
			'utf-8',
		)

		// Should not throw — zero matches is not an error
		expect(() => {
			runCommand(
				[
					'node',
					JSON.stringify(APPLY_FORWARD_PORT_CHANGES_SCRIPT),
					'--changes-file',
					JSON.stringify(changesFilePath),
					'--target-product',
					'terraform',
					'--source-version',
					'v1.14.x',
					'--target-version',
					'v1.15.x',
				].join(' '),
			)
		}).not.toThrow()

		expect(
			fs.existsSync(path.join(repoPath, 'content/terraform/v1.15.x/docs/vault-file.mdx')),
		).toBe(false)
	})

	it('filters added, modified, and removed changes independently by target product', () => {
		// Vault files (target product)
		writeRepoFile('content/vault/v1.14.x/docs/new.mdx', 'vault new\n')
		writeRepoFile('content/vault/v1.14.x/docs/edited.mdx', 'vault edited source\n')
		writeRepoFile('content/vault/v1.15.x/docs/edited.mdx', 'vault old target\n')
		writeRepoFile('content/vault/v1.15.x/docs/deleted.mdx', 'vault to delete\n')
		// Terraform files (other product — should remain untouched)
		writeRepoFile('content/terraform/v1.14.x/docs/tf-added.mdx', 'tf content\n')
		writeRepoFile('content/terraform/v1.15.x/docs/tf-removed.mdx', 'tf remove target\n')

		fs.writeFileSync(
			changesFilePath,
			JSON.stringify(
				{
					added: [
						'content/vault/v1.14.x/docs/new.mdx',
						'content/terraform/v1.14.x/docs/tf-added.mdx',
					],
					modified: ['content/vault/v1.14.x/docs/edited.mdx'],
					removed: [
						'content/vault/v1.14.x/docs/deleted.mdx',
						'content/terraform/v1.14.x/docs/tf-removed.mdx',
					],
				},
				null,
				2,
			),
			'utf-8',
		)

		runCommand(
			[
				'node',
				JSON.stringify(APPLY_FORWARD_PORT_CHANGES_SCRIPT),
				'--changes-file',
				JSON.stringify(changesFilePath),
				'--target-product',
				'vault',
				'--source-version',
				'v1.14.x',
				'--target-version',
				'v1.15.x',
			].join(' '),
		)

		// Vault changes should be applied
		expect(readRepoFile('content/vault/v1.15.x/docs/new.mdx')).toBe('vault new\n')
		expect(readRepoFile('content/vault/v1.15.x/docs/edited.mdx')).toBe('vault edited source\n')
		expect(
			fs.existsSync(path.join(repoPath, 'content/vault/v1.15.x/docs/deleted.mdx')),
		).toBe(false)
		// Terraform file should NOT be ported (it was in added but not for this product)
		expect(
			fs.existsSync(path.join(repoPath, 'content/terraform/v1.15.x/docs/tf-added.mdx')),
		).toBe(false)
		// Terraform file should NOT be deleted (it was in removed but not for this product)
		expect(
			fs.existsSync(path.join(repoPath, 'content/terraform/v1.15.x/docs/tf-removed.mdx')),
		).toBe(true)
	})

	it('does not apply terraform-enterprise files when target product is terraform', () => {
		writeRepoFile('content/terraform/v1.14.x/docs/tf-file.mdx', 'terraform content\n')
		writeRepoFile(
			'content/terraform-enterprise/v1.14.x/docs/tfe-file.mdx',
			'tfe content\n',
		)

		fs.writeFileSync(
			changesFilePath,
			JSON.stringify(
				{
					added: [
						'content/terraform/v1.14.x/docs/tf-file.mdx',
						'content/terraform-enterprise/v1.14.x/docs/tfe-file.mdx',
					],
					modified: [],
					removed: [],
				},
				null,
				2,
			),
			'utf-8',
		)

		runCommand(
			[
				'node',
				JSON.stringify(APPLY_FORWARD_PORT_CHANGES_SCRIPT),
				'--changes-file',
				JSON.stringify(changesFilePath),
				'--target-product',
				'terraform',
				'--source-version',
				'v1.14.x',
				'--target-version',
				'v1.15.x',
			].join(' '),
		)

		// terraform/ file should be ported
		expect(
			fs.existsSync(path.join(repoPath, 'content/terraform/v1.15.x/docs/tf-file.mdx')),
		).toBe(true)
		// terraform-enterprise/ file should NOT be ported
		expect(
			fs.existsSync(
				path.join(repoPath, 'content/terraform-enterprise/v1.15.x/docs/tfe-file.mdx'),
			),
		).toBe(false)
	})
})
