'use client'

import { CircleHelpIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { QuestionsBulkActions } from '@/src/features/admin/components/assistant/questions/questions-bulk-actions'
import { QuestionsFilters } from '@/src/features/admin/components/assistant/questions/questions-filters'
import { QuestionsMobileList } from '@/src/features/admin/components/assistant/questions/questions-mobile-list'
import { QuestionsTable } from '@/src/features/admin/components/assistant/questions/questions-table'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { ListPagination } from '@/src/features/admin/components/common/list-pagination'
import { useUnansweredQuestions } from '@/src/features/admin/hooks/use-admin-assistant'
import { useQuestionListParams } from '@/src/features/admin/hooks/use-question-list-params'
import { useQuestionStatus } from '@/src/features/admin/hooks/use-question-status'
import { useRowSelection } from '@/src/features/admin/hooks/use-row-selection'
import { cn } from '@/src/lib/utils'

/** What the assistant could not answer: complete the data where it belongs, then mark it answered or dismiss it. */
export function QuestionsView() {
  const { query, update } = useQuestionListParams()
  const { data, isPending, isError, isPlaceholderData, refetch } = useUnansweredQuestions(query)
  const items = data?.items ?? []
  const selection = useRowSelection(
    items.map(item => item.id),
    JSON.stringify(query),
  )
  const status = useQuestionStatus(selection.clear)
  const rows = { questions: items, selection, pending: status.pending, onChange: status.change }

  return (
    <>
      <AdminPageHeader
        title="Preguntas sin responder"
        description="Lo que el asesor no supo contestar. Cargá el dato que falta (ficha del producto, catálogo o configuración) y marcala como respondida, o descartala."
      />
      <ListCard
        toolbar={<QuestionsFilters />}
        isPending={isPending}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={items.length === 0}
        empty={
          query.q ? (
            <EmptyState
              icon={<CircleHelpIcon />}
              title="Ninguna pregunta coincide"
              description="Probá con otras palabras."
              action={
                <Button variant="outline" onClick={() => update({ q: undefined })}>
                  Borrar la búsqueda
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={<CircleHelpIcon />}
              title={query.status === 'OPEN' ? 'No hay preguntas sin responder' : 'No hay preguntas acá'}
              description="Cuando el asesor no sepa contestar algo, la pregunta aparece acá para que completes el dato."
            />
          )
        }
      >
        <div className={cn('transition-opacity duration-200', isPlaceholderData && 'opacity-50')}>
          <QuestionsTable {...rows} />
          <QuestionsMobileList {...rows} />
          {data && <ListPagination {...data} onPageChange={page => update({ page })} />}
        </div>
      </ListCard>
      <QuestionsBulkActions selection={selection} pending={status.pending} onChange={status.change} />
    </>
  )
}
