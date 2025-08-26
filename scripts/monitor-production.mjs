#!/usr/bin/env node

/**
 * Production Monitoring Script for Web Unified Docs API
 *
 * This script monitors the production API endpoints to ensure they remain healthy
 * and sends alerts if critical functionality breaks.
 *
 * Run with: node scripts/monitor-production.mjs
 *
 * Can be scheduled to run every 15 minutes via cron:
 * 0,15,30,45 * * * * cd /path/to/web-unified-docs && node scripts/monitor-production.mjs
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Configuration
const PRODUCTION_URL = 'https://web-unified-docs.vercel.app'
const STAGING_URL = 'https://web-unified-docs-staging.vercel.app' // adjust as needed
const TIMEOUT = 30000 // 30 seconds for production

// Critical endpoints to monitor
const CRITICAL_ENDPOINTS = [
	{
		name: 'Terraform Enterprise Version Metadata',
		path: '/api/content/terraform-enterprise/version-metadata',
		validation: (data) => {
			if (!data.result || !Array.isArray(data.result)) {
				return 'Invalid response structure'
			}
			if (data.result.length === 0) {
				return 'No versions found'
			}
			if (
				!data.result.find((v) => {
					return v.isLatest
				})
			) {
				return 'No latest version found'
			}
			return null
		},
	},
	{
		name: 'Terraform Enterprise Redirects',
		path: '/api/content/terraform-enterprise/redirects',
		validation: (data) => {
			if (!Array.isArray(data)) {
				return 'Redirects should be an array'
			}
			if (data.length === 0) {
				return 'No redirects found'
			}
			return null
		},
	},
	{
		name: 'Terraform Enterprise Content',
		path: '/api/content/terraform-enterprise/doc/latest/enterprise',
		validation: (data) => {
			if (!data.result) {
				return 'No result in response'
			}
			if (!data.result.markdownSource) {
				return 'No markdown source'
			}
			if (!data.result.metadata) {
				return 'No metadata'
			}
			return null
		},
	},
	{
		name: 'Terraform Docs Common Version Metadata',
		path: '/api/content/terraform-docs-common/version-metadata',
		validation: (data) => {
			if (!data.result || !Array.isArray(data.result)) {
				return 'Invalid response structure'
			}
			return null
		},
	},
]

class ProductionMonitor {
	constructor(baseUrl) {
		this.baseUrl = baseUrl
		this.results = []
		this.errors = []
	}

	async checkEndpoint(endpoint) {
		const url = `${this.baseUrl}${endpoint.path}`

		try {
			const startTime = Date.now()
			const { stdout } = await execAsync(
				`curl -s -w "\\n%{http_code}" "${url}"`,
				{
					timeout: TIMEOUT,
				},
			)

			const lines = stdout.trim().split('\n')
			const httpCode = parseInt(lines[lines.length - 1])
			const response = lines.slice(0, -1).join('\n')
			const duration = Date.now() - startTime

			if (httpCode !== 200) {
				throw new Error(`HTTP ${httpCode}: ${response}`)
			}

			let data
			try {
				data = JSON.parse(response)
			} catch {
				throw new Error(
					`Invalid JSON response: ${response.substring(0, 100)}...`,
				)
			}

			// Run endpoint-specific validation
			const validationError = endpoint.validation(data)
			if (validationError) {
				throw new Error(`Validation failed: ${validationError}`)
			}

			this.results.push({
				name: endpoint.name,
				status: 'SUCCESS',
				duration,
				httpCode,
				timestamp: new Date().toISOString(),
			})

			return true
		} catch (error) {
			this.errors.push({
				name: endpoint.name,
				status: 'FAILED',
				error: error.message,
				url,
				timestamp: new Date().toISOString(),
			})

			return false
		}
	}

	async runAllChecks() {
		console.log(`🔍 Monitoring API endpoints at ${this.baseUrl}`)
		console.log(`Timestamp: ${new Date().toISOString()}\n`)

		const checks = CRITICAL_ENDPOINTS.map((endpoint) => {
			return this.checkEndpoint(endpoint)
		})
		await Promise.all(checks)

		return this.generateReport()
	}

	generateReport() {
		const total = this.results.length + this.errors.length
		const successCount = this.results.length
		const failureCount = this.errors.length
		const successRate = Math.round((successCount / total) * 100)

		console.log(`📊 Monitoring Results:`)
		console.log(`✅ Successful: ${successCount}/${total} (${successRate}%)`)
		console.log(`❌ Failed: ${failureCount}/${total}`)

		if (this.results.length > 0) {
			console.log(`\n✅ Successful Endpoints:`)
			this.results.forEach((result) => {
				console.log(`   • ${result.name} - ${result.duration}ms`)
			})
		}

		if (this.errors.length > 0) {
			console.log(`\n❌ Failed Endpoints:`)
			this.errors.forEach((error) => {
				console.log(`   • ${error.name}: ${error.error}`)
			})
		}

		const isHealthy = failureCount === 0
		const avgResponseTime =
			this.results.length > 0
				? Math.round(
						this.results.reduce((sum, r) => {
							return sum + r.duration
						}, 0) / this.results.length,
					)
				: 0

		console.log(
			`\n🏥 Overall Health: ${isHealthy ? '✅ HEALTHY' : '❌ UNHEALTHY'}`,
		)
		console.log(`⏱️ Average Response Time: ${avgResponseTime}ms`)

		// Return data for external monitoring systems
		return {
			healthy: isHealthy,
			successRate,
			avgResponseTime,
			timestamp: new Date().toISOString(),
			results: this.results,
			errors: this.errors,
		}
	}

	// Send alerts for critical failures
	async sendAlert(report) {
		if (!report.healthy) {
			// Here you could integrate with:
			// - Slack webhooks
			// - PagerDuty
			// - Email notifications
			// - DataDog events

			console.log(`\n🚨 ALERT: API health check failed!`)
			console.log(`🔗 Environment: ${this.baseUrl}`)
			console.log(`📉 Success Rate: ${report.successRate}%`)
			console.log(`⏰ Time: ${report.timestamp}`)

			if (process.env.SLACK_WEBHOOK_URL) {
				// Example Slack integration
				const message = {
					text: `🚨 Web Unified Docs API Alert`,
					blocks: [
						{
							type: 'section',
							text: {
								type: 'mrkdwn',
								text:
									`*API Health Check Failed*\n\n` +
									`Environment: ${this.baseUrl}\n` +
									`Success Rate: ${report.successRate}%\n` +
									`Failed Endpoints: ${report.errors.length}\n` +
									`Time: ${report.timestamp}`,
							},
						},
					],
				}

				try {
					await execAsync(
						`curl -X POST -H 'Content-type: application/json' ` +
							`--data '${JSON.stringify(message)}' ${process.env.SLACK_WEBHOOK_URL}`,
					)
					console.log(`📱 Alert sent to Slack`)
				} catch (e) {
					console.log(`❌ Failed to send Slack alert: ${e.message}`)
				}
			}
		}
	}
}

async function main() {
	const environment = process.argv[2] || 'production'
	const baseUrl = environment === 'staging' ? STAGING_URL : PRODUCTION_URL

	const monitor = new ProductionMonitor(baseUrl)

	try {
		const report = await monitor.runAllChecks()
		await monitor.sendAlert(report)

		// Exit with error code if unhealthy (useful for CI/CD)
		process.exit(report.healthy ? 0 : 1)
	} catch (error) {
		console.error(`💥 Monitoring failed: ${error.message}`)
		process.exit(1)
	}
}

// Run monitoring
if (import.meta.url === `file://${process.argv[1]}`) {
	main()
}
