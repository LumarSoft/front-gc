'use client'

import { useCart, useCartBusy, useClearCart, useRemoveCartItem, useSetCartQuantity } from './use-cart'

export function useCartControls() {
  const query = useCart()
  const quantity = useSetCartQuantity()
  const remove = useRemoveCartItem()
  const clear = useClearCart()
  const pending = useCartBusy()
  const resetErrors = (): void => {
    quantity.reset()
    remove.reset()
    clear.reset()
  }

  return {
    query,
    pending,
    error: quantity.error ?? remove.error ?? clear.error,
    setQuantity: (variantId: number, value: number) => {
      resetErrors()
      quantity.mutate({ variantId, quantity: value })
    },
    removeItem: (variantId: number) => {
      resetErrors()
      remove.mutate(variantId)
    },
    clearCart: () => {
      resetErrors()
      clear.mutate()
    },
  }
}
