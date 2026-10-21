import { argentineToday, isValidRange } from '@/src/features/admin/lib/date-range'
import { parsePage } from '@/src/lib/pagination'
import type { AdminConversationsQuery, ConversationStatus } from '@/src/types/api/admin-assistant'

const STATUSES: ConversationStatus[] = ['OPEN', 'RESOLVED', 'ESCALATED', 'CLOSED']
export const ADMIN_CONVERSATIONS_PAGE_SIZE = 25

/**
 * Conversation list state in the URL (`?status=&revisar=1&q=&desde=&hasta=&page=`): shareable and kept on reload. The
 * days are the ones the conversations started; without them, every day.
 */
export function parseConversationListParams(
  params: URLSearchParams,
  today = argentineToday(),
): AdminConversationsQuery {
  const status = params.get('status') as ConversationStatus | null
  const page = parsePage(params.get('page'))
  const range = { from: params.get('desde') ?? '', to: params.get('hasta') ?? '' }
  return {
    status: status && STATUSES.includes(status) ? status : undefined,
    problems: params.get('revisar') === '1' || undefined,
    // The API takes up to 100 characters; a longer pasted term is cut instead of failing the list.
    q: params.get('q')?.trim().slice(0, 100).trim() || undefined,
    range: isValidRange(range, today) ? range : undefined,
    page: page > 1 ? page : undefined,
    pageSize: ADMIN_CONVERSATIONS_PAGE_SIZE,
  }
}

export function conversationListSearch(query: AdminConversationsQuery): string {
  const params = new URLSearchParams()
  if (query.status) params.set('status', query.status)
  if (query.problems) params.set('revisar', '1')
  if (query.q) params.set('q', query.q)
  if (query.range) {
    params.set('desde', query.range.from)
    params.set('hasta', query.range.to)
  }
  if (query.page && query.page > 1) params.set('page', String(query.page))
  const search = params.toString()
  return search ? `?${search}` : ''
}
