import { changeCookiesDomain } from '$src/middlewares/response/changeCookiesDomain.ts'
import { fetchTarget } from '$src/middlewares/response/fetchTarget.ts'

export type ResponseMiddlewareReturn = Response | undefined | void
export type ResponseMiddleware = (request: Request, response?: Response) => Promise<ResponseMiddlewareReturn> | ResponseMiddlewareReturn

const middlewares: ResponseMiddleware[] = [
	// INSERT MIDDLEWARES HERE
	fetchTarget,
	changeCookiesDomain,
]

export const buildResponse: ResponseMiddleware = async (request) => {
	let newResponse = new Response()

	for (const middleware of middlewares) {
		// Updates or keeps current response if middleware return undefined/void
		newResponse = (await middleware(request, newResponse)) ?? newResponse
	}

	return newResponse
}
