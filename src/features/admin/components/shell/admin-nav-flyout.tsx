'use client'

import Link from 'next/link'
import { useState } from 'react'
import { HoverCard } from 'radix-ui'
import { NavCount } from '@/src/features/admin/components/shell/nav-count'
import { isNavLinkActive, RAIL_POPOVER_OFFSET, type AdminNavItem } from '@/src/features/admin/lib/admin-nav'
import { cn } from '@/src/lib/utils'

type AdminNavFlyoutProps = {
  item: AdminNavItem
  pathname: string
  count?: number
  /** The rail icon that opens it. */
  children: React.ReactElement
}

/**
 * On the folded sidebar, a section with sub-pages opens this dark panel beside its icon on hover or focus: the
 * section and its sub-pages, the current one highlighted. Quick to open, a little slower to close so the pointer can
 * travel into it.
 */
export function AdminNavFlyout({ item, pathname, count, children }: AdminNavFlyoutProps) {
  const [open, setOpen] = useState(false)
  const links = [item, ...(item.children ?? [])]

  return (
    <HoverCard.Root open={open} onOpenChange={setOpen} openDelay={60} closeDelay={140}>
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="right"
          align="start"
          sideOffset={RAIL_POPOVER_OFFSET}
          className={cn(
            'z-50 flex w-52 origin-(--radix-hover-card-content-transform-origin) flex-col gap-0.5 rounded-xl bg-frame-popover p-1.5 text-sm shadow-2xl ring-1 ring-white/12',
            'duration-150 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:animate-none',
          )}
        >
          {links.map((link, index) => {
            const active = isNavLinkActive(link, pathname)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-8 items-center rounded-lg px-2.5 text-frame-foreground transition-colors hover:bg-white/6 hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                  index === 0 && 'font-semibold text-white',
                  active && 'bg-white/10 text-white',
                )}
              >
                {link.label}
                {index === 0 && <NavCount count={count} className="ml-auto bg-white/12 text-white" />}
              </Link>
            )
          })}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
