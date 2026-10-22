import { parsePage } from '@/src/lib/pagination'
import type { SystemActivityQuery, SystemLogLevel, SystemLogsQuery } from '@/src/types/api/admin-system'

export const SYSTEM_LIST_PAGE_SIZE = 25
const LEVELS: SystemLogLevel[] = ['ERROR', 'WARN']

const text = (value: string | null, max: number): string | undefined => value?.trim().slice(0, max).trim() || undefined
const page = (params: URLSearchParams): number | undefined => {
  const value = parsePage(params.get('page'))
  return value > 1 ? value : undefined
}
const search = (entries: [string, string | number | undefined][]): string => {
  const params = new URLSearchParams()
  for (const [key, value] of entries) if (value !== undefined && value !== '') params.set(key, String(value))
  const query = params.toString()
  return query ? `?${query}` : ''
}

/** Errors list state in the URL (`?nivel=&origen=&q=&page=`). */
export function parseSystemLogParams(params: URLSearchParams): SystemLogsQuery {
  const level = params.get('nivel')
  return {
    level: LEVELS.find(value => value === level),
    source: text(params.get('origen'), 100),
    q: text(params.get('q'), 100),
    page: page(params),
    pageSize: SYSTEM_LIST_PAGE_SIZE,
  }
}

export function systemLogSearch(query: SystemLogsQuery): string {
  return search([
    ['nivel', query.level],
    ['origen', query.source],
    ['q', query.q],
    ['page', query.page && query.page > 1 ? query.page : undefined],
  ])
}

/** Activity list state in the URL (`?persona=&tipo=&page=`). */
export function parseSystemActivityParams(params: URLSearchParams): SystemActivityQuery {
  const userId = Number(params.get('persona'))
  return {
    userId: Number.isSafeInteger(userId) && userId > 0 ? userId : undefined,
    entityType: text(params.get('tipo'), 60),
    page: page(params),
    pageSize: SYSTEM_LIST_PAGE_SIZE,
  }
}

export function systemActivitySearch(query: SystemActivityQuery): string {
  return search([
    ['persona', query.userId],
    ['tipo', query.entityType],
    ['page', query.page && query.page > 1 ? query.page : undefined],
  ])
}
