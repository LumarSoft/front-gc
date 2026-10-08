// Matches api-gc/docs/endpoints.md → Admin analytics → GET /admin/analytics.
import type { BuyerType } from '@/src/types/api/auth'
import type { DeliveryMethod } from '@/src/types/api/checkout'
import type { Money } from '@/src/types/api/money'

export type AnalyticsGroupBy = 'day' | 'week' | 'month'
export type PaymentMethod = 'MANUAL' | 'MERCADO_PAGO' | 'BANK_TRANSFER' | 'CURRENT_ACCOUNT'

/** A value in the period and in the previous one, of the same length. */
export type Compared<T> = { current: T; previous: T }

/** Calendar days a chart point covers (both included), and the days of the previous period it is compared with. */
export type AnalyticsBucket = { start: string; end: string; previousStart: string; previousEnd: string }

export type AnalyticsMixRow<K extends string> = { key: K; orders: number; sales: Money; previousSales: Money }

export type AnalyticsRankRow = { id: number | null; name: string; units: number; sales: Money; previousSales: Money }

export type AnalyticsProductRow = AnalyticsRankRow & { id: number; imageUrl: string | null; archived: boolean }

export type OrderOutcomes = { placed: number; paid: number; waiting: number; expired: number; cancelled: number }

export type AdminAnalytics = {
  period: { from: string; to: string; previousFrom: string; previousTo: string; groupBy: AnalyticsGroupBy }
  buckets: AnalyticsBucket[]
  /** Paid orders, by payment date. ARS. */
  sales: Compared<Money> & { series: Compared<string[]> }
  /** products − discounts + shipping = sales. */
  breakdown: { products: Compared<Money>; discounts: Compared<Money>; shipping: Compared<Money> }
  /** Paid orders. */
  orders: Compared<number> & { series: Compared<number[]> }
  averageOrder: Compared<Money | null>
  /** Orders placed in the period, by what became of them. */
  outcomes: Compared<OrderOutcomes>
  /** Median hours from placing an order to its confirmed payment. */
  hoursToPay: Compared<number | null>
  buyerTypes: AnalyticsMixRow<BuyerType>[]
  paymentMethods: AnalyticsMixRow<PaymentMethod>[]
  deliveryMethods: AnalyticsMixRow<DeliveryMethod>[]
  products: AnalyticsProductRow[]
  categories: AnalyticsRankRow[]
  brands: AnalyticsRankRow[]
  customers: {
    total: Compared<number>
    returning: Compared<number>
    newSales: Money
    returningSales: Money
    signUps: Compared<number>
    frequentCustomerApplications: { received: Compared<number>; approved: Compared<number>; pending: number }
  }
}

export type AdminAnalyticsQuery = { from: string; to: string; groupBy?: AnalyticsGroupBy }
