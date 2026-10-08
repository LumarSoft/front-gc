'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/**
 * False on the server and while hydrating, true afterwards. For values that only the browser has at hydration time,
 * e.g. a query another component already loaded while this one waited behind a Suspense boundary.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
