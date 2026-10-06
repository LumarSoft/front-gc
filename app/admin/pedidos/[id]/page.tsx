import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdminOrderView } from '@/src/features/admin/components/orders/admin-order-view'

export const metadata: Metadata = { title: 'Detalle de pedido' }
export default async function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const orderId = Number(id)
  if (!Number.isSafeInteger(orderId) || orderId <= 0) notFound()
  return <AdminOrderView id={orderId} />
}
