import { QuestionActions } from '@/src/features/admin/components/assistant/question-actions'
import { QuestionResolution } from '@/src/features/admin/components/assistant/questions/question-resolution'
import { RowCheckbox } from '@/src/features/admin/components/common/row-checkbox'
import type { RowSelection } from '@/src/features/admin/hooks/use-row-selection'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { AdminUnansweredQuestion, QuestionStatus } from '@/src/types/api/admin-assistant'

type QuestionsMobileListProps = {
  questions: AdminUnansweredQuestion[]
  selection: RowSelection
  pending: boolean
  onChange: (ids: number[], status: QuestionStatus) => void
}

/** Phone list (below md): the question, when and its status, with a box to select it and "…" to change it. */
export function QuestionsMobileList({ questions, selection, pending, onChange }: QuestionsMobileListProps) {
  return (
    <ul className="divide-y md:hidden">
      {questions.map(question => (
        <li
          key={question.id}
          className="flex items-start gap-3 py-3 pr-2 pl-4 data-[state=selected]:bg-tone-neutral/50"
          data-state={selection.isSelected(question.id) ? 'selected' : undefined}
        >
          <RowCheckbox
            className="mt-0.5"
            checked={selection.isSelected(question.id)}
            onCheckedChange={checked => selection.toggle(question.id, checked)}
            label={`Seleccionar «${question.question}»`}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <p className="text-sm break-words">{question.question}</p>
            <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
              <QuestionResolution question={question} />
              <span className="text-xs text-muted-foreground">{formatOrderDate(question.createdAt)}</span>
            </div>
          </div>
          <QuestionActions question={question} pending={pending} onChange={onChange} showConversation />
        </li>
      ))}
    </ul>
  )
}
