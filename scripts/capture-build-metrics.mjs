/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import path from 'path'
import fs from 'fs'
import { emitOtelSpan } from './emit-otel-span.mjs'
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

	// Parse the arrays from the trace and flatten the full array, giving us a
	// flat list of events
	return content.trim().split('\n').flatMap(JSON.parse)
}

/**
 * Submit build metrics to datadog
 * @param {BuildEvent[]} metrics
 */
const submitDatadogMetrics = async (metrics) => {
	const configuration = client.createConfiguration()
	const api = new v1.MetricsApi(configuration)

	// Send metrics to Datadog API
	await api.submitMetrics({
		body: {
			// Convert the build events into a format Datadog understands
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
 * Submit build metrics to Instana as OpenTelemetry spans.
 *
 * Raw OTLP metrics don't reliably surface on our Instana tenant, so each build
 * event is reported as a span (via `emitOtelSpan`) whose duration reflects the
 * build event duration. These appear as calls (named `build.<event>`) on the
 * app's service and can be charted in Analyze Calls.
 */
const submitInstanaMetrics = async (metrics) => {
	const spans = metrics.map(({ name, duration, tags }) => {
		return {
			name: `build.${name}`,
			attributes: Object.fromEntries(tags),
			// Next.js trace durations are in microseconds; convert to milliseconds
			// so Instana renders the build duration as the call's latency.
			durationMs: duration / 1e3,
		}
	})

	// Also emit an aggregate `build.total` span whose duration is the sum of all
	// build phase durations. Instana chart/number widgets can't sum datasets, so
	// this lets dashboards chart total build time as a single series. Because
	// avg(sum) == sum(avg), avg(build.total) equals the sum of the per-phase
	// averages (avg(build.next_build) + avg(build.next_export) + ...).
	if (metrics.length > 0) {
		const totalDurationMicros = metrics.reduce((sum, { duration }) => {
			return sum + duration
		}, 0)
		spans.push({
			name: 'build.total',
			attributes: Object.fromEntries(metrics[0].tags),
			durationMs: totalDurationMicros / 1e3,
		})
	}

	const response = await emitOtelSpan({
		scopeName: 'capture-build-metrics',
		span: spans,
	})

	if (!response.ok) {
		const responseText = await response.text()
		throw new Error(
			`Failed to submit build spans to Instana. Status: ${response.status}, Response: ${responseText}`,
		)
	}

	const tags = metrics[0].tags.map(([key, value]) => {
		return `${key}:${value}`
	})
	console.log(
		`〽️ Submitted build spans to Instana:\n${JSON.stringify(tags, null, 2)}`,
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
		// being incorporated into the `.map()` call as we don't want it to be
		// re-evaluated for each run through the loop. We want it to remain fixed
		const timestamp = Math.round(Date.now() / 1e3)

		// Read trace files
		const nextjsTrace = await readTraceFile(NEXTJS_TRACE_FILE)
		const prebuildTrace = await readTraceFile(PREBUILD_TRACE_FILE)
		const buildType = incBuild ? 'incremental' : 'full'
		const environment = process.env.HASHI_ENV ?? 'local'

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
			.map((result) => {
				return result.reason
			})
		if (failedSubmissions.length > 0) {
			throw new AggregateError(failedSubmissions)
		}
	} catch (error) {
		const errors = error instanceof AggregateError ? error.errors : [error]
		for (const err of errors) {
			console.error(`Failed to submit build metrics: ${err.message}`)
		}
	}
}

main()
