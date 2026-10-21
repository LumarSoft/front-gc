'use client'

import { useEffect, useEffectEvent, useRef, type KeyboardEvent } from 'react'
import type { PendingQuestion } from '@/src/features/assistant/hooks/use-assistant'

/** Below Tailwind's `sm`, the chat covers the whole screen. */
const FULL_SCREEN = '(max-width: 639px)'

type PanelOptions = {
  isOpen: boolean
  pendingQuestion: PendingQuestion | null
  send: (text: string) => boolean
  /** The chat can send a question now (no answer being written, the conversation is not full). */
  ready: boolean
  takePendingQuestion: () => void
  close: () => void
}

/** Behavior of the chat window: focus, Escape, questions sent from outside and stepping aside to show a page. */
export function useAssistantPanel({ isOpen, pendingQuestion, send, ready, takePendingQuestion, close }: PanelOptions) {
  const dialog = useRef<HTMLElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)

  // Focus moves into the chat. On phones, to the chat itself: focusing the field would cover it with the keyboard.
  useEffect(() => {
    if (!isOpen) return
    if (window.matchMedia(FULL_SCREEN).matches) dialog.current?.focus({ preventScroll: true })
    else input.current?.focus({ preventScroll: true })
  }, [isOpen])

  // Each question once, even if the effect runs twice (React's development checks do that). A question that cannot go
  // yet (an answer is being written, the conversation must start over) waits until the chat is ready.
  const sent = useRef<number | null>(null)
  const sendPending = useEffectEvent((question: PendingQuestion) => {
    if (sent.current === question.id || !send(question.text)) return
    sent.current = question.id
    takePendingQuestion()
  })
  useEffect(() => {
    if (pendingQuestion) sendPending(pendingQuestion)
  }, [pendingQuestion, ready])

  return {
    dialog,
    input,
    onKeyDown: (event: KeyboardEvent): void => {
      if (event.key === 'Escape') close()
    },
    /**
     * Following a link from the chat: the chat steps aside to show the page (it covers it on phones, and the product's
     * price and buttons on desktop). The conversation stays; the launcher or the buy bar bring it back.
     */
    onNavigate: close,
  }
}
