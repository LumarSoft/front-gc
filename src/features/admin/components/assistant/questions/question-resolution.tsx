import { QuestionStatusBadge } from '@/src/features/admin/components/assistant/question-status-badge'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { AdminUnansweredQuestion } from '@/src/types/api/admin-assistant'

/** The status and, once someone answered or dismissed it, who and when. */
export function QuestionResolution({ question }: { question: AdminUnansweredQuestion }) {
  return (
    <div className="flex flex-col gap-0.5">
      <QuestionStatusBadge status={question.status} />
      {question.resolvedBy && question.resolvedAt && (
        <span className="text-xs whitespace-nowrap text-muted-foreground">
          {question.resolvedBy.name} · {formatOrderDate(question.resolvedAt).toLowerCase()}
        </span>
      )}
    </div>
  )
}
