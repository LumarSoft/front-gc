'use client'

import { useState } from 'react'

/** The record waiting for the "¿Archivar?" confirmation, if any. */
export function useArchiveConfirm<TItem>() {
  const [target, setTarget] = useState<TItem | null>(null)
  return { target, ask: (item: TItem) => setTarget(item), dismiss: () => setTarget(null) }
}
