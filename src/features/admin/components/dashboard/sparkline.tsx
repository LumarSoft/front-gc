import { chartPoints, smoothPath } from '@/src/features/admin/lib/chart-scale'

type SparklineProps = {
  values: number[]
  className?: string
}

/** Tiny trend line next to a headline number. Decorative: the number and its change carry the information. */
export function Sparkline({ values, className }: SparklineProps) {
  // 2 px of room top and bottom so the 1.5 px stroke is never clipped.
  const line = smoothPath(chartPoints(values, Math.max(...values, 1), 100, 26).map(([x, y]) => [x, y + 2] as const))

  return (
    <svg aria-hidden viewBox="0 0 100 30" preserveAspectRatio="none" className={className}>
      <path
        d={line}
        fill="none"
        stroke="var(--chart-series)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
