'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { AdminPageHeader } from '../admin-page-header'
import { ListPagination } from '../common/list-pagination'
import { useAdminOrders } from '../../hooks/use-admin-orders'
import { ORDER_LABELS } from '@/src/features/orders/lib/order-labels'
import { formatDateTime, formatMoneyExact } from '@/src/lib/format'
import type { OrderStatus } from '@/src/types/api/orders'

export function AdminOrdersView() {
  const { query, status, filter, setPage } = useAdminOrders()
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Pedidos"
        description="Compras registradas y seguimiento. El pago se verifica manualmente desde cada pedido."
      />
      <div>
        <label htmlFor="order-status-filter" className="mr-3 text-sm font-medium">
          Estado
        </label>
        <select
          id="order-status-filter"
          value={status}
          onChange={event => filter(event.target.value as OrderStatus | '')}
          className="h-10 rounded-lg border bg-background px-3 text-sm"
        >
          <option value="">Todos los estados</option>
          {Object.entries(ORDER_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label.label}
            </option>
          ))}
        </select>
      </div>
      {query.data?.expiryJobFailed && (
        <p role="alert" className="rounded-xl border border-destructive p-4 text-sm text-destructive">
          Hay reservas vencidas que requieren revisión. No confirmes pagos de pedidos cuyo plazo haya terminado.
        </p>
      )}
      {query.isPending && <p role="status">Cargando pedidos…</p>}
      {query.isError && (
        <div role="alert">
          <p>No pudimos cargar los pedidos.</p>
          <Button className="mt-3" onClick={() => void query.refetch()}>
            Reintentar
          </Button>
        </div>
      )}
      {query.data && (
        <div className="overflow-hidden rounded-2xl border bg-card">
          {!query.data.items.length && (
            <p className="p-8 text-center text-muted-foreground">Todavía no hay pedidos con este estado.</p>
          )}
          <ul className="divide-y">
            {query.data.items.map(order => (
              <li key={order.id}>
                <Link
                  href={`/admin/pedidos/${order.id}`}
                  className="flex flex-col gap-3 p-5 transition-colors hover:bg-muted sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-bold">{order.number}</p>
                    <p className="mt-1 text-sm">{order.customer.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatDateTime(order.placedAt)}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                      {ORDER_LABELS[order.status].label}
                    </span>
                    <span className="font-semibold">{formatMoneyExact(order.total)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <ListPagination {...query.data} onPageChange={setPage} />
        </div>
      )}
    </div>
  )
}
