'use client'

import { CircleCheckIcon } from 'lucide-react'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { ListPagination } from '@/src/features/admin/components/common/list-pagination'
import { SystemLogItem } from '@/src/features/admin/components/system/logs/system-log-item'
import { SystemLogsFilters } from '@/src/features/admin/components/system/logs/system-logs-filters'
import { useSystemListParams } from '@/src/features/admin/hooks/use-system-list-params'
import { useSystemLogs } from '@/src/features/admin/hooks/use-system-lists'
import { parseSystemLogParams, systemLogSearch } from '@/src/features/admin/lib/system-list-params'
import { cn } from '@/src/lib/utils'

/** "Errores": what failed in the API in the last 30 days, newest first. */
export function SystemLogsView() {
  const { query, update } = useSystemListParams(parseSystemLogParams, systemLogSearch)
  const { data, isPending, isError, isPlaceholderData, refetch } = useSystemLogs(query)
  const filtered = Boolean(query.level || query.source || query.q)

  return (
    <div className="mx-auto flex max-w-6xl flex-col">
      <AdminPageHeader
        title="Errores"
        description="Lo que falló en la API en los últimos 30 días: errores y avisos del código, de Mercado Pago, Zipnova y OpenAI, y los pedidos que terminaron en error. El mismo error repetido en pocos segundos aparece una vez, con cuántas veces pasó."
      />
      <ListCard
        toolbar={<SystemLogsFilters query={query} update={update} sources={data?.sources ?? []} />}
        isPending={isPending}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={!data?.items.length}
        empty={
          <EmptyState
            icon={<CircleCheckIcon />}
            title={filtered ? 'Nada coincide con el filtro' : 'Sin errores en los últimos 30 días'}
            description={
              filtered ? 'Probá con otro nivel, origen o texto.' : 'Cuando algo falle en la API, aparece acá.'
            }
          />
        }
      >
        <div className={cn('transition-opacity duration-200', isPlaceholderData && 'opacity-50')}>
          <ul className="divide-y">
            {data?.items.map(log => (
              <SystemLogItem key={log.id} log={log} />
            ))}
          </ul>
          {data && <ListPagination {...data} onPageChange={page => update({ page })} />}
        </div>
      </ListCard>
    </div>
  )
}
