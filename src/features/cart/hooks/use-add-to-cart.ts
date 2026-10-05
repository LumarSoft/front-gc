'use client'

import { useAddCartItem, useCartBusy } from '@/src/features/cart/hooks/use-cart'
import { cartErrorMessage } from '@/src/features/cart/lib/cart-messages'
import type { ProductVariant } from '@/src/types/api/catalog'
import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'

export type AddToCartState = {
  canAdd: boolean
  pending: boolean
  added: boolean
  error: string | null
  add: () => void
}

export function useAddToCart(variant: ProductVariant | undefined): AddToCartState {
  const mutation = useAddCartItem()
  const busy = useCartBusy()
  const session = useCurrentUser()
  const canAdd =
    !session.isPending && Boolean(variant?.price?.currency === 'ARS' && variant.availability !== 'OUT_OF_STOCK')
  return {
    canAdd,
    pending: busy,
    added: mutation.isSuccess && mutation.variables.variantId === variant?.id,
    error: mutation.isError && mutation.variables?.variantId === variant?.id ? cartErrorMessage(mutation.error) : null,
    add: () => {
      if (variant && canAdd && !busy) mutation.mutate({ variantId: variant.id, quantity: 1 })
    },
  }
}
