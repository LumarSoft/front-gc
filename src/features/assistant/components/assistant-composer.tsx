'use client'

import { ArrowUp } from 'lucide-react'
import { useState, type Ref } from 'react'
import { Button } from '@/src/components/ui/button'

/** Same limit as the API. */
const MAX_LENGTH = 1000

type AssistantComposerProps = {
  onSend: (text: string) => void
  /** While an answer is being written, or when the conversation must start over. */
  disabled: boolean
  placeholder: string
  inputRef: Ref<HTMLTextAreaElement>
}

export function AssistantComposer({ onSend, disabled, placeholder, inputRef }: AssistantComposerProps) {
  const [text, setText] = useState('')
  const canSend = !disabled && text.trim().length > 0

  const send = (): void => {
    if (!canSend) return
    onSend(text)
    setText('')
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        send()
      }}
      className="shrink-0 border-t bg-background px-3 pt-3 pb-safe-4 sm:px-4 sm:pb-4"
    >
      <div className="flex items-end gap-2 rounded-3xl border bg-surface p-1.5 pl-4 transition-colors focus-within:border-primary">
        <label htmlFor="assistant-question" className="sr-only">
          Tu consulta
        </label>
        <textarea
          id="assistant-question"
          ref={inputRef}
          value={text}
          onChange={event => setText(event.target.value)}
          onKeyDown={event => {
            // Enter sends, Shift+Enter breaks the line; never while an IME is composing a word.
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault()
              send()
            }
          }}
          rows={1}
          maxLength={MAX_LENGTH}
          enterKeyHint="send"
          placeholder={placeholder}
          className="field-sizing-content max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground sm:text-sm"
        />
        <Button
          type="submit"
          size="icon-lg"
          disabled={!canSend}
          aria-label="Enviar consulta"
          className="size-10 shrink-0 rounded-full"
        >
          <ArrowUp strokeWidth={2.25} className="size-5" />
        </Button>
      </div>
    </form>
  )
}
