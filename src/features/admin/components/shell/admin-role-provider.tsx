'use client'

import { AdminRoleContext } from '@/src/features/admin/hooks/use-admin-role'
import type { UserRole } from '@/src/types/api/auth'

/** Gives the panel's client components the role of who is signed in (the layout read it on the server). */
export function AdminRoleProvider({ role, children }: { role: UserRole; children: React.ReactNode }) {
  return <AdminRoleContext value={role}>{children}</AdminRoleContext>
}
