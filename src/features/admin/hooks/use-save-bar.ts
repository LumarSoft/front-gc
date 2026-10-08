'use client'

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

/** Sends one section's frozen changes; rejects when the request fails (its error toast is already shown). */
export type SaveCommit = () => Promise<unknown>

/** What a page section offers to the save bar. */
export type SaveSection = {
  dirty: boolean
  /**
   * Checks the section and freezes what it will send: a commit when it can be saved, false when a field is wrong
   * (marked in red), or a sentence saying why it cannot be saved yet (e.g. photos still uploading).
   */
  prepare: () => Promise<SaveCommit | string | false>
  discard: () => void
}

type SaveBarRegistry = {
  register: (id: string, section: SaveSection) => void
  unregister: (id: string) => void
}

export const SaveBarContext = createContext<SaveBarRegistry | null>(null)

/**
 * Page side: one Save and one Discard for every section with changes. Saving prepares every dirty section first, so
 * nothing is sent while any field is wrong, and freezes their contents: each save refreshes the product, which resets
 * the other sections to the stored values, so they must not be read again mid-way. Then it sends them in page order
 * and confirms once.
 */
export function useSaveBar(successMessage: string) {
  const sections = useRef(new Map<string, SaveSection>())
  const [dirtyIds, setDirtyIds] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  const register = useCallback((id: string, section: SaveSection) => {
    sections.current.set(id, section)
    setDirtyIds(current => {
      const listed = current.includes(id)
      if (section.dirty === listed) return current
      return section.dirty ? [...current, id] : current.filter(item => item !== id)
    })
  }, [])
  const unregister = useCallback((id: string) => {
    sections.current.delete(id)
    setDirtyIds(current => (current.includes(id) ? current.filter(item => item !== id) : current))
  }, [])
  const registry = useMemo(() => ({ register, unregister }), [register, unregister])

  const dirtySections = (): SaveSection[] => [...sections.current.values()].filter(section => section.dirty)

  const save = async (): Promise<void> => {
    const pending = dirtySections()
    if (pending.length === 0 || saving) return
    const prepared = await Promise.all(pending.map(section => section.prepare()))
    const reason = prepared.find((result): result is string => typeof result === 'string')
    const commits = prepared.filter((result): result is SaveCommit => typeof result === 'function')
    if (commits.length < prepared.length) {
      toast.error(reason ?? 'Revisá los campos marcados en rojo antes de guardar.')
      return
    }
    setSaving(true)
    try {
      for (const commit of commits) await commit()
      toast.success(successMessage)
    } catch {
      // The failing request already showed why; the sections that did not save keep their changes.
    } finally {
      setSaving(false)
    }
  }

  return {
    registry,
    dirty: dirtyIds.length > 0,
    saving,
    save,
    discard: () => dirtySections().forEach(section => section.discard()),
  }
}

/** Section side: keeps the save bar up to date with this section's state and actions. */
export function useSaveSection(section: SaveSection): void {
  const registry = useContext(SaveBarContext)
  const id = useId()
  // Re-registered after every render so the bar always calls the latest save/discard.
  useEffect(() => {
    registry?.register(id, section)
  })
  useEffect(() => () => registry?.unregister(id), [registry, id])
}
