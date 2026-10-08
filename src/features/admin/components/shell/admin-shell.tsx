import { Toaster } from '@/src/components/ui/sonner'
import { TooltipProvider } from '@/src/components/ui/tooltip'
import { AdminSearchProvider } from '@/src/features/admin/components/search/admin-search-provider'
import { AdminSidebar } from '@/src/features/admin/components/shell/admin-sidebar'
import { AdminSidebarProvider } from '@/src/features/admin/components/shell/admin-sidebar-provider'
import { AdminTabBar } from '@/src/features/admin/components/shell/admin-tab-bar'
import { AdminTopbar } from '@/src/features/admin/components/shell/admin-topbar'
import type { AuthUser } from '@/src/types/api/auth'

type AdminShellProps = {
  user: AuthUser
  /** The desktop sidebar starts folded (remembered in a cookie). */
  sidebarCollapsed: boolean
  children: React.ReactNode
}

const TOAST_STYLE = {
  '--normal-bg': 'var(--frame)',
  '--normal-text': 'white',
  '--normal-border': 'var(--frame)',
  '--border-radius': 'var(--radius)',
} as React.CSSProperties

/**
 * Admin frame: dark sidebar with the page on an inset light panel (desktop); dark top bar and bottom tab bar (phones).
 * `data-admin-shell` switches on the admin theme (app/admin-theme.css) for the whole document, portals included.
 */
export function AdminShell({ user, sidebarCollapsed, children }: AdminShellProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <AdminSearchProvider>
        <AdminSidebarProvider initialCollapsed={sidebarCollapsed}>
          <div data-admin-shell className="flex min-h-dvh flex-1 bg-frame text-foreground">
            <AdminSidebar user={user} />
            {/* Padding, not margins, around the panel: margins would add to the full-height frame and always scroll. */}
            <div className="flex min-w-0 flex-1 flex-col lg:py-1 lg:pr-1">
              <AdminTopbar user={user} />
              <div className="flex flex-1 flex-col bg-canvas lg:rounded-xl">
                <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-4 pb-28 sm:px-6 lg:px-8 lg:pt-5 lg:pb-12">
                  {children}
                </main>
              </div>
            </div>
            <AdminTabBar />
            {/* On phones the toasts sit above the bottom tab bar. */}
            <Toaster position="bottom-center" mobileOffset={{ bottom: 88 }} style={TOAST_STYLE} />
          </div>
        </AdminSidebarProvider>
      </AdminSearchProvider>
    </TooltipProvider>
  )
}
