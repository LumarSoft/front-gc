import { AssistantMessage } from '@/src/features/admin/components/assistant/detail/assistant-message'
import { CustomerMessage } from '@/src/features/admin/components/assistant/detail/customer-message'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { messageTimes } from '@/src/features/admin/lib/assistant-display'
import { missingDataByAnswer } from '@/src/features/admin/lib/assistant-transcript'
import type { AdminAssistantMessage, AdminUnansweredQuestion } from '@/src/types/api/admin-assistant'

type ConversationTranscriptProps = {
  messages: AdminAssistantMessage[]
  /** Data the assistant was missing in this conversation, shown under the answer where it happened. */
  questions: AdminUnansweredQuestion[]
}

/** The whole chat, oldest first, as the customer saw it: the customer on the left, the assistant on the right. */
export function ConversationTranscript({ messages, questions }: ConversationTranscriptProps) {
  const times = messageTimes(messages)
  const missing = missingDataByAnswer(messages, questions)
  return (
    <AdminCard
      title="Conversación"
      aside={
        <span className="text-xs text-muted-foreground">
          {messages.length === 1 ? '1 mensaje' : `${messages.length} mensajes`}
        </span>
      }
    >
      {messages.length ? (
        <ol className="flex flex-col gap-4">
          {messages.map((message, index) =>
            message.role === 'USER' ? (
              <CustomerMessage key={message.id} message={message} at={times[index]} />
            ) : (
              <AssistantMessage
                key={message.id}
                message={message}
                at={times[index]}
                missing={missing.get(message.id) ?? []}
              />
            ),
          )}
        </ol>
      ) : (
        <p className="text-sm text-muted-foreground">Esta conversación no tiene mensajes.</p>
      )}
    </AdminCard>
  )
}
