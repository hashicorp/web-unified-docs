/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */
import fs from 'node:fs'
import path from 'node:path'

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { copySingleAssetFile } from './copy-asset-files.mjs'

describe('copyAssetFile', () => {
	beforeEach(() => {
		vi.spyOn(process, 'cwd').mockReturnValue('/mocked/path')
		vi.spyOn(fs, 'copyFileSync').mockImplementation(() => {})
		vi.spyOn(console, 'log').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})
	it('should copy an asset file to the destination directory', () => {
		const filePath = '/mocked/path/content/asset/file.png'
		const destPath = '/mocked/path/public/assets/asset/file.png'
		const parentDir = path.dirname(destPath)

		vi.spyOn(fs, 'existsSync').mockReturnValue(false)
		vi.spyOn(fs, 'mkdirSync').mockImplementation(() => {
			return parentDir
		})

		copySingleAssetFile(filePath)

		expect(fs.copyFileSync).toHaveBeenCalledWith(filePath, destPath)
		expect(fs.mkdirSync).toHaveBeenCalledWith(parentDir, { recursive: true })
	})

	it('should not create directory if it already exists', () => {
		const filePath = '/mocked/path/content/asset/file.png'
		const destPath = '/mocked/path/public/assets/asset/file.png'

		vi.spyOn(fs, 'existsSync').mockReturnValue(true)
		vi.spyOn(fs, 'mkdirSync')

		copySingleAssetFile(filePath)

		expect(fs.copyFileSync).toHaveBeenCalledWith(filePath, destPath)
		expect(fs.mkdirSync).not.toHaveBeenCalledWith()
	})
})
