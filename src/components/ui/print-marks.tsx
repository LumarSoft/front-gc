import { cn } from '@/src/lib/utils'

type MarkProps = {
  className?: string
}

/** Four process-color dots (C, M, Y, K) used as bullets and separators. */
export function ProcessDots({ className }: MarkProps) {
  return (
    <span aria-hidden className={cn('inline-flex shrink-0 gap-0.5', className)}>
      <span className="size-1.5 rounded-full bg-cyan" />
      <span className="size-1.5 rounded-full bg-magenta" />
      <span className="size-1.5 rounded-full bg-yellow" />
      <span className="size-1.5 rounded-full bg-current" />
    </span>
  )
}

/** Hand-drawn style underline stroke placed under a highlighted word. */
export function InkStroke({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 300 18"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className={cn('h-3 w-full', className)}
    >
      <path d="M3 12C58 5 120 3 178 6c40 2 82 5 119 1" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}
