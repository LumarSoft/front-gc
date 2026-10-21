'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useDebouncedValue } from '@/src/hooks/use-debounced-value'
import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'
import { MIN_SEARCH_LENGTH } from '@/src/features/search/lib/search-view'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getSearchSuggestions } from '@/src/services/search.service'

/** Short pause after the last key: fast enough to feel live, without a request per letter. */
const TYPING_PAUSE_MS = 160

/**
 * Products and categories for what the customer is typing, with this buyer's prices (so it waits until the session
 * is known). The previous results stay on screen while the next ones load.
 */
export function useSearchSuggestions(term: string, enabled: boolean) {
  const query = useDebouncedValue(term.trim(), TYPING_PAUSE_MS)
  const session = useCurrentUser()
  return useQuery({
    queryKey: QUERY_KEYS.searchSuggestions(session.data?.id ?? null, query),
    queryFn: () => getSearchSuggestions(query),
    enabled: enabled && query.length >= MIN_SEARCH_LENGTH && !session.isPending,
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  })
}
