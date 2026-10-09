'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

type ScrollRail = {
  ref: RefObject<HTMLUListElement | null>
  canScrollBack: boolean
  canScrollForward: boolean
  /** Scrolls one visible width back (-1) or forward (1). */
  scrollPage: (direction: -1 | 1) => void
}

/** Horizontal list scrolled by arrow buttons; tracks whether there is more content on each side. */
export function useScrollRail(): ScrollRail {
  const ref = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ back: false, forward: false })

  useEffect(() => {
    const list = ref.current
    if (!list) return
    const update = (): void => {
      // 1 px of tolerance: browsers report fractional scroll positions.
      setEdges({
        back: list.scrollLeft > 1,
        forward: list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
      })
    }
    update()
    list.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(list)
    return () => {
      list.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  const scrollPage = (direction: -1 | 1): void => {
    const list = ref.current
    if (!list) return
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    list.scrollBy({ left: direction * list.clientWidth, behavior })
  }

  return { ref, canScrollBack: edges.back, canScrollForward: edges.forward, scrollPage }
}
