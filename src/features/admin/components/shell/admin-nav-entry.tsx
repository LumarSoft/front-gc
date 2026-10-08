'use client'

import Link from 'next/link'
import { AdminTooltip } from '@/src/features/admin/components/common/admin-tooltip'
import { AdminNavFlyout } from '@/src/features/admin/components/shell/admin-nav-flyout'
import { NavCount } from '@/src/features/admin/components/shell/nav-count'
import { useAdminSidebar } from '@/src/features/admin/hooks/use-admin-sidebar'
import { isNavLinkActive, isNavSectionActive, type AdminNavItem } from '@/src/features/admin/lib/admin-nav'
import { cn } from '@/src/lib/utils'

type AdminNavEntryProps = {
  item: AdminNavItem
  pathname: string
  /** Waiting work in this section (e.g. orders to process). */
  count?: number
  /** In the phone menu sheet the sidebar's folded state does not apply. */
  inSheet?: boolean
}

const LINK =
  'flex items-center rounded-lg text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'

/**
 * One section: its link and, while the admin is inside it, its sub-sections unfolding underneath. On the folded
 * sidebar only the icon shows (the counter on its corner): a tooltip names it, or a flyout lists its sub-pages.
 */
export function AdminNavEntry({ item, pathname, count, inSheet = false }: AdminNavEntryProps) {
  const collapsed = useAdminSidebar().collapsed && !inSheet
  const open = isNavSectionActive(item, pathname)
  const current = isNavLinkActive(item, pathname)
  const Icon = item.icon

  const link = (
    <Link
      href={item.href}
      aria-current={current ? 'page' : undefined}
      className={cn(
        LINK,
        'relative h-8 gap-2 px-2 font-medium whitespace-nowrap text-frame-foreground hover:bg-frame-hover hover:text-white',
        current && 'bg-frame-accent text-white',
        open && 'text-white',
        collapsed && open && 'bg-frame-accent',
      )}
    >
      <Icon strokeWidth={open ? 2.5 : 2} className="size-4.5 shrink-0" />
      <span className={cn('truncate transition-opacity duration-150', collapsed && 'opacity-0')}>{item.label}</span>
      <NavCount
        count={count}
        className={cn(
          'bg-white/12 text-white',
          collapsed ? 'absolute -top-1 left-4 h-4 min-w-4 bg-frame-accent px-1 ring-2 ring-frame' : 'ml-auto',
        )}
      />
    </Link>
  )

  if (collapsed)
    return item.children ? (
      <AdminNavFlyout item={item} pathname={pathname} count={count}>
        {link}
      </AdminNavFlyout>
    ) : (
      <AdminTooltip label={item.label} count={count}>
        {link}
      </AdminTooltip>
    )

  return (
    <div>
      {link}
      {item.children && (
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-200 ease-out-quart motion-reduce:transition-none',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          {/* Folded sub-sections stay out of the tab order. */}
          <ul inert={!open} className="flex flex-col gap-0.5 overflow-hidden pt-0.5">
            {item.children.map(child => {
              const active = isNavLinkActive(child, pathname)
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      LINK,
                      'h-7 pl-8.5 text-frame-muted hover:bg-frame-hover hover:text-white',
                      active && 'bg-frame-accent font-medium text-white',
                    )}
                  >
                    {child.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
