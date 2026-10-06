'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'
import { CartDrawerContext, useCartDrawerState } from '@/src/features/cart/hooks/use-cart-drawer'

const CartDrawer = dynamic(() => import('./cart-drawer').then(module => module.CartDrawer))

export function CartDrawerProvider({ children }: { children: ReactNode }) {
  const state = useCartDrawerState()
  return (
    <CartDrawerContext.Provider value={state}>
      {children}
      {state.hasOpened && <CartDrawer />}
    </CartDrawerContext.Provider>
  )
}
