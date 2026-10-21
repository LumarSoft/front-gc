import { parsePage } from '@/src/lib/pagination'
import type { QuestionStatus, UnansweredQuestionsQuery } from '@/src/types/api/admin-assistant'

const STATUSES: QuestionStatus[] = ['OPEN', 'ANSWERED', 'DISMISSED']
/** `?status=` of the "Todas" view: without a status the list opens on the questions still waiting. */
const ALL = 'ALL'
export const ADMIN_QUESTIONS_PAGE_SIZE = 25

/** Unanswered-question list state in the URL (`?status=&q=&page=`); no status means the open ones. */
export function parseQuestionListParams(params: URLSearchParams): UnansweredQuestionsQuery {
  const status = params.get('status')
  const page = parsePage(params.get('page'))
  return {
    status: status === ALL ? undefined : (STATUSES.find(value => value === status) ?? 'OPEN'),
    // The API takes up to 100 characters; a longer pasted term is cut instead of failing the list.
    q: params.get('q')?.trim().slice(0, 100).trim() || undefined,
    page: page > 1 ? page : undefined,
    pageSize: ADMIN_QUESTIONS_PAGE_SIZE,
  }
}

export function questionListSearch(query: UnansweredQuestionsQuery): string {
  const params = new URLSearchParams()
  if (query.status !== 'OPEN') params.set('status', query.status ?? ALL)
  if (query.q) params.set('q', query.q)
  if (query.page && query.page > 1) params.set('page', String(query.page))
  const search = params.toString()
  return search ? `?${search}` : ''
}
