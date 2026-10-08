import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import { WHOLESALE_STATUS_BADGE } from '@/src/features/admin/lib/wholesale-display'
import type { AdminWholesaleApplication } from '@/src/types/api/wholesale'

/** The application's status, and "Reemplazada" when the company sent a newer one (only that one accepts decisions). */
export function WholesaleStatusBadges({ application }: { application: AdminWholesaleApplication }) {
  const badge = WHOLESALE_STATUS_BADGE[application.status]
  return (
    <>
      <ToneBadge tone={badge.tone}>{badge.label}</ToneBadge>
      {!application.latest && (
        <ToneBadge tone="neutral" dot={false}>
          Reemplazada
        </ToneBadge>
      )}
    </>
  )
}
