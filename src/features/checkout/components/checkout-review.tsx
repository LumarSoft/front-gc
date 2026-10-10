'use client'

import { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import type { Checkout, CheckoutPaymentMethod } from '@/src/types/api/checkout'
import { defaultPaymentMethod } from '../lib/payment-options'
import { useCheckoutReviewFocus } from '../hooks/use-checkout-review-focus'
import { usePlaceOrder } from '../hooks/use-place-order'
import { useCartBusy } from '@/src/features/cart/hooks/use-cart'
import { CheckoutDeliveryReview } from './checkout-delivery-review'
import { CheckoutPayment } from './checkout-payment'

export function CheckoutReview({ checkout, onEdit }: { checkout: Checkout; onEdit: () => void }) {
  const heading = useCheckoutReviewFocus()
  const [paymentMethod, setPaymentMethod] = useState<CheckoutPaymentMethod>(() =>
    defaultPaymentMethod(checkout.paymentOptions),
  )
  const { confirm, pending, error } = usePlaceOrder(checkout, paymentMethod)
  const busy = useCartBusy()
  const customer = checkout.customer!
  return (
    <section className="space-y-6" aria-label="Revisión de la compra">
      <div>
        <p className="text-sm font-semibold text-success">Datos revisados</p>
        <h2 ref={heading} tabIndex={-1} className="mt-2 scroll-mt-44 text-2xl font-extrabold outline-none">
          Revisá que esté todo bien
        </h2>
      </div>
      <div className="rounded-2xl border p-5">
        <h3 className="font-bold">Datos de contacto</h3>
        <p className="mt-3">{customer.name}</p>
        <p className="break-all text-sm text-muted-foreground">{customer.email}</p>
        {customer.phone && <p className="text-sm text-muted-foreground">{customer.phone}</p>}
      </div>
      <CheckoutDeliveryReview checkout={checkout} />
      <CheckoutPayment
        options={checkout.paymentOptions}
        value={paymentMethod}
        onChange={setPaymentMethod}
        disabled={pending}
      />
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error} Podés volver a revisar la compra o reintentar.
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          className="h-12 rounded-full font-bold sm:flex-1"
          disabled={pending || busy || !checkout.reviewToken}
          onClick={confirm}
        >
          {paymentMethod === 'MERCADO_PAGO'
            ? pending
              ? 'Abriendo Mercado Pago…'
              : 'Pagar con Mercado Pago'
            : pending
              ? 'Confirmando…'
              : 'Confirmar pedido'}
        </Button>
        <Button variant="outline" className="h-12 rounded-full" disabled={pending || busy} onClick={onEdit}>
          Editar mis datos
        </Button>
      </div>
    </section>
  )
}
