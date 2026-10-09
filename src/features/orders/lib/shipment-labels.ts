import type { DeliveryMethod } from '@/src/types/api/checkout'
import type { ShipmentStatus } from '@/src/types/api/orders'

export const DELIVERY_NAMES: Record<DeliveryMethod, string> = {
  STORE_PICKUP: 'Retiro en el local',
  LOCAL_DELIVERY: 'Entrega en Rosario',
  CARRIER: 'Envío al resto del país',
}

/** The parcel's state as the buyer reads it. */
export const SHIPMENT_LABELS: Record<ShipmentStatus, string> = {
  PENDING: 'Por despachar',
  IN_TRANSIT: 'En camino',
  READY_FOR_PICKUP: 'Listo para retirar en la sucursal',
  DELIVERED: 'Entregado',
  RETURNED: 'Devuelto al remitente',
  CANCELLED: 'Envío cancelado',
  LOST: 'En revisión con el transporte',
}

/** Only web links from the carrier are opened; anything else is ignored. */
export function safeTrackingUrl(url: string | null): string | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : null
  } catch {
    return null
  }
}
