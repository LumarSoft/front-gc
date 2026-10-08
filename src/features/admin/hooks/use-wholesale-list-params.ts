'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parseWholesaleListParams, wholesaleListSearch } from '@/src/features/admin/lib/wholesale-list-params'
import type { AdminWholesaleQuery } from '@/src/types/api/wholesale'

/** The frequent-customer list view, search and page, in the URL. Any change but the page goes to page 1. */
export function useWholesaleListParams() {
  const router = useRouter()
  const pathname = usePathname()
  const query = parseWholesaleListParams(new URLSearchParams(useSearchParams().toString()))

  const update = (changes: Partial<AdminWholesaleQuery>): void => {
    const next = { ...query, ...('page' in changes ? {} : { page: undefined }), ...changes }
    router.replace(`${pathname}${wholesaleListSearch(next)}`, { scroll: false })
  }

  return { query, update, hasSearch: Boolean(query.q), clear: () => router.replace(pathname, { scroll: false }) }
}
