import { AnswerTrace } from '@/src/features/admin/components/assistant/detail/answer-trace'
import { MessageMeta } from '@/src/features/admin/components/assistant/detail/message-meta'
import { MissingDataNotice } from '@/src/features/admin/components/assistant/detail/missing-data-notice'
import { ShownProducts } from '@/src/features/admin/components/assistant/detail/shown-products'
import { formatTokens, MESSAGE_AUTHOR } from '@/src/features/admin/lib/assistant-display'
import { formatDuration } from '@/src/features/admin/lib/assistant-trace-display'
import { AssistantAvatar } from '@/src/features/assistant/components/assistant-avatar'
import { AssistantRichText } from '@/src/features/assistant/components/assistant-rich-text'
import type { AdminAssistantMessage, AdminUnansweredQuestion } from '@/src/types/api/admin-assistant'

type AssistantMessageProps = {
  message: AdminAssistantMessage
  at: string
  /** Data it noted as missing while writing this answer. */
  missing: AdminUnansweredQuestion[]
}

/**
 * An answer, on the right like the store's own messages in WhatsApp: a tinted bubble with the store's logo, the cards
 * it showed, the data it was missing and how it got there.
 */
export function AssistantMessage({ message, at, missing }: AssistantMessageProps) {
  const tokens = (message.inputTokens ?? 0) + (message.outputTokens ?? 0)
  const details = [
    tokens > 0 && `${formatTokens(tokens)} tokens`,
    message.durationMs !== null && formatDuration(message.durationMs),
  ].filter((detail): detail is string => Boolean(detail))

  return (
    <li className="flex items-start justify-end gap-2 pl-8 sm:pl-20">
      <div className="flex min-w-0 flex-1 flex-col items-end gap-1.5">
        {message.content ? (
          <div className="w-fit max-w-full rounded-2xl rounded-tr-sm bg-tone-info px-3.5 py-2 text-sm">
            <AssistantRichText text={message.content} newTab />
          </div>
        ) : (
          !message.products.length && (
            <p className="w-fit rounded-2xl rounded-tr-sm border border-dashed px-3.5 py-2 text-sm text-muted-foreground italic">
              {message.outcome === 'INTERRUPTED'
                ? 'El cliente se fue antes de que terminara de responder.'
                : 'No pudo responder: el cliente vio un aviso de error.'}
            </p>
          )
        )}
        {message.products.length > 0 && (
          <div className="w-full">
            <ShownProducts products={message.products} />
          </div>
        )}
        {missing.map(question => (
          <MissingDataNotice key={question.id} question={question} />
        ))}
        <MessageMeta author={MESSAGE_AUTHOR[message.role]} at={at} createdAt={message.createdAt} details={details} />
        <AnswerTrace message={message} />
      </div>
      <span className="mt-0.5">
        <AssistantAvatar busy={false} />
      </span>
    </li>
  )
}
