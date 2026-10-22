import type { UserRole } from '@/src/types/api/auth'

/** Who enters the admin panel: the store's staff and the developers. */
export const isStaff = (role: UserRole | undefined): boolean => role === 'ADMIN' || role === 'DEVELOPER'

/** The team that builds the store: also sees the developer-only sections of the panel (the AI assistant). */
export const isDeveloper = (role: UserRole | undefined): boolean => role === 'DEVELOPER'
