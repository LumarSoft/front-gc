import Link from 'next/link'
import {
  ConversationBadges,
  hasConversationBadges,
} from '@/src/features/admin/components/assistant/conversation-badges'
import { customerName } from '@/src/features/admin/lib/assistant-display'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { AdminConversationListItem } from '@/src/types/api/admin-assistant'

/** Phone list (below md): the first question, who wrote, how much and when, then what needs a look (if anything). */
export function ConversationsMobileList({ conversations }: { conversations: AdminConversationListItem[] }) {
  return (
    <ul className="divide-y md:hidden">
      {conversations.map(conversation => (
        <li key={conversation.id}>
          <Link
            href={`/admin/asistente/${conversation.id}`}
            className="flex flex-col gap-1 px-4 py-3 transition-colors active:bg-table-head"
          >
            <p className="line-clamp-2 text-sm font-semibold">
              {conversation.firstQuestion ?? 'Sin mensajes del cliente'}
            </p>
            <p className="flex items-baseline justify-between gap-3 text-sm text-muted-foreground">
              <span className="truncate">
                {customerName(conversation.customer)} ·{' '}
                {conversation.customerMessages === 1 ? '1 mensaje' : `${conversation.customerMessages} mensajes`}
              </span>
              <span className="shrink-0 text-xs">{formatOrderDate(conversation.lastMessageAt)}</span>
            </p>
            {hasConversationBadges(conversation) && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <ConversationBadges conversation={conversation} />
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
