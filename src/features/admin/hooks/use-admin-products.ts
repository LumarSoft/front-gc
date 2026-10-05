'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ApiError } from '@/src/lib/api-client'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getAdminProduct, getAdminProducts } from '@/src/services/admin-products.service'
import type { AdminProductsQuery } from '@/src/types/api/admin-products'

/** One page of the product list. The previous page stays on screen while the next one loads (no flicker). */
export function useAdminProducts(query: AdminProductsQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.productList(query),
    queryFn: () => getAdminProducts(query),
    placeholderData: keepPreviousData,
  })
}

export function useAdminProduct(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.product(id),
    queryFn: () => getAdminProduct(id),
    // A missing or archived product (404) will not appear by retrying: show it at once. Network errors still retry.
    retry: (failures, error) =>
      !(error instanceof ApiError && error.status >= 400 && error.status < 500) && failures < 2,
  })
}
