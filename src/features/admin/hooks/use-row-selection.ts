'use client'

import { useState } from 'react'

/**
 * Rows ticked on the current page. A new page, filter or search (`resetKey`) starts empty, so an action never
 * reaches rows the admin can no longer see.
 */
export function useRowSelection(pageIds: number[], resetKey: string) {
  const [selected, setSelected] = useState<Set<number>>(() => new Set())

  // React's "adjust state on prop change": the list behind the selection changed.
  const [previousKey, setPreviousKey] = useState(resetKey)
  if (resetKey !== previousKey) {
    setPreviousKey(resetKey)
    setSelected(new Set())
  }

  const visible = pageIds.filter(id => selected.has(id))
  const all = pageIds.length > 0 && visible.length === pageIds.length

  return {
    selectedIds: visible,
    isSelected: (id: number): boolean => selected.has(id),
    /** For the header box: everything, nothing or some. */
    pageState: (all ? true : visible.length > 0 ? 'indeterminate' : false) as boolean | 'indeterminate',
    toggle: (id: number, checked: boolean): void =>
      setSelected(current => {
        const next = new Set(current)
        if (checked) next.add(id)
        else next.delete(id)
        return next
      }),
    togglePage: (checked: boolean): void => setSelected(checked ? new Set(pageIds) : new Set()),
    clear: (): void => setSelected(new Set()),
  }
}

export type RowSelection = ReturnType<typeof useRowSelection>
