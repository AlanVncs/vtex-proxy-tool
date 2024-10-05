import { parse } from '@std/path/mod.ts'
import { globSync } from '$src/sdk/glob/mod.ts'
import { debugMessage } from '$src/sdk/messages/mod.ts'
import { buildStyles } from '$src/sdk/builder/sass/mod.ts'
import { buildScripts } from '$src/sdk/builder/esbuild/mod.ts'
import { buildSetups } from '$src/sdk/config-loader/mod.ts'

// Monitora os arquivos (styles e scripts)
export async function watchFiles() {

	// return buildSetups.reduce((buildEntries, { entries, outDir }) => {
	// 	// TODO Evitar 'files' vazio
	// 	const files = entries.flatMap((entry) => globSync(entry, { includeDirs: true, extensions }))

	// 	const foundIndex = buildEntries.findIndex((buildEntry) => buildEntry.outDir === outDir)

	// 	if (foundIndex === -1) return [...buildEntries, { files, outDir }]

	// 	const foundItem = buildEntries[foundIndex]

	// 	buildEntries[foundIndex].files = [...foundItem.files, ...files]

	// 	return buildEntries
	// }, [] as BuildEntry[])

	// const files = entries.flatMap((entry) => globSync(entry, { includeDirs: true, extensions }))
	
	// TODO
	const allFiles = globSync('src/**/*.{sass,scss,tsx,ts,js}', { includeDirs: true, exclude: ['src/**/*.d.ts'] })

	for (const file of allFiles) {
		const { ext } = parse(file)

		debugMessage(`WATCHING ${file}`)

		// Função de compilação baseada no tipo de arquivo (estilo ou script)
		const compilationFunction = ext.match(/\.s(a|c)ss/) ? buildStyles : buildScripts

		// Debouce para evitar compilações excessivas
		const watcher = Deno.watchFs(file, { recursive: false })

		let taskID = 0

		for await (const event of watcher) {
			if (event.kind === 'modify') {
				clearTimeout(taskID)
				taskID = setTimeout(() => {
					debugMessage(`File changed: ${file}`)
					compilationFunction()
				}, 100)
			}
		}
	}
}
