import type { AdminProductsQuery } from '@/src/types/api/admin-products'
import type { AdminOrdersQuery } from '@/src/types/api/orders'
import type { AdminWholesaleQuery } from '@/src/types/api/wholesale'
import type { AdminAnalyticsQuery } from '@/src/types/api/admin-analytics'

export const QUERY_KEYS = {
  currentUser: ['auth', 'current-user'],
  cart: ['cart'],
  cartFor: (userId: number | null) => ['cart', userId] as const,
  checkoutFor: (userId: number | null) => ['cart', userId, 'checkout'] as const,
  wholesaleFor: (userId: number) => ['wholesale-application', userId] as const,
  favoritesFor: (userId: number) => ['favorites', userId] as const,
  /** Prefix of every account order query, to refresh them after a purchase. */
  myOrders: ['orders', 'mine'],
  myOrderList: (userId: number, page: number, pageSize: number) =>
    ['orders', 'mine', userId, 'list', page, pageSize] as const,
  myOrder: (userId: number, number: string) => ['orders', 'mine', userId, 'detail', number] as const,
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
    wholesaleApplications: ['admin', 'wholesale-applications'],
    wholesaleApplicationList: (query: AdminWholesaleQuery) =>
      ['admin', 'wholesale-applications', 'list', query] as const,
    wholesaleCounts: ['admin', 'wholesale-applications', 'counts'],
    wholesaleApplication: (id: number) => ['admin', 'wholesale-applications', 'detail', id] as const,
    orders: ['admin', 'orders'],
    orderList: (query: AdminOrdersQuery) => ['admin', 'orders', 'list', query] as const,
    orderCounts: ['admin', 'orders', 'counts'],
    dashboard: ['admin', 'dashboard'],
    dashboardFor: (range: { from: string; to: string }) => ['admin', 'dashboard', range] as const,
    analytics: (query: AdminAnalyticsQuery) => ['admin', 'analytics', query] as const,
    analyticsBehavior: (query: AdminAnalyticsQuery) => ['admin', 'analytics', 'behavior', query] as const,
    settings: ['admin', 'settings'],
    order: (id: number) => ['admin', 'orders', 'detail', id] as const,
  },
} as const
