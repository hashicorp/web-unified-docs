/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

import { currentSpan } from '@instana/serverless-collector'

type InstanaErrorResponseOptions = {
	status: number
	body: BodyInit | null
	headers?: HeadersInit
	message: string
	/**
	 * Optional additional key/value pairs to annotate onto the active span.
	 * Keys should be prefixed with `sdk.custom.tags.` per Instana conventions.
	 */
	attributes?: Record<string, string | number | boolean>
}

const reportErrorToInstana = ({
	status,
	message,
	attributes = {},
}: Omit<InstanaErrorResponseOptions, 'body' | 'headers'>) => {
	try {
		const span = currentSpan()

		// Mark the span as erroneous so Instana surfaces it as a failed call.
		// 5xx = server error, 4xx = client-driven problem (still worth marking
		// because they represent user-facing failures we want to track).
		span.markAsErroneous(message, 'http.error')

		// Attach the HTTP status code as a custom tag so it is visible in
		// the Instana call timeline without needing to inspect full traces.
		span.annotate('sdk.custom.tags.http.status_code', status)

		// Spread any caller-provided tags (e.g. product.slug, error.kind).
		for (const [key, value] of Object.entries(attributes)) {
			span.annotate(`sdk.custom.tags.${key}`, value)
		}
	} catch {
		// The SDK degrades gracefully when no agent/backend is available, but
		// guard against unexpected throws so a monitoring failure can never
		// break a request handler.
	}
}

export function createInstanaErrorResponse(
	_request: Request,
	options: InstanaErrorResponseOptions,
) {
	reportErrorToInstana(options)

	return new Response(options.body, {
		status: options.status,
		headers: options.headers,
	})
}
