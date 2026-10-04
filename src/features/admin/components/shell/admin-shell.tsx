import { Toaster } from '@/src/components/ui/sonner'
import { AdminSidebar } from '@/src/features/admin/components/shell/admin-sidebar'
import { AdminTabBar } from '@/src/features/admin/components/shell/admin-tab-bar'
import { AdminTopbar } from '@/src/features/admin/components/shell/admin-topbar'
import type { AuthUser } from '@/src/types/api/auth'

type AdminShellProps = {
  user: AuthUser
  children: React.ReactNode
}

/** Admin frame: sidebar on desktop, bottom tab bar on phones, top bar everywhere. Toasts confirm every change. */
export function AdminShell({ user, children }: AdminShellProps) {
  return (
    <div className="flex min-h-dvh flex-1 bg-muted">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar user={user} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-28 sm:px-6 lg:px-8 lg:pt-8 lg:pb-12">
          {children}
        </main>
      </div>
      <AdminTabBar />
      {/* On phones the toasts sit above the bottom tab bar. */}
      <Toaster position="bottom-right" mobileOffset={{ bottom: 88 }} />
    </div>
  )
}
