import type { Money } from '@/src/types/api/money'

export type CartItemIssue = 'UNAVAILABLE' | 'NO_PRICE' | 'NO_EXCHANGE_RATE' | 'INSUFFICIENT_STOCK'

export type CartItem = {
  variantId: number
  sku: string
  name: string
  variantName: string | null
  productSlug: string
  imageUrl: string | null
  quantity: number
  availableQuantity: number
  unitPrice: Money | null
  total: Money | null
  issue: CartItemIssue | null
}

export type Cart = {
  items: CartItem[]
  itemCount: number
  subtotal: Money | null
  hasIssues: boolean
}
