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
const RETURN_KEY = 'cg-order-access'
const MAX_REMEMBERED = 10

function rememberedOrders(): Record<string, string> {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(RETURN_KEY) ?? '{}')
    return value && typeof value === 'object' ? (value as Record<string, string>) : {}
  } catch {
    return {}
  }
}
/**
 * Kept before going to Mercado Pago, which sends the buyer back to `/pedidos/<number>/pago` without the token (it
 * never leaves this browser). Local storage, because the buyer may come back in another tab or from Mercado Pago's app.
 */
export function rememberOrderAccess(number: string, token: string): void {
  try {
    const entries = Object.entries(rememberedOrders()).filter(([key]) => key !== number)
    const kept = [...entries.slice(-(MAX_REMEMBERED - 1)), [number, token]]
    localStorage.setItem(RETURN_KEY, JSON.stringify(Object.fromEntries(kept)))
  } catch {
    // Without storage the buyer still has the private link of the order.
  }
}
export function rememberedOrderAccess(number: string): string | null {
  const token = rememberedOrders()[number]
  return token && TOKEN_PATTERN.test(token) ? token : null
}
export function orderPath(number: string, token: string): string {
  return `/pedidos/${number}#acceso=${token}`
}
export function fragmentOrderToken(fragment: string): string | null {
  const token = new URLSearchParams(fragment.replace(/^#/, '')).get('acceso')
  return token && TOKEN_PATTERN.test(token) ? token : null
}
