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
export type ShipmentStatus =
  'PENDING' | 'IN_TRANSIT' | 'READY_FOR_PICKUP' | 'DELIVERED' | 'RETURNED' | 'CANCELLED' | 'LOST'
/** What staff can do with a carrier shipment, computed by the API. */
export type ShipmentAction = 'CREATE' | 'DOCUMENTS' | 'CANCEL' | 'REFRESH'
export type Shipment = {
  status: ShipmentStatus
  carrier: string | null
  service: string | null
  /** The carrier's own wording of the status. */
  carrierStatus: string | null
  trackingNumber: string | null
  trackingUrl: string | null
  /** Branch where the buyer picks it up (branch delivery). */
  pickupPoint: string | null
  /** Admin responses only. */
  actions?: ShipmentAction[]
  /** How the store hands the parcel over: carrier branch, Zipnova's hub or pickup. Admin responses only. */
  dispatch?: 'CARRIER_BRANCH' | 'PROVIDER_HUB' | 'PICKUP' | null
}
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
  /** Carrier delivery only; null for pickup and Rosario delivery. */
  shipment: Shipment | null
  items: {
    name: string
    variantName: string | null
    sku: string
    quantity: number
    unitPrice: Money
    total: Money
    /** The product's current first image (a thumbnail, not part of the snapshot); null without images. */
    imageUrl: string | null
  }[]
  /** `note` and `by` (staff name, null for the system) only come in admin responses. */
  history: { status: OrderStatus; at: string; note?: string | null; by?: string | null }[]
  allowedStatuses?: OrderStatus[]
  /** Placed without an account. Admin responses only. */
  guest?: boolean
}
export type OrdersPage = {
  items: Order[]
  page: number
  pageSize: number
  total: number
  totalPages: number
  expiryJobFailed: boolean
}

/** The signed-in customer's own orders, newest first. */
export type MyOrdersPage = Omit<OrdersPage, 'expiryJobFailed'>

/** Admin list views: groups of states. */
export type OrderStage = 'PENDING_PAYMENT' | 'TO_FULFILL' | 'READY' | 'CLOSED'
export type AdminOrdersQuery = { page?: number; pageSize?: number; stage?: OrderStage; q?: string }
/** Orders waiting in each open stage. */
export type OrderCounts = Record<Exclude<OrderStage, 'CLOSED'>, number>
