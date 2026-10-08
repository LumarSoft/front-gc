'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  type AnalyticsView,
  GROUP_BY_PARAM,
  groupByFromParam,
  VIEW_PARAM,
  viewFromParam,
} from '@/src/features/admin/lib/analytics-display'
import { argentineToday, type DayRange, isValidRange, lastRange } from '@/src/features/admin/lib/date-range'
import type { AnalyticsGroupBy } from '@/src/types/api/admin-analytics'

/**
 * The stats page's tab, period and grouping, kept in the URL (`?vista=&desde=&hasta=&por=`) so a link keeps them. Sales
 * and the last 30 days by default; without `por` the API picks days, weeks or months by the period's length.
 */
export function useAnalyticsParams() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const today = argentineToday()
  const fromUrl = { from: params.get('desde') ?? '', to: params.get('hasta') ?? '' }
  const range: DayRange = isValidRange(fromUrl, today) ? fromUrl : lastRange(today, 30, 'days', true)
  const groupBy = groupByFromParam(params.get('por'))
  const view = viewFromParam(params.get('vista'))
  const go = (next: DayRange, nextGroupBy?: AnalyticsGroupBy, nextView: AnalyticsView = view) =>
    router.replace(
      `${pathname}?${new URLSearchParams({
        ...(nextView === 'sales' ? {} : { vista: VIEW_PARAM[nextView] }),
        desde: next.from,
        hasta: next.to,
        ...(nextGroupBy ? { por: GROUP_BY_PARAM[nextGroupBy] } : {}),
      })}`,
      { scroll: false },
    )

  return {
    view,
    range,
    groupBy,
    /** Another tab keeps the period and the grouping. */
    setView: (next: AnalyticsView) => go(range, groupBy, next),
    /** A new period goes back to the automatic grouping: days for a year would be too many points. */
    setRange: (next: DayRange) => go(next),
    setGroupBy: (next: AnalyticsGroupBy) => go(range, next),
  }
}
