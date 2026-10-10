import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { orderPath } from '@/src/features/orders/lib/order-access'
import { formatDateTime, formatMoneyExact } from '@/src/lib/format'
import { cn } from '@/src/lib/utils'
import type { Order } from '@/src/types/api/orders'
import { paymentOutcome, type PaymentOutcome } from '../lib/payment-outcome'
import { canPayOnline, paymentDeadline } from '../lib/payment-window'
import { PayOnlineButton } from './pay-online-button'

const COPY: Record<PaymentOutcome, { title: string; text: string }> = {
  APPROVED: {
    title: 'Pago aprobado',
    text: 'Mercado Pago aprobó tu pago y tu pedido quedó confirmado. Te avisamos los próximos pasos en el seguimiento.',
  },
  REJECTED: {
    title: 'El pago no se aprobó',
    text: 'Mercado Pago rechazó el pago y no se te cobró. Podés intentar de nuevo con otra tarjeta o medio de pago.',
  },
  WAITING: {
    title: 'Todavía no tenemos la confirmación del pago',
    text: 'Si no completaste el pago en Mercado Pago, podés hacerlo ahora. Si ya pagaste, puede tardar unos minutos.',
  },
  CLOSED: {
    title: 'Este pedido ya no espera un pago',
    text: 'La reserva venció o el pedido se canceló. Si Mercado Pago te cobró, comunicate con el local.',
  },
}

type PaymentResultProps = { order: Order; accessToken: string; polling: boolean; onCheckAgain: () => void }

/** The outcome of paying with Mercado Pago, with what the buyer can do next. */
export function PaymentResult({ order, accessToken, polling, onCheckAgain }: PaymentResultProps) {
  const outcome = paymentOutcome(order)
  const copy = COPY[outcome]
  const payable = canPayOnline(order)
  const deadline = paymentDeadline(order)
  return (
    <section
      aria-live="polite"
      className={cn(
        'rounded-3xl border p-6 sm:p-8',
        outcome === 'APPROVED' && 'border-success/40 bg-success/5',
        outcome === 'REJECTED' && 'border-destructive/40',
      )}
    >
      <p className={cn('text-sm font-semibold', outcome === 'APPROVED' ? 'text-success' : 'text-primary')}>
        Pedido {order.number} · {formatMoneyExact(order.total)}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
        {outcome === 'WAITING' && polling ? 'Estamos confirmando tu pago…' : copy.title}
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {outcome === 'WAITING' && polling
          ? 'Le estamos preguntando a Mercado Pago por tu pago. No cierres esta página.'
          : copy.text}
        {payable && outcome !== 'APPROVED' && deadline && !polling && (
          <> Podés pagar hasta el {formatDateTime(deadline)}.</>
        )}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
        {payable && !polling && outcome !== 'APPROVED' && (
          <PayOnlineButton
            number={order.number}
            accessToken={accessToken}
            label={outcome === 'REJECTED' ? 'Intentar de nuevo' : undefined}
          />
        )}
        {outcome === 'WAITING' && !polling && (
          <Button variant="outline" className="h-12 rounded-full" onClick={onCheckAgain}>
            Volver a consultar
          </Button>
        )}
        <Button
          variant={outcome === 'APPROVED' ? 'default' : 'outline'}
          className="h-12 rounded-full font-bold"
          asChild
        >
          <Link href={orderPath(order.number, accessToken)}>Ver el seguimiento del pedido</Link>
        </Button>
      </div>
    </section>
  )
}
