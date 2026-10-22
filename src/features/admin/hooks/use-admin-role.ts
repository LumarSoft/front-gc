'use client'

import { createContext, useContext } from 'react'
import type { UserRole } from '@/src/types/api/auth'

/** The signed-in staff member's role, set once by the admin shell. */
export const AdminRoleContext = createContext<UserRole>('ADMIN')

/** Developers also see the developer-only sections (navigation, search, counters). */
export function useIsDeveloper(): boolean {
  return useContext(AdminRoleContext) === 'DEVELOPER'
}
