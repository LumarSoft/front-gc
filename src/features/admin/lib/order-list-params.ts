import type { AdminOrdersQuery, OrderStage } from '@/src/types/api/orders'
import { parsePage } from '@/src/lib/pagination'

const STAGES: OrderStage[] = ['PENDING_PAYMENT', 'TO_FULFILL', 'READY', 'CLOSED']
export const ADMIN_ORDERS_PAGE_SIZE = 25

/** Order list state in the URL (`?stage=&q=&page=`): shareable and kept on reload. */
export function parseOrderListParams(params: URLSearchParams): AdminOrdersQuery {
  const stage = params.get('stage') as OrderStage | null
  const page = parsePage(params.get('page'))
  return {
    stage: stage && STAGES.includes(stage) ? stage : undefined,
    q: params.get('q')?.trim() || undefined,
    page: page > 1 ? page : undefined,
    pageSize: ADMIN_ORDERS_PAGE_SIZE,
  }
}

export function orderListSearch(query: AdminOrdersQuery): string {
  const params = new URLSearchParams()
  if (query.stage) params.set('stage', query.stage)
  if (query.q) params.set('q', query.q)
  if (query.page && query.page > 1) params.set('page', String(query.page))
  const search = params.toString()
  return search ? `?${search}` : ''
}
