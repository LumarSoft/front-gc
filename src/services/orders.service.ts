import { apiRequest } from '@/src/lib/api-client'
import type { CheckoutPaymentMethod, PreviewCheckoutRequest } from '@/src/types/api/checkout'
import type {
  AdminOrdersQuery,
  MyOrdersPage,
  Order,
  OrderCounts,
  OrderStatus,
  OrdersPage,
} from '@/src/types/api/orders'

export type PlaceOrderRequest = PreviewCheckoutRequest & {
  accessToken: string
  reviewToken: string
  paymentMethod: CheckoutPaymentMethod
}
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
/** A new Mercado Pago checkout for the order; the browser goes to `checkoutUrl`. */
export function startMercadoPagoPayment(number: string, accessToken: string): Promise<{ checkoutUrl: string }> {
  return apiRequest<{ checkoutUrl: string }>(`/orders/${encodeURIComponent(number)}/mercado-pago`, {
    method: 'POST',
    body: { accessToken },
    skipRefresh: true,
  })
}
/** Reads the order's payments from Mercado Pago (never from the redirect) and returns the order. */
export function refreshMercadoPagoPayment(number: string, accessToken: string): Promise<Order> {
  return apiRequest<Order>(`/orders/${encodeURIComponent(number)}/mercado-pago/refresh`, {
    method: 'POST',
    body: { accessToken },
    skipRefresh: true,
  })
}
export function getMyOrders(page: number, pageSize: number): Promise<MyOrdersPage> {
  return apiRequest<MyOrdersPage>(`/orders/mine?page=${page}&pageSize=${pageSize}`)
}
export function getMyOrder(number: string): Promise<Order> {
  return apiRequest<Order>(`/orders/mine/${encodeURIComponent(number)}`)
}
export function getAdminOrders(query: AdminOrdersQuery): Promise<OrdersPage> {
  const params = new URLSearchParams()
  if (query.page) params.set('page', String(query.page))
  if (query.pageSize) params.set('pageSize', String(query.pageSize))
  if (query.stage) params.set('stage', query.stage)
  if (query.q) params.set('q', query.q)
  return apiRequest<OrdersPage>(`/admin/orders?${params}`)
}
export function getAdminOrderCounts(): Promise<OrderCounts> {
  return apiRequest<OrderCounts>('/admin/orders/counts')
}
export function getAdminOrder(id: number): Promise<Order> {
  return apiRequest<Order>(`/admin/orders/${id}`)
}
export type ChangeOrderStatusRequest = { status: OrderStatus; paymentReceived?: true; note?: string }
export function changeOrderStatus(id: number, input: ChangeOrderStatusRequest): Promise<Order> {
  return apiRequest<Order>(`/admin/orders/${id}/status`, { method: 'PUT', body: input })
}
