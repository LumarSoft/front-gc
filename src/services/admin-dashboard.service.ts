import { apiRequest } from '@/src/lib/api-client'
import type { AdminDashboard } from '@/src/types/api/admin-dashboard'

export function getAdminDashboard(): Promise<AdminDashboard> {
  return apiRequest<AdminDashboard>('/admin/dashboard')
}
