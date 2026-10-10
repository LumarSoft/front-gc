'use client'

import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useWatch, type UseFormReturn } from 'react-hook-form'
import { quoteShipping } from '@/src/services/checkout.service'
import type { ShippingDestination, ShippingQuotes } from '@/src/types/api/checkout'
import { DESTINATION_FIELDS, type CheckoutValues } from '../lib/checkout-schema'
import { groupQuoteOptions, sameDestination } from '../lib/shipping-quote-display'
import { quoteErrorMessage } from '../lib/shipping-quote-errors'

type Quoted = { destination: ShippingDestination; quotes: ShippingQuotes }

/** Wait this long after the last keystroke in the destination before asking the carrier provider for prices. */
const QUOTE_DELAY_MS = 800

const destinationKey = ({ postalCode, city, province }: ShippingDestination): string | null =>
  postalCode.trim().length >= 4 && city.trim() && province ? `${postalCode}|${city}|${province}`.toLowerCase() : null

/**
 * Carrier options for the destination typed in the form, quoted on their own once postal code, city and province are
 * filled (like a store checkout: "enter your address to see shipping methods"). Options belong to the destination
 * they were quoted for: editing it hides them until the new quote arrives.
 */
export function useShippingQuotes(form: UseFormReturn<CheckoutValues>, carrierEnabled: boolean) {
  const [quoted, setQuoted] = useState<Quoted | null>(null)
  const [attempted, setAttempted] = useState<string | null>(null)
  const [postalCode, city, province] = useWatch({ control: form.control, name: DESTINATION_FIELDS })
  const mode = useWatch({ control: form.control, name: 'deliveryMode' })
  const destination: ShippingDestination = { postalCode: postalCode.trim(), city: city.trim(), province }
  const fresh = quoted && sameDestination(quoted.destination, destination) ? quoted.quotes : null
  const key = destinationKey(destination)
  const { mutate, isPending, error } = useMutation({
    mutationFn: quoteShipping,
    onSuccess: (quotes, quotedDestination) => {
      setQuoted({ destination: quotedDestination, quotes })
      // Like most checkouts, the first home delivery is preselected; Rosario delivery, if chosen, is kept.
      if (form.getValues('deliveryMethod') === 'CARRIER')
        form.setValue('shippingQuoteId', groupQuoteOptions(quotes.options).home[0]?.id ?? null)
    },
  })
  useEffect(() => {
    if (!carrierEnabled || mode !== 'SHIP' || !key || fresh || key === attempted || isPending) return
    const timer = setTimeout(() => {
      setAttempted(key)
      mutate({ postalCode: postalCode.trim(), city: city.trim(), province })
    }, QUOTE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [carrierEnabled, mode, key, fresh, attempted, isPending, mutate, postalCode, city, province])

  const reset = (): void => {
    setQuoted(null)
    setAttempted(null)
    form.setValue('shippingQuoteId', null)
  }
  return {
    /** Options for the current destination; null before quoting or after the destination changed. */
    options: fresh?.options ?? null,
    /** The destination is complete enough to quote. */
    ready: Boolean(key),
    pending: isPending,
    error: error && attempted === key ? quoteErrorMessage(error) : null,
    /** Ask again for the same destination (after an error). */
    retry: (): void => setAttempted(null),
    reset,
    /** Before paying: the chosen option must belong to the current, unexpired quote. */
    checkSelection: (): boolean => {
      const id = form.getValues('shippingQuoteId')
      const expired = fresh !== null && Date.parse(fresh.expiresAt) <= Date.now()
      if (fresh && !expired && fresh.options.some(option => option.id === id)) return true
      if (expired) reset()
      form.setError('shippingQuoteId', {
        message: expired ? 'La cotización venció: ya la estamos actualizando.' : 'Elegí un método de envío',
      })
      return false
    },
  }
}

export type ShippingQuotesState = ReturnType<typeof useShippingQuotes>
