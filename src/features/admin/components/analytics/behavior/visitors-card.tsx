import { PeriodChart } from '@/src/features/admin/components/analytics/period-chart'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { GROUP_BY_LABEL, pluralize } from '@/src/features/admin/lib/analytics-display'
import type { AdminBehavior } from '@/src/types/api/admin-behavior'

/** Unique visitors point by point, over the same stretch of the previous period. */
export function VisitorsCard({ behavior }: { behavior: AdminBehavior }) {
  const { period, buckets, visitors } = behavior
  return (
    <AdminCard title={`Visitantes por ${GROUP_BY_LABEL[period.groupBy].toLowerCase()}`}>
      <PeriodChart
        title="Visitantes del período y del anterior"
        period={period}
        buckets={buckets}
        series={visitors.series}
        formatValue={value => pluralize(value, 'visitante', 'visitantes')}
        formatAxis={value => String(Math.round(value))}
      />
    </AdminCard>
  )
}
