'use client'

import type { UseQueryResult } from '@tanstack/react-query'
import { Card } from '@/src/components/ui/card'
import { AnalyticsSkeleton } from '@/src/features/admin/components/analytics/analytics-skeleton'
import { AnalyticsToolbar } from '@/src/features/admin/components/analytics/analytics-toolbar'
import { DateRangePicker } from '@/src/features/admin/components/date-range/date-range-picker'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import type { useAnalyticsParams } from '@/src/features/admin/hooks/use-analytics-params'
import { cn } from '@/src/lib/utils'
import type { AdminAnalytics } from '@/src/types/api/admin-analytics'

export type AnalyticsParams = ReturnType<typeof useAnalyticsParams>

type AnalyticsPanelProps<T extends { period: AdminAnalytics['period'] }> = {
  params: AnalyticsParams
  query: UseQueryResult<T>
  errorMessage: string
  children: (data: T) => React.ReactNode
}

/** Period controls plus one tab's report: skeleton first, the old numbers faded while another period loads. */
export function AnalyticsPanel<T extends { period: AdminAnalytics['period'] }>({
  params,
  query,
  errorMessage,
  children,
}: AnalyticsPanelProps<T>) {
  const { data, isPending, isError, isPlaceholderData, refetch } = query

  return (
    <>
      {data ? (
        <AnalyticsToolbar
          range={params.range}
          onRangeChange={params.setRange}
          groupBy={data.period.groupBy}
          onGroupByChange={params.setGroupBy}
          period={data.period}
        />
      ) : (
        <DateRangePicker value={params.range} onChange={params.setRange} />
      )}
      <div className="mt-4">
        {isPending ? (
          <AnalyticsSkeleton />
        ) : isError || !data ? (
          <Card className="py-0">
            <QueryErrorState message={errorMessage} onRetry={() => void refetch()} />
          </Card>
        ) : (
          // While another period loads, the current one fades instead of jumping to a skeleton.
          <div className={cn('transition-opacity duration-200', isPlaceholderData && 'opacity-50')}>
            {children(data)}
          </div>
        )}
      </div>
    </>
  )
}
