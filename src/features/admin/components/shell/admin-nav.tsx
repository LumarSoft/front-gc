'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ADMIN_NAV, isNavItemActive } from '@/src/features/admin/lib/admin-nav'
import { cn } from '@/src/lib/utils'

/** Grouped section links, used by the desktop sidebar and the phone menu sheet. */
export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Secciones del panel" className="flex flex-col gap-5">
      {ADMIN_NAV.map(group => (
        <div key={group.label ?? 'main'} className="flex flex-col gap-0.5">
          {group.label && <p className="px-2.5 pb-1 text-xs font-medium text-muted-foreground">{group.label}</p>}
          {group.items.map(item => {
            const active = isNavItemActive(item, pathname)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                  active && 'bg-muted font-medium text-foreground',
                )}
              >
                <Icon weight={active ? 'fill' : 'regular'} className="size-4.5 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
