'use client'

import Link from 'next/link'
import type { AuthUser } from '@/src/types/api/auth'
import type { Checkout } from '@/src/types/api/checkout'
import type { CheckoutTotals } from '../hooks/use-checkout-totals'
import type { ShippingQuotesState } from '../hooks/use-shipping-quotes'
import { CheckoutContact } from './checkout-contact'
import { CheckoutDelivery } from './checkout-delivery'
import { CheckoutPayment } from './checkout-payment'
import { CheckoutSubmit } from './checkout-submit'

type CheckoutFormProps = {
  checkout: Checkout
  user: AuthUser | null | undefined
  quotes: ShippingQuotesState
  totals: CheckoutTotals
  submit: { onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; pending: boolean; error: string | null }
}

/** The whole purchase on one page: contact, delivery, payment and the pay button. */
export function CheckoutForm({ checkout, user, quotes, totals, submit }: CheckoutFormProps) {
  return (
    // POST: even before the page is interactive, a native submit never puts personal data in the URL.
    <form method="post" onSubmit={submit.onSubmit} noValidate className="space-y-10">
      {checkout.cart.hasIssues && (
        <p role="alert" className="rounded-lg border border-destructive px-4 py-3 text-sm text-destructive">
          Hay productos cuyo precio o stock cambió.{' '}
          <Link href="/carrito" className="font-semibold underline">
            Revisá tu carrito
          </Link>{' '}
          para continuar.
        </p>
      )}
      <fieldset disabled={submit.pending} className="space-y-10">
        <CheckoutContact user={user} />
        <CheckoutDelivery checkout={checkout} quotes={quotes} />
        <CheckoutPayment options={checkout.paymentOptions} />
      </fieldset>
      <CheckoutSubmit totals={totals} pending={submit.pending} disabled={!checkout.canReview} error={submit.error} />
    </form>
  )
}
