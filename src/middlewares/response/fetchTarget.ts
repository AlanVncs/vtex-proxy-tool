import type { ResponseMiddleware } from '../response.ts'
import { copyDomain } from '$src/sdk/url/mod.ts'
// import { publicURL, redirectSetups } from '$src/sdk/config-loader/mod.ts'
import { basename, globToRegExp } from '@std/path/mod.ts'
import { existsSync } from '@std/fs/exists.ts'
import { debugMessage } from '$src/sdk/messages/mod.ts'
import { join } from '@std/path/join.ts'
import { errorColor } from '$src/sdk/colors/mod.ts'
import { successColor } from '$src/sdk/colors/mod.ts'
import { infoColor } from '$src/sdk/colors/mod.ts'
import { logMessage } from '$src/sdk/messages/mod.ts'

export const fetchTarget: ResponseMiddleware = async (request) => {
	const { pathname } = new URL(request.url)
	const fileName = basename(pathname)

	const body = redirectSetups.reduce((acc, { matchers, path }) => {
		const file = join(path, fileName)

		for (const matcher of matchers) {
			const regex = globToRegExp(matcher)

			const matches = regex.test(pathname)
			const hit = matches && existsSync(file)

			debugMessage(``)
			debugMessage(`Request: ${pathname}`)
			debugMessage(`Glob     -> ${infoColor(matcher)}`)
			debugMessage(`Matches  -> ${matches ? successColor('OK') : errorColor('FAIL')}`)
			debugMessage(`Exists   -> ${hit ? successColor('OK') : errorColor('FAIL')}`)

			if (!hit) return acc

			logMessage(`Redirect Hit: ${successColor(file)}`)

			return Deno.readFileSync(file)
		}
	}, undefined as Uint8Array | undefined)

	const targetUrl = copyDomain(publicURL, request.url)
	const response = await fetch(targetUrl, request)

	return new Response(body ?? response.body as BodyInit, response)
}
