import { apiRequest } from '@/src/lib/api-client'
import type {
  SystemActivityPage,
  SystemActivityQuery,
  SystemLogsPage,
  SystemLogsQuery,
  SystemStatus,
} from '@/src/types/api/admin-system'

/** Developers only: how the API, its integrations, its tasks and the store are doing. */
export function getSystemStatus(): Promise<SystemStatus> {
  return apiRequest<SystemStatus>('/admin/system')
}

/** Developers only: the API's errors and warnings of the last 30 days. */
export function getSystemLogs(query: SystemLogsQuery): Promise<SystemLogsPage> {
  const params = new URLSearchParams({ page: String(query.page ?? 1), pageSize: String(query.pageSize) })
  if (query.level) params.set('level', query.level)
  if (query.source) params.set('source', query.source)
  if (query.q) params.set('q', query.q)
  return apiRequest<SystemLogsPage>(`/admin/system/logs?${params}`)
}

/** Developers only: what staff changed in the admin. */
export function getSystemActivity(query: SystemActivityQuery): Promise<SystemActivityPage> {
  const params = new URLSearchParams({ page: String(query.page ?? 1), pageSize: String(query.pageSize) })
  if (query.userId) params.set('userId', String(query.userId))
  if (query.entityType) params.set('entityType', query.entityType)
  return apiRequest<SystemActivityPage>(`/admin/system/activity?${params}`)
}
