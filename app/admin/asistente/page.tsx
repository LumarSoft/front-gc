import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ConversationsView } from '@/src/features/admin/components/assistant/conversations/conversations-view'

export const metadata: Metadata = { title: 'Asesor IA' }

export default function AdminAssistantPage() {
  // The list reads its view, search and days from the URL (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense>
      <ConversationsView />
    </Suspense>
  )
}
