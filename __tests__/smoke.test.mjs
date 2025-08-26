#!/usr/bin/env node

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Smoke Test Suite
 *
 * Basic health checks for known-working content endpoints.
 * These tests verify that fundamental API functionality is working
 * by testing content paths that are known to exist and work correctly.
 *
 * Usage: npm run test:smoke
 */

const BASE_URL = 'http://localhost:3001'

const testAPI = async (endpoint, description) => {
	try {
		console.log(`\n🧪 Testing: ${description}`)
		console.log(`   Endpoint: ${endpoint}`)

		const response = await fetch(`${BASE_URL}${endpoint}`)
		const { status } = response

		if (status === 200) {
			const contentType = response.headers.get('content-type')

			if (contentType?.includes('application/json')) {
				const data = await response.json()
				console.log(`   ✅ SUCCESS (${status}) - JSON response`)

				const contentLength = data.content?.length
				const githubFile = data.githubFile ?? 'N/A'
				const arrayLength = data.length

				if (contentLength) {
					console.log(`   📄 Content length: ${contentLength} chars`)
					console.log(`   🔗 Path in response: ${githubFile}`)
				}

				if (arrayLength) {
					console.log(`   📋 Array with ${arrayLength} items`)
				}
			} else {
				const text = await response.text()
				console.log(
					`   ✅ SUCCESS (${status}) - Text response (${text.length} chars)`,
				)
			}
		} else if (status === 404) {
			console.log(
				`   ❌ NOT FOUND (${status}) - Content missing or path incorrect`,
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

const runKnownContentTests = async () => {
	console.log('🚀 Testing Known Existing Content Paths\n')
	console.log('='.repeat(60))

	// Test 1: Known terraform-enterprise content with specific version
	await testAPI(
		'/api/content/terraform-enterprise/doc/v202411-2/enterprise/cost-estimation/aws',
		'TFE cost estimation AWS page (known to exist)',
	)

	// Test 2: Known terraform-enterprise index page
	await testAPI(
		'/api/content/terraform-enterprise/doc/v202411-2/enterprise/cost-estimation',
		'TFE cost estimation index (known to exist)',
	)

	// Test 3: Working redirects endpoint
	await testAPI(
		'/api/content/terraform-enterprise/redirects',
		'TFE redirects (working earlier)',
	)

	// Test 4: Test "latest" vs specific version
	await testAPI(
		'/api/content/terraform-enterprise/doc/latest/enterprise/cost-estimation',
		'TFE latest version content',
	)

	// Test 5: Check if terraform content exists
	await testAPI(
		'/api/content/terraform/doc/v1.5.x/intro',
		'Terraform v1.5.x intro',
	)

	// Test 6: Check path without double slashes
	await testAPI(
		'/api/content/terraform/doc/latest/intro',
		'Terraform latest intro (testing path construction)',
	)

	// Test 7: Well-architected framework with correct structure
	await testAPI(
		'/api/content/well-architected-framework/doc/latest/docs/define-and-automate-processes',
		'WAF content (checking if structure different)',
	)

	console.log('\n' + '='.repeat(60))
	console.log('🎯 Testing paths we know should exist based on file system')
	console.log(
		'💡 These tests validate our path construction and redirect fixes',
	)
}

runKnownContentTests().catch(console.error)
