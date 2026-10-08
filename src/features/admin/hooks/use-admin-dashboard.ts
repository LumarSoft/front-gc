'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import type { DayRange } from '@/src/features/admin/lib/date-range'
import { getAdminDashboard } from '@/src/services/admin-dashboard.service'

/** The admin home summary for a period; refreshed every minute, the previous period stays while another loads. */
export function useAdminDashboard(range: DayRange) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.dashboardFor(range),
    queryFn: () => getAdminDashboard(range),
    placeholderData: keepPreviousData,
    refetchInterval: 60_000,
  })
}
