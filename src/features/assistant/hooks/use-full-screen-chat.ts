'use client'

import { useEffect, useSyncExternalStore, type CSSProperties } from 'react'
import { FULL_SCREEN_QUERY } from '@/src/features/assistant/lib/full-screen'

/**
 * The full-screen chat on phones: it fits the part of the screen the keyboard leaves visible, so the header stays on
 * top and the field right above the keyboard (iOS Safari and Android Chrome shrink only the visual viewport and pan
 * the page under it), and the store behind it does not scroll. Returns the chat's position, or undefined when it is
 * closed or not full screen.
 */
export function useFullScreenChat(isOpen: boolean): CSSProperties | undefined {
  const visible = useSyncExternalStore(subscribe, () => (isOpen ? visibleScreen() : ''), serverScreen)
  // Follows the screen too: turning the phone sideways makes the chat a floating window, and the page scrolls again.
  const fullScreen = visible !== ''

  useEffect(() => {
    if (!fullScreen) return
    const root = document.documentElement
    const previous = { overflow: root.style.overflow, overscrollBehavior: root.style.overscrollBehavior }
    root.style.overflow = 'hidden'
    root.style.overscrollBehavior = 'none'
    return () => {
      root.style.overflow = previous.overflow
      root.style.overscrollBehavior = previous.overscrollBehavior
    }
  }, [fullScreen])

  if (!fullScreen) return undefined
  const [top, height] = visible.split(':').map(Number)
  return { top, height, bottom: 'auto' }
}

/** "top:height" of the visible part of the screen while the chat is full screen; empty otherwise. A string, so React
 * sees the same value until it changes. */
function visibleScreen(): string {
  const viewport = window.visualViewport
  if (!viewport || !window.matchMedia(FULL_SCREEN_QUERY).matches) return ''
  return `${Math.round(viewport.offsetTop)}:${Math.round(viewport.height)}`
}

function serverScreen(): string {
  return ''
}

function subscribe(onChange: () => void): () => void {
  const viewport = window.visualViewport
  const media = window.matchMedia(FULL_SCREEN_QUERY)
  viewport?.addEventListener('resize', onChange)
  viewport?.addEventListener('scroll', onChange)
  media.addEventListener('change', onChange)
  return () => {
    viewport?.removeEventListener('resize', onChange)
    viewport?.removeEventListener('scroll', onChange)
    media.removeEventListener('change', onChange)
  }
}
