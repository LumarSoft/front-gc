'use client'

import { AdminNavLink } from '@/src/features/admin/components/admin-nav-link'
import { ADMIN_NAV } from '@/src/features/admin/lib/admin-nav'

type AdminNavListProps = {
  layout: 'rail' | 'tab'
}

/** Client side on purpose: nav items carry icon components, which cannot be passed from a Server Component. */
export function AdminNavList({ layout }: AdminNavListProps) {
  return ADMIN_NAV.map(item => <AdminNavLink key={item.href} item={item} layout={layout} />)
}
