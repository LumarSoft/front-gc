import { AdminAccountMenu } from '@/src/features/admin/components/shell/admin-account-menu'
import { AdminBrand } from '@/src/features/admin/components/shell/admin-brand'
import { AdminNav } from '@/src/features/admin/components/shell/admin-nav'
import { AdminSearchTrigger } from '@/src/features/admin/components/search/admin-search-trigger'
import { StoreLink } from '@/src/features/admin/components/shell/store-link'
import type { AuthUser } from '@/src/types/api/auth'

/** Desktop navigation (lg and up), on the dark frame: store, search, sections, and the account at the bottom. */
export function AdminSidebar({ user }: { user: AuthUser }) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-55 shrink-0 flex-col bg-frame lg:flex">
      <div className="flex flex-col gap-3 px-2.5 pt-3 pb-3">
        <AdminBrand />
        <AdminSearchTrigger />
      </div>
      <div className="flex-1 overflow-y-auto px-2.5">
        <AdminNav />
      </div>
      <div className="flex flex-col gap-1 p-2.5">
        <StoreLink />
        <AdminAccountMenu user={user} />
      </div>
    </aside>
  )
}
