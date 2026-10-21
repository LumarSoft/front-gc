'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getPopularSearches } from '@/src/services/search.service'

/** What other visitors search for; asked only once the search box opens. The API caches it for 10 minutes. */
export function usePopularSearches(enabled: boolean) {
  return useQuery({
    queryKey: QUERY_KEYS.popularSearches,
    queryFn: getPopularSearches,
    enabled,
    staleTime: 10 * 60_000,
    select: data => data.searches,
  })
}
