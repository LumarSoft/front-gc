'use client'

import { usePathname } from 'next/navigation'
import { AssistantComposer } from '@/src/features/assistant/components/assistant-composer'
import { AssistantErrorBoundary } from '@/src/features/assistant/components/assistant-error-boundary'
import { AssistantHeader } from '@/src/features/assistant/components/assistant-header'
import { AssistantMessages } from '@/src/features/assistant/components/assistant-messages'
import { AssistantWelcome } from '@/src/features/assistant/components/assistant-welcome'
import { useAssistant } from '@/src/features/assistant/hooks/use-assistant'
import { useAssistantChat } from '@/src/features/assistant/hooks/use-assistant-chat'
import { useAssistantPanel } from '@/src/features/assistant/hooks/use-assistant-panel'
import { productSlugFromPath } from '@/src/features/assistant/lib/assistant-links'
import { cn } from '@/src/lib/utils'

/**
 * The sales assistant chat: full screen on phones, a floating window from `sm`. It stays mounted once opened, so the
 * conversation (and an answer being written) survives closing it and moving around the store.
 */
export function AssistantPanel() {
  const { isOpen, close, product, pendingQuestion, takePendingQuestion } = useAssistant()
  const pageProduct = productSlugFromPath(usePathname())
  const chat = useAssistantChat(pageProduct)
  const { dialog, input, onKeyDown, onNavigate } = useAssistantPanel({
    isOpen,
    pendingQuestion,
    send: chat.send,
    takePendingQuestion,
    close,
  })
  // Questions about a product only while the customer is still on its page.
  const topic = product && product.slug === pageProduct ? product : null

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-end sm:inset-auto sm:top-6 sm:right-6 sm:bottom-6">
      <section
        ref={dialog}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="assistant-title"
        inert={!isOpen}
        onKeyDown={onKeyDown}
        className={cn(
          'flex h-full w-full flex-col overflow-hidden bg-background outline-none transition-all duration-300 ease-out motion-reduce:transition-none sm:max-h-170 sm:w-100 sm:rounded-3xl sm:border sm:shadow-2xl sm:shadow-navy/25',
          isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'invisible translate-y-6 opacity-0',
        )}
      >
        <AssistantHeader onClose={close} onRestart={chat.messages.length ? chat.reset : undefined} />
        <AssistantErrorBoundary onRestart={chat.reset}>
          <AssistantMessages
            messages={chat.messages}
            empty={<AssistantWelcome product={topic} onAsk={chat.send} />}
            onRetry={chat.retry}
            onRestart={chat.reset}
            onNavigate={onNavigate}
          />
        </AssistantErrorBoundary>
        <AssistantComposer
          inputRef={input}
          onSend={chat.send}
          disabled={chat.answering || chat.mustRestart}
          placeholder={topic ? 'Preguntá sobre este producto…' : 'Escribí tu consulta…'}
        />
      </section>
    </div>
  )
}
