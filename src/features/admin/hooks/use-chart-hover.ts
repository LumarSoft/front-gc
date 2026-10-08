'use client'

import { useState } from 'react'

/**
 * The data point under the pointer (snapped to the nearest X) or picked with the arrow keys; null when none.
 */
export function useChartHover(count: number) {
  const [active, setActive] = useState<number | null>(null)
  const last = count - 1

  return {
    active,
    onPointerMove: (event: React.PointerEvent<HTMLElement>): void => {
      const rect = event.currentTarget.getBoundingClientRect()
      const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1)
      setActive(Math.round(ratio * last))
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>): void => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      const step = event.key === 'ArrowRight' ? 1 : -1
      setActive(current => Math.min(Math.max((current ?? (step > 0 ? -1 : count)) + step, 0), last))
    },
    clear: (): void => setActive(null),
  }
}
