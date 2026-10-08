import Link from 'next/link'
import { BrandLogoImage } from '@/src/components/layout/brand-logo-image'
import { SITE } from '@/src/lib/site-config'
import { cn } from '@/src/lib/utils'

type AdminBrandProps = {
  /** Logo only: the 220 px sidebar has no room for the full name next to it. */
  compact?: boolean
}

/** Store identity on the dark frame: logo (and name), back to the admin home. */
export function AdminBrand({ compact = false }: AdminBrandProps) {
  return (
    <Link
      href="/admin"
      aria-label={compact ? `${SITE.name} — inicio del panel` : undefined}
      className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <BrandLogoImage inverted className={cn(compact ? 'h-6' : 'h-5')} />
      {!compact && <span className="truncate text-sm font-semibold tracking-tight text-white">{SITE.name}</span>}
    </Link>
  )
}
