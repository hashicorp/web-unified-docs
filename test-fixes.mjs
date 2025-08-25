#!/usr/bin/env node

/**
 * Simple test script to verify the API fixes work
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

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
				response.includes('"metadata"')
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

	const baseUrl = 'http://localhost:3000' // Adjust if running on different port

	// Test cases based on the original errors
	const testCases = [
		// terraform-docs-common content (should work with fixes)
		{
			url: `${baseUrl}/api/content/terraform-docs-common/doc/latest/docs/index`,
			description: 'terraform-docs-common basic docs page',
		},

		// terraform-enterprise content with potential redirect
		{
			url: `${baseUrl}/api/content/terraform-enterprise/doc/v202409-1/enterprise/admin/agents-on-tfe`,
			description: 'terraform-enterprise old path (should redirect)',
		},

		{
			url: `${baseUrl}/api/content/terraform-enterprise/doc/v202409-1/enterprise/application-administration/agents-on-tfe`,
			description: 'terraform-enterprise new path (should work directly)',
		},

		// Test version metadata endpoints
		{
			url: `${baseUrl}/api/content/terraform-docs-common/version-metadata`,
			description: 'terraform-docs-common version metadata',
		},

		{
			url: `${baseUrl}/api/content/terraform-enterprise/version-metadata`,
			description: 'terraform-enterprise version metadata',
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
