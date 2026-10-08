'use client'

import { usePathname } from 'next/navigation'
import { AdminNavEntry } from '@/src/features/admin/components/shell/admin-nav-entry'
import { ADMIN_SETTINGS_NAV } from '@/src/features/admin/lib/admin-nav'

/** "Configuración" at the bottom of the navigation, unfolding its sub-pages while inside them. */
export function AdminSettingsLink() {
  return <AdminNavEntry item={ADMIN_SETTINGS_NAV} pathname={usePathname()} />
}
