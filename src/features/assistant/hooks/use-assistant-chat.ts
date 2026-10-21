'use client'

import { useEffect, useReducer, useRef } from 'react'
import {
  conversationReducer,
  EMPTY_CONVERSATION,
  isAnswering,
  lastQuestion,
  needsRestart,
} from '@/src/features/assistant/lib/assistant-conversation'
import { answerProblem, CONNECTION_LOST } from '@/src/features/assistant/lib/assistant-problems'
import { loadConversation, saveConversation } from '@/src/features/assistant/lib/assistant-storage'
import { ApiError } from '@/src/lib/api-client'
import { streamAssistantAnswer } from '@/src/services/assistant.service'

/**
 * The conversation with the sales assistant: sends questions, applies the streamed answer as it arrives and keeps the
 * conversation in the tab so it survives navigation and reloads. `productSlug`: the product the customer is looking at.
 */
export function useAssistantChat(productSlug: string | undefined) {
  const [conversation, dispatch] = useReducer(conversationReducer, EMPTY_CONVERSATION, loadConversation)
  const answering = isAnswering(conversation)
  const token = useRef(conversation.token)
  const request = useRef<AbortController | null>(null)
  // Set as soon as a question goes out, before React re-renders with it: two quick sends cannot both pass.
  const busy = useRef(false)

  useEffect(() => {
    token.current = conversation.token
    // Saved between answers only: not on every streamed word.
    if (!isAnswering(conversation)) saveConversation(conversation)
  }, [conversation])

  async function answer(text: string): Promise<void> {
    const controller = new AbortController()
    request.current = controller
    busy.current = true
    let finished = false
    try {
      const input = { message: text, conversation: token.current ?? undefined, productSlug }
      for await (const event of streamAssistantAnswer(input, controller.signal)) {
        if (event.type === 'conversation') token.current = event.token
        if (event.type === 'done') finished = true
        dispatch({ type: 'event', event })
      }
      if (!finished) dispatch({ type: 'failed', problem: CONNECTION_LOST })
    } catch (error) {
      if (controller.signal.aborted) return
      // The API no longer knows this conversation (expired or removed): carry on in a new one.
      if (error instanceof ApiError && error.status === 404 && token.current) {
        token.current = null
        return answer(text)
      }
      dispatch({ type: 'failed', problem: answerProblem(error) })
    } finally {
      if (request.current === controller) busy.current = false
    }
  }

  return {
    messages: conversation.messages,
    answering,
    /** The conversation reached its limit and only a new one can continue. */
    mustRestart: needsRestart(conversation),
    send: (text: string): void => {
      const question = text.trim()
      if (!question || busy.current || needsRestart(conversation)) return
      dispatch({ type: 'asked', id: crypto.randomUUID(), text: question })
      void answer(question)
    },
    retry: (): void => {
      const question = lastQuestion(conversation)
      if (!question || busy.current) return
      dispatch({ type: 'retried' })
      void answer(question)
    },
    reset: (): void => {
      request.current?.abort()
      busy.current = false
      token.current = null
      dispatch({ type: 'reset' })
    },
  }
}
