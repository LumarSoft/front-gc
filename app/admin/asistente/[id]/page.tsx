import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ConversationView } from '@/src/features/admin/components/assistant/detail/conversation-view'

export const metadata: Metadata = { title: 'Conversación del asesor' }
export default async function AdminConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const conversationId = Number(id)
  if (!Number.isSafeInteger(conversationId) || conversationId <= 0) notFound()
  return <ConversationView id={conversationId} />
}
