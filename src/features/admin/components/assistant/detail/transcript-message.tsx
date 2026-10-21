import { AnswerTrace } from '@/src/features/admin/components/assistant/detail/answer-trace'
import { ShownProducts } from '@/src/features/admin/components/assistant/detail/shown-products'
import { formatTokens, MESSAGE_AUTHOR } from '@/src/features/admin/lib/assistant-display'
import { formatDuration } from '@/src/features/admin/lib/assistant-trace-display'
import { AssistantRichText } from '@/src/features/assistant/components/assistant-rich-text'
import type { AdminAssistantMessage } from '@/src/types/api/admin-assistant'

type TranscriptMessageProps = {
  message: AdminAssistantMessage
  /** Already formatted ("Hoy a las 14:02" or "14:05"). */
  at: string
}

/**
 * One message: the customer's as a grey bubble, the assistant's as it read in the chat, with the cards it showed and how
 * it got there.
 */
export function TranscriptMessage({ message, at }: TranscriptMessageProps) {
  const fromCustomer = message.role === 'USER'
  const tokens = (message.inputTokens ?? 0) + (message.outputTokens ?? 0)

  return (
    <li className="flex flex-col gap-1.5">
      <p className="text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{MESSAGE_AUTHOR[message.role]}</span> ·{' '}
        <time dateTime={message.createdAt}>{at}</time>
        {tokens > 0 && ` · ${formatTokens(tokens)} tokens`}
        {message.durationMs !== null && ` · ${formatDuration(message.durationMs)}`}
      </p>
      {fromCustomer ? (
        <p className="w-fit max-w-xl rounded-lg bg-muted px-3 py-2 text-sm break-words whitespace-pre-line">
          {message.content}
        </p>
      ) : message.content ? (
        <AssistantRichText text={message.content} newTab />
      ) : (
        !message.products.length && (
          <p className="text-sm text-muted-foreground italic">
            {message.outcome === 'INTERRUPTED'
              ? 'El cliente se fue antes de que terminara de responder.'
              : 'No pudo responder: el cliente vio un aviso de error.'}
          </p>
        )
      )}
      {message.products.length > 0 && <ShownProducts products={message.products} />}
      {!fromCustomer && <AnswerTrace message={message} />}
    </li>
  )
}
