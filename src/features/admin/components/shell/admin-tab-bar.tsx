'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AdminMobileMenu } from '@/src/features/admin/components/shell/admin-mobile-menu'
import { isNavSectionActive, PINNED_NAV_ITEMS } from '@/src/features/admin/lib/admin-nav'
import { cn } from '@/src/lib/utils'

/** Phone navigation within thumb reach: pinned sections plus "Menú" with everything else. Hidden from lg up. */
export function AdminTabBar() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Accesos rápidos"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-background/95 pb-safe backdrop-blur lg:hidden"
    >
      {PINNED_NAV_ITEMS.map(item => {
        const active = isNavSectionActive(item, pathname)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex flex-1 flex-col items-center gap-0.5 pt-2 pb-1.5 text-xs font-medium text-muted-foreground transition-colors',
              active && 'text-foreground',
            )}
          >
            <Icon weight={active ? 'fill' : 'regular'} className="size-5.5" />
            {item.label}
          </Link>
        )
      })}
      <AdminMobileMenu />
    </nav>
  )
}
