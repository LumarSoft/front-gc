'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AuthUser } from '@/src/types/api/auth'
import type { Checkout } from '@/src/types/api/checkout'
import { checkoutSchema, type CheckoutValues } from '../lib/checkout-schema'
import { defaultPaymentMethod } from '../lib/payment-options'
import { useShippingQuotes } from './use-shipping-quotes'

const enabled = (checkout: Checkout, code: string): boolean =>
  checkout.deliveryOptions.some(option => option.code === code && option.enabled)

/** The one-page checkout form: starts with shipping when the store can ship, like most checkouts. */
export function useCheckoutForm(checkout: Checkout, user: AuthUser | null | undefined) {
  const canShip = enabled(checkout, 'LOCAL_DELIVERY') || enabled(checkout, 'CARRIER')
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: user?.email ?? '',
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      phone: user?.phone ?? '',
      deliveryMode: canShip ? 'SHIP' : 'PICKUP',
      deliveryMethod: canShip ? 'CARRIER' : 'STORE_PICKUP',
      shippingAddress: { street: '', streetNumber: '', city: '', province: '', postalCode: '', taxId: '' },
      shippingQuoteId: null,
      paymentMethod: defaultPaymentMethod(checkout.paymentOptions),
    },
  })
  const quotes = useShippingQuotes(form, enabled(checkout, 'CARRIER'))
  return { form, quotes }
}
