import type { Order, OrderStatus } from '@/src/types/api/orders'

/** What the buyer sees after Mercado Pago, decided only from the order the API read from Mercado Pago. */
export type PaymentOutcome = 'APPROVED' | 'REJECTED' | 'WAITING' | 'CLOSED'

const PAID: OrderStatus[] = ['CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'SHIPPED', 'DELIVERED']

export function paymentOutcome(order: Order): PaymentOutcome {
  if (PAID.includes(order.status)) return 'APPROVED'
  if (order.status !== 'PENDING_PAYMENT' && order.status !== 'PAYMENT_UNDER_REVIEW') return 'CLOSED'
  const attempt = order.payment?.provider === 'MERCADO_PAGO' ? order.payment.status : null
  return attempt === 'REJECTED' || attempt === 'CANCELLED' ? 'REJECTED' : 'WAITING'
}
