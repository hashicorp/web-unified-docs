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
 *   const response = await requestWrapper(GET, { product: 'terraform' })
 *
 *   expect(response.status).toBe(200)
 *   // Other assertions...
 * ```
 */
export const callHandler = <
	ApiHandler extends (request: Request, context: { params: any }) => any,
>(
	handler: ApiHandler,
	params: ApiHandler extends (
		request: Request,
		context: { params: infer P },
	) => any
		? P
		: never,
) => {
	const baseUrl = new URL('http://localhost:8080')
	const request = new Request(baseUrl)
	return handler(request, { params })
}
