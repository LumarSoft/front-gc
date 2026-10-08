'use client'

import { useEffect, useRef } from 'react'
import { useTrackActivity } from '@/src/features/activity/hooks/use-track-activity'
import type { ActivityEvent } from '@/src/types/api/activity'

type TrackActivityProps = {
  event: ActivityEvent
  /** Extra condition checked once, right before reporting (e.g. only the first page of a session). */
  when?: () => boolean
}

/** Reports an event once when it mounts (a product page, a search, the checkout), as soon as the session is known. */
export function TrackActivity({ event, when }: TrackActivityProps) {
  const { ready, track } = useTrackActivity()
  const key = JSON.stringify(event)
  const sent = useRef<string | null>(null)

  useEffect(() => {
    if (!ready || sent.current === key) return
    sent.current = key
    if (!when || when()) track(event)
    // `key` stands for `event`; `track` and `when` are recreated every render and must not re-trigger the report.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, key])

  return null
}
