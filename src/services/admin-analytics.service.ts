import { apiRequest } from '@/src/lib/api-client'
import type { AdminAnalytics, AdminAnalyticsQuery } from '@/src/types/api/admin-analytics'
import type { AdminBehavior } from '@/src/types/api/admin-behavior'

const toQuery = ({ groupBy, ...range }: AdminAnalyticsQuery): string =>
  String(new URLSearchParams(groupBy ? { ...range, groupBy } : range))

/** Argentine calendar days, both included; without `groupBy` the API picks days, weeks or months by length. */
export function getAdminAnalytics(query: AdminAnalyticsQuery): Promise<AdminAnalytics> {
  return apiRequest<AdminAnalytics>(`/admin/analytics?${toQuery(query)}`)
}

/** What anonymous visitors did in the same kind of period: funnel, viewed products, searches, abandoned carts. */
export function getAdminBehavior(query: AdminAnalyticsQuery): Promise<AdminBehavior> {
  return apiRequest<AdminBehavior>(`/admin/analytics/behavior?${toQuery(query)}`)
}
