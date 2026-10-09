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
