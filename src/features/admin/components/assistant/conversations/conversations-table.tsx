import { ConversationBadges } from '@/src/features/admin/components/assistant/conversation-badges'
import {
  IndexTable,
  IndexTableBody,
  IndexTableCell,
  IndexTableHead,
  IndexTableHeader,
  IndexTableRow,
  IndexTableRowLink,
} from '@/src/features/admin/components/common/index-table'
import { customerName, formatTokens } from '@/src/features/admin/lib/assistant-display'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { AdminConversationListItem } from '@/src/types/api/admin-assistant'

/** Desktop list (md and up): what the customer asked first, who, how long and when; any cell opens it. */
export function ConversationsTable({ conversations }: { conversations: AdminConversationListItem[] }) {
  return (
    <IndexTable className="hidden md:table">
      <IndexTableHeader>
        <IndexTableHead className="w-full">Primera consulta</IndexTableHead>
        <IndexTableHead className="text-right">Mensajes</IndexTableHead>
        <IndexTableHead className="text-right">Tokens</IndexTableHead>
        <IndexTableHead>Última actividad</IndexTableHead>
        <IndexTableHead>Estado</IndexTableHead>
      </IndexTableHeader>
      <IndexTableBody>
        {conversations.map(conversation => (
          <IndexTableRow key={conversation.id}>
            <IndexTableCell className="max-w-0 min-w-72">
              <IndexTableRowLink href={`/admin/asistente/${conversation.id}`} className="block truncate font-semibold">
                {conversation.firstQuestion ?? 'Sin mensajes del cliente'}
              </IndexTableRowLink>
              <span className="block truncate text-xs text-muted-foreground">
                #{conversation.id} · {customerName(conversation.customer)}
              </span>
            </IndexTableCell>
            <IndexTableCell className="text-right tabular-nums">{conversation.customerMessages}</IndexTableCell>
            <IndexTableCell className="text-right text-muted-foreground tabular-nums">
              {formatTokens(conversation.tokens)}
            </IndexTableCell>
            <IndexTableCell className="whitespace-nowrap text-muted-foreground">
              {formatOrderDate(conversation.lastMessageAt)}
            </IndexTableCell>
            <IndexTableCell>
              <div className="flex gap-1.5">
                <ConversationBadges conversation={conversation} />
              </div>
            </IndexTableCell>
          </IndexTableRow>
        ))}
      </IndexTableBody>
    </IndexTable>
  )
}
