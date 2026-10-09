'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useWatch, type UseFormReturn } from 'react-hook-form'
import { quoteShipping } from '@/src/services/checkout.service'
import type { ShippingDestination, ShippingQuotes } from '@/src/types/api/checkout'
import { DESTINATION_FIELDS, type CheckoutValues } from '../lib/checkout-schema'
import { sameDestination } from '../lib/shipping-quote-display'
import { quoteErrorMessage } from '../lib/shipping-quote-errors'

type Quoted = { destination: ShippingDestination; quotes: ShippingQuotes }

/**
 * Carrier options for the destination typed in the form. Options belong to the destination they were quoted for:
 * editing the postal code, city or province hides them until the buyer quotes again.
 */
export function useShippingQuotes(form: UseFormReturn<CheckoutValues>) {
  const [quoted, setQuoted] = useState<Quoted | null>(null)
  const [postalCode, city, province] = useWatch({ control: form.control, name: DESTINATION_FIELDS })
  const destination: ShippingDestination = { postalCode, city, province }
  const fresh = quoted && sameDestination(quoted.destination, destination) ? quoted.quotes : null
  const mutation = useMutation({
    mutationFn: quoteShipping,
    onSuccess: (quotes, quotedDestination) => {
      setQuoted({ destination: quotedDestination, quotes })
      form.setValue('shippingQuoteId', null)
    },
  })
  const reset = (): void => {
    setQuoted(null)
    form.setValue('shippingQuoteId', null)
  }

  return {
    /** Options for the current destination; null before quoting or after the destination changed. */
    options: fresh?.options ?? null,
    /** Options were shown for a different destination. */
    stale: Boolean(quoted) && !fresh,
    pending: mutation.isPending,
    error: mutation.error ? quoteErrorMessage(mutation.error) : null,
    quote: async (): Promise<void> => {
      if (await form.trigger([...DESTINATION_FIELDS]))
        mutation.mutate({ postalCode: postalCode.trim(), city: city.trim(), province: province.trim() })
    },
    reset,
    /** Before previewing: the chosen option must belong to the current, unexpired quote. */
    checkSelection: (): boolean => {
      const id = form.getValues('shippingQuoteId')
      const expired = fresh !== null && Date.parse(fresh.expiresAt) <= Date.now()
      if (fresh && !expired && fresh.options.some(option => option.id === id)) return true
      if (expired) reset()
      form.setError('shippingQuoteId', {
        message: expired ? 'La cotización venció. Cotizá el envío de nuevo.' : 'Cotizá y elegí una opción de envío',
      })
      return false
    },
  }
}

export type ShippingQuotesState = ReturnType<typeof useShippingQuotes>
