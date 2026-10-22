'use client'

import { HistoryIcon } from 'lucide-react'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { ListPagination } from '@/src/features/admin/components/common/list-pagination'
import { SystemActivityFilters } from '@/src/features/admin/components/system/activity/system-activity-filters'
import { SystemActivityItem } from '@/src/features/admin/components/system/activity/system-activity-item'
import { useSystemListParams } from '@/src/features/admin/hooks/use-system-list-params'
import { useSystemActivity } from '@/src/features/admin/hooks/use-system-lists'
import { parseSystemActivityParams, systemActivitySearch } from '@/src/features/admin/lib/system-list-params'
import { cn } from '@/src/lib/utils'

/** "Actividad del panel": every change staff made in the admin, newest first. */
export function SystemActivityView() {
  const { query, update } = useSystemListParams(parseSystemActivityParams, systemActivitySearch)
  const { data, isPending, isError, isPlaceholderData, refetch } = useSystemActivity(query)

  return (
    <div className="mx-auto flex max-w-6xl flex-col">
      <AdminPageHeader
        title="Actividad del panel"
        description="Quién cambió qué en el admin y cuándo: precios, stock, estados de pedidos, configuración. Abrí cada cambio para ver los campos, antes y después."
      />
      <ListCard
        toolbar={
          <SystemActivityFilters
            query={query}
            update={update}
            users={data?.users ?? []}
            entityTypes={data?.entityTypes ?? []}
          />
        }
        isPending={isPending}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={!data?.items.length}
        empty={
          <EmptyState
            icon={<HistoryIcon />}
            title={query.userId || query.entityType ? 'Nada coincide con el filtro' : 'Todavía no hay cambios'}
            description="Cada cambio que se guarde en el admin aparece acá."
          />
        }
      >
        <div className={cn('transition-opacity duration-200', isPlaceholderData && 'opacity-50')}>
          <ul className="divide-y">
            {data?.items.map(entry => (
              <SystemActivityItem key={entry.id} entry={entry} />
            ))}
          </ul>
          {data && <ListPagination {...data} onPageChange={page => update({ page })} />}
        </div>
      </ListCard>
    </div>
  )
}
