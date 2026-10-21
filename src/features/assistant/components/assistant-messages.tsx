'use client'

import { AssistantAnswer } from '@/src/features/assistant/components/assistant-answer'
import { AssistantReplies } from '@/src/features/assistant/components/assistant-replies'
import { useFollowScroll } from '@/src/features/assistant/hooks/use-follow-scroll'
import type { ReactNode } from 'react'
import type { ChatMessage } from '@/src/features/assistant/lib/assistant-conversation'

type AssistantMessagesProps = {
  messages: ChatMessage[]
  /** Shown while there are no messages yet. */
  empty: ReactNode
  /** Quick replies under the latest answer. */
  replies: string[]
  onReply: (text: string) => void
  onRetry: () => void
  onRestart: () => void
  onNavigate: () => void
}

/** The conversation, newest at the bottom; it follows new answers unless the customer scrolled up. */
export function AssistantMessages({
  messages,
  empty,
  replies,
  onReply,
  onRetry,
  onRestart,
  onNavigate,
}: AssistantMessagesProps) {
  const latestQuestion = messages.findLast(message => message.role === 'user')?.id
  const { container, onScroll } = useFollowScroll<HTMLDivElement>(messages, latestQuestion)

  return (
    <div
      ref={container}
      onScroll={onScroll}
      className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-5 sm:px-5"
    >
      {messages.length === 0 ? (
        empty
      ) : (
        <ol aria-label="Conversación con el asesor" className="flex flex-col gap-5">
          {messages.map(message =>
            message.role === 'user' ? (
              <li
                key={message.id}
                className="flex justify-end duration-300 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
              >
                <p className="max-w-4/5 rounded-2xl rounded-br-sm bg-foreground px-4 py-2.5 text-sm whitespace-pre-line text-background">
                  {message.text}
                </p>
              </li>
            ) : (
              <li key={message.id} className="duration-300 motion-safe:animate-in motion-safe:fade-in">
                <AssistantAnswer answer={message} onRetry={onRetry} onRestart={onRestart} onNavigate={onNavigate} />
              </li>
            ),
          )}
        </ol>
      )}
      {replies.length > 0 && <AssistantReplies options={replies} onPick={onReply} className="mt-3" />}
    </div>
  )
}
