'use client'

import { SegmentedControl } from '@/src/features/admin/components/common/segmented-control'
import { DateRangePicker } from '@/src/features/admin/components/date-range/date-range-picker'
import { GROUP_BY_LABEL } from '@/src/features/admin/lib/analytics-display'
import { type DayRange, formatRange } from '@/src/features/admin/lib/date-range'
import type { AdminAnalytics, AnalyticsGroupBy } from '@/src/types/api/admin-analytics'

const GROUP_BY_OPTIONS = (Object.keys(GROUP_BY_LABEL) as AnalyticsGroupBy[]).map(value => ({
  value,
  label: GROUP_BY_LABEL[value],
}))

type AnalyticsToolbarProps = {
  range: DayRange
  onRangeChange: (range: DayRange) => void
  /** The grouping the API used (the chosen one, or its default for the period's length). */
  groupBy: AnalyticsGroupBy
  onGroupByChange: (groupBy: AnalyticsGroupBy) => void
  period: AdminAnalytics['period']
}

/** Period, grouping of the charts and which period every number is compared with. */
export function AnalyticsToolbar({ range, onRangeChange, groupBy, onGroupByChange, period }: AnalyticsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <DateRangePicker value={range} onChange={onRangeChange} />
      <SegmentedControl label="Agrupar por" options={GROUP_BY_OPTIONS} value={groupBy} onChange={onGroupByChange} />
      <span className="text-xs text-muted-foreground">
        Comparado con {formatRange({ from: period.previousFrom, to: period.previousTo })}
      </span>
    </div>
  )
}
