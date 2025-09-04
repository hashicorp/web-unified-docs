#!/usr/bin/env node
/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

import { execSync } from 'node:child_process'
import { platform, arch } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	existsSync,
	writeFileSync,
	chmodSync,
	readFileSync,
	unlinkSync,
} from 'node:fs'
import { gunzipSync } from 'node:zlib'

function unGzip(filename) {
	const compressedFile = `${filename}.gz`
	const compressedData = readFileSync(compressedFile)
	const decompressedData = gunzipSync(compressedData)
	writeFileSync(filename, decompressedData)
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Detect system architecture and run the appropriate prebuild program
 */
async function runPrebuild() {
	const systemPlatform = platform()
	const systemArch = arch()

	console.log(
		`Detected platform: ${systemPlatform}, architecture: ${systemArch}`,
	)

	let filename
	let binaryExists = false

	if (systemPlatform === 'darwin' && systemArch === 'arm64') {
		binaryExists = true
		filename = `${path.join(__dirname, 'prebuild-arm-mac-binary')}`
		console.log('Running prebuild binary for ARM Mac...')
	} else if (systemPlatform === 'linux' && systemArch === 'x64') {
		binaryExists = true
		filename = `${path.join(__dirname, 'prebuild-x64-linux-binary')}`
		console.log('Running prebuild binary for x64 Linux...')
	} else {
		// Default fallback
		filename = `node ${path.join(__dirname, 'prebuild.mjs')}`
		console.log('Running default node prebuild...')
	}

	if (binaryExists) {
		try {
			if (existsSync(filename)) {
				unlinkSync(filename)
			}

			unGzip(filename)
			chmodSync(filename, 0o755) // Ensure the binary is executable
		} catch (error) {
			console.error(
				`Error during gzip operation: ${error.message}.\n\nFalling back to default node prebuild...`,
			)

			filename = `node ${path.join(__dirname, 'prebuild.mjs')}`
		}
	}

	try {
		console.log(`\n`)

		// Execute the prebuild binary with the same arguments passed in
		const args = process.argv.slice(2).join(' ')
		const command = args ? `${filename} ${args}` : filename
		execSync(command, { stdio: 'inherit' })
	} catch (error) {
		console.error('Prebuild failed:', error.message)
		process.exit(1)
	}
}

await runPrebuild()
