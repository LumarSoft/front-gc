import { cn } from '@/src/lib/utils'

const DOTS = ['bg-cyan', 'bg-magenta', 'bg-yellow', 'bg-foreground']

/**
 * Shown while the assistant works: the four process colors inking in turn (still with reduced motion) and what it is
 * doing, in words. Each new phrase fades in over the previous one.
 */
export function AssistantTyping({ label }: { label: string }) {
  return (
    <p role="status" className="flex items-start gap-2.5 py-1 text-sm text-muted-foreground">
      {/* As tall as one line of text, so the dots stay next to the first line when the phrase wraps. */}
      <span aria-hidden className="inline-flex h-5 shrink-0 items-center gap-1">
        {DOTS.map((color, index) => (
          <span
            key={color}
            className={cn('size-1.5 rounded-full motion-safe:animate-ink', color)}
            style={{ animationDelay: `${index * 150}ms` }}
          />
        ))}
      </span>
      <span key={label} className="duration-500 motion-safe:animate-in motion-safe:fade-in">
        {label}
      </span>
    </p>
  )
}
