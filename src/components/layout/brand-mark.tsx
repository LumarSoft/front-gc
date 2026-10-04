import { cn } from '@/src/lib/utils'

type BrandMarkProps = {
  className?: string
  inverted?: boolean
}

/** The four process-color dots of the Comunicaciones Gráficas logo. */
export function BrandMark({ className, inverted = false }: BrandMarkProps) {
  return (
    <span
      aria-hidden
      className={cn('grid size-9 shrink-0 grid-cols-2 gap-0.5 rounded-lg p-1.5 ring-1 ring-current/10', className)}
    >
      <span className="rounded-full bg-cyan" />
      <span className="rounded-full bg-magenta" />
      <span className="rounded-full bg-yellow" />
      <span className={cn('rounded-full', inverted ? 'bg-white' : 'bg-foreground')} />
    </span>
  )
}
