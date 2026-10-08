import { MetricChange } from '@/src/features/admin/components/dashboard/metric-change'
import { cn } from '@/src/lib/utils'

export type BarListRow = {
  key: string
  label: React.ReactNode
  /** Bar length, relative to the biggest row. */
  value: number
  /** The value as shown at the end of the row ("12,4 M ARS"). */
  display: string
  /** Secondary detail under the label ("14 pedidos"). */
  detail?: string
  /** Against the previous period (null = it did not sell before: "Nuevo"); omitted = no change column. */
  change?: number | null
}

type BarListProps = {
  rows: BarListRow[]
  /** Shown instead of the list when there are no rows. */
  empty: string
  className?: string
}

/**
 * Ranked rows with a thin bar under each label (one hue: the bars only compare sizes). Values are written on every
 * row, so the list reads as a table too.
 */
export function BarList({ rows, empty, className }: BarListProps) {
  if (rows.length === 0) return <p className="py-6 text-center text-sm text-muted-foreground">{empty}</p>
  const max = Math.max(...rows.map(row => row.value), 0)

  return (
    <ul className={cn('flex flex-col gap-3', className)}>
      {rows.map(row => (
        <li key={row.key} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate">{row.label}</span>
            <span className="flex shrink-0 items-baseline gap-2">
              <span className="font-medium tabular-nums">{row.display}</span>
              {row.change !== undefined && <MetricChange change={row.change} empty="Nuevo" />}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-chart-track">
            <div
              className="h-full rounded-full bg-chart-series"
              style={{ width: `${max > 0 ? Math.max((row.value / max) * 100, row.value > 0 ? 1 : 0) : 0}%` }}
            />
          </div>
          {row.detail && <span className="text-xs text-muted-foreground">{row.detail}</span>}
        </li>
      ))}
    </ul>
  )
}
