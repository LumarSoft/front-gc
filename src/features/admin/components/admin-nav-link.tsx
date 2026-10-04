'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type AdminNavItem, isNavItemActive } from '@/src/features/admin/lib/admin-nav'
import { cn } from '@/src/lib/utils'

type AdminNavLinkProps = {
  item: AdminNavItem
  /** `rail`: desktop sidebar row. `tab`: mobile bottom bar cell. */
  layout: 'rail' | 'tab'
}

export function AdminNavLink({ item, layout }: AdminNavLinkProps) {
  const pathname = usePathname()
  const active = isNavItemActive(item, pathname)
  const Icon = item.icon

  if (layout === 'tab') {
    return (
      <Link
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex flex-1 flex-col items-center gap-1 pt-2 pb-1.5 text-xs font-medium text-muted-foreground transition-colors',
          active && 'text-primary',
        )}
      >
        <Icon weight={active ? 'fill' : 'light'} className="size-6" />
        {item.label}
      </Link>
    )
  }

  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        active && 'border-primary bg-accent/60 font-semibold text-foreground',
      )}
    >
      <Icon weight={active ? 'fill' : 'light'} className="size-5" />
      {item.label}
    </Link>
  )
}
