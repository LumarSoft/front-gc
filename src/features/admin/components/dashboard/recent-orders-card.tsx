'use client'

import Link from 'next/link'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { ListSkeleton } from '@/src/features/admin/components/common/list-skeleton'
import { OrderPaymentBadge } from '@/src/features/admin/components/orders/order-badges'
import { useAdminOrders } from '@/src/features/admin/hooks/use-admin-orders'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import { formatMoneyExact } from '@/src/lib/format'

const RECENT = 6

/** The latest orders, each opening its page. */
export function RecentOrdersCard() {
  const { data, isPending } = useAdminOrders({ pageSize: RECENT })
  const orders = data?.items ?? []

  return (
    <AdminCard
      title="Últimos pedidos"
      aside={
        <Link href="/admin/pedidos" className="text-sm font-medium text-chart-series hover:underline">
          Ver todos
        </Link>
      }
    >
      {isPending ? (
        <div className="-m-4">
          <ListSkeleton rows={RECENT} />
        </div>
      ) : orders.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Todavía no hay pedidos.</p>
      ) : (
        <ul className="-mx-4 -my-2 divide-y">
          {orders.map(order => (
            <li key={order.id}>
              <Link
                href={`/admin/pedidos/${order.id}`}
                className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-table-head"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">
                    <span className="font-semibold">{order.number}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{formatOrderDate(order.placedAt)}</span>
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{order.customer.name}</span>
                </span>
                <span className="flex flex-col items-end gap-1">
                  <span className="text-sm tabular-nums">{formatMoneyExact(order.total)}</span>
                  <OrderPaymentBadge status={order.status} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AdminCard>
  )
}
