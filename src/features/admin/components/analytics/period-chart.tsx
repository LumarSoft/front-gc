'use client'

import { ComparisonChart } from '@/src/features/admin/components/analytics/comparison-chart'
import { ComparisonLegend } from '@/src/features/admin/components/analytics/comparison-legend'
import {
  bucketLabel,
  bucketRange,
  hasPartialEnds,
  previousBucketRange,
} from '@/src/features/admin/lib/analytics-display'
import type { AdminAnalytics, Compared } from '@/src/types/api/admin-analytics'

type PeriodChartProps = {
  /** What the chart shows, for screen readers ("Ventas del período y del anterior"). */
  title: string
  period: AdminAnalytics['period']
  buckets: AdminAnalytics['buckets']
  series: Compared<number[]>
  formatValue: (value: number) => string
  formatAxis?: (value: number) => string
}

/** A metric point by point over the previous period, with the legend and a note when an end point is partial. */
export function PeriodChart({ title, period, buckets, series, formatValue, formatAxis }: PeriodChartProps) {
  return (
    <>
      <ComparisonChart
        title={title}
        values={series.current}
        previous={series.previous}
        labels={buckets.map(bucket => bucketLabel(bucket, period.groupBy))}
        rangeOf={index => ({ current: bucketRange(buckets[index]), previous: previousBucketRange(buckets[index]) })}
        formatValue={formatValue}
        formatAxis={formatAxis}
      />
      <ComparisonLegend period={period} className="mt-3" />
      {hasPartialEnds(buckets, period.groupBy) && (
        <p className="mt-2 text-xs text-muted-foreground">
          Un punto de los extremos cubre solo una parte {period.groupBy === 'week' ? 'de la semana' : 'del mes'}: tocalo
          o pasá el mouse para ver qué días incluye.
        </p>
      )}
    </>
  )
}
