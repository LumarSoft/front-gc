'use client'

import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { AdminTooltip } from '@/src/features/admin/components/common/admin-tooltip'
import { cn } from '@/src/lib/utils'

type StoreLinkProps = {
  className?: string
  /** Icon only, named by a tooltip (folded sidebar). */
  collapsed?: boolean
}

/** Opens the public store in a new tab, so the admin keeps their place in the panel. */
export function StoreLink({ className, collapsed = false }: StoreLinkProps) {
  return (
    <AdminTooltip label="Ver la tienda" disabled={!collapsed}>
      <Link
        href="/"
        target="_blank"
        className={cn(
          'flex h-8 items-center gap-2 rounded-lg px-2 whitespace-nowrap text-sm font-medium text-frame-foreground transition-colors hover:bg-frame-hover hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          className,
        )}
      >
        <ExternalLinkIcon className="size-4.5 shrink-0" />
        <span className={cn('truncate transition-opacity duration-150', collapsed && 'opacity-0')}>Ver la tienda</span>
      </Link>
    </AdminTooltip>
  )
}
