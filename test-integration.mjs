#!/usr/bin/env node

/**
 * Integration Test Suite for Web Unified Docs API
 *
 * This test suite validates the critical API endpoints and fixes implemented
 * to resolve production issues with content discovery, redirects, and version handling.
 *
 * Run with: npm run test:integration
 *
 * Tests cover:
 * - Version metadata endpoints
 * - Redirect endpoints
 * - Content endpoints with proper path construction
 * - Version resolution (latest vs explicit)
 * - Error handling for missing content
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3001'
const TIMEOUT = 10000 // 10 seconds

// Test colors for better output
const colors = {
	green: '\x1b[32m',
	red: '\x1b[31m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	reset: '\x1b[0m',
	bold: '\x1b[1m',
}

class TestSuite {
	constructor() {
		this.passed = 0
		this.failed = 0
		this.tests = []
	}

	async runTest(name, testFn) {
		process.stdout.write(`${colors.blue}🧪 ${name}${colors.reset} ... `)

		try {
			const startTime = Date.now()
			const result = await Promise.race([
				testFn(),
				new Promise((_, reject) => {
					setTimeout(() => {
						reject(new Error('Test timeout'))
					}, TIMEOUT)
				}),
			])

			const duration = Date.now() - startTime
			console.log(`${colors.green}✅ PASS${colors.reset} (${duration}ms)`)

			this.passed++
			this.tests.push({ name, status: 'PASS', duration, result })
			return result
		} catch (error) {
			console.log(`${colors.red}❌ FAIL${colors.reset}`)
			console.log(`   ${colors.red}Error: ${error.message}${colors.reset}`)

			this.failed++
			this.tests.push({ name, status: 'FAIL', error: error.message })
			return null
		}
	}

	async apiRequest(path, expectedStatus = 200) {
		const url = `${BASE_URL}${path}`
		const { stdout } = await execAsync(`curl -s -w "\\n%{http_code}" "${url}"`)

		const lines = stdout.trim().split('\n')
		const httpCode = parseInt(lines[lines.length - 1])
		const response = lines.slice(0, -1).join('\n')

		if (httpCode !== expectedStatus) {
			throw new Error(
				`Expected ${expectedStatus}, got ${httpCode}. Response: ${response}`,
			)
		}

		let data = null
		if (response && response !== 'Not found') {
			try {
				data = JSON.parse(response)
			} catch {
				// For non-JSON responses (like 404 "Not found"), data stays null
				data = null
			}
		}

		return { httpCode, response, data }
	}

	printSummary() {
		console.log(`\n${colors.bold}📊 Test Results Summary${colors.reset}`)
		console.log(`${colors.green}✅ Passed: ${this.passed}${colors.reset}`)
		console.log(`${colors.red}❌ Failed: ${this.failed}${colors.reset}`)
		console.log(`📈 Total: ${this.passed + this.failed}`)

		if (this.failed > 0) {
			console.log(
				`\n${colors.red}${colors.bold}❌ FAILED TESTS:${colors.reset}`,
			)
			this.tests
				.filter((t) => {
					return t.status === 'FAIL'
				})
				.forEach((t) => {
					console.log(`   ${colors.red}• ${t.name}: ${t.error}${colors.reset}`)
				})
		}

		const success = this.failed === 0
		console.log(
			`\n${success ? colors.green : colors.red}${colors.bold}Overall: ${success ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}${colors.reset}`,
		)

		return success
	}
}

async function runIntegrationTests() {
	console.log(
		`${colors.bold}🚀 Web Unified Docs API Integration Tests${colors.reset}`,
	)
	console.log(`Testing against: ${BASE_URL}\n`)

	const suite = new TestSuite()

	// Test 1: Version Metadata Endpoints
	await suite.runTest('Version metadata - terraform-enterprise', async () => {
		const { data } = await suite.apiRequest(
			'/api/content/terraform-enterprise/version-metadata',
		)

		if (!data.result || !Array.isArray(data.result)) {
			throw new Error('Invalid response structure')
		}

		const latestVersion = data.result.find((v) => {
			return v.isLatest
		})
		if (!latestVersion) {
			throw new Error('No latest version found')
		}

		return {
			latestVersion: latestVersion.version,
			totalVersions: data.result.length,
		}
	})

	await suite.runTest('Version metadata - terraform-docs-common', async () => {
		const { data } = await suite.apiRequest(
			'/api/content/terraform-docs-common/version-metadata',
		)

		if (!data.result || !Array.isArray(data.result)) {
			throw new Error('Invalid response structure')
		}

		return { totalVersions: data.result.length }
	})

	// Test 2: Redirect Endpoints
	await suite.runTest('Redirects - terraform-enterprise', async () => {
		const { data } = await suite.apiRequest(
			'/api/content/terraform-enterprise/redirects',
		)

		if (!Array.isArray(data)) {
			throw new Error('Redirects should return an array')
		}

		if (data.length === 0) {
			throw new Error(
				'No redirects found - this is unexpected for terraform-enterprise',
			)
		}

		return { redirectCount: data.length }
	})

	await suite.runTest('Redirects - terraform-docs-common', async () => {
		const { data } = await suite.apiRequest(
			'/api/content/terraform-docs-common/redirects',
		)

		if (!Array.isArray(data)) {
			throw new Error('Redirects should return an array')
		}

		return { redirectCount: data.length }
	})

	// Test 3: Content Endpoints - Basic Content Discovery
	await suite.runTest('Content - terraform-enterprise index page', async () => {
		const { data } = await suite.apiRequest(
			'/api/content/terraform-enterprise/doc/latest/enterprise',
		)

		if (!data.result || !data.result.metadata) {
			throw new Error('Invalid content response structure')
		}

		if (!data.result.markdownSource) {
			throw new Error('No markdown source found')
		}

		return {
			title: data.result.metadata.page_title,
			version: data.result.version,
			hasContent: data.result.markdownSource.length > 0,
		}
	})

	// Test 4: Version Resolution - Latest vs Explicit
	await suite.runTest('Version resolution - latest vs explicit', async () => {
		// Get latest version
		const { data: versionData } = await suite.apiRequest(
			'/api/content/terraform-enterprise/version-metadata',
		)
		const latestVersion = versionData.result.find((v) => {
			return v.isLatest
		}).version

		// Test latest
		const { data: latestContent } = await suite.apiRequest(
			'/api/content/terraform-enterprise/doc/latest/enterprise',
		)

		// Test explicit version
		const { data: explicitContent } = await suite.apiRequest(
			`/api/content/terraform-enterprise/doc/${latestVersion}/enterprise`,
		)

		if (!latestContent.result || !explicitContent.result) {
			throw new Error('Failed to get content for version comparison')
		}

		return {
			latestVersion,
			latestWorks: !!latestContent.result.markdownSource,
			explicitWorks: !!explicitContent.result.markdownSource,
			contentMatches:
				latestContent.result.markdownSource ===
				explicitContent.result.markdownSource,
		}
	})

	// Test 5: Error Handling - Missing Content
	await suite.runTest(
		'Error handling - missing content returns 404',
		async () => {
			await suite.apiRequest(
				'/api/content/terraform-enterprise/doc/latest/nonexistent-page',
				404,
			)
			return { errorHandlingWorks: true }
		},
	)

	await suite.runTest(
		'Error handling - invalid product returns 404',
		async () => {
			await suite.apiRequest(
				'/api/content/invalid-product/doc/latest/docs',
				404,
			)
			return { errorHandlingWorks: true }
		},
	)

	// Test 6: Path Construction - No Double Slashes
	await suite.runTest(
		'Path construction - handles various path formats',
		async () => {
			// Test that our path construction fixes work by testing known content
			const { data } = await suite.apiRequest(
				'/api/content/terraform-enterprise/doc/latest/enterprise',
			)

			if (!data.result || !data.result.githubFile) {
				throw new Error('No github file path in response')
			}

			// Verify no double slashes in the constructed path
			const githubFile = data.result.githubFile
			if (githubFile.includes('//')) {
				throw new Error(`Double slash found in path: ${githubFile}`)
			}

			return {
				githubFile,
				hasDoubleSlash: githubFile.includes('//'),
				pathConstructionFixed: !githubFile.includes('//'),
			}
		},
	)

	// Test 7: Performance Check
	await suite.runTest(
		'Performance - API responses under 2 seconds',
		async () => {
			const startTime = Date.now()
			await suite.apiRequest(
				'/api/content/terraform-enterprise/version-metadata',
			)
			const duration = Date.now() - startTime

			if (duration > 2000) {
				throw new Error(`Response too slow: ${duration}ms (should be < 2000ms)`)
			}

			return { responseTime: duration }
		},
	)

	const success = suite.printSummary()
	process.exit(success ? 0 : 1)
}

// Handle errors and run tests
process.on('uncaughtException', (error) => {
	console.error(
		`${colors.red}💥 Uncaught Exception: ${error.message}${colors.reset}`,
	)
	process.exit(1)
})

process.on('unhandledRejection', (error) => {
	console.error(
		`${colors.red}💥 Unhandled Rejection: ${error.message}${colors.reset}`,
	)
	process.exit(1)
})

// Run the tests
runIntegrationTests().catch((error) => {
	console.error(
		`${colors.red}💥 Test suite failed: ${error.message}${colors.reset}`,
	)
	process.exit(1)
})
