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

function captureMetric({ name, duration, timestamp, tags }) {
	return {
		host: '',
		metric: name,
		points: [[timestamp ?? Math.round(Date.now() / 1e3), duration]],
		tags,
		type: 'gauge',
	}
}

async function main() {
	const [, , appName] = process.argv

	try {
		const envLocalPath = '.env.local'
		dotenv.config({
			path: fs.existsSync(envLocalPath) ? [envLocalPath, '.env'] : '.env',
		})

		const configuration = client.createConfiguration()
		const api = new v1.MetricsApi(configuration)

		const timestamp = Math.round(Date.now() / 1e3)

		// Read trace files
		const nextjsTrace = await readTraceFile(NEXTJS_TRACE_FILE)
		const prebuildTrace = await readTraceFile(PREBUILD_TRACE_FILE)

		const filteredEvents = [...nextjsTrace, ...prebuildTrace].filter(
			(event) => {
				return EVENTS.includes(event.name)
			},
		)

		const environment = process.env.CI ? 'ci' : 'local'
		const buildType = process.env.INCREMENTAL_BUILD ? 'incremental' : 'full'
		const tags = [
			`app:${appName}`,
			`environment:${environment}`,
			`buildType:${buildType}`,
		]

		const structuredMetrics = filteredEvents.map((event) => {
			return captureMetric({
				name: `build.${event.name}`,
				duration: Math.round(event.duration / 1e3),
				timestamp,
				tags,
			})
		})

		await api.submitMetrics({
			body: {
				series: structuredMetrics,
			},
		})

		console.log(
			`\n〽️ Submitted build metrics to Datadog:\n${JSON.stringify(tags, null, 2)}\n`,
		)
	} catch {
		// Swallow errors
		// we don't want to impact the build or make it seem like there's been an error in the actual app if something goes wrong when sending metrics
	}
}

main()
