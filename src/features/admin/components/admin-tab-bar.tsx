import { AdminAccountSheet } from '@/src/features/admin/components/admin-account-sheet'
import { AdminNavList } from '@/src/features/admin/components/admin-nav-list'
import type { AuthUser } from '@/src/types/api/auth'

type AdminTabBarProps = {
  user: AuthUser
}

/** Phone navigation: fixed to the bottom, within thumb reach. Hidden from lg up (sidebar). */
export function AdminTabBar({ user }: AdminTabBarProps) {
  return (
    <nav
      aria-label="Secciones del panel"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-background/95 pb-safe backdrop-blur lg:hidden"
    >
      <AdminNavList layout="tab" />
      <AdminAccountSheet user={user} />
    </nav>
  )
}
