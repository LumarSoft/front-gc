import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SystemLogsView } from '@/src/features/admin/components/system/logs/system-logs-view'

export const metadata: Metadata = { title: 'Errores' }

export default function AdminSystemLogsPage() {
  // Filters live in the URL (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense>
      <SystemLogsView />
    </Suspense>
  )
}
