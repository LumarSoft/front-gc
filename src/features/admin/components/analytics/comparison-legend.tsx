import { formatRange } from '@/src/features/admin/lib/date-range'
import { cn } from '@/src/lib/utils'
import type { AdminAnalytics } from '@/src/types/api/admin-analytics'

/** Which line is which: the period in blue, the previous one in gray. */
export function ComparisonLegend({ period, className }: { period: AdminAnalytics['period']; className?: string }) {
  const items = [
    { swatch: 'bg-chart-series', label: formatRange({ from: period.from, to: period.to }) },
    { swatch: 'bg-chart-comparison', label: formatRange({ from: period.previousFrom, to: period.previousTo }) },
  ]
  return (
    <ul className={cn('flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground', className)}>
      {items.map(item => (
        <li key={item.swatch} className="flex items-center gap-1.5">
          <span aria-hidden className={cn('h-0.5 w-3 rounded-full', item.swatch)} />
          {item.label}
        </li>
      ))}
    </ul>
  )
}
