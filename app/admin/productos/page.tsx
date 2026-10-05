import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ProductsView } from '@/src/features/admin/components/products/list/products-view'

export const metadata: Metadata = { title: 'Productos' }

export default function AdminProductsPage() {
  // The list reads its filters from the URL (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense>
      <ProductsView />
    </Suspense>
  )
}
