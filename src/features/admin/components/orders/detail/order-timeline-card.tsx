import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { HISTORY_LABELS } from '@/src/features/admin/lib/order-display'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import { cn } from '@/src/lib/utils'
import type { Order } from '@/src/types/api/orders'

/** Every state change, newest first, with who did it and their note. */
export function OrderTimelineCard({ history }: { history: Order['history'] }) {
  const events = [...history].reverse()

  return (
    <AdminCard title="Historial">
      <ol className="relative flex flex-col gap-4">
        {events.map((event, index) => (
          <li key={`${event.status}-${event.at}`} className="relative flex gap-3">
            {index < events.length - 1 && (
              <span aria-hidden className="absolute top-4 -bottom-4 left-1.5 w-px -translate-x-1/2 bg-border" />
            )}
            <span
              aria-hidden
              className={cn(
                'mt-1 size-3 shrink-0 rounded-full border-2 border-card ring-1',
                index === 0 ? 'bg-foreground ring-foreground' : 'bg-muted-foreground/40 ring-border',
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="text-sm font-medium">{HISTORY_LABELS[event.status]}</p>
                <p className="text-xs text-muted-foreground">{formatOrderDate(event.at)}</p>
              </div>
              {event.by && <p className="text-xs text-muted-foreground">por {event.by}</p>}
              {event.note && <p className="mt-1.5 rounded-lg bg-muted px-3 py-2 text-sm">{event.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </AdminCard>
  )
}
