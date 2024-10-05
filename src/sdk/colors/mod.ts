import { blue, bold, green, red, white, yellow } from '@std/fmt/colors.ts'

export function successColor(str: string) {
	return green(str)
}

export function errorColor(str: string) {
	return red(str)
}

export function warningColor(str: string) {
	return yellow(str)
}

export function infoColor(str: string) {
	return blue(str)
}

export function normalColor(str: string) {
	return white(str)
}

export function boldText(str: string) {
	return bold(str)
}
