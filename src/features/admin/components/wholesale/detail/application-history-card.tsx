import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { Timeline, type TimelineEvent } from '@/src/features/admin/components/common/timeline'
import { WHOLESALE_DECISION_EVENT } from '@/src/features/admin/lib/wholesale-display'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { AdminWholesaleApplication } from '@/src/types/api/wholesale'

/** When it was sent and the latest decision (the API keeps the last one; every change is in the audit log). */
export function ApplicationHistoryCard({ application }: { application: AdminWholesaleApplication }) {
  const { status, reviewedAt, reviewedBy, reviewNote } = application
  const events: TimelineEvent[] = [
    {
      key: 'sent',
      title: 'Solicitud enviada',
      at: formatOrderDate(application.createdAt),
      by: application.submittedBy.name,
    },
  ]
  if (reviewedAt && status !== 'PENDING')
    events.unshift({
      key: 'decision',
      title: WHOLESALE_DECISION_EVENT[status],
      at: formatOrderDate(reviewedAt),
      by: reviewedBy?.name,
      note: reviewNote,
    })

  return (
    <AdminCard title="Historial">
      <Timeline events={events} />
    </AdminCard>
  )
}
