import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ConversationView } from '@/src/features/admin/components/assistant/detail/conversation-view'

export const metadata: Metadata = { title: 'Conversación del asesor' }
export default async function AdminConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const conversationId = Number(id)
  // Ids are MySQL INTs: anything larger cannot exist.
  if (!Number.isSafeInteger(conversationId) || conversationId <= 0 || conversationId > 2_147_483_647) notFound()
  return <ConversationView id={conversationId} />
}
