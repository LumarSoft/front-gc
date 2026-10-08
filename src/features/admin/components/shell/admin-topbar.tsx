import { AdminAccountMenu } from '@/src/features/admin/components/shell/admin-account-menu'
import { AdminBrand } from '@/src/features/admin/components/shell/admin-brand'
import { AdminSearchTrigger } from '@/src/features/admin/components/search/admin-search-trigger'
import type { AuthUser } from '@/src/types/api/auth'

/** Phone and tablet header on the dark frame (below lg): store, search and account. */
export function AdminTopbar({ user }: { user: AuthUser }) {
  return (
    <header className="sticky top-0 z-30 flex h-13 items-center gap-2 bg-frame px-3 lg:hidden">
      <div className="min-w-0 flex-1">
        <AdminBrand />
      </div>
      <AdminSearchTrigger compact />
      <AdminAccountMenu user={user} variant="compact" />
    </header>
  )
}
