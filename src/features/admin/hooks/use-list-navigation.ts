'use client'

import { useState } from 'react'

/** Arrow keys move through a list of `count` options and Enter picks the highlighted one. */
export function useListNavigation(count: number, onPick: (index: number) => void, resetKey: string) {
  const [active, setActive] = useState(0)

  // A new search starts at the first result. (React's "adjust state on prop change".)
  const [previousKey, setPreviousKey] = useState(resetKey)
  if (resetKey !== previousKey) {
    setPreviousKey(resetKey)
    setActive(0)
  }
  const current = Math.min(active, Math.max(count - 1, 0))

  const onKeyDown = (event: React.KeyboardEvent): void => {
    if (count === 0) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActive((current + step + count) % count)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      onPick(current)
    }
  }

  return { active: current, setActive, onKeyDown }
}
