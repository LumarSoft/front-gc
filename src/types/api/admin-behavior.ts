// Matches api-gc/docs/endpoints.md → Admin analytics → GET /admin/analytics/behavior.
import type { AdminAnalytics, Compared } from '@/src/types/api/admin-analytics'

export type AnalyticsProduct = { id: number; name: string; imageUrl: string | null; archived: boolean }

/** Visitors and the step of the purchase they reached, each counted once. */
export type Funnel = {
  visited: number
  viewedProduct: number
  addedToCart: number
  startedCheckout: number
  placedOrder: number
}

export type SearchRow = { query: string; searches: number; visitors: number; results: number }

export type AdminBehavior = {
  period: AdminAnalytics['period']
  buckets: AdminAnalytics['buckets']
  /** First day with recorded activity; null before any. Earlier days have no data, not zero visits. */
  trackingSince: string | null
  visitors: Compared<number> & { series: Compared<number[]> }
  funnel: Compared<Funnel>
  products: (AnalyticsProduct & { viewers: number; addedToCart: number; unitsSold: number })[]
  searches: {
    total: Compared<number>
    withoutResults: Compared<number>
    top: SearchRow[]
    unanswered: SearchRow[]
  }
  carts: {
    abandoned: Compared<number>
    ordersPlaced: Compared<number>
    abandonAfterHours: number
    products: (AnalyticsProduct & { carts: number; units: number })[]
  }
}
