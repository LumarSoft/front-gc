import type { ProductSummary, SearchInfo } from './catalog'

// Matches api-gc/docs/endpoints.md → GET /products/suggest and GET /activity/popular-searches.

export type CategorySuggestion = { slug: string; name: string; count: number }

/** The search box's live results for what the customer is typing. */
export type ProductSuggestions = SearchInfo & {
  query: string
  /** All the matching products; `products` has the first few. */
  total: number
  products: ProductSummary[]
  /** Categories with the most matches, most first. */
  categories: CategorySuggestion[]
}

export type PopularSearches = { searches: string[] }
