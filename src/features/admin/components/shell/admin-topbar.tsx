import { BrandMark } from '@/src/components/layout/brand-mark'
import { AdminBreadcrumbs } from '@/src/features/admin/components/shell/admin-breadcrumbs'
import { AdminUserMenu } from '@/src/features/admin/components/shell/admin-user-menu'
import type { AuthUser } from '@/src/types/api/auth'

type AdminTopbarProps = {
  user: AuthUser
}

/** Where you are (breadcrumbs) and who you are (account menu). Sticky on every screen size. */
export function AdminTopbar({ user }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <BrandMark className="size-8 p-1.5 lg:hidden" />
      <div className="min-w-0 flex-1">
        <AdminBreadcrumbs />
      </div>
      <AdminUserMenu user={user} />
    </header>
  )
}
