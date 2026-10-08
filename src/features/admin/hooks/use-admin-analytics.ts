'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getAdminAnalytics, getAdminBehavior } from '@/src/services/admin-analytics.service'
import type { AdminAnalyticsQuery } from '@/src/types/api/admin-analytics'

/** The sales stats of a period; the current numbers stay on screen (faded) while another period loads. */
export function useAdminAnalytics(query: AdminAnalyticsQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.analytics(query),
    queryFn: () => getAdminAnalytics(query),
    placeholderData: keepPreviousData,
  })
}

/** What visitors did in a period, kept on screen the same way while another period loads. */
export function useAdminBehavior(query: AdminAnalyticsQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.analyticsBehavior(query),
    queryFn: () => getAdminBehavior(query),
    placeholderData: keepPreviousData,
  })
}
