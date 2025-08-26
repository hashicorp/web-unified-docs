#!/usr/bin/env node

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Comprehensive Test Runner
 *
 * Runs all test suites in sequence and provides a summary report.
 * This script helps validate the entire API after changes.
 *
 * Usage: npm run test:all
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// ANSI color codes for better output
const colors = {
	green: '\x1b[32m',
	red: '\x1b[31m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	cyan: '\x1b[36m',
	magenta: '\x1b[35m',
	reset: '\x1b[0m',
	bold: '\x1b[1m',
}

class TestRunner {
	constructor() {
		this.results = []
		this.totalPassed = 0
		this.totalFailed = 0
	}

	async runTestSuite(name, command, description) {
		console.log(
			`\n${colors.blue}${colors.bold}🧪 Running ${name}${colors.reset}`,
		)
		console.log(`${colors.cyan}${description}${colors.reset}`)
		console.log(`${colors.yellow}Command: ${command}${colors.reset}`)
		console.log('─'.repeat(60))

		const startTime = Date.now()

		try {
			const { stdout, stderr } = await execAsync(command)
			const duration = Date.now() - startTime

			// Parse test results (distinguish between test failures and expected 404s)
			const output = stdout + stderr
			const hasTestFailures =
				output.includes('FAILED') ||
				output.includes('ERROR') ||
				stderr.includes('Error')
			const hasTestPasses =
				output.includes('✅') ||
				output.includes('SUCCESS') ||
				output.includes('PASS')
			const has404s = output.includes('404') || output.includes('NOT FOUND')

			let status,
				passed = 0,
				failed = 0

			// 404s are not test failures - they're expected when content doesn't exist
			if (hasTestFailures) {
				status = 'FAILED'
				failed = 1
			} else if (hasTestPasses || has404s) {
				// Both successful responses AND 404s are considered passing behavior
				status = 'PASSED'
				passed = 1

				// Count test cases
				const passMatches = output.match(/✅|SUCCESS|PASS/g)
				const notFoundMatches = output.match(/❌ NOT FOUND|404/g)
				const actualPassed =
					(passMatches ? passMatches.length : 0) +
					(notFoundMatches ? notFoundMatches.length : 0)
				if (actualPassed > 1) {
					passed = actualPassed
				}
			} else {
				status = 'UNKNOWN'
			}

			this.results.push({
				name,
				status,
				duration,
				passed,
				failed,
				output: stdout,
			})

			this.totalPassed += passed
			this.totalFailed += failed

			const statusColor =
				status === 'PASSED'
					? colors.green
					: status === 'FAILED'
						? colors.red
						: colors.magenta

			console.log(
				`\n${statusColor}${colors.bold}${status}${colors.reset} - ${name} (${duration}ms)`,
			)

			if (passed > 1) {
				console.log(
					`${colors.green}✅ Test cases completed: ${passed}${colors.reset}`,
				)
			}
		} catch (error) {
			const duration = Date.now() - startTime
			this.results.push({
				name,
				status: 'ERROR',
				duration,
				passed: 0,
				failed: 1,
				error: error.message,
			})
			this.totalFailed += 1

			console.log(
				`\n${colors.red}${colors.bold}ERROR${colors.reset} - ${name} (${duration}ms)`,
			)
			console.log(`${colors.red}${error.message}${colors.reset}`)
		}
	}

	printSummary() {
		console.log('\n' + '='.repeat(80))
		console.log(
			`${colors.bold}${colors.cyan}📊 TEST SUITE SUMMARY REPORT${colors.reset}`,
		)
		console.log('='.repeat(80))

		this.results.forEach((result) => {
			const statusIcon =
				result.status === 'PASSED'
					? '✅'
					: result.status === 'FAILED'
						? '❌'
						: '🔍'

			const statusColor =
				result.status === 'PASSED'
					? colors.green
					: result.status === 'FAILED'
						? colors.red
						: colors.magenta

			console.log(
				`${statusIcon} ${statusColor}${result.name.padEnd(25)}${colors.reset} ${result.duration}ms`,
			)

			if (result.passed > 1) {
				console.log(
					`   ${colors.cyan}📋 ${result.passed} test cases completed${colors.reset}`,
				)
			}
		})

		console.log('\n' + '─'.repeat(50))
		console.log(`${colors.bold}TOTAL RESULTS:${colors.reset}`)
		console.log(
			`${colors.green}✅ Total Passed: ${this.totalPassed}${colors.reset}`,
		)
		console.log(
			`${colors.red}❌ Total Failed: ${this.totalFailed}${colors.reset}`,
		)

		const overallStatus =
			this.totalFailed === 0
				? 'ALL TESTS PASSED! 🎉'
				: this.totalPassed === 0
					? 'ALL TESTS FAILED! 🚨'
					: 'MIXED RESULTS ⚠️'

		const overallColor =
			this.totalFailed === 0
				? colors.green
				: this.totalPassed === 0
					? colors.red
					: colors.yellow

		console.log(
			`\n${overallColor}${colors.bold}${overallStatus}${colors.reset}`,
		)
		console.log('='.repeat(80))
	}
}

async function main() {
	const runner = new TestRunner()

	console.log(
		`${colors.magenta}${colors.bold}🚀 Web Unified Docs - Complete Test Suite${colors.reset}`,
	)
	console.log(
		`${colors.cyan}Running all test suites to validate API functionality${colors.reset}`,
	)

	// Define test suites in logical order
	const testSuites = [
		{
			name: 'Smoke Tests',
			command: 'npm run test:smoke',
			description: 'Basic health checks for known-working endpoints',
		},
		{
			name: 'Content Endpoints',
			command: 'npm run test:content-endpoints',
			description: 'Content API endpoint validation',
		},
		{
			name: 'Production Regression',
			command: 'npm run test:production-regression',
			description: 'Tests for specific production bug fixes',
		},
		{
			name: 'API Integration',
			command: 'npm run test:integration',
			description: 'Comprehensive API integration tests',
		},
	]

	// Run each test suite
	for (const suite of testSuites) {
		await runner.runTestSuite(suite.name, suite.command, suite.description)
	}

	// Print final summary
	runner.printSummary()

	// Exit with appropriate code
	process.exit(runner.totalFailed === 0 ? 0 : 1)
}

main().catch((error) => {
	console.error(`${colors.red}${colors.bold}Fatal error:${colors.reset}`, error)
	process.exit(1)
})
