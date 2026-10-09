'use client'

import { useEffect, useState } from 'react'

type CarouselIndex = {
  index: number
  goTo: (index: number) => void
  /** Stops autoplay while the pointer or keyboard focus is inside the carousel. */
  setPaused: (paused: boolean) => void
}

/** Current slide of an autoplaying carousel. Autoplay never runs with reduced motion. */
export function useCarouselIndex(count: number, intervalMs: number): CarouselIndex {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || count < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => setIndex(current => (current + 1) % count), intervalMs)
    return () => window.clearTimeout(timer)
  }, [index, paused, count, intervalMs])

  return { index, goTo: setIndex, setPaused }
}
