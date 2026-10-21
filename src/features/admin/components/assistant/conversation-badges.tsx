import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import type { AdminConversationListItem } from '@/src/types/api/admin-assistant'

type ConversationBadgesProps = {
  conversation: Pick<AdminConversationListItem, 'status' | 'openQuestions'>
}

/** What needs a look: the assistant offered a person, or it could not answer something. Nothing for the rest. */
export function ConversationBadges({ conversation }: ConversationBadgesProps) {
  return (
    <>
      {conversation.status === 'ESCALATED' && <ToneBadge tone="info">Derivada</ToneBadge>}
      {conversation.openQuestions > 0 && (
        <ToneBadge tone="attention">
          {conversation.openQuestions === 1 ? '1 sin responder' : `${conversation.openQuestions} sin responder`}
        </ToneBadge>
      )}
    </>
  )
}
