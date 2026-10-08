import { MetricChange } from '@/src/features/admin/components/dashboard/metric-change'
import { Sparkline } from '@/src/features/admin/components/dashboard/sparkline'

type MetricItemProps = {
  label: string
  value: string
  change: number | null
  /** Daily values for the trend line; omit when a per-day trend does not apply. */
  trend?: number[]
}

/** One headline of the top strip: label, value with its trend, change against the previous period. */
export function MetricItem({ label, value, change, trend }: MetricItemProps) {
  return (
    <div className="flex min-w-0 shrink-0 flex-col gap-0.5 px-2.5 first:pl-0 sm:px-5 sm:first:pl-5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-sm font-semibold tabular-nums sm:text-base">{value}</span>
        {/* Phones: the three numbers fit side by side without the trend lines. */}
        {trend && <Sparkline values={trend} className="h-5 w-14 max-sm:hidden" />}
      </span>
      <MetricChange change={change} />
    </div>
  )
}
