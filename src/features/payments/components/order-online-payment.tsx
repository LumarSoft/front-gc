import { formatDateTime } from '@/src/lib/format'
import type { Order } from '@/src/types/api/orders'
import { paymentOutcome } from '../lib/payment-outcome'
import { paymentDeadline } from '../lib/payment-window'
import { PayOnlineButton } from './pay-online-button'

/** On the order page of an unpaid Mercado Pago order: pay (or try again) before the reservation ends. */
export function OrderOnlinePayment({ order, accessToken }: { order: Order; accessToken: string }) {
  const rejected = paymentOutcome(order) === 'REJECTED'
  const deadline = paymentDeadline(order)
  return (
    <section className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6" aria-label="Pago del pedido">
      <h2 className="font-bold">{rejected ? 'El último pago no se aprobó' : 'Falta pagar tu pedido'}</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {rejected
          ? 'Mercado Pago rechazó el intento y no se te cobró. Podés probar con otra tarjeta o medio de pago.'
          : 'Tus productos están reservados. Pagá con Mercado Pago y el pedido se confirma apenas se aprueba.'}
        {deadline && (
          <>
            {' '}
            Podés pagar hasta el <strong className="text-foreground">{formatDateTime(deadline)}</strong>.
          </>
        )}
      </p>
      <PayOnlineButton
        number={order.number}
        accessToken={accessToken}
        label={rejected ? 'Intentar de nuevo' : undefined}
        className="mt-4"
      />
    </section>
  )
}
