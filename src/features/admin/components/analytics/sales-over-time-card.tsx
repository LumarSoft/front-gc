'use client'

import { useState } from 'react'
import { ComparisonChart } from '@/src/features/admin/components/analytics/comparison-chart'
import { ComparisonLegend } from '@/src/features/admin/components/analytics/comparison-legend'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { SegmentedControl } from '@/src/features/admin/components/common/segmented-control'
import {
  bucketLabel,
  bucketRange,
  GROUP_BY_LABEL,
  hasPartialEnds,
  pluralize,
  previousBucketRange,
} from '@/src/features/admin/lib/analytics-display'
import { formatHeadlineMoney } from '@/src/features/admin/lib/dashboard-metrics'
import { formatMoneyExact } from '@/src/lib/format'
import type { AdminAnalytics } from '@/src/types/api/admin-analytics'

type Metric = 'sales' | 'orders'

const METRICS: { value: Metric; label: string }[] = [
  { value: 'sales', label: 'Ventas' },
  { value: 'orders', label: 'Pedidos' },
]

/** Sales (or paid orders) point by point, over the same stretch of the previous period. */
export function SalesOverTimeCard({ analytics }: { analytics: AdminAnalytics }) {
  const [metric, setMetric] = useState<Metric>('sales')
  const { buckets, period, sales, orders } = analytics
  const currency = sales.current.currency
  const series =
    metric === 'sales'
      ? { current: sales.series.current.map(Number), previous: sales.series.previous.map(Number) }
      : orders.series
  const formatValue =
    metric === 'sales'
      ? (value: number) => formatMoneyExact({ amount: value.toFixed(2), currency })
      : (value: number) => pluralize(value, 'pedido', 'pedidos')
  const formatAxis =
    metric === 'sales'
      ? (value: number) => formatHeadlineMoney({ amount: value.toFixed(2), currency })
      : (value: number) => String(Math.round(value))

  return (
    <AdminCard
      title={`${metric === 'sales' ? 'Ventas' : 'Pedidos pagados'} por ${GROUP_BY_LABEL[period.groupBy].toLowerCase()}`}
      aside={<SegmentedControl label="Qué mostrar" options={METRICS} value={metric} onChange={setMetric} />}
    >
      <ComparisonChart
        title={`${metric === 'sales' ? 'Ventas' : 'Pedidos pagados'} del período y del anterior`}
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
    </AdminCard>
  )
}
