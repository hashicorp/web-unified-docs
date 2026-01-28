/**
 * Copyright IBM Corp. 2024, 2025
 * SPDX-License-Identifier: BUSL-1.1
 */

/**
 * A utility wrapper function to replace numerous variations of `mockRequest`
 * around the tests. This utility function accepts a Next.js request handler
 * and (using type inference) provides a type-safe way to call the handler in
 * tests with type-hinted parameters.
 *
 * @example
 * ```ts
 *   import { GET } from './route.ts'
 *   // ...
 *   const response = await mockApiCall(GET, { product: 'terraform' })
 *
 *   expect(response.status).toBe(200)
 *   // Other assertions...
 * ```
 */
export const mockRequest = <
	ApiHandler extends (request: Request, context: { params: any }) => any,
>(
	handler: ApiHandler,
	params: ApiHandler extends (
		request: Request,
		context: { params: infer P },
	) => any
		? P
		: never,
	path?: string,
) => {
	const baseUrl = new URL(`http://localhost:8080/api/${path ? path : ''}`)
	const request = new Request(baseUrl)
	return handler(request, { params })
}
