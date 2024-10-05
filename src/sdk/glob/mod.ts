import { expandGlobSync } from '@std/fs/mod.ts'
import type { ExpandGlobOptions } from '@std/fs/mod.ts'
import { parse } from '@std/path/parse.ts'

interface ExtendedOptions {
	extensions?: string[]
}

export function globSync(glob: string | URL, options?: ExpandGlobOptions & ExtendedOptions) {
	const { extensions } = options ?? {}

	const walkEntries = Array.from(expandGlobSync(glob, options))

	// Maps walkEntries to files
	// If 'extensions' is not undefined, filters files by its extensions
	const files = walkEntries.reduce((acc, { path }) => {
		if (!extensions) return [...acc, path]

		const { ext } = parse(path)
		return extensions.includes(ext) ? [...acc, path] : acc
	}, [] as string[])

	return files
}
