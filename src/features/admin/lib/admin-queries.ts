import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getAdminBrands, getAdminCategories, getAdminTags } from '@/src/services/admin-catalog.service'
import { getExchangeRates, getPriceLists } from '@/src/services/admin-pricing.service'

/** One definition per admin list, shared by every hook and screen that reads it (same cache entry). */
export const adminCategoriesQuery = queryOptions({ queryKey: QUERY_KEYS.admin.categories, queryFn: getAdminCategories })
export const adminBrandsQuery = queryOptions({ queryKey: QUERY_KEYS.admin.brands, queryFn: getAdminBrands })
export const adminTagsQuery = queryOptions({ queryKey: QUERY_KEYS.admin.tags, queryFn: getAdminTags })
export const priceListsQuery = queryOptions({
  queryKey: QUERY_KEYS.admin.priceLists,
  queryFn: getPriceLists,
  staleTime: 10 * 60_000,
})
export const exchangeRatesQuery = queryOptions({
  queryKey: QUERY_KEYS.admin.exchangeRates,
  queryFn: () => getExchangeRates(),
})
