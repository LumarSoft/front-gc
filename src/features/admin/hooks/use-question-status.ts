'use client'

import { QUERY_KEYS } from '@/src/lib/query-keys'
import { changeQuestionStatus } from '@/src/services/admin-assistant.service'
import type { QuestionStatus } from '@/src/types/api/admin-assistant'
import { useAdminMutation } from './use-admin-mutation'

const SUCCESS: Record<QuestionStatus, [one: string, many: (count: number) => string]> = {
  ANSWERED: ['Pregunta marcada como respondida', count => `${count} preguntas marcadas como respondidas`],
  DISMISSED: ['Pregunta descartada', count => `${count} preguntas descartadas`],
  OPEN: ['Pregunta sin responder otra vez', count => `${count} preguntas sin responder otra vez`],
}

/** Marks one question (row action) or a selection answered or dismissed, or back to waiting. */
export function useQuestionStatus(onDone?: () => void) {
  const mutation = useAdminMutation({
    mutationFn: ({ ids, status }: { ids: number[]; status: QuestionStatus }) => changeQuestionStatus(ids, status),
    // The lists, the counters (nav badge) and the conversations that show these questions.
    invalidate: [QUERY_KEYS.admin.assistantQuestions, QUERY_KEYS.admin.assistantConversations],
    successMessage: (_, { ids, status }) => (ids.length === 1 ? SUCCESS[status][0] : SUCCESS[status][1](ids.length)),
    onSuccess: () => onDone?.(),
  })
  return {
    pending: mutation.isPending,
    change: (ids: number[], status: QuestionStatus): void => mutation.mutate({ ids, status }),
  }
}
