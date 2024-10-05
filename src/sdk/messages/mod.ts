import { boldText, errorColor, infoColor, successColor, warningColor } from '$src/sdk/colors/mod.ts'

export function logError(message: string, label: string = 'Error') {
	console.error(boldText(`[${errorColor(label ?? 'Error')}] - ${message}`))
}

export function logWarning(message: string, label: string = 'Warning') {
	console.error(boldText(`[${warningColor(label ?? 'Warning')}] - ${message}`))
}

export function logSuccess(message: string, label: string = 'Success') {
	console.log(boldText(`[${successColor(label ?? 'Success')}] - ${message}`))
}

export function logMessage(message: string, label: string = 'Message') {
	console.log(boldText(`[${infoColor(label ?? 'Message')}] - ${message}`))
}

export function debugMessage(message: string, debugType: 'error' | 'warning' | 'success' | 'message' = 'message') {
	if (!Deno.env.get('DEBUG')) return
	if (debugType === 'error') logError(message, 'Debug')
	if (debugType === 'warning') logWarning(message, 'Debug')
	if (debugType === 'success') logSuccess(message, 'Debug')
	if (debugType === 'message') logMessage(message, 'Debug')
}
