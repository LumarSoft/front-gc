import { apiRequest } from '@/src/lib/api-client'
import type { SystemStatus } from '@/src/types/api/admin-system'

/** Developers only: how the API, its integrations, its tasks and the store are doing. */
export function getSystemStatus(): Promise<SystemStatus> {
  return apiRequest<SystemStatus>('/admin/system')
}
