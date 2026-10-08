import { apiRequest } from '@/src/lib/api-client'
import type {
  AdminWholesaleApplication,
  AdminWholesaleQuery,
  CreateWholesaleApplicationRequest,
  MyWholesaleApplication,
  WholesaleApplicationCounts,
  WholesaleApplicationsPage,
  WholesaleDecision,
} from '@/src/types/api/wholesale'

export function getMyWholesaleApplication(): Promise<MyWholesaleApplication> {
  return apiRequest<MyWholesaleApplication>('/wholesale-applications/mine')
}

export function applyForWholesale(input: CreateWholesaleApplicationRequest): Promise<MyWholesaleApplication> {
  return apiRequest<MyWholesaleApplication>('/wholesale-applications', { method: 'POST', body: input })
}

export function getAdminWholesaleApplications(query: AdminWholesaleQuery): Promise<WholesaleApplicationsPage> {
  const params = new URLSearchParams({ page: String(query.page ?? 1), pageSize: String(query.pageSize) })
  if (query.status) params.set('status', query.status)
  if (query.q) params.set('q', query.q)
  return apiRequest<WholesaleApplicationsPage>(`/admin/wholesale-applications?${params}`)
}

export function getAdminWholesaleCounts(): Promise<WholesaleApplicationCounts> {
  return apiRequest<WholesaleApplicationCounts>('/admin/wholesale-applications/counts')
}

export function getAdminWholesaleApplication(id: number): Promise<AdminWholesaleApplication> {
  return apiRequest<AdminWholesaleApplication>(`/admin/wholesale-applications/${id}`)
}

export function decideWholesaleApplication(
  id: number,
  decision: WholesaleDecision,
  note?: string,
): Promise<AdminWholesaleApplication> {
  return apiRequest<AdminWholesaleApplication>(`/admin/wholesale-applications/${id}/${decision}`, {
    method: 'POST',
    body: note ? { note } : {},
  })
}
