// Matches api-gc/docs/endpoints.md → Admin settings.
import type { Money } from '@/src/types/api/money'

export type AdminSettings = {
  localDelivery: { isActive: boolean; flatRate: Money | null; freeShippingThreshold: Money | null }
  reservation: { manualHours: number; isDefault: boolean }
}

export type LocalDeliveryInput = { isActive: boolean; flatRate: string | null; freeShippingThreshold: string | null }
export type ReservationInput = { manualHours: number }
