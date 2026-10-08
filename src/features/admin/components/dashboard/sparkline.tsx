type SparklineProps = {
  values: number[]
  className?: string
}

/** Tiny trend line next to a headline number. Decorative: the number and its change carry the information. */
export function Sparkline({ values, className }: SparklineProps) {
  const max = Math.max(...values, 1)
  const step = values.length > 1 ? 100 / (values.length - 1) : 0
  const points = values.map((value, index) => `${index * step},${28 - (value / max) * 26}`).join(' ')

  return (
    <svg aria-hidden viewBox="0 0 100 30" preserveAspectRatio="none" className={className}>
      <polyline
        points={points}
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
