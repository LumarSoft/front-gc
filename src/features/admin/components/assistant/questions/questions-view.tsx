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
import { useLastPageFallback } from '@/src/features/admin/hooks/use-last-page-fallback'
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
  const status = useQuestionStatus()
  const rows = { questions: items, selection, pending: status.pending, onChange: status.change }
  // Resolving the last rows of the last page: show the page before instead of an empty queue.
  useLastPageFallback(data, page => update({ page }))

  return (
    <>
      <AdminPageHeader
        title="Datos faltantes"
        description="Lo que el asesor le contestó a un cliente sin tener el dato, porque la tienda no lo tiene cargado. Cargalo (ficha del producto, catálogo o configuración) y marcalo como completado, o descartalo si no hace falta."
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
              title="Ningún dato coincide"
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
              title={query.status === 'OPEN' ? 'No hay datos pendientes' : 'No hay datos acá'}
              description="Cuando al asesor le falte un dato para contestarle a un cliente, aparece acá para que lo completes."
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
