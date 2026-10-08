'use client'

import { AdminSearchTrigger } from '@/src/features/admin/components/search/admin-search-trigger'
import { AdminAccountMenu } from '@/src/features/admin/components/shell/admin-account-menu'
import { AdminNav } from '@/src/features/admin/components/shell/admin-nav'
import { AdminSettingsLink } from '@/src/features/admin/components/shell/admin-settings-link'
import { AdminSidebarHeader } from '@/src/features/admin/components/shell/admin-sidebar-header'
import { StoreLink } from '@/src/features/admin/components/shell/store-link'
import { useAdminSidebar } from '@/src/features/admin/hooks/use-admin-sidebar'
import { cn } from '@/src/lib/utils'
import type { AuthUser } from '@/src/types/api/auth'

/**
 * Desktop navigation (lg and up), on the dark frame: store, search, sections, and the account at the bottom. Folds to
 * a 56 px icon rail (⌘B); icons stay put while the width animates, labels fade and get clipped.
 */
export function AdminSidebar({ user }: { user: AuthUser }) {
  const { collapsed } = useAdminSidebar()

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        'sticky top-0 hidden h-dvh shrink-0 flex-col overflow-x-hidden bg-frame transition-[width] duration-200 ease-out-quart motion-reduce:transition-none lg:flex',
        collapsed ? 'w-14' : 'w-55',
      )}
    >
      <div className={cn('flex flex-col px-2.5 pt-3', collapsed ? 'gap-4 pb-4' : 'gap-3 pb-3')}>
        <AdminSidebarHeader />
        {collapsed ? <AdminSearchTrigger compact tooltip /> : <AdminSearchTrigger />}
      </div>
      <div className="flex-1 overflow-y-auto px-2.5">
        <AdminNav />
      </div>
      <div className={cn('flex flex-col p-2.5', collapsed ? 'gap-2' : 'gap-1')}>
        <AdminSettingsLink />
        <StoreLink collapsed={collapsed} />
        <AdminAccountMenu user={user} variant={collapsed ? 'rail' : 'sidebar'} />
      </div>
    </aside>
  )
}
