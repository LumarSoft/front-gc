import { ApiError } from '@/src/lib/api-client'

/** Why going to Mercado Pago failed, for the buyer. 422 messages come from the API and are already in Spanish. */
export function paymentErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 0) return 'No hay conexión con el servidor. Revisá tu conexión y probá de nuevo.'
    if (error.status === 422 || error.status === 503) return error.message
    if (error.status === 429) return 'Hiciste varios intentos seguidos. Esperá un minuto y probá de nuevo.'
  }
  return 'No pudimos abrir Mercado Pago. Probá de nuevo en unos minutos.'
}
