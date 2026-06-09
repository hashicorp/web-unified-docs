/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import path from 'path'
import fs from 'fs'

import dotenv from 'dotenv'
import { client, v1 } from '@datadog/datadog-api-client'

const NEXTJS_TRACE_FILE = './.next/trace'
const PREBUILD_TRACE_FILE = './scripts/prebuild/trace'
const EVENTS = [
	'next-build',
	'prebuild',
	'run-webpack-compiler',
	'static-generation',
	'next-export',
]

/**
 * @typedef {Object} BuildEvent
 * @property {string} name The name of the build event, e.g. 'next-build', 'prebuild', etc.
 * @property {number} duration The duration of the event in milliseconds
 * @property {number} [timestamp] A unix timestamp to represent the time of the event.
 * @property {[string, string][]} tags A tuple of key/value pairs to be sent with the metric
 */

async function readTraceFile(traceFilePath) {
	const filepath = path.join(process.cwd(), traceFilePath)

	const content = await fs.promises.readFile(filepath, { encoding: 'utf-8' })

	// The trace file consists of multiple JSON arrays separated by newlines
	// This gives us an array of un-parsed JSON arrays
	const parts = content.trim().split('\n')

	// Parse the arrays from the trace and flatten the full array, giving us a flat list of events
	return parts
		.map((part) => {
			return JSON.parse(part)
		})
		.flat()
}

/**
 * Submit build metrics to datadog
 * @param {BuildEvent[]} metrics
 */
const submitDatadogMetrics = async (metrics) => {
	const configuration = client.createConfiguration()
	const api = new v1.MetricsApi(configuration)

	// Send metrics to datadog API
	await api.submitMetrics({
		body: {
			// Convert the build events into a format datadog understands
			series: metrics.map(({ timestamp, tags, ...event }) => {
				return {
					host: '',
					metric: `build.${event.name}`,
					points: [
						[
							timestamp ?? Math.round(Date.now() / 1e3),
							Math.round(event.duration / 1e3),
						],
					],
					tags: tags.map(([key, value]) => {
						return `${key}:${value}`
					}),
					type: 'gauge',
				}
			}),
		},
	})
	const tags = metrics[0].tags.map(([key, value]) => {
		return `${key}:${value}`
	})
	console.log(
		`〽️ Submitted build metrics to Datadog:\n${JSON.stringify(tags, null, 2)}`,
	)
}

/**
 * Submit build metrics to Instana OpenTelemetry endpoint
 *
 * @param {BuildEvent[]} metrics
 */
const submitInstanaMetrics = async (metrics) => {
	const payload = {
		resourceMetrics: [
			{
				resource: {
					attributes: [
						{
							key: 'service.name',
							value: {
								stringValue: metrics[0].tags.find(([key]) => {
									return key === 'app'
								})?.[1],
							},
						},
					],
				},
				scopeMetrics: [
					{
						scope: {
							name: 'capture-build-metrics',
						},
						metrics: metrics.map(({ timestamp, tags, ...event }) => {
							const unixTimeNs = (
								BigInt(timestamp ?? Math.round(Date.now() / 1e3)) *
								1_000_000_000n
							).toString()

							return {
								name: `build.${event.name}`,
								description: 'Build event duration',
								unit: 's',
								gauge: {
									dataPoints: [
										{
											attributes: tags.map(([key, value]) => {
												return {
													key,
													value: { stringValue: value },
												}
											}),
											asDouble: Math.round(event.duration / 1e3),
											timeUnixNano: unixTimeNs,
										},
									],
								},
							}
						}),
					},
				],
			},
		],
	}
	const response = await fetch(
		'https://otlp-http-red-saas.instana.io:443/v1/metrics',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-instana-key': process.env.INSTANA_OTLP_API_TOKEN,
			},
			body: JSON.stringify(payload),
		},
	)
	if (![200, 202].includes(response.status)) {
		const responseText = await response.text()
		throw new Error(
			`Failed to submit metrics to Instana. Status: ${response.status}, Response: ${responseText}`,
		)
	}

	const tags = metrics[0].tags.map(([key, value]) => {
		return `${key}:${value}`
	})
	console.log(
		`〽️ Submitted build metrics to Instana:\n${JSON.stringify(tags, null, 2)}`,
	)
}

async function main() {
	const [, , appName = 'web-unified-docs'] = process.argv
	const incBuild = process.env.INCREMENTAL_BUILD === 'true'

	try {
		const envLocalPath = '.env.local'
		dotenv.config({
			path: fs.existsSync(envLocalPath) ? [envLocalPath, '.env'] : '.env',
		})

		// It's important that this remains a constant variable rather than
		// being incorprated into the `.map()` call as we don't want it to be
		// re-evaluated for each run through the loop. We want it to remain fixed
		const timestamp = Math.round(Date.now() / 1e3)

		// Read trace files
		const nextjsTrace = await readTraceFile(NEXTJS_TRACE_FILE)
		const prebuildTrace = await readTraceFile(PREBUILD_TRACE_FILE)

		const environment = process.env.CI ? 'ci' : 'local'
		const buildType = incBuild ? 'incremental' : 'full'

		const filteredEvents = [...nextjsTrace, ...prebuildTrace]
			.filter((event) => {
				return EVENTS.includes(event.name)
			})
			.map((event) => {
				return {
					...event,
					tags: [
						['app', appName],
						['environment', environment],
						['buildType', buildType],
					],
					timestamp,
				}
			})

		const results = await Promise.allSettled([
			submitDatadogMetrics(filteredEvents),
			submitInstanaMetrics(filteredEvents),
		])

		const failedSubmissions = results
			.filter(({ status }) => {
				return status === 'rejected'
			})
			.map(({ reason }) => {
				return reason
			})
		if (failedSubmissions.length > 0) {
			throw new AggregateError(failedSubmissions)
		}
	} catch (error) {
		// Swallow errors
		// we don't want to impact the build or make it seem like there's been
		// an error in the actual app if something goes wrong when sending metrics
		if (process.env.NODE_ENV === 'development' || process.env.CI) {
			throw error
		}
	}
}

main()
