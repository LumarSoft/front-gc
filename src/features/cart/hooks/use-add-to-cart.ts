'use client'

import { useSyncExternalStore } from 'react'
import { useAddCartItem, useCartBusy } from '@/src/features/cart/hooks/use-cart'
import { cartErrorMessage } from '@/src/features/cart/lib/cart-messages'
import type { ProductVariant } from '@/src/types/api/catalog'
import { useTrackActivity } from '@/src/features/activity/hooks/use-track-activity'
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

/** What adding needs from a variant: the product page passes the selected one, the assistant's cards a single one. */
export type AddableVariant = Pick<ProductVariant, 'id' | 'price' | 'availability'>

/**
 * `productId`: the product the variant belongs to, for the store's activity stats. `onAdded` runs once the cart took it
 * (the assistant's cards report it).
 */
export function useAddToCart(
  variant: AddableVariant | undefined,
  productId: number,
  onAdded?: () => void,
): AddToCartState {
  // The browser may already have session data while a streamed product still needs hydration.
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)
  const mutation = useAddCartItem()
  const busy = useCartBusy()
  const session = useCurrentUser()
  const { openCart } = useCartDrawer()
  const { track } = useTrackActivity()
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
        mutation.mutate(
          { variantId: variant.id, quantity: 1 },
          {
            onSuccess: () => {
              openCart(trigger)
              track({ type: 'ADD_TO_CART', productId })
              onAdded?.()
            },
          },
        )
    },
  }
}
