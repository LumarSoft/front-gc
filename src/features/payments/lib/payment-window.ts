import type { Order } from '@/src/types/api/orders'

/** Mercado Pago stops taking payments this long before the reservation ends (the API's own margin). */
const CLOSING_MS = 10 * 60_000
/** The API refuses to start a payment with less than this left. */
const MIN_TIME_TO_PAY_MS = 60_000

/** Whether the buyer can still go to Mercado Pago for this order. The API checks it again. */
export function canPayOnline(order: Order, now = Date.now()): boolean {
  if (order.paymentMethod !== 'MERCADO_PAGO' || order.status !== 'PENDING_PAYMENT' || !order.expiresAt) return false
  return Date.parse(order.expiresAt) - CLOSING_MS - now >= MIN_TIME_TO_PAY_MS
}

/** Until when Mercado Pago takes the payment. */
export function paymentDeadline(order: Order): string | null {
  return order.expiresAt ? new Date(Date.parse(order.expiresAt) - CLOSING_MS).toISOString() : null
}
