import { ApiError } from '@/src/lib/api-client'
import type { AnswerProblem } from './assistant-conversation'

export const CONNECTION_LOST: AnswerProblem = {
  message: 'Se cortó la conexión antes de terminar la respuesta. Probá de nuevo.',
  fix: 'retry',
}

/** Neutral: on mobile data many phones share one IP, so the messages may not all be this customer's. */
const RATE_LIMITED = 'Recibimos muchos mensajes seguidos desde tu conexión. Esperá un minuto y probá de nuevo.'

/** What to tell the customer when a message could not be answered, and how they can go on. */
export function answerProblem(error: unknown): AnswerProblem {
  if (!(error instanceof ApiError))
    return { message: 'No pudimos responder ahora. Probá de nuevo en un momento.', fix: 'retry' }
  switch (error.status) {
    case 0:
      return { message: 'No pudimos conectarnos. Revisá tu conexión y probá de nuevo.', fix: 'retry' }
    case 422:
      return { message: error.message, fix: 'restart' }
    case 409:
      return { message: error.message, fix: 'retry' }
    case 429:
      // The visitor's daily limit explains itself; the per-minute one arrives as the rate limiter's own text.
      return { message: error.message.startsWith('ThrottlerException') ? RATE_LIMITED : error.message, fix: 'retry' }
    case 503:
      return { message: error.message, fix: 'retry' }
    default:
      return { message: 'No pudimos responder ahora. Probá de nuevo en un momento.', fix: 'retry' }
  }
}
