/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */
import fs from 'node:fs'
import path from 'node:path'

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { copyNavDataFile } from './copy-nav-data-file.mjs'
import { addVersionToNavData } from '../prebuild/add-version-to-nav-data.mjs'

vi.mock('node:fs')
vi.mock('node:path')
vi.mock('../prebuild/add-version-to-nav-data.mjs')

describe('copyNavDataFile', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should copy the nav data file to the destination path', async () => {
		const filePath = '/server/content/test/navData.json'
		const relativePath = 'test/navData.json'
		const destPath = '/server/public/content/test/navData.json'
		const parentDir = '/server/public/content/test'

		path.relative.mockReturnValue(relativePath)
		path.join.mockReturnValue(destPath)
		path.dirname.mockReturnValue(parentDir)
		const copySpy = vi.spyOn(fs, 'copyFileSync').mockImplementation(() => {})
		const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(false)
		const mkdirSpy = vi.spyOn(fs, 'mkdirSync').mockImplementation(() => {})

		await copyNavDataFile(filePath)

		expect(existsSpy).toHaveBeenCalledWith(parentDir)
		expect(mkdirSpy).toHaveBeenCalledWith(parentDir, { recursive: true })
		expect(copySpy).toHaveBeenCalledWith(filePath, destPath)
		expect(addVersionToNavData).toHaveBeenCalledWith(destPath, {})
	})

	it('should not create directory if it already exists', async () => {
		const filePath = '/server/content/test/navData.json'
		const relativePath = 'test/navData.json'
		const destPath = '/server/public/content/test/navData.json'
		const parentDir = '/server/public/content/test'

		path.relative.mockReturnValue(relativePath)
		path.join.mockReturnValue(destPath)
		path.dirname.mockReturnValue(parentDir)
		const copySpy = vi.spyOn(fs, 'copyFileSync').mockImplementation(() => {})
		const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true)
		const mkdirSpy = vi.spyOn(fs, 'mkdirSync').mockImplementation(() => {})

		await copyNavDataFile(filePath)

		expect(existsSpy).toHaveBeenCalledWith(parentDir)
		expect(mkdirSpy).not.toHaveBeenCalled()
		expect(copySpy).toHaveBeenCalledWith(filePath, destPath)
		expect(addVersionToNavData).toHaveBeenCalledWith(destPath, {})
	})
})
