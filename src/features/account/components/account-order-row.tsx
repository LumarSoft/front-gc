import Link from 'next/link'
import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import { OrderStatusBadge } from '@/src/features/orders/components/order-status-badge'
import { formatDate, formatMoneyExact } from '@/src/lib/format'
import type { Order } from '@/src/types/api/orders'
import { OrderThumbs } from './order-thumbs'

function unitsLabel(items: Order['items']): string {
  const units = items.reduce((sum, item) => sum + item.quantity, 0)
  return units === 1 ? '1 producto' : `${units} productos`
}

/** One order in the account lists: photos, number, state, date and total; opens its detail. */
export function AccountOrderRow({ order }: { order: Order }) {
  return (
    <li>
      <Link
        href={`/mi-cuenta/pedidos/${order.number}`}
        className="group flex items-center gap-3 rounded-2xl border bg-card p-3 transition-colors hover:border-foreground/25 sm:gap-4 sm:p-4"
      >
        <OrderThumbs items={order.items} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="font-bold tabular-nums">{order.number}</p>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatDate(order.placedAt)} · {unitsLabel(order.items)}
          </p>
          <p className="mt-1 text-sm font-semibold sm:hidden">{formatMoneyExact(order.total)}</p>
        </div>
        <p className="hidden shrink-0 font-semibold tabular-nums sm:block">{formatMoneyExact(order.total)}</p>
        <CaretRightIcon
          weight="regular"
          className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
        <span className="sr-only">Ver el detalle del pedido</span>
      </Link>
    </li>
  )
}

export function AccountOrderRowsSkeleton({ rows }: { rows: number }) {
  return (
    <div aria-busy="true" className="flex flex-col gap-3">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="h-20 animate-pulse rounded-2xl bg-muted sm:h-[88px]" />
      ))}
    </div>
  )
}
