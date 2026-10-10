'use client'

import { useState } from 'react'
import type { UseMutationResult } from '@tanstack/react-query'
import type { UseFormReturn } from 'react-hook-form'
import { cartErrorMessage } from '@/src/features/cart/lib/cart-messages'
import { formatMoneyExact } from '@/src/lib/format'
import type { Checkout, PreviewCheckoutRequest } from '@/src/types/api/checkout'
import type { Money } from '@/src/types/api/money'
import { previewInput } from '../lib/checkout-input'
import type { CheckoutValues } from '../lib/checkout-schema'
import { isRequoteError } from '../lib/shipping-quote-errors'
import { usePlaceOrder } from './use-place-order'
import type { ShippingQuotesState } from './use-shipping-quotes'

type SubmitDeps = {
  form: UseFormReturn<CheckoutValues>
  quotes: ShippingQuotesState
  preview: UseMutationResult<Checkout, Error, PreviewCheckoutRequest>
  /** The total the buyer is looking at. */
  shownTotal: Money | null
}

/**
 * "Pagar ahora" in one click: the API reviews contact, delivery and prices, and the order is placed only when its
 * total is the one on screen. If it changed, the summary shows the new total and the buyer confirms again.
 */
export function useCheckoutSubmit({ form, quotes, preview, shownTotal }: SubmitDeps) {
  const placing = usePlaceOrder()
  const [error, setError] = useState<string | null>(null)
  const submit = form.handleSubmit(async values => {
    setError(null)
    if (values.deliveryMode === 'SHIP' && values.deliveryMethod === 'CARRIER' && !quotes.checkSelection()) return
    let reviewed: Checkout
    try {
      reviewed = await preview.mutateAsync(previewInput(values))
    } catch (caught) {
      if (isRequoteError(caught)) quotes.reset()
      setError(cartErrorMessage(caught))
      return
    }
    if (!reviewed.reviewToken || !reviewed.total) {
      setError('No pudimos calcular el total de tu compra. Revisá los datos y probá de nuevo.')
      return
    }
    if (reviewed.total.amount !== shownTotal?.amount) {
      setError(`El total se actualizó a ${formatMoneyExact(reviewed.total)}. Revisalo y confirmá de nuevo.`)
      return
    }
    try {
      await placing.place({ reviewed, paymentMethod: values.paymentMethod })
    } catch (caught) {
      setError(cartErrorMessage(caught))
    }
  })
  return { submit, error, pending: preview.isPending || placing.pending }
}
