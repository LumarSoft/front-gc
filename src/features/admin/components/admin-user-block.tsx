import Link from 'next/link'
import { StorefrontIcon } from '@phosphor-icons/react/dist/ssr'
import { AdminLogoutButton } from '@/src/features/admin/components/admin-logout-button'
import type { AuthUser } from '@/src/types/api/auth'

type AdminUserBlockProps = {
  user: AuthUser
}

/** Who is signed in, plus the way back to the store and out of the panel. */
export function AdminUserBlock({ user }: AdminUserBlockProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="px-3 pb-2">
        <p className="truncate text-sm font-semibold">
          {user.firstName} {user.lastName}
        </p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>
      <Link
        href="/"
        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <StorefrontIcon weight="light" className="size-5" />
        Ver la tienda
      </Link>
      <AdminLogoutButton />
    </div>
  )
}
