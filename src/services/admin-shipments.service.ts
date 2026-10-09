import { apiDownload, apiRequest } from '@/src/lib/api-client'
import type { Order } from '@/src/types/api/orders'

/** Dispatch documents: one label per package (PDF or ZPL for thermal printers) and the carrier's dispatch guide. */
export type ShipmentDocument = { kind: 'label'; format: 'pdf' | 'zpl' } | { kind: 'guide'; format: 'pdf' }

export function createShipment(orderId: number): Promise<Order> {
  return apiRequest<Order>(`/admin/orders/${orderId}/shipment`, { method: 'POST' })
}
export function cancelShipment(orderId: number): Promise<Order> {
  return apiRequest<Order>(`/admin/orders/${orderId}/shipment/cancel`, { method: 'POST' })
}
export function refreshShipment(orderId: number): Promise<Order> {
  return apiRequest<Order>(`/admin/orders/${orderId}/shipment/refresh`, { method: 'POST' })
}
export function downloadShipmentDocument(orderId: number, document: ShipmentDocument): Promise<Blob> {
  return apiDownload(`/admin/orders/${orderId}/shipment/documents/${document.kind}?format=${document.format}`)
}
