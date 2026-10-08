'use client'

import { usePathname } from 'next/navigation'
import { AdminNavEntry } from '@/src/features/admin/components/shell/admin-nav-entry'
import { useAdminNavBadges } from '@/src/features/admin/hooks/use-admin-nav-badges'
import { ADMIN_NAV } from '@/src/features/admin/lib/admin-nav'

/** Section links on the dark frame, used by the desktop sidebar and the phone menu sheet. */
export function AdminNav() {
  const pathname = usePathname()
  const badges = useAdminNavBadges()

  return (
    <nav aria-label="Secciones del panel" className="flex flex-col gap-0.5">
      {ADMIN_NAV.map(item => (
        <AdminNavEntry key={item.href} item={item} pathname={pathname} count={item.badge && badges[item.badge]} />
      ))}
    </nav>
  )
}
