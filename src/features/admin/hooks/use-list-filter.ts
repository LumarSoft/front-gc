'use client'

import { useState } from 'react'

/** View and search of a short list filtered in the browser (taxonomy). Reordering is off while either is set. */
export function useListFilter<V>() {
  const [view, setView] = useState<V | undefined>(undefined)
  const [term, setTerm] = useState('')
  return {
    view,
    setView,
    term,
    setTerm,
    filtered: view !== undefined || term.trim() !== '',
    clear: () => {
      setView(undefined)
      setTerm('')
    },
  }
}
