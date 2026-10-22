'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getSystemStatus } from '@/src/services/admin-system.service'

/** Read again every 30 seconds while the page is open: it is a live view of the system. */
const REFRESH_MS = 30_000

export function useSystemStatus() {
  return useQuery({
    queryKey: QUERY_KEYS.admin.systemStatus,
    queryFn: getSystemStatus,
    refetchInterval: REFRESH_MS,
  })
}
