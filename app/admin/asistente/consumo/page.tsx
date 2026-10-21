import { Suspense } from 'react'
import type { Metadata } from 'next'
import { UsageView } from '@/src/features/admin/components/assistant/usage/usage-view'

export const metadata: Metadata = { title: 'Consumo del asesor' }

export default function AdminAssistantUsagePage() {
  // The period lives in the URL (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense>
      <UsageView />
    </Suspense>
  )
}
