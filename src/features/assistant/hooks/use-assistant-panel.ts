'use client'

import { useEffect, useEffectEvent, useRef, type KeyboardEvent } from 'react'
import type { PendingQuestion } from '@/src/features/assistant/hooks/use-assistant'

/** Below Tailwind's `sm`, the chat covers the whole screen. */
const FULL_SCREEN = '(max-width: 639px)'

type PanelOptions = {
  isOpen: boolean
  pendingQuestion: PendingQuestion | null
  send: (text: string) => void
  takePendingQuestion: () => void
  close: () => void
}

/** Behavior of the chat window: focus, Escape, questions sent from outside and stepping aside to show a page. */
export function useAssistantPanel({ isOpen, pendingQuestion, send, takePendingQuestion, close }: PanelOptions) {
  const dialog = useRef<HTMLElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)

  // Focus moves into the chat. On phones, to the chat itself: focusing the field would cover it with the keyboard.
  useEffect(() => {
    if (!isOpen) return
    if (window.matchMedia(FULL_SCREEN).matches) dialog.current?.focus({ preventScroll: true })
    else input.current?.focus({ preventScroll: true })
  }, [isOpen])

  // Each question once, even if the effect runs twice (React's development checks do that).
  const sent = useRef<number | null>(null)
  const sendPending = useEffectEvent((question: PendingQuestion) => {
    takePendingQuestion()
    if (sent.current === question.id) return
    sent.current = question.id
    send(question.text)
  })
  useEffect(() => {
    if (pendingQuestion) sendPending(pendingQuestion)
  }, [pendingQuestion])

  return {
    dialog,
    input,
    onKeyDown: (event: KeyboardEvent): void => {
      if (event.key === 'Escape') close()
    },
    /** Following a link from the chat: on phones the chat covers the page, so it closes to show it. */
    onNavigate: (): void => {
      if (window.matchMedia(FULL_SCREEN).matches) close()
    },
  }
}
