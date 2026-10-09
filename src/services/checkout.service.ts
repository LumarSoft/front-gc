import { apiRequest } from '@/src/lib/api-client'
import type { Checkout, PreviewCheckoutRequest, ShippingDestination, ShippingQuotes } from '@/src/types/api/checkout'

export function getCheckout(): Promise<Checkout> {
  return apiRequest<Checkout>('/cart/checkout')
}

export function previewCheckout(input: PreviewCheckoutRequest): Promise<Checkout> {
  return apiRequest<Checkout>('/cart/checkout/preview', { method: 'POST', body: input })
}

export function quoteShipping(destination: ShippingDestination): Promise<ShippingQuotes> {
  return apiRequest<ShippingQuotes>('/cart/checkout/shipping-quotes', { method: 'POST', body: { destination } })
}
