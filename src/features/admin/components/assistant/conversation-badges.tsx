import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import type { AdminConversationListItem } from '@/src/types/api/admin-assistant'

type ConversationBadgesProps = {
  conversation: Pick<AdminConversationListItem, 'status' | 'openQuestions' | 'problemAnswers' | 'cartAdds'>
}

/** Whether the conversation has any badge, so lists can leave out an empty row. */
export const hasConversationBadges = (conversation: ConversationBadgesProps['conversation']): boolean =>
  conversation.status === 'ESCALATED' ||
  conversation.openQuestions > 0 ||
  conversation.problemAnswers > 0 ||
  conversation.cartAdds > 0

/**
 * What needs a look (the assistant offered a person, was missing a piece of data to answer, or an answer went wrong)
 * and what it sold. Nothing for the rest.
 */
export function ConversationBadges({ conversation }: ConversationBadgesProps) {
  return (
    <>
      {conversation.problemAnswers > 0 && (
        <ToneBadge tone="critical">
          {conversation.problemAnswers === 1 ? '1 para revisar' : `${conversation.problemAnswers} para revisar`}
        </ToneBadge>
      )}
      {conversation.status === 'ESCALATED' && <ToneBadge tone="info">Derivada</ToneBadge>}
      {conversation.openQuestions > 0 && (
        <ToneBadge tone="attention">
          {conversation.openQuestions === 1 ? '1 dato faltante' : `${conversation.openQuestions} datos faltantes`}
        </ToneBadge>
      )}
      {conversation.cartAdds > 0 && (
        <ToneBadge tone="success">
          {conversation.cartAdds === 1 ? '1 al carrito' : `${conversation.cartAdds} al carrito`}
        </ToneBadge>
      )}
    </>
  )
}
