'use client'

import Link from 'next/link'
import { QuestionActions } from '@/src/features/admin/components/assistant/question-actions'
import { QuestionStatusBadge } from '@/src/features/admin/components/assistant/question-status-badge'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { useQuestionStatus } from '@/src/features/admin/hooks/use-question-status'
import type { AdminUnansweredQuestion } from '@/src/types/api/admin-assistant'

/** What the assistant could not answer in this conversation, to complete the data and mark it answered. */
export function ConversationQuestionsCard({ questions }: { questions: AdminUnansweredQuestion[] }) {
  const { pending, change } = useQuestionStatus()
  return (
    <AdminCard
      title="No supo responder"
      aside={
        <Link href="/admin/asistente/preguntas" className="text-xs font-medium text-muted-foreground hover:underline">
          Ver todas
        </Link>
      }
    >
      <ul className="-my-2 divide-y">
        {questions.map(question => (
          <li key={question.id} className="flex items-start gap-2 py-2">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <p className="text-sm break-words">{question.question}</p>
              <QuestionStatusBadge status={question.status} />
            </div>
            <QuestionActions question={question} pending={pending} onChange={change} />
          </li>
        ))}
      </ul>
    </AdminCard>
  )
}
