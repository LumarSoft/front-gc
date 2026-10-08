'use client'

import { InboxIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { ListPagination } from '@/src/features/admin/components/common/list-pagination'
import { ExpiryJobAlert } from '@/src/features/admin/components/orders/list/expiry-job-alert'
import { OrdersFilters } from '@/src/features/admin/components/orders/list/orders-filters'
import { OrdersMobileList } from '@/src/features/admin/components/orders/list/orders-mobile-list'
import { OrdersTable } from '@/src/features/admin/components/orders/list/orders-table'
import { useAdminOrders } from '@/src/features/admin/hooks/use-admin-orders'
import { useOrderListParams } from '@/src/features/admin/hooks/use-order-list-params'
import { cn } from '@/src/lib/utils'

export function OrdersView() {
  const { query, update, clear } = useOrderListParams()
  const { data, isPending, isError, isPlaceholderData, refetch } = useAdminOrders(query)
  const items = data?.items ?? []
  const filtered = Boolean(query.q || query.stage)

  return (
    <>
      <AdminPageHeader
        title="Pedidos"
        description="El pago se verifica a mano desde cada pedido; el stock queda reservado mientras tanto."
      />
      {data?.expiryJobFailed && <ExpiryJobAlert />}
      <ListCard
        toolbar={<OrdersFilters />}
        isPending={isPending}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={items.length === 0}
        empty={
          filtered ? (
            <EmptyState
              icon={<InboxIcon />}
              title="Ningún pedido coincide"
              description="Probá con otra búsqueda o mirá todos los pedidos."
              action={
                <Button variant="outline" onClick={clear}>
                  Ver todos
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={<InboxIcon />}
              title="Todavía no hay pedidos"
              description="Cuando alguien compre en la tienda, el pedido aparece acá para verificar el pago y prepararlo."
            />
          )
        }
      >
        <div className={cn('transition-opacity duration-200', isPlaceholderData && 'opacity-50')}>
          <OrdersTable orders={items} />
          <OrdersMobileList orders={items} />
          {data && <ListPagination {...data} onPageChange={page => update({ page })} />}
        </div>
      </ListCard>
    </>
  )
}
