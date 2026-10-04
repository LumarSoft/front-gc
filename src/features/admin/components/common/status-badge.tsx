import { cn } from '@/src/lib/utils'

type StatusBadgeProps = {
  active: boolean
  activeLabel?: string
  inactiveLabel?: string
}

/** Dot + word, so the state does not depend on color alone. */
export function StatusBadge({ active, activeLabel = 'Activa', inactiveLabel = 'Inactiva' }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
        active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground',
      )}
    >
      <span aria-hidden className={cn('size-1.5 rounded-full', active ? 'bg-success' : 'bg-muted-foreground/60')} />
      {active ? activeLabel : inactiveLabel}
    </span>
  )
}
