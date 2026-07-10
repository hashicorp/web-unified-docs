/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import crypto from 'node:crypto'

/** Default `service.name` resource attribute spans are reported under. */
const DEFAULT_SERVICE_NAME = 'web-unified-docs-hashicorp.vercel.app'

/**
 * OTLP `SPAN_KIND_SERVER`. Reporting the span as an entry call makes Instana
 * surface it as an endpoint on the service.
 */
const SPAN_KIND_SERVER = 2

/** OTLP `STATUS_CODE_ERROR`. Instana counts spans with this status as erroneous. */
const STATUS_CODE_ERROR = 2

/**
 * A single span to emit.
 *
 * @typedef {Object} OtelSpanInput
 * @property {string} name Name of the span, e.g. "content not found".
 * @property {Record<string, string>} [attributes]
 * Key/value attributes attached to the span. Values are sent as OTLP
 * `stringValue` attributes.
 * @property {{message: string}} [status]
 * Status of the span. Defaults to an unset (ok) status. Provide a `message`
 * to mark the span as an error.
 * @property {number} [durationMs]
 * Span duration in milliseconds, rendered by Instana as the call's latency.
 * Defaults to 1ms; values below 1ms are clamped to 1ms (zero-duration spans
 * are not surfaced).
 */

/**
 * Emits one or more OTLP spans (traces) to Instana over HTTP.
 *
 * Pass a single span or an array of spans via `span`; multiple spans are sent
 * in one request under the same resource and scope
 * (`resourceSpans[0].scopeSpans[0].spans`).
 *
 * Each span is reported as a `SPAN_KIND_SERVER` span so that Instana surfaces
 * it as a call/endpoint (named after `span.name`) on the OpenTelemetry service
 * identified by `serviceName`. These calls are countable and groupable in
 * Analyze Calls / Unbounded Analytics (e.g. group by `endpoint.name`, filter
 * by span attributes), which — unlike raw OTLP metrics — reliably surfaces on
 * this Instana tenant. Providing a span `status` marks that call as erroneous.
 *
 * The spans are POSTed to the configured `INSTANA_OTLP_ENDPOINT`, which must
 * point at the OTLP traces path (`/v1/traces`).
 *
 * This is shared between the Next.js app (e.g. recording "content not found"
 * events during static generation) and standalone contexts such as GitHub
 * Actions workflows.
 *
 * The returned promise resolves with the `fetch` response so callers can await
 * delivery when running in short-lived environments like CI. In fire-and-
 * forget contexts the promise can be ignored.
 *
 * @typedef {Object} EmitOtelSpanOptions
 *
 * @property {OtelSpanInput|OtelSpanInput[]} span A single span, or an array of
 * spans, to emit. Multiple spans are batched into one request under the
 * same resource and scope (`resourceSpans[0].scopeSpans[0].spans`).
 *
 * @property {string} [serviceName] The `service.name` resource attribute the span
 *  is reported under. Defaults to `developer.hashicorp.com`.
 *
 * @property {string} scopeName The instrumentation scope name.
 *
 * @property {string} [hostId] Host identifier used to associate this data with
 * a host entity in Instana. Sent as the `x-instana-host` header and the
 * `host.id` + `host.name` resource attributes. Instana groups the resulting
 * call under one process/host entity per distinct `host.id`, so keep it stable
 * per source (e.g. the app vs CI). Defaults to `process.env.INSTANA_HOST_ID`,
 * falling back to the `serviceName`.
 *
 * @property {string} [endpoint] The Instana OTLP endpoint to POST the span to.
 * Defaults to `process.env.INSTANA_OTLP_ENDPOINT`.
 *
 * @property {string} [apiToken] The Instana OTLP API token. Defaults to
 * `process.env.INSTANA_OTLP_AGENT_TOKEN`.
 */
function buildSpan({ name, attributes = {}, status, durationMs = 1 }) {
	// Timestamps in nanoseconds (millisecond precision). Give the span a small
	// non-zero duration — Instana does not surface zero-duration spans as calls.
	const durationNs =
		BigInt(Math.max(1, Math.round(durationMs))) * BigInt(1_000_000)
	const endTimeUnixNano = BigInt(Date.now()) * BigInt(1_000_000)
	const startTimeUnixNano = endTimeUnixNano - durationNs

	const span = {
		traceId: crypto.randomBytes(16).toString('hex'),
		spanId: crypto.randomBytes(8).toString('hex'),
		name,
		kind: SPAN_KIND_SERVER,
		startTimeUnixNano: startTimeUnixNano.toString(),
		endTimeUnixNano: endTimeUnixNano.toString(),
		attributes: Object.entries(attributes).map(([key, value]) => {
			return {
				key,
				value: { stringValue: value },
			}
		}),
	}
	if (status) {
		span.status = { code: STATUS_CODE_ERROR, message: status.message }
	}
	return span
}

/** @param {OtelSpanInput} input Builds a single OTLP `SPAN_KIND_SERVER` span object. */

/**
 * @param {EmitOtelSpanOptions} options
 * @returns {Promise<Response>}
 */
export function emitOtelSpan({
	span,
	serviceName = DEFAULT_SERVICE_NAME,
	scopeName,
	hostId = process.env.INSTANA_HOST_ID ?? serviceName,
	endpoint = process.env.INSTANA_OTLP_ENDPOINT,
	apiToken = process.env.INSTANA_OTLP_AGENT_TOKEN,
}) {
	if (!endpoint) {
		return Promise.reject(
			new Error(
				'emitOtelSpan: missing OTLP endpoint (set INSTANA_OTLP_ENDPOINT or pass `endpoint`)',
			),
		)
	}
	if (!apiToken) {
		return Promise.reject(
			new Error(
				'emitOtelSpan: missing OTLP API token (set INSTANA_OTLP_AGENT_TOKEN or pass `apiToken`)',
			),
		)
	}

	const spanInputs = Array.isArray(span) ? span : [span]

	// Build all spans under a single resource and instrumentation scope
	// (`resourceSpans[0].scopeSpans[0].spans`).
	const payload = {
		resourceSpans: [
			{
				resource: {
					attributes: [
						{ key: 'service.name', value: { stringValue: serviceName } },
						{ key: 'host.id', value: { stringValue: hostId } },
						{ key: 'host.name', value: { stringValue: hostId } },
					],
				},
				scopeSpans: [
					{ scope: { name: scopeName }, spans: spanInputs.map(buildSpan) },
				],
			},
		],
	}

	return fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-instana-key': apiToken,
			'x-instana-host': hostId,
		},
		body: JSON.stringify(payload),
	})
}
