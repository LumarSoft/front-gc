import { apiRequest } from '@/src/lib/api-client'
import type { Cart } from '@/src/types/api/cart'

/** Browser-only: the API identifies the owner from the session or its httpOnly guest-cart cookie. */
export function getCart(): Promise<Cart> {
  return apiRequest<Cart>('/cart')
}

export function addCartItem(input: { variantId: number; quantity: number }): Promise<Cart> {
  return apiRequest<Cart>('/cart/items', { method: 'POST', body: input })
}

export function setCartQuantity(input: { variantId: number; quantity: number }): Promise<Cart> {
  return apiRequest<Cart>(`/cart/items/${input.variantId}`, { method: 'PATCH', body: { quantity: input.quantity } })
}

export function removeCartItem(variantId: number): Promise<Cart> {
  return apiRequest<Cart>(`/cart/items/${variantId}`, { method: 'DELETE' })
}

export function clearCart(): Promise<Cart> {
  return apiRequest<Cart>('/cart', { method: 'DELETE' })
}
