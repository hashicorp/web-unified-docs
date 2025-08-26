#!/usr/bin/env node

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Production Regression Test Suite
 *
 * Tests specific API endpoints and paths that were failing in production
 * based on actual error logs from Datadog and Vercel monitoring.
 *
 * This suite validates fixes for known production issues including:
 * - Path construction problems
 * - Product slug mapping issues
 * - Content discovery failures
 *
 * Usage: npm run test:production-regression
 */

const BASE_URL = 'http://localhost:3001'

async function testAPI(endpoint, description) {
	try {
		console.log(`\n🧪 Testing: ${description}`)
		console.log(`   Endpoint: ${endpoint}`)

		const response = await fetch(`${BASE_URL}${endpoint}`)
		const status = response.status

		if (status === 200) {
			const contentType = response.headers.get('content-type')
			if (contentType?.includes('application/json')) {
				const data = await response.json()
				console.log(
					`   ✅ SUCCESS (${status}) - JSON response with ${Object.keys(data).length} keys`,
				)
				if (data.content) {
					console.log(`   📄 Content length: ${data.content.length} chars`)
				}
			} else {
				const text = await response.text()
				console.log(
					`   ✅ SUCCESS (${status}) - Text response (${text.length} chars)`,
				)
			}
		} else if (status === 404) {
			console.log(
				`   ❌ NOT FOUND (${status}) - This might be expected if content doesn't exist`,
			)
		} else {
			console.log(`   ⚠️  UNEXPECTED STATUS (${status})`)
			const text = await response.text()
			console.log(`   Response: ${text.substring(0, 200)}...`)
		}
	} catch (error) {
		console.log(`   💥 ERROR: ${error.message}`)
	}
}

async function runTests() {
	console.log('🚀 Testing Specific API Fixes Based on Production Errors\n')
	console.log('='.repeat(60))

	// Test 1: terraform-enterprise content that exists
	await testAPI(
		'/api/content/terraform-enterprise/doc/latest/enterprise/index',
		'terraform-enterprise main index - path construction fix',
	)

	// Test 2: terraform-enterprise cost estimation (real content)
	await testAPI(
		'/api/content/terraform-enterprise/doc/latest/enterprise/cost-estimation',
		'terraform-enterprise cost estimation - actual existing path',
	)

	// Test 3: vault content with correct path structure and specific version
	await testAPI(
		'/api/content/vault/doc/v1.18.x/docs/what-is-vault',
		'vault what-is-vault - real content path with specific version',
	)

	// Test 4: terraform-enterprise versioned content
	await testAPI(
		'/api/content/terraform-enterprise/doc/v202411-2/enterprise/cost-estimation/aws',
		'terraform-enterprise versioned deep path - real file',
	)

	// Test 5: Test redirect endpoints that work
	await testAPI(
		'/api/content/terraform-enterprise/redirects',
		'terraform-enterprise redirects endpoint',
	)

	await testAPI('/api/content/vault/redirects', 'vault redirects endpoint')

	// Test 7: Test specific terraform-enterprise versioned content
	await testAPI(
		'/api/content/terraform-enterprise/doc/v202411-2/enterprise/cost-estimation/aws',
		'terraform-enterprise versioned deep path - real file',
	)

	console.log('\n' + '='.repeat(60))
	console.log('🎯 Tests focused on actual production error scenarios')
	console.log('💡 All paths tested should return 200 - real content only')
	console.log('💡 Any 404s indicate actual routing/path construction issues')
	console.log('💡 Check for clean URLs without double slashes in logs')
}

runTests().catch(console.error)
