import { ApiError } from '@/src/lib/api-client'

type AuthAction = 'login' | 'register' | 'reset' | 'verify' | 'generic'

/** Turns an API error into a message for the customer: what happened and what to do next. */
export function getAuthErrorMessage(error: unknown, action: AuthAction = 'generic'): string {
  if (!(error instanceof ApiError)) return 'Algo salió mal. Probá de nuevo en unos minutos.'

  if (error.status === 0) return 'No pudimos conectarnos. Revisá tu conexión y probá de nuevo.'
  if (error.status === 429) return 'Hiciste muchos intentos seguidos. Esperá un minuto y probá de nuevo.'
  if (error.status === 401 && action === 'login') return 'El email o la contraseña no son correctos.'
  if (error.status === 401 && (action === 'reset' || action === 'verify')) {
    return 'El enlace venció o ya se usó. Pedí uno nuevo.'
  }
  if (error.status === 409 && action === 'register') {
    return 'Ya existe una cuenta con ese email. Ingresá o recuperá tu contraseña.'
  }
  return 'Algo salió mal. Probá de nuevo en unos minutos.'
}
