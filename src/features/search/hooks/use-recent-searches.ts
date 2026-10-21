'use client'

import { useMemo, useSyncExternalStore } from 'react'
import {
  parseRecentSearches,
  readRecentSearches,
  subscribeRecentSearches,
  withRecentSearch,
  writeRecentSearches,
} from '@/src/features/search/lib/recent-searches'

/** The customer's last searches in this browser (none while rendering on the server). */
export function useRecentSearches() {
  const raw = useSyncExternalStore(subscribeRecentSearches, readRecentSearches, () => '[]')
  const searches = useMemo(() => parseRecentSearches(raw), [raw])
  return {
    searches,
    remember: (query: string): void =>
      writeRecentSearches(withRecentSearch(parseRecentSearches(readRecentSearches()), query)),
    clear: (): void => writeRecentSearches([]),
  }
}
