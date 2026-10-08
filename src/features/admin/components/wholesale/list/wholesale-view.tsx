'use client'

import { BuildingsIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { ListPagination } from '@/src/features/admin/components/common/list-pagination'
import { WholesaleFilters } from '@/src/features/admin/components/wholesale/list/wholesale-filters'
import { WholesaleMobileList } from '@/src/features/admin/components/wholesale/list/wholesale-mobile-list'
import { WholesaleTable } from '@/src/features/admin/components/wholesale/list/wholesale-table'
import { useAdminWholesaleApplications } from '@/src/features/admin/hooks/use-admin-wholesale'
import { useWholesaleListParams } from '@/src/features/admin/hooks/use-wholesale-list-params'
import { cn } from '@/src/lib/utils'

export function WholesaleView() {
  const { query, update, clear } = useWholesaleListParams()
  const { data, isPending, isError, isPlaceholderData, refetch } = useAdminWholesaleApplications(query)
  const items = data?.items ?? []
  const filtered = Boolean(query.q || query.status)

  return (
    <>
      <AdminPageHeader
        title="Clientes frecuentes"
        description="Empresas que pidieron precios preferenciales. Al aprobarlas, compran con su lista de precios."
      />
      <ListCard
        toolbar={<WholesaleFilters />}
        isPending={isPending}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={items.length === 0}
        empty={
          filtered ? (
            <EmptyState
              icon={<BuildingsIcon />}
              title="Ninguna solicitud coincide"
              description="Probá con otra búsqueda o mirá todas las solicitudes."
              action={
                <Button variant="outline" onClick={clear}>
                  Ver todas
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={<BuildingsIcon />}
              title="Todavía no hay solicitudes"
              description="Cuando una empresa pida su cuenta desde la tienda, aparece acá para revisarla."
            />
          )
        }
      >
        <div className={cn('transition-opacity duration-200', isPlaceholderData && 'opacity-50')}>
          <WholesaleTable applications={items} />
          <WholesaleMobileList applications={items} />
          {data && <ListPagination {...data} onPageChange={page => update({ page })} />}
        </div>
      </ListCard>
    </>
  )
}
