'use client'

import { useEffect, useRef } from 'react'

/** Distance from the bottom, in px, still treated as "reading the latest message". */
const NEAR_BOTTOM = 96

/**
 * Keeps a scrolling container at its bottom while new content arrives, unless the customer scrolled up to read
 * something earlier. `content` changes when there is something new to show; a new `latestQuestion` (the customer
 * just asked) always brings the bottom back into view.
 */
export function useFollowScroll<T extends HTMLElement>(content: unknown, latestQuestion: string | undefined) {
  const container = useRef<T>(null)
  const following = useRef(true)

  useEffect(() => {
    following.current = true
  }, [latestQuestion])

  useEffect(() => {
    const element = container.current
    if (element && following.current) element.scrollTop = element.scrollHeight
  }, [content])

  return {
    container,
    onScroll: (): void => {
      const element = container.current
      if (element) following.current = element.scrollHeight - element.scrollTop - element.clientHeight < NEAR_BOTTOM
    },
  }
}
