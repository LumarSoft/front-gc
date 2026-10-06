import { CheckCircle2, Clock3 } from 'lucide-react'
import { formatDateTime } from '@/src/lib/format'
import type { Order } from '@/src/types/api/orders'
import { ORDER_LABELS } from '../lib/order-labels'

export function OrderProgress({ order }: { order: Order }) {
  const current = ORDER_LABELS[order.status]
  return (
    <section className="rounded-2xl bg-surface p-5 sm:p-6" aria-label="Estado del pedido">
      <p className="text-sm font-semibold text-primary">Estado actual</p>
      <h2 className="mt-2 text-2xl font-extrabold">{current.label}</h2>
      <p className="mt-3 text-sm text-muted-foreground">{current.description}</p>
      {order.status === 'PENDING_PAYMENT' && order.expiresAt && (
        <p className="mt-4 rounded-xl border bg-background p-4 text-sm">
          Productos reservados hasta el <strong>{formatDateTime(order.expiresAt)}</strong>. Si el pago no se confirma a
          tiempo, la reserva se libera.
        </p>
      )}
      <ol className="mt-6 space-y-5" aria-label="Historial del pedido">
        {order.history.map((event, index) => (
          <li key={`${event.at}-${index}`} className="flex gap-3">
            {index === order.history.length - 1 ? (
              <Clock3 className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
            ) : (
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-success" aria-hidden />
            )}
            <div>
              <p className="text-sm font-semibold">{ORDER_LABELS[event.status].label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{formatDateTime(event.at)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
