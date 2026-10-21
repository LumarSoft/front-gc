'use client'

import { createContext, useContext, useRef, useState } from 'react'

/** The product page the chat was opened from, to suggest questions about it. */
export type AssistantProduct = { slug: string; name: string }

export type OpenAssistantOptions = {
  /** Sent right away, as if the customer had typed it. */
  question?: string
  product?: AssistantProduct
  /** Gets the focus back when the chat closes. */
  trigger?: HTMLElement
}

/** A question waiting for the chat to be loaded and send it. `id` tells two equal questions apart. */
export type PendingQuestion = { id: number; text: string }

export function useAssistantState() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [product, setProduct] = useState<AssistantProduct | null>(null)
  const [pendingQuestion, setPendingQuestion] = useState<PendingQuestion | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const questionCount = useRef(0)

  const open = (options: OpenAssistantOptions = {}): void => {
    returnFocus.current =
      options.trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    setProduct(options.product ?? null)
    if (options.question) setPendingQuestion({ id: ++questionCount.current, text: options.question })
    setHasOpened(true)
    setIsOpen(true)
  }

  const close = (): void => {
    setIsOpen(false)
    if (returnFocus.current?.isConnected) returnFocus.current.focus()
  }

  return {
    isOpen,
    hasOpened,
    product,
    pendingQuestion,
    open,
    close,
    takePendingQuestion: (): void => setPendingQuestion(null),
  }
}

export const AssistantContext = createContext<ReturnType<typeof useAssistantState> | null>(null)

export function useAssistant() {
  const context = useContext(AssistantContext)
  if (!context) throw new Error('useAssistant must be used inside AssistantProvider')
  return context
}
