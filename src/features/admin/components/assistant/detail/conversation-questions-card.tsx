'use client'

import Link from 'next/link'
import { QuestionActions } from '@/src/features/admin/components/assistant/question-actions'
import { QuestionStatusBadge } from '@/src/features/admin/components/assistant/question-status-badge'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { useQuestionStatus } from '@/src/features/admin/hooks/use-question-status'
import type { AdminUnansweredQuestion } from '@/src/types/api/admin-assistant'

/**
 * The data the assistant was missing in this conversation (it answered without it), to load it and mark it completed.
 * Each one is also shown under the answer where it happened.
 */
export function ConversationQuestionsCard({ questions }: { questions: AdminUnansweredQuestion[] }) {
  const { pending, change } = useQuestionStatus()
  return (
    <AdminCard
      title="Datos faltantes"
      aside={
        <Link href="/admin/asistente/preguntas" className="text-xs font-medium text-muted-foreground hover:underline">
          Ver todos
        </Link>
      }
    >
      <p className="-mt-1 mb-2 text-xs text-muted-foreground">
        El asesor le respondió al cliente sin este dato. Cargalo en la ficha, el catálogo o la configuración y marcalo
        como completado.
      </p>
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
