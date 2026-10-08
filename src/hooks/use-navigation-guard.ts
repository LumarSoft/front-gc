'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Navigate = () => void

/** The page currently holding unsaved changes, if any; it decides whether a navigation goes ahead. */
let activeGuard: ((navigate: Navigate) => void) | null = null

/** Navigations made in code (e.g. the ⌘K palette's router.push) go through here so a page with changes can ask first. */
export function navigateWithGuard(navigate: Navigate): void {
  if (activeGuard) activeGuard(navigate)
  else navigate()
}

/** Same-origin link the click would follow inside the app, or null when the browser should handle it as usual. */
function internalLinkTarget(event: MouseEvent): string | null {
  if (event.defaultPrevented || event.button !== 0) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null
  if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download')) return null
  if (link.target && link.target !== '_self') return null
  const url = new URL(link.href)
  if (url.origin !== window.location.origin) return null
  // Jumping to an anchor on the same page does not leave it.
  if (url.pathname === window.location.pathname && url.search === window.location.search) return null
  return `${url.pathname}${url.search}${url.hash}`
}

/**
 * While `dirty`, following an internal link or a guarded navigation waits for the user: `pending` opens a dialog,
 * `confirm` leaves (dropping the changes) and `cancel` stays. Reload and close are covered by useUnsavedChangesWarning.
 */
export function useNavigationGuard(dirty: boolean) {
  const router = useRouter()
  const [pending, setPending] = useState<Navigate | null>(null)

  useEffect(() => {
    if (!dirty) return
    const ask = (navigate: Navigate): void => setPending(() => navigate)
    const onClick = (event: MouseEvent): void => {
      const href = internalLinkTarget(event)
      if (!href) return
      // Capture phase on document: runs before next/link's handler, which never sees the click.
      event.preventDefault()
      event.stopPropagation()
      ask(() => router.push(href))
    }
    document.addEventListener('click', onClick, true)
    activeGuard = ask
    return () => {
      document.removeEventListener('click', onClick, true)
      if (activeGuard === ask) activeGuard = null
    }
  }, [dirty, router])

  return {
    pending: pending !== null,
    confirm: (): void => {
      pending?.()
      setPending(null)
    },
    cancel: (): void => setPending(null),
  }
}
