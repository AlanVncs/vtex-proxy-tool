const DEFAULT = 1337
const START = 1024
const END = 49151

// Finds an available port
export function findAvailablePort(ports?: number[]): number {
	if (!ports?.length || ports.length === 0) return findAvailablePort([DEFAULT])

	for (const port of ports) {
		if (isPortAvailable(port)) return port
	}

	const start = Math.max(START, ports[ports.length - 1] + 1)

	for (let port = start; port <= END; port++) {
		if (isPortAvailable(port)) return port
	}

	throw new Error('No port found! :/')
}

// Tests if 'port' is available
function isPortAvailable(port: number) {
	try {
		const listener = Deno.listen({ port })
		listener.close()
		return true
	} catch (_error) {
		return false
	}
}
