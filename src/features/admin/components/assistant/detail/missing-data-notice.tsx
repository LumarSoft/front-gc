'use client'

import { CircleAlertIcon } from 'lucide-react'
import { QuestionActions } from '@/src/features/admin/components/assistant/question-actions'
import { QuestionStatusBadge } from '@/src/features/admin/components/assistant/question-status-badge'
import { useQuestionStatus } from '@/src/features/admin/hooks/use-question-status'
import type { AdminUnansweredQuestion } from '@/src/types/api/admin-assistant'

/**
 * Under the answer where it happened: the assistant answered, but without a piece of data the store does not have
 * loaded. Staff load it and mark it completed, or dismiss it.
 */
export function MissingDataNotice({ question }: { question: AdminUnansweredQuestion }) {
  const { pending, change } = useQuestionStatus()
  return (
    <div className="flex w-full items-start gap-2.5 rounded-lg border border-tone-attention-foreground/15 bg-tone-attention/35 px-3 py-2">
      <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-tone-attention-foreground" aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-xs font-semibold text-tone-attention-foreground">Respondió sin este dato</p>
        <p className="text-sm break-words">{question.question}</p>
        <QuestionStatusBadge status={question.status} />
      </div>
      <QuestionActions question={question} pending={pending} onChange={change} />
    </div>
  )
}
