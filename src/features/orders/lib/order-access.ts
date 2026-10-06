const PENDING_KEY = 'cg-pending-order'
const TOKEN_PATTERN = /^[a-f0-9]{64}$/

/** Persist before POST so a lost response/reload can retry the same checkout without duplicating it. */
export function pendingOrderToken(): string {
  const existing = sessionStorage.getItem(PENDING_KEY)
  if (existing && TOKEN_PATTERN.test(existing)) return existing
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, '0')).join(
    '',
  )
  sessionStorage.setItem(PENDING_KEY, token)
  return token
}
export function finishPendingOrder(): void {
  sessionStorage.removeItem(PENDING_KEY)
}
export function storedPendingOrderToken(): string | null {
  const token = sessionStorage.getItem(PENDING_KEY)
  return token && TOKEN_PATTERN.test(token) ? token : null
}
export function orderPath(number: string, token: string): string {
  return `/pedidos/${number}#acceso=${token}`
}
export function fragmentOrderToken(fragment: string): string | null {
  const token = new URLSearchParams(fragment.replace(/^#/, '')).get('acceso')
  return token && TOKEN_PATTERN.test(token) ? token : null
}
