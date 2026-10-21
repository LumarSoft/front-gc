'use client'

import { MessageSquareTextIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { EmptyState } from '@/src/components/ui/empty-state'
import { ConversationCustomerCard } from '@/src/features/admin/components/assistant/detail/conversation-customer-card'
import { ConversationHeader } from '@/src/features/admin/components/assistant/detail/conversation-header'
import { ConversationQuestionsCard } from '@/src/features/admin/components/assistant/detail/conversation-questions-card'
import { ConversationSummaryCard } from '@/src/features/admin/components/assistant/detail/conversation-summary-card'
import { ConversationTranscript } from '@/src/features/admin/components/assistant/detail/conversation-transcript'
import { DetailSkeleton } from '@/src/features/admin/components/common/detail-skeleton'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { useAdminConversation } from '@/src/features/admin/hooks/use-admin-assistant'
import { ApiError } from '@/src/lib/api-client'

/** One conversation, read-only: the chat on the left; who, what it cost and what it could not answer on the right. */
export function ConversationView({ id }: { id: number }) {
  const query = useAdminConversation(id)

  if (query.isPending) return <DetailSkeleton label="Cargando la conversación" />
  if (query.isError) {
    const missing = query.error instanceof ApiError && query.error.status === 404
    return (
      <Card className="py-0">
        {missing ? (
          <EmptyState
            icon={<MessageSquareTextIcon />}
            title="No encontramos esta conversación"
            description="Puede que el link esté mal escrito. Buscala por texto, email o número en la lista."
            action={
              <Button variant="outline" asChild>
                <Link href="/admin/asistente">Ver conversaciones</Link>
              </Button>
            }
          />
        ) : (
          <QueryErrorState message="No pudimos cargar esta conversación." onRetry={() => void query.refetch()} />
        )}
      </Card>
    )
  }

  const conversation = query.data
  return (
    <>
      <ConversationHeader conversation={conversation} />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex min-w-0 flex-col gap-4">
          <ConversationTranscript messages={conversation.messages} />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          {conversation.questions.length > 0 && <ConversationQuestionsCard questions={conversation.questions} />}
          <ConversationCustomerCard conversation={conversation} />
          <ConversationSummaryCard conversation={conversation} />
        </div>
      </div>
    </>
  )
}
