import { UserRoundIcon } from 'lucide-react'
import { MessageMeta } from '@/src/features/admin/components/assistant/detail/message-meta'
import type { AdminAssistantMessage } from '@/src/types/api/admin-assistant'

type CustomerMessageProps = {
  message: AdminAssistantMessage
  at: string
}

/** What the customer wrote, on the left like in WhatsApp: a grey bubble, and the page it was written from. */
export function CustomerMessage({ message, at }: CustomerMessageProps) {
  return (
    <li className="flex items-start gap-2 pr-8 sm:pr-20">
      <span
        aria-hidden
        className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground"
      >
        <UserRoundIcon className="size-4" />
      </span>
      <div className="flex min-w-0 flex-col items-start gap-1">
        <p className="w-fit max-w-full rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2 text-sm break-words whitespace-pre-line">
          {message.content}
        </p>
        <MessageMeta author="Cliente" at={at} createdAt={message.createdAt} page={message.page} />
      </div>
    </li>
  )
}
