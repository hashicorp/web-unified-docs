/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { vol } from 'memfs'
import { resolveTarget } from './resolve-target.mjs'

vi.mock('node:fs')

const CONFIG_PATH = '/repo/forward-port-config.yml'
const COMMENT_PATH = '/repo/comment.txt'

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

describe('resolveTarget', () => {
	beforeEach(() => {
		vol.reset()
		vol.fromJSON({ [CONFIG_PATH]: SAMPLE_CONFIG })
	})

	afterEach(() => {
		vol.reset()
	})

	// ── Scenario A: config-driven (slug found in config) ─────────────────────

	it('returns TARGET_BRANCH, TARGET_VERSION_FOLDER, SOURCE_VERSION_FOLDER, and TARGET_PRODUCT when a forward-port:* label matches the config', () => {
		const { result } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:tf-forward-porting-testing'],
		})

		expect(result.TARGET_BRANCH).toBe('rn-forward-porting-test-rc')
		expect(result.TARGET_VERSION_FOLDER).toBe('v1.15.x')
		expect(result.SOURCE_VERSION_FOLDER).toBe('v1.14.x')
		expect(result.TARGET_PRODUCT).toBe('terraform')
	})

	it('matches on label regardless of its position in the labels array', () => {
		const { result } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['some-other-label', 'forward-port:vault-test'],
		})

		expect(result.TARGET_BRANCH).toBe('rn-test-vault')
		expect(result.TARGET_VERSION_FOLDER).toBe('v1.20.x')
		expect(result.SOURCE_VERSION_FOLDER).toBe('v1.19.x')
		expect(result.TARGET_PRODUCT).toBe('vault')
	})

	it('uses config values even when a comment file is also provided', () => {
		vol.fromJSON({
			[CONFIG_PATH]: SAMPLE_CONFIG,
			[COMMENT_PATH]: VALID_COMMENT,
		})

		// Config wins — not the comment's boundary values
		const { result } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:vault-test'],
			commentFile: COMMENT_PATH,
		})
		expect(result.TARGET_BRANCH).toBe('rn-test-vault')
		expect(result.TARGET_PRODUCT).toBe('vault')
	})

	// ── Scenario B: comment-driven (slug not in config) ──────────────────────

	it('falls back to the comment file when the slug is not found in the config', () => {
		vol.fromJSON({
			[CONFIG_PATH]: SAMPLE_CONFIG,
			[COMMENT_PATH]: VALID_COMMENT,
		})

		const { result } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:boundary-1.0'],
			commentFile: COMMENT_PATH,
		})
		expect(result.TARGET_BRANCH).toBe('boundary-test')
		expect(result.TARGET_VERSION_FOLDER).toBe('v1.2.0')
		expect(result.SOURCE_VERSION_FOLDER).toBe('v1.1.0')
		expect(result.TARGET_PRODUCT).toBe('boundary')
	})

	it('returns an error when the slug is not in config and no comment file is provided', () => {
		const { error } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:unknown-slug'],
		})

		expect(error).toContain('not found in config')
		expect(error).toContain('comment file')
	})

	it('returns an error when the comment first line has the wrong slug', () => {
		// VALID_COMMENT has "forward-port:boundary-1.0" but label is boundary-2.0
		vol.fromJSON({
			[CONFIG_PATH]: SAMPLE_CONFIG,
			[COMMENT_PATH]: VALID_COMMENT,
		})

		const { error } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:boundary-2.0'],
			commentFile: COMMENT_PATH,
		})

		expect(error).toContain('forward-port:boundary-2.0')
	})

	it('returns an error when the comment first line is bare /forward-port without a slug', () => {
		vol.fromJSON({
			[CONFIG_PATH]: SAMPLE_CONFIG,
			[COMMENT_PATH]: `/forward-port\nsourceVersionFolder: v1.1.0\ntargetProduct: boundary\ntargetBranch: boundary-test\ntargetVersionFolder: v1.2.0`,
		})

		const { error } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:boundary-1.0'],
			commentFile: COMMENT_PATH,
		})

		expect(error).toContain('forward-port:boundary-1.0')
	})

	it('returns an error when the comment file is missing a required field', () => {
		// Missing targetBranch
		vol.fromJSON({
			[CONFIG_PATH]: SAMPLE_CONFIG,
			[COMMENT_PATH]: `/forward-port forward-port:boundary-1.0\nsourceVersionFolder: v1.1.0\ntargetProduct: boundary\ntargetVersionFolder: v1.2.0`,
		})

		const { error } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:boundary-1.0'],
			commentFile: COMMENT_PATH,
		})

		expect(error).toContain('targetBranch')
	})

	// ── Error cases ───────────────────────────────────────────────────────────

	it('returns an error when no forward-port:* label is present', () => {
		const { error } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['some-label', 'another-label'],
		})

		expect(error).toContain('forward-port:')
	})

	// Intentional for now to avoid potential complex edge cases
	it('returns an error when multiple forward-port:* labels are present', () => {
		const { error } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:vault-test', 'forward-port:tf-test'],
		})

		expect(error).toContain('Multiple')
	})

	it('returns an error when a matching config entry is missing sourceVersionFolder', () => {
		vol.fromJSON({
			[CONFIG_PATH]: `tf-missing-source:\n  targetBranch: rn-test-tf\n  targetVersionFolder: v1.15.x\n  targetProduct: terraform`,
		})

		const { error } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:tf-missing-source'],
		})
		expect(error).toContain('sourceVersionFolder')
	})

	it('returns an error when the config file does not exist', () => {
		vol.reset()
		const { error } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:tf-test'],
		})
		expect(error).toContain('Error')
	})

	// ── Version format tests ──────────────────────────────────────────────────

	it('resolves a semver targetVersionFolder (v1.1.0) correctly', () => {
		const { result } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:tf-test'],
		})
		expect(result.TARGET_BRANCH).toBe('TF-test')
		expect(result.TARGET_VERSION_FOLDER).toBe('v1.1.0')
		expect(result.SOURCE_VERSION_FOLDER).toBe('v1.0.0')
	})

	it('resolves a pre-release targetVersionFolder (v1.1.0-beta) correctly', () => {
		const { result } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:tf-test-beta'],
		})
		expect(result.TARGET_VERSION_FOLDER).toBe('v1.1.0-beta')
		expect(result.SOURCE_VERSION_FOLDER).toBe('v1.0.0')
	})

	it('resolves a release-candidate targetVersionFolder (v1.1.0-rc) correctly', () => {
		const { result } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:tf-test-rc'],
		})
		expect(result.TARGET_VERSION_FOLDER).toBe('v1.1.0-rc')
		expect(result.SOURCE_VERSION_FOLDER).toBe('v1.0.0')
	})

	it('resolves a double-wildcard targetVersionFolder (v10.x.x) correctly', () => {
		const { result } = resolveTarget({
			configPath: CONFIG_PATH,
			labels: ['forward-port:tf-10'],
		})
		expect(result.TARGET_VERSION_FOLDER).toBe('v10.x.x')
		expect(result.SOURCE_VERSION_FOLDER).toBe('v9.x.x')
	})
})
