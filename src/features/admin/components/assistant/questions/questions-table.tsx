import { QuestionActions } from '@/src/features/admin/components/assistant/question-actions'
import { QuestionResolution } from '@/src/features/admin/components/assistant/questions/question-resolution'
import {
  IndexTable,
  IndexTableBody,
  IndexTableCell,
  IndexTableHead,
  IndexTableHeader,
  IndexTableRow,
  IndexTableRowLink,
} from '@/src/features/admin/components/common/index-table'
import { RowCheckbox } from '@/src/features/admin/components/common/row-checkbox'
import type { RowSelection } from '@/src/features/admin/hooks/use-row-selection'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { AdminUnansweredQuestion, QuestionStatus } from '@/src/types/api/admin-assistant'

type QuestionsTableProps = {
  questions: AdminUnansweredQuestion[]
  selection: RowSelection
  pending: boolean
  onChange: (ids: number[], status: QuestionStatus) => void
}

/** Desktop list (md and up): the question opens its conversation; the box selects it, "…" changes its status. */
export function QuestionsTable({ questions, selection, pending, onChange }: QuestionsTableProps) {
  return (
    <IndexTable className="hidden md:table">
      <IndexTableHeader>
        <IndexTableHead className="w-10">
          <RowCheckbox
            checked={selection.pageState}
            onCheckedChange={selection.togglePage}
            label="Seleccionar todas las preguntas de esta página"
          />
        </IndexTableHead>
        <IndexTableHead className="w-full pl-1">Pregunta</IndexTableHead>
        <IndexTableHead>Fecha</IndexTableHead>
        <IndexTableHead>Estado</IndexTableHead>
        <IndexTableHead className="w-12">
          <span className="sr-only">Acciones</span>
        </IndexTableHead>
      </IndexTableHeader>
      <IndexTableBody>
        {questions.map(question => (
          <IndexTableRow key={question.id} data-state={selection.isSelected(question.id) ? 'selected' : undefined}>
            <IndexTableCell className="w-10">
              <RowCheckbox
                checked={selection.isSelected(question.id)}
                onCheckedChange={checked => selection.toggle(question.id, checked)}
                label={`Seleccionar «${question.question}»`}
              />
            </IndexTableCell>
            <IndexTableCell className="max-w-0 min-w-72 py-2.5 pl-1 whitespace-normal">
              {question.conversationId ? (
                <IndexTableRowLink
                  href={`/admin/asistente/${question.conversationId}`}
                  className="line-clamp-2 font-normal break-words"
                >
                  {question.question}
                </IndexTableRowLink>
              ) : (
                <span className="line-clamp-2 break-words">{question.question}</span>
              )}
            </IndexTableCell>
            <IndexTableCell className="whitespace-nowrap text-muted-foreground">
              {formatOrderDate(question.createdAt)}
            </IndexTableCell>
            <IndexTableCell>
              <QuestionResolution question={question} />
            </IndexTableCell>
            <IndexTableCell className="w-12">
              <QuestionActions question={question} pending={pending} onChange={onChange} showConversation />
            </IndexTableCell>
          </IndexTableRow>
        ))}
      </IndexTableBody>
    </IndexTable>
  )
}
