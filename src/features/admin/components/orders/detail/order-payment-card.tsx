'use client'

import { ClockIcon, LoaderCircleIcon, TriangleAlertIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { useNow } from '@/src/features/admin/hooks/use-now'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { OrderPaymentBadge } from '@/src/features/admin/components/orders/order-badges'
import { itemCount } from '@/src/features/admin/lib/order-display'
import { formatFromNow, formatOrderDate } from '@/src/features/admin/lib/relative-date'
import { formatMoneyExact } from '@/src/lib/format'
import { cn } from '@/src/lib/utils'
import type { Order } from '@/src/types/api/orders'

type OrderPaymentCardProps = {
  order: Order
  canConfirm: boolean
  pending: boolean
  onConfirm: () => void
}

/** Amounts, the stock reservation deadline while unpaid, and the "mark as paid" action. */
export function OrderPaymentCard({ order, canConfirm, pending, onConfirm }: OrderPaymentCardProps) {
  const items = itemCount(order.items)
  const unpaid = order.status === 'PENDING_PAYMENT'
  const now = useNow()
  const overdue = unpaid && order.expiresAt !== null && Date.parse(order.expiresAt) <= now.getTime()
  const shippingFree = Number(order.shippingTotal.amount) === 0

  return (
    <AdminCard
      title={<OrderPaymentBadge status={order.status} />}
      footer={
        canConfirm && (
          <Button onClick={onConfirm} disabled={pending}>
            {pending && <LoaderCircleIcon className="animate-spin" />}
            Marcar como pagado
          </Button>
        )
      }
    >
      <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 text-sm">
        <dt>Subtotal</dt>
        <dd className="text-right tabular-nums">
          <span className="mr-4 text-muted-foreground">
            {items} {items === 1 ? 'artículo' : 'artículos'}
          </span>
          {formatMoneyExact(order.subtotal)}
        </dd>
        <dt>Entrega</dt>
        <dd className="text-right tabular-nums">
          {shippingFree ? 'Sin cargo' : formatMoneyExact(order.shippingTotal)}
        </dd>
        <dt className="font-semibold">Total</dt>
        <dd className="text-right font-semibold tabular-nums">{formatMoneyExact(order.total)}</dd>
      </dl>
      {unpaid && order.expiresAt && (
        <p
          className={cn(
            'mt-4 flex items-start gap-2 rounded-lg px-3 py-2 text-sm',
            overdue
              ? 'bg-tone-critical text-tone-critical-foreground'
              : 'bg-tone-attention text-tone-attention-foreground',
          )}
        >
          {overdue ? (
            <TriangleAlertIcon strokeWidth={2.25} className="mt-0.5 size-4 shrink-0" />
          ) : (
            <ClockIcon className="mt-0.5 size-4 shrink-0" />
          )}
          {overdue
            ? `La reserva venció ${formatFromNow(order.expiresAt, now)}. No confirmes este pago: el cliente tiene que hacer un pedido nuevo.`
            : `El stock queda reservado hasta ${formatOrderDate(order.expiresAt, now).toLowerCase()} (${formatFromNow(order.expiresAt, now)}). El pago se coordina con el cliente.`}
        </p>
      )}
    </AdminCard>
  )
}
