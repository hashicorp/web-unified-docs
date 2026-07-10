/**
 * Copyright IBM Corp. 2024, 2026
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * Minimal ambient type declarations for @instana/serverless-collector.
 * The package ships no TypeScript types, so we declare only the API surface
 * we actually use in this project.
 */
declare module '@instana/serverless-collector' {
	interface SpanHandle {
		markAsErroneous(message?: string, customErrorMessagePath?: string): void
		markAsNonErroneous(customErrorMessagePath?: string): void
		annotate(path: string | string[], value: unknown): void
		getTraceId(): string
		getSpanId(): string
	}

	const currentSpan: () => SpanHandle
	const sdk: {
		readonly async: {
			startEntrySpan(
				name: string,
				tags?: Record<string, unknown>,
			): Promise<void>
			completeEntrySpan(
				error?: Error | null,
				tags?: Record<string, unknown>,
			): void
		}
	}
	const setLogger: (logger: unknown) => void

	export { currentSpan, sdk, setLogger }
	export default { currentSpan, sdk, setLogger }
}
