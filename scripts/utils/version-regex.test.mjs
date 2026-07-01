/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { describe, test, expect } from 'vitest'
import { isVersionPathSegment } from './version-regex.mjs'

describe('isVersionPathSegment', () => {
	test('returns true for three-part versions with a v prefix', () => {
		expect(isVersionPathSegment('v1.21.x')).toBe(true)
	})

	test('returns true for two-part versions with a v prefix', () => {
		expect(isVersionPathSegment('v2.x')).toBe(true)
	})

	test('returns true for two-part versions without a v prefix', () => {
		expect(isVersionPathSegment('2.x')).toBe(true)
	})

	test('returns true for Terraform Enterprise versions', () => {
		expect(isVersionPathSegment('v202410-1')).toBe(true)
	})

	test('returns false for non-version strings', () => {
		expect(isVersionPathSegment('docs')).toBe(false)
	})
})
