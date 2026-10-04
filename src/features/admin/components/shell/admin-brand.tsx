import Link from 'next/link'
import { BrandMark } from '@/src/components/layout/brand-mark'
import { SITE } from '@/src/lib/site-config'

/** Compact store identity for the admin: mark, name and the "Administración" context. */
export function AdminBrand() {
  return (
    <Link
      href="/admin"
      className="flex min-w-0 items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <BrandMark className="size-8 p-1.5" />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-sm font-semibold">{SITE.name}</span>
        <span className="text-xs text-muted-foreground">Administración</span>
      </span>
    </Link>
  )
}
