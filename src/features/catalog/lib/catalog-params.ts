import type { ProductListQuery, ProductSort } from '@/src/types/api/catalog'

export const CATALOG_PAGE_SIZE = 24

export const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'relevance', label: 'Destacados' },
  { value: 'newest', label: 'Más nuevos' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'name', label: 'Nombre (A-Z)' },
]

/**
 * "Uso" filters. Slugs match the tags loaded by the API seed.
 * TODO(api): read them from a tags endpoint once the admin panel can manage tags.
 */
export const USE_FILTERS: { slug: string; label: string }[] = [
  { slug: 'uso-hogar', label: 'Hogar' },
  { slug: 'uso-oficina', label: 'Oficina' },
  { slug: 'uso-foto', label: 'Fotografía' },
  { slug: 'uso-textil', label: 'Textil y sublimación' },
  { slug: 'uso-gran-formato', label: 'Gran formato' },
  { slug: 'uso-comercio', label: 'Comercio' },
]

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
  const page = Number(first(searchParams.page))
  const q = first(searchParams.q)?.trim()
  return {
    q: q ? q.slice(0, 100) : undefined,
    tag: (first(searchParams.tag) ?? '').split(',').filter(slug => USE_FILTERS.some(filter => filter.slug === slug)),
    sort: SORT_OPTIONS.some(option => option.value === sort) ? (sort as ProductSort) : 'relevance',
    page: Number.isInteger(page) && page > 1 ? page : 1,
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
