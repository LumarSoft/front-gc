import type { Order, OrderStatus } from '@/src/types/api/orders'

export const ORDER_LABELS: Record<OrderStatus, { label: string; description: string }> = {
  PENDING_PAYMENT: {
    label: 'Pendiente de pago',
    description: 'Tu pedido está registrado. Coordiná el pago con el local para que podamos confirmarlo.',
  },
  PAYMENT_UNDER_REVIEW: { label: 'Pago en revisión', description: 'El equipo está revisando el pago.' },
  CONFIRMED: { label: 'Pedido confirmado', description: 'El equipo verificó el pago de tu pedido.' },
  PREPARING: { label: 'En preparación', description: 'Estamos preparando tus productos.' },
  READY_FOR_PICKUP: { label: 'Listo para retirar', description: 'Tu pedido ya está listo para retirar en el local.' },
  SHIPPED: {
    label: 'Despachado',
    description: 'Tu pedido salió del local. El estado de entrega lo actualiza nuestro equipo.',
  },
  DELIVERED: { label: 'Entregado', description: 'Tu pedido fue entregado. Gracias por elegirnos.' },
  CANCELLED: { label: 'Cancelado', description: 'Este pedido fue cancelado y su reserva de stock se liberó.' },
  EXPIRED: {
    label: 'Reserva vencida',
    description:
      'Venció la reserva sin confirmar el pago. Podés hacer un nuevo pedido con el precio y stock disponibles.',
  },
}

/**
 * Carrier orders are handed over and delivered by the carrier, whose updates arrive on their own; Mercado Pago orders
 * are paid online and confirmed when Mercado Pago approves the payment.
 */
export function orderDescription(order: Pick<Order, 'status' | 'deliveryMethod' | 'paymentMethod'>): string {
  if (order.deliveryMethod === 'CARRIER' && order.status === 'SHIPPED')
    return 'Tu pedido ya está en manos del transporte. Abajo tenés el seguimiento del envío.'
  if (order.paymentMethod === 'MERCADO_PAGO') {
    if (order.status === 'PENDING_PAYMENT')
      return 'Tu pedido está registrado. Pagalo con Mercado Pago para confirmarlo.'
    if (order.status === 'CONFIRMED') return 'Mercado Pago aprobó tu pago. Ya estamos con tu pedido.'
  }
  return ORDER_LABELS[order.status].description
}
