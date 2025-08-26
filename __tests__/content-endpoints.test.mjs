#!/usr/bin/env node

/**
 * Content Endpoints Test Suite
 *
 * Tests content API endpoints to verify they return proper responses
 * for various content types including documentation, redirects, and metadata.
 *
 * Usage: npm run test:content-endpoints
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Try to detect which port is available (3000 first, then 3001)
async function detectBaseUrl() {
	if (process.env.TEST_BASE_URL) {
		return process.env.TEST_BASE_URL
	}

	try {
		// Try port 3000 first (standard Next.js dev port)
		await execAsync(
			'curl -s --connect-timeout 2 http://localhost:3000/api/content/terraform/version-metadata',
		)
		console.log('🔗 Using port 3000')
		return 'http://localhost:3000'
	} catch {
		try {
			// Fallback to port 3001
			await execAsync(
				'curl -s --connect-timeout 2 http://localhost:3001/api/content/terraform/version-metadata',
			)
			console.log('🔗 Using port 3001')
			return 'http://localhost:3001'
		} catch {
			console.log('🔗 No server detected, defaulting to port 3000')
			return 'http://localhost:3000'
		}
	}
}

const BASE_URL = await detectBaseUrl()

async function testAPIEndpoint(url, description) {
	console.log(`\n🧪 Testing: ${description}`)
	console.log(`URL: ${url}`)

	try {
		const { stdout, stderr } = await execAsync(
			`curl -s -w "%{http_code}" "${url}"`,
		)
		const httpCode = stdout.slice(-3)
		const response = stdout.slice(0, -3)

		console.log(`Status: ${httpCode}`)

		if (httpCode === '200') {
			console.log(`✅ SUCCESS`)
			// Check if response contains valid content
			if (
				response.includes('"markdownSource"') ||
				response.includes('"metadata"') ||
				response.includes('"redirects"') ||
				response.startsWith('[') // Array response for redirects
			) {
				console.log(`✅ Response contains valid content structure`)
			} else {
				console.log(`⚠️  Response doesn't contain expected content structure`)
			}
		} else if (httpCode === '404') {
			console.log(`❌ 404 Not Found`)
		} else {
			console.log(`⚠️  Unexpected status code`)
		}

		if (stderr) {
			console.log(`Stderr: ${stderr}`)
		}
	} catch (error) {
		console.log(`❌ Error: ${error.message}`)
	}
}

async function runTests() {
	console.log('🚀 Testing Web Unified Docs API Fixes\n')

	const baseUrl = BASE_URL // Dev server running on port 3001

	// Test cases using real existing content paths
	const testCases = [
		// terraform-enterprise content that definitely exists
		{
			url: `${baseUrl}/api/content/terraform-enterprise/doc/latest/enterprise/index`,
			description: 'terraform-enterprise main index page',
		},

		{
			url: `${baseUrl}/api/content/terraform-enterprise/doc/latest/enterprise/cost-estimation`,
			description: 'terraform-enterprise cost estimation page',
		},

		{
			url: `${baseUrl}/api/content/terraform-enterprise/doc/latest/enterprise/cost-estimation/aws`,
			description: 'terraform-enterprise cost estimation AWS page',
		},

		// vault content with correct path structure (includes /docs/)
		{
			url: `${baseUrl}/api/content/vault/doc/v1.18.x/docs/what-is-vault`,
			description: 'vault what-is-vault page (specific version)',
		},

		// Test redirects endpoints that work
		{
			url: `${baseUrl}/api/content/terraform-enterprise/redirects`,
			description: 'terraform-enterprise redirects',
		},
	]

	for (const testCase of testCases) {
		await testAPIEndpoint(testCase.url, testCase.description)
	}

	console.log('\n🏁 Tests completed!')
	console.log('\nNote: These tests require the dev server to be running.')
	console.log('Start with: npm run dev')
}

runTests().catch(console.error)
