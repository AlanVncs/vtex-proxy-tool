import { CERT_PEM_FILE, KEY_PEM_FILE, PORT } from '$src/sdk/env/mod.ts'
import { buildRequest } from '$src/middlewares/request.ts'
import { buildResponse } from '$src/middlewares/response.ts'
import { findAvailablePort } from '$src/sdk/port/mod.ts'
import { logSuccess } from '$src/sdk/messages/mod.ts'

// Will try every one, then will try the last one + 1 until find an available
const LOCAL_PORTS = [443, 8000]

const cert = CERT_PEM_FILE ? Deno.readTextFileSync(CERT_PEM_FILE) : undefined
const key = KEY_PEM_FILE ? Deno.readTextFileSync(KEY_PEM_FILE) : undefined

export function proxy() {
	const availablePort = findAvailablePort(LOCAL_PORTS)
	const port = PORT ? Number(PORT) : availablePort

	Deno.serve({
		port,
		cert,
		key,
		onListen: () => {
			const url = port === 443 ? 'https://localhost' : `http://localhost:${port}`
			logSuccess(`Server is running! Ctrl+click -> ${url}`)
		},
	}, async (request) => {
		const targetRequest = await buildRequest(request)
		if (!targetRequest) return new Response('Erro ao montar a requisição')

		const response = await buildResponse(targetRequest)
		if (!response) return new Response('Erro ao montar a resposta')

		return response
	})
}
