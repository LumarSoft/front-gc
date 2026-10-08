'use client'

import { Card } from '@/src/components/ui/card'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { AnalyticsReport } from '@/src/features/admin/components/analytics/analytics-report'
import { AnalyticsSkeleton } from '@/src/features/admin/components/analytics/analytics-skeleton'
import { AnalyticsToolbar } from '@/src/features/admin/components/analytics/analytics-toolbar'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { DateRangePicker } from '@/src/features/admin/components/date-range/date-range-picker'
import { useAdminAnalytics } from '@/src/features/admin/hooks/use-admin-analytics'
import { useAnalyticsParams } from '@/src/features/admin/hooks/use-analytics-params'
import { cn } from '@/src/lib/utils'

/** "Estadísticas": how the store sold in a period, against the previous one. */
export function AnalyticsView() {
  const { range, groupBy, setRange, setGroupBy } = useAnalyticsParams()
  const { data, isPending, isError, isPlaceholderData, refetch } = useAdminAnalytics({ ...range, groupBy })

  return (
    <div className="mx-auto flex max-w-6xl flex-col">
      <AdminPageHeader
        title="Estadísticas"
        description="Cómo vendió la tienda en el período elegido, comparado con el anterior de la misma duración."
      />
      {data ? (
        <AnalyticsToolbar
          range={range}
          onRangeChange={setRange}
          groupBy={data.period.groupBy}
          onGroupByChange={setGroupBy}
          period={data.period}
        />
      ) : (
        <DateRangePicker value={range} onChange={setRange} />
      )}
      <div className="mt-4">
        {isPending ? (
          <AnalyticsSkeleton />
        ) : isError || !data ? (
          <Card className="py-0">
            <QueryErrorState message="No pudimos cargar las estadísticas." onRetry={() => void refetch()} />
          </Card>
        ) : (
          // While another period loads, the current one fades instead of jumping to a skeleton.
          <div className={cn('transition-opacity duration-200', isPlaceholderData && 'opacity-50')}>
            <AnalyticsReport analytics={data} />
          </div>
        )}
      </div>
    </div>
  )
}
