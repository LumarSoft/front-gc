import { apiRequest } from '@/src/lib/api-client'
import type { AdminSettings, LocalDeliveryInput, ReservationInput } from '@/src/types/api/admin-settings'

export function getAdminSettings(): Promise<AdminSettings> {
  return apiRequest<AdminSettings>('/admin/settings')
}

export function updateLocalDelivery(input: LocalDeliveryInput): Promise<AdminSettings> {
  return apiRequest<AdminSettings>('/admin/settings/local-delivery', { method: 'PUT', body: input })
}

export function updateReservation(input: ReservationInput): Promise<AdminSettings> {
  return apiRequest<AdminSettings>('/admin/settings/reservation', { method: 'PUT', body: input })
}
