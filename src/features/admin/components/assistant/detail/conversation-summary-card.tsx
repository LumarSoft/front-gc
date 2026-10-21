import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { formatCount } from '@/src/features/admin/lib/assistant-display'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { AdminConversation } from '@/src/types/api/admin-assistant'

/** How long it went and what it cost; when the assistant offered a person, why. */
export function ConversationSummaryCard({ conversation }: { conversation: AdminConversation }) {
  const customerMessages = conversation.messages.filter(message => message.role === 'USER').length
  const model = conversation.messages.findLast(message => message.model)?.model
  const rows: [string, string][] = [
    ['Empezó', formatOrderDate(conversation.createdAt)],
    ['Última actividad', formatOrderDate(conversation.lastMessageAt)],
    ['Mensajes del cliente', formatCount(customerMessages)],
    ['Tokens de entrada', formatCount(conversation.inputTokens)],
    ['Tokens de salida', formatCount(conversation.outputTokens)],
    ...(model ? [['Modelo', model] as [string, string]] : []),
  ]

  return (
    <AdminCard title="Resumen">
      {conversation.status === 'ESCALATED' && (
        <div className="mb-4 rounded-lg bg-tone-info px-3 py-2 text-sm text-tone-info-foreground">
          <p className="font-medium">Le ofreció seguir por WhatsApp</p>
          {conversation.escalationReason && <p className="mt-0.5 break-words">{conversation.escalationReason}</p>}
          {conversation.escalatedAt && (
            <p className="mt-0.5 text-xs opacity-80">{formatOrderDate(conversation.escalatedAt)}</p>
          )}
        </div>
      )}
      <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right tabular-nums break-words">{value}</dd>
          </div>
        ))}
      </dl>
    </AdminCard>
  )
}
