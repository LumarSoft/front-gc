import { ArrowDownRightIcon, ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'
import { formatChange } from '@/src/features/admin/lib/dashboard-metrics'
import { cn } from '@/src/lib/utils'

/** "+72 %" against the previous period, with an arrow so it never depends on color; a note when not comparable. */
export function MetricChange({ change }: { change: number | null }) {
  if (change === null) return <span className="text-xs text-muted-foreground">Sin comparación</span>
  const up = change > 0
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 text-xs font-medium tabular-nums',
        change === 0 ? 'text-muted-foreground' : up ? 'text-success' : 'text-destructive',
      )}
    >
      {change !== 0 && (up ? <ArrowUpRightIcon className="size-3.5" /> : <ArrowDownRightIcon className="size-3.5" />)}
      <span className="sr-only">{up ? 'Subió' : 'Bajó'} </span>
      {formatChange(change)}
    </span>
  )
}
