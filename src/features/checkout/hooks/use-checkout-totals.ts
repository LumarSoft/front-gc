'use client'

import { useWatch, type Control } from 'react-hook-form'
import type { Checkout } from '@/src/types/api/checkout'
import type { Money } from '@/src/types/api/money'
import { addMoney } from '../lib/checkout-money'
import type { CheckoutValues } from '../lib/checkout-schema'
import type { ShippingQuotesState } from './use-shipping-quotes'

export type CheckoutTotals = {
  subtotal: Money | null
  /** Delivery cost of the current choice; null while it is not known yet. */
  shipping: Money | null
  /** Why the delivery cost is not known yet. */
  shippingHint: string
  total: Money | null
  itemCount: number
}

/** Subtotal, delivery and total for the summary, from amounts the API priced (the API checks them again to pay). */
export function useCheckoutTotals(
  checkout: Checkout,
  control: Control<CheckoutValues>,
  quotes: ShippingQuotesState,
): CheckoutTotals {
  const [mode, method, quoteId] = useWatch({ control, name: ['deliveryMode', 'deliveryMethod', 'shippingQuoteId'] })
  const cost = (code: string): Money | null =>
    checkout.deliveryOptions.find(option => option.code === code)?.cost ?? null
  const shipping =
    mode === 'PICKUP'
      ? cost('STORE_PICKUP')
      : method === 'LOCAL_DELIVERY'
        ? cost('LOCAL_DELIVERY')
        : (quotes.options?.find(option => option.id === quoteId)?.cost ?? null)
  const subtotal = checkout.cart.subtotal
  return {
    subtotal,
    shipping,
    shippingHint: quotes.pending ? 'Calculando…' : quotes.ready ? 'Elegí un método' : 'Ingresá tu dirección',
    total: subtotal && shipping ? addMoney(subtotal, shipping) : null,
    itemCount: checkout.cart.itemCount,
  }
}
