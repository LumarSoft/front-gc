import Link from 'next/link'
import { BrandMark } from '@/src/components/layout/brand-mark'
import { SITE } from '@/src/lib/site-config'

/** Store identity on the dark frame: logo mark and name, back to the admin home. */
export function AdminBrand() {
  return (
    <Link
      href="/admin"
      className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <BrandMark inverted className="size-6 bg-white/5 p-1 ring-white/10" />
      <span className="truncate text-sm font-semibold tracking-tight text-white">{SITE.name}</span>
    </Link>
  )
}
