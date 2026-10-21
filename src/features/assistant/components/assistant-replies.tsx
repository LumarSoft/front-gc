'use client'

import { cn } from '@/src/lib/utils'

type AssistantRepliesProps = {
  options: string[]
  onPick: (text: string) => void
  className?: string
}

/** Short answers to the question that ends the latest answer: tapping one sends it, as if the customer typed it. */
export function AssistantReplies({ options, onPick, className }: AssistantRepliesProps) {
  return (
    <div
      role="group"
      aria-label="Respuestas sugeridas"
      // Under the answer's text, past the store's logo.
      className={cn(
        'flex flex-wrap gap-2 pl-10.5 duration-300 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1',
        className,
      )}
    >
      {options.map(option => (
        <button
          key={option}
          type="button"
          onClick={() => onPick(option)}
          className="inline-flex min-h-10 items-center rounded-full border border-primary/30 bg-background px-4 py-2 text-left text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary/5 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
