'use client'

import { useEffect, useRef } from 'react'

export function useCheckoutReviewFocus() {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
    heading.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
  }, [])
  return heading
}
