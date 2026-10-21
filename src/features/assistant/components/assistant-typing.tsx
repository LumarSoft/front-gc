import { cn } from '@/src/lib/utils'

const DOTS = ['bg-cyan', 'bg-magenta', 'bg-yellow', 'bg-foreground']

/** Shown while the assistant writes: the four process colors inking in turn (still dots with reduced motion). */
export function AssistantTyping() {
  return (
    <span role="status" className="inline-flex items-center gap-1 py-2">
      {DOTS.map((color, index) => (
        <span
          key={color}
          aria-hidden
          className={cn('size-2 rounded-full motion-safe:animate-ink', color)}
          style={{ animationDelay: `${index * 150}ms` }}
        />
      ))}
      <span className="sr-only">El asesor está escribiendo</span>
    </span>
  )
}
