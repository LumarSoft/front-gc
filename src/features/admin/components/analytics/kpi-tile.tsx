import { MetricChange } from '@/src/features/admin/components/dashboard/metric-change'
import { Sparkline } from '@/src/features/admin/components/dashboard/sparkline'

type KpiTileProps = {
  label: string
  value: string
  change: number | null
  /** "pp" when the value is a percentage. */
  changeUnit?: '%' | 'pp'
  /** Whether a rise is good news (default) or bad news (abandoned carts). */
  good?: 'up' | 'down'
  /** What the number counts, in a line under it. */
  hint: string
  /** Values per chart point, for a small trend line. */
  trend?: number[]
}

/** One headline number of the period with its change against the previous one. */
export function KpiTile({ label, value, change, changeUnit, good, hint, trend }: KpiTileProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1 p-4">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="flex items-center justify-between gap-2">
        <span className="truncate text-xl font-semibold tracking-tight">{value}</span>
        {trend && trend.length > 1 && <Sparkline values={trend} className="h-6 w-16 shrink-0 max-sm:hidden" />}
      </span>
      <span className="flex flex-wrap items-center gap-x-1.5 text-xs text-muted-foreground">
        <MetricChange change={change} unit={changeUnit} good={good} />
        <span>{hint}</span>
      </span>
    </div>
  )
}
