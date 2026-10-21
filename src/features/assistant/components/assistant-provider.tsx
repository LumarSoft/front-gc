'use client'

import dynamic from 'next/dynamic'
import { Suspense, type ReactNode } from 'react'
import { AssistantLauncher } from '@/src/features/assistant/components/assistant-launcher'
import { AssistantLinkOpener } from '@/src/features/assistant/components/assistant-link-opener'
import { AssistantContext, useAssistantState } from '@/src/features/assistant/hooks/use-assistant'

// The chat (and its code) loads only the first time someone opens it.
const AssistantPanel = dynamic(() =>
  import('@/src/features/assistant/components/assistant-panel').then(module => module.AssistantPanel),
)

/** The store's sales assistant: the floating button, the chat it opens and `useAssistant()` for any other trigger. */
export function AssistantProvider({ children }: { children: ReactNode }) {
  const state = useAssistantState()
  return (
    <AssistantContext.Provider value={state}>
      {children}
      <AssistantLauncher />
      {state.hasOpened && <AssistantPanel />}
      {/* Reads the URL (links to /asistente land here), so it must not hold the page's rendering back. */}
      <Suspense fallback={null}>
        <AssistantLinkOpener />
      </Suspense>
    </AssistantContext.Provider>
  )
}
