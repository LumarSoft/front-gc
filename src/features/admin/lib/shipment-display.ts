import type { BadgeTone } from '@/src/features/admin/components/common/tone-badge'
import { adminErrorMessage } from '@/src/features/admin/lib/admin-error-message'
import { ApiError } from '@/src/lib/api-client'
import type { Order, Shipment } from '@/src/types/api/orders'

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

/** What to do with the parcel once it is booked, from the dispatch mode set in Zipnova. */
function handOverHint(shipment: Shipment): string {
  switch (shipment.dispatch) {
    case 'CARRIER_BRANCH':
      return `Imprimí la etiqueta, pegala en el paquete y llevalo a una sucursal de ${shipment.carrier ?? 'el transporte'}.`
    case 'PROVIDER_HUB':
      return 'Imprimí la etiqueta, pegala en el paquete y llevalo al centro de distribución de Zipnova.'
    case 'PICKUP':
      return 'Imprimí la etiqueta y pegala en el paquete: lo pasan a buscar en la recolección que programes en Zipnova.'
    default:
      return 'Imprimí la etiqueta y pegala en el paquete.'
  }
}

/** The next step for staff, under the shipment details; null when there is nothing to do. */
export function shipmentHint(order: Order, shipment: Shipment, canCreate: boolean): string | null {
  if (canCreate)
    return shipment.status === 'CANCELLED'
      ? 'El envío se canceló. Podés generarlo de nuevo; Zipnova lo cobra del saldo de la cuenta.'
      : 'Al generarlo, Zipnova lo cobra del saldo de la cuenta y prepara la etiqueta.'
  if (shipment.status === 'PENDING' && shipment.actions?.includes('DOCUMENTS'))
    return `${handOverHint(shipment)} El pedido pasa solo a Despachado cuando el transporte lo recibe.`
  if (shipment.status === 'PENDING' && !shipment.actions?.length)
    return order.status === 'PENDING_PAYMENT' || order.status === 'PAYMENT_UNDER_REVIEW'
      ? 'Se genera en Zipnova cuando verifiques el pago.'
      : null
  return null
}

/** Zipnova errors come from the API already explained in Spanish (in flight, refused data, provider down). */
export function shipmentErrorMessage(error: unknown): string {
  if (error instanceof ApiError && [404, 409, 422, 503].includes(error.status)) return error.message
  if (error instanceof ApiError && error.status === 429) return 'Hiciste varios pedidos seguidos. Esperá unos segundos.'
  return adminErrorMessage(error)
}
