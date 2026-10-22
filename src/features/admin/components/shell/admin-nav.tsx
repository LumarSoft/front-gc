'use client'

import { usePathname } from 'next/navigation'
import { AdminNavEntry } from '@/src/features/admin/components/shell/admin-nav-entry'
import { useAdminNavBadges } from '@/src/features/admin/hooks/use-admin-nav-badges'
import { useIsDeveloper } from '@/src/features/admin/hooks/use-admin-role'
import { useAdminSidebar } from '@/src/features/admin/hooks/use-admin-sidebar'
import { ADMIN_NAV, DEVELOPER_NAV, type AdminNavItem } from '@/src/features/admin/lib/admin-nav'
import { cn } from '@/src/lib/utils'

/**
 * Section links on the dark frame, used by the desktop sidebar and the phone menu sheet. Developers also get the
 * developer-only sections, under their own heading.
 */
export function AdminNav({ inSheet = false }: { inSheet?: boolean }) {
  const pathname = usePathname()
  const badges = useAdminNavBadges()
  const rail = useAdminSidebar().collapsed && !inSheet
  const developer = useIsDeveloper()
  const entry = (item: AdminNavItem) => (
    <AdminNavEntry
      key={item.href}
      item={item}
      pathname={pathname}
      count={item.badge && badges[item.badge]}
      inSheet={inSheet}
    />
  )

  return (
    // The icon rail spaces its icons out (40 px apart): without labels, tight icons blur together.
    <nav
      aria-label="Secciones del panel"
      className={cn(
        'flex flex-col transition-[gap] duration-200 ease-out-quart motion-reduce:transition-none',
        rail ? 'gap-2' : 'gap-0.5',
      )}
    >
      {ADMIN_NAV.map(entry)}
      {developer && (
        <>
          {/* On the icon rail the heading would not fit: a rule marks where the developer sections start. */}
          {rail ? (
            <span aria-hidden className="mx-2 h-px bg-white/12" />
          ) : (
            <p className="px-2 pt-4 pb-1 text-xs font-medium text-frame-foreground/60">Desarrollo</p>
          )}
          {DEVELOPER_NAV.map(entry)}
        </>
      )}
    </nav>
  )
}
