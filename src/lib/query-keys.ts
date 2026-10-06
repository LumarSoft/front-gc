import type { AdminProductsQuery } from '@/src/types/api/admin-products'

export const QUERY_KEYS = {
  currentUser: ['auth', 'current-user'],
  cart: ['cart'],
  cartFor: (userId: number | null) => ['cart', userId] as const,
  checkoutFor: (userId: number | null) => ['cart', userId, 'checkout'] as const,
  orderTracking: (number: string, token: string | null) => ['orders', 'tracking', number, token] as const,
  admin: {
    categories: ['admin', 'categories'],
    brands: ['admin', 'brands'],
    tags: ['admin', 'tags'],
    /** Prefix of every product list page, to invalidate them all at once (not the product being edited). */
    productLists: ['admin', 'products', 'list'],
    productList: (query: AdminProductsQuery) => ['admin', 'products', 'list', query] as const,
    product: (id: number) => ['admin', 'products', 'detail', id] as const,
    priceLists: ['admin', 'price-lists'],
    exchangeRates: ['admin', 'exchange-rates'],
    orders: ['admin', 'orders'],
    orderList: (page: number, status: string) => ['admin', 'orders', 'list', page, status] as const,
    order: (id: number) => ['admin', 'orders', 'detail', id] as const,
  },
} as const
