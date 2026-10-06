'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getCheckout, previewCheckout } from '@/src/services/checkout.service'
import { cartErrorMessage } from '@/src/features/cart/lib/cart-messages'
import { useCartBusy } from '@/src/features/cart/hooks/use-cart'

export function useCheckout() {
  const session = useCurrentUser()
  const client = useQueryClient()
  const cartBusy = useCartBusy()
  const userId = session.data?.id ?? null
  const queryKey = QUERY_KEYS.checkoutFor(userId)
  const query = useQuery({
    queryKey,
    queryFn: getCheckout,
    enabled: !session.isPending,
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: 1,
  })
  const preview = useMutation({
    mutationKey: QUERY_KEYS.cart,
    scope: { id: 'cart' },
    mutationFn: previewCheckout,
    onMutate: () => client.cancelQueries({ queryKey: QUERY_KEYS.cart }),
    onSuccess: data => {
      client.setQueryData(queryKey, data)
      client.setQueryData(QUERY_KEYS.cartFor(userId), data.cart)
    },
    onError: () => {
      void client.invalidateQueries({ queryKey })
    },
  })
  return {
    query,
    preview,
    pending: cartBusy,
    user: session.data,
    error: preview.error ? cartErrorMessage(preview.error) : null,
  }
}
