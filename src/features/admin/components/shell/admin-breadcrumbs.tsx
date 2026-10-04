'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/src/components/ui/breadcrumb'
import { findActiveNav } from '@/src/features/admin/lib/admin-nav'

/** "Catálogo › Categorías" for the current section, from the nav config. */
export function AdminBreadcrumbs() {
  const pathname = usePathname()
  const active = findActiveNav(pathname)
  if (!active) return null

  const isSectionRoot = pathname === active.item.href
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {active.group.label && (
          <>
            <BreadcrumbItem className="hidden sm:inline-flex">{active.group.label}</BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:inline-flex" />
          </>
        )}
        <BreadcrumbItem>
          {isSectionRoot ? (
            <BreadcrumbPage>{active.item.label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={active.item.href}>{active.item.label}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
