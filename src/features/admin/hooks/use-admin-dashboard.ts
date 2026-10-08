'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getAdminDashboard } from '@/src/services/admin-dashboard.service'

/** The admin home summary; refreshed every minute while the home is open. */
export function useAdminDashboard() {
  return useQuery({ queryKey: QUERY_KEYS.admin.dashboard, queryFn: getAdminDashboard, refetchInterval: 60_000 })
}
