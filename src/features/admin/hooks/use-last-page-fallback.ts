'use client'

import { useEffect, useEffectEvent } from 'react'

type ListPage = { items: unknown[]; page: number; total: number; totalPages: number }

/**
 * A page past the end while the list still has rows (its last rows were just resolved, or an old link): go to the last
 * page instead of showing the list as empty.
 */
export function useLastPageFallback(data: ListPage | undefined, goTo: (page: number) => void): void {
  const target =
    data && data.items.length === 0 && data.total > 0 && data.page > data.totalPages ? data.totalPages : null
  const go = useEffectEvent((page: number) => goTo(page))
  useEffect(() => {
    if (target) go(target)
  }, [target])
}
