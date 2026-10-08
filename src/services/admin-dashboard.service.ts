import { apiRequest } from '@/src/lib/api-client'
import type { AdminDashboard } from '@/src/types/api/admin-dashboard'

/** `range`: Argentine calendar days, both included (the API defaults to the last 30 days). */
export function getAdminDashboard(range: { from: string; to: string }): Promise<AdminDashboard> {
  return apiRequest<AdminDashboard>(`/admin/dashboard?${new URLSearchParams(range)}`)
}
