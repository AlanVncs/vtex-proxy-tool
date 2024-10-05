import { z } from '@zod/mod.ts'

const EnvSchema = z.object({
	STORE_ABSOLUTE_PATH: z.string().optional(),
	PORT: z.string().optional(),
	CERT_PEM_FILE: z.string().optional(),
	KEY_PEM_FILE: z.string().optional(),
	DENO_ENV: z.enum(['development', 'production']).default('production'),
})

export type EnvType = ReturnType<typeof EnvSchema.parse>
export type EnvKey = keyof EnvType

export const { STORE_ABSOLUTE_PATH, PORT, CERT_PEM_FILE, KEY_PEM_FILE, DENO_ENV } = EnvSchema.parse({
	STORE_ABSOLUTE_PATH: Deno.env.get('STORE_ABSOLUTE_PATH'),
	PORT: Deno.env.get('PORT'),
	CERT_PEM_FILE: Deno.env.get('CERT_PEM_FILE'),
	KEY_PEM_FILE: Deno.env.get('KEY_PEM_FILE'),
	DENO_ENV: Deno.env.get('DENO_ENV'),
})
