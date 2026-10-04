import { CmykStripe } from '@/src/components/layout/cmyk-stripe'
import { AdminNavList } from '@/src/features/admin/components/admin-nav-list'
import { AdminUserBlock } from '@/src/features/admin/components/admin-user-block'
import { AdminWordmark } from '@/src/features/admin/components/admin-wordmark'
import type { AuthUser } from '@/src/types/api/auth'

type AdminSidebarProps = {
  user: AuthUser
}

/** Desktop navigation (lg and up). On phones the bottom tab bar takes its place. */
export function AdminSidebar({ user }: AdminSidebarProps) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r bg-background lg:flex">
      <CmykStripe />
      <div className="px-5 pt-6 pb-8">
        <AdminWordmark layout="stacked" />
      </div>
      <nav aria-label="Secciones del panel" className="flex flex-1 flex-col gap-1 px-3">
        <AdminNavList layout="rail" />
      </nav>
      <div className="border-t px-3 py-4">
        <AdminUserBlock user={user} />
      </div>
    </aside>
  )
}
