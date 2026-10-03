'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getCurrentUser } from '@/src/services/auth.service'

export function useCurrentUser() {
  return useQuery({ queryKey: QUERY_KEYS.currentUser, queryFn: getCurrentUser, staleTime: 5 * 60_000 })
}
