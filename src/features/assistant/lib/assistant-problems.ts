import { ApiError } from '@/src/lib/api-client'
import type { AnswerProblem } from './assistant-conversation'

export const CONNECTION_LOST: AnswerProblem = {
  message: 'Se cortó la conexión antes de terminar la respuesta. Probá de nuevo.',
  fix: 'retry',
}

/** What to tell the customer when a message could not be answered, and how they can go on. */
export function answerProblem(error: unknown): AnswerProblem {
  if (!(error instanceof ApiError))
    return { message: 'No pudimos responder ahora. Probá de nuevo en un momento.', fix: 'retry' }
  switch (error.status) {
    case 0:
      return { message: 'No pudimos conectarnos. Revisá tu conexión y probá de nuevo.', fix: 'retry' }
    case 422:
      return { message: error.message, fix: 'restart' }
    case 429:
      return { message: 'Mandaste muchos mensajes seguidos. Esperá un minuto y probá de nuevo.', fix: 'retry' }
    case 503:
      return { message: error.message, fix: 'retry' }
    default:
      return { message: 'No pudimos responder ahora. Probá de nuevo en un momento.', fix: 'retry' }
  }
}
