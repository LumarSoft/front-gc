'use client'

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from 'react'

type DirtyRegistry = { report: (id: string, dirty: boolean) => void }

/** Lets a container (e.g. the variant panel) know whether any section inside has unsaved changes. */
export const DirtySectionsContext = createContext<DirtyRegistry | null>(null)

/** Owner side: the registry to provide and whether anything inside is dirty. */
export function useDirtySections() {
  const [dirtyIds, setDirtyIds] = useState<string[]>([])
  // Stable callback and registry: sections report from effects, so a new object per render would loop.
  const report = useCallback((id: string, dirty: boolean) => {
    setDirtyIds(current => {
      if (dirty) return current.includes(id) ? current : [...current, id]
      return current.includes(id) ? current.filter(item => item !== id) : current
    })
  }, [])
  const registry = useMemo(() => ({ report }), [report])
  return { registry, anyDirty: dirtyIds.length > 0 }
}

/** Section side: reports its dirty state to the nearest registry, if any. */
export function useReportDirty(dirty: boolean): void {
  const registry = useContext(DirtySectionsContext)
  const id = useId()
  useEffect(() => {
    registry?.report(id, dirty)
    return () => registry?.report(id, false)
  }, [registry, id, dirty])
}
