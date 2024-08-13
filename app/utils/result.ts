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
	error: Result<any, string>
): string => {
	return `${category} Error: ${error.value}`
}
