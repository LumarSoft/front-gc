'use client'

import { ChartTooltip } from '@/src/features/admin/components/dashboard/chart-tooltip'
import { useChartHover } from '@/src/features/admin/hooks/use-chart-hover'
import { axisTicks } from '@/src/features/admin/lib/analytics-display'
import { chartPaths, niceMax } from '@/src/features/admin/lib/chart-scale'

type ComparisonChartProps = {
  /** What the chart shows, for screen readers and the table view ("Ventas por día"). */
  title: string
  values: number[]
  /** The previous period, point by point. */
  previous: number[]
  /** Axis label of each point ("8 oct."). */
  labels: string[]
  /** Days each point covers, in the period and in the previous one, for the readout. */
  rangeOf: (index: number) => { current: string; previous: string }
  formatValue: (value: number) => string
  /** Shorter format for the scale ("10 M ARS"); defaults to `formatValue`. */
  formatAxis?: (value: number) => string
}

const WIDTH = 600
const HEIGHT = 200

/** One line sits flat across the plot instead of collapsing into a dot. */
const drawable = (values: number[]): number[] => (values.length === 1 ? [values[0], values[0]] : values)

/**
 * The period (blue line + wash) over the previous one (gray line) on the same scale. Hover or arrow keys move a
 * crosshair with both values; a hidden table carries the same data for screen readers.
 */
export function ComparisonChart({
  title,
  values,
  previous,
  labels,
  rangeOf,
  formatValue,
  formatAxis = formatValue,
}: ComparisonChartProps) {
  const hover = useChartHover(values.length)
  const max = niceMax(Math.max(...values, ...previous, 0))
  const current = chartPaths(drawable(values), max, WIDTH, HEIGHT)
  const before = chartPaths(drawable(previous), max, WIDTH, HEIGHT)
  const left = (index: number) => (values.length > 1 ? (index / (values.length - 1)) * 100 : 50)
  const top = (value: number) => 100 - (value / max) * 100
  const active = hover.active

  return (
    <figure className="flex flex-col gap-1.5">
      <div
        role="img"
        aria-label={`${title}. Usá las flechas para recorrer el gráfico.`}
        tabIndex={0}
        onPointerMove={hover.onPointerMove}
        onPointerDown={hover.onPointerMove}
        onPointerLeave={hover.clear}
        onKeyDown={hover.onKeyDown}
        onBlur={hover.clear}
        className="relative h-52 touch-pan-y rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-60"
      >
        <span className="absolute top-0 left-0 text-xs text-muted-foreground tabular-nums">{formatAxis(max)}</span>
        <span className="absolute top-1/2 left-0 -translate-y-full text-xs text-muted-foreground tabular-nums">
          {formatAxis(max / 2)}
        </span>
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
          <path
            d={before.line}
            fill="none"
            stroke="var(--chart-comparison)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path d={current.area} fill="var(--chart-series)" fillOpacity={0.1} />
          <path
            d={current.line}
            fill="none"
            stroke="var(--chart-series)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {[...values, ...previous].every(value => value === 0) && (
          <span className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
            Sin movimiento en estos períodos.
          </span>
        )}
        {active !== null && (
          <ChartTooltip
            leftPercent={left(active)}
            points={[
              { topPercent: top(previous[active]), tone: 'comparison' },
              { topPercent: top(values[active]), tone: 'series' },
            ]}
            rows={[
              { label: rangeOf(active).current, value: formatValue(values[active]), tone: 'series' },
              { label: rangeOf(active).previous, value: formatValue(previous[active]), tone: 'comparison' },
            ]}
          />
        )}
      </div>
      <figcaption aria-hidden className="relative h-4 text-xs text-muted-foreground">
        {axisTicks(labels.length).map(index => (
          <span
            key={index}
            className="absolute whitespace-nowrap first:translate-x-0 last:-translate-x-full [&:not(:first-child):not(:last-child)]:-translate-x-1/2"
            style={{ left: `${left(index)}%` }}
          >
            {labels[index]}
          </span>
        ))}
      </figcaption>
      {/* Tables ignore sr-only's 1 px box: hide a wrapper instead, or the rows stretch the page. */}
      <div className="sr-only">
        <table>
          <caption>{title}</caption>
          <thead>
            <tr>
              <th scope="col">Período</th>
              <th scope="col">Valor</th>
              <th scope="col">Período anterior</th>
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => (
              <tr key={rangeOf(index).current}>
                <th scope="row">{rangeOf(index).current}</th>
                <td>{formatValue(value)}</td>
                <td>{formatValue(previous[index])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
