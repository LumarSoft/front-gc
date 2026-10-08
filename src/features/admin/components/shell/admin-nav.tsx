'use client'

import { usePathname } from 'next/navigation'
import { AdminNavEntry } from '@/src/features/admin/components/shell/admin-nav-entry'
import { useAdminNavBadges } from '@/src/features/admin/hooks/use-admin-nav-badges'
import { useAdminSidebar } from '@/src/features/admin/hooks/use-admin-sidebar'
import { ADMIN_NAV } from '@/src/features/admin/lib/admin-nav'
import { cn } from '@/src/lib/utils'

/** Section links on the dark frame, used by the desktop sidebar and the phone menu sheet. */
export function AdminNav({ inSheet = false }: { inSheet?: boolean }) {
  const pathname = usePathname()
  const badges = useAdminNavBadges()
  const rail = useAdminSidebar().collapsed && !inSheet

  return (
    // The icon rail spaces its icons out (40 px apart): without labels, tight icons blur together.
    <nav
      aria-label="Secciones del panel"
      className={cn(
        'flex flex-col transition-[gap] duration-200 ease-out-quart motion-reduce:transition-none',
        rail ? 'gap-2' : 'gap-0.5',
      )}
    >
      {ADMIN_NAV.map(item => (
        <AdminNavEntry
          key={item.href}
          item={item}
          pathname={pathname}
          count={item.badge && badges[item.badge]}
          inSheet={inSheet}
        />
      ))}
    </nav>
  )
}
