'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { parseProductListParams, productListSearch } from '@/src/features/admin/lib/product-list-params'
import type { AdminProductsQuery } from '@/src/types/api/admin-products'

/** The product list filters, read from and written to the URL. Any filter change goes back to page 1. */
export function useProductListParams() {
  const router = useRouter()
  const pathname = usePathname()
  const query = parseProductListParams(new URLSearchParams(useSearchParams().toString()))

  const update = (changes: Partial<AdminProductsQuery>): void => {
    const next = { ...query, ...('page' in changes ? {} : { page: undefined }), ...changes }
    router.replace(`${pathname}${productListSearch(next)}`, { scroll: false })
  }

  /** Search and filters, not the view (status) or the order. */
  const hasSearch = Boolean(query.q || query.categoryId || query.brandId || query.stock || query.shipping)
  const hasFilters = hasSearch || Boolean(query.status)
  return {
    query,
    update,
    hasSearch,
    hasFilters,
    clear: () => router.replace(pathname, { scroll: false }),
    clearSearch: () =>
      update({ q: undefined, categoryId: undefined, brandId: undefined, stock: undefined, shipping: undefined }),
  }
}
