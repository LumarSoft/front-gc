'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/** Whether to label shortcuts with ⌘ (Mac) or Ctrl. The server renders ⌘; the browser corrects it after hydration. */
export function useIsMac(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => /Mac|iPhone|iPad/.test(navigator.userAgent),
    () => true,
  )
}
