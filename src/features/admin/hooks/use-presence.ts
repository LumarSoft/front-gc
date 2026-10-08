'use client'

import { useEffect, useState } from 'react'

/** How long exit animations last (keep in sync with the `duration-200` of the elements that use this hook). */
export const EXIT_MS = 200

/**
 * Keeps an element mounted while it animates out. `state` drives `data-[state=open|closed]` enter/exit classes;
 * `mounted` turns false once the exit finished.
 */
export function usePresence(show: boolean, exitMs = EXIT_MS) {
  // Whether it was open at the last commit. Updated from an effect: a render-time update here can be dropped when
  // React restarts a render, which unmounted the element at once instead of letting it animate out.
  const [wasShown, setWasShown] = useState(show)

  useEffect(() => {
    if (show) {
      // Next frame is enough: while `show` is true the element is mounted anyway.
      const frame = requestAnimationFrame(() => setWasShown(true))
      return () => cancelAnimationFrame(frame)
    }
    const timer = setTimeout(() => setWasShown(false), exitMs)
    return () => clearTimeout(timer)
  }, [show, exitMs])

  return { mounted: show || wasShown, state: show ? ('open' as const) : ('closed' as const) }
}
