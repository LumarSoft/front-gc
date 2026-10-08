import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AnalyticsView } from '@/src/features/admin/components/analytics/analytics-view'

export const metadata: Metadata = { title: 'Estadísticas' }

export default function AdminAnalyticsPage() {
  // The period lives in the URL (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense>
      <AnalyticsView />
    </Suspense>
  )
}
