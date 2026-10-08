'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { orderListSearch, parseOrderListParams } from '@/src/features/admin/lib/order-list-params'
import type { AdminOrdersQuery } from '@/src/types/api/orders'

/** The order list view, search and page, read from and written to the URL. Any change but the page goes to page 1. */
export function useOrderListParams() {
  const router = useRouter()
  const pathname = usePathname()
  const query = parseOrderListParams(new URLSearchParams(useSearchParams().toString()))

  const update = (changes: Partial<AdminOrdersQuery>): void => {
    const next = { ...query, ...('page' in changes ? {} : { page: undefined }), ...changes }
    router.replace(`${pathname}${orderListSearch(next)}`, { scroll: false })
  }

  return { query, update, hasSearch: Boolean(query.q), clear: () => router.replace(pathname, { scroll: false }) }
}
