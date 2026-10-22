'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getSystemActivity, getSystemLogs } from '@/src/services/admin-system.service'
import type { SystemActivityQuery, SystemLogsQuery } from '@/src/types/api/admin-system'

/** The API's errors and warnings; read again every 30 seconds like the rest of "Sistema". */
export function useSystemLogs(query: SystemLogsQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.systemLogs(query),
    queryFn: () => getSystemLogs(query),
    placeholderData: keepPreviousData,
    refetchInterval: 30_000,
  })
}

export function useSystemActivity(query: SystemActivityQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.systemActivity(query),
    queryFn: () => getSystemActivity(query),
    placeholderData: keepPreviousData,
  })
}
