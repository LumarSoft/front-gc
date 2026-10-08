'use client'

import { ChartTooltip } from '@/src/features/admin/components/dashboard/chart-tooltip'
import { useChartHover } from '@/src/features/admin/hooks/use-chart-hover'
import { chartPaths, niceMax } from '@/src/features/admin/lib/chart-scale'

type AreaChartProps = {
  /** What the chart shows, for screen readers and the table view ("Ventas por día"). */
  title: string
  values: number[]
  /** One label per value ("8 oct."). */
  labels: string[]
  formatValue: (value: number) => string
  /** Shorter format for the scale label ("10 M ARS"); defaults to `formatValue`. */
  formatAxis?: (value: number) => string
}

const WIDTH = 600
const HEIGHT = 160

/**
 * Single-series area chart: 2 px line, 10 % wash, hairline grid. Hover or arrow keys move a crosshair that snaps to
 * the nearest day, with a tooltip; a hidden table carries the same data for screen readers.
 */
export function AreaChart({ title, values, labels, formatValue, formatAxis = formatValue }: AreaChartProps) {
  const hover = useChartHover(values.length)
  const max = niceMax(Math.max(...values, 0))
  const { line, area } = chartPaths(values, max, WIDTH, HEIGHT)
  const active = hover.active
  const left = (index: number) => (values.length > 1 ? (index / (values.length - 1)) * 100 : 0)

  return (
    <figure className="flex flex-col gap-1.5">
      <div
        role="img"
        aria-label={`${title}. Usá las flechas para recorrer los días.`}
        tabIndex={0}
        onPointerMove={hover.onPointerMove}
        onPointerLeave={hover.clear}
        onKeyDown={hover.onKeyDown}
        onBlur={hover.clear}
        className="relative h-44 touch-pan-y rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="absolute top-0 left-0 text-xs text-muted-foreground tabular-nums">{formatAxis(max)}</span>
        <svg
          aria-hidden
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          {[0, HEIGHT / 2, HEIGHT].map(y => (
            <line
              key={y}
              x1={0}
              x2={WIDTH}
              y1={y}
              y2={y}
              stroke="var(--chart-grid)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path d={area} fill="var(--chart-series)" fillOpacity={0.1} />
          <path
            d={line}
            fill="none"
            stroke="var(--chart-series)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {active !== null && (
          <ChartTooltip
            leftPercent={left(active)}
            topPercent={100 - (values[active] / max) * 100}
            label={labels[active]}
            value={formatValue(values[active])}
          />
        )}
      </div>
      <figcaption className="flex justify-between text-xs text-muted-foreground">
        <span>{labels[0]}</span>
        <span>{labels[labels.length - 1]}</span>
      </figcaption>
      {/* Tables ignore sr-only's 1 px box: hide a wrapper instead, or the rows stretch the page. */}
      <div className="sr-only">
        <table>
          <caption>{title}</caption>
          <tbody>
            {values.map((value, index) => (
              <tr key={labels[index]}>
                <th scope="row">{labels[index]}</th>
                <td>{formatValue(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
