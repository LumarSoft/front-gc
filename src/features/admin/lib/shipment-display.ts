import type { BadgeTone } from '@/src/features/admin/components/common/tone-badge'
import { adminErrorMessage } from '@/src/features/admin/lib/admin-error-message'
import { ApiError } from '@/src/lib/api-client'
import type { Shipment } from '@/src/types/api/orders'

/** The shipment's state for staff: whether it still has to be booked at Zipnova, then where the parcel is. */
export function shipmentBadge(shipment: Shipment): { label: string; tone: BadgeTone } {
  const actions = shipment.actions ?? []
  switch (shipment.status) {
    case 'PENDING':
      if (actions.includes('DOCUMENTS')) return { label: 'Generado, por despachar', tone: 'info' }
      return { label: 'Sin generar', tone: actions.includes('CREATE') ? 'attention' : 'neutral' }
    case 'IN_TRANSIT':
      return { label: 'En camino', tone: 'info' }
    case 'READY_FOR_PICKUP':
      return { label: 'En sucursal', tone: 'success' }
    case 'DELIVERED':
      return { label: 'Entregado', tone: 'neutral' }
    case 'RETURNED':
      return { label: 'Devuelto', tone: 'warning' }
    case 'LOST':
      return { label: 'Extraviado', tone: 'critical' }
    case 'CANCELLED':
      return { label: 'Cancelado', tone: 'neutral' }
  }
}

/** Zipnova errors come from the API already explained in Spanish (in flight, refused data, provider down). */
export function shipmentErrorMessage(error: unknown): string {
  if (error instanceof ApiError && [404, 409, 422, 503].includes(error.status)) return error.message
  if (error instanceof ApiError && error.status === 429) return 'Hiciste varios pedidos seguidos. Esperá unos segundos.'
  return adminErrorMessage(error)
}
