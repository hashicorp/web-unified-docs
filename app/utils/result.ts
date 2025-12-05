/**
 * Copyright IBM Corp. 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

// The result type is used to represent the result of an operation that can fail. It is a common pattern in Rust and other languages. This pattern is useful for handling errors in a more structured way and avoiding exceptions. Because any error state is wrapped in Err and any success state is wrapped in Ok. See "app/utils/file.ts" for an example of how this is used.

export type Result<T, E = undefined> =
	| { ok: true; value: T }
	| { ok: false; value: E | undefined }

export const Ok = <T>(data: T): Result<T, never> => {
	return { ok: true, value: data }
}

export const Err = <E>(error?: E): Result<never, E> => {
	return { ok: false, value: error }
}

export const errorResultToString = (
	category: string,
	error: Result<any, string>,
): string => {
	return `${category} Error: ${error.value}`
}
