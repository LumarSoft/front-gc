import type { Cart } from './cart'
import type { Money } from './money'

export type DeliveryMethod = 'STORE_PICKUP' | 'LOCAL_DELIVERY' | 'CARRIER'
export type CheckoutAddress = {
  street: string
  streetNumber: string
  city: string
  province: string
  postalCode: string
}
export type PreviewCheckoutRequest = {
  name: string
  email: string
  phone?: string
  deliveryMethod: DeliveryMethod
  shippingAddress?: CheckoutAddress
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
  canReview: boolean
}
