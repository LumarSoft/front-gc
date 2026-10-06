import type { ProductSummary } from './catalog'

/** GET /favorites: newest first, only products still visible in the store. */
export type Favorites = {
  items: ProductSummary[]
}
