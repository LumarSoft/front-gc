import { apiRequest } from '@/src/lib/api-client'
import type { AdminAnalytics, AdminAnalyticsQuery } from '@/src/types/api/admin-analytics'

/** Argentine calendar days, both included; without `groupBy` the API picks days, weeks or months by length. */
export function getAdminAnalytics({ groupBy, ...range }: AdminAnalyticsQuery): Promise<AdminAnalytics> {
  return apiRequest<AdminAnalytics>(`/admin/analytics?${new URLSearchParams(groupBy ? { ...range, groupBy } : range)}`)
}
