'use client'

import type { ComponentProps } from 'react'
import { useAssistant, type AssistantProduct } from '@/src/features/assistant/hooks/use-assistant'

type AssistantTriggerProps = Omit<ComponentProps<'button'>, 'type'> & {
  /** Sent right away when the chat opens. */
  question?: string
  /** The product page it is on, to suggest questions about it. */
  product?: AssistantProduct
}

/** A button that opens the sales assistant chat. Styles come from the caller (works with `<Button asChild>`). */
export function AssistantTrigger({ question, product, onClick, ...props }: AssistantTriggerProps) {
  const { open } = useAssistant()
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      {...props}
      onClick={event => {
        onClick?.(event)
        if (!event.defaultPrevented) open({ question, product, trigger: event.currentTarget })
      }}
    />
  )
}
