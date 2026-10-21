import { TranscriptMessage } from '@/src/features/admin/components/assistant/detail/transcript-message'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { messageTimes } from '@/src/features/admin/lib/assistant-display'
import type { AdminAssistantMessage } from '@/src/types/api/admin-assistant'

/** The whole chat, oldest first, as the customer saw it. */
export function ConversationTranscript({ messages }: { messages: AdminAssistantMessage[] }) {
  const times = messageTimes(messages)
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
        <ol className="flex flex-col gap-5">
          {messages.map((message, index) => (
            <TranscriptMessage key={message.id} message={message} at={times[index]} />
          ))}
        </ol>
      ) : (
        <p className="text-sm text-muted-foreground">Esta conversación no tiene mensajes.</p>
      )}
    </AdminCard>
  )
}
