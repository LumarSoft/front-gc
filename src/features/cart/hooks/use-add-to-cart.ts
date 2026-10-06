'use client'

import { useSyncExternalStore } from 'react'
import { useAddCartItem, useCartBusy } from '@/src/features/cart/hooks/use-cart'
import { cartErrorMessage } from '@/src/features/cart/lib/cart-messages'
import type { ProductVariant } from '@/src/types/api/catalog'
import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'
import { useCartDrawer } from './use-cart-drawer'

export type AddToCartState = {
  canAdd: boolean
  pending: boolean
  added: boolean
  error: string | null
  add: (trigger?: HTMLElement) => void
  openCart: (trigger?: HTMLElement) => void
}

const subscribe = () => () => {}
const clientSnapshot = () => true
const serverSnapshot = () => false

export function useAddToCart(variant: ProductVariant | undefined): AddToCartState {
  // The browser may already have session data while a streamed product still needs hydration.
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)
  const mutation = useAddCartItem()
  const busy = useCartBusy()
  const session = useCurrentUser()
  const { openCart } = useCartDrawer()
  const canAdd =
    hydrated &&
    !session.isPending &&
    Boolean(variant?.price?.currency === 'ARS' && variant.availability !== 'OUT_OF_STOCK')
  return {
    canAdd,
    pending: busy,
    added: mutation.isSuccess && mutation.variables.variantId === variant?.id,
    error: mutation.isError && mutation.variables?.variantId === variant?.id ? cartErrorMessage(mutation.error) : null,
    openCart,
    add: trigger => {
      if (variant && canAdd && !busy)
        mutation.mutate({ variantId: variant.id, quantity: 1 }, { onSuccess: () => openCart(trigger) })
    },
  }
}
