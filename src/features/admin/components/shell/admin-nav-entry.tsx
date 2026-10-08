import Link from 'next/link'
import { isNavLinkActive, isNavSectionActive, type AdminNavItem } from '@/src/features/admin/lib/admin-nav'
import { cn } from '@/src/lib/utils'

type AdminNavEntryProps = {
  item: AdminNavItem
  pathname: string
}

const LINK =
  'flex items-center rounded-lg text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'

/** One section: its link and, while the admin is inside it, its sub-sections unfolding underneath. */
export function AdminNavEntry({ item, pathname }: AdminNavEntryProps) {
  const open = isNavSectionActive(item, pathname)
  const current = isNavLinkActive(item, pathname)
  const Icon = item.icon

  return (
    <div>
      <Link
        href={item.href}
        aria-current={current ? 'page' : undefined}
        className={cn(
          LINK,
          'h-8 gap-2 px-2 font-medium text-frame-foreground hover:bg-frame-accent hover:text-white',
          current && 'bg-frame-accent text-white',
          open && 'text-white',
        )}
      >
        <Icon weight={open ? 'fill' : 'regular'} className="size-4.5 shrink-0" />
        {item.label}
      </Link>
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
                      'h-7 pl-8.5 text-frame-muted hover:bg-frame-accent hover:text-white',
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
