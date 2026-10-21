'use client'

import { createContext, useContext } from 'react'

/** Tells the conversation that one of its cards went into the cart. Provided by the chat panel. */
export type CartAddReport = (productId: number, variantId: number | null) => void

export const CartAddReportContext = createContext<CartAddReport | null>(null)

/** The chat's report, or nothing outside the chat. */
export function useCartAddReport(): CartAddReport | null {
  return useContext(CartAddReportContext)
}
