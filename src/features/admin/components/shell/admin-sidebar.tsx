import { AdminBrand } from '@/src/features/admin/components/shell/admin-brand'
import { AdminNav } from '@/src/features/admin/components/shell/admin-nav'
import { StoreLink } from '@/src/features/admin/components/shell/store-link'

/** Desktop navigation (lg and up). Phones use the top bar menu and the bottom tab bar. */
export function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r bg-background lg:flex">
      <div className="flex h-14 items-center border-b px-4">
        <AdminBrand />
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <AdminNav />
      </div>
      <div className="border-t p-3">
        <StoreLink />
      </div>
    </aside>
  )
}
