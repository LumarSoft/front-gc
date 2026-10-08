'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { finishPendingOrder, orderPath, storedPendingOrderToken } from '@/src/features/orders/lib/order-access'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { recoverOrder } from '@/src/services/orders.service'

const subscribe = (): (() => void) => () => {}
const serverSnapshot = (): null => null

/** Recovers an order when the original response was lost, even though its cart has already been converted. */
export function useRecoverOrder(enabled: boolean) {
  const router = useRouter()
  const client = useQueryClient()
  const token = useSyncExternalStore(subscribe, storedPendingOrderToken, serverSnapshot)
  const { mutate, ...mutation } = useMutation({
    mutationFn: (accessToken: string) => recoverOrder(accessToken),
    onSuccess: (order, accessToken) => {
      router.replace(orderPath(order.number, accessToken))
      finishPendingOrder()
      void client.invalidateQueries({ queryKey: QUERY_KEYS.myOrders })
    },
  })
  useEffect(() => {
    if (enabled && token) mutate(token)
  }, [enabled, token, mutate])
  return {
    available: Boolean(token),
    pending: mutation.isPending || mutation.isSuccess,
    recover: () => {
      if (token) mutate(token)
    },
  }
}
