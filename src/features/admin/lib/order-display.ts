import type { BadgeTone } from '@/src/features/admin/components/common/tone-badge'
import type { DeliveryMethod } from '@/src/types/api/checkout'
import type { OrderStage, OrderStatus } from '@/src/types/api/orders'

type BadgeInfo = { label: string; tone: BadgeTone }

/** Payment side of an order status, as the "Pago" column shows it. */
export function paymentBadge(status: OrderStatus): BadgeInfo {
  switch (status) {
    case 'PENDING_PAYMENT':
      return { label: 'Pago pendiente', tone: 'attention' }
    case 'PAYMENT_UNDER_REVIEW':
      return { label: 'Pago en revisión', tone: 'attention' }
    case 'CANCELLED':
      return { label: 'Cancelado', tone: 'neutral' }
    case 'EXPIRED':
      return { label: 'Reserva vencida', tone: 'warning' }
    default:
      return { label: 'Pagado', tone: 'neutral' }
  }
}

/** Preparation side of an order status; null once the order was cancelled or expired. */
export function fulfillmentBadge(status: OrderStatus, delivery: DeliveryMethod): BadgeInfo | null {
  switch (status) {
    case 'PREPARING':
      return { label: 'En preparación', tone: 'info' }
    case 'READY_FOR_PICKUP':
      return { label: 'Listo para retirar', tone: 'success' }
    case 'SHIPPED':
      return { label: 'Despachado', tone: 'success' }
    case 'DELIVERED':
      return { label: delivery === 'STORE_PICKUP' ? 'Retirado' : 'Entregado', tone: 'neutral' }
    case 'CANCELLED':
    case 'EXPIRED':
      return null
    default:
      return { label: 'No preparado', tone: 'attention' }
  }
}

export const DELIVERY_LABELS: Record<DeliveryMethod, string> = {
  STORE_PICKUP: 'Retiro en el local',
  LOCAL_DELIVERY: 'Envío en Rosario',
  CARRIER: 'Envío por transporte',
}

/** What the main button of the order does for each next state. Cancelling lives in "Más acciones". */
export const NEXT_STEP_LABELS: Partial<Record<OrderStatus, string>> = {
  CONFIRMED: 'Marcar como pagado',
  PREPARING: 'Empezar a preparar',
  READY_FOR_PICKUP: 'Marcar listo para retirar',
  SHIPPED: 'Marcar como despachado',
  DELIVERED: 'Marcar como entregado',
}

/** History wording for staff ("Pago verificado" reads better than the customer-facing "Pedido confirmado"). */
export const HISTORY_LABELS: Record<OrderStatus, string> = {
  PENDING_PAYMENT: 'Pedido realizado',
  PAYMENT_UNDER_REVIEW: 'Pago en revisión',
  CONFIRMED: 'Pago verificado',
  PREPARING: 'Preparación iniciada',
  READY_FOR_PICKUP: 'Listo para retirar',
  SHIPPED: 'Despachado',
  DELIVERED: 'Entregado',
  CANCELLED: 'Pedido cancelado',
  EXPIRED: 'Venció la reserva',
}

export const ORDER_STAGE_VIEWS: { value: OrderStage | undefined; label: string }[] = [
  { value: undefined, label: 'Todos' },
  { value: 'PENDING_PAYMENT', label: 'Pago pendiente' },
  { value: 'TO_FULFILL', label: 'Por preparar' },
  { value: 'READY', label: 'Listos y despachados' },
  { value: 'CLOSED', label: 'Finalizados' },
]

export function itemCount(items: { quantity: number }[]): number {
  return items.reduce((total, item) => total + item.quantity, 0)
}
