'use client'

import { useEffect, useEffectEvent } from 'react'

/** ⌘B (Mac) / Ctrl+B toggles the sidebar, like Shopify's admin; ignored while typing in a field. */
export function useSidebarShortcut(toggle: () => void): void {
  const onToggle = useEffectEvent(toggle)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'b' || !(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return
      event.preventDefault()
      onToggle()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
