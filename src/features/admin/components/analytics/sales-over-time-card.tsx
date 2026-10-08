'use client'

import { useState } from 'react'
import { PeriodChart } from '@/src/features/admin/components/analytics/period-chart'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { SegmentedControl } from '@/src/features/admin/components/common/segmented-control'
import { GROUP_BY_LABEL, pluralize } from '@/src/features/admin/lib/analytics-display'
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
      <PeriodChart
        title={`${metric === 'sales' ? 'Ventas' : 'Pedidos pagados'} del período y del anterior`}
        period={period}
        buckets={buckets}
        series={series}
        formatValue={formatValue}
        formatAxis={formatAxis}
      />
    </AdminCard>
  )
}
