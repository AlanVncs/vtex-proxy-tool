import { copyDomain } from '$src/sdk/url/mod.ts'
import type { RequestMiddleware } from '../request.ts'
// import { publicURL } from '$src/sdk/config-loader/mod.ts'

export const changeOrigin: RequestMiddleware = (request) => {
	const { host: localHost } = new URL(request.url)
	const targetUrl = copyDomain(publicURL, request.url)

	request.headers.set('origin', targetUrl.origin)
	request.headers.set('host', targetUrl.host)
	request.headers.set('referer', targetUrl.toString())
	request.headers.set('x-forwarded-host', localHost)
}
