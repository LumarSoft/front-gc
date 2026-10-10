'use client'

import { useState, useSyncExternalStore } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fragmentOrderToken, rememberedOrderAccess } from '@/src/features/orders/lib/order-access'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { refreshMercadoPagoPayment } from '@/src/services/orders.service'
import { paymentOutcome } from '../lib/payment-outcome'

/** While Mercado Pago has not answered yet, ask again every few seconds for about a minute. */
const POLL_MS = 4000
const POLL_WINDOW_MS = 60_000

const subscribe = (callback: () => void): (() => void) => {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}
const serverSnapshot = (): null => null

/**
 * The order after the buyer comes back from Mercado Pago, as the API reads it from Mercado Pago (never from the
 * redirect's query string). The access token comes from the private link or from this browser (kept before leaving).
 */
export function usePaymentReturn(number: string) {
  const token = useSyncExternalStore(
    subscribe,
    () => fragmentOrderToken(window.location.hash) ?? rememberedOrderAccess(number),
    serverSnapshot,
  )
  const [since] = useState(() => Date.now())
  const query = useQuery({
    queryKey: QUERY_KEYS.paymentReturn(number, token),
    queryFn: () => refreshMercadoPagoPayment(number, token!),
    enabled: Boolean(token),
    retry: false,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: ({ state }) =>
      state.data && paymentOutcome(state.data) === 'WAITING' && state.dataUpdatedAt - since < POLL_WINDOW_MS
        ? POLL_MS
        : false,
  })
  const waiting = Boolean(query.data && paymentOutcome(query.data) === 'WAITING')
  return {
    token,
    query,
    /** Still asking Mercado Pago on its own; after that the buyer can pay again or ask once more. */
    polling: waiting && query.dataUpdatedAt - since < POLL_WINDOW_MS,
  }
}
