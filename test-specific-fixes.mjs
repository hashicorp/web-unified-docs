#!/usr/bin/env node

/**
 * Test script for specific API fixes based on actual log errors
 * Tests real content paths and the specific issues found in Datadog/Vercel logs
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

	// Test 1: terraform-docs-common content (mentioned in original errors)
	await testAPI(
		'/api/content/terraform-docs-common/doc/latest/docs/intro',
		'terraform-docs-common content - path construction fix',
	)

	// Test 2: terraform-enterprise content (mentioned in original errors)
	await testAPI(
		'/api/content/terraform-enterprise/doc/latest/docs/enterprise/cost-estimation',
		'terraform-enterprise content - actual existing path',
	)

	// Test 3: vault content (mentioned in original errors)
	await testAPI(
		'/api/content/vault/doc/latest/docs',
		'vault content - base docs path',
	)

	// Test 4: Test our redirect endpoints
	await testAPI(
		'/api/content/terraform/redirects',
		'terraform redirects endpoint',
	)

	await testAPI(
		'/api/content/terraform-enterprise/redirects',
		'terraform-enterprise redirects endpoint',
	)

	// Test 5: Test path construction with versioned content
	await testAPI(
		'/api/content/terraform/doc/v1.5.x/docs/intro',
		'terraform versioned content - double slash fix',
	)

	// Test 6: Test well-architected-framework (we know this has content)
	await testAPI(
		'/api/content/well-architected-framework/doc/latest/docs',
		'well-architected-framework content',
	)

	// Test 7: Test a deep path we know exists
	await testAPI(
		'/api/content/terraform-enterprise/doc/latest/docs/enterprise/cost-estimation/aws',
		'terraform-enterprise deep path - actual file',
	)

	// Test 8: Test version metadata endpoints
	await testAPI('/api/versionMetadata/terraform', 'terraform version metadata')

	await testAPI(
		'/api/versionMetadata/terraform-enterprise',
		'terraform-enterprise version metadata',
	)

	// Test 9: Test all docs paths endpoint
	await testAPI(
		'/api/docsPathsAllVersions/terraform',
		'terraform all docs paths',
	)

	console.log('\n' + '='.repeat(60))
	console.log('🎯 Tests focused on actual production error scenarios')
	console.log('💡 Look for 200 responses on paths that should work')
	console.log('💡 404s on deep paths might be expected if content moved')
	console.log('💡 Check for clean URLs without double slashes in logs')
}

runTests().catch(console.error)
