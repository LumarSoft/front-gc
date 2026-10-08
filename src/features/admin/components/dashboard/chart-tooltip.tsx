import { cn } from '@/src/lib/utils'

type ChartTooltipProps = {
  /** Position of the hovered point inside the plot, in percent from the left and from the top. */
  leftPercent: number
  topPercent: number
  label: string
  value: string
}

/** Crosshair, point marker and readout for the hovered day. The readout flips sides near the edges. */
export function ChartTooltip({ leftPercent, topPercent, label, value }: ChartTooltipProps) {
  const align = leftPercent > 70 ? '-translate-x-full -ml-3' : leftPercent < 30 ? 'ml-3' : '-translate-x-1/2'

  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-px bg-foreground/25"
        style={{ left: `${leftPercent}%` }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-series ring-2 ring-card"
        style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
      />
      <span
        role="status"
        className={cn(
          'pointer-events-none absolute top-1 z-10 flex flex-col rounded-lg bg-frame-raised px-2.5 py-1.5 text-xs whitespace-nowrap text-white shadow-lg',
          align,
        )}
        style={{ left: `${leftPercent}%` }}
      >
        <span className="text-frame-muted">{label}</span>
        <span className="font-semibold tabular-nums">{value}</span>
      </span>
    </>
  )
}
