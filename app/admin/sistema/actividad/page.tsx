import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SystemActivityView } from '@/src/features/admin/components/system/activity/system-activity-view'

export const metadata: Metadata = { title: 'Actividad del panel' }

export default function AdminSystemActivityPage() {
  // Filters live in the URL (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense>
      <SystemActivityView />
    </Suspense>
  )
}
