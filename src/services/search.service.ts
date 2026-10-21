import { apiRequest } from '@/src/lib/api-client'
import type { PopularSearches, ProductSuggestions } from '@/src/types/api/search'

/** Browser-only: the first products, categories and total for what the customer is typing (prices for this buyer). */
export function getSearchSuggestions(query: string): Promise<ProductSuggestions> {
  return apiRequest<ProductSuggestions>(`/products/suggest?q=${encodeURIComponent(query)}`)
}

/** Browser-only: what several visitors search for and find, for an empty search box. */
export function getPopularSearches(): Promise<PopularSearches> {
  return apiRequest<PopularSearches>('/activity/popular-searches')
}
