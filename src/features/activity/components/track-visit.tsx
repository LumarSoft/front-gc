'use client'

import { TrackActivity } from '@/src/features/activity/components/track-activity'
import { firstVisitOfSession } from '@/src/features/activity/lib/visitor'

/** Reports a visit on the first store page of each browser tab session. */
export function TrackVisit() {
  return <TrackActivity event={{ type: 'VISIT' }} when={firstVisitOfSession} />
}
