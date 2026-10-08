import {
  IndexTable,
  IndexTableBody,
  IndexTableCell,
  IndexTableHead,
  IndexTableHeader,
  IndexTableRow,
  IndexTableRowLink,
} from '@/src/features/admin/components/common/index-table'
import { OrderFulfillmentBadge, OrderPaymentBadge } from '@/src/features/admin/components/orders/order-badges'
import { DELIVERY_LABELS, itemCount } from '@/src/features/admin/lib/order-display'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import { formatMoneyExact } from '@/src/lib/format'
import type { Order } from '@/src/types/api/orders'

/** Desktop list (md and up): one dense row per order; any cell opens it. */
export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <IndexTable className="hidden md:table">
      <IndexTableHeader>
        <IndexTableHead>Pedido</IndexTableHead>
        <IndexTableHead>Fecha</IndexTableHead>
        <IndexTableHead className="w-full">Cliente</IndexTableHead>
        <IndexTableHead className="text-right">Total</IndexTableHead>
        <IndexTableHead>Pago</IndexTableHead>
        <IndexTableHead>Preparación</IndexTableHead>
        <IndexTableHead>Artículos</IndexTableHead>
        <IndexTableHead>Entrega</IndexTableHead>
      </IndexTableHeader>
      <IndexTableBody>
        {orders.map(order => {
          const items = itemCount(order.items)
          return (
            <IndexTableRow key={order.id}>
              <IndexTableCell>
                <IndexTableRowLink href={`/admin/pedidos/${order.id}`} className="font-semibold">
                  {order.number}
                </IndexTableRowLink>
              </IndexTableCell>
              <IndexTableCell className="text-muted-foreground">{formatOrderDate(order.placedAt)}</IndexTableCell>
              <IndexTableCell className="max-w-0 min-w-40">
                <span className="block truncate">{order.customer.name}</span>
              </IndexTableCell>
              <IndexTableCell className="text-right tabular-nums">{formatMoneyExact(order.total)}</IndexTableCell>
              <IndexTableCell>
                <OrderPaymentBadge status={order.status} />
              </IndexTableCell>
              <IndexTableCell>
                <OrderFulfillmentBadge status={order.status} delivery={order.deliveryMethod} />
              </IndexTableCell>
              <IndexTableCell className="text-muted-foreground">
                {items} {items === 1 ? 'artículo' : 'artículos'}
              </IndexTableCell>
              <IndexTableCell className="text-muted-foreground">{DELIVERY_LABELS[order.deliveryMethod]}</IndexTableCell>
            </IndexTableRow>
          )
        })}
      </IndexTableBody>
    </IndexTable>
  )
}
