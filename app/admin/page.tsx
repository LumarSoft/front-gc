import { Suspense } from 'react'
import type { Metadata } from 'next'
import { HomeView } from '@/src/features/admin/components/dashboard/home-view'

export const metadata: Metadata = { title: 'Inicio' }

export default function AdminHomePage() {
  // The period lives in the URL (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense>
      <HomeView />
    </Suspense>
  )
}
