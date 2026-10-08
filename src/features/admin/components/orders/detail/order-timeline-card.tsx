import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { Timeline } from '@/src/features/admin/components/common/timeline'
import { HISTORY_LABELS } from '@/src/features/admin/lib/order-display'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { Order } from '@/src/types/api/orders'

/** Every state change, newest first, with who did it and their note. */
export function OrderTimelineCard({ history }: { history: Order['history'] }) {
  const events = [...history].reverse().map(event => ({
    key: `${event.status}-${event.at}`,
    title: HISTORY_LABELS[event.status],
    at: formatOrderDate(event.at),
    by: event.by,
    note: event.note,
  }))

  return (
    <AdminCard title="Historial">
      <Timeline events={events} />
    </AdminCard>
  )
}
