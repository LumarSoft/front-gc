'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandLogoImage } from '@/src/components/layout/brand-logo-image'
import { cn } from '@/src/lib/utils'

export function AssistantLauncher() {
  // Product pages have their own sticky "Consultar" bar on phones; two floating elements would overlap.
  const isProductPage = usePathname().startsWith('/productos/')

  return (
    <Link
      href="/asistente"
      className={cn(
        'group fixed right-4 bottom-4 z-30 flex items-center gap-2.5 rounded-full bg-foreground p-1.5 pr-5 text-sm font-bold text-background shadow-2xl shadow-navy/30 transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6',
        isProductPage && 'hidden lg:flex',
      )}
    >
      <span aria-hidden className="flex h-9 items-center rounded-full bg-background px-2.5">
        <BrandLogoImage className="h-4" />
      </span>
      <span>
        ¿Dudas?<span className="hidden sm:inline"> Te ayudamos a elegir</span>
      </span>
    </Link>
  )
}
