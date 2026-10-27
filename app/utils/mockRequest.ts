/**
 * Copyright IBM Corp. 2024, 2026
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
export const mockRequest = <Params, HandlerResult>(
	handler: (
		request: Request,
		context: { params: Promise<Params> },
	) => HandlerResult,
	params: Params,
	path?: string,
) => {
	const baseUrl = new URL(`http://localhost:8080/api/${path ? path : ''}`)
	const request = new Request(baseUrl)
	return handler(request, { params: Promise.resolve(params) })
}
