'use client'

import { useIsMutating, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { addCartItem, clearCart, getCart, removeCartItem, setCartQuantity } from '@/src/services/cart.service'
import type { Cart } from '@/src/types/api/cart'

function useCartIdentity() {
  const session = useCurrentUser()
  return { queryKey: QUERY_KEYS.cartFor(session.data?.id ?? null), sessionPending: session.isPending }
}

export function useCart() {
  const { queryKey, sessionPending } = useCartIdentity()
  return useQuery({
    queryKey,
    queryFn: getCart,
    enabled: !sessionPending,
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: 1,
  })
}

export function useCartBusy(): boolean {
  return useIsMutating({ mutationKey: QUERY_KEYS.cart }) > 0
}

function useCartMutation<T>(mutationFn: (input: T) => Promise<Cart>) {
  const queryClient = useQueryClient()
  const { queryKey } = useCartIdentity()
  return useMutation({
    mutationKey: QUERY_KEYS.cart,
    scope: { id: 'cart' },
    mutationFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.cart })
    },
    onSuccess: cart => {
      queryClient.setQueryData(queryKey, cart)
      void queryClient.invalidateQueries({ queryKey: [...queryKey, 'checkout'] })
    },
    onError: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart })
    },
  })
}

export function useAddCartItem() {
  return useCartMutation(addCartItem)
}
export function useSetCartQuantity() {
  return useCartMutation(setCartQuantity)
}
export function useRemoveCartItem() {
  return useCartMutation(removeCartItem)
}
export function useClearCart() {
  return useCartMutation(clearCart)
}
