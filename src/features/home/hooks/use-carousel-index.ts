'use client'

import { useEffect, useState } from 'react'

type CarouselIndex = {
  index: number
  /** Shows a slide chosen by the visitor; autoplay stops for good after that. */
  goTo: (index: number) => void
  /** Stops autoplay while the pointer or keyboard focus is inside the carousel. */
  setPaused: (paused: boolean) => void
}

/** Current slide of an autoplaying carousel. Autoplay never runs with reduced motion. */
export function useCarouselIndex(count: number, intervalMs: number): CarouselIndex {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [stopped, setStopped] = useState(false)

  useEffect(() => {
    if (paused || stopped || count < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => setIndex(current => (current + 1) % count), intervalMs)
    return () => window.clearTimeout(timer)
  }, [index, paused, stopped, count, intervalMs])

  const goTo = (next: number): void => {
    setIndex(next)
    setStopped(true)
  }

  return { index, goTo, setPaused }
}
