import { Suspense } from 'react'
import type { Metadata } from 'next'
import { QuestionsView } from '@/src/features/admin/components/assistant/questions/questions-view'

export const metadata: Metadata = { title: 'Preguntas sin responder' }

export default function AdminUnansweredQuestionsPage() {
  // The list reads its view and search from the URL (useSearchParams), which needs a Suspense boundary.
  return (
    <Suspense>
      <QuestionsView />
    </Suspense>
  )
}
