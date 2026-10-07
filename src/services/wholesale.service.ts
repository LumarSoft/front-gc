import { apiRequest } from '@/src/lib/api-client'
import type { WholesaleStatus } from '@/src/types/api/auth'
import type {
  AdminWholesaleApplication,
  CreateWholesaleApplicationRequest,
  MyWholesaleApplication,
  WholesaleApplicationsPage,
  WholesaleDecision,
} from '@/src/types/api/wholesale'

export function getMyWholesaleApplication(): Promise<MyWholesaleApplication> {
  return apiRequest<MyWholesaleApplication>('/wholesale-applications/mine')
}

export function applyForWholesale(input: CreateWholesaleApplicationRequest): Promise<MyWholesaleApplication> {
  return apiRequest<MyWholesaleApplication>('/wholesale-applications', { method: 'POST', body: input })
}

export function getAdminWholesaleApplications(
  page: number,
  status: WholesaleStatus | '',
): Promise<WholesaleApplicationsPage> {
  const params = new URLSearchParams({ page: String(page) })
  if (status) params.set('status', status)
  return apiRequest<WholesaleApplicationsPage>(`/admin/wholesale-applications?${params}`)
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
