'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useEffectEvent, useRef } from 'react'
import { useAssistant } from '@/src/features/assistant/hooks/use-assistant'
import { ASSISTANT_PARAM, QUESTION_PARAM } from '@/src/features/assistant/lib/assistant-links'

/** Opens the chat for links that ask for it (`/asistente?pregunta=…` redirects here), then cleans the URL. */
export function AssistantLinkOpener() {
  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { open } = useAssistant()
  const requested = params.has(ASSISTANT_PARAM)
  // The link being handled: opens once even if the effect runs twice before the URL is cleaned.
  const handled = useRef<string | null>(null)

  const openFromLink = useEffectEvent(() => {
    if (handled.current === params.toString()) return
    handled.current = params.toString()
    const question = params.get(QUESTION_PARAM)?.trim().slice(0, 200)
    open({ question: question || undefined })
    const rest = new URLSearchParams(params)
    rest.delete(ASSISTANT_PARAM)
    rest.delete(QUESTION_PARAM)
    router.replace(rest.size ? `${pathname}?${rest}` : pathname, { scroll: false })
  })

  useEffect(() => {
    if (requested) openFromLink()
    // Once the URL is clean, the same link can open the chat again.
    else handled.current = null
  }, [requested])

  return null
}
