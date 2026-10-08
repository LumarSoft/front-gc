import { Suspense } from 'react'
import type { Metadata } from 'next'
import { WholesaleView } from '@/src/features/admin/components/wholesale/list/wholesale-view'

export const metadata: Metadata = { title: 'Clientes frecuentes' }

export default function AdminWholesalePage() {
  // The list reads its view and search from the URL (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense>
      <WholesaleView />
    </Suspense>
  )
}
