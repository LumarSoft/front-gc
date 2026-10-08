import Link from 'next/link'
import { OrderFulfillmentBadge, OrderPaymentBadge } from '@/src/features/admin/components/orders/order-badges'
import { DELIVERY_LABELS } from '@/src/features/admin/lib/order-display'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import { formatMoneyExact } from '@/src/lib/format'
import type { Order } from '@/src/types/api/orders'

/** Phone list (below md): number and total on top, customer and date, then the two states. */
export function OrdersMobileList({ orders }: { orders: Order[] }) {
  return (
    <ul className="divide-y md:hidden">
      {orders.map(order => (
        <li key={order.id}>
          <Link
            href={`/admin/pedidos/${order.id}`}
            className="flex flex-col gap-1.5 px-4 py-3 transition-colors active:bg-table-head"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold">{order.number}</span>
              <span className="text-sm tabular-nums">{formatMoneyExact(order.total)}</span>
            </div>
            <p className="truncate text-sm">{order.customer.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatOrderDate(order.placedAt)} · {DELIVERY_LABELS[order.deliveryMethod]}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <OrderPaymentBadge status={order.status} />
              <OrderFulfillmentBadge status={order.status} delivery={order.deliveryMethod} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
