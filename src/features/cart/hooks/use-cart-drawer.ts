'use client'

import { createContext, useContext, useRef, useState } from 'react'

export function useCartDrawerState() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const returnFocus = useRef<HTMLElement | null>(null)

  const openCart = (trigger?: HTMLElement): void => {
    returnFocus.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    setHasOpened(true)
    setIsOpen(true)
  }

  return { isOpen, hasOpened, setIsOpen, openCart, closeCart: () => setIsOpen(false), returnFocus }
}

export const CartDrawerContext = createContext<ReturnType<typeof useCartDrawerState> | null>(null)

export function useCartDrawer() {
  const context = useContext(CartDrawerContext)
  if (!context) throw new Error('useCartDrawer must be used inside CartDrawerProvider')
  return context
}
