import { Suspense } from 'react'
import type { Metadata } from 'next'
import { OrdersView } from '@/src/features/admin/components/orders/list/orders-view'

export const metadata: Metadata = { title: 'Pedidos' }

export default function OrdersPage() {
  // The list reads its view and search from the URL (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense>
      <OrdersView />
    </Suspense>
  )
}
