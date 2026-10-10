import { TriangleAlertIcon } from 'lucide-react'
import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import { PAYMENT_STATUS_BADGES } from '@/src/features/admin/lib/payment-display'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import { formatMoneyExact } from '@/src/lib/format'
import type { Order } from '@/src/types/api/orders'

/** Mercado Pago operations of the order, as Mercado Pago reported them, and a refund warning when one is left over. */
export function OrderOnlinePayments({ order, now }: { order: Order; now: Date }) {
  const payments = (order.payments ?? []).filter(payment => payment.provider === 'MERCADO_PAGO')
  if (!payments.length && !order.refundNeeded) return null
  return (
    <div className="mt-4 space-y-3 border-t pt-4">
      <p className="text-sm font-medium">Operaciones de Mercado Pago</p>
      <ul className="space-y-2 text-sm">
        {payments.map(payment => {
          const badge = PAYMENT_STATUS_BADGES[payment.status]
          return (
            <li key={payment.externalId ?? payment.at} className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <ToneBadge tone={badge.tone}>{badge.label}</ToneBadge>
              <span className="tabular-nums">{formatMoneyExact(payment.amount)}</span>
              <span className="text-muted-foreground">
                N.º {payment.externalId} · {formatOrderDate(payment.at, now)}
              </span>
              {payment.statusDetail && payment.status !== 'APPROVED' && (
                <span className="w-full text-xs text-muted-foreground">Motivo: {payment.statusDetail}</span>
              )}
            </li>
          )
        })}
      </ul>
      {order.refundNeeded && (
        <p className="flex items-start gap-2 rounded-lg bg-tone-critical px-3 py-2 text-sm text-tone-critical-foreground">
          <TriangleAlertIcon strokeWidth={2.25} className="mt-0.5 size-4 shrink-0" />
          Hay un pago aprobado que no pagó este pedido (llegó tarde, es un segundo pago o el monto no coincide).
          Devolvelo desde Mercado Pago con el número de operación.
        </p>
      )}
    </div>
  )
}
