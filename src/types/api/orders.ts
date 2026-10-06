import type { DeliveryMethod } from './checkout'
import type { Money } from './money'

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAYMENT_UNDER_REVIEW'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'EXPIRED'
export type Order = {
  id: number
  number: string
  status: OrderStatus
  deliveryMethod: DeliveryMethod
  paymentMethod: 'MANUAL' | 'MERCADO_PAGO' | 'BANK_TRANSFER' | 'CURRENT_ACCOUNT'
  subtotal: Money
  shippingTotal: Money
  total: Money
  placedAt: string
  expiresAt: string | null
  customer: { name: string; email: string; phone: string | null }
  shippingAddress: {
    street: string | null
    streetNumber: string | null
    city: string | null
    province: string | null
    postalCode: string | null
  } | null
  items: { name: string; variantName: string | null; sku: string; quantity: number; unitPrice: Money; total: Money }[]
  history: { status: OrderStatus; at: string }[]
  allowedStatuses?: OrderStatus[]
}
export type OrdersPage = {
  items: Order[]
  page: number
  pageSize: number
  total: number
  totalPages: number
  expiryJobFailed: boolean
}
