import type { Metadata } from 'next'
import { AdminOrdersView } from '@/src/features/admin/components/orders/admin-orders-view'

export const metadata: Metadata = { title: 'Pedidos' }
export default function OrdersPage() {
  return <AdminOrdersView />
}
