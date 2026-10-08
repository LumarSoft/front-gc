import { cn } from '@/src/lib/utils'

export type ChartTone = 'series' | 'comparison'

type ChartTooltipProps = {
  /** Position of the hovered point inside the plot, in percent from the left. */
  leftPercent: number
  /** One marker per series on the crosshair, in percent from the top. */
  points: { topPercent: number; tone: ChartTone }[]
  /** Readout lines: what the point is and its value, with the series swatch when there are several. */
  rows: { label: string; value: string; tone?: ChartTone }[]
}

const toneClass: Record<ChartTone, string> = { series: 'bg-chart-series', comparison: 'bg-chart-comparison' }

/** Crosshair, point markers and readout for the hovered point. The readout flips sides near the edges. */
export function ChartTooltip({ leftPercent, points, rows }: ChartTooltipProps) {
  const align = leftPercent > 70 ? '-translate-x-full -ml-3' : leftPercent < 30 ? 'ml-3' : '-translate-x-1/2'
  // A point near the top would hide under the readout: the readout moves to the bottom then.
  const high = points.some(point => point.topPercent < 40)

  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-px bg-foreground/25"
        style={{ left: `${leftPercent}%` }}
      />
      {points.map(point => (
        <span
          key={point.tone}
          aria-hidden
          className={cn(
            'pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card',
            toneClass[point.tone],
          )}
          style={{ left: `${leftPercent}%`, top: `${point.topPercent}%` }}
        />
      ))}
      <span
        role="status"
        className={cn(
          'pointer-events-none absolute z-10 flex flex-col gap-1 rounded-lg bg-frame-raised px-2.5 py-1.5 text-xs whitespace-nowrap text-white shadow-lg',
          align,
          high ? 'bottom-1' : 'top-1',
        )}
        style={{ left: `${leftPercent}%` }}
      >
        {rows.map(row => (
          <span key={row.label} className="flex flex-col">
            <span className="flex items-center gap-1.5 text-frame-muted">
              {row.tone && <span aria-hidden className={cn('h-0.5 w-2.5 rounded-full', toneClass[row.tone])} />}
              {row.label}
            </span>
            <span className="font-semibold tabular-nums">{row.value}</span>
          </span>
        ))}
      </span>
    </>
  )
}
