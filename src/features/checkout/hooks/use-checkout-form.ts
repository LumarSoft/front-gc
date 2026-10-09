'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AuthUser } from '@/src/types/api/auth'
import type { PreviewCheckoutRequest } from '@/src/types/api/checkout'
import { checkoutSchema, normalizeTaxId, type CheckoutValues } from '../lib/checkout-schema'
import { isRequoteError } from '../lib/shipping-quote-errors'
import { useShippingQuotes } from './use-shipping-quotes'

export type PreviewHandler = (input: PreviewCheckoutRequest, options: { onError: (error: unknown) => void }) => void

function previewInput({ phone, shippingAddress, shippingQuoteId, ...values }: CheckoutValues): PreviewCheckoutRequest {
  const { taxId, ...address } = shippingAddress
  const input: PreviewCheckoutRequest = { ...values, phone: phone || undefined }
  if (values.deliveryMethod === 'LOCAL_DELIVERY') return { ...input, shippingAddress: address }
  if (values.deliveryMethod === 'CARRIER')
    return {
      ...input,
      shippingAddress: { ...address, taxId: normalizeTaxId(taxId) },
      shippingQuoteId: shippingQuoteId!,
    }
  return input
}

export function useCheckoutForm(user: AuthUser | null | undefined, onPreview: PreviewHandler) {
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user ? `${user.firstName} ${user.lastName}` : '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      deliveryMethod: 'STORE_PICKUP',
      shippingAddress: { street: '', streetNumber: '', city: '', province: '', postalCode: '', taxId: '' },
      shippingQuoteId: null,
    },
  })
  const quotes = useShippingQuotes(form)
  const submit = form.handleSubmit(values => {
    if (values.deliveryMethod === 'CARRIER' && !quotes.checkSelection()) return
    onPreview(previewInput(values), {
      onError: error => {
        if (isRequoteError(error)) quotes.reset()
      },
    })
  })
  return { form, quotes, submit }
}
