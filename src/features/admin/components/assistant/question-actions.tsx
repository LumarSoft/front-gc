'use client'

import { CheckIcon, MessageSquareTextIcon, RotateCcwIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type RowAction, RowActions } from '@/src/features/admin/components/common/row-actions'
import type { AdminUnansweredQuestion, QuestionStatus } from '@/src/types/api/admin-assistant'

type QuestionActionsProps = {
  question: AdminUnansweredQuestion
  pending: boolean
  onChange: (ids: number[], status: QuestionStatus) => void
  /** In the list: a way to the conversation it came from. Not inside that conversation. */
  showConversation?: boolean
}

/**
 * "…" menu of an unanswered question: answered (the missing data is loaded now) or dismissed while waiting, back to
 * waiting otherwise.
 */
export function QuestionActions({ question, pending, onChange, showConversation = false }: QuestionActionsProps) {
  const router = useRouter()
  const change = (status: QuestionStatus) => () => onChange([question.id], status)
  const actions: RowAction[] =
    question.status === 'OPEN'
      ? [
          { label: 'Marcar respondida', icon: CheckIcon, onSelect: change('ANSWERED'), disabled: pending },
          { label: 'Descartar', icon: XIcon, onSelect: change('DISMISSED'), disabled: pending },
        ]
      : [{ label: 'Volver a sin responder', icon: RotateCcwIcon, onSelect: change('OPEN'), disabled: pending }]
  if (showConversation && question.conversationId)
    actions.push({
      label: 'Ver la conversación',
      icon: MessageSquareTextIcon,
      onSelect: () => router.push(`/admin/asistente/${question.conversationId}`),
    })

  return (
    <div className="relative z-10">
      <RowActions itemName="la pregunta" actions={actions} />
    </div>
  )
}
