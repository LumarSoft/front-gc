import type { Money } from '@/src/types/api/money'

// TODO(api): align with api-gc/docs/endpoints.md once the products endpoints exist.

export type ProductBadge = 'OFFER' | 'NEW' | 'BEST_SELLER'

export type ProductSummary = {
  id: number
  slug: string
  name: string
  brand: string
  category: string
  highlight: string
  imageUrl: string
  price: Money
  /** Previous price, only when the product is on sale. */
  compareAtPrice: Money | null
  /** Interest-free installments offered for this product, if any. */
  installments: number | null
  badge: ProductBadge | null
  lowStock: boolean
}
