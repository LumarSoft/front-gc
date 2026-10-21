import { Suspense } from 'react'
import type { Metadata } from 'next'
import { UsageView } from '@/src/features/admin/components/assistant/usage/usage-view'

export const metadata: Metadata = { title: 'Métricas del asesor' }

export default function AdminAssistantMetricsPage() {
  // The period lives in the URL (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense>
      <UsageView />
    </Suspense>
  )
}
