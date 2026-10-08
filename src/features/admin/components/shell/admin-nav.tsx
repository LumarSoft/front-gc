'use client'

import { usePathname } from 'next/navigation'
import { AdminNavEntry } from '@/src/features/admin/components/shell/admin-nav-entry'
import { ADMIN_NAV } from '@/src/features/admin/lib/admin-nav'

/** Section links on the dark frame, used by the desktop sidebar and the phone menu sheet. */
export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Secciones del panel" className="flex flex-col gap-0.5">
      {ADMIN_NAV.map(item => (
        <AdminNavEntry key={item.href} item={item} pathname={pathname} />
      ))}
    </nav>
  )
}
