import 'server-only'
import { serverApiRequest, type ServerApiResult } from '@/src/lib/server-api'
import type { Category, PaginatedProducts, ProductDetail, ProductListQuery, Tag } from '@/src/types/api/catalog'

function toQueryString(query: ProductListQuery): string {
  const params = new URLSearchParams()
  if (query.page && query.page > 1) params.set('page', String(query.page))
  if (query.pageSize) params.set('pageSize', String(query.pageSize))
  if (query.category) params.set('category', query.category)
  if (query.brand?.length) params.set('brand', query.brand.join(','))
  if (query.tag?.length) params.set('tag', query.tag.join(','))
  if (query.q) params.set('q', query.q)
  if (query.featured) params.set('featured', 'true')
  if (query.sort && query.sort !== 'relevance') params.set('sort', query.sort)
  const queryString = params.toString()
  return queryString ? `?${queryString}` : ''
}

export function getProducts(query: ProductListQuery): Promise<ServerApiResult<PaginatedProducts>> {
  return serverApiRequest<PaginatedProducts>(`/products${toQueryString(query)}`)
}

export function getProduct(slug: string): Promise<ServerApiResult<ProductDetail>> {
  return serverApiRequest<ProductDetail>(`/products/${encodeURIComponent(slug)}`)
}

export async function getCategories(): Promise<Category[]> {
  return (await serverApiRequest<Category[]>('/categories')).data
}

export async function getCategory(slug: string): Promise<Category> {
  return (await serverApiRequest<Category>(`/categories/${encodeURIComponent(slug)}`)).data
}

/**
 * Tags of one group, e.g. "uso" for the catalog's use filters. Managed from the admin panel.
 * Secondary data: if it fails, the page renders without those filters instead of failing as a whole.
 */
export async function getTags(group: string): Promise<Tag[]> {
  try {
    return (await serverApiRequest<Tag[]>(`/tags?group=${encodeURIComponent(group)}`)).data
  } catch {
    return []
  }
}
