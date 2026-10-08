import type { UserRole } from '@/src/types/api/auth'

/** Only same-site paths are allowed after login, so a crafted link cannot send the user to another site. */
export function getSafeRedirect(target: string | undefined | null, fallback = '/'): string {
  if (!target || !target.startsWith('/') || target.startsWith('//') || target.startsWith('/\\')) return fallback
  return target
}

/** Where the panel starts. */
export const ADMIN_HOME = '/admin'

/**
 * Where to land after logging in: admins go straight to the panel (or the panel page they were sent from), never to
 * the store everyone sees; customers go where they were heading.
 */
export function afterLoginPath(role: UserRole, redirectTo: string): string {
  if (role !== 'ADMIN') return redirectTo
  return redirectTo === ADMIN_HOME || redirectTo.startsWith(`${ADMIN_HOME}/`) || redirectTo.startsWith(`${ADMIN_HOME}?`)
    ? redirectTo
    : ADMIN_HOME
}
