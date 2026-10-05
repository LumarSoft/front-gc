import type { AdminProductsQuery } from '@/src/types/api/admin-products'

export const QUERY_KEYS = {
  currentUser: ['auth', 'current-user'],
  admin: {
    categories: ['admin', 'categories'],
    brands: ['admin', 'brands'],
    tags: ['admin', 'tags'],
    /** Prefix of every product list page, to invalidate them all at once (not the product being edited). */
    productLists: ['admin', 'products', 'list'],
    productList: (query: AdminProductsQuery) => ['admin', 'products', 'list', query] as const,
    product: (id: number) => ['admin', 'products', 'detail', id] as const,
  },
} as const
