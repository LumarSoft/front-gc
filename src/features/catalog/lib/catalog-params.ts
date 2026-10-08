import type { ProductListQuery, ProductSort } from '@/src/types/api/catalog'
import { parsePage } from '@/src/lib/pagination'

export const CATALOG_PAGE_SIZE = 24

export const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'relevance', label: 'Destacados' },
  { value: 'newest', label: 'Más nuevos' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'name', label: 'Nombre (A-Z)' },
]

/** Tag group whose tags are the "Uso" filters (managed in /admin/etiquetas). */
export const USE_TAG_GROUP = 'uso'

/** Same limits as the API: lowercase slugs, at most 20 tags. Unknown slugs simply match no product. */
const TAG_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const MAX_TAGS = 20

/** Filters kept in the URL (`?q=&tag=a,b&sort=&page=`), so results are shareable and survive a reload. */
export type CatalogParams = {
  q?: string
  tag: string[]
  sort: ProductSort
  page: number
}

type SearchParams = Record<string, string | string[] | undefined>

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export function parseCatalogParams(searchParams: SearchParams): CatalogParams {
  const sort = first(searchParams.sort)
  const q = first(searchParams.q)?.trim()
  return {
    q: q ? q.slice(0, 100) : undefined,
    tag: [...new Set((first(searchParams.tag) ?? '').split(',').filter(slug => TAG_SLUG.test(slug)))].slice(
      0,
      MAX_TAGS,
    ),
    sort: SORT_OPTIONS.some(option => option.value === sort) ? (sort as ProductSort) : 'relevance',
    page: parsePage(first(searchParams.page)),
  }
}

export function toProductQuery(params: CatalogParams, category?: string): ProductListQuery {
  return {
    category,
    q: params.q,
    tag: params.tag,
    sort: params.sort,
    page: params.page,
    pageSize: CATALOG_PAGE_SIZE,
  }
}

/** Builds a catalog URL from the current params plus changes. Any filter change goes back to page 1. */
export function buildCatalogHref(basePath: string, params: CatalogParams, changes: Partial<CatalogParams>): string {
  const next = { ...params, ...('page' in changes ? {} : { page: 1 }), ...changes }
  const search = new URLSearchParams()
  if (next.q) search.set('q', next.q)
  if (next.tag.length) search.set('tag', next.tag.join(','))
  if (next.sort !== 'relevance') search.set('sort', next.sort)
  if (next.page > 1) search.set('page', String(next.page))
  const query = search.toString()
  return query ? `${basePath}?${query}` : basePath
}

export function toggleTag(tags: string[], slug: string): string[] {
  return tags.includes(slug) ? tags.filter(tag => tag !== slug) : [...tags, slug]
}
