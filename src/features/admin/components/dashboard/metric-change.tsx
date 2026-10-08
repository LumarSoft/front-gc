import { ArrowDownRightIcon, ArrowUpRightIcon } from 'lucide-react'
import { formatChange } from '@/src/features/admin/lib/dashboard-metrics'
import { cn } from '@/src/lib/utils'

type MetricChangeProps = {
  change: number | null
  /** Whether going up is good news ("up", default), bad news (time to pay, cancellations) or neither. */
  good?: 'up' | 'down' | 'neither'
  /** "pp" when the value is itself a percentage (a share going from 70 % to 77 % is "+7 pp"). */
  unit?: '%' | 'pp'
  /** Shown when there is nothing to compare with ("Nuevo" for something that did not sell before). */
  empty?: string
}

/** "+72 %" against the previous period, with an arrow so it never depends on color; a note when not comparable. */
export function MetricChange({ change, good = 'up', unit = '%', empty = 'Sin comparación' }: MetricChangeProps) {
  if (change === null) return <span className="text-xs whitespace-nowrap text-muted-foreground">{empty}</span>
  const up = change > 0
  const better = good === 'neither' ? null : up === (good === 'up')
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 text-xs font-medium tabular-nums',
        change === 0 || better === null ? 'text-muted-foreground' : better ? 'text-success' : 'text-destructive',
      )}
    >
      {change !== 0 && (up ? <ArrowUpRightIcon className="size-3.5" /> : <ArrowDownRightIcon className="size-3.5" />)}
      <span className="sr-only">{up ? 'Subió' : 'Bajó'} </span>
      {formatChange(change, unit)}
    </span>
  )
}
