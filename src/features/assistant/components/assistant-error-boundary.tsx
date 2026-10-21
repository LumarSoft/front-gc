'use client'

import { catchError, type ErrorInfo } from 'next/error'
import { Button } from '@/src/components/ui/button'

type FallbackProps = {
  /** Forgets the conversation, in case something in it is what broke the chat. */
  onRestart: () => void
}

function AssistantErrorFallback({ onRestart }: FallbackProps, { reset }: ErrorInfo) {
  return (
    <div role="alert" className="flex flex-1 flex-col items-start justify-center gap-3 px-5 py-8">
      <p className="text-lg font-extrabold">El asesor tuvo un problema</p>
      <p className="text-sm text-muted-foreground">
        Empezá una consulta nueva. Mientras tanto, podés buscar en el catálogo.
      </p>
      <Button
        onClick={() => {
          onRestart()
          reset()
        }}
        className="h-10 rounded-full px-5 font-bold"
      >
        Empezar de nuevo
      </Button>
    </div>
  )
}

/** Keeps a failure inside the chat from breaking the page around it. */
export const AssistantErrorBoundary = catchError(AssistantErrorFallback)
