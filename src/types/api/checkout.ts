import type { Cart } from './cart'
import type { Money } from './money'

export type DeliveryMethod = 'STORE_PICKUP' | 'LOCAL_DELIVERY' | 'CARRIER'
export type CheckoutAddress = {
  street: string
  streetNumber: string
  city: string
  province: string
  postalCode: string
  /** Recipient's DNI or CUIT, digits only (carrier delivery). */
  taxId?: string
}
/** Where a carrier quote goes: enough to price it before the buyer types the street. */
export type ShippingDestination = Pick<CheckoutAddress, 'city' | 'province' | 'postalCode'>
export type ShippingQuoteOption = {
  /** Sent as `shippingQuoteId` to preview and confirm the order. */
  id: number
  /** HOME: to the buyer's address. PICKUP_POINT: the buyer picks the parcel up at `pickupPoint`. */
  kind: 'HOME' | 'PICKUP_POINT'
  carrier: string
  service: string
  /** What the buyer pays, VAT and insurance included. */
  cost: Money
  minDays: number | null
  maxDays: number | null
  /** Branch name and address ("Name — Street 123, City, Province"). */
  pickupPoint: string | null
}
export type ShippingQuotes = {
  options: ShippingQuoteOption[]
  /** After this, quote again. */
  expiresAt: string
}
export type PreviewCheckoutRequest = {
  name: string
  email: string
  phone?: string
  deliveryMethod: DeliveryMethod
  shippingAddress?: CheckoutAddress
  /** Option from the shipping quotes (carrier delivery). */
  shippingQuoteId?: number
}
export type CheckoutDelivery = {
  code: DeliveryMethod
  name: string
  description: string
  enabled: boolean
  cost: Money | null
  unavailableReason: string | null
}
export type Checkout = {
  cart: Cart
  deliveryOptions: CheckoutDelivery[]
  deliveryMethod: DeliveryMethod
  shippingTotal: Money | null
  total: Money | null
  customer: { name: string; email: string; phone: string | null } | null
  shippingAddress: CheckoutAddress | null
  /** The carrier option the buyer chose (carrier delivery). */
  shippingQuote: ShippingQuoteOption | null
  canReview: boolean
  reviewToken: string | null
  reservationHours: number
  /** How the buyer can pay; Mercado Pago only while the API has it configured. */
  paymentOptions: CheckoutPaymentOption[]
}
/** Paid at the store (coordinated with the team) or online with Mercado Pago. */
export type CheckoutPaymentMethod = 'MANUAL' | 'MERCADO_PAGO'
export type CheckoutPaymentOption = {
  method: CheckoutPaymentMethod
  /** How long a new order holds the stock when paid this way. */
  reservationMinutes: number
}
