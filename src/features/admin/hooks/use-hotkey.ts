'use client'

import { useEffect, useRef } from 'react'

/** Runs `onPress` on ⌘ + key (Mac) or Ctrl + key (Windows/Linux), anywhere on the page. */
export function useHotkey(key: string, onPress: () => void): void {
  const handler = useRef(onPress)
  useEffect(() => {
    handler.current = onPress
  })

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key) {
        event.preventDefault()
        handler.current()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [key])
}
