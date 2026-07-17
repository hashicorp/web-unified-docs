/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * CLI wrapper around `emitOtelSpan` so OTLP spans can be emitted from a GitHub
 * Actions step (or any shell) without importing the function.
 *
 * Run with hc-tools. Note the `--` separator: hc-tools strips flags before it,
 * so everything after `--` is forwarded to this script.
 *
 *   npx hc-tools ./scripts/emit-otel-span-cli.mjs -- \
 *     --span '{"name":"content not found","status":{"message":"..."}}' \
 *     --scope-name src/views/docs-view/server.ts \
 *     --service-name developer.hashicorp.com \
 *     --host-id dev-portal-ci
 *
 * Arguments mirror the parameters of `emitOtelSpan`:
 * - --span         (required) JSON for the `span` param: a single span object or
 *                  an array of span objects. Each object is
 *                  `{"name":"...","attributes":{...},"status":{"message":"..."},"durationMs":123}`
 *                  (only `name` is required).
 * - --scope-name   (required) instrumentation scope name (`scopeName`).
 * - --service-name (optional) `service.name` resource attribute (`serviceName`).
 * - --host-id      (optional) host identifier (`hostId`).
 *
 * The OTLP endpoint and token are read from the environment:
 * - INSTANA_OTLP_ENDPOINT  (required) OTLP endpoint (`endpoint`).
 * - INSTANA_OTLP_AGENT_TOKEN (required) Instana API token (`apiToken`).
 */

import { parseArgs } from 'node:util'

import { emitOtelSpan } from './emit-otel-span.mjs'

async function main() {
	const { values } = parseArgs({
		options: {
			span: { type: 'string' },
			'scope-name': { type: 'string' },
			'service-name': { type: 'string' },
			'host-id': { type: 'string' },
		},
	})

	const spanJson = values.span
	if (!spanJson) {
		throw new Error('emit-otel-span-cli: --span is required')
	}
	const span = JSON.parse(spanJson)

	const scopeName = values['scope-name']
	if (!scopeName) {
		throw new Error('emit-otel-span-cli: --scope-name is required')
	}

	const response = await emitOtelSpan({
		span,
		scopeName,
		serviceName: values['service-name'],
		hostId: values['host-id'],
	})

	if (!response.ok) {
		throw new Error(
			`emit-otel-span-cli: OTLP endpoint responded ${response.status} ${response.statusText}`,
		)
	}

	const names = (Array.isArray(span) ? span : [span]).map((s) => {
		return s.name
	})
	console.log(`emit-otel-span-cli: emitted span(s) ${JSON.stringify(names)}`)
}

main().catch((error) => {
	console.error(error)
	process.exit(1)
})
