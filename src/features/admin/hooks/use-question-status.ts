'use client'

import { QUERY_KEYS } from '@/src/lib/query-keys'
import { changeQuestionStatus } from '@/src/services/admin-assistant.service'
import type { QuestionStatus, QuestionStatusResult } from '@/src/types/api/admin-assistant'
import { useAdminMutation } from './use-admin-mutation'

const SUCCESS: Record<QuestionStatus, [one: string, many: (count: number) => string]> = {
  ANSWERED: ['Dato marcado como completado', count => `${count} datos marcados como completados`],
  DISMISSED: ['Dato descartado', count => `${count} datos descartados`],
  OPEN: ['Dato pendiente otra vez', count => `${count} datos pendientes otra vez`],
}

/** What changed: the questions already in that status are not counted. */
function successMessage({ updated }: QuestionStatusResult, status: QuestionStatus): string {
  if (!updated.length) return 'Ya estaban así: no hubo cambios'
  return updated.length === 1 ? SUCCESS[status][0] : SUCCESS[status][1](updated.length)
}

/** Marks one question (row action) or a selection answered or dismissed, or back to waiting. */
export function useQuestionStatus() {
  const mutation = useAdminMutation({
    mutationFn: ({ ids, status }: { ids: number[]; status: QuestionStatus }) => changeQuestionStatus(ids, status),
    // The lists, the counters (nav badge) and the conversations that show these questions.
    invalidate: [QUERY_KEYS.admin.assistantQuestions, QUERY_KEYS.admin.assistantConversations],
    successMessage: (result, { status }) => successMessage(result, status),
  })
  return {
    pending: mutation.isPending,
    /** `onDone` runs after a successful change (the bulk bar clears its selection; a row action does not). */
    change: (ids: number[], status: QuestionStatus, onDone?: () => void): void =>
      mutation.mutate({ ids, status }, { onSuccess: () => onDone?.() }),
  }
}
