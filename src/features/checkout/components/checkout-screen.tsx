'use client'

import type { UseMutationResult } from '@tanstack/react-query'
import { FormProvider } from 'react-hook-form'
import { TrackActivity } from '@/src/features/activity/components/track-activity'
import type { AuthUser } from '@/src/types/api/auth'
import type { Checkout, PreviewCheckoutRequest } from '@/src/types/api/checkout'
import { useCheckoutForm } from '../hooks/use-checkout-form'
import { useCheckoutSubmit } from '../hooks/use-checkout-submit'
import { useCheckoutTotals } from '../hooks/use-checkout-totals'
import { CheckoutForm } from './checkout-form'
import { CheckoutSummary } from './summary/checkout-summary'
import { MobileSummary } from './summary/mobile-summary'

type CheckoutScreenProps = {
  checkout: Checkout
  user: AuthUser | null | undefined
  preview: UseMutationResult<Checkout, Error, PreviewCheckoutRequest>
  cartBusy: boolean
}

/** Form on the left, summary on a grey column on the right (folded into a bar on phones). */
export function CheckoutScreen({ checkout, user, preview, cartBusy }: CheckoutScreenProps) {
  const { form, quotes } = useCheckoutForm(checkout, user)
  const totals = useCheckoutTotals(checkout, form.control, quotes)
  const { submit, error, pending } = useCheckoutSubmit({ form, quotes, preview, shownTotal: totals.total })
  return (
    <FormProvider {...form}>
      <TrackActivity event={{ type: 'CHECKOUT_STARTED' }} />
      <MobileSummary cart={checkout.cart} totals={totals} />
      <div className="flex-1 lg:grid lg:grid-cols-2">
        <div className="px-4 py-8 sm:px-6 lg:flex lg:justify-end lg:py-12 lg:pr-12 xl:pr-16">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <CheckoutForm
              checkout={checkout}
              user={user}
              quotes={quotes}
              totals={totals}
              submit={{ onSubmit: event => void submit(event), pending: pending || cartBusy, error }}
            />
          </div>
        </div>
        <aside
          className="hidden border-l bg-surface lg:block lg:py-12 lg:pl-12 xl:pl-16"
          aria-label="Resumen del pedido"
        >
          <div className="sticky top-12 max-w-md">
            <CheckoutSummary cart={checkout.cart} totals={totals} />
          </div>
        </aside>
      </div>
    </FormProvider>
  )
}
