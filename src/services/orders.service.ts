import { apiRequest } from '@/src/lib/api-client'
import type { PreviewCheckoutRequest } from '@/src/types/api/checkout'
import type { Order, OrderStatus, OrdersPage } from '@/src/types/api/orders'

export type PlaceOrderRequest = PreviewCheckoutRequest & { accessToken: string; reviewToken: string }
export function placeOrder(input: PlaceOrderRequest): Promise<Order> {
  return apiRequest<Order>('/cart/checkout/orders', { method: 'POST', body: input })
}
export function recoverOrder(accessToken: string): Promise<Order> {
  return apiRequest<Order>('/orders/recover', { method: 'POST', body: { accessToken }, skipRefresh: true })
}
export function trackOrder(number: string, accessToken: string): Promise<Order> {
  return apiRequest<Order>(`/orders/${encodeURIComponent(number)}/track`, {
    method: 'POST',
    body: { accessToken },
    skipRefresh: true,
  })
}
export function getAdminOrders(page: number, status: OrderStatus | ''): Promise<OrdersPage> {
  const params = new URLSearchParams({ page: String(page) })
  if (status) params.set('status', status)
  return apiRequest<OrdersPage>(`/admin/orders?${params}`)
}
export function getAdminOrder(id: number): Promise<Order> {
  return apiRequest<Order>(`/admin/orders/${id}`)
}
export function changeOrderStatus(id: number, status: OrderStatus, paymentReceived?: boolean): Promise<Order> {
  return apiRequest<Order>(`/admin/orders/${id}/status`, {
    method: 'PUT',
    body: { status, ...(paymentReceived ? { paymentReceived } : {}) },
  })
}
