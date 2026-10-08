'use client'

import { useQuery } from '@tanstack/react-query'
import { useDebouncedValue } from '@/src/hooks/use-debounced-value'
import { matchSections, productResult, type AdminSearchResult } from '@/src/features/admin/lib/admin-search'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getAdminProducts } from '@/src/services/admin-products.service'

const PRODUCT_RESULTS = 6
const MIN_PRODUCT_TERM = 2

export type AdminSearchGroup = { label: string; results: AdminSearchResult[] }

/** Sections match as you type; products are searched in the API once the term settles. */
export function useAdminSearchResults(term: string) {
  const debounced = useDebouncedValue(term.trim(), 250)
  const productQuery = { q: debounced, pageSize: PRODUCT_RESULTS }
  const products = useQuery({
    queryKey: QUERY_KEYS.admin.productList(productQuery),
    queryFn: () => getAdminProducts(productQuery),
    enabled: debounced.length >= MIN_PRODUCT_TERM,
  })

  const groups: AdminSearchGroup[] = [
    { label: 'Secciones', results: matchSections(term) },
    {
      label: 'Productos',
      results: debounced.length >= MIN_PRODUCT_TERM ? (products.data?.items ?? []).map(productResult) : [],
    },
  ].filter(group => group.results.length > 0)

  return {
    groups,
    results: groups.flatMap(group => group.results),
    isSearching: products.isFetching,
    isError: products.isError,
  }
}
