import { changeOrigin } from '$src/middlewares/request/changeOrigin.ts'
import { removeCFHeaders } from '$src/middlewares/request/removeCFHeaders.ts'
import { removeHopHeaders } from '$src/middlewares/request/removeHopHeaders.ts'
import { fixAuthRequestBody } from '$src/middlewares/request/fixAuthRequestBody.ts'

export type RequestMiddlewareReturn = Request | undefined | void
export type RequestMiddleware = (request: Request) => Promise<RequestMiddlewareReturn> | RequestMiddlewareReturn

const middlewares: RequestMiddleware[] = [
	// INSERT MIDDLEWARES HERE
	changeOrigin,
	removeCFHeaders,
	removeHopHeaders,
	fixAuthRequestBody,
]

export const buildRequest: RequestMiddleware = async (request) => {
	let newRequest = new Request(request)

	for (const middleware of middlewares) {
		// Updates or keeps current request if middleware return undefined/void
		newRequest = (await middleware(newRequest)) ?? newRequest
	}

	return newRequest
}
