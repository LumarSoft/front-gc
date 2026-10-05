import type { AdminProductSort, AdminProductsQuery, ProductStatus } from '@/src/types/api/admin-products'

const STATUSES: ProductStatus[] = ['PUBLISHED', 'DRAFT', 'HIDDEN']
const SORTS: AdminProductSort[] = ['updated', 'name', 'newest']
export const ADMIN_PRODUCTS_PAGE_SIZE = 25

const positiveInt = (value: string | null): number | undefined => {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
}

/** List filters live in the URL (`?q=&status=&categoryId=&brandId=&stock=out&sort=&page=`): shareable and kept on reload. */
export function parseProductListParams(params: URLSearchParams): AdminProductsQuery {
  const status = params.get('status') as ProductStatus | null
  const sort = params.get('sort') as AdminProductSort | null
  return {
    q: params.get('q')?.trim() || undefined,
    status: status && STATUSES.includes(status) ? status : undefined,
    categoryId: positiveInt(params.get('categoryId')),
    brandId: positiveInt(params.get('brandId')),
    stock: params.get('stock') === 'out' ? 'out' : undefined,
    sort: sort && SORTS.includes(sort) ? sort : undefined,
    page: positiveInt(params.get('page')),
    pageSize: ADMIN_PRODUCTS_PAGE_SIZE,
  }
}

/** URL search string for a query; omits defaults so links stay short. */
export function productListSearch(query: AdminProductsQuery): string {
  const params = new URLSearchParams()
  if (query.q) params.set('q', query.q)
  if (query.status) params.set('status', query.status)
  if (query.categoryId) params.set('categoryId', String(query.categoryId))
  if (query.brandId) params.set('brandId', String(query.brandId))
  if (query.stock) params.set('stock', query.stock)
  if (query.sort && query.sort !== 'updated') params.set('sort', query.sort)
  if (query.page && query.page > 1) params.set('page', String(query.page))
  const search = params.toString()
  return search ? `?${search}` : ''
}
