// Matches api-gc/docs/endpoints.md → Admin home → GET /admin/dashboard.
import type { Money } from '@/src/types/api/money'

export type DashboardMetric<TValue> = { current: TValue; previous: TValue }

export type AdminDashboard = {
  /** Argentine calendar days of the period, oldest first ("2026-10-08"). */
  days: string[]
  sales: DashboardMetric<Money> & { daily: string[] }
  orders: DashboardMetric<number> & { daily: number[] }
  averageOrder: DashboardMetric<Money | null>
  todo: { wholesalePending: number; publishedOutOfStock: number; drafts: number }
}
