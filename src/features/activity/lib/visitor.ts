const VISITOR_KEY = 'cg_visitor'
const VISIT_KEY = 'cg_visit_sent'

/** In-memory fallback when storage is blocked (private mode, disabled site data): one id per page load. */
let fallbackId: string | null = null

/**
 * The anonymous id of this browser: a random UUID kept in localStorage, never linked to an account. Agreed with the
 * client on 2026-10-08 (api-gc business-rules.md → Activity tracking).
 */
export function visitorId(): string {
  try {
    const stored = localStorage.getItem(VISITOR_KEY)
    if (stored) return stored
    const id = crypto.randomUUID()
    localStorage.setItem(VISITOR_KEY, id)
    return id
  } catch {
    fallbackId ??= crypto.randomUUID()
    return fallbackId
  }
}

/** Browsers that ask not to be tracked (Global Privacy Control, Do Not Track) are left out. */
export function trackingAllowed(): boolean {
  const browser = navigator as Navigator & { globalPrivacyControl?: boolean }
  return browser.globalPrivacyControl !== true && navigator.doNotTrack !== '1'
}

/** True only the first time it is asked in this tab session: a visit is reported once per session. */
export function firstVisitOfSession(): boolean {
  try {
    if (sessionStorage.getItem(VISIT_KEY)) return false
    sessionStorage.setItem(VISIT_KEY, '1')
    return true
  } catch {
    return true
  }
}
