import { ApiError } from '@/src/lib/api-client'

/** The API asks to quote again ("…Cotizá de nuevo.") when the quote expired or the cart or destination changed. */
export function isRequoteError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 422 && error.message.includes('Cotizá de nuevo')
}

export function quoteErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return 'No pudimos cotizar el envío. Probá de nuevo.'
  if (error.status === 0) return 'No hay conexión con el servidor. Revisá tu conexión y probá de nuevo.'
  if (error.status === 422 || error.status === 503) return error.message
  if (error.status === 429) return 'Cotizaste varias veces seguidas. Esperá un minuto y probá de nuevo.'
  return 'No pudimos cotizar el envío. Probá de nuevo.'
}
