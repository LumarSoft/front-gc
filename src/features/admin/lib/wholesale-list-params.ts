import type { WholesaleStatus } from '@/src/types/api/auth'
import type { AdminWholesaleQuery } from '@/src/types/api/wholesale'
import { parsePage } from '@/src/lib/pagination'

const STATUSES: WholesaleStatus[] = ['PENDING', 'APPROVED', 'PAUSED', 'REJECTED']
export const ADMIN_WHOLESALE_PAGE_SIZE = 25

/** Frequent-customer list state in the URL (`?status=&q=&page=`): shareable and kept on reload. */
export function parseWholesaleListParams(params: URLSearchParams): AdminWholesaleQuery {
  const status = params.get('status') as WholesaleStatus | null
  const page = parsePage(params.get('page'))
  return {
    status: status && STATUSES.includes(status) ? status : undefined,
    q: params.get('q')?.trim() || undefined,
    page: page > 1 ? page : undefined,
    pageSize: ADMIN_WHOLESALE_PAGE_SIZE,
  }
}

export function wholesaleListSearch(query: AdminWholesaleQuery): string {
  const params = new URLSearchParams()
  if (query.status) params.set('status', query.status)
  if (query.q) params.set('q', query.q)
  if (query.page && query.page > 1) params.set('page', String(query.page))
  const search = params.toString()
  return search ? `?${search}` : ''
}
