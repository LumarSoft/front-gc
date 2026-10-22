'use client'

import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'
import { isStaff } from '@/src/features/auth/lib/roles'
import { trackingAllowed, visitorId } from '@/src/features/activity/lib/visitor'
import { recordActivity } from '@/src/services/activity.service'
import type { ActivityEvent } from '@/src/types/api/activity'

/**
 * Reports what an anonymous visitor did, for the admin stats. `ready` is false until the session is known, because
 * staff (admins and developers) browsing the store are not counted.
 */
export function useTrackActivity() {
  const session = useCurrentUser()
  const ready = !session.isPending
  return {
    ready,
    track: (event: ActivityEvent): void => {
      if (!ready || isStaff(session.data?.role) || !trackingAllowed()) return
      recordActivity({ ...event, visitorId: visitorId() })
    },
  }
}
