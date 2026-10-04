import type { Icon } from '@phosphor-icons/react'
import { HouseLineIcon } from '@phosphor-icons/react'

export type AdminNavItem = {
  label: string
  href: string
  icon: Icon
  /** Only the exact path is active (for the home); otherwise any sub-path also is. */
  exact?: boolean
}

/** Admin sections. Each admin PR adds its section here when its page exists. */
export const ADMIN_NAV: AdminNavItem[] = [{ label: 'Inicio', href: '/admin', icon: HouseLineIcon, exact: true }]

export function isNavItemActive(item: AdminNavItem, pathname: string): boolean {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`)
}
