import { CmykStripe } from '@/src/components/layout/cmyk-stripe'
import { AdminSidebar } from '@/src/features/admin/components/admin-sidebar'
import { AdminTabBar } from '@/src/features/admin/components/admin-tab-bar'
import { AdminWordmark } from '@/src/features/admin/components/admin-wordmark'
import type { AuthUser } from '@/src/types/api/auth'

type AdminShellProps = {
  user: AuthUser
  children: React.ReactNode
}

/** Admin frame: sidebar on desktop; top bar + bottom tab bar on phones. */
export function AdminShell({ user, children }: AdminShellProps) {
  return (
    <div className="flex min-h-dvh flex-1 bg-surface/50">
      <AdminSidebar user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b bg-background lg:hidden">
          <CmykStripe />
          <div className="px-4 py-3">
            <AdminWordmark />
          </div>
        </header>
        <main className="flex-1 px-4 pt-6 pb-28 sm:px-6 lg:px-10 lg:pt-10 lg:pb-12">{children}</main>
      </div>
      <AdminTabBar user={user} />
    </div>
  )
}
