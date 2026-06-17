/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fs, vol } from 'memfs'
import { applyForwardPortChanges } from './apply-forward-port-changes.mjs'

vi.mock('node:fs')

const CHANGES_FILE = '/repo/changedContentFiles.json'

function writeChangesFile(changes: {
	added?: string[]
	modified?: string[]
	removed?: string[]
}): void {
	vol.fromJSON({
		[CHANGES_FILE]: JSON.stringify({
			added: [],
			modified: [],
			removed: [],
			...changes,
		}),
	})
}

function writeRepoFile(relativePath: string, content: string): void {
	vol.fromJSON({ [relativePath]: content })
}

function readRepoFile(relativePath: string): string {
	return fs.readFileSync(relativePath, 'utf-8') as string
}

describe('applyForwardPortChanges', () => {
	beforeEach(() => {
		vol.reset()
	})

	afterEach(() => {
		vol.reset()
	})

	it('applies added, modified, and removed files from source version into target version', () => {
		writeRepoFile('content/terraform/v1.14.x/docs/new.mdx', 'new source content\n')
		writeRepoFile('content/terraform/v1.14.x/docs/edited.mdx', 'edited source content\n')
		writeRepoFile('content/terraform/v1.15.x/docs/edited.mdx', 'edited old target content\n')
		writeRepoFile('content/terraform/v1.15.x/docs/deleted.mdx', 'deleted old target content\n')
		writeChangesFile({
			added: ['content/terraform/v1.14.x/docs/new.mdx'],
			modified: ['content/terraform/v1.14.x/docs/edited.mdx'],
			removed: ['content/terraform/v1.14.x/docs/deleted.mdx'],
		})

		const { result, error } = applyForwardPortChanges({
			changesFile: CHANGES_FILE,
			targetProduct: 'terraform',
			sourceVersion: 'v1.14.x',
			targetVersion: 'v1.15.x',
		})

		expect(error).toBeUndefined()
		expect(result).toEqual({ applied: 2, deleted: 1, skipped: 0 })
		expect(readRepoFile('content/terraform/v1.15.x/docs/new.mdx')).toBe('new source content\n')
		expect(readRepoFile('content/terraform/v1.15.x/docs/edited.mdx')).toBe('edited source content\n')
		expect(fs.existsSync('content/terraform/v1.15.x/docs/deleted.mdx')).toBe(false)
	})

	it('filters out files from other products in a multi-product changeset', () => {
		// Terraform files (target product) — should be forward-ported
		writeRepoFile('content/terraform/v1.14.x/docs/tf-file.mdx', 'terraform source content\n')
		// Vault files (other product) — should be ignored
		writeRepoFile('content/vault/v1.14.x/docs/vault-file.mdx', 'vault source content\n')
		writeChangesFile({
			added: [
				'content/terraform/v1.14.x/docs/tf-file.mdx',
				'content/vault/v1.14.x/docs/vault-file.mdx',
			],
		})

		applyForwardPortChanges({
			changesFile: CHANGES_FILE,
			targetProduct: 'terraform',
			sourceVersion: 'v1.14.x',
			targetVersion: 'v1.15.x',
		})

		expect(fs.existsSync('content/terraform/v1.15.x/docs/tf-file.mdx')).toBe(true)
		expect(fs.existsSync('content/vault/v1.15.x/docs/vault-file.mdx')).toBe(false)
	})

	it('applies no changes and returns successfully when the target product has no matching files', () => {
		writeRepoFile('content/vault/v1.14.x/docs/vault-file.mdx', 'vault content\n')
		writeChangesFile({
			added: ['content/vault/v1.14.x/docs/vault-file.mdx'],
		})

		// Zero matches is not an error at this script's level: its job is to copy
		// whatever files match, and copying nothing is not a crash. Deciding that
		// "nothing to port" should stop the run is handled one layer up, in the
		// workflow (the "Commit forward-port changes" step exits non-zero).
		const { result, error } = applyForwardPortChanges({
			changesFile: CHANGES_FILE,
			targetProduct: 'terraform',
			sourceVersion: 'v1.14.x',
			targetVersion: 'v1.15.x',
		})

		expect(error).toBeUndefined()
		expect(result).toEqual({ applied: 0, deleted: 0, skipped: 0 })
		expect(fs.existsSync('content/terraform/v1.15.x/docs/vault-file.mdx')).toBe(false)
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
		writeChangesFile({
			added: [
				'content/vault/v1.14.x/docs/new.mdx',
				'content/terraform/v1.14.x/docs/tf-added.mdx',
			],
			modified: ['content/vault/v1.14.x/docs/edited.mdx'],
			removed: [
				'content/vault/v1.14.x/docs/deleted.mdx',
				'content/terraform/v1.14.x/docs/tf-removed.mdx',
			],
		})

		applyForwardPortChanges({
			changesFile: CHANGES_FILE,
			targetProduct: 'vault',
			sourceVersion: 'v1.14.x',
			targetVersion: 'v1.15.x',
		})

		// Vault changes should be applied
		expect(readRepoFile('content/vault/v1.15.x/docs/new.mdx')).toBe('vault new\n')
		expect(readRepoFile('content/vault/v1.15.x/docs/edited.mdx')).toBe('vault edited source\n')
		expect(fs.existsSync('content/vault/v1.15.x/docs/deleted.mdx')).toBe(false)
		// Terraform file should NOT be ported (it was in added but not for this product)
		expect(fs.existsSync('content/terraform/v1.15.x/docs/tf-added.mdx')).toBe(false)
		// Terraform file should NOT be deleted (it was in removed but not for this product)
		expect(fs.existsSync('content/terraform/v1.15.x/docs/tf-removed.mdx')).toBe(true)
	})

	it('does not apply terraform-enterprise files when target product is terraform', () => {
		writeRepoFile('content/terraform/v1.14.x/docs/tf-file.mdx', 'terraform content\n')
		writeRepoFile('content/terraform-enterprise/v1.14.x/docs/tfe-file.mdx', 'tfe content\n')
		writeChangesFile({
			added: [
				'content/terraform/v1.14.x/docs/tf-file.mdx',
				'content/terraform-enterprise/v1.14.x/docs/tfe-file.mdx',
			],
		})

		applyForwardPortChanges({
			changesFile: CHANGES_FILE,
			targetProduct: 'terraform',
			sourceVersion: 'v1.14.x',
			targetVersion: 'v1.15.x',
		})

		// terraform/ file should be ported
		expect(fs.existsSync('content/terraform/v1.15.x/docs/tf-file.mdx')).toBe(true)
		// terraform-enterprise/ file should NOT be ported
		expect(fs.existsSync('content/terraform-enterprise/v1.15.x/docs/tfe-file.mdx')).toBe(false)
	})

	it('returns an error when the changes file is missing', () => {
		const { error } = applyForwardPortChanges({
			changesFile: CHANGES_FILE,
			targetProduct: 'terraform',
			sourceVersion: 'v1.14.x',
			targetVersion: 'v1.15.x',
		})

		expect(error).toContain('Error reading changes file')
	})

	it('returns an error when required arguments are missing', () => {
		// @ts-expect-error - intentionally omitting required args to test the runtime guard
		const { error } = applyForwardPortChanges({
			changesFile: CHANGES_FILE,
			targetProduct: 'terraform',
		})

		expect(error).toContain('required')
	})
})
