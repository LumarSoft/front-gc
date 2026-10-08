'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { argentineToday, type DayRange, isValidRange, lastRange } from '@/src/features/admin/lib/date-range'

/** The home's period, kept in the URL (`?desde=&hasta=`) so a link keeps it; the last 30 days by default. */
export function useDashboardRange() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const today = argentineToday()
  const fromUrl = { from: params.get('desde') ?? '', to: params.get('hasta') ?? '' }
  const range: DayRange = isValidRange(fromUrl, today) ? fromUrl : lastRange(today, 30, 'days', true)

  return {
    range,
    setRange: (next: DayRange) =>
      router.replace(`${pathname}?${new URLSearchParams({ desde: next.from, hasta: next.to })}`, { scroll: false }),
  }
}
