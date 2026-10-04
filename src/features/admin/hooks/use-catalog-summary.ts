'use client'

import { useQueries } from '@tanstack/react-query'
import { type CatalogSummary, summarizeCatalog } from '@/src/features/admin/lib/catalog-summary'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getAdminBrands, getAdminCategories, getAdminTags } from '@/src/services/admin-catalog.service'

type CatalogSummaryState = {
  summary: CatalogSummary | null
  isPending: boolean
  isError: boolean
  retry: () => void
}

/** Loads the taxonomy lists (also used by their own admin pages, so the cache is shared) and counts them. */
export function useCatalogSummary(): CatalogSummaryState {
  const [categories, brands, tags] = useQueries({
    queries: [
      { queryKey: QUERY_KEYS.admin.categories, queryFn: getAdminCategories },
      { queryKey: QUERY_KEYS.admin.brands, queryFn: getAdminBrands },
      { queryKey: QUERY_KEYS.admin.tags, queryFn: getAdminTags },
    ],
  })
  const all = [categories, brands, tags]

  return {
    summary:
      categories.data && brands.data && tags.data ? summarizeCatalog(categories.data, brands.data, tags.data) : null,
    isPending: all.some(query => query.isPending),
    isError: all.some(query => query.isError),
    retry: () => all.forEach(query => void query.refetch()),
  }
}
